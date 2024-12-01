import { View, Text, ActivityIndicator, Dimensions } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useAuth } from '../../context/SellerAuthContext';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { base_url } from '../../constants/server';
import { useRouter } from 'expo-router';
import SellerOrderedProductsCard from '../../components/SellerOrderedProductsCard';

const Page: React.FC = () => {
    const { id } = useLocalSearchParams<{ id: string }>();
    const { seller } = useAuth();
    const [orderDetails, setOrderDetails] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const { height } = Dimensions.get("window");

    const sellerId = seller?.seller._id;

    useEffect(() => {

        const fetchOrderDetails = async () => {
            const token = await AsyncStorage.getItem('sellerToken');
            try {
                setLoading(true);
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

    const cart = orderDetails?.cart;

    return (
        <View style={{ flex: 1, backgroundColor: "#fff", paddingTop: 20 }} >
            {
                loading ? (
                    <ActivityIndicator size= "small" color="#025492" style={{ marginTop: height / 3 }} />
                ) : (
                    cart?.map((item: any, index: number) => (
                        <SellerOrderedProductsCard key={index} item={item} orderId={id} productPosition={index} />
                    ))
                )
            }
        </View>
    )
}

export default Page