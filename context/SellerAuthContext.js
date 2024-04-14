// SellerAuthContext.js
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { base_url } from '../constants/server';

const SellerAuthContext = createContext();

const initialState = {
  token: null,
  seller: null,
  isLoading: true,
  error: null,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'SET_TOKEN':
      return { ...state, token: action.payload };
    case 'SET_SELLER':
      return { ...state, seller: action.payload };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

const SellerAuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem('sellerToken');
        if (token) {
          dispatch({ type: 'SET_TOKEN', payload: token });
          // Fetch user details after setting the token
          await getSellerDetails(token);
        }
      } catch (error) {
        console.error('Error checking token from AsyncStorage:', error);
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    };

    checkToken();
  }, []);

  const login = async (email, password) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });

      const response = await axios.post(`${base_url}/shop/login-shop`, { email, password });
     
      await AsyncStorage.setItem('sellerToken', response.data.token);
     

      dispatch({ type: 'SET_TOKEN', payload: response.data.token });
     
      await getSellerDetails(response.data.token);
    } catch (error) {
      console.log('Request Details:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Login failed' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

//   const register = async (firstname, lastname, phoneNumber, email, password) => {
//     try {
//       dispatch({ type: 'SET_LOADING', payload: true });

//       const response = await axios.post(`https://api-villaja.cyclic.app/api/user/register`, { firstname, lastname, email, phoneNumber, password });


//       dispatch({ type: 'SET_TOKEN', payload: response.data.token });
//       await AsyncStorage.setItem('token', response.data.token);

     
//       console.log("register success")
//     } catch (error) {
//       console.error('Registration failed:', error);
//       dispatch({ type: 'SET_ERROR', payload: 'Registration failed' });
//     } finally {
//       dispatch({ type: 'SET_LOADING', payload: false });
//     }
//   };

  const getSellerDetails = async (token) => {
    try {
      const response = await axios.get(`${base_url}/shop/getSeller`, {
        headers: {
          Authorization: token,
        },
      });
      
      await AsyncStorage.setItem('seller', JSON.stringify(response.data));
      dispatch({ type: 'SET_SELLER', payload: response.data });
    } catch (error) {
      console.error('Error fetching seller details:', error);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('sellerToken');
      await AsyncStorage.removeItem('seller');
      dispatch({ type: 'SET_TOKEN', payload: null });
      dispatch({ type: 'SET_SELLER', payload: null });
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <SellerAuthContext.Provider
      value={{
        ...state,
        login,
        logout,
      }}
    >
      {children}
    </SellerAuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(SellerAuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an SellerAuthProvider');
  }
  return context;
};

// get All Products of a shop
 const getAllProductsShop = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "getAllProductsShopRequest",
    });

    const { data } = await axios.get(
      `${base_url}/product/get-all-products-shop/${id}`
    );
    dispatch({
      type: "getAllProductsShopSuccess",
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: "getAllProductsShopFailed",
      payload: error.response.data.message,
    });
  }
};

export { SellerAuthProvider, useAuth, getAllProductsShop };
