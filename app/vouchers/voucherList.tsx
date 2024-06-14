import React, { useState } from "react";
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView, StyleSheet, Switch } from "react-native";
import { Svg, Path } from "react-native-svg";
import { defaultStyles } from "../../constants/Styles";
import { useRouter } from "expo-router";

function voucherList() {
    const router = useRouter()
    return (
        <ScrollView style={styles.mainContainer}>
            <TouchableOpacity style={styles.voucherContainer} onPress={() => router.push('/vouchers/voucherDetails')}>
                <View>
                    <Svg width="335" height="93" viewBox="0 0 335 93" fill="none">
                        <Path fill-rule="evenodd" clip-rule="evenodd" d="M0 10C0 4.47715 4.47715 0 10 0H325C330.523 0 335 4.47715 335 10V52.0107C334.834 52.0036 334.668 52 334.5 52C328.149 52 323 57.1487 323 63.5C323 69.8513 328.149 75 334.5 75C334.668 75 334.834 74.9964 335 74.9893V83C335 88.5228 330.523 93 325 93H9.99999C4.47714 93 0 88.5229 0 83V74.9893C6.11931 74.7275 11 69.6837 11 63.5C11 57.3162 6.11931 52.2725 0 52.0107V10Z" fill="#025492" />
                    </Svg>
                    <Image source={require("../../assets/images/Line39.png")} style={{ position: "absolute", top: 62, left: 11 }} />
                    <Text style={{ color: "#ffffff40", position: "absolute", fontSize: 10, fontFamily: "roboto-condensed-sb", top: 70, left: 90 }} >***Terms and conditions apply***</Text>
                    <Image source={require("../../assets/images/Rectangl.jpg")} style={styles.image2} />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.text1}>₦10,000 Promo on Initial Purchase</Text>
                    <Text style={styles.text2}>Valid for 12 hours after sign up</Text>
                </View>
            </TouchableOpacity>
           {/* <TouchableOpacity style={styles.voucherContainer} onPress={() => router.push(`/vouchers/voucherDetails2`)} >
                <View>
                    <Svg width="335" height="93" viewBox="0 0 335 93" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path fill-rule="evenodd" clip-rule="evenodd" d="M0 10C0 4.47715 4.47715 0 10 0H325C330.523 0 335 4.47715 335 10V52.0107C334.834 52.0036 334.668 52 334.5 52C328.149 52 323 57.1487 323 63.5C323 69.8513 328.149 75 334.5 75C334.668 75 334.834 74.9964 335 74.9893V83C335 88.5228 330.523 93 325 93H9.99999C4.47714 93 0 88.5229 0 83V74.9893C6.11931 74.7275 11 69.6837 11 63.5C11 57.3162 6.11931 52.2725 0 52.0107V10Z" fill="#025492" />
                    </Svg>
                    <Image source={require("../../assets/images/Line39.png")} style={{ position: "absolute", top: 62, left: 11 }} />
                    <Text style={{ color: "#ffffff40", position: "absolute", fontSize: 10, fontFamily: "roboto-condensed-sb", top: 70, left: 90 }} >***Terms and conditions apply***</Text>
                    <Image source={require("../../assets/images/Rectangl.jpg")} style={styles.image2} />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.text1}>20% Discount On All Orders</Text>
                    <Text style={styles.text2}>Valid for 30 days after sign up</Text>
                </View>
            </TouchableOpacity> */}
        </ScrollView>
    )
}

export default voucherList

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: "#ffffff"
    },
    voucherContainer: {
        top: 10,
        marginHorizontal: 15,
        paddingVertical: 35,
        width: 455,
    },
    image1: {
        width: 335,
        height: 93,
    },
    image2: {
        position: "absolute",
        width: 48,
        height: 48,
        left: 257,
        top: 8,
        borderRadius: 5
    },
    textContainer: {
        position: "absolute",
        top: 45,
        width: 500,
        paddingHorizontal: 20
    },
    text1: {
        color: "#ffffff",
        fontWeight: "800",
        fontFamily: "Roboto",
        fontSize: 12.5
    },
    text2: {
        fontFamily: "Roboto",
        fontSize: 10,
        color: "#a9a9a9"

    }
})