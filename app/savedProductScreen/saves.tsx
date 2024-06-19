import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, ScrollView, Alert, Dimensions, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'expo-router';
import axios from 'axios';
import SavedProductCard from "../../components/SavedProductCard";
import { defaultStyles } from "../../constants/Styles";
import Colors from '../../constants/Colors'
import { Product } from '../../types/Product'
import AsyncStorage from '@react-native-async-storage/async-storage';
import LottieView from "lottie-react-native";

const sampleSaves = [
    {
        id: 1,
        name: "apple Watch gen 2",
        originalPrice: 234000,
        discountPrice: 199000,
        image: "https://istore.com.ng/cdn/shop/files/SE3midband144mm_800x.png?v=1696983068"
    },

    {
        id: 2,
        name: "apple Vision pro",
        originalPrice: 234000,
        discountPrice: 199000,
        image: "https://www.theapplepost.com/wp-content/uploads/2023/06/Apple-Reality-Pro-Headset-The-Apple-Post-960x640.jpg"
    }
]

const saves = () => {
    const { user } = useAuth();
    const {height} = Dimensions.get('window');
    const router = useRouter()
    const [saves,setSaves] = useState<Array<Product>>([])
    const [loading, setLoading] = useState<boolean>(true);
    const id = user?.user._id

    const handleRemoveWishList = async(id:string) => {

        var wishList = [] as Product[];

        await AsyncStorage.getItem('wishList', (error, result) => {
            wishList = JSON.parse(result!);
        });

        const newWishList = wishList.filter((item) => item._id !== id);
        await AsyncStorage.setItem('wishList', JSON.stringify(newWishList));
        setSaves(newWishList);
    }

    const handleGetWishList = async() => {
        try {
            await AsyncStorage.getItem('wishList', (error, result) => {
                setSaves(JSON.parse(result!));
            });
        } catch (error) {
            console.log('error fetching wishlist', error)
            Alert.alert('Error', `could not fetch wish list: ${error}`)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        handleGetWishList()
    },[])
    
   




    return (
        <ScrollView style={styles.container} >
            {
                loading ? <ActivityIndicator size={'small'} color={Colors.primary} /> : saves && saves.length > 0 ? saves.map((item) => (
                    <SavedProductCard product={item} key={item._id} handleRemoveWishList={handleRemoveWishList} />
                ))

                    :
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: height / 1 / 6 }} >
                        <LottieView source={require('../../assets/images/wishlist.json')} autoPlay loop={true} style={{ width: 150, height: 200, marginBottom: 40 }} />
                        <Text style={{ fontSize: 16, color: '#00000090', fontWeight: '700', marginBottom: 20 }} >No Saved Product yet</Text>
                        <TouchableOpacity style={{ paddingVertical: 14, paddingHorizontal: 35, backgroundColor: "#025492", borderRadius: 10 }} onPress={() => router.push('/')} >
                            <Text style={{ color: '#ffffff', fontWeight: '500', fontSize: 14 }} >Continue Shopping</Text>
                        </TouchableOpacity>
                    </View>
            }
        </ScrollView>
    )
}

export default saves

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
    }
})



