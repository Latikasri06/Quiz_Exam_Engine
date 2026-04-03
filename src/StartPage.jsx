import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuiz } from './features/quiz/useQuiz';
import { fetchQuestions } from './services/quizService';

const StartPage = () => {
  const { state, dispatch } = useQuiz();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (state.status === 'active') {
      navigate('/quiz');
    } else if (state.status === 'submitted') {
      navigate('/result');
    }
  }, [state.status, navigate]);

  const handleStart = async () => {
    setLoading(true);
    const res = await fetchQuestions();
    dispatch({ type: 'SET_QUESTIONS', payload: res.data });
    navigate('/quiz');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4 py-8 font-sans">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-center animate-fade-in">
        <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg xmlns="http://www.w3.org/w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-slate-800 mb-2">React Knowledge Test</h1>
        <p className="text-slate-500 mb-8 leading-relaxed">
          Test your skills with this timer-based examination. 
          There is a <span className="font-semibold text-rose-500">-0.25</span> negative marking for wrong answers.
        </p>
        <div className="bg-slate-50 rounded-xl p-4 mb-8 text-left text-sm text-slate-600 space-y-2">
          <p className="flex items-center gap-2">✓ <strong>10</strong> Multiple choice questions</p>
          <p className="flex items-center gap-2">✓ <strong>10:00</strong> Minutes total time</p>
          <p className="flex items-center gap-2">✓ Tab switching is monitored</p>
        </div>
        <button 
          onClick={handleStart}
          disabled={loading}
          className="w-full h-14 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm focus:ring-4 focus:ring-indigo-100 disabled:opacity-75"
        >
          {loading ? (
            <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          ) : 'Start Exam Now'}
        </button>
      </div>
    </div>
  );
};

export default StartPage;
