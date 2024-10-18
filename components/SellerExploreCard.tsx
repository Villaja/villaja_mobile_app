import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { timeAgo } from '../utils/timeAgo';
import { AntDesign, FontAwesome, Ionicons, MaterialCommunityIcons, MaterialIcons, FontAwesome6 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const SellerExploreCard = ({ merchant }: { merchant: any }) => {
    const router = useRouter();
    console.log(merchant);

    const testUser = {
        id: 1,
        name: "Tony Danza",
        image: require("../assets/images/user2.png")
    };

    const avatar = merchant?.avatar?.url ? { uri: merchant.avatar?.url } : testUser.image

    return (
        <TouchableOpacity onPress={() => router.push(`/accountScreen/${merchant._id}`)} style={styles.container}>
            <Image source={require('../assets/images/shop-explore.png')} style={styles.image} />
            <View style={styles.profilePictureContainer}>
                <Image source={avatar} style={styles.profilePicture} />
                <Text numberOfLines={1} style={styles.name}>{merchant.name}</Text>
                <Text style={styles.time}>{timeAgo(merchant.createdAt)} on Villaja</Text>
                <View style={styles.tagContainer} >
                    <Text style={styles.tag}>Phones</Text>
                    <Text style={styles.tag}>Laptops</Text>
                    <Text style={styles.tag}>Accessories</Text>
                </View>
                <View style={styles.locationContainer} >
                    <FontAwesome6 name="location-dot" size={10} color="rgba(0,0,0,0.30)" />
                    <Text numberOfLines={1} style={styles.location} >{merchant.address}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default SellerExploreCard;

const styles = StyleSheet.create({
    container: {
        width: 163,
        height: 203,
        borderRadius: 5,
        marginBottom: 10,
        backgroundColor: "#00000005",
        position: "relative"
    },
    image: {
        width: "100%",
        height: 63,
    },
    profilePicture: {
        width: 58,
        height: 58,
        borderWidth: 1.5,
        borderColor: "#025492",
        borderRadius: 50,
    },
    profilePictureContainer: {
        position: "absolute",
        top: 32,
        left: 0,
        width: "100%",
        paddingHorizontal: 12,
    },
    name: {
        fontSize: 13,
        fontWeight: "500",
        color: "#000000",
        fontFamily: "roboto-condensed-sb",
        marginTop: 10,
        maxWidth: "100%"
    },
    time: {
        flexDirection: 'row',
        alignItems: 'center',
        fontFamily: 'roboto-condensed',
        fontSize: 11,
        color: 'rgba(0,0,0,0.50)',
        marginBottom: 8
    },
    tagContainer: {
        flexDirection: 'row',
        gap: 4
    },
    tag: {
        padding: 3,
        borderRadius: 2,
        backgroundColor: "#02549205",
        fontFamily: 'roboto-condensed',
        fontSize: 11,
        color: "#025492",
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 2,
        marginTop: 8
    },
    location: {
        fontFamily: 'roboto-condensed',
        fontSize: 11,
        color: "rgba(0,0,0,0.50)",
    }
})
