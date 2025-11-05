import React, { useRef, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import MessageBubble from './MessageBubble';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  steps?: string[];
  sources?: string[];
  timestamp: Date;
}

interface ChatInterfaceProps {
  messages: Message[];
  isLoading: boolean;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ messages, isLoading }) => {
  const { isDark } = useTheme();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className={`flex-1 overflow-y-auto ${
      isDark ? 'bg-gray-900' : 'bg-gray-50'
    } transition-colors duration-300`}>
      <div className="max-w-4xl mx-auto p-4">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full min-h-[400px]">
            <div className="text-center space-y-4">
              <div className={`text-6xl ${isDark ? 'text-gray-700' : 'text-gray-300'}`}>
                🧠
              </div>
              <h2 className={`text-xl font-semibold ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                Ready to learn?
              </h2>
              <p className={`text-sm ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Ask me any STEM question and I'll help you understand it step by step!
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className={`max-w-2xl rounded-2xl p-4 ${
                  isDark 
                    ? 'bg-black border border-purple-600' 
                    : 'bg-white border border-purple-200'
                } transition-colors duration-300`}>
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className={`w-2 h-2 rounded-full ${
                        isDark ? 'bg-purple-400' : 'bg-purple-600'
                      } animate-bounce`} style={{ animationDelay: '0ms' }}></div>
                      <div className={`w-2 h-2 rounded-full ${
                        isDark ? 'bg-purple-400' : 'bg-purple-600'
                      } animate-bounce`} style={{ animationDelay: '150ms' }}></div>
                      <div className={`w-2 h-2 rounded-full ${
                        isDark ? 'bg-purple-400' : 'bg-purple-600'
                      } animate-bounce`} style={{ animationDelay: '300ms' }}></div>
                    </div>
                    <span className={`text-sm ${
                      isDark ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      Thinking...
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default ChatInterface;