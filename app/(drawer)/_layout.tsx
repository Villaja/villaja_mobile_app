import AntDesign from "@expo/vector-icons/AntDesign";
import { DrawerActions } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import React from "react";
import { Pressable, View, Text, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import Drawer from "expo-router/drawer";
import { Feather, FontAwesome, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";


export function CustomDrawerContent(props:any) {

    const {bottom} = useSafeAreaInsets();
    const navigation = useNavigation();
  
    const closeDrawer = ()=>{
        navigation.dispatch(DrawerActions.closeDrawer())
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
        
              <Pressable onPress={closeDrawer} style={styles.button}>
                <AntDesign name="back" size={24} color="white" />
                <Text style={{color:'white'}}>Return to Main App</Text>
              </Pressable>
        </View>
    )
  
  }
  export function toggleDrawer(){
    console.log('Here');
    const navigation = useNavigation();
    navigation.dispatch(DrawerActions.toggleDrawer());


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
            
            
        }}
        drawerContent={CustomDrawerContent}
        screenOptions={{headerShown: false}}
    >

        <Drawer.Screen
            
            name="(tabs2)"
            options={{
                drawerLabel: 'Profile',
                title: 'Profile',
                drawerIcon: ({size, color})=>(
                    <FontAwesome name="user-circle-o" size={size} color={color} />
                )

            }}
            
        />
        {/* <Drawer.Screen
            name="index"
            options={{
                drawerLabel: 'My Products',
                title: 'My Products',
                drawerIcon: ({size, color})=>(
                    <Feather name="shopping-bag" size={size} color={color} />
                )

            }}
            
        />
        <Drawer.Screen
            name="ind"
            options={{
                drawerLabel: 'Swap Deals',
                title: 'Swap Deals',
                drawerIcon: ({size, color})=>(
                    <AntDesign name="swap" size={size} color={color} />
                )

            }}
        />
        <Drawer.Screen
            name="in"
            options={{
                drawerLabel: 'Quick Sale',
                title: 'Quick Sale',
                drawerIcon: ({size, color})=>(
                    <MaterialIcons name="speed" size={size} color={color} />
                )

            }}
        />
        <Drawer.Screen
            name="i"
            options={{
                drawerLabel: 'About',
                title: 'About',
                drawerIcon: ({size, color})=>(
                    <MaterialCommunityIcons name="advertisements-off" size={size} color={color} />
                )

            }}
        />        
         */}
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
        alignItems: 'center'
    },
    
  })