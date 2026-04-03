import React from 'react';
import { Timer as TimerIcon } from 'lucide-react';
import { formatTime } from '../utils/helpers';

const Timer = ({ timeRemaining }) => {
  const isDanger = timeRemaining < 60;
  return (
    <div className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-lg transition-colors duration-300 ${isDanger ? 'bg-red-100 text-red-600 animate-pulse' : 'bg-blue-50 text-blue-700'}`}>
      <TimerIcon className="w-5 h-5" />
      <span>{formatTime(timeRemaining)}</span>
    </div>
  );
};

export default Timer;
