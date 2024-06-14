// quickSwapContext.js
import React, { createContext, useContext, useReducer} from 'react';

const quickSwapContext = createContext();

const initialState = {
  quickSwapPayload: {},
  loading: true,
  error: null,
};

const quickSwapReducer = (state, action) => {
  switch (action.type) {
    case 'SET_PAYLOAD':
      return { ...state, quickSwapPayload: action.payload, loading: false, error: null };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    
    default:
      return state;
  }
};
  

const QuickSwapProvider = ({ children }) => {
  const [state, dispatch] = useReducer(quickSwapReducer, initialState);


  
  const setQuickSwapPayload = async (payload) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });

      // Fetch token from AsyncStorage
      

      dispatch({ type: 'SET_PAYLOAD', payload });
    } catch (error) {
      console.error('Error setting quick swap payload:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Error setting quick swap payload' });
    }
  };

  

  return (
    <quickSwapContext.Provider
      value={{
        ...state,
        setQuickSwapPayload,
      }}
    >
      {children}
    </quickSwapContext.Provider>
  );
};

const useQuickSwap = () => {
  const context = useContext(quickSwapContext);
  if (!context) {
    throw new Error('useQuickSwap must be used within a QuickSwapProvider');
  }
  return context;
};

export { QuickSwapProvider, useQuickSwap };
