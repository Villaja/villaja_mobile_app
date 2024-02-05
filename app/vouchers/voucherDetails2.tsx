import React, { useState } from "react";
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView, StyleSheet, Clipboard } from "react-native";
import { Svg, Path } from "react-native-svg";
import { defaultStyles } from "../../constants/Styles";
import { useRouter } from "expo-router";


export default function voucherDetails2() {
    const router = useRouter()

    // Function to generate a random alphanumeric string
    const generateRandomString = (length) => {
        const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
        let result = ''
        for (let i=0; i < length; i++) {
            const randomCode = Math.floor(Math.random() * charset.length)
            result += charset.charAt(randomCode)
        }
        return result
    }

    // Function to generate a unique promo code
    const generatePromoCode = () => {
        const randomString = generateRandomString(15)
        const suffix = Math.floor(Math.random() * 5000)

        return `${randomString}-${suffix}`
    }

    const [promoCode, setPromoCode] = useState(generatePromoCode())

    //function to copy text to clipboard
    const copyToClipboard = () => {
        Clipboard.setString(promoCode)
        alert('Promo Code Copied to Clipboard!!')
    }

    return (
        <ScrollView style={styles.mainContainer}>
            <View style={styles.voucherContainer}>
                <View style={styles.imageContainer}>
                    <Image source={require("../../assets/images/Group344.png")} style={styles.image1} />
                    <Image source={require("../../assets/images/Rectangle99.png")} style={styles.image2} />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.text1}>20% Discount On All Orders</Text>
                    <Text style={styles.text2}>Valid for 30 days after sign up</Text>
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
                    <Text style={styles.lineText2}>Percentage Discount</Text>
                </View>
                <View style={styles.textLine}>
                    <Text style={styles.lineText1}>Type</Text>
                    <Text style={styles.lineText2}>e-Voucher</Text>
                </View>
                <View style={styles.textLine}>
                    <Text style={styles.lineText1}>Amount</Text>
                    <Text style={styles.lineText2}>20%</Text>
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
        fontFamily: "roboto-condensed-sb",
        fontSize: 12.5
    },
    text2:  {
        fontFamily: "roboto-condensed-sb",
        fontSize: 10,
        color: "#a9a9a9"

    },
    section2: {
        top: 27,
        width: 300,
        height: 390,
        left: 32,
        position: "relative"
    },
    textLine: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginVertical: 8,
      borderBottomWidth: 0.5
    },
    lineText1: {
        fontFamily: "roboto-condensed-sb",
        fontSize: 12,
        color: "#00000050",
        fontWeight: "800"
    }, 
    lineText2: {
        fontFamily: "roboto-condensed-sb",
        fontSize: 15,
        color: "#000000",
        fontWeight: "700"
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
