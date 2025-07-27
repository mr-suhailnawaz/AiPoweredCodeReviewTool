import React, { useState } from 'react';
import { FileText, Upload, Code2, Play } from 'lucide-react';

interface CodeEditorProps {
  onAnalyze: (code: string, language: string, filename: string) => void;
  isAnalyzing: boolean;
}

export default function CodeEditor({ onAnalyze, isAnalyzing }: CodeEditorProps) {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [filename, setFilename] = useState('');

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setCode(content);
        setFilename(file.name);
        
        // Auto-detect language from file extension
        const extension = file.name.split('.').pop()?.toLowerCase();
        const languageMap: { [key: string]: string } = {
          'js': 'javascript',
          'ts': 'typescript',
          'py': 'python',
          'java': 'java',
          'cpp': 'cpp',
          'c': 'c',
          'go': 'go',
          'rs': 'rust',
          'php': 'php',
          'rb': 'ruby',
        };
        if (extension && languageMap[extension]) {
          setLanguage(languageMap[extension]);
        }
      };
      reader.readAsText(file);
    }
  };

  const handleAnalyze = () => {
    if (code.trim()) {
      onAnalyze(code, language, filename || `untitled.${language}`);
    }
  };

  const sampleCode = {
    javascript: `function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// Usage example
console.log(fibonacci(10));`,
    python: `def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

# Usage example
print(fibonacci(10))`,
    java: `public class Fibonacci {
    public static int fibonacci(int n) {
        if (n <= 1) return n;
        return fibonacci(n - 1) + fibonacci(n - 2);
    }
    
    public static void main(String[] args) {
        System.out.println(fibonacci(10));
    }
}`
  };

  const loadSample = () => {
    setCode(sampleCode[language as keyof typeof sampleCode] || sampleCode.javascript);
    setFilename(`sample.${language === 'javascript' ? 'js' : language === 'python' ? 'py' : 'java'}`);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
          <Code2 className="w-5 h-5" />
          Code Editor
        </h2>
        <div className="flex gap-2">
          <button
            onClick={loadSample}
            className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors"
          >
            Load Sample
          </button>
          <label className="px-3 py-1 text-sm bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-md transition-colors cursor-pointer flex items-center gap-1">
            <Upload className="w-4 h-4" />
            Upload File
            <input
              type="file"
              onChange={handleFileUpload}
              accept=".js,.ts,.py,.java,.cpp,.c,.go,.rs,.php,.rb,.txt"
              className="hidden"
            />
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Filename
          </label>
          <input
            type="text"
            value={filename}
            onChange={(e) => setFilename(e.target.value)}
            placeholder="Enter filename..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Language
          </label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="javascript">JavaScript</option>
            <option value="typescript">TypeScript</option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="cpp">C++</option>
            <option value="c">C</option>
            <option value="go">Go</option>
            <option value="rust">Rust</option>
            <option value="php">PHP</option>
            <option value="ruby">Ruby</option>
          </select>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Code
        </label>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Paste your code here or upload a file..."
          className="w-full h-64 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
          style={{ fontFamily: 'Consolas, Monaco, "Courier New", monospace' }}
        />
      </div>

      <button
        onClick={handleAnalyze}
        disabled={!code.trim() || isAnalyzing}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-3 px-4 rounded-md transition-colors flex items-center justify-center gap-2"
      >
        {isAnalyzing ? (
          <>
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            Analyzing Code...
          </>
        ) : (
          <>
            <Play className="w-4 h-4" />
            Analyze Code
          </>
        )}
      </button>
    </div>
  );
}