import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Alert, SafeAreaView, Image, Dimensions } from 'react-native';
import axios from 'axios';
import { useLocalSearchParams } from 'expo-router';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'expo-router'
import { ScrollView } from 'react-native-gesture-handler';
import { base_url } from '../../constants/server';
import LottieView from "lottie-react-native";

const statusColor = new Map([
  ['delivered', 'green'],
  ['cancelled', 'red'],
  ['processing', 'orange']
])



const Page = () => {
  const {width} = Dimensions.get('window')
  const { id } = useLocalSearchParams<{ id: string }>();
  const { user } = useAuth();
  const router = useRouter();
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

        else {
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

  console.log(orderDetails)

  {/*const previousScreen = () => {
    return (
      <View>
        <Image source={{ uri: orderDetails.cart[0].images[0].url }} />
        <Text>Product: {orderDetails.cart[0].name}</Text>
        <Text>Description: {orderDetails.cart[0].description}</Text>
        <Text>Category: {orderDetails.cart[0].category}</Text>
        <Text>Price: {orderDetails.cart[0].originalPrice}</Text>
        <Text>Quantity: {orderDetails.cart[0].stock}</Text>
        <Text>Status: {orderDetails.paymentInfo.status}</Text>
        <Text style={styles.header}>Order Details for Order ID: {id}</Text>
      </View>
    )
  } */}

  return (

    <View style={styles.parentContainer}>
      {loading ? (
        <ActivityIndicator size="large" color="#3498db" />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
          <View style={{ paddingHorizontal: 20 }} >
            <Image source={require('../../assets/images/amico.png')} style={{ height: 240, width: 290, marginTop: 65, alignSelf: "center", marginBottom: 23 }} />
            </View>
            {
              orderDetails ? (
                <View>
                  <View style={{ alignItems: 'center', marginBottom: 10 }} >
                    <Image source={require('../../assets/images/track-order.png')} resizeMode='contain' style={{ height: 209, width: width }} />
                    <View style={{ justifyContent: "center", alignItems: 'center', position: 'absolute', top: 20, gap: 10 }} >
                      <Text numberOfLines={1} style={{ fontSize: 13, color: '#00000080', fontWeight: '500' }}>{orderDetails.cart[0].name}</Text>
                      <Text style={{ fontSize: 16, fontWeight: '500' }} >₦{orderDetails.cart[0].originalPrice?.toLocaleString()}</Text>
                    </View>
                  </View>
                  <View style={{ paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }} >
                    <View>
                      <Text style={{fontSize: 13, color: '#00000080'}} >Order Id</Text>
                      <Text style={{fontSize: 14, fontWeight: '700', color: '#00000099', width: 110}} >{id}</Text>
                    </View>
                    <View>
                      <Text style={{fontSize: 13, color: '#00000080'}} >Order Status</Text>
                      <Text style={{ fontSize: 14, fontWeight: '700', color: statusColor.get(orderDetails.status.toLowerCase()) }} >{orderDetails.status}</Text>
                    </View>
                  </View>
                  <View style={{ paddingHorizontal: 20 }} >
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 10 }}>
                      {/* THIS FEATURE IS ONLY NEEDED FOR THE SELLER OF THE PRODUCT <View style={{justifyContent: 'center', alignItems: 'center'}} >
                        <Text style={{ fontSize: 13, color: '#00000080' }} >Quantity</Text>
                        <Text style={{ fontSize: 14, fontWeight: '700', color: '#00000099' }} >{orderDetails.cart[0].stock}</Text>
                      </View>*/}
                      {
                        orderDetails.status === "Processing" && (
                          <Text style={{ fontSize: 12, fontWeight: '700', color: '#00000099', textAlign: 'center', maxWidth: 200 }} >You would receive an email progress alert once it is on its way</Text>
                        )
                      }
                      {
                        orderDetails.status === "Ready To Ship" && (
                          <Text style={{ fontSize: 12, fontWeight: '700', color: '#00000099', textAlign: 'center', maxWidth: 200 }} >Your order has been packed and is on its way</Text>
                        )
                      }
                      {
                        orderDetails.status === "Delivered" && (
                          <Text style={{ fontSize: 12, fontWeight: '700', color: '#00000099', textAlign: 'center', maxWidth: 200 }} >Your order has been delivered</Text>
                        )
                      }
                      {
                        orderDetails.status === "Cancelled" && (
                          <Text style={{ fontSize: 12, fontWeight: '700', color: '#00000099', textAlign: 'center', maxWidth: 200 }} >Your order has been cancelled</Text>
                        )
                      }
                    </View>
                  </View>
                </View>
              ) : (
                <View>
                  <View style={{ justifyContent: "center", alignItems: "center"}} >
                  <LottieView
                    source={require('../../assets/images/no-result.json')}
                    autoPlay
                    loop
                    style={{ height: 200, width: 200}}
                  />
                <Text style={{ fontFamily: 'roboto-condensed-sb', fontSize: 20, color: "#02549296", textAlign: 'center' }}>No Orders Found</Text>
                </View>
                </View>
              )
          }
        </ScrollView>
      )}
    </View>

  );
};

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default Page;
