import { ScrollView, View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { defaultStyles } from '../constants/Styles';
import Colors from '../constants/Colors';
import { Product } from '../types/Product';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';


interface Props {
    id: number;
    name: string;
    originalPrice: number;
    discountPrice: number;
    image: string;
}



export const SavedProductCard = (item: Props) => {
    return (
        <ScrollView style={{ flex: 1, backgroundColor: "#ffffff" }} >
            <View style={styles.container}>
                <TouchableOpacity style={styles.topSection}>
                    <View style={{ paddingVertical: 12.5, flexDirection: "row", alignItems: "center" }}>
                        <Image source={{ uri: item.image }} style={styles.image} />
                        <View style={{ marginLeft: 18 }}>
                            <Text style={styles.name}>{item.name}</Text>
                            <Text style={styles.price}>₦{item.originalPrice.toLocaleString()}</Text>
                            <Text style={styles.discount}>{item.discountPrice === 0 ? null : '₦' + item.discountPrice.toLocaleString()}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={{ color: "#00000070", fontSize: 12 }} >Remove</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        gap: 15,
        padding: 14,
        backgroundColor: '#fff',
        borderRadius: 5,
        elevation: 4,
        shadowColor: 'rgba(2, 84, 146, 0.10)',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 8,
        marginBottom: 16,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottomWidth: 0.3,
        borderBottomColor: "#00000040"
    },
    topSection: {
        flexDirection: 'row',
        gap: 18,

    },
    image: {
        width: 83,
        height: 83,
        resizeMode: 'contain',
        borderRadius: 5,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: 'rgba(0,0,0,0.05)'
    },
    name: {
        fontFamily: 'roboto-condensed',
        fontWeight: '700',
        color: 'rgba(0,0,0,0.50)',
        marginBottom: 6,
        fontSize: 13
    },
    price: {
        fontFamily: 'roboto-condensed',
        fontSize: 15,
        color: Colors.primary,
        fontWeight: '700'
    },
    discount: {
        fontFamily: 'roboto-condensed',
        fontSize: 9,
        color: 'rgba(0,0,0,0.30)',
        fontWeight: '500',
        textDecorationLine: 'line-through'
    }
})