import React, { useState, useEffect, useRef } from 'react';
import { api } from '@/config/apis/axios';
import { CHAT_URLS } from '@/config/apis/urls';
import { ConversationSidebar } from './ConversationSidebar';

export const ChatBot = () => {
    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            content: 'Hello! How can I help you today?'
        }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [conversationId, setConversationId] = useState(null);
    const [isLoadingConversation, setIsLoadingConversation] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        // Add user message to the chat
        const userMessage = { role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            let response;

            if (conversationId) {
                // Send message in existing conversation
                response = await api.post(CHAT_URLS.send_conversation_message(conversationId), 
                    { message: userMessage.content },
                );
                setMessages(prev => [...prev, { 
                    role: 'assistant', 
                    content: response.data.assistant_message.content 
                }]);
            } else {
                // Create new conversation
                response = await api.post(CHAT_URLS.send_message,
                    { message: userMessage.content },
                );
                setConversationId(response.data.conversation_id);
                setMessages(prev => [...prev, { 
                    role: 'assistant', 
                    content: response.data.response 
                }]);
            }
        } catch (error) {
            console.error('Error sending message:', error);
            setMessages(prev => [...prev, { 
                role: 'assistant', 
                content: 'Sorry, I encountered an error processing your request.' 
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSelectConversation = async (id) => {
        if (conversationId === id) return;
        
        setConversationId(id);
        
        if (id === null) {
            // Start a new conversation
            setMessages([
                {
                    role: 'assistant',
                    content: 'Hello! How can I help you today?'
                }
            ]);
            return;
        }
        
        // Load conversation messages
        setIsLoadingConversation(true);
        
        try {
            const response = await api.get(CHAT_URLS.conversation_messages(id));
            const conversationMessages = response.data.results || response.data;
            
            if (conversationMessages && conversationMessages.length > 0) {
                setMessages(conversationMessages.map(msg => ({
                    role: msg.role,
                    content: msg.content
                })));
            } else {
                setMessages([
                    {
                        role: 'assistant',
                        content: 'This conversation is empty. How can I help you today?'
                    }
                ]);
            }
        } catch (error) {
            console.error('Error loading conversation:', error);
            setMessages([
                {
                    role: 'assistant',
                    content: 'Sorry, I couldn\'t load this conversation. Please try again.'
                }
            ]);
        } finally {
            setIsLoadingConversation(false);
        }
    };

    return (
        <div className="flex h-full">
            {/* Conversation Sidebar */}
            <ConversationSidebar 
                onSelectConversation={handleSelectConversation}
                activeConversationId={conversationId}
            />
            
            {/* Chat Area */}
            <div className="flex-1 flex flex-col h-full">
                <div className="flex-1 p-4 overflow-y-auto">
                    {isLoadingConversation ? (
                        <div className="flex justify-center items-center h-full">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {messages.map((message, index) => (
                                <div 
                                    key={index} 
                                    className={`flex items-start ${message.role === 'assistant' ? '' : 'justify-end'}`}
                                >
                                    {message.role === 'assistant' && (
                                        <div className="w-8 h-8 bg-primary rounded-full mr-2 flex-shrink-0"></div>
                                    )}
                                    <div 
                                        className={`${
                                            message.role === 'assistant' ? 'bg-accent/10' : 'bg-primary/10'
                                        } rounded-lg p-3 max-w-[80%]`}
                                    >
                                        <p className="text-foreground">{message.content}</p>
                                    </div>
                                    {message.role === 'user' && (
                                        <div className="w-8 h-8 bg-muted rounded-full ml-2 flex-shrink-0"></div>
                                    )}
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex items-start">
                                    <div className="w-8 h-8 bg-primary rounded-full mr-2 flex-shrink-0"></div>
                                    <div className="bg-accent/10 rounded-lg p-3">
                                        <p className="text-foreground">Thinking...</p>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>
                    )}
                </div>
                
                <div className="border-t border-border p-4">
                    <form onSubmit={handleSubmit} className="flex items-center">
                        <input
                            type="text"
                            value={input}
                            onChange={handleInputChange}
                            placeholder="Type your message..."
                            className="flex-1 p-2 bg-secondary rounded-l-md focus:outline-none text-foreground"
                            disabled={isLoading || isLoadingConversation}
                        />
                        <button 
                            type="submit" 
                            className="bg-primary text-primary-foreground p-2 rounded-r-md"
                            disabled={isLoading || isLoadingConversation}
                        >
                            Send
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};