import React, { useState, useEffect} from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, Clipboard } from "react-native";
import { Svg, Path } from "react-native-svg";
import { defaultStyles } from "../../constants/Styles";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function voucherDetails() {
    const router = useRouter()

   // Function to generate a random alphanumeric string
   const generateRandomString = (length) => {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomCode = Math.floor(Math.random() * charset.length);
        result += charset.charAt(randomCode);
    }
    return result;
};

// Function to generate a unique promo code
const generatePromoCode = () => {
    const randomString = generateRandomString(15);
    const suffix = Math.floor(Math.random() * 5000);

    return `${randomString}-${suffix}`;
};

const [promoCode, setPromoCode] = useState('');

useEffect(() => {
    // Check if promo code is already stored in AsyncStorage
    AsyncStorage.getItem('promoCode').then((storedPromoCode) => {
        if (storedPromoCode) {
            // If promo code is already stored, set it
            setPromoCode(storedPromoCode);
        } else {
            // If promo code is not stored, generate a new one and store it
            const newPromoCode = generatePromoCode();
            setPromoCode(newPromoCode);
            AsyncStorage.setItem('promoCode', newPromoCode);
        }
    }).catch((error) => {
        console.error('Error fetching promo code from AsyncStorage:', error);
    });
}, []);

//function to copy text to clipboard
const copyToClipboard = () => {
    Clipboard.setString(promoCode);
    alert('Promo Code Copied to Clipboard!!');
};

    return (
        <ScrollView style={styles.mainContainer}>
            <View style={styles.voucherContainer}>
                <View style={styles.imageContainer}>
                    <Svg width="335" height="93" viewBox="0 0 335 93" fill="none" xmlns="http://www.w3.org/2000/svg">
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
            </View>
            <View style={styles.section2}>
                <View style={styles.textLine}>
                    <Text style={styles.lineText1}>Date</Text>
                    <Text style={styles.lineText2}>02/03/2024</Text>
                </View>
                <View style={styles.textLine}>
                    <Text style={styles.lineText1}>Voucher Code</Text>
                    <Text style={styles.lineText2}>{promoCode}</Text>
                </View>
                <View style={styles.textLine}>
                    <Text style={styles.lineText1}>Reference</Text>
                    <Text style={styles.lineText2}>Cash Discount</Text>
                </View>
                <View style={styles.textLine}>
                    <Text style={styles.lineText1}>Type</Text>
                    <Text style={styles.lineText2}>e-Voucher</Text>
                </View>
                <View style={styles.textLine}>
                    <Text style={styles.lineText1}>Amount</Text>
                    <Text style={styles.lineText2}>₦10,000</Text>
                </View>
            </View>
            <TouchableOpacity
                style={[styles.btn, { marginHorizontal: 20, marginVertical: 15, }]}
                onPress={copyToClipboard}
            >
                <Text style={styles.btnText}>Copy Voucher Code</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: "#FDFFFF",
    },
    voucherContainer: {
        flex: 1,
        top: 15,
        marginHorizontal: 15,
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
        fontFamily: "roboto-condensed-sb",
        fontSize: 12.5
    },
    text2: {
        fontFamily: "roboto-condensed-sb",
        fontSize: 10,
        color: "#a9a9a9"

    },
    section2: {
        top: 27,
        width: 300,
        paddingHorizontal: 20,
        marginHorizontal: 0,
        height: 390,
        left: 32,
        position: "relative",
    },
    textLine: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 8,
        borderBottomWidth: 0.5,
        borderBottomColor: "#00000050"
    },
    lineText1: {
        fontFamily: "roboto-condensed-sb",
        fontSize: 12,
        color: "#00000050",
        fontWeight: "800"
    },
    lineText2: {
        fontFamily: "roboto-condensed-sb",
        fontSize: 12,
        color: "#000000",
        fontWeight: "500"
    },
    btn: {
        backgroundColor: "#025492",
        height: 50,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        top: 5
    },
    btnText: {
        color: "#fff",
        fontSize: 14,
        fontFamily: "roboto-condensed-sb",
    }
})