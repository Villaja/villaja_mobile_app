import { useRouter } from 'expo-router';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import { TouchableOpacity } from 'react-native';
import ModalHeaderText from '../components/ModalHeaderText';
import { StatusBar } from 'react-native';
import React from 'react';
import { AuthProvider } from '../context/AuthContext';


export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    'roboto-condensed': require('../assets/fonts/RobotoCondensed-Regular.ttf'),
    'roboto-condensed-sb': require('../assets/fonts/RobotoCondensed-SemiBold.ttf'),
    'roboto-condensed-b': require('../assets/fonts/RobotoCondensed-Bold.ttf'),
    'roboto-condensed-thin': require('../assets/fonts/RobotoCondensed-Thin.ttf'),
    'roboto-condensed-sb-i': require('../assets/fonts/RobotoCondensed-SemiBoldItalic.ttf'),
    'roboto-condensed-i': require('../assets/fonts/RobotoCondensed-Italic.ttf'),
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return  <>
            <StatusBar barStyle="dark-content" />
            <RootLayoutNav />
          </>  
  }

function RootLayoutNav() {
  const router = useRouter();
 
  return (
    <AuthProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
        name="(modals)/landing"
        options={{
          // presentation: 'modal',
          title: '',
          headerShadowVisible:false,
          headerStyle:{
            backgroundColor:'transparent'
          },
          headerTitleStyle: {
            fontFamily: 'roboto-condensed-sb',
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="close-outline" size={28} />
            </TouchableOpacity>
          ),
        }}
      />
        <Stack.Screen
        name="(modals)/login"
        options={{
          // presentation: 'modal',
          title: '',
          headerShadowVisible:false,
          headerStyle:{
            backgroundColor:'transparent'
          },
          headerTitleStyle: {
            fontFamily: 'roboto-condensed-sb',
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="close-outline" size={28} />
            </TouchableOpacity>
          ),
        }}
      />
        <Stack.Screen
        name="(modals)/register"
        options={{
          // presentation: 'modal',
          title: '',
          headerShadowVisible:false,
          headerStyle:{
            backgroundColor:'transparent'
          },
          headerTitleStyle: {
            fontFamily: 'roboto-condensed-sb',
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="close-outline" size={28} />
            </TouchableOpacity>
          ),
        }}
      />
        <Stack.Screen
        name="(modals)/recovery"
        options={{
          // presentation: 'modal',
          title: '',
          headerShadowVisible:false,
          headerStyle:{
            backgroundColor:'transparent'
          },
          headerTitleStyle: {
            fontFamily: 'roboto-condensed-sb',
          },
          
        }}
      />
        <Stack.Screen
        name="(modals)/forgotPassword"
        options={{
          // presentation: 'modal',
          title: '',
          headerShadowVisible:false,
          headerStyle:{
            backgroundColor:'transparent'
          },
          headerTitleStyle: {
            fontFamily: 'roboto-condensed-sb',
          },
          
        }}
      />
        <Stack.Screen
        name="(modals)/changePassword"
        options={{
          // presentation: 'modal',
          title: '',
          headerShadowVisible:false,
          headerStyle:{
            backgroundColor:'transparent'
          },
          headerTitleStyle: {
            fontFamily: 'roboto-condensed-sb',
          },
          
          
        }}
        />
        <Stack.Screen
        name="(modals)/otp"
        options={{
          // presentation: 'modal',
          title: '',
          headerShadowVisible:false,
          headerStyle:{
            backgroundColor:'transparent'
          },
          headerTitleStyle: {
            fontFamily: 'roboto-condensed-sb',
          },
          
          
        }}
      />

      <Stack.Screen 
        name='product/[id]'
        options={{
          headerTitle:'',
          headerShadowVisible:false,
          headerLeft:() => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={24} color={"#000"} />
            </TouchableOpacity>
          ),
          headerRight:() => (
            <TouchableOpacity>
              <FontAwesome5 name="bookmark" size={20} color="rgba(0,0,0,0.40)" />
            </TouchableOpacity>
          )

        }}
      />
      <Stack.Screen 
        name='cartScreen/cart'
        options={{
          headerTitle:'',
          headerShadowVisible:false,
          headerLeft:() => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={24} color={"#000"} />
            </TouchableOpacity>
          ),
          

        }}
      />
      </Stack>
      </AuthProvider>
   
  );
}
