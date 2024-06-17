/*import React, { useEffect, useState } from 'react'
import { View, TextInput, Text, Image, StyleSheet, TouchableOpacity, Dimensions, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';


import { useQuickSell } from "../../context/QuickSellContext";



const { width } = Dimensions.get("window");




    const handleSwapRequestSubmit = async () => {

        try {
            const sellPayloadJSON = quickSellPayload
            // const swapPayloadJSON = JSON.parse(swapPayload!)

            const finalQuickSellPayload = {
                ...sellPayloadJSON,
                condition: selectedValue7

            }


            const token = await AsyncStorage.getItem('token')
            // console.log('quick swap payload',quickSwapPayload);
            console.log(finalQuickSellPayload.userProductImages[0].slice(0, 30));


            const response = await axios.post(`${base_url}/quick-sell/create-product`,
                finalQuickSellPayload,
                {
                    headers: {
                        Authorization: token
                    },
                    withCredentials: true
                }
            )

            if (response.data.success) {
                return console.log('successfully uploaded quick sell request');
                return Alert.alert('Upload Success', 'Your product has been uploaded successfully, sit back and relax as you make your first sale in minutes');
            }

            return console.log('error creating quick sell request');

        }
        catch (e) {
            console.log('cannot process quick sell', e);
        }

    }

    useEffect(() => {
        if (quickSellPayload) {
          Alert.alert('Upload Success', 'Your product has been uploaded successfully, sit back and relax as you make your first sale in minutes');
        }
      }, [quickSellPayload]);

    return (
        <View style={styles.pageContainer}>
            <View style={styles.textInputContainer}>
                <Text style={styles.text}>Phone Number</Text>
                <View style={styles.textInput2}>
                    <TextInput
                        style={{ left: 13, width: 302, height: 45, fontSize: 12 }}
                        placeholder='Phone Number'
                        keyboardType="phone-pad"
                    />
                </View>
            </View>
            
            <TouchableOpacity style={styles.button} onPress={() => handleSwapRequestSubmit()} >
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
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 12,
        color: "#00000050"
    },
    container: {
        paddingVertical: 10,
        marginEnd: 16,
        width: width - 40
    },
    dropdown: {
        height: 60,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
        backgroundColor: "#00000009"
    },
    placeholderStyle: {
        fontSize: 12,
        color: "#00000070",
        marginVertical: 10,
        height: 20,
        top: 1.5
    },
    selectedTextStyle: {
        fontSize: 12,
        color: "#000000",
        paddingVertical: 5,
        height: 30,
        top: 1.5
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 12,
        color: "#00000090"
    },
    itemTextStyle: {
        color: "#00000070",
        fontSize: 12
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    icon2: {
        marginRight: 5,
        marginTop: 2,
        height: 20,
    },
}) */