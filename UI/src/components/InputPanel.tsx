import { Camera, Paperclip, Pi, Send, Sigma, SquareRadicalIcon } from 'lucide-react';
import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';

interface InputPanelProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

const InputPanel: React.FC<InputPanelProps> = ({ onSendMessage, isLoading }) => {
  const { isDark } = useTheme();
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSendMessage(input.trim());
      setInput('');
    }
  };

  const insertSymbol = (symbol: string) => {
    setInput(prev => prev + symbol);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Handle image upload logic here
      console.log('Image uploaded:', file.name);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Handle file upload logic here
      console.log('File uploaded:', file.name);
    }
  };

  const mathSymbols = [
    { symbol: '√', label: 'Square root', icon: SquareRadicalIcon },
    { symbol: '∫', label: 'Integral' },
    { symbol: 'π', label: 'Pi', icon: Pi },
    { symbol: '^', label: 'Power' },
    { symbol: 'Σ', label: 'Sigma', icon: Sigma },
    { symbol: '∞', label: 'Infinity' },
    { symbol: '±', label: 'Plus/minus' },
    { symbol: '≈', label: 'Approximately' },
  ];

  return (
    <div className={`${
      isDark ? 'bg-black border-gray-800' : 'bg-white border-gray-200'
    } border-t transition-colors duration-300 p-4`}>
      <div className="max-w-4xl mx-auto space-y-3">
        {/* Math Symbols */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2">
          <span className={`text-sm font-medium ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          } whitespace-nowrap`}>
            Quick symbols:
          </span>
          {mathSymbols.map(({ symbol, label, icon: Icon }) => (
            <button
              key={symbol}
              onClick={() => insertSymbol(symbol)}
              className={`flex items-center space-x-1 px-3 py-1 rounded-lg text-sm font-medium whitespace-nowrap ${
                isDark 
                  ? 'bg-gray-800 hover:bg-gray-700 text-purple-400' 
                  : 'bg-gray-100 hover:bg-gray-200 text-purple-600'
              } transition-colors duration-200`}
              title={label}
            >
              {Icon ? <Icon className="h-3 w-3" /> : <span>{symbol}</span>}
            </button>
          ))}
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="flex items-end space-x-3">
          <div className="flex-1 relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me a STEM question..."
              className={`w-full px-4 py-3 pr-24 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                isDark 
                  ? 'bg-gray-800 text-white border-gray-700' 
                  : 'bg-gray-50 text-gray-900 border-gray-200'
              } border transition-colors duration-300`}
              rows={3}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
            />
            
            {/* Upload buttons container */}
            <div className="absolute bottom-2 right-2 flex space-x-1">
              {/* File upload button */}
              <label className={`p-2 rounded-lg cursor-pointer ${
                isDark 
                  ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-600'
              } transition-colors duration-200`}
              title="Upload document (PDF, Word, etc.)">
                <Paperclip className="h-4 w-4" />
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,.txt,.rtf"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
              
              {/* Image upload button */}
              <label className={`p-2 rounded-lg cursor-pointer ${
                isDark 
                  ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-600'
              } transition-colors duration-200`}
              title="Upload image">
                <Camera className="h-4 w-4" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>
          
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className={`p-3 rounded-xl font-medium transition-all duration-200 ${
              !input.trim() || isLoading
                ? isDark 
                  ? 'bg-gray-700 text-gray-500 cursor-not-allowed' 
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-purple-600 hover:bg-purple-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
            }`}
          >
            <Send className="h-5 w-5" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default InputPanel;