// OrdersContext.js
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import { base_url } from '../constants/server';


const OrdersContext = createContext();

const initialState = {
  orders: [],
  order: null, // Initial state for a single order
  loading: true,
  error: null,
};

const ordersReducer = (state, action) => {
  switch (action.type) {
    case 'SET_ORDERS':
      return { ...state, orders: action.payload, loading: false, error: null };
    case 'SET_ORDER':
      return { ...state, order: action.payload, loading: false, error: null };
    case 'ADD_ORDER':
      return { ...state, orders: [action.payload, ...state.orders], loading: false, error: null };
    case 'UPDATE_ORDER':
      const updatedOrders = state.orders.map(order =>
        order._id === action.payload._id ? action.payload : order
      );
      return { ...state, orders: updatedOrders, loading: false, error: null, order: null }; // Clear order after update
    case 'DELETE_ORDER':
      const filteredOrders = state.orders.filter(order => order._id !== action.payload);
      return { ...state, orders: filteredOrders, loading: false, error: null };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'CLEAR_ORDER':
      return { ...state, order: null }; // Clear order
    default:
      return state;
  }
};
  

const OrdersProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ordersReducer, initialState);


  
  const getOrders = async (id) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });

      // Fetch token from AsyncStorage
      const token = await AsyncStorage.getItem('token');
      const response = await axios.get(`${base_url}/order/get-all-orders/${id}`, {
        headers: {
          Authorization: token,
        },
      });

      dispatch({ type: 'SET_ORDERS', payload: response.data });
    } catch (error) {
      console.error('Error fetching orders:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Error fetching orders' });
    }
  };

  const getOrderById = async (id) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
  
      
  
      // Fetch token from AsyncStorage
      const token = await AsyncStorage.getItem('token');
      const response = await axios.get(`${server}/orders/${id}`, {
        headers: {
          Authorization: token,
        },
      });
  
      dispatch({ type: 'SET_ORDER', payload: response.data }); // Set the order data
    } catch (error) {
      console.error('Error fetching order by ID:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Error fetching order by ID' });
    }
  };
  



  const addOrder = async orderData => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });

      // Fetch token from AsyncStorage
      const token = await AsyncStorage.getItem('token');

      const response = await axios.post(`${server}/orders`, orderData, {
        headers: {
          Authorization: token,
        },
      });

      dispatch({ type: 'ADD_ORDER', payload: response.data });
    } catch (error) {
      console.error('Error adding order:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Error adding order' });
    }
  };

  const updateOrder = async (id, orderData) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
  
      // Fetch token from AsyncStorage
      const token = await AsyncStorage.getItem('token');
  
      const response = await axios.put(`${server}/orders/${id}`, orderData, {
        headers: {
          Authorization: token,
        },
      });
  
      dispatch({ type: 'UPDATE_ORDER', payload: response.data });
  
      // Fetch the updated order again and set it in the state
      await getOrderById(id);
    } catch (error) {
      console.error('Error updating order:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Error updating order' });
    }
  };
  

  const deleteOrder = async id => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });

      // Fetch token from AsyncStorage
      const token = await AsyncStorage.getItem('token');

      await axios.delete(`${server}/orders/${id}`, {
        headers: {
          Authorization: token,
        },
      });

      dispatch({ type: 'DELETE_ORDER', payload: id });
    } catch (error) {
      console.error('Error deleting order:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Error deleting order' });
    }
  };

  return (
    <OrdersContext.Provider
      value={{
        ...state,
        getOrders,
        getOrderById,
        addOrder,
        updateOrder,
        deleteOrder,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
};

const useOrders = () => {
  const context = useContext(OrdersContext);
  if (!context) {
    throw new Error('useOrders must be used within a OrdersProvider');
  }
  return context;
};

export { OrdersProvider, useOrders };
