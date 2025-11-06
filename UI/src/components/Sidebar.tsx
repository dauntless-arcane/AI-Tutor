import {
  Atom,
  Calculator,
  ChevronRight,
  Clock,
  Code,
  Dna,
  Menu,
  Star,
  X,
  Zap
} from 'lucide-react';
import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle }) => {
  const { isDark } = useTheme();
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const subjects = [
    { id: 'math', name: 'Mathematics', icon: Calculator, color: 'text-blue-500' },
    { id: 'physics', name: 'Physics', icon: Zap, color: 'text-yellow-500' },
    { id: 'chemistry', name: 'Chemistry', icon: Atom, color: 'text-green-500' },
    { id: 'biology', name: 'Biology', icon: Dna, color: 'text-red-500' },
    { id: 'cs', name: 'Computer Science', icon: Code, color: 'text-purple-500' },
  ];

  const recentQuestions = [
    { id: 1, question: 'How do I solve quadratic equations?', time: '2 hours ago' },
    { id: 2, question: 'Explain photosynthesis process', time: '1 day ago' },
    { id: 3, question: 'What is Newton\'s second law?', time: '3 days ago' },
  ];

  const bookmarkedAnswers = [
    { id: 1, question: 'Calculus chain rule examples', subject: 'Mathematics' },
    { id: 2, question: 'Periodic table trends', subject: 'Chemistry' },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}
      
      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full w-80 z-50 transform transition-transform duration-300 lg:translate-x-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } ${isDark ? 'bg-gray-900 border-gray-800' : 'bg-white border-gray-200'} border-r`}>
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h2 className={`font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Navigation
              </h2>
              <button
                onClick={onToggle}
                className={`lg:hidden p-2 rounded-lg ${
                  isDark ? 'hover:bg-gray-800 text-white' : 'hover:bg-gray-100 text-gray-900'
                } transition-colors duration-200`}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
          
          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {/* Subjects */}
            <div>
              <h3 className={`text-sm font-medium mb-3 ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Subjects
              </h3>
              <div className="space-y-2">
                {subjects.map((subject) => {
                  const Icon = subject.icon;
                  return (
                    <button
                      key={subject.id}
                      className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-colors duration-200 ${
                        isDark 
                          ? 'hover:bg-gray-800 text-white' 
                          : 'hover:bg-gray-50 text-gray-900'
                      }`}
                    >
                      <Icon className={`h-5 w-5 ${subject.color}`} />
                      <span className="text-sm font-medium">{subject.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
            
            {/* Recent Questions */}
            <div>
              <button
                onClick={() => setActiveSection(activeSection === 'recent' ? null : 'recent')}
                className={`w-full flex items-center justify-between p-2 rounded-lg text-left transition-colors duration-200 ${
                  isDark ? 'hover:bg-gray-800 text-white' : 'hover:bg-gray-50 text-gray-900'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm font-medium">Recent Questions</span>
                </div>
                <ChevronRight className={`h-4 w-4 transform transition-transform duration-200 ${
                  activeSection === 'recent' ? 'rotate-90' : ''
                }`} />
              </button>
              
              {activeSection === 'recent' && (
                <div className="mt-2 space-y-2">
                  {recentQuestions.map((item) => (
                    <button
                      key={item.id}
                      className={`w-full text-left p-3 rounded-lg transition-colors duration-200 ${
                        isDark 
                          ? 'hover:bg-gray-800 text-gray-300' 
                          : 'hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      <p className="text-sm font-medium line-clamp-2">{item.question}</p>
                      <p className={`text-xs mt-1 ${
                        isDark ? 'text-gray-500' : 'text-gray-500'
                      }`}>
                        {item.time}
                      </p>
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Bookmarked Answers */}
            <div>
              <button
                onClick={() => setActiveSection(activeSection === 'bookmarks' ? null : 'bookmarks')}
                className={`w-full flex items-center justify-between p-2 rounded-lg text-left transition-colors duration-200 ${
                  isDark ? 'hover:bg-gray-800 text-white' : 'hover:bg-gray-50 text-gray-900'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Star className="h-4 w-4" />
                  <span className="text-sm font-medium">Bookmarked</span>
                </div>
                <ChevronRight className={`h-4 w-4 transform transition-transform duration-200 ${
                  activeSection === 'bookmarks' ? 'rotate-90' : ''
                }`} />
              </button>
              
              {activeSection === 'bookmarks' && (
                <div className="mt-2 space-y-2">
                  {bookmarkedAnswers.map((item) => (
                    <button
                      key={item.id}
                      className={`w-full text-left p-3 rounded-lg transition-colors duration-200 ${
                        isDark 
                          ? 'hover:bg-gray-800 text-gray-300' 
                          : 'hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      <p className="text-sm font-medium line-clamp-2">{item.question}</p>
                      <p className={`text-xs mt-1 ${
                        isDark ? 'text-gray-500' : 'text-gray-500'
                      }`}>
                        {item.subject}
                      </p>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile menu button */}
      <button
        onClick={onToggle}
        className={`lg:hidden fixed top-4 left-4 z-40 p-2 rounded-lg ${
          isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
        } shadow-lg transition-colors duration-200`}
      >
        <Menu className="h-5 w-5" />
      </button>
    </>
  );
};

export default Sidebar;