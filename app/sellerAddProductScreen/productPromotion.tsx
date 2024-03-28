import React from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native';

const productPromotion = () => {
    return (
        <ScrollView style={styles.container} >
            <View style={{ marginHorizontal: 20, marginTop: 10, marginBottom: 14 }} >
                <Text style={{ fontSize: 18, fontWeight: "500" }} >Promote Your Product</Text>
                <Text style={{ fontSize: 13, color: "#00000050" }} >Choose A Promotion Type For Your Ad</Text>
            </View>

            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: 325, height: 120, borderWidth: 1, borderColor: "#00000020", borderRadius: 5, marginHorizontal: 20, backgroundColor: "#00000010", marginBottom: 10 }}>
                <View style={{ marginHorizontal: 12, marginTop: 11, columnGap: 11, marginBottom: 15 }}>
                    <Text style={{ fontSize: 13, color: "#00000050" }}>Lite Product Boost</Text>
                    <Text style={{ fontSize: 23, fontWeight: "500" }}>₦10,000</Text>
                    <View style={{ flexDirection: "row", width: 200 }}>
                        <Text style={{ fontSize: 12, color: "#00000070" }}>
                            Boost product in suggestions, search and homepage for{' '}
                            <Text style={{ fontWeight: "700" }}>30 Days</Text>
                        </Text>
                    </View>
                </View>
                <TouchableOpacity style={{ width: 88, height: 28, marginRight: 10, alignSelf: "flex-end", marginBottom: 15, borderRadius: 5, backgroundColor: "#02549290", justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ fontSize: 12, color: "#ffffff", fontWeight: "500" }}>Boost</Text>
                </TouchableOpacity>
            </View>

            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: 325, height: 120, borderWidth: 1, borderColor: "#00000020", borderRadius: 5, marginHorizontal: 20, backgroundColor: "#00000010", marginBottom: 10 }} >
                <View style={{ marginHorizontal: 12, marginTop: 11, columnGap: 11, marginBottom: 15 }} >
                    <Text style={{ fontSize: 13, color: "#00000050" }} >Advanced Product Boost</Text>
                    <Text style={{ fontSize: 23, fontWeight: "500" }} >₦40,000</Text>
                    <View style={{ flexDirection: "row", width: 200 }} >
                        <Text style={{ fontSize: 12, color: "#00000070" }} >Lite Product Boost plus ads on main board in homepage and notifications ads for{' '}<Text style={{ fontWeight: "700" }}>30 Days</Text>  </Text>
                    </View>
                </View>
                <TouchableOpacity style={{ width: 88, height: 28, marginRight: 10, alignSelf: "flex-end", marginBottom: 15, borderRadius: 5, backgroundColor: "#02549290", justifyContent: "center", alignItems: "center" }} >
                    <Text style={{ fontSize: 12, color: "#ffffff", fontWeight: "500" }} >Boost</Text>
                </TouchableOpacity>
            </View>

            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", width: 325, height: 120, borderWidth: 1, borderColor: "#00000020", borderRadius: 5, marginHorizontal: 20, backgroundColor: "#00000010", marginBottom: 150 }} >
                <View style={{ marginHorizontal: 12, marginTop: 11, columnGap: 11, marginBottom: 15 }} >
                    <Text style={{ fontSize: 13, color: "#00000050" }} >Deluxe Product Boost</Text>
                    <Text style={{ fontSize: 23, fontWeight: "500" }} >₦210,000</Text>
                    <View style={{ flexDirection: "row", width: 200 }} >
                        <Text style={{ fontSize: 12, color: "#00000070" }} >Advanced Product Boost plus e-mail and in-app chats ads for all products in your profile for{' '}<Text style={{ fontWeight: "700" }}>6 Months</Text>  </Text>
                    </View>
                </View>
                <TouchableOpacity style={{ width: 88, height: 28, marginRight: 10, alignSelf: "flex-end", marginBottom: 15, borderRadius: 5, backgroundColor: "#02549290", justifyContent: "center", alignItems: "center" }} >
                    <Text style={{ fontSize: 12, color: "#ffffff", fontWeight: "500" }} >Boost</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText1}>Skip and List Product</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}

export default productPromotion

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    button: {
        backgroundColor: "#025492",
        width: 325,
        marginHorizontal: 25,
        height: 50,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 18.29,
    },
    buttonText1: {
        color: "#fff",
        fontSize: 13,
        fontFamily: "roboto-condensed-sb",
    },
})