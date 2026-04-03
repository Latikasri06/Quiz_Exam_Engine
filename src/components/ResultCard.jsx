import React from 'react';
import { CheckCircle, XCircle, Trophy, Target, AlertTriangle } from 'lucide-react';

const ResultCard = ({ results, totalQuestions, onRestart }) => {
  const { score, attempted, correct, wrong, percentage, details } = results;

  // Determine performance color and message
  let performanceColor = "text-emerald-500";
  let performanceBg = "bg-emerald-50";
  let message = "Excellent Work!";
  
  if (percentage < 40) {
    performanceColor = "text-red-500";
    performanceBg = "bg-red-50";
    message = "Needs Improvement";
  } else if (percentage < 70) {
    performanceColor = "text-amber-500";
    performanceBg = "bg-amber-50";
    message = "Good Attempt!";
  }

  return (
    <div className="max-w-3xl mx-auto w-full animate-fade-in">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden mb-8">
        <div className="p-8 text-center border-b border-slate-100 bg-slate-50/50">
          <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full ${performanceBg} ${performanceColor} mb-4`}>
            {percentage >= 70 ? <Trophy className="w-10 h-10" /> : <Target className="w-10 h-10" />}
          </div>
          <h2 className="text-3xl font-bold text-slate-800 mb-2">Quiz Completed!</h2>
          <p className={`text-lg font-medium ${performanceColor}`}>{message}</p>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <StatBox label="Score" value={score} icon={<Trophy className="w-4 h-4" />} color="text-indigo-600" bg="bg-indigo-50" />
            <StatBox label="Attempted" value={`${attempted}/${totalQuestions}`} icon={<Target className="w-4 h-4" />} color="text-blue-600" bg="bg-blue-50" />
            <StatBox label="Correct" value={correct} icon={<CheckCircle className="w-4 h-4" />} color="text-emerald-600" bg="bg-emerald-50" />
            <StatBox label="Wrong (-0.25)" value={wrong} icon={<AlertTriangle className="w-4 h-4" />} color="text-red-600" bg="bg-red-50" />
          </div>

          <div className="w-full bg-slate-100 rounded-full h-3 mb-2">
            <div 
              className="bg-indigo-500 h-3 rounded-full transition-all duration-1000" 
              style={{ width: `${Math.max(0, percentage)}%` }}
            ></div>
          </div>
          <div className="text-right text-sm font-medium text-slate-500 mb-8">
            {Math.max(0, percentage).toFixed(1)}% Accuracy
          </div>

          <div className="flex justify-center">
            <button
              onClick={onRestart}
              className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-colors shadow-sm focus:ring-4 focus:ring-indigo-100"
            >
              Restart Quiz
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
        <h3 className="text-xl font-bold text-slate-800 mb-6">Detailed Analysis</h3>
        <div className="space-y-6">
          {details.map((item, index) => (
            <div key={index} className={`p-5 rounded-xl border ${item.isCorrect ? 'border-emerald-100 bg-emerald-50/30' : (item.userAnswer ? 'border-red-100 bg-red-50/30' : 'border-slate-100 bg-slate-50')}`}>
              <div className="flex gap-4">
                <div className="mt-1">
                  {item.isCorrect ? (
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                  ) : item.userAnswer ? (
                    <XCircle className="w-5 h-5 text-red-500" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 text-slate-400" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-slate-800 mb-3">{item.id}. {item.question}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    <div className="p-3 rounded-lg bg-white border border-slate-200">
                      <span className="block text-slate-500 text-xs mb-1 uppercase tracking-wider font-semibold">Your Answer</span>
                      <span className={item.isCorrect ? 'text-emerald-700 font-medium' : (item.userAnswer ? 'text-red-700 font-medium' : 'text-slate-500 italic')}>
                        {item.userAnswer || "Not attempted"}
                      </span>
                    </div>
                    {!item.isCorrect && (
                      <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-100">
                        <span className="block text-emerald-600 text-xs mb-1 uppercase tracking-wider font-semibold">Correct Answer</span>
                        <span className="text-emerald-700 font-medium">{item.correctAnswer}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const StatBox = ({ label, value, icon, color, bg }) => (
  <div className={`${bg} rounded-xl p-4 flex flex-col items-center justify-center text-center`}>
    <div className={`${color} mb-2`}>{icon}</div>
    <div className={`text-2xl font-bold ${color} mb-1`}>{value}</div>
    <div className="text-xs font-semibold text-slate-600 uppercase tracking-wide">{label}</div>
  </div>
);

export default ResultCard;
