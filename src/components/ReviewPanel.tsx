import React from 'react';
import { AlertCircle, CheckCircle, Info, Lightbulb, Copy, Download } from 'lucide-react';

interface Review {
  id: string;
  line: number;
  type: 'error' | 'warning' | 'suggestion' | 'info';
  message: string;
  code?: string;
  fix?: string;
}

interface ReviewPanelProps {
  reviews: Review[];
  filename: string;
  code: string;
}

export default function ReviewPanel({ reviews, filename, code }: ReviewPanelProps) {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'warning':
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      case 'suggestion':
        return <Lightbulb className="w-4 h-4 text-blue-500" />;
      case 'info':
        return <Info className="w-4 h-4 text-gray-500" />;
      default:
        return <CheckCircle className="w-4 h-4 text-green-500" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'error':
        return 'border-l-red-500 bg-red-50';
      case 'warning':
        return 'border-l-yellow-500 bg-yellow-50';
      case 'suggestion':
        return 'border-l-blue-500 bg-blue-50';
      case 'info':
        return 'border-l-gray-500 bg-gray-50';
      default:
        return 'border-l-green-500 bg-green-50';
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const exportReview = () => {
    const reviewText = reviews.map(review => 
      `Line ${review.line}: [${review.type.toUpperCase()}] ${review.message}`
    ).join('\n');
    
    const blob = new Blob([reviewText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}_review.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const stats = {
    errors: reviews.filter(r => r.type === 'error').length,
    warnings: reviews.filter(r => r.type === 'warning').length,
    suggestions: reviews.filter(r => r.type === 'suggestion').length,
    info: reviews.filter(r => r.type === 'info').length,
  };

  if (reviews.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="text-center py-8">
          <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Issues Found</h3>
          <p className="text-gray-600">Your code looks great! No issues were detected during the analysis.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Code Review Results</h2>
        <div className="flex gap-2">
          <button
            onClick={() => copyToClipboard(reviews.map(r => r.message).join('\n'))}
            className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors flex items-center gap-1"
          >
            <Copy className="w-4 h-4" />
            Copy
          </button>
          <button
            onClick={exportReview}
            className="px-3 py-1 text-sm bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-md transition-colors flex items-center gap-1"
          >
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-red-50 p-3 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-red-700">Errors</span>
            <span className="text-lg font-bold text-red-600">{stats.errors}</span>
          </div>
        </div>
        <div className="bg-yellow-50 p-3 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-yellow-700">Warnings</span>
            <span className="text-lg font-bold text-yellow-600">{stats.warnings}</span>
          </div>
        </div>
        <div className="bg-blue-50 p-3 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-blue-700">Suggestions</span>
            <span className="text-lg font-bold text-blue-600">{stats.suggestions}</span>
          </div>
        </div>
        <div className="bg-gray-50 p-3 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Info</span>
            <span className="text-lg font-bold text-gray-600">{stats.info}</span>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className={`border-l-4 p-4 rounded-r-lg ${getTypeColor(review.type)}`}>
            <div className="flex items-start gap-3">
              {getTypeIcon(review.type)}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium text-gray-600">Line {review.line}</span>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    review.type === 'error' ? 'bg-red-100 text-red-700' :
                    review.type === 'warning' ? 'bg-yellow-100 text-yellow-700' :
                    review.type === 'suggestion' ? 'bg-blue-100 text-blue-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {review.type}
                  </span>
                </div>
                <p className="text-gray-800 mb-2">{review.message}</p>
                {review.code && (
                  <div className="bg-gray-800 text-gray-100 p-3 rounded-md text-sm font-mono mb-2">
                    <pre className="whitespace-pre-wrap">{review.code}</pre>
                  </div>
                )}
                {review.fix && (
                  <div className="bg-green-800 text-green-100 p-3 rounded-md text-sm font-mono">
                    <div className="text-green-300 text-xs mb-1">Suggested fix:</div>
                    <pre className="whitespace-pre-wrap">{review.fix}</pre>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}