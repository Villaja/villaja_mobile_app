import React from 'react'
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView, StyleSheet, Switch } from "react-native";
import { Svg, Path } from "react-native-svg";
import { defaultStyles } from "../../constants/Styles";
import { useRouter } from "expo-router";
import { Link } from "expo-router";


function account() {
    const testUser = {
        id: 1,
        name: "Tony Danza",
        image: "https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg"
    }
    return (
        <ScrollView style={styles.pageContainer}>
            <View style={styles.imageContainer}>
                <Image source={{ uri: testUser.image }} resizeMode='contain' style={{ width: 50, top: 1, height: 50, borderRadius: 40 }} />
                <Image source={require("../../assets/images/Group 342.png")} style={styles.image2} />
            </View>

        </ScrollView>
    )
}

export default account

const styles = StyleSheet.create({
    pageContainer: {
        flex: 1,
        backgroundColor: "#ffffff"
    }
})