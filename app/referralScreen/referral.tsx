import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Alert, Modal, StyleSheet, TouchableOpacity, Image, Clipboard} from 'react-native';
import PickerSelect from 'react-native-picker-select';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../../context/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { defaultStyles } from '../../constants/Styles'

const referral = () => {
    const [referralCode, setReferralCode] = useState('');

    useEffect(() => {
        const generateRandomString = (length) => {
            const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            let result = '';
            for (let i = 0; i < length; i++) {
                const randomCode = Math.floor(Math.random() * charset.length);
                result += charset.charAt(randomCode);
            }
            return result;
        };

        const generateAndSetReferralCode = async () => {
            try {
                const existingReferralCode = await AsyncStorage.getItem('referralCode');
                if (existingReferralCode) {
                    setReferralCode(existingReferralCode);
                } else {
                    const newReferralCode = generateRandomString(10);
                    await AsyncStorage.setItem('referralCode', newReferralCode);
                    setReferralCode(newReferralCode);
                }
            } catch (error) {
                console.error('Error generating or retrieving referral code:', error);
            }
        };

        generateAndSetReferralCode();
    }, []);

    const handleShareReferralCode = async () => {
        try {
            await Clipboard.setString(referralCode);
            Alert.alert('Referral Code Copied', 'Your referral code has been copied to the clipboard.');
        } catch (error) {
            console.error('Error copying referral code to clipboard:', error);
            Alert.alert('Error', 'Failed to copy referral code to clipboard.');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.topContainer}>
                <View style={styles.userImageContainer}>
                    <Image source={require("../../assets/images/Ellipse53.png")} style={styles.user1} />
                    <Image source={require("../../assets/images/Ellipse54.png")} style={styles.user2} />
                    <Image source={require("../../assets/images/Ellipse55.png")} style={styles.user3} />
                    <Image source={require("../../assets/images/Ellipse56.png")} style={styles.user4} />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.topContainerText1}>Total Referred</Text>
                    <Text style={styles.topContainerText2}>5 Referred</Text>
                </View>
            </View>
            <View style={styles.middleTextContainer}>
                <Text style={styles.middleText1}>Spread The Love</Text>
                <Text style={styles.middleText2}>invite your family and friends to earn V points with your referral code</Text>
            </View>
            <View style={styles.boxImageContainer}>
                <Image source={require('../../assets/images/Group352.png')} style={styles.boxImage} />
            </View>
            <View style={styles.codeContainer}>
                <View>
                    <Text style={styles.codeText1}>Your Referral Code</Text>
                    <Text style={styles.codeText2}>{referralCode}</Text>
                </View>
                <TouchableOpacity style={styles.shareButton} onPress={handleShareReferralCode}>
                    <Text style={styles.shareButtonText}>Share</Text>
                </TouchableOpacity> 
            </View>
        </View>
    );
};



export default referral

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FDFFFF",
    },
    topContainer: {
        top: 23,
        flexDirection: "row",
        width: 375,
        height: 76,
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 78
    },
    userImageContainer: {
        left: 20,
        flexDirection: "row",
        width: 140,
        height: 50,
        justifyContent: "center",
        alignItems: "center"
    },
    user1: {
        resizeMode: "contain",
        width: 34,
        height: 34,
    },
    user2: {
        resizeMode: "contain",
        width: 34,
        height: 34,
        right: 14
    },
    user3: {
        resizeMode: "contain",
        width: 34,
        height: 34,
        right: 28
    },
    user4: {
        resizeMode: "contain",
        width: 34,
        height: 34,
        right: 40
    },
    textContainer: {
        right: 30,
    },
    topContainerText1: {
        fontSize: 13,
        color: "#00000090",
        fontFamily: "roboto-condensed",
        lineHeight: 15.2,
        fontWeight: "600"
    },
    topContainerText2: {
        fontSize: 17,
        color: "#025492",
        fontFamily: "roboto-condensed-sb",

    },
    middleTextContainer: {
        width: 335,
        height: 53,
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 20
    },
    middleText1: {
        color: "#025492",
        fontSize: 17,
        fontFamily: "roboto-condensed-sb",
        fontWeight: "500"
    },
    middleText2: {
        color: "#00000040",
        fontSize: 12,
        textAlign: "center"
    },
    boxImageContainer: {
        marginVertical: 50,
        marginHorizontal: 104,
    },
    boxImage: {
        width: 166.43,
        height: 132.93
    },
    codeContainer: {
        marginTop: 162.07,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "auto",
        height: 77
    },
    codeText1: {
        fontSize: 11,
        color: "#00000090",
        lineHeight: 15.2,
        letterSpacing: -0.18,
        marginHorizontal: 36,
        fontWeight: "500"
    },
    codeText2: {
        fontSize: 13,
        color: "#025492",
        lineHeight: 15.2,
        letterSpacing: -0.18,
        marginHorizontal: 36,
        fontWeight: "700"
    },
    shareButton: {
        width: 121,
        height: 31,
        backgroundColor: "#025492",
        marginRight: 10,
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center"
    },
    shareButtonText: {
        color: "#ffffff",
        fontSize: 9.82,
        fontWeight: "500"
    }
})