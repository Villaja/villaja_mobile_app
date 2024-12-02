// AuthContext.js
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { base_url } from '../constants/server';

const AuthContext = createContext();

const initialState = {
  token: null,
  user: null,
  isLoading: true,
  error: null,
  message: null,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'SET_TOKEN':
      return { ...state, token: action.payload };
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, message: null };
    case "SET_SUCCESS":
      return { ...state, message: action.payload, error: null };
    case "CLEAR_MESSAGE":
      return { ...state, message: null, error: null };
    default:
      return state;
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          dispatch({ type: 'SET_TOKEN', payload: token });
          // Fetch user details after setting the token
          await getUserDetails(token);
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

      const response = await axios.post(`${base_url}/user/login`, { email, password });

      await AsyncStorage.setItem('token', response.data.token);

      // Check if loginTime already exists and is still valid
      const storedLoginTime = await AsyncStorage.getItem('loginTime');
      const currentTime = Date.now();

      if (storedLoginTime) {
        const loginTime = JSON.parse(storedLoginTime);

        if (currentTime >= loginTime) {
          // If the current time is past the expiry time, set a new loginTime
          await AsyncStorage.setItem('loginTime', JSON.stringify(loginTime));
        }
      } else {
        // If no loginTime is set at all, then set it
        await AsyncStorage.setItem('loginTime', JSON.stringify(Date.now() + 12 * 60 * 60 * 1000));
      }

      dispatch({ type: 'SET_TOKEN', payload: response.data.token });
      
      await getUserDetails(response.data.token);
    } catch (error) {
      console.log('Request Details:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Login failed' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const register = async (firstname, lastname, phoneNumber, email, password, token) => {
    console.log(`submit token: ${token}`)
    try {
      dispatch({ type: 'SET_LOADING', payload: true });

      const response = await axios.post(`${base_url}/user/register`, { firstname, lastname, email, phoneNumber, password, pushNotificationToken: token });


      dispatch({ type: 'SET_TOKEN', payload: response.data.token });
      await AsyncStorage.setItem('token', response.data.token);

      // dispatch({ type: 'SET_TOKEN', payload: response.data.token });
     
      // await getUserDetails(response.data.token);
      console.log("register success")
    } catch (error) {
      console.error('Registration failed:', error);
      dispatch({ type: 'SET_ERROR', payload: 'Registration failed' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const getUserDetails = async (token) => {
    try {
      const response = await axios.get(`${base_url}/user/getuser`, {
        headers: {
          Authorization: token,
        },
      });
      await AsyncStorage.setItem('user', JSON.stringify(response.data.user));
      dispatch({ type: 'SET_USER', payload: response.data });
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  const deleteUser = async (password) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'CLEAR_MESSAGE' });  
      
      const token = await AsyncStorage.getItem('token');
      const response = await axios.delete(`${base_url}/user/delete-account`, {
        headers: {
          Authorization: token,
        },
        data: { password },
      });

      if (response.data.success) {
        await logout();
        dispatch({ type: 'SET_SUCCESS', payload: response.data.message });
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.response.data.message });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.removeItem('user');
      dispatch({ type: 'SET_TOKEN', payload: null });
      dispatch({ type: 'SET_USER', payload: null });
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        register,
        logout,
        deleteUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth };
