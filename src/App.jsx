import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QuizProvider } from './context/QuizContext';

const StartPage = lazy(() => import('./StartPage'));
const QuizPage = lazy(() => import('./features/quiz/QuizPage'));
const ResultPage = lazy(() => import('./features/quiz/ResultPage'));

const Loader = () => (
  <div className="min-h-screen flex items-center justify-center bg-slate-50">
    <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
  </div>
);

function App() {
  return (
    <Router>
      <QuizProvider>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<StartPage />} />
            <Route path="/quiz" element={<QuizPage />} />
            <Route path="/result" element={<ResultPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </QuizProvider>
    </Router>
  );
}

export default App;
