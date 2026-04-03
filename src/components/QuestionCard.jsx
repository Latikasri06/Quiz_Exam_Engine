import React from 'react';

const QuestionCard = ({ question, currentIndex, currentAnswer, onAnswerSelect }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 sm:p-8 animate-fade-in transition-all">
      <div className="flex items-start gap-4 mb-6">
        <span className="flex items-center justify-center min-w-8 min-h-8 rounded-full bg-blue-100 text-blue-600 font-bold text-sm shrink-0">
          {currentIndex + 1}
        </span>
        <h2 className="text-xl font-medium text-slate-800 leading-snug">
          {question.question}
        </h2>
      </div>

      <div className="space-y-3">
        {question.options.map((option, index) => {
          const isSelected = currentAnswer === option;
          return (
            <label
              key={index}
              className={`flex items-center gap-4 p-4 rounded-lg cursor-pointer border transition-all duration-200 ${
                isSelected
                  ? 'border-blue-500 bg-blue-50/50 shadow-sm ring-1 ring-blue-500'
                  : 'border-slate-200 hover:border-blue-300 hover:bg-slate-50'
              }`}
            >
              <div
                className={`flex items-center justify-center w-5 h-5 rounded-full border shrink-0 ${
                  isSelected ? 'border-blue-500' : 'border-slate-300'
                }`}
              >
                {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />}
              </div>
              <input
                type="radio"
                name={`question-${question.id}`}
                value={option}
                checked={isSelected}
                onChange={() => onAnswerSelect(question.id, option)}
                className="hidden"
              />
              <span className={`text-slate-700 ${isSelected ? 'font-medium' : ''}`}>
                {option}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default QuestionCard;
