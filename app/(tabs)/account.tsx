import { View, Text, Button, SafeAreaView, Pressable, StyleSheet, Platform, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useState, useEffect } from 'react';
import Colors from '../../constants/Colors';
import Messages from '../userNotificationsTabs/Messages';
import Notifications from '../userNotificationsTabs/Notifications';
import { useAuth } from '../../context/AuthContext';

const account = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<string>('messages');
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      Alert.alert('Hello', 'Please login to be able to send messages');
      router.push('/(modals)/login');
    }
  }, [user]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={Platform.OS === 'android' ? { flex: 1, paddingTop: 40 } : { flex: 1 }}>
        <View style={styles.tabs}>
          <Pressable onPress={() => setActiveTab('messages')}>
            <Text style={[styles.tabText, activeTab === 'messages' ? { color: Colors.primary } : { color: 'rgba(0,0,0,0.50)' }]}>Messages</Text>
          </Pressable>
          <Pressable onPress={() => setActiveTab('notifications')}>
            <Text style={[styles.tabText, activeTab === 'notifications' ? { color: Colors.primary } : { color: 'rgba(0,0,0,0.50)' }]}>Notifications</Text>
          </Pressable>
        </View>

        {user && (activeTab === 'messages' ? <Messages /> : <Notifications />)}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {

    flex: 1,
    backgroundColor: '#fff'
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 60,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)'
  },
  tabText: {
    fontFamily: 'roboto-condensed-m',
    fontSize: 15,
    lineHeight: 20,
    letterSpacing: -0.24
  }
})

export default account