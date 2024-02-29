import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, FlatList, StyleSheet, ScrollView } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import Toast from 'react-native-toast-message'
import { useAuth } from '../../context/AuthContext'
import { useRouter } from 'expo-router'
import axios from 'axios'
import { SavedProductCard } from "../../components/SavedProductCard";
import { defaultStyles } from "../../constants/Styles";
import Colors from '../../constants/Colors'
import { Product } from '../../types/Product'
import AsyncStorage from '@react-native-async-storage/async-storage'


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
    const router = useRouter()
    const [saves, setSaves] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const id = user?.user._id

    useEffect(() => {
        handleGetSaves()
        
      },[])

    const handleGetSaves = async () => {

        try
        {
          await AsyncStorage.getItem('saves',(err,result) => {      
          setSaves(JSON.parse(result!))
        })
        }
        catch(err)
        {
          console.log(err);
          
        }
        
      }

      const handleRemoveSaves = async (id:string) => {
        var saves = [] as Product[]
        await AsyncStorage.getItem('saves',(err,result) => {
          saves = JSON.parse(result!)
        })
    
        const newSaves = saves.filter((it) => it._id !== id)
    
        await AsyncStorage.setItem('saves',JSON.stringify(newSaves))
        setSaves(newSaves)
      }
    


    return (
        <ScrollView style={styles.container} >
            <View style={{ alignItems: 'flex-end', paddingHorizontal: 20, paddingVertical: 7 }}>
                <TouchableOpacity><Text style={{ fontFamily: 'roboto-condensed', color: Colors.primary }}>Clear History</Text></TouchableOpacity>
            </View>
            {sampleSaves.length > 0 ? (
                sampleSaves.map((item) => (
                    <SavedProductCard key={item.id} {...item} />
                ))
            ) : (
                <Text>No saved products</Text>
            )}
        </ScrollView>
    )
}

export default saves

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff"
    }
})



