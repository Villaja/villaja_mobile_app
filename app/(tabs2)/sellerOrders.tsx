import { StyleSheet, Text, View, TouchableOpacity, Button, SafeAreaView, Platform, Pressable } from 'react-native';
import React, { useState } from 'react';
import { Router, useRouter } from "expo-router";
import { useAuth } from '../../context/SellerAuthContext';
import Colors from '../../constants/Colors';

const sellerOrders = () => {
  const router = useRouter()
  const { logout } = useAuth()

  const handleLogout = async () => {
    await logout()
    router.replace('/')
  }

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title='seller register' onPress={() => router.push('/sellerAuthScreens/sellerRegister')} />
      <Button title='seller profile' onPress={() => router.push('/otherSellerDashBoardScreens/sellerProfile')} />
      <Button title='Logout' onPress={() => handleLogout()} />
      <Button title='seller Otp ' onPress={() => router.push('/sellerAuthScreens/sellerOtp')} />
    </View>
  )
}

export default sellerOrders

const styles = StyleSheet.create({})