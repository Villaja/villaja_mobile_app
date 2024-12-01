import { View, Text, TouchableOpacity, StyleSheet, ScrollView, FlatList, ActivityIndicator, Dimensions } from 'react-native'
import { useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import Colors from '../../constants/Colors'
import CartCard from '../../components/CartCard'
import { defaultStyles } from '../../constants/Styles'
import OrdersCard from '../../components/OrdersCard'
import OrderHistoryCard from '../../components/OrderHistoryCard'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Product } from '../../types/Product'
import { AntDesign } from '@expo/vector-icons'
import { useAuth } from '../../context/AuthContext'
import { useOrders } from '../../context/OrderContext';
import { Order, CartItem } from '../../types/Order'
import LottieView from "lottie-react-native";

import axios from 'axios'
import { base_url } from '../../constants/server'
import { useFocusEffect } from '@react-navigation/native';

const sampleCartItems = [
  {
    id: 1,
    name: 'Soundcore Space Q45, 2022 Vision',
    originalPrice: 234000,
    discountPrice: 199000,
    image: 'https://s3-alpha-sig.figma.com/img/d741/058d/03f244cdf5ece1cea44eeee2751fbaca?Expires=1707696000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=LaourMMgrWTY6aVMjYiteL5MqgRzjDHrinqz6Nj57UzRovBXz7BLjm8sUUVlnEOY1-b~TfLLmiGzamNPtfAXxfBnVxgLUvXYG8PA~YOpADQSS3AMz2C7dTMMozdTSuWRJ-Wfp80UQYH1rgYfQbBCyNCc1amAsWmKBghrQn7wxoCz4PB1HA1hR2liTQX5vTE07girINUPdkKn5E4jAnE0fMp4Hw4r8u4hSZSKfp5eiB636iRhXY8LsKHFgRnkuv0DHlUIjE6af4pAy44~Wr9LsDE~dgwsAuK6Cl6wD4nDI-GTuw5~~uBE5F~iv9iOqk9CcFk41h9SaX7Yux-Y~22I~g__'
  },
  {
    id: 2,
    name: 'Soundcore Space A45, 2022 Vision',
    originalPrice: 234000,
    discountPrice: 199000,
    image: 'https://s3-alpha-sig.figma.com/img/a000/158a/e391fe89bb97d2e6089708e8be878a43?Expires=1707696000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=oMqKbmkexD7H1VIiEVL2UB9L0jUPi89DO4c7sMgIa6uxWSIm6cQqqUTC2vSzCdM3fPieuFFo3C9XgR028dKhb-AUC9EPinkth33FySyWJ6YURzsNkvk~FAsIWjWlYCTTvWLEqNiXpUUZCC4cv48k0A7kxUR2Pd7i8sRCBZbPwxTZjSwOS6aGUQNqDrf7zCRc4lBFCZqIB~Ym9Cv8FdZSTHrUP64Bh6OwYlx7kO8uqhrKGMy-LQ-JO6ZfRObTzU7t3W8GlwaoluJzB-MAii1xK~tS2uh0aWb779iZ6A8UrsBMgoM4yxJh0fclGp~zdoGxm5JLQfvlvgM0fpWxSXPHPQ__'
  },
]



const cart = () => {
  const { user } = useAuth();
  const router = useRouter()
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>('Cart')
  const [cart, setCart] = useState<Array<Product>>([])
  const [orderActiveTab, setOrderActiveTab] = useState<string>("pending");
  const id = user?.user._id

  const { height } = Dimensions.get('window');

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        try {
          if (user) {
            const response = await axios.get(`${base_url}/order/get-all-orders/${id}`);
            if (response.data.success) {
              setOrders(response.data.orders);
            } else {
              console.error('Failed to fetch orders');
            }
          } else {
            router.replace('/(modals)/login')
          }
        } catch (error) {
          console.error('Error fetching orders:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }, [id, user, router, orderActiveTab])
  );

  const pendingOrders = orders.filter((item) => item.status === "Processing");
  const completedOrders = orders.filter((item) => item.status === "Delivered");
  const cancelledOrders = orders.filter((item) => item.status === "Cancelled");
  const readyToShipOrders = orders.filter((item) => item.status === "Ready To Ship");

  // console.log(id)


  const handleRemoveFromCart = async (id: string) => {
    var cart = [] as Product[]
    await AsyncStorage.getItem('cart', (err, result) => {
      cart = JSON.parse(result!)
    })

    const newCart = cart.filter((it) => it._id !== id)

    await AsyncStorage.setItem('cart', JSON.stringify(newCart))
    setCart(newCart)
  }


  useEffect(() => {
    handleGetCart()

  }, [])

  const handleGetCart = async () => {

    try {
      await AsyncStorage.getItem('cart', (err, result) => {
        setCart(JSON.parse(result!))
      })
    }
    catch (err) {
      console.log(err);

    } finally {
      setLoading(false)
    }

  };


  return (
    <View style={[styles.container, { paddingBottom: activeTab === 'Cart' || activeTab === 'Orders' ? 100 : 0  }]}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.headerBtn} onPress={() => setActiveTab('Cart')}>
          <Text style={activeTab === "Cart" ? styles.activeTextHeader : styles.textHeader}>Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerBtn} onPress={() => setActiveTab('Orders')}>
          <Text style={activeTab === "Orders" ? styles.activeTextHeader : styles.textHeader}>Orders</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerBtn} onPress={() => setActiveTab('History')}>
          <Text style={activeTab === "History" ? styles.activeTextHeader : styles.textHeader}>History</Text>
        </TouchableOpacity>
      </View>
      {
        activeTab === 'Cart' ?
          <ScrollView showsVerticalScrollIndicator={false} style={{ padding: 20, gap: 16 }}>
            {
              loading ? (<ActivityIndicator size={'small'} color={Colors.primary} />) : (cart && cart.length > 0 ? cart.map((item) => (
                <CartCard item={item} key={item._id} handleRemoveCart={handleRemoveFromCart} />

              ))

                :
                <View style={{ paddingVertical: 50, justifyContent: 'center', alignItems: 'center', gap: 20 }}>
                  <LottieView source={require('../../assets/images/cart-animation2.json')} autoPlay loop={false} style={{ width: 200, height: 200 }} />
                  <TouchableOpacity style={[defaultStyles.btn, { paddingHorizontal: 20 }]} onPress={() => router.push('/')}>
                    <Text style={[defaultStyles.btnText, { paddingHorizontal: 50 }]}>Continue Shopping</Text>
                  </TouchableOpacity>
                </View>)
            }
          </ScrollView>
          : activeTab === 'Orders' ?
            <View style={{ padding: 20 }}>
              {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
              ) : (
                <>
                  <View style={styles.orderTabContainer} >
                    <TouchableOpacity style={[styles.orderTab, orderActiveTab === "pending" && { borderBottomWidth: 4, borderBottomColor: Colors.primary, borderBottomLeftRadius: 3, borderBottomRightRadius: 3 }]} onPress={() => setOrderActiveTab("pending")} >
                      <Text style={[styles.orderTabText, orderActiveTab === "pending" && { color: Colors.primary }]}>Pending</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.orderTab, orderActiveTab === "In Transit" && { borderBottomWidth: 4, borderBottomColor: Colors.primary, borderBottomLeftRadius: 3, borderBottomRightRadius: 3 }]} onPress={() => setOrderActiveTab("In Transit")} >
                      <Text style={[styles.orderTabText, orderActiveTab === "In Transit" && { color: Colors.primary }]}>In Transit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.orderTab, orderActiveTab === "completed" && { borderBottomWidth: 4, borderBottomColor: Colors.primary, borderBottomLeftRadius: 3, borderBottomRightRadius: 3 }]} onPress={() => setOrderActiveTab("completed")} >
                      <Text style={[styles.orderTabText, orderActiveTab === "completed" && { color: Colors.primary }]}>Completed</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.orderTab, orderActiveTab === "cancelled" && { borderBottomWidth: 4, borderBottomColor: Colors.primary, borderBottomLeftRadius: 3, borderBottomRightRadius: 3 }]} onPress={() => setOrderActiveTab("cancelled")} >
                      <Text style={[styles.orderTabText, orderActiveTab === "cancelled" && { color: Colors.primary }]}>Cancelled</Text>
                    </TouchableOpacity>
                  </View>
                  {
                    orderActiveTab === "pending" && (
                      <FlatList
                        showsVerticalScrollIndicator={false}
                        data={pendingOrders}
                        keyExtractor={(item) => item._id}
                        ListEmptyComponent={() =>
                          <View>
                            <View style={{ marginTop: height / 1 / 6, justifyContent: "center", alignItems: "center" }} >
                              <LottieView
                                source={require('../../assets/images/no-result.json')}
                                autoPlay
                                loop
                                style={{ height: 200, width: 200 }}
                              />
                              <Text style={{ fontFamily: 'roboto-condensed-sb', fontSize: 20, color: "#02549296", textAlign: 'center' }}>No pending orders found</Text>
                            </View>
                          </View>}
                        renderItem={({ item }) => <OrdersCard key={item._id} order={item} />}
                      />
                    )
                  }
                  {
                    orderActiveTab === "completed" && (
                      <FlatList
                        showsVerticalScrollIndicator={false}
                        data={completedOrders}
                        keyExtractor={(item) => item._id}
                        ListEmptyComponent={() =>
                          <View>
                            <View style={{ marginTop: height / 1 / 6, justifyContent: "center", alignItems: "center" }} >
                              <LottieView
                                source={require('../../assets/images/no-result.json')}
                                autoPlay
                                loop
                                style={{ height: 200, width: 200 }}
                              />
                              <Text style={{ fontFamily: 'roboto-condensed-sb', fontSize: 20, color: "#02549296", textAlign: 'center' }}>No completed orders found</Text>
                            </View>
                          </View>}
                        renderItem={({ item }) => <OrdersCard key={item._id} order={item} />}
                      />
                    )
                  }
                  {
                    orderActiveTab === "In Transit" && (
                      <FlatList
                        showsVerticalScrollIndicator={false}
                        data={readyToShipOrders}
                        keyExtractor={(item) => item._id}
                        ListEmptyComponent={() =>
                          <View>
                            <View style={{ marginTop: height / 1 / 6, justifyContent: "center", alignItems: "center" }} >
                              <LottieView
                                source={require('../../assets/images/no-result.json')}
                                autoPlay
                                loop
                                style={{ height: 200, width: 200 }}
                              />
                              <Text style={{ fontFamily: 'roboto-condensed-sb', fontSize: 20, color: "#02549296", textAlign: 'center' }}>No orders on transit found</Text>
                            </View>
                          </View>}
                        renderItem={({ item }) => <OrdersCard key={item._id} order={item} />}
                      />
                    )
                  }
                  {
                    orderActiveTab === "cancelled" && (
                      <FlatList
                        showsVerticalScrollIndicator={false}
                        data={cancelledOrders}
                        keyExtractor={(item) => item._id}
                        ListEmptyComponent={() =>
                          <View>
                            <View style={{ marginTop: height / 1 / 6, justifyContent: "center", alignItems: "center" }} >
                              <LottieView
                                source={require('../../assets/images/no-result.json')}
                                autoPlay
                                loop
                                style={{ height: 200, width: 200 }}
                              />
                              <Text style={{ fontFamily: 'roboto-condensed-sb', fontSize: 20, color: "#02549296", textAlign: 'center' }}>No cancelled orders found</Text>
                            </View>
                          </View>}
                        renderItem={({ item }) => <OrdersCard key={item._id} order={item} />}
                      />
                    )
                  }
                </>
              )}
            </View>
            :
            <ScrollView showsVerticalScrollIndicator={false} style={{ padding: 20, gap: 16 }}>
              {
                completedOrders && completedOrders.map((order) => (
                  <OrderHistoryCard key={order._id} order={order} />
                ))
              }
            </ScrollView>
      }


      {

        user ? activeTab === 'Cart' && cart && cart.length > 0 &&
          <View style={{ position: 'absolute', bottom: 10, left: 0, right: 0, padding: 20 }}>
            <TouchableOpacity style={defaultStyles.btn} onPress={() => router.push('/checkoutPage/checkout')}>
              <Text style={defaultStyles.btnText}>Place Order</Text>
            </TouchableOpacity>
          </View>

          :
          <View style={{ position: 'absolute', bottom: 10, left: 0, right: 0, padding: 20 }}>
            <TouchableOpacity style={defaultStyles.btn} onPress={() => router.push('/(modals)/login')}>
              <Text style={defaultStyles.btnText}>Sign In To Place Order</Text>
            </TouchableOpacity>
          </View>
      }
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primaryUltraTransparent
  },
  headerContainer: {
    padding: 20,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  headerBtn: {
    paddingHorizontal: 13
  },
  textHeader: {
    fontSize: 14,
    fontFamily: 'roboto-condensed',
    color: 'rgba(0,0,0,0.40)',
    fontWeight: '500'
  },
  activeTextHeader: {
    fontSize: 16,
    fontFamily: 'roboto-condensed',
    color: '#000',
    fontWeight: '500'

  },
  orderTabContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    gap: 30,
    paddingBottom: 10
  },
  orderTab: {
    paddingBottom: 12,
  },
  orderTabText: {
    fontSize: 12,
    color: '#00000050'
  }
})

export default cart