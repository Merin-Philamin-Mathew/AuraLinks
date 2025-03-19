import { api } from '@/config/apis/axios';
import { CHAT_URLS } from '@/config/apis/urls';
import React, { useEffect, useState } from 'react';
import { MessageSquare, Clock } from 'lucide-react';

const ChatDashboard = () => {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        setLoading(true);
        const response = await api.get(CHAT_URLS.conversations);
        console.log(response.data);
        setConversations(response.data); // Axios already parses JSON
        setError(null);
      } catch (err) {
        console.error('Error fetching conversations:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchConversations();
  }, []);
  
  // Take the first 3 conversations for display
  const recentChats = conversations.slice(0, 2);
  
  // Format date to relative time (e.g., "2 hours ago")
  const getRelativeTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) return 'just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  };
  
  // Extract brief content from message object
  const getMessagePreview = (message) => {
    if (!message) return 'No messages';
    if (typeof message === 'string') return message;
    if (message.content && typeof message.content === 'string') {
      return message.content.length > 40 ? `${message.content.substring(0, 40)}...` : message.content;
    }
    return 'New message';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-foreground">Recent Chats</h3>
        {!loading && !error && conversations.length > 3 && (
          <button className="text-xs text-primary hover:underline">
            View all
          </button>
        )}
      </div>
      
      <div className="space-y-3">
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-pulse flex space-x-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <div className="w-2 h-2 bg-primary rounded-full"></div>
            </div>
          </div>
        ) : error ? (
          <div className="text-center text-destructive py-4 bg-destructive/10 rounded-md">
            Failed to load conversations
          </div>
        ) : conversations.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
            <MessageSquare className="w-10 h-10 mb-2 opacity-30" />
            <p>No conversations yet</p>
            <button className="mt-2 text-xs text-primary hover:underline">
              Start a new chat
            </button>
          </div>
        ) : (
          recentChats.map((chat) => (
            <div key={chat.id} className="flex items-start p-3 hover:bg-accent/10 rounded-md cursor-pointer transition-colors">
              <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center mr-3">
                <MessageSquare className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline">
                  <h4 className="text-sm font-medium text-foreground truncate">
                    {chat.title || 'Untitled Conversation'}
                  </h4>
                  <span className="text-xs text-muted-foreground flex items-center ml-2">
                    <Clock className="w-3 h-3 mr-1" />
                    {getRelativeTime(chat.updated_at)}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-1 truncate">
                  {getMessagePreview(chat.last_message)}
                </p>
                <div className="flex items-center mt-1">
                  <span className="bg-accent/30 text-xs px-2 py-0.5 rounded-full">
                    {chat.messages_count} messages
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ChatDashboard;