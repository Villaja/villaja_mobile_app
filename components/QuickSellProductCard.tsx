import React from 'react'
import { ScrollView, View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import  Colors  from "../constants/Colors";

const QuickSellProductCard = () => {
  return (
    <ScrollView style={styles.container} >
            <TouchableOpacity style={styles.uploadButton} >
                <Text style={styles.uploadText} >Upload Product</Text>
                <AntDesign name="plus" size={14} color="#025492" />
            </TouchableOpacity>
            <View style={styles.wrapper} >
                <View style={styles.productWrapper} >
                    <Image source={require('../assets/images/quickp.png')} style={styles.image} />
                    <View style={styles.productInfo} >
                        <Text numberOfLines={2} style={styles.productName} >Soundcore Space Q45, 2022 Vision</Text>
                        <Text style={styles.productPrice} >₦234,000</Text>
                        <Text style={styles.productDiscountPrice} >₦234,000</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.editButton} >
                    <Text style={styles.editButtonText} >Edit Product</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.deleteButton} >
                    <Text style={styles.deleteButtonText} >Remove Product</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primaryUltraTransparent
    },
    wrapper: {
        marginTop: 21,
        backgroundColor: "#ffffff",
        marginHorizontal: 20
    },
    uploadButton: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-end',
        marginRight: 22,
        marginTop: 20,
        gap: 5
    },
    uploadText: {
        fontSize: 13, 
        color: "#025492",
        lineHeight: 15,
        fontFamily: 'roboto-condensed'
    },
    productWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 18,
        marginHorizontal: 13.5,
        marginVertical: 15,
    },
    image: {
        width: 103, 
        height: 96
    },
    productInfo: {

    },
    productName: {
        marginBottom: 8,
        fontSize: 14,
        fontFamily: 'roboto-condensed-sb',
        fontWeight: '500',
        color:'#00000080',
        maxWidth: 180,
    },
    productPrice: {
        fontSize: 17,
        color: '#025492',
        fontFamily: 'roboto-condensed',
        fontWeight: '500'
    },
    productDiscountPrice: {
        fontSize: 10,
        color: '#00000080',
        textDecorationLine: 'line-through'
    },
    editButton: {
        backgroundColor: '#025492',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
        borderRadius: 10,
        marginBottom: 10
    },
    editButtonText: {
        color: '#ffffff',
        fontFamily: 'roboto-condensed',
        fontWeight: '700',
        fontSize: 13,
        marginVertical: 10,
    },
    deleteButton: {
        backgroundColor: Colors.redTransparent,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
        borderRadius: 10,
        marginBottom: 14
    },
    deleteButtonText: {
        color: Colors.red,
        fontFamily: 'roboto-condensed',
        fontWeight: '700',
        fontSize: 13,
        marginVertical: 10,
    }
})


export default QuickSellProductCard

