import React, { useState } from 'react';
import Header from './components/Header';
import CodeEditor from './components/CodeEditor';
import ReviewPanel from './components/ReviewPanel';
import BackendInfo from './components/BackendInfo';
import { generateMockReview, delay, Review } from './utils/mockAnalysis';

function App() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [currentFile, setCurrentFile] = useState('');
  const [currentCode, setCurrentCode] = useState('');

  const handleAnalyze = async (code: string, language: string, filename: string) => {
    setIsAnalyzing(true);
    setAnalysisComplete(false);
    setCurrentFile(filename);
    setCurrentCode(code);
    
    try {
      // Simulate API call delay
      await delay(2000);
      
      // In a real implementation, this would call your Flask backend:
      // const response = await fetch('/api/analyze', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ code, language, filename })
      // });
      // const reviews = await response.json();
      
      const mockReviews = generateMockReview(code, language);
      setReviews(mockReviews);
      setAnalysisComplete(true);
    } catch (error) {
      console.error('Analysis failed:', error);
      setReviews([]);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">AI-Powered Code Review</h2>
          <p className="text-gray-600">
            Upload your code and get intelligent feedback powered by GPT-4. 
            Identify bugs, security issues, and optimization opportunities instantly.
          </p>
        </div>

        <BackendInfo />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <CodeEditor onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} />
          </div>
          
          <div>
            {analysisComplete && (
              <ReviewPanel 
                reviews={reviews} 
                filename={currentFile}
                code={currentCode}
              />
            )}
            {isAnalyzing && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center justify-center py-8">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Analyzing Code...</h3>
                    <p className="text-gray-600">AI is reviewing your code for issues and improvements.</p>
                  </div>
                </div>
              </div>
            )}
            {!analysisComplete && !isAnalyzing && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="text-center py-8">
                  <div className="bg-blue-100 p-3 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Ready for Analysis</h3>
                  <p className="text-gray-600">Upload your code or paste it in the editor, then click "Analyze Code" to get started.</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="mt-12 bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4">
              <div className="bg-blue-100 p-3 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h4 className="font-medium text-gray-800">Smart Analysis</h4>
              <p className="text-sm text-gray-600 mt-1">AI-powered code review with contextual suggestions</p>
            </div>
            
            <div className="text-center p-4">
              <div className="bg-green-100 p-3 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h4 className="font-medium text-gray-800">Multi-Language</h4>
              <p className="text-sm text-gray-600 mt-1">Support for JavaScript, Python, Java, and more</p>
            </div>
            
            <div className="text-center p-4">
              <div className="bg-purple-100 p-3 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h4 className="font-medium text-gray-800">GitHub Integration</h4>
              <p className="text-sm text-gray-600 mt-1">Direct integration with GitHub repositories</p>
            </div>
            
            <div className="text-center p-4">
              <div className="bg-orange-100 p-3 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="font-medium text-gray-800">Real-time</h4>
              <p className="text-sm text-gray-600 mt-1">Instant feedback and suggestions as you code</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;