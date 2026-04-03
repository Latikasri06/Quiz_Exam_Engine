import React, { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuiz } from './useQuiz';
import { useTimer } from '../../hooks/useTimer';
import QuestionCard from '../../components/QuestionCard';
import QuestionPalette from '../../components/QuestionPalette';
import Timer from '../../components/Timer';
import { ArrowRight, ArrowLeft, Send } from 'lucide-react';

const QuizPage = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useQuiz();
  const { questions, currentQuestionIndex, answers, status } = state;
  
  // 10 minutes * 60 seconds = 600
  const TIME_LIMIT = 600;

  const handleTimeout = useCallback(() => {
    dispatch({ type: 'SUBMIT_QUIZ' });
    navigate('/result', { replace: true });
  }, [dispatch, navigate]);

  const { timeRemaining, startTimer } = useTimer(TIME_LIMIT, handleTimeout);

  useEffect(() => {
    if (status === 'idle') {
      navigate('/');
    } else if (status === 'active') {
      startTimer();
    }
  }, [status, navigate, startTimer]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && status === 'active') {
        alert("Warning: You switched tabs! This activity is monitored.");
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [status]);

  if (status !== 'active') return null;

  const currentQuestion = questions[currentQuestionIndex];
  const progress = (Object.keys(answers).length / questions.length) * 100;

  const handleAnswerSelect = (questionId, answer) => {
    dispatch({ type: 'SET_ANSWER', payload: { questionId, answer } });
  };

  const setQuestionIndex = (index) => {
    dispatch({ type: 'SET_CURRENT_INDEX', payload: index });
  };

  const handleNext = () => setQuestionIndex(currentQuestionIndex + 1);
  const handlePrev = () => setQuestionIndex(currentQuestionIndex - 1);

  const handleSubmit = () => {
    if (window.confirm('Are you sure you want to submit the quiz?')) {
      dispatch({ type: 'SUBMIT_QUIZ' });
      navigate('/result', { replace: true });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl mx-auto">
        <header className="flex flex-col sm:flex-row items-center justify-between bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-slate-100 mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">React Core Assessment</h1>
            <p className="text-slate-500 text-sm mt-1">Answer all questions carefully</p>
          </div>
          <div className="flex items-center gap-6">
            <div className="hidden md:block w-48 bg-slate-100 rounded-full h-2">
              <div className="bg-indigo-500 h-2 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
            </div>
            <Timer timeRemaining={timeRemaining} />
          </div>
        </header>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <QuestionCard 
              question={currentQuestion}
              currentIndex={currentQuestionIndex}
              currentAnswer={answers[currentQuestion.id]}
              onAnswerSelect={handleAnswerSelect}
            />
            <div className="flex items-center justify-between mt-6">
              <button onClick={handlePrev} disabled={currentQuestionIndex === 0} className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 disabled:opacity-50 transition-all">
                <ArrowLeft className="w-5 h-5" /> Previous
              </button>
              {currentQuestionIndex < questions.length - 1 ? (
                <button onClick={handleNext} className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-all">
                  Next <ArrowRight className="w-5 h-5" />
                </button>
              ) : (
                <button onClick={handleSubmit} className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-white bg-emerald-600 hover:bg-emerald-700 transition-all">
                  Submit <Send className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
          <div className="w-full lg:w-80 shrink-0 space-y-6">
            <QuestionPalette questions={questions} currentQuestionIndex={currentQuestionIndex} setCurrentQuestionIndex={setQuestionIndex} answers={answers} />
            <button onClick={handleSubmit} className="w-full py-4 rounded-xl border-2 border-red-100 text-red-600 font-semibold hover:bg-red-50 transition-all text-sm uppercase">
              End Exam Early
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default QuizPage;
