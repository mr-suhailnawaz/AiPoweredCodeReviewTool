export interface Review {
  id: string;
  line: number;
  type: 'error' | 'warning' | 'suggestion' | 'info';
  message: string;
  code?: string;
  fix?: string;
}

// Mock AI analysis to simulate real GPT API responses
export const generateMockReview = (code: string, language: string): Review[] => {
  const lines = code.split('\n');
  const reviews: Review[] = [];
  
  // Common patterns to check
  lines.forEach((line, index) => {
    const lineNumber = index + 1;
    const trimmedLine = line.trim();
    
    // JavaScript/TypeScript specific checks
    if (language === 'javascript' || language === 'typescript') {
      if (trimmedLine.includes('var ')) {
        reviews.push({
          id: `var-${lineNumber}`,
          line: lineNumber,
          type: 'warning',
          message: 'Consider using "let" or "const" instead of "var" for better scoping.',
          code: trimmedLine,
          fix: trimmedLine.replace('var ', 'const ')
        });
      }
      
      if (trimmedLine.includes('==') && !trimmedLine.includes('===')) {
        reviews.push({
          id: `equality-${lineNumber}`,
          line: lineNumber,
          type: 'suggestion',
          message: 'Use strict equality (===) instead of loose equality (==) for better type safety.',
          code: trimmedLine,
          fix: trimmedLine.replace('==', '===')
        });
      }
      
      if (trimmedLine.includes('fibonacci') && trimmedLine.includes('return fibonacci')) {
        reviews.push({
          id: `recursion-${lineNumber}`,
          line: lineNumber,
          type: 'warning',
          message: 'This recursive implementation has exponential time complexity. Consider using dynamic programming.',
          code: trimmedLine,
          fix: '// Use memoization or iterative approach for better performance'
        });
      }
    }
    
    // Python specific checks
    if (language === 'python') {
      if (trimmedLine.includes('fibonacci') && trimmedLine.includes('return fibonacci')) {
        reviews.push({
          id: `recursion-${lineNumber}`,
          line: lineNumber,
          type: 'warning',
          message: 'Recursive fibonacci implementation is inefficient. Consider using iterative approach or memoization.',
          code: trimmedLine,
          fix: '@lru_cache(maxsize=None)\ndef fibonacci(n):'
        });
      }
      
      if (trimmedLine.match(/^[a-zA-Z_][a-zA-Z0-9_]*\s*=/) && !trimmedLine.includes('def ')) {
        reviews.push({
          id: `naming-${lineNumber}`,
          line: lineNumber,
          type: 'info',
          message: 'Variable naming follows Python conventions. Good job!',
          code: trimmedLine
        });
      }
    }
    
    // General checks for all languages
    if (trimmedLine.length > 100) {
      reviews.push({
        id: `line-length-${lineNumber}`,
        line: lineNumber,
        type: 'suggestion',
        message: 'Line is too long. Consider breaking it into multiple lines for better readability.',
        code: trimmedLine
      });
    }
    
    if (trimmedLine.includes('console.log') || trimmedLine.includes('print(')) {
      reviews.push({
        id: `debug-${lineNumber}`,
        line: lineNumber,
        type: 'info',
        message: 'Debug statement detected. Consider removing before production.',
        code: trimmedLine
      });
    }
    
    // Complexity analysis
    if (trimmedLine.includes('for') || trimmedLine.includes('while')) {
      reviews.push({
        id: `loop-${lineNumber}`,
        line: lineNumber,
        type: 'info',
        message: 'Loop detected. Ensure proper bounds checking to prevent infinite loops.',
        code: trimmedLine
      });
    }
  });
  
  // Add some general suggestions
  if (code.includes('fibonacci')) {
    reviews.push({
      id: 'algorithm-analysis',
      line: 1,
      type: 'suggestion',
      message: 'Algorithm Analysis: The fibonacci function has O(2^n) time complexity. For better performance, consider implementing with dynamic programming (O(n)) or matrix exponentiation (O(log n)).',
      code: '// Current implementation',
      fix: `// Optimized iterative approach:
function fibonacci(n) {
  if (n <= 1) return n;
  let a = 0, b = 1;
  for (let i = 2; i <= n; i++) {
    [a, b] = [b, a + b];
  }
  return b;
}`
    });
  }
  
  // Code quality suggestions
  reviews.push({
    id: 'code-quality',
    line: 1,
    type: 'info',
    message: 'Code Quality: Consider adding input validation, error handling, and comprehensive documentation for production use.',
  });
  
  return reviews;
};

// Simulate API delay
export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));