import React, { useState, useEffect } from 'react'
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Dimensions } from "react-native";
import SellerOrderCard from "../../../components/SellerOrderCard";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { base_url } from '../../../constants/server';
import { useRouter } from "expo-router";
import LottieView from "lottie-react-native";
import Colors from "../../../constants/Colors";
import index from '../../(tabs)';

const sellerOrders = () => {
  const [seller, setSeller] = useState<any>([]);
  const [token, setToken] = useState<string>();
  const [loading, setLoading] = useState<boolean>(true);
  const [allOrders, setAllOrders] = useState<any>([]);
  const router = useRouter();
  const {height} = Dimensions.get('window')


  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('sellerToken')
      const seller = await AsyncStorage.getItem('seller')

      if (!token) return router.replace('/sellerAuthScreens/SellerLogin')
      setSeller(JSON.parse(seller!).seller)
      setToken(token)
    }

    checkToken()
  }, []);


  const handleGetOrders = async () => {
    try {

      const response = await axios.get(`${base_url}/order/get-seller-all-orders/${seller._id}`);
      if (response.data.success) {
        setAllOrders(response.data.orders);

      } else {
        console.error('Failed to fetch orders');
      }

    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetOrders();
  }, [seller]);

  console.log(allOrders[0]);

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container} >
      {
        loading ? (<ActivityIndicator size="small" color={Colors.primary} style={{ marginTop: height/1/3 }} />) : (
          allOrders.length > 1 ?
            (
              allOrders.map((order: any) => (
                <View key={order._id}>
                  <SellerOrderCard order={order} />
                </View>
              ))
            ) : (
              <View style={{ marginTop: height/1/3, padding: 20, gap: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <LottieView source={require('../../../assets/images/not-available.json')} autoPlay loop={true} style={{ width: 50, height: 50 }} />
                <Text style={{ fontFamily: 'roboto-condensed', fontSize: 15 }}>No Order Found</Text>
              </View>
            )
        )
      }
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  }
})

export default sellerOrders