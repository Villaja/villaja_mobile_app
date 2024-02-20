import React, { useState } from 'react'
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import Toast from 'react-native-toast-message'
import { useAuth } from '../../context/AuthContext'
import { useRouter } from 'expo-router'


const sampleSaves = [
    {
        id: 1,
        name: "apple watch gen 2",
        originalPrice: 234000,
        discountPrice: 199000,
        image: "https://downloadscdn6.freepik.com/23/2150297/2150296477.jpg?filename=new-smartwatch-balancing-with-hand.jpg&token=exp=1707936661~hmac=c634714fadddaa04ed2356927ead657d"
    },
    {
        id: 2,
        name: "apple Vision pro",
        originalPrice: 234000,
        discountPrice: 199000,
        image: "https://www.apple.com/v/apple-vision-pro/c/images/overview/hero/portrait_base__bwsgtdddcl7m_large.jpg"
    }
]

const saves = () => {
    const { user } = useAuth();
    const router = useRouter()
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
}
