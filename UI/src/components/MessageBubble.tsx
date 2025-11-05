import React, { useState } from 'react';
import { ChevronDown, ChevronRight, BookOpen, Lightbulb, Copy } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface MessageBubbleProps {
  message: {
    id: string;
    type: 'user' | 'ai';
    content: string;
    steps?: string[];
    sources?: string[];
    timestamp: Date;
  };
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const { isDark } = useTheme();
  const [showSteps, setShowSteps] = useState(false);
  const [showSources, setShowSources] = useState(false);

  const isUser = message.type === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`max-w-2xl rounded-2xl p-4 shadow-sm ${
        isUser 
          ? isDark 
            ? 'bg-gray-800 text-white' 
            : 'bg-gray-200 text-gray-900'
          : isDark 
            ? 'bg-black border border-purple-600 text-white' 
            : 'bg-white border border-purple-200 text-gray-900'
      } transition-colors duration-300`}>
        <div className="space-y-3">
          <p className="text-sm leading-relaxed">{message.content}</p>
          
          {!isUser && message.steps && (
            <div className="space-y-2">
              <button
                onClick={() => setShowSteps(!showSteps)}
                className={`flex items-center space-x-2 text-sm ${
                  isDark ? 'text-purple-400 hover:text-purple-300' : 'text-purple-600 hover:text-purple-700'
                } transition-colors duration-200`}
              >
                {showSteps ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                <span>Step-by-step solution</span>
              </button>
              
              {showSteps && (
                <div className={`p-3 rounded-lg space-y-2 ${
                  isDark ? 'bg-gray-800' : 'bg-gray-50'
                }`}>
                  {message.steps.map((step, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <span className={`text-xs font-medium px-2 py-1 rounded ${
                        isDark ? 'bg-purple-600 text-white' : 'bg-purple-100 text-purple-800'
                      }`}>
                        {index + 1}
                      </span>
                      <p className="text-sm flex-1">{step}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          
          {!isUser && (
            <div className="flex items-center space-x-2 pt-2">
              <button className={`flex items-center space-x-1 px-3 py-1 rounded-full text-xs ${
                isDark ? 'bg-purple-600 hover:bg-purple-700 text-white' : 'bg-purple-100 hover:bg-purple-200 text-purple-800'
              } transition-colors duration-200`}>
                <Lightbulb className="h-3 w-3" />
                <span>Explain more simply</span>
              </button>
              
              <button className={`flex items-center space-x-1 px-3 py-1 rounded-full text-xs ${
                isDark ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              } transition-colors duration-200`}>
                <Copy className="h-3 w-3" />
                <span>Copy</span>
              </button>
              
              {message.sources && (
                <button
                  onClick={() => setShowSources(!showSources)}
                  className={`flex items-center space-x-1 px-3 py-1 rounded-full text-xs ${
                    isDark ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  } transition-colors duration-200`}
                >
                  <BookOpen className="h-3 w-3" />
                  <span>Sources</span>
                </button>
              )}
            </div>
          )}
          
          {showSources && message.sources && (
            <div className={`p-3 rounded-lg space-y-1 ${
              isDark ? 'bg-gray-800' : 'bg-gray-50'
            }`}>
              {message.sources.map((source, index) => (
                <p key={index} className="text-xs text-blue-500 hover:underline cursor-pointer">
                  {source}
                </p>
              ))}
            </div>
          )}
        </div>
        
        <div className={`text-xs mt-2 ${
          isDark ? 'text-gray-500' : 'text-gray-400'
        }`}>
          {message.timestamp.toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;