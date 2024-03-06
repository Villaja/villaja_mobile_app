import React from 'react'
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView, StyleSheet, } from "react-native";
import { useRouter } from "expo-router";
import { defaultStyles } from '../../constants/Styles';

const QuickSell = () => {
  const router = useRouter()
  return (
    <View style={styles.container}>
      <Image source={require("../../assets/images/quick.png")} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.text1} >You Have Not Yet Uploaded A Product</Text>
        <Text style={styles.text2} >Quick swap and sell is typical for selling or swapping used gadgets or accessories. You need to upload a product for it to be listed to sell on this page. To do so, select the button at the bottom of the page to get started.</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => router.push(`/quickSellAndSwap/uploadScreen`)}>
        <Text style={styles.buttonText1}>Upload Product </Text>
        <Text style={styles.buttonText2}>  +</Text>
      </TouchableOpacity>
    </View>
  )
}

export default QuickSell

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center"
  },
  image: {
    width: 139.37,
    height: 131,
    marginBottom: 30
  },
  textContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 340
  },
  text1: {
    fontSize: 15,
    color: "#00000070",
    fontWeight: "700",
    marginBottom: 4
  },
  text2: {
    fontSize: 12,
    color: "#00000040",
    textAlign: "center",
    marginBottom: 30
  },
  button: {
    height: 50,
    width: 330,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#025492",
    flexDirection: "row"
  },
  buttonText1: {
    color: "#fff",
    fontSize: 15,
    fontFamily: "roboto-condensed-sb",
  },
  buttonText2: {
    color: "#fff",
    fontSize: 25,
    fontWeight: "300"
  }
})