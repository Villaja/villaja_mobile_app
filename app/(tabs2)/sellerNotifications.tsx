import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import React from 'react';
import { useRouter } from "expo-router";
import { useAuth } from '../../context/SellerAuthContext';


const sellerNotifications = () => {
  const router = useRouter()
  const {logout} = useAuth()

  const handleLogout = async() => {
    await logout()
    router.replace('/')
  }

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

const styles = StyleSheet.create({})