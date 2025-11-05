import { Brain, Moon, Sun } from 'lucide-react';
import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const Header: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className={`${
      isDark ? 'bg-black border-gray-800' : 'bg-white border-gray-200'
    } border-b transition-colors duration-300 px-4 py-3`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-purple-600 rounded-lg">
            <Brain className="h-6 w-6 text-white" />
          </div>
          <h1 className={`text-xl font-bold ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Granite
          </h1>
          <span className={`text-sm ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
            
          </span>
        </div>
        
        <div className="flex items-center space-x-4">
          <select className={`${
            isDark ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-gray-900 border-gray-300'
          } border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500`}>
            <option>All Subjects</option>
            <option>Mathematics</option>
            <option>Physics</option>
            <option>Chemistry</option>
            <option>Biology</option>
            <option>Computer Science</option>
          </select>
          
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-lg transition-colors duration-200 ${
              isDark 
                ? 'bg-gray-800 hover:bg-gray-700 text-yellow-400' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
            }`}
          >
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;