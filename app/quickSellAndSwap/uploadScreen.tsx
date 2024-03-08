import React from 'react'
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView, StyleSheet, } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";


const uploadScreen = () => {
  const router = useRouter()
  return (
    <View style={styles.container} >
      <TouchableOpacity style={styles.quickSell} onPress={() => router.push(`/quickSellAndSwap/quickSell`)} >
        <View style={styles.textContainer}>
          <Text style={styles.text1}>Quick Sell</Text>
          <Text style={styles.text2}>Upload Your Product For Quick Sell Without Becoming A Merchant on Villaja</Text>
        </View>
        <Ionicons name='chevron-forward-outline' size={24} style={{ marginRight: 20 }} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.quickSell} >
        <View style={styles.textContainer}>
          <Text style={styles.text1}>Quick Swap</Text>
          <Text style={styles.text2}>Swap Your Products With Other Merchant On Villaja and Negotiate To Get What You Want</Text>
        </View>
        <Ionicons name='chevron-forward-outline' size={24} style={{ marginRight: 20 }} />
      </TouchableOpacity>
      <View>
        <Image source={require('../../assets/images/merchant.png')} style={{ height: 129, width: 320, left: 20 }} />
        <View style={styles.imageText} >
          <Text style={styles.textOne}> BECOME A</Text>
          <Text style={styles.textTwo}>Merchant For Villaja</Text>
          <TouchableOpacity style={styles.getStarted} >
            <Text style={styles.gtText} >Get Started</Text>  
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default uploadScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff"
  },
  quickSell: {
    backgroundColor: "#00000015",
    height: 100,
    width: 320,
    left: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    borderRadius: 10,
    marginBottom: 20
  },
  textContainer: {
    marginHorizontal: 20
  },
  text1: {
    fontSize: 15,
    color: "#000000",
    fontWeight: "700",
    marginBottom: 8
  },
  text2: {
    fontSize: 10,
    color: "#00000060"
  },
  imageText: {
    color: '#FFFFFF99',
    height: 87,
    // width: 307,
    top: 20,
    left: 37,
    position: 'absolute'
},
textOne: {
    color: "#FFFFFF99",
    fontSize: 10,
    fontWeight: '500',
    lineHeight: 11.72,
    fontFamily: 'Roboto'
},
textTwo: {
    fontSize: 20,
    color: "#FFFFFF",
    fontWeight: '700',
    lineHeight: 29.3,
    fontFamily: "Roboto"
},
getStarted: {
    borderWidth: 1,
    borderColor: '#ffffff',
    width: 91,
    height: 34,
    top: 10,
    alignItems: 'center',
    justifyContent: 'center'
},
gtText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
    fontFamily: 'Roboto',
    lineHeight: 14.06
},
})