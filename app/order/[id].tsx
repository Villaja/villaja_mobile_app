import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Alert, SafeAreaView } from 'react-native';
import axios from 'axios';
import { useLocalSearchParams } from 'expo-router';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'expo-router'
import { ScrollView } from 'react-native-gesture-handler';
import { base_url } from '../../constants/server';


const Page = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { user } = useAuth();
  const router = useRouter()
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const userid = user?.user._id

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        if (user) {
        const response = await axios.get(`${base_url}/order/get-all-orders/${userid}`);
        if (response.data.success && response.data.orders.length > 0) {
          const specificOrder = response.data.orders.find((order: any) => order._id === id);
          if (specificOrder) {
            setOrderDetails(specificOrder);
          } else {
            console.error('Order not found');
          }
        } else {
          console.error('Failed to fetch orders');
        }
      }

      else{
        router.replace("/(modals)/login")
      }
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [id]);

  return (

    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#3498db" />
      ) : (
        
        <View>
          <ScrollView showsVerticalScrollIndicator={false}>

          <Text style={styles.header}>Order Details for Order ID: {id}</Text>
          {orderDetails ? (
            <View>
             <View>
             
              <Text>Product: {orderDetails.cart[0].name}</Text>
              <Text>Description: {orderDetails.cart[0].description}</Text>
              <Text>Category: {orderDetails.cart[0].category}</Text>
              <Text>Price: {orderDetails.cart[0].originalPrice}</Text>
              <Text>Quantity: {orderDetails.cart[0].stock}</Text>
              <Text>Status: {orderDetails.paymentInfo.status}</Text>
             
            </View>
            </View>
          ) : (
            <Text>No order details found</Text>
          )}
          </ScrollView>

        </View>
      )}
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default Page;
