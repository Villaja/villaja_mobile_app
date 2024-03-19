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
        name="sellerDashboard"
        options={{
          tabBarLabel: 'Dashboard',
          tabBarIcon: ({ size, color }) => <Ionicons name="grid-outline" size={size} color={color} />,
          headerTitle:'',
          headerStyle:{
            backgroundColor:'#111',
          },
          headerLeft:() => (
            <View style={styles.headerDashboardLeft}>
              
              <Image source={{uri:"https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg"}} resizeMode='contain' style={styles.sellerProfilePic} />
              <Text style={styles.headerText}>Col.Rederic Docker</Text>
            </View>
          ),
          headerRight:() => (
            <TouchableOpacity style={styles.menuBtn}>
                <Ionicons name='menu' size={25} color={"#fff"} />
            </TouchableOpacity>
          )
        }}
      />

      <Tabs.Screen
        name="sellerAddProduct"
        options={{
          headerTitle:"Product Upload",
          headerShown: true,
          headerTitleAlign:'center',
          headerTitleStyle:{
            fontFamily:'roboto-condensed-sb',
            fontSize:20,
            fontStyle: "italic",
            fontWeight: "700",
          },
          tabBarLabel: 'Add Product',
          tabBarIcon: ({ size, color }) => <AntDesign name="plussquare" size={size} color={color} />,
          
        }}
      />

      <Tabs.Screen
        name="sellerOrders"
        options={{

          tabBarLabel: 'Orders',
          tabBarIcon: ({ size, color }) => <MaterialCommunityIcons name="text-box-check-outline" size={size} color={color} />,

        }}
      />

      <Tabs.Screen
        name="sellerNotifications"
        options={{

          tabBarLabel: 'Notifications',
          tabBarIcon: ({ size, color }) => <Ionicons name="notifications-outline" size={size} color={color} />,
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
