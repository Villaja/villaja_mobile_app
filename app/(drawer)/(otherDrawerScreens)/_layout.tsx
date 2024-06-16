import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useRouter } from 'expo-router';
import { DrawerActions } from '@react-navigation/native'
import { Ionicons } from "@expo/vector-icons";

export default function otherDrawerScreens () {
    const navigation = useNavigation();
    const router = useRouter();
    return (
        <Stack>
            <Stack.Screen
                name='SellerProducts'
                options={{
                    title: 'My Products',
                    headerShadowVisible: false,
                    headerStyle: {
                        backgroundColor: "#ffffff",
                    },
                    headerTitleStyle: {
                        fontSize: 16
                    },
                    headerLeft: () => (
                        <View>
                            <TouchableOpacity activeOpacity={0.5} onPress={() => router.back()} style={{marginRight: 20, width: 30, height: 30, borderRadius: 50, justifyContent: "center", alignItems: "center"}} >
                                <Ionicons name="arrow-back" size={23} color={"#000"} />
                            </TouchableOpacity>
                        </View>
                    )
                }}
             />
            <Stack.Screen
                name='SwapDeals'
                options={{
                    title: 'Swap Deals',
                    headerShadowVisible: false,
                    headerStyle: {
                        backgroundColor: "#ffffff",
                    },
                    headerTitleStyle: {
                        fontSize: 16
                    },
                    headerLeft: () => (
                        <View>
                            <TouchableOpacity activeOpacity={0.5} onPress={() => router.back()} style={{marginRight: 20, width: 30, height: 30, borderRadius: 50, justifyContent: "center", alignItems: "center"}} >
                                <Ionicons name="arrow-back" size={23} color={"#000"} />
                            </TouchableOpacity>
                        </View>
                    )
                }}
             />
        </Stack>
    )
}