import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Stack } from 'expo-router';
import SellerDashboard from './sellerProfile'; // Adjust the import paths as needed
import EditProfile from './editSellerProfile'; // Adjust the import paths as needed
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from 'expo-router';
import { DrawerActions } from '@react-navigation/native'



export default function MyStack() {
    const navigation = useNavigation()
    return (
        <Stack initialRouteName="sellerProfile">
            <Stack.Screen 
                name="sellerProfile" 
                
                  options={{
                    title: '',
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
                      
                      
                        
                          <TouchableOpacity style={styles.menuBtn} onPress={()=>navigation.dispatch(DrawerActions.toggleDrawer())} >
                          <Image source={require("../../../assets/images/menu.png")} style={{width: 15, height: 13 }} />
                        </TouchableOpacity> 
                        
          
                    )
                  }}
            />
            <Stack.Screen 
                name="editSellerProfile" 
                options={{ title: 'Edit Profile' }} 
            />
        </Stack>
    );
}
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

