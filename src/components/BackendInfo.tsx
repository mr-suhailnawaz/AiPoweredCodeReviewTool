import React from 'react';
import { Server, Database, Zap, Code, Github } from 'lucide-react';

export default function BackendInfo() {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 mb-6">
      <div className="flex items-center gap-3 mb-4">
        <Server className="w-6 h-6 text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-800">Backend Architecture</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <Code className="w-4 h-4 text-green-600" />
            <span className="font-medium text-gray-800">Flask API</span>
          </div>
          <p className="text-sm text-gray-600">Python Flask backend with RESTful endpoints for code analysis</p>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-4 h-4 text-yellow-600" />
            <span className="font-medium text-gray-800">OpenAI API</span>
          </div>
          <p className="text-sm text-gray-600">GPT-4 integration for intelligent code analysis and suggestions</p>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <Github className="w-4 h-4 text-gray-800" />
            <span className="font-medium text-gray-800">GitHub API</span>
          </div>
          <p className="text-sm text-gray-600">Direct repository integration for seamless code review workflow</p>
        </div>
      </div>
      
      <div className="bg-blue-100 p-4 rounded-lg">
        <h4 className="font-medium text-blue-800 mb-2">Flask Backend Implementation:</h4>
        <div className="text-sm text-blue-700 space-y-1">
          <p>• <code className="bg-blue-200 px-1 rounded">POST /api/analyze</code> - Code analysis endpoint</p>
          <p>• <code className="bg-blue-200 px-1 rounded">GET /api/github/repos</code> - GitHub repository listing</p>
          <p>• <code className="bg-blue-200 px-1 rounded">POST /api/github/review</code> - Submit review to GitHub</p>
          <p>• OpenAI API integration with custom prompts for code quality analysis</p>
          <p>• JWT authentication for secure API access</p>
        </div>
      </div>
    </div>
  );
}