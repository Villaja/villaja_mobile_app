import { StyleSheet, Text, View, TouchableOpacity, Button, SafeAreaView, Platform, Pressable } from 'react-native';
import React, {useState} from 'react';
import { Router, useRouter } from "expo-router";
import { useAuth } from '../../context/SellerAuthContext';
import Colors from '../../constants/Colors';
import Messages from '../sellerNotificationsTabs/Messages';
import Notifications from '../sellerNotificationsTabs/Notifications';


const sellerNotifications = () => {
  const router = useRouter()
  const {logout} = useAuth()

  const [activeTab,setActiveTab] = useState<string>("messages")

  const handleLogout = async() => {
    await logout()
    router.replace('/')
  }

  return (
    <SafeAreaView style={styles.container}>

    <View style={Platform.OS === "android" ? {flex:1,paddingTop:40}:{flex:1}} >
      <View style={styles.tabs}>
        <Pressable onPress={() => setActiveTab('messages')} >
          <Text style={[styles.tabText,activeTab === "messages" ? {color:Colors.primary}:{color:'rgba(0,0,0,0.50)'}]}>Messages</Text>
        </Pressable>
        <Pressable onPress={() => setActiveTab('notifications')} >
          <Text style={[styles.tabText,activeTab === "notifications" ? {color:Colors.primary}:{color:'rgba(0,0,0,0.50)'}]}>Notifications</Text>
        </Pressable>
      </View>

      {
        activeTab === "messages" ? 
        <Messages/> 
        :
        <Notifications/>
      }
    </View>
    </SafeAreaView>

    // <Actions router={router} handleLogout={handleLogout} />
  )
}

const Actions  = ({router,handleLogout}:{router:Router,handleLogout:() => void}) => {

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>sellerNotifications</Text>
      <Button title='seller register' onPress={() => router.push('/sellerAddProductScreen/sellerRegister')}/>

      <Button title='seller profile' onPress={() => router.push('/otherSellerDashBoardScreens/sellerProfile')}/>
      <Button title='Logout' onPress={() => handleLogout()}/>
    </View>
  )
}

export default sellerNotifications

const styles = StyleSheet.create({
  container:{

    flex:1,
    backgroundColor:'#fff'
  },
  tabs:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    paddingHorizontal:80,
    paddingVertical:16,
    borderBottomWidth:1,
    borderBottomColor:'rgba(0,0,0,0.05)'
    
  },
  tabText:{
    fontFamily:'roboto-condensed-m',
    fontSize:15
  }
})