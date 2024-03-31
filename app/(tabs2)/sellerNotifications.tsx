import { StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import React from 'react';
import { useRouter } from "expo-router";


const sellerNotifications = () => {
  const router = useRouter()

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>sellerNotifications</Text>
      <Button title='seller register' onPress={() => router.push('/sellerAddProductScreen/sellerRegister')}/>
    </View>
  )
}

export default sellerNotifications

const styles = StyleSheet.create({})