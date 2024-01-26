import { View, Text, Button } from 'react-native'

import React from 'react'
import { Link, useRouter } from 'expo-router'

const more = () => {
  const router = useRouter()
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Button title='Login' onPress={() => router.push('/(modals)/landing')} />
    </View>
  )
}

export default more