import React, { useState } from "react";
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView, StyleSheet, Switch } from "react-native";
import { Svg, Path } from "react-native-svg";
import { defaultStyles } from "../../constants/Styles";
import { useRouter } from "expo-router";

function voucherList () {
    const router = useRouter()
    return(
        <ScrollView style={styles.mainContainer}>
            <TouchableOpacity style={styles.voucherContainer} onPress={() => router.push(`/vouchers/voucherDetails`)}>
            <View style={styles.imageContainer}>
                <Image source={require("../../assets/images/Group344.png")} style={styles.image1}/>
                <Image source={require("../../assets/images/Rectangle99.png")} style={styles.image2}/>
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.text1}>₦5,000 Promo on Initial Purchase</Text>
                <Text style={styles.text2}>Valid for 24 hours after sign up</Text>
            </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.voucherContainer} onPress={() => router.push(`/vouchers/voucherDetails2`)} >
            <View style={styles.imageContainer}>
                <Image source={require("../../assets/images/Group344.png")} style={styles.image1}/>
                <Image source={require("../../assets/images/Rectangle99.png")} style={styles.image2}/>
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.text1}>20% Discount On All Orders</Text>
                <Text style={styles.text2}>Valid for 30 days after sign up</Text>
            </View>
            </TouchableOpacity>
        </ScrollView>
    )
}

export default voucherList

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: "#FDFFFF",
    },
    voucherContainer: {
        flex: 1,
        top: 15,
        paddingHorizontal: 15,
        paddingVertical: 35,
        width: 455,
    },
    image1: {
        width: 335,
        height: 93
        
    }, 
    image2: {
        position: "absolute",
        width: 48,
        height: 48,
        left: 257,
        top: 8
    },
    textContainer: {
        position: "absolute",
        top: 45,
        width: 500,
        paddingHorizontal: 40
    },
    text1: {
        color: "#ffffff",
        fontWeight: "800",
        fontFamily: "Roboto",
        fontSize: 12.5
    },
    text2:  {
        fontFamily: "Roboto",
        fontSize: 10,
        color: "#a9a9a9"

    }
})