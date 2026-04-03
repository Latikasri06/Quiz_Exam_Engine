import React, { createContext, useReducer, useEffect } from 'react';

export const QuizContext = createContext();

// Load complete persisted state from local storage if it exists
const loadPersistedState = () => {
  try {
    const saved = localStorage.getItem('quiz_session');
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error("Failed to parse quiz session", e);
  }
  return null;
};

const persistedState = loadPersistedState();

const initialState = persistedState || {
  questions: [],
  answers: {},
  status: 'idle', // idle, loading, active, submitted
  currentQuestionIndex: 0,
};

const quizReducer = (state, action) => {
  let newState;
  switch (action.type) {
    case 'SET_LOADING':
      newState = { ...state, status: 'loading' };
      break;
    case 'SET_QUESTIONS':
      newState = { ...state, questions: action.payload, status: 'active', currentQuestionIndex: 0, answers: {} };
      break;
    case 'SET_ANSWER': {
      const newAnswers = { ...state.answers, [action.payload.questionId]: action.payload.answer };
      newState = { ...state, answers: newAnswers };
      break;
    }
    case 'SET_CURRENT_INDEX':
      newState = { ...state, currentQuestionIndex: action.payload };
      break;
    case 'SUBMIT_QUIZ':
      newState = { ...state, status: 'submitted' };
      break;
    case 'RESET_QUIZ':
      localStorage.removeItem('quiz_session');
      localStorage.removeItem('quiz_time');
      return { questions: [], answers: {}, status: 'idle', currentQuestionIndex: 0 };
    default:
      return state;
  }
  
  // Persist session automatically on state updates
  if (action.type !== 'RESET_QUIZ') {
    localStorage.setItem('quiz_session', JSON.stringify(newState));
  }
  
  return newState;
};

export const QuizProvider = ({ children }) => {
  const [state, dispatch] = useReducer(quizReducer, initialState);

  return (
    <QuizContext.Provider value={{ state, dispatch }}>
      {children}
    </QuizContext.Provider>
  );
};
