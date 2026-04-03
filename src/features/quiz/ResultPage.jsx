import React, { useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuiz } from './useQuiz';
import ResultCard from '../../components/ResultCard';

const ResultPage = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useQuiz();
  const { questions, answers, status } = state;

  useEffect(() => {
    if (status !== 'submitted') {
      navigate('/');
    }
  }, [status, navigate]);

  const results = useMemo(() => {
    if (!questions.length) return null;
    let correctCount = 0;
    let wrongCount = 0;
    let details = [];

    questions.forEach((q, index) => {
      const userAnswer = answers[q.id];
      const isCorrect = userAnswer === q.correctAnswer;
      
      if (userAnswer) {
        if (isCorrect) correctCount++;
        else wrongCount++;
      }

      details.push({
        id: index + 1, // Fixed ID numbering
        question: q.question,
        correctAnswer: q.correctAnswer,
        userAnswer: userAnswer,
        isCorrect: isCorrect
      });
    });

    const attempted = correctCount + wrongCount;
    const score = Math.max(0, correctCount - (wrongCount * 0.25));
    const percentage = (score / questions.length) * 100;

    return {
      attempted,
      correct: correctCount,
      wrong: wrongCount,
      score,
      percentage,
      details
    };
  }, [questions, answers]);

  if (!results) return null;

  const handleRestart = () => {
    dispatch({ type: 'RESET_QUIZ' });
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <ResultCard 
        results={results} 
        totalQuestions={questions.length} 
        onRestart={handleRestart} 
      />
    </div>
  );
};

export default ResultPage;
