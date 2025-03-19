import React, { useState, useEffect } from 'react';
import { api } from '@/config/apis/axios';
import { CHAT_URLS } from '@/config/apis/urls';

export const ConversationSidebar = ({ onSelectConversation, activeConversationId }) => {
    const [conversations, setConversations] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch conversations when component mounts
    useEffect(() => {
        fetchConversations();
    }, []);

    const fetchConversations = async () => {
        setIsLoading(true);
        setError(null);
        
        try {
            const response = await api.get(CHAT_URLS.conversations);
            setConversations(response.data.results || response.data);
        } catch (err) {
            console.error('Error fetching conversations:', err);
            setError('Failed to load conversations');
        } finally {
            setIsLoading(false);
        }
    };

    const handleNewChat = () => {
        onSelectConversation(null);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString(undefined, {
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <div className="w-64 bg-secondary border-r border-border h-full flex flex-col">
            <div className="p-4 border-b border-border">
                <button 
                    onClick={handleNewChat}
                    className="w-full bg-primary text-primary-foreground p-2 rounded-md hover:bg-primary/90 transition-colors"
                >
                    New Chat
                </button>
            </div>
            
            <div className="flex-1 overflow-y-auto">
                {isLoading ? (
                    <div className="p-4 text-center text-muted-foreground">Loading...</div>
                ) : error ? (
                    <div className="p-4 text-center text-destructive">{error}</div>
                ) : conversations.length === 0 ? (
                    <div className="p-4 text-center text-muted-foreground">No conversations yet</div>
                ) : (
                    <ul className="space-y-1 p-2">
                        {conversations.map((conversation) => (
                            <li key={conversation.id}>
                                <button
                                    onClick={() => onSelectConversation(conversation.id)}
                                    className={`w-full text-left p-2 rounded-md hover:bg-accent/20 transition-colors flex justify-between items-center ${
                                        activeConversationId === conversation.id ? 'bg-accent/30' : ''
                                    }`}
                                >
                                    <div className="truncate flex-1 text-sm">
                                        {conversation.title || 'Untitled'}
                                    </div>
                                    <div className="text-xs text-muted-foreground">
                                        {formatDate(conversation.updated_at)}
                                    </div>
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};