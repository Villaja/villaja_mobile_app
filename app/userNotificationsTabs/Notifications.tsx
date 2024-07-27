import { Image, ScrollView, StyleSheet, Text, View, Dimensions } from 'react-native'
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notification from "expo-notifications";
import LottieView from "lottie-react-native";


const mockNotifications = [
    {
        id: 1,
        title: `The IPhone 15 pro max your GGBBCY tech is now available to buy`,
        image: "https://www.apple.com/newsroom/images/2023/09/apple-unveils-iphone-15-pro-and-iphone-15-pro-max/article/Apple-iPhone-15-Pro-lineup-hero-230912_Full-Bleed-Image.jpg.large.jpg",
        date: "1:25 PM"
    },
    {
        id: 2,
        title: 'The IPhone 15 pro max your GGBBCY tech is now available to buy',
        image: "https://www.apple.com/newsroom/images/2023/09/apple-unveils-iphone-15-pro-and-iphone-15-pro-max/article/Apple-iPhone-15-Pro-lineup-hero-230912_Full-Bleed-Image.jpg.large.jpg",
        date: "1:25 PM"
    },
    {
        id: 3,
        title: 'The IPhone 15 pro max your GGBBCY tech is now available to buy',
        image: "https://www.apple.com/newsroom/images/2023/09/apple-unveils-iphone-15-pro-and-iphone-15-pro-max/article/Apple-iPhone-15-Pro-lineup-hero-230912_Full-Bleed-Image.jpg.large.jpg",
        date: "1:25 PM"
    },
    {
        id: 4,
        title: 'The IPhone 15 pro max your GGBBCY tech is now available to buy',
        image: "https://www.apple.com/newsroom/images/2023/09/apple-unveils-iphone-15-pro-and-iphone-15-pro-max/article/Apple-iPhone-15-Pro-lineup-hero-230912_Full-Bleed-Image.jpg.large.jpg",
        date: "1:25 PM"
    },
    {
        id: 5,
        title: 'The IPhone 15 pro max your GGBBCY tech is now available to buy',
        image: "https://www.apple.com/newsroom/images/2023/09/apple-unveils-iphone-15-pro-and-iphone-15-pro-max/article/Apple-iPhone-15-Pro-lineup-hero-230912_Full-Bleed-Image.jpg.large.jpg",
        date: "1:25 PM"
    },
];


const Notifications = () => {
    const [notificationList, setNotificationList] = useState<Notification.Notification[]>([]);
    const { height } = Dimensions.get("window")


    useEffect(() => {
        const getStoredNotifications = async () => {
            try {
                const keys = await AsyncStorage.getAllKeys();
                const notificationKeys = keys.filter(key => key.startsWith('@notification_'));
                const notifications = await AsyncStorage.multiGet(notificationKeys);
                const parsedNotifications = notifications.map(([key, value]) => (value ? JSON.parse(value) : null));
                setNotificationList(parsedNotifications)
            } catch (error) {
                console.log("Error fetching notifications: ", error);
            }
        }

        getStoredNotifications();
    }, [])


    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={[notificationList.length > 0 ? { gap: 5 } : { gap: 5, justifyContent: "center", alignItems: "center", marginTop: height / 1 / 60 }]}>
                {
                    notificationList.length > 0 ? (
                        notificationList.slice().reverse().map((notification, index) => (
                            <View key={index} style={styles.notificationContainer}>
                                <Image source={require('../../assets/images/play_store_512.png')} style={styles.notificationImage} resizeMode='cover' />
                                <View style={{ flexShrink: 1, gap: 5 }}>
                                    <Text numberOfLines={1} style={styles.notificationTitle}>{notification.request.content.title}</Text>
                                    <Text numberOfLines={1} style={styles.notificationBody}>{notification.request.content.body}</Text>
                                </View>
                            </View>
                        ))
                    ) : (
                        <View style={{ justifyContent: "center", alignItems: "center" }} >
                            <LottieView source={require('../../assets/images/Animation - 1722072178194.json')} loop={false} autoPlay style={{ width: 400, height: 400 }} />
                            <Text style={{ fontSize: 16, fontWeight: "500", color: "#00000080" }} >You have no notification</Text>
                        </View>
                    )
                }
            </ScrollView>
        </View>
    )
}

export default Notifications

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FAFBFD',

    },
    notificationContainer: {
        paddingHorizontal: 20,
        paddingVertical: 12,
        flexDirection: 'row',
        gap: 10,
        backgroundColor: '#fff',
        alignItems: 'center'
    },
    notificationImage: {
        width: 49,
        height: 49,
        borderRadius: 49
    },
    notificationTitle: {
        fontSize: 13,
        color: 'rgba(0,0,0,0.50)',
        fontFamily: 'roboto-condensed',
        lineHeight: 15.2,
        letterSpacing: -0.18,
        fontWeight: "700"
    },
    notificationBody: {
        fontSize: 13,
        color: 'rgba(0,0,0,0.50)',
        fontFamily: 'roboto-condensed',
        lineHeight: 15.2,
        letterSpacing: -0.18,
    },
    notificationDate: {
        fontSize: 10,
        color: 'rgba(0,0,0,0.50)',
        fontFamily: 'roboto-condensed'

    }
})