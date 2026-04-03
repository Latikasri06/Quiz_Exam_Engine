import axios from 'axios';
import { questions } from '../data/questions';
import { shuffleArray } from '../utils/helpers';

export const fetchQuestions = async () => {
  // Simulating an API call with Promise delay
  return new Promise((resolve) => {
    setTimeout(() => {
      // Shuffle questions and options to make it dynamic
      const shuffled = shuffleArray(questions).map(q => ({
        ...q,
        options: shuffleArray(q.options)
      }));
      resolve({ data: shuffled });
    }, 600);
  });
};
