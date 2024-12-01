import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { CartItem } from '../types/Order';
import { Link } from 'expo-router';

interface SellerOrderedProductsCardProps {
    item: CartItem
    orderId: string | undefined
    productPosition: number | undefined
}

const SellerOrderedProductsCard: React.FC<SellerOrderedProductsCardProps> = ({ item, orderId, productPosition }) => {

    return (
        <Link href={{ pathname: `/approveOrder/${orderId}`, params: { productPosition } }}  >
            <View style={{ marginHorizontal: 40, borderBottomWidth: 3, borderBottomColor: '#00000005', flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                <View>
                    <Image source={{ uri: item.images[0].url }} style={{ width: 93, height: 93, marginVertical: 10, borderRadius: 3 }} resizeMode='contain' />
                </View>
                <View  >
                    <Text style={{ fontFamily: 'roboto-condensed-m', fontSize: 14, color: '#828282', maxWidth: 200 }} numberOfLines={1} >{item?.name}</Text>
                    <Text style={{ fontSize: 17, color: '#025492', fontFamily: 'roboto-condensed-m' }} >{'₦' + (item.discountPrice === 0 || item.discountPrice === null ? item.originalPrice?.toLocaleString() : item.discountPrice?.toLocaleString())}</Text>
                    <Text style={{ fontSize: 10, color: '#00000070', fontWeight: '500', maxWidth: 150 }} numberOfLines={1}>Product Color: {item?.color || "unavailable"}</Text>
                </View>
            </View>
        </Link>
    )
}

export default SellerOrderedProductsCard