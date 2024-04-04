import { Tabs } from 'expo-router';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import React, { useState } from 'react';
import { Marker } from 'react-native-svg';
import { Image, View, Text, StyleSheet } from 'react-native';
import {  } from 'expo-status-bar';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Layout = () => {
  const [isSeller,setIsSeller] = useState(true)


  return (
    

    <Tabs
      
      screenOptions={{
        
        tabBarActiveTintColor: Colors.primary,
        tabBarLabelStyle: {
          fontFamily: 'roboto-condensed',
          // marginBottom:20
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: 'Explore',
          headerTitle:'',
          headerShown:false,
          headerTransparent:true,
          headerShadowVisible:false,
          headerTitleStyle:{
            fontFamily:'roboto-condensed-sb-i',
            fontSize: 18
          },
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="compass-outline" size={20} color={color} />,
        }}
      />
      <Tabs.Screen
        name="search"
        
        options={{

          tabBarLabel: 'Search',
          headerShown:false,
          tabBarIcon: ({ color }) => (
            <AntDesign name="search1" size={20} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="QuickSell"
        options={{

          tabBarLabel: 'Quick Sell',
          title: 'Quick Sell',
          headerTitleAlign: "center",
          headerTitleStyle:{
            fontFamily:'roboto-condensed-sb-i',
            fontSize: 18,
            fontStyle: "italic",
            fontWeight: "700"
          },
          tabBarIcon: ({ color }) => <AntDesign name="plussquareo" size={20} color={color} />,
        }}
      />
      <Tabs.Screen
        name="account"
        options={{

          tabBarLabel: 'Notifications',
          tabBarIcon: ({ color }) => (
            <Ionicons name="notifications-outline" size={20} color={color} />
          ),
        }}
      />
 <Tabs.Screen
        name="more"
        options={{

          tabBarLabel: 'More',
          title: 'More',
          headerShown: true,
          headerTitleAlign:'center',
          headerTitleStyle:{
            fontFamily:'roboto-condensed-sb-i',
            fontSize: 18,
            fontStyle: "italic",
            fontWeight: "700",
          },
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="view-grid-plus-outline" size={20} color={color} />
          ),
        }}
      />

      

        
      
    </Tabs>



    

  );
};


const styles = StyleSheet.create({
  headerDashboardLeft:{
    flexDirection:'row',
    alignItems:'center',
    gap:10,
    marginLeft:20
  },
  sellerProfilePic:{
    width:27,
    height:27,
    borderRadius:27
  },
  headerText:{
    color:'#fff',
    fontFamily:'roboto-condensed'
  },
  menuBtn:{
    marginRight:20
  }
})

export default Layout;
