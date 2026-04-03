import React from 'react';

const QuestionPalette = ({ questions, currentQuestionIndex, setCurrentQuestionIndex, answers }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
      <h3 className="font-semibold text-slate-800 mb-4 flex items-center justify-between">
        Question Palette
        <span className="text-sm font-normal text-slate-500">
          {Object.keys(answers).length}/{questions.length} Answered
        </span>
      </h3>
      <div className="grid grid-cols-5 gap-2 sm:grid-cols-4 md:grid-cols-5">
        {questions.map((q, index) => {
          const isAnswered = answers.hasOwnProperty(q.id);
          const isCurrent = currentQuestionIndex === index;

          let btnClass = "w-10 h-10 rounded-lg flex items-center justify-center font-medium text-sm transition-all duration-200 border ";

          if (isCurrent) {
            btnClass += "border-blue-500 bg-blue-500 text-white shadow-md shadow-blue-500/20";
          } else if (isAnswered) {
            btnClass += "border-emerald-500 bg-emerald-50 text-emerald-600";
          } else {
            btnClass += "border-slate-200 bg-slate-50 text-slate-600 hover:border-blue-300 hover:bg-blue-50/50";
          }

          return (
            <button
              key={q.id}
              onClick={() => setCurrentQuestionIndex(index)}
              className={btnClass}
              title={isAnswered ? "Answered" : "Not Answered"}
            >
              {index + 1}
            </button>
          );
        })}
      </div>
      
      <div className="mt-6 space-y-3 pt-6 border-t border-slate-100">
        <div className="flex items-center gap-3 text-sm text-slate-600">
          <div className="w-4 h-4 rounded bg-blue-500 border border-blue-500"></div> Current
        </div>
        <div className="flex items-center gap-3 text-sm text-slate-600">
          <div className="w-4 h-4 rounded bg-emerald-50 border border-emerald-500"></div> Answered
        </div>
        <div className="flex items-center gap-3 text-sm text-slate-600">
          <div className="w-4 h-4 rounded bg-slate-50 border border-slate-200"></div> Not Answered
        </div>
      </div>
    </div>
  );
};

export default QuestionPalette;
