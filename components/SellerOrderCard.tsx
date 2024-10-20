import React from 'react'
import { ScrollView, View, Text, TouchableOpacity, Image } from "react-native";
import { Order } from '../types/Order';
import { Link } from "expo-router";
import { useRouter } from "expo-router";

interface SellerOrdersCardProps {
    order: Order
}

const SellerOrderCard: React.FC<SellerOrdersCardProps> = ({ order }) => {
    const router = useRouter();

    return (
        <TouchableOpacity style={{ marginHorizontal: 20, borderBottomWidth: 3, borderBottomColor: '#00000005', flexDirection: 'row', alignItems: 'center', gap: 10 }} key={order._id} onPress={() => router.push(`/approveOrder/${order._id}`)} >
            <Image source={{ uri: order.cart[0].images[0].url }} style={{ width: 93, height: 93, marginVertical: 10, borderRadius: 3 }} resizeMode='contain' />
            <View>
                <Text style={{ fontFamily: 'roboto-condensed-m', fontSize: 14, color: '#828282', maxWidth: 200 }} numberOfLines={1} >{order?.cart[0]?.name}</Text>
                <Text style={{ fontSize: 17, color: '#025492', fontFamily: 'roboto-condensed-m' }} >₦{order?.totalPrice?.toLocaleString()}</Text>
                <Text style={{ fontSize: 10, color: '#00000070', fontWeight: '500', maxWidth: 150 }} numberOfLines={1} >By: {order?.user?.firstname}</Text>
                <Text style={{ fontSize: 10, color: '#00000070', fontWeight: '500', maxWidth: 150 }} numberOfLines={1}>Location: {order?.shippingAddress?.city}</Text>
                <Text style={{ fontSize: 10, color: '#00000070', fontWeight: '500', maxWidth: 150 }} numberOfLines={1}>Product Color: {order?.cart[0]?.color || "unavailable" }</Text>
            </View>
        </TouchableOpacity>
    );
};

export default SellerOrderCard