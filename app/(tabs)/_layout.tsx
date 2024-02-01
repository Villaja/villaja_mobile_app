import { Tabs } from 'expo-router';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import React from 'react';

const Layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        tabBarLabelStyle: {
          fontFamily: 'roboto-condensed',
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
            fontSize:20
          },
          tabBarIcon: ({ size, color }) => <MaterialCommunityIcons name="compass-outline" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="search"
        
        options={{
          tabBarLabel: 'Search',
          headerShown:false,
          tabBarIcon: ({ size, color }) => (
            <AntDesign name="search1" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="saved"
        options={{
          tabBarLabel: 'Quick Sell',
          tabBarIcon: ({ size, color }) => <AntDesign name="plussquareo" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          tabBarLabel: 'Notifications',
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="notifications-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="more"
        options={{
          tabBarLabel: 'More',

          headerShown: false,
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons name="view-grid-plus-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default Layout;
