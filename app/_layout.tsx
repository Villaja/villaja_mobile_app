import { useRouter } from 'expo-router';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, useColorScheme, StyleSheet, Text } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import { TouchableOpacity } from 'react-native';
import ModalHeaderText from '../components/ModalHeaderText';
import { StatusBar } from 'react-native';
import React from 'react';
import { AuthProvider } from '../context/AuthContext';
import { SellerAuthProvider } from '../context/SellerAuthContext';
import { OrdersProvider } from '../context/OrderContext';
import { SellerProvider } from '../context/SellerContext';
import { QuickSwapProvider } from '../context/QuickSwapContext';
import { PaperProvider } from 'react-native-paper';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ProductUploadProvider } from "../context/ProductUpload";




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
    'roboto-condensed-m': require('../assets/fonts/RobotoCondensed-Medium.ttf'),
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

  return <>
    <StatusBar barStyle="dark-content" />
    <RootLayoutNav />
  </>
}

function RootLayoutNav() {
  const router = useRouter();

  const [isSeller, setIsSeller] = useState<boolean>(true)

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PaperProvider>
        <SellerProvider>
          <AuthProvider>
            <SellerAuthProvider>
              <QuickSwapProvider>
                <ProductUploadProvider>
                  <OrdersProvider>
                    <Stack>
                      {/* <Stack.Screen name="(Seller)" options={{ headerShown: false }} /> */}
                      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                      <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
                      <Stack.Screen
                        name="(modals)/landing"
                        options={{
                          // presentation: 'modal',
                          title: '',
                          headerShadowVisible: false,
                          headerStyle: {
                            backgroundColor: 'transparent'
                          },
                          headerTitleStyle: {
                            fontFamily: 'roboto-condensed-sb',
                            fontSize: 18
                          },
                          headerLeft: () => (
                            <TouchableOpacity onPress={() => router.back()}>
                              <Ionicons name="close-outline" size={20} />
                            </TouchableOpacity>
                          ),
                          headerShown: false
                        }}
                      />
                      <Stack.Screen
                        name="(modals)/firstLoadingScreen"
                        options={{
                          // presentation: 'modal',
                          headerShown: false
                        }}
                      />
                      <Stack.Screen
                        name="(modals)/login"
                        options={{
                          // presentation: 'modal',
                          title: '',
                          headerShadowVisible: false,
                          headerStyle: {
                            backgroundColor: 'transparent'
                          },
                          headerTitleStyle: {
                            fontFamily: 'roboto-condensed-sb',
                            fontSize: 18
                          },
                          headerLeft: () => (
                            <TouchableOpacity onPress={() => router.replace('/')}>
                              <Ionicons name="close-outline" size={20} />
                            </TouchableOpacity>
                          ),
                        }}
                      />
                      <Stack.Screen
                        name="(modals)/register"
                        options={{
                          // presentation: 'modal',
                          title: '',
                          headerShadowVisible: false,
                          headerStyle: {
                            backgroundColor: 'transparent'
                          },
                          headerTitleStyle: {
                            fontFamily: 'roboto-condensed-sb',
                            fontSize: 18
                          },
                          headerLeft: () => (
                            <TouchableOpacity onPress={() => router.back()}>
                              <Ionicons name="close-outline" size={20} />
                            </TouchableOpacity>
                          ),
                        }}
                      />
                      <Stack.Screen
                        name="(modals)/recovery"
                        options={{
                          // presentation: 'modal',
                          title: '',
                          headerShadowVisible: false,
                          headerStyle: {
                            backgroundColor: 'transparent'
                          },
                          headerTitleStyle: {
                            fontFamily: 'roboto-condensed-sb',
                            fontSize: 18
                          },
                          headerLeft: () => (
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20, marginRight: 20 }}>

                              <TouchableOpacity onPress={() => router.back()}>
                                <Ionicons name="arrow-back" size={22} color={"#000"} />
                              </TouchableOpacity>
                            </View>
                          ),
                        }}
                      />
                      <Stack.Screen
                        name="(modals)/forgotPassword"
                        options={{
                          // presentation: 'modal',
                          title: '',
                          headerShadowVisible: false,
                          headerStyle: {
                            backgroundColor: 'transparent'
                          },
                          headerTitleStyle: {
                            fontFamily: 'roboto-condensed-sb',
                            fontSize: 18
                          },
                          headerLeft: () => (
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20, marginRight: 20 }}>

                              <TouchableOpacity onPress={() => router.back()}>
                                <Ionicons name="arrow-back" size={22} color={"#000"} />
                              </TouchableOpacity>
                            </View>
                          ),
                        }}
                      />
                      <Stack.Screen
                        name="(modals)/changePassword"
                        options={{
                          // presentation: 'modal',
                          title: '',
                          headerShadowVisible: false,
                          headerStyle: {
                            backgroundColor: 'transparent'
                          },
                          headerTitleStyle: {
                            fontFamily: 'roboto-condensed-sb',
                            fontSize: 18
                          },
                          headerLeft: () => (
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20, marginRight: 20 }}>

                              <TouchableOpacity onPress={() => router.back()}>
                                <Ionicons name="arrow-back" size={22} color={"#000"} />
                              </TouchableOpacity>
                            </View>
                          ),
                        }}
                      />
                      <Stack.Screen
                        name="(modals)/otp"
                        options={{
                          // presentation: 'modal',
                          title: '',
                          headerShadowVisible: false,
                          headerStyle: {
                            backgroundColor: 'transparent'
                          },
                          headerTitleStyle: {
                            fontFamily: 'roboto-condensed-sb',
                            fontSize: 18
                          },
                          headerLeft: () => (
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20, marginRight: 20 }}>

                              <TouchableOpacity onPress={() => router.back()}>
                                <Ionicons name="arrow-back" size={22} color={"#000"} />
                              </TouchableOpacity>
                            </View>
                          ),
                        }}
                      />

                      <Stack.Screen
                        name='product/[id]'
                        options={{
                          headerTitle: '',
                          headerShadowVisible: false,
                          headerShown: false,
                        }}
                      />
                      <Stack.Screen
                        name='catalog/[id]'
                        options={{
                          headerTitle: '',
                          headerShadowVisible: false,
                          headerShown: false,


                        }}
                      />
                      <Stack.Screen
                        name='sellerProducts/[id]'
                        options={{
                          headerTitle: '',
                          headerShadowVisible: false,
                          headerShown: false,
                        }}
                      />
                      <Stack.Screen
                        name='categoryCatalog/[id]'
                        options={{
                          headerTitle: '',
                          headerShadowVisible: false,
                          headerShown: false,


                        }}
                      />
                      <Stack.Screen
                        name='cartScreen/cart'
                        options={{
                          headerTitle: '',
                          headerShadowVisible: false,
                          headerLeft: () => (
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20 }}>

                              <TouchableOpacity onPress={() => router.push('/')}>
                                <Ionicons name="arrow-back" size={22} color={"#000"} />
                              </TouchableOpacity>
                              <Text style={{ fontFamily: 'roboto-condensed-sb', color: '#000', fontSize: 18 }}>My Orders</Text>
                            </View>
                          ),
                        }}
                      />
                      <Stack.Screen
                        name='checkoutPage/checkout'
                        options={{
                          headerTitle: '',
                          headerShadowVisible: false,
                          headerLeft: () => (
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20 }}>

                              <TouchableOpacity onPress={() => router.back()}>
                                <Ionicons name="arrow-back" size={20} color={"#000"} />
                              </TouchableOpacity>
                              <Text style={{ fontFamily: 'roboto-condensed-sb', color: '#000', fontSize: 18 }}>Checkout</Text>
                            </View>
                          ),


                        }}
                      />
                      <Stack.Screen
                        name='filter/filter'
                        options={{
                          headerTitle: 'Filter',
                          headerTitleAlign: 'left',
                          headerTitleStyle: {
                            fontFamily: 'roboto-condensed-sb',
                            fontSize: 18
                          },
                          headerShadowVisible: false,
                          headerLeft: () => (
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20, marginRight: 20 }}>

                              <TouchableOpacity onPress={() => router.back()}>
                                <Ionicons name="arrow-back" size={22} color={"#000"} />
                              </TouchableOpacity>
                            </View>
                          ),
                        }}
                      />
                      <Stack.Screen
                        name="(modals)/PhoneNumber"
                        options={{
                          // presentation: 'modal',
                          title: '',
                          headerShadowVisible: false,
                          headerStyle: {
                            backgroundColor: 'transparent'
                          },
                          headerTitleStyle: {
                            fontFamily: 'roboto-condensed-sb',
                            fontSize: 18
                          },
                          headerLeft: () => (
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20, marginRight: 20 }}>

                              <TouchableOpacity onPress={() => router.back()}>
                                <Ionicons name="arrow-back" size={22} color={"#000"} />
                              </TouchableOpacity>
                            </View>
                          ),
                        }}
                      />
                      <Stack.Screen
                        name="accountScreen/account"
                        options={{
                          // presentation: 'modal',
                          title: 'Account',
                          headerShadowVisible: false,
                          headerStyle: {
                            backgroundColor: 'transparent'
                          },
                          headerTitleStyle: {
                            fontFamily: 'roboto-condensed-sb',
                            fontSize: 18
                          },
                          headerLeft: () => (
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20, marginRight: 20 }}>

                              <TouchableOpacity onPress={() => router.back()}>
                                <Ionicons name="arrow-back" size={22} color={"#000"} />
                              </TouchableOpacity>
                            </View>
                          ),
                        }}
                      />
                      <Stack.Screen
                        name="vouchers/voucherList"
                        options={{
                          // presentation: 'modal',
                          title: 'Vouchers',
                          headerShadowVisible: false,
                          headerStyle: {
                            backgroundColor: 'transparent'
                          },
                          headerTitleStyle: {
                            fontFamily: 'roboto-condensed-sb',
                            fontSize: 18
                          },
                          headerLeft: () => (
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20, marginRight: 20 }}>

                              <TouchableOpacity onPress={() => router.back()}>
                                <Ionicons name="arrow-back" size={22} color={"#000"} />
                              </TouchableOpacity>
                            </View>
                          ),
                        }}
                      />
                      <Stack.Screen
                        name="vouchers/voucherDetails"
                        options={{
                          // presentation: 'modal',
                          title: 'Voucher Details',
                          headerShadowVisible: false,
                          headerStyle: {
                            backgroundColor: 'transparent'
                          },
                          headerTitleStyle: {
                            fontFamily: 'roboto-condensed-sb',
                            fontSize: 18
                          },
                          headerLeft: () => (
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20, marginRight: 20 }}>

                              <TouchableOpacity onPress={() => router.back()}>
                                <Ionicons name="arrow-back" size={22} color={"#000"} />
                              </TouchableOpacity>
                            </View>
                          ),
                        }}
                      />
                      <Stack.Screen
                        name="vouchers/voucherDetails2"
                        options={{
                          // presentation: 'modal',
                          title: 'Voucher Details',
                          headerShadowVisible: false,
                          headerStyle: {
                            backgroundColor: 'transparent'
                          },
                          headerTitleStyle: {
                            fontFamily: 'roboto-condensed-sb',
                            fontSize: 18
                          },
                          headerLeft: () => (
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20, marginRight: 20 }}>

                              <TouchableOpacity onPress={() => router.back()}>
                                <Ionicons name="arrow-back" size={22} color={"#000"} />
                              </TouchableOpacity>
                            </View>
                          ),
                        }}
                      />
                      <Stack.Screen
                        name="referralScreen/referral"
                        options={{
                          // presentation: 'modal',
                          title: 'Referrals',
                          headerShadowVisible: false,
                          headerStyle: {
                            backgroundColor: 'transparent'
                          },
                          headerTitleStyle: {
                            fontFamily: 'roboto-condensed-sb',
                            fontSize: 18
                          },
                          headerLeft: () => (
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20, marginRight: 20 }}>

                              <TouchableOpacity onPress={() => router.back()}>
                                <Ionicons name="arrow-back" size={22} color={"#000"} />
                              </TouchableOpacity>
                            </View>
                          ),
                        }}
                      />
                      <Stack.Screen
                        name="getHelp/getHelp"
                        options={{
                          // presentation: 'modal',
                          title: 'Get Help',
                          headerShadowVisible: false,
                          headerStyle: {
                            backgroundColor: 'transparent'
                          },
                          headerTitleStyle: {
                            fontFamily: 'roboto-condensed-sb',
                            fontSize: 18
                          },
                          headerLeft: () => (
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20, marginRight: 20 }}>

                              <TouchableOpacity onPress={() => router.back()}>
                                <Ionicons name="arrow-back" size={22} color={"#000"} />
                              </TouchableOpacity>
                            </View>
                          ),
                        }}
                      />
                      <Stack.Screen
                        name="accountScreen/deleteAccount"
                        options={{
                          // presentation: 'modal',
                          title: 'Delete Account',
                          headerShadowVisible: false,
                          headerStyle: {
                            backgroundColor: 'transparent'
                          },
                          headerTitleStyle: {
                            fontFamily: 'roboto-condensed-sb',
                            fontSize: 18
                          },
                          headerLeft: () => (
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20, marginRight: 20 }}>

                              <TouchableOpacity onPress={() => router.back()}>
                                <Ionicons name="arrow-back" size={22} color={"#000"} />
                              </TouchableOpacity>
                            </View>
                          ),
                        }}
                      />
                      <Stack.Screen
                        name="savedProductScreen/saves"
                        options={{
                          // presentation: 'modal',
                          title: 'Saves',
                          headerShadowVisible: false,
                          headerStyle: {
                            backgroundColor: 'transparent'
                          },
                          headerTitleStyle: {
                            fontFamily: 'roboto-condensed-sb',
                            fontSize: 18
                          },
                          headerLeft: () => (
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20, marginRight: 20 }}>

                              <TouchableOpacity onPress={() => router.back()}>
                                <Ionicons name="arrow-back" size={22} color={"#000"} />
                              </TouchableOpacity>
                            </View>
                          ),
                        }}
                      />

                      <Stack.Screen
                        name="search/searchPage"

                        options={{
                          animation: 'fade',
                          headerShadowVisible: false,
                          headerTitle: 'Explore',
                          headerTitleStyle: {
                            fontFamily: 'roboto-condensed-sb-i',
                            fontSize: 20
                          },
                          headerTitleAlign: 'center',
                          headerShown: false,

                        }}
                      />


                      {
                        //QUICK SELL AND QUICK SWAP SCREENS
                      }

                      <Stack.Screen
                        name="quickSellAndSwap/uploadScreen"
                        options={{
                          // presentation: 'modal',
                          title: 'Upload',
                          headerShadowVisible: false,
                          headerStyle: {
                            backgroundColor: 'transparent'
                          },
                          headerTitleStyle: {
                            fontFamily: 'roboto-condensed-sb',
                            fontSize: 18
                          },
                          headerLeft: () => (
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20, marginRight: 20 }}>

                              <TouchableOpacity onPress={() => router.back()}>
                                <Ionicons name="arrow-back" size={22} color={"#000"} />
                              </TouchableOpacity>
                            </View>
                          ),
                        }}
                      />
                      <Stack.Screen
                        name="quickSellAndSwap/quickSell"
                        options={{
                          // presentation: 'modal',
                          title: 'Quick Sell',
                          headerShadowVisible: false,
                          headerStyle: {
                            backgroundColor: 'transparent'
                          },
                          headerTitleStyle: {
                            fontFamily: 'roboto-condensed-sb',
                            fontSize: 18
                          },
                          headerLeft: () => (
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20, marginRight: 20 }}>

                              <TouchableOpacity onPress={() => router.back()}>
                                <Ionicons name="arrow-back" size={22} color={"#000"} />
                              </TouchableOpacity>
                            </View>
                          ),
                        }}
                      />
                      {/*<Stack.Screen
                        name="quickSellAndSwap/postAd1"
                        options={{
                          // presentation: 'modal',
                          title: 'Back',
                          headerShadowVisible: false,
                          headerStyle: {
                            backgroundColor: 'transparent'
                          },
                          headerTitleStyle: {
                            fontFamily: 'roboto-condensed-sb',
                            fontSize: 18
                          },
                          headerLeft: () => (
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20, marginRight: 20 }}>

                              <TouchableOpacity onPress={() => router.back()}>
                                <Ionicons name="arrow-back" size={22} color={"#000"} />
                              </TouchableOpacity>
                            </View>
                          ),
                        }}
                      />*/}
                      <Stack.Screen
                        name="quickSellAndSwap/quickSwap"
                        options={{
                          // presentation: 'modal',
                          title: 'Quick Swap',
                          headerShadowVisible: false,
                          headerStyle: {
                            backgroundColor: 'transparent'
                          },
                          headerTitleStyle: {
                            fontFamily: 'roboto-condensed-sb',
                            fontSize: 18
                          },
                          headerLeft: () => (
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20, marginRight: 20 }}>

                              <TouchableOpacity onPress={() => router.back()}>
                                <Ionicons name="arrow-back" size={22} color={"#000"} />
                              </TouchableOpacity>
                            </View>
                          ),
                        }}
                      />
                      <Stack.Screen
                        name="quickSellAndSwap/postAd2"
                        options={{
                          // presentation: 'modal',
                          title: 'Back',
                          headerShadowVisible: false,
                          headerStyle: {
                            backgroundColor: 'transparent'
                          },
                          headerTitleStyle: {
                            fontFamily: 'roboto-condensed-sb',
                            fontSize: 18
                          },
                          headerLeft: () => (
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20, marginRight: 20 }}>

                              <TouchableOpacity onPress={() => router.back()}>
                                <Ionicons name="arrow-back" size={22} color={"#000"} />
                              </TouchableOpacity>
                            </View>
                          ),
                        }}
                      />

                      {
                        //SELLER SCREENS
                      }


                      <Stack.Screen
                        name="sellerAddProductScreen/addProducts"
                        options={{
                          // presentation: 'modal',
                          title: 'Back',
                          headerShadowVisible: false,
                          headerStyle: {
                            backgroundColor: 'transparent'
                          },
                          headerTitleStyle: {
                            fontFamily: 'roboto-condensed-sb',
                            fontSize: 18
                          },
                          headerLeft: () => (
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20, marginRight: 20 }}>

                              <TouchableOpacity onPress={() => router.back()}>
                                <Ionicons name="arrow-back" size={22} color={"#000"} />
                              </TouchableOpacity>
                            </View>
                          ),
                        }}
                      />
                      <Stack.Screen
                        name="sellerAddProductScreen/productPromotion"
                        options={{
                          // presentation: 'modal',
                          title: 'Back',
                          headerShadowVisible: false,
                          headerStyle: {
                            backgroundColor: 'transparent'
                          },
                          headerTitleStyle: {
                            fontFamily: 'roboto-condensed-sb',
                            fontSize: 18
                          },
                          headerLeft: () => (
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20, marginRight: 20 }}>

                              <TouchableOpacity onPress={() => router.back()}>
                                <Ionicons name="arrow-back" size={22} color={"#000"} />
                              </TouchableOpacity>
                            </View>
                          ),
                        }}
                      />
                      <Stack.Screen
                        name="sellerAuthScreens/sellerRegister"
                        options={{
                          // presentation: 'modal',
                          title: '',
                          headerShadowVisible: false,
                          headerStyle: {
                            backgroundColor: 'transparent'
                          },
                          headerTitleStyle: {
                            fontFamily: 'roboto-condensed-sb',
                            fontSize: 18
                          },
                          headerLeft: () => (
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20, marginRight: 20 }}>

                              <TouchableOpacity onPress={() => router.back()}>
                                <Ionicons name="arrow-back" size={22} color={"#000"} />
                              </TouchableOpacity>
                            </View>
                          ),
                        }}
                      />
                      <Stack.Screen
                        name="sellerAuthScreens/SellerLogin"
                        options={{
                          // presentation: 'modal',
                          title: '',
                          headerShadowVisible: false,
                          headerStyle: {
                            backgroundColor: 'transparent'
                          },
                          headerTitleStyle: {
                            fontFamily: 'roboto-condensed-sb',
                            fontSize: 18
                          },
                          headerLeft: () => (
                            <TouchableOpacity onPress={() => router.back()}>
                              <Ionicons name="close-outline" size={20} />
                            </TouchableOpacity>
                          ),
                        }}
                      />
                      <Stack.Screen
                        name="sellerAuthScreens/sellerOtp"
                        options={{
                          // presentation: 'modal',
                          title: '',
                          headerShadowVisible: false,
                          headerStyle: {
                            backgroundColor: 'transparent'
                          },
                          headerTitleStyle: {
                            fontFamily: 'roboto-condensed-sb',
                            fontSize: 18
                          },
                          headerLeft: () => (
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20, marginRight: 20 }}>

                              <TouchableOpacity onPress={() => router.back()}>
                                <Ionicons name="arrow-back" size={22} color={"#000"} />
                              </TouchableOpacity>
                            </View>
                          ),
                        }}
                      />

                      <Stack.Screen
                        name="accountScreen/[id]"
                        options={{
                          // presentation: 'modal',
                          title: "Merchant's Profile",
                          headerShadowVisible: false,
                          headerStyle: {
                            backgroundColor: 'transparent'
                          },
                          headerTitleStyle: {
                            fontSize: 18,
                            fontFamily:"roboto-condensed-sb"
                          },
                          headerLeft: () => (
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20, marginRight: 20 }}>
                              <TouchableOpacity onPress={() => router.back()}>
                                <Ionicons name="arrow-back" size={22} color={"#000"} />
                              </TouchableOpacity>
                            </View>
                          ),
                        }} />
                      <Stack.Screen
                        name="accountScreen/merchantProfile"
                        options={{
                          // presentation: 'modal',
                          title: "Merchant's Profile",
                          headerShadowVisible: false,
                          headerStyle: {
                            backgroundColor: 'transparent'
                          },
                          headerTitleStyle: {
                            fontSize: 18
                          },
                          headerLeft: () => (
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20, marginRight: 20 }}>
                              <TouchableOpacity onPress={() => router.back()}>
                                <Ionicons name="arrow-back" size={22} color={"#000"} />
                              </TouchableOpacity>
                            </View>
                          ),
                        }} />
                      <Stack.Screen
                        name="sellerNotificationsTabs/[id]"
                        options={{
                          // presentation: 'modal',
                          title: '',
                          headerShown: false,

                        }}
                      />
                      <Stack.Screen
                        name="userNotificationsTabs/[id]"
                        options={{
                          // presentation: 'modal',
                          title: '',
                          headerShown: false,

                        }}
                      />
                      <Stack.Screen
                        name="order/[id]"
                        options={{
                          // presentation: 'modal',
                          title: "Track Order",
                          headerShadowVisible: false,
                          headerStyle: {
                            backgroundColor: 'transparent'
                          },
                          headerTitleStyle: {
                            fontSize: 18,
                            fontWeight: "500"
                          },
                          headerLeft: () => (
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20, marginRight: 20 }}>
                              <TouchableOpacity onPress={() => router.back()}>
                                <Ionicons name="arrow-back" size={22} color={"#000"} />
                              </TouchableOpacity>
                            </View>
                          ),
                        }} />
                      {/* SUSPENDED <Stack.Screen
                      name="orderSuccess/orderSuccess"
                      options={{
                        // presentation: 'modal',
                        title: "Track Order",
                        headerShown: false,
                        headerShadowVisible: false,
                        headerStyle: {
                          backgroundColor: 'transparent'
                        },
                        headerTitleStyle: {
                          fontSize: 16,
                          fontWeight: "500"
                        },
                        headerLeft: () => (
                          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20, marginRight: 20 }}>
                            <TouchableOpacity onPress={() => router.back()}>
                              <Ionicons name="arrow-back" size={22} color={"#000"} />
                            </TouchableOpacity>
                          </View>
                        ),
                      }} /> */}
                      <Stack.Screen
                        name="approveOrder/[id]"
                        options={{
                          // presentation: 'modal',
                          title: "Approve Order",
                          headerShadowVisible: false,
                          headerStyle: {
                            backgroundColor: 'transparent'
                          },
                          headerTitleStyle: {
                            fontSize: 18,
                            fontWeight: "500"
                          },
                          headerLeft: () => (
                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20, marginRight: 20 }}>
                              <TouchableOpacity onPress={() => router.back()}>
                                <Ionicons name="arrow-back" size={22} color={"#000"} />
                              </TouchableOpacity>
                            </View>
                          ),
                        }} />
                    </Stack>
                  </OrdersProvider>
                </ProductUploadProvider>
              </QuickSwapProvider>
            </SellerAuthProvider>
          </AuthProvider>
        </SellerProvider>
      </PaperProvider>
    </GestureHandlerRootView>
  );
}
