import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react';
import { defaultStyles } from '../constants/Styles';
import Colors from '../constants/Colors';
import { CartItem } from '../types/Order';
import { Link, useRouter } from 'expo-router';

interface OrderedProductsCardProps {
    item: CartItem;
    index?: number;
    orderId?: string | undefined;
    status?: string | undefined;
    sendOrderApprovalAndReview: (productId: string) => void;
}

const OrderedProductsCard: React.FC<OrderedProductsCardProps> = ({ item, index, orderId, status, sendOrderApprovalAndReview }) => {

    const handleOrderStatusTextColor = (status: string) => {
        if (status === "Pending") {
            return { color: "#FAFF00", fontSize: 9 }
        } else if (status === "Approved") {
            return { color: "#00FF00", fontSize: 9 }
        } else if (status === "Declined") {
            return { color: "#FC8B00", fontSize: 9 }
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.topSection} >
                <Image source={{ uri: item.images[0].url }} style={styles.image} />
                <View style={{ paddingVertical: 12.5 }} >
                    <Text numberOfLines={2} style={styles.name} >{item.name}</Text>
                    <Text style={styles.price} >{'₦' + (item.discountPrice === 0 || item.discountPrice === null ? item.originalPrice?.toLocaleString() : item.discountPrice?.toLocaleString())}</Text>
                    <Text style={styles.discount} > {item.discountPrice !== 0 && item.discountPrice !== null ? '₦' + (item.originalPrice?.toLocaleString() || '') : null}</Text>
                    <View style={styles.statusContainer} >
                        <View style={[styles.ellipse, { backgroundColor: handleOrderStatusTextColor(item.approvalStatus)?.color }]}></View>
                        <Text style={styles.status}>{item.approvalStatus}</Text>
                        <Text style={{ fontFamily: 'roboto-condensed', fontSize: 13, color: 'rgba(0,0,0,0.50)' }}>Quantity : {item.stock}</Text>
                    </View>
                </View>
            </View>
            {
                item.approvalStatus === "Approved" ? (
                    <TouchableOpacity disabled style={[styles.trackButton, { backgroundColor: Colors.grey }]} >
                        <Text style={[styles.trackButtonText, { color: "#fff" }]} >Product Review Approved</Text>
                    </TouchableOpacity>
                ) : (
                    <>
                        {/*
                            status === "Delivered" && (
                                <TouchableOpacity style={styles.trackButton2} onPress={() => sendOrderApprovalAndReview(item._id)} >
                                    <Text style={styles.trackButtonText}>Review Product Delivery</Text>
                                </TouchableOpacity>
                            )
                        */}
                        {
                            item.approvalStatus === "Pending" && (
                                <Link style={styles.trackButton} href={{ pathname: `/order/${orderId}`, params: { index: index }, query: { status: status } }}>Review Product</Link>
                            )
                        }
                        {
                            item.approvalStatus === "Declined" && (
                                <Link style={[styles.trackButton, { color: Colors.red, backgroundColor: Colors.redTransparent }]} href={{ pathname: `/order/${orderId}`, params: { index: index } }}>Message Seller</Link>
                            )
                        }
                    </>
                )
            }
        </View>
    )
};

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
    },
    topSection: {
        flexDirection: 'row',
        alignItems: "center",
        gap: 28,
    },
    image: {
        width: 83,
        height: 83,
        resizeMode: 'contain',
    },
    name: {
        fontFamily: 'roboto-condensed',
        fontWeight: '500',
        color: 'rgba(0,0,0,0.50)',
        marginBottom: 6,
        maxWidth: 180,
    },
    price: {
        fontFamily: 'roboto-condensed',
        fontSize: 18,
        color: Colors.primary,
        fontWeight: '500',
    },
    discount: {
        fontFamily: 'roboto-condensed',
        fontSize: 10,
        color: 'rgba(0,0,0,0.30)',
        fontWeight: '500',
        textDecorationLine: 'line-through',
        marginBottom: 12.5
    },
    statusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    ellipse: {
        width: 10,
        height: 10,
        borderRadius: 50,
    },
    status: {
        fontSize: 12,
        color: 'rgba(0,0,0,0.80)',
    },
    trackButton: {
        backgroundColor: Colors.primaryTransparent,
        color: Colors.primary,
        fontSize: 13,
        fontFamily: "roboto-condensed-sb",
        justifyContent: "center",
        alignItems: "center",
        padding: 15,
        display: 'flex',
        textAlign: 'center',
        borderRadius: 10,
    },
    trackButtonText: {
        color: Colors.red,
        fontSize: 13,
        fontFamily: "roboto-condensed-sb",
    },
    trackButton2: {
        backgroundColor: Colors.redTransparent,
        color: Colors.red,
        fontSize: 13,
        fontFamily: "roboto-condensed-sb",
        justifyContent: "center",
        alignItems: "center",
        padding: 15,
        display: 'flex',
        textAlign: 'center',
        borderRadius: 10,
        marginBottom: 5
    },

})

export default OrderedProductsCard