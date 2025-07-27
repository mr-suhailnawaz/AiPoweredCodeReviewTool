import React from 'react';
import { Code2, Github, Zap } from 'lucide-react';

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Code2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">AI Code Review</h1>
              <p className="text-sm text-gray-600">Powered by GPT-4</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 bg-green-50 px-3 py-1 rounded-full">
              <Zap className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-green-700">AI-Powered</span>
            </div>
            
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white rounded-lg transition-colors"
            >
              <Github className="w-4 h-4" />
              <span className="hidden sm:inline">GitHub Integration</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}