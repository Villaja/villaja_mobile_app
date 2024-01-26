import { useRouter } from 'expo-router';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import { TouchableOpacity } from 'react-native';
import ModalHeaderText from '../components/ModalHeaderText';
import { StatusBar } from 'react-native';


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
   
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
        name="(modals)/login"
        options={{
          presentation: 'modal',
          title: 'Log in',
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
      <Stack.Screen name="listing/[id]" options={{ headerTitle: '' }} />
      {/* <Stack.Screen
        name="(modals)/booking"
        options={{
          presentation: 'transparentModal',
          animation: 'fade',
          headerTransparent: true,
          headerTitle: (props) => <ModalHeaderText />,
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.back()}
              style={{
                backgroundColor: '#fff',
                borderColor: Colors.grey,
                borderRadius: 20,
                borderWidth: 1,
                padding: 4,
              }}>
              <Ionicons name="close-outline" size={22} />
            </TouchableOpacity>
          ),
        }}
      /> */}

      

      </Stack>
   
  );
}
