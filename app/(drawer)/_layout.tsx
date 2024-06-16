import AntDesign from "@expo/vector-icons/AntDesign";
import { DrawerActions } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import React from "react";
import { Pressable, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import Drawer from "expo-router/drawer";
import { Feather, FontAwesome, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useAuth } from '../../context/SellerAuthContext';
import { useRouter } from "expo-router";


export function CustomDrawerContent(props:any) {

    const {bottom} = useSafeAreaInsets();
    const navigation = useNavigation();
  
    const closeDrawer = ()=>{
        navigation.dispatch(DrawerActions.closeDrawer())
    }
    const router = useRouter()
    const { logout } = useAuth()
  
    const handleLogout = async () => {
      await logout()
      router.replace('/')
    }
    return(
        <View
                style={{flex: 1, backgroundColor: 'black'}}
            >
              <DrawerContentScrollView {...props} scrollEnabled={false}>
                <View style={styles.container}>
                    <Pressable onPress={closeDrawer}>
                    <AntDesign name="close" size={24} color="white" />
  
                    </Pressable >
                    
                </View>
                <DrawerItemList {...props} />
              </DrawerContentScrollView>
        
              <TouchableOpacity onPress={() => handleLogout()} style={styles.button}>
                <AntDesign name="back" size={24} color="white" />
                <Text style={{color:'white'}}>Log Out</Text>
              </TouchableOpacity>
        </View>
    )
  
  }


  export default function DrawerNavigation() {
    return <Drawer 
        screenOptions={{
            drawerLabelStyle: {
                marginLeft: -20
            },
            drawerActiveBackgroundColor: 'gray',
            drawerActiveTintColor: 'white',
            drawerInactiveTintColor: 'white',
            headerShown: false
            
            
        }}
        drawerContent={CustomDrawerContent}
        
    >

        <Drawer.Screen
            
            name="(tabs2)"
            options={{
                drawerLabel: 'Dashboard',
                title: 'Dashboard',
                drawerIcon: ({size, color})=>(
                    <MaterialIcons name="dashboard" size={size} color={color} />
                )

            }}
            
        />
        <Drawer.Screen
            
            name="(profile)"
            options={{
                drawerLabel: 'Profile',
                title: 'Profile',
                drawerIcon: ({size, color})=>(
                    <FontAwesome name="user-circle-o" size={size} color={color} />
                )

            }}
            
        />
         <Drawer.Screen
            name="(otherDrawerScreens)"
            options={{
                drawerLabel: 'My Products',
                title: 'My Products',
                drawerIcon: ({size, color})=>(
                    <Feather name="shopping-bag" size={size} color={color} />
                ),
                headerTitle: 'My Products',
                headerStyle: {
                    backgroundColor: "#000000"
                }
            }}
            
        />
         <Drawer.Screen
            name="(swapDeals)"
            options={{
                drawerLabel: 'Swap Deals',
                title: 'Swap Deals',
                drawerIcon: ({size, color})=>(
                    <MaterialCommunityIcons name="swap-vertical-circle-outline" size={24} color="white" />
                ),
                headerTitle: 'Swap Deals',
                headerStyle: {
                    backgroundColor: "#000000"
                }
            }}
            
        />
         <Drawer.Screen
            name="(swapDeals)"
            options={{
                drawerLabel: 'Swap Deals',
                title: 'Swap Deals',
                drawerIcon: ({size, color})=>(
                    <MaterialCommunityIcons name="swap-vertical-circle-outline" size={24} color="white" />
                ),
                headerTitle: 'Swap Deals',
                headerStyle: {
                    backgroundColor: "#000000"
                }
            }}
            
        />
         <Drawer.Screen
            name="(swapDeals)"
            options={{
                drawerLabel: 'Swap Deals',
                title: 'Swap Deals',
                drawerIcon: ({size, color})=>(
                    <MaterialCommunityIcons name="swap-vertical-circle-outline" size={24} color="white" />
                ),
                headerTitle: 'Swap Deals',
                headerStyle: {
                    backgroundColor: "#000000"
                }
            }}
            
        />
        {/*<Drawer.Screen
            name=""
            options={{
                drawerLabel: 'Swap Deals',
                title: 'Swap Deals',
                drawerIcon: ({size, color})=>(
                    <AntDesign name="swap" size={size} color={color} />
                )

            }}
        />
        <Drawer.Screen
            name=""
            options={{
                drawerLabel: 'Quick Sale',
                title: 'Quick Sale',
                drawerIcon: ({size, color})=>(
                    <MaterialIcons name="speed" size={size} color={color} />
                )

            }}
        />
        <Drawer.Screen
            name=""
            options={{
                drawerLabel: 'About',
                title: 'About',
                drawerIcon: ({size, color})=>(
                    <MaterialCommunityIcons name="advertisements-off" size={size} color={color} />
                )

            }}
        />         */}
        
    </Drawer>
  }

  const styles = StyleSheet.create({
    container:{
        width: '100%', 
        height: 50, 
        padding: 10, 
        display:'flex', 
        justifyContent:'flex-start', 
        alignItems:'flex-end'
    },
    button:{
        padding: 20, 
        paddingBottom: 10, 
        display: 'flex', 
        flexDirection: 'row', 
        justifyContent: 'flex-start', 
        alignItems: 'center',
        gap: 10
    },
    
  })