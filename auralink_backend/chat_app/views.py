from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.pagination import PageNumberPagination
from django.conf import settings
from openai import OpenAI, OpenAIError
import json

from .models import Conversation, Message
from .serializers import ConversationSerializer, MessageSerializer

# Initialize OpenAI client
client = OpenAI(api_key=settings.OPEN_AI_API_KEY)

class MessagePagination(PageNumberPagination):
    """Pagination for message lists"""
    page_size = 20
    page_size_query_param = 'page_size'
    max_page_size = 100

class ConversationViewSet(viewsets.ModelViewSet):
    """ViewSet for managing chat conversations"""
    serializer_class = ConversationSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        """Return conversations for the current user"""
        return Conversation.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        """Set the user when creating a conversation"""
        serializer.save(user=self.request.user)
    
    @action(detail=True, methods=['post'])
    def send_message(self, request, pk=None):
        """Send a message to the conversation and get a response from OpenAI"""
        conversation = self.get_object()
        
        # Get user message from request data
        user_message = request.data.get('message', '')
        if not user_message:
            return Response({"error": "Message content is required"}, status=status.HTTP_400_BAD_REQUEST)
            
        # Save user message to database
        user_msg = Message.objects.create(
            conversation=conversation,
            role='user',
            content=user_message
        )
        
        try:
            # Get conversation history for context (limit to last 10 messages)
            history = Message.objects.filter(conversation=conversation).order_by('timestamp')[:10]
            
            # Format messages for OpenAI API
            messages = [
                {"role": "system", "content": """You are an AI-powered chatbot designed to assist users by providing 
                 informative and helpful responses to their queries."""}
            ]
            
            # Add conversation history to messages
            for msg in history:
                messages.append({"role": msg.role, "content": msg.content})
            
            # Call OpenAI API
            response = client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=messages
            )
            
            # Extract response content
            ai_response = response.choices[0].message.content.strip()
            
            # Save assistant response to database
            assistant_msg = Message.objects.create(
                conversation=conversation,
                role='assistant',
                content=ai_response,
                api_response_id=getattr(response, 'id', ''),
                tokens_used=getattr(response.usage, 'total_tokens', 0) if hasattr(response, 'usage') else 0
            )
            
            # Update conversation timestamp
            conversation.save()  # This will update the updated_at field
            
            # Return both messages in response
            return Response({
                "user_message": MessageSerializer(user_msg).data,
                "assistant_message": MessageSerializer(assistant_msg).data
            }, status=status.HTTP_200_OK)
            
        except OpenAIError as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    @action(detail=True, methods=['get'])
    def messages(self, request, pk=None):
        """Get all messages for a conversation"""
        conversation = self.get_object()
        messages = Message.objects.filter(conversation=conversation).order_by('timestamp')
        
        # Apply pagination
        paginator = MessagePagination()
        page = paginator.paginate_queryset(messages, request)
        
        if page is not None:
            serializer = MessageSerializer(page, many=True)
            return paginator.get_paginated_response(serializer.data)
            
        serializer = MessageSerializer(messages, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['delete'])
    def delete_all(self, request):
        """Delete all conversations for the current user"""
        conversations = self.get_queryset()
        count = conversations.count()
        conversations.delete()
        return Response({
            "message": f"Successfully deleted {count} conversations",
            "count": count
        }, status=status.HTTP_200_OK)
    
    @action(detail=True, methods=['post'])
    def rename(self, request, pk=None):
        """Rename a conversation"""
        conversation = self.get_object()
        new_title = request.data.get('title', '')
        
        if not new_title:
            return Response({"error": "Title is required"}, status=status.HTTP_400_BAD_REQUEST)
            
        conversation.title = new_title
        conversation.save()
        
        return Response({
            "message": "Conversation renamed successfully",
            "conversation": ConversationSerializer(conversation).data
        }, status=status.HTTP_200_OK)


class ChatAPIView(APIView):
    """API view for one-off chat that creates a conversation"""
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        user_message = request.data.get('message', '')
        
        if not user_message:
            return Response({"error": "Message content is required"}, status=status.HTTP_400_BAD_REQUEST)
            
        try:
            # Create a new conversation
            conversation = Conversation.objects.create(
                user=request.user,
                title=user_message[:50]  # Use first 50 chars of message as title
            )
            
            # Save user message
            Message.objects.create(
                conversation=conversation,
                role='user',
                content=user_message
            )
            
            # Call OpenAI API
            response = client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": "You are an AI-powered chatbot designed to assist users by providing informative and helpful responses to their queries."},
                    {"role": "user", "content": user_message},
                ]
            )
            
            answer = response.choices[0].message.content.strip()
            
            # Save assistant message
            Message.objects.create(
                conversation=conversation,
                role='assistant',
                content=answer,
                api_response_id=getattr(response, 'id', ''),
                tokens_used=getattr(response.usage, 'total_tokens', 0) if hasattr(response, 'usage') else 0
            )
            
            return Response({
                "response": answer, 
                "conversation_id": conversation.id
            }, status=status.HTTP_200_OK)
            
        except OpenAIError as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class MessageViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet for messages - read only"""
    serializer_class = MessageSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = MessagePagination
    
    def get_queryset(self):
        """Return messages for conversations owned by the current user"""
        return Message.objects.filter(
            conversation__user=self.request.user
        ).order_by('timestamp')
    
    def get_conversation_messages(self, conversation_id):
        """Helper method to get messages for a specific conversation"""
        conversation = get_object_or_404(
            Conversation, 
            id=conversation_id,
            user=self.request.user
        )
        return Message.objects.filter(conversation=conversation).order_by('timestamp')