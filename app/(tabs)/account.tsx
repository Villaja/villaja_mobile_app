import { View, Text, Button } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router'

import React from 'react'
import { Link, useRouter } from 'expo-router'

const handleLogout = async () => {

  await AsyncStorage.removeItem('token');
  router.replace('/');
};

const account = () => {
  const router = useRouter()
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title='Login' onPress={() => router.push('/(modals)/landing')} />

      <Button title='Logout' onPress={handleLogout} />
      <Button title='more screen' onPress={() => router.push('/(modals)/firstLoadingScreen')} />

    </View>
  )
}

export default account