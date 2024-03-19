// OrdersContext.js
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import { base_url } from '../constants/server';


const SellerContext = createContext();

const initialState = {
  product: null, // Initial state for a single order
  loading: true,
  error: null,
};

const sellerReducer = (state, action) => {
  switch (action.type) {
    case 'SET_VALUE':
      return { ...state, product:{...state.product,...action.payload}, loading: false, error: null };
    
    case 'REMOVE_PRODUCT':
      return { ...state, product: null, loading: false, error: null };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    
    default:
      return state;
  }
};
  

const SellerProvider = ({ children }) => {
  const [state, dispatch] = useReducer(sellerReducer, initialState);
 
  const addValue =  productData => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });

      dispatch({ type: 'SET_VALUE', payload: productData });
    } catch (error) {
      console.error('Error adding order:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Error adding order' });
    }
  };
  

  const deleteProduct =  () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });

      dispatch({ type: 'REMOVE_PRODUCT', payload: {} });
    } catch (error) {
      console.error('Error deleting order:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Error deleting order' });
    }
  };

  return (
    <SellerContext.Provider
      value={{
        ...state,
        addValue,
        deleteProduct,
      }}
    >
      {children}
    </SellerContext.Provider>
  );
};

const useSeller = () => {
  const context = useContext(SellerContext);
  if (!context) {
    throw new Error('Seller Provider Error');
  }
  return context;
};

export { SellerProvider, useSeller };
