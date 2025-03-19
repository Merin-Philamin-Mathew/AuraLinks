import { ChatBot } from '@/components/features/chat/ChatBot';
import React from 'react';

const ChatPage = () => {
    return (
        <div className="h-screen flex flex-col">
            <header className="bg-primary p-4 text-primary-foreground">
                <h1 className="text-xl font-bold">AI Chat Assistant</h1>
            </header>
            
            <main className="flex-1 overflow-hidden">
                <ChatBot />
            </main>
        </div>
    );
};

export default ChatPage;