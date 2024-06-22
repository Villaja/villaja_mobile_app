// productUploadContext.js
import React, { createContext, useContext, useReducer } from 'react';

const productUploadContext = createContext();

const initialState = {
  productPayload: {},
  loading: true,
  error: null,
};

const productUploadReducer = (state, action) => {
  switch (action.type) {
    case 'SET_PAYLOAD':
      return { ...state, productUploadPayload: action.payload, loading: false, error: null };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

const ProductUploadProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productUploadReducer, initialState);

  const setProductUploadPayload = async (payload, callback) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_PAYLOAD', payload });
      if (callback) callback();
    } catch (error) {
      console.error('Error setting product upload payload:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Error setting product upload payload' });
    }
  };

  return (
    <productUploadContext.Provider value={{ ...state, setProductUploadPayload }}>
      {children}
    </productUploadContext.Provider>
  );
};

const useProductUpload = () => {
  const context = useContext(productUploadContext);
  if (!context) {
    throw new Error('useProductUpload must be used within a ProductUploadProvider');
  }
  return context;
};

export { ProductUploadProvider, useProductUpload };
