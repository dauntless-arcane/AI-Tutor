import React, { useState } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ChatInterface from './components/ChatInterface';
import InputPanel from './components/InputPanel';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  steps?: string[];
  sources?: string[];
  timestamp: Date;
}

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: `I'll help you understand this STEM concept! Let me break down "${content}" for you.`,
        steps: [
          'First, let me identify the key concepts in your question',
          'Next, I\'ll explain the fundamental principles involved',
          'Then, I\'ll show you how to apply these concepts step by step',
          'Finally, I\'ll provide a clear summary and additional resources'
        ],
        sources: [
          'Khan Academy - STEM Fundamentals',
          'MIT OpenCourseWare',
          'Wolfram MathWorld'
        ],
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <ThemeProvider>
      <div className="flex h-screen bg-gray-900 dark:bg-gray-900">
        <Sidebar 
          isOpen={isSidebarOpen} 
          onToggle={() => setIsSidebarOpen(!isSidebarOpen)} 
        />
        
        <div className="flex-1 flex flex-col lg:ml-80">
          <Header />
          <ChatInterface messages={messages} isLoading={isLoading} />
          <InputPanel onSendMessage={handleSendMessage} isLoading={isLoading} />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;