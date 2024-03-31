import React from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const { width } = Dimensions.get('window');

const uploadScreen = () => {
  const router = useRouter()
  
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.quickSell} onPress={() => router.push(`/quickSellAndSwap/quickSell`)}>
        <View style={styles.textContainer}>
          <Text style={styles.text1}>Quick Sell</Text>
          <Text style={styles.text2}>Upload Your Product For Quick Sell Without Becoming A Merchant on Villaja</Text>
        </View>
        <Ionicons name='chevron-forward-outline' size={20} style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.quickSell} onPress={() => router.push(`/quickSellAndSwap/quickSwap`)}>
        <View style={styles.textContainer}>
          <Text style={styles.text1}>Quick Swap</Text>
          <Text style={styles.text2}>Swap Your Products With Other Merchant On Villaja and Negotiate To Get What You Want</Text>
        </View>
        <Ionicons name='chevron-forward-outline' size={20} style={styles.icon} />
      </TouchableOpacity>
      <View style={styles.imageContainer}>
        <Image source={require('../../assets/images/merchant.png')} style={styles.image} />
        <View style={styles.imageText}>
          <Text style={styles.textOne}>BECOME A VERIFIED</Text>
          <Text style={styles.textTwo}>Merchant On Villaja</Text>
          <TouchableOpacity style={styles.getStarted}>
            <Text style={styles.gtText}>Get Started</Text>
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
    backgroundColor: "#ffffff",
    paddingHorizontal: 20,
  },
  quickSell: {
    backgroundColor: "#00000015",
    height: 100,
    width: width - 40, 
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 10,
    marginBottom: 20
  },
  textContainer: {
    marginLeft: 20,
    flexShrink:1

  },
  text1: {
    fontSize: 13,
    color: "#000000",
    fontWeight: "700",
    marginBottom: 8,
    fontFamily: "roboto-condensed-sb",

  },
  text2: {
    fontSize: 10,
    color: "#00000060",
    fontFamily: "roboto-condensed",

  },
  icon: {
    marginRight: 20,
  },
  imageContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  image: {
    height: 129,
    width: width - 40,
    
  },
  imageText: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  textOne: {
    color: "#FFFFFF99",
    fontSize: 10,
    fontWeight: '500',
    lineHeight: 11.72,
    fontFamily: 'roboto-condensed'
  },
  textTwo: {
    fontSize: 18,
    color: "#FFFFFF",
    fontWeight: '700',
    lineHeight: 29.3,
    fontFamily: "roboto-condensed",
    marginBottom: 10
  },
  getStarted: {
    borderWidth: 1,
    borderColor: '#ffffff',
    width: 91,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center'
  },
  gtText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
    fontFamily: 'roboto-condensed',
    lineHeight: 14.06
  },
})
