import React from 'react'
import { ScrollView, View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import  Colors  from "../constants/Colors";
import { Product } from '../types/Product';

interface QuickSwapProductCardProps {
    product: any;
    handleDeleteQuickSwapProducts: (productId: string) => void;
  }


const QuickSwapProductCard: React.FC<QuickSwapProductCardProps> = ({product, handleDeleteQuickSwapProducts}) => {
  return (
    <View style={styles.container} key={product._id} >
            <View style={styles.wrapper}  >
                <View style={styles.productWrapper} >
                    <Image source={{ uri: product.userProductImages[0]?.url }} style={styles.image} />
                    <View style={styles.productInfo} >
                        <Text numberOfLines={2} style={styles.productName} >{product.userProductName}</Text>
                        <Text style={styles.productPrice} >₦{product.userProductPrice.toLocaleString()}</Text>
                        <Text style={styles.productDiscountPrice} >₦0</Text>
                    </View>
                </View>
                {/*<TouchableOpacity style={styles.editButton} >
                    <Text style={styles.editButtonText} >Edit Product</Text>
                </TouchableOpacity>*/}
                <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteQuickSwapProducts(product._id)} >
                    <Text style={styles.deleteButtonText} >Remove Product</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primaryUltraTransparent
    },
    wrapper: {
        marginTop: 11,
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
        height: 96,
        borderRadius: 10
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


export default QuickSwapProductCard

