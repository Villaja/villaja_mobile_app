import React from 'react'
import { View, TextInput, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";


const { width } = Dimensions.get("window");

const postAd1 = () => {
    return (
        <View style={styles.pageContainer}>
            <View style={styles.textInputContainer}>
                <Text style={styles.text} >Location</Text>
                <View style={styles.textInput}>
                    <Ionicons name='location-outline' size={17} style={styles.icon} />
                    <TextInput style={{ width: 269, height: 45, fontSize: 12 }} placeholder='14b Soyiu, Ikorodu, Lagos, Nigeria' placeholderTextColor={"#03345450"} />
                </View>
            </View>
            <View style={styles.textInputContainer2}>
                <Text style={styles.text}>Phone Number</Text>
                <View style={styles.textInput2}>
                    <TextInput
                        style={{ left: 13, width: 302, height: 45, fontSize: 12 }}
                        placeholder='Phone Number'
                        keyboardType="phone-pad"
                    />
                </View>
            </View>
            <TouchableOpacity style={styles.button} >
                <Text style={styles.buttonText1}>Finish</Text>
            </TouchableOpacity>
        </View>
    )
}

export default postAd1

const styles = StyleSheet.create({
    pageContainer: {
        flex: 1,
        backgroundColor: '#ffffff',
        paddingHorizontal:20
    },
    text: {
        fontSize: 13,
        color: "#00000090",
        fontWeight: "500"
    },
    textInput: {
        flexDirection: "row",
        alignItems: "center",
        top: 10,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "#00000010",
        width: width - 40,
        height: 50
    },
    textInput2: {
        borderWidth: 1,
        width: width - 40,
        height: 50,
        top: 5,
        borderColor: "#0000001A",
        borderRadius: 5,
        backgroundColor: "#00000005"
    },
    textInputContainer: {
        top: 25,
        marginBottom: 28.29
    },
    textInputContainer2: {
        top: 25,
        marginBottom: 440.29
    },
    icon: {
        
        marginRight: 10,
        marginLeft: 11.77,
        color: "#03345450"
    },
    button: {
        height: 50,
        width: '100%',
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#025492",
        flexDirection: "row",
        position: 'absolute',
        bottom: 20,
        left: 20
    },
    buttonText1: {
        color: "#fff",
        fontSize: 15,
        fontFamily: "roboto-condensed-sb",
    },
})