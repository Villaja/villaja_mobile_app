// quickSellContext.js
import React, { createContext, useContext, useReducer } from 'react';

const quickSellContext = createContext();

const initialState = {
  quickSellPayload: {},
  loading: true,
  error: null,
};

const quickSellReducer = (state, action) => {
  switch (action.type) {
    case 'SET_PAYLOAD':
      return { ...state, quickSellPayload: action.payload, loading: false, error: null };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

const QuickSellProvider = ({ children }) => {
  const [state, dispatch] = useReducer(quickSellReducer, initialState);

  const setQuickSellPayload = async (payload, callback) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_PAYLOAD', payload });
      if (callback) callback();
    } catch (error) {
      console.error('Error setting quick sell payload:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Error setting quick sell payload' });
    }
  };

  return (
    <quickSellContext.Provider value={{ ...state, setQuickSellPayload }}>
      {children}
    </quickSellContext.Provider>
  );
};

const useQuickSell = () => {
  const context = useContext(quickSellContext);
  if (!context) {
    throw new Error('useQuickSell must be used within a QuickSellProvider');
  }
  return context;
};

export { QuickSellProvider, useQuickSell };
