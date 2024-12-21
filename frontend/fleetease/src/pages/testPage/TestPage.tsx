'use client'

import React, { useState } from 'react';
import { useUser } from '../../contexts/UserContext';
import TestButton from './components/TestButton';

const TestPage: React.FC = () => {
  const { isAuthenticated } = useUser();
  const [testResults, setTestResults] = useState<string[]>([]);

  const runAuthTest = () => {
    const result = `Authentication Test: isAuthenticated is ${isAuthenticated ? 'true' : 'false'}`;
    setTestResults(prev => [...prev, result]);
  };

  const runAsyncTest = () => {
    setTestResults(prev => [...prev, 'Async Test: Starting...']);
    setTimeout(() => {
      setTestResults(prev => [...prev, 'Async Test: Completed after 1 second']);
    }, 1000);
  };

  const runMathTest = () => {
    const result = 2 + 2 === 4;
    setTestResults(prev => [...prev, `Math Test: 2 + 2 = 4 is ${result ? 'correct' : 'incorrect'}`]);
  };

  const clearResults = () => {
    setTestResults([]);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Test Page</h1>
      <div className="mb-4">
        <TestButton label="Run Auth Test" onClick={runAuthTest} />
        <TestButton label="Run Async Test" onClick={runAsyncTest} />
        <TestButton label="Run Math Test" onClick={runMathTest} />
        <TestButton label="Clear Results" onClick={clearResults} />
      </div>
      {testResults.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Test Results:</h2>
          <ul className="list-disc pl-5">
            {testResults.map((result, index) => (
              <li key={index} className={result.includes('true') || result.includes('correct') || result.includes('Completed') ? 'text-green-600' : 'text-red-600'}>
                {result}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TestPage;

