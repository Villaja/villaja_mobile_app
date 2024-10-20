import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, ActivityIndicator, StyleSheet, Alert, SafeAreaView, Image, Dimensions, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useLocalSearchParams } from 'expo-router';
import { useAuth } from '../../context/SellerAuthContext';
import { useRouter } from 'expo-router';
import { base_url } from '../../constants/server';
import LottieView from "lottie-react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Page = () => {
    const { width } = Dimensions.get('window');
    const { id } = useLocalSearchParams<{ id: string }>();
    const { seller } = useAuth();
    const router = useRouter();
    const [orderDetails, setOrderDetails] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [buttonText, setButtonText] = useState('Ready to Ship');

    const sellerId = seller?.seller._id;

    useEffect(() => {
        const checkButtonStatus = async () => {
            const status = await AsyncStorage.getItem(`order_${id}_status`);
            if (status === 'accepted') {
                setButtonText('Order Accepted');
                setButtonDisabled(true);
            }
        };

        const fetchOrderDetails = async () => {
            const token = await AsyncStorage.getItem('sellerToken');
            await checkButtonStatus(); // Check button status before fetching order details

            try {
                if (seller) {
                    const response = await axios.get(`${base_url}/order/get-seller-all-orders/${sellerId}`, {
                        headers: {
                            Authorization: token
                        }
                    });
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
                } else {
                    router.replace("/(modals)/login");
                }
            } catch (error) {
                console.error('Error fetching orders:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrderDetails();
    }, [id]);

    const updateOrderStatus = async () => {
        const token = await AsyncStorage.getItem('sellerToken');
        setLoading(true);

        try {
            const response = await axios.put(`${base_url}/order/update-order-status/${id}`, 
                {
                    status: 'Ready To Ship',
                }, 
                {
                    headers: {
                        Authorization: token
                    }
                }
            );
            if (response.data.success) {
                await AsyncStorage.setItem(`order_${id}_status`, 'accepted');
                Alert.alert('Success', 'You have successfully accepted this order, the dispatch rider will come to pick it up from your location, please be online till you have handed it over');
                setButtonText('Order Accepted');
                setButtonDisabled(true);
                console.log('Order status update success');
            } else {
                console.log('error updating status', response.data.message);
            }
        } catch (error) {
            console.log('unable to update order status', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.pageContainer}>
            {loading ? (
                <ActivityIndicator size="small" color="#025492" />
            ) : (
                <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
                    <View>
                        <Image source={{uri: orderDetails?.cart[0]?.images[0].url}} style={{ height: 190, width: 150, marginTop: 65, alignSelf: "center", marginBottom: 23 }} />
                    </View>
                    {
                        orderDetails ? (
                            <View>
                                <View style={{ alignItems: 'center', marginBottom: 10 }} >
                                    <Image source={require('../../assets/images/track-order.png')} resizeMode='contain' style={{ height: 209, width: width }} />
                                    <View style={{ justifyContent: "center", alignItems: 'center', position: 'absolute', top: 20, gap: 10 }} >
                                        <Text numberOfLines={1} style={{ fontSize: 13, color: '#00000080', fontWeight: '500' }}>{orderDetails.cart[0].name}</Text>
                                        <Text style={{ fontSize: 16, fontWeight: '500' }} >₦{orderDetails.cart[0].originalPrice.toLocaleString()}</Text>
                                    </View>
                                </View>
                                <View style={{ paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }} >
                                    <View>
                                        <Text style={{ fontSize: 13, color: '#00000080' }} >Order Id</Text>
                                        <Text style={{ fontSize: 14, fontWeight: '700', color: '#00000099', width: 110 }} >{id}</Text>
                                    </View>
                                    <View>
                                        <Text style={{ fontSize: 13, color: '#00000080' }} >Order Status</Text>
                                        <Text style={{ fontSize: 14, fontWeight: '700', color: 'green' }} >{orderDetails.paymentInfo.status}</Text>
                                    </View>
                                </View>
                                <View style={{ paddingHorizontal: 20, justifyContent: 'center', alignItems: 'center' }} >
                                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ fontSize: 13, color: '#00000080' }} >Product Color</Text>
                                        <Text style={{ fontSize: 14, fontWeight: '700', color: "#00000099" }} >{orderDetails.cart[0].color || "unavailable"}</Text>
                                    </View>
                                </View>
                                <TouchableOpacity 
                                    onPress={updateOrderStatus} 
                                    style={{backgroundColor: buttonDisabled ? '#888' : '#025492', borderRadius: 10, marginVertical: 15, marginHorizontal: 20, paddingVertical: 15, paddingHorizontal: 30, justifyContent: 'center', alignItems: 'center'}}
                                    disabled={buttonDisabled}
                                >
                                    <Text style={{color: '#ffffff', fontFamily: 'roboto-condensed-sb'}} >
                                        {loading ? <ActivityIndicator size="small" color="#025492" /> : buttonText}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <View>
                                <View style={{ justifyContent: "center", alignItems: "center" }} >
                                    <LottieView
                                        source={require('../../assets/images/no-result.json')}
                                        autoPlay
                                        loop
                                        style={{ height: 200, width: 200 }}
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
    pageContainer: {
        flex: 1,
        backgroundColor: "#ffffff",
        justifyContent: 'center',
        alignItems: 'center'
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
