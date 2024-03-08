import React from 'react'
import { View, Image, Dimensions, StyleSheet } from "react-native";

const firstLoadingScreen = () => {
    const { height: screenHeight } = Dimensions.get('window');
    return (
        <View style={{ flex: 1, backgroundColor: "#002F52" }} >
            <View style={[styles.container, { height: screenHeight }]} >
                <Image source={require('../../assets/images/villajalogo.png')} style={{ width: 144, height: 74 }} />
            </View>
            <Image source={require('../../assets/images/Rectangle5.png')} style={{width: 295.79, height: 450.22, position: "absolute", left: 184, bottom: 486}} />
            <Image source={require('../../assets/images/Rectangle6.png')} style={{width: 195.79, height: 802.29, position: "absolute", top: 106, right: 227}} />
            <Image source={require('../../assets/images/Rectangle7.png')} style={{width: 505.91, height: 646, position: "absolute", top: 525, left: -51}} />
        </View>
    )
}

export default firstLoadingScreen

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center"
    }
})