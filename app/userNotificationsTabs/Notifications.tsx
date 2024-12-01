import { Image, ScrollView, StyleSheet, Text, View, Dimensions, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react';
import { base_url } from '../../constants/server';
import { usePushNotifications } from '../usePushNotifications';
import axios, { AxiosError } from 'axios';
import LottieView from "lottie-react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';






const Notifications = () => {
    const { height } = Dimensions.get("window");
    const { notification } = usePushNotifications();
    const [notificationList, setNotificationList] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchNotifications = async () => {
            setIsLoading(true);
            try {
                const token = await AsyncStorage.getItem("token");
                const response = await axios.get(`${base_url}/user/notifications`, {
                    headers: {
                        Authorization: token
                    }
                })
                if (response.status === 200) {
                    setNotificationList(response.data.notifications);
                }
            } catch (error) {
                if (error instanceof AxiosError) {
                    console.log(error.response?.data)
                }
            } finally {
                setIsLoading(false);
            }
        }
        fetchNotifications();
    }, [notification])


    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={[notificationList.length > 0 ? { gap: 5 } : { gap: 5, justifyContent: "center", alignItems: "center", marginTop: height / 1 / 60 }]}>
                {
                    isLoading ? (
                        <View style={{ justifyContent: "center", alignItems: "center", marginTop: height / 1 / 60 }}>
                            <ActivityIndicator size="small" color="#025492" />
                        </View>
                    ) : (
                        notificationList.length > 0 ? (
                            notificationList.map((notification, index) => (
                                <View key={index} style={styles.notificationContainer}>
                                    <Image source={require('../../assets/images/play_store_512.png')} style={styles.notificationImage} resizeMode='cover' />
                                    <View style={{ flexShrink: 1, gap: 5 }}>
                                        <Text numberOfLines={1} style={styles.notificationTitle}>{notification.title}</Text>
                                        <Text numberOfLines={3} style={styles.notificationBody}>{notification.body}</Text>
                                    </View>
                                </View>
                            ))
                        ) : (
                            <View style={{ justifyContent: "center", alignItems: "center" }} >
                                <LottieView source={require('../../assets/images/Animation - 1722072178194.json')} loop={false} autoPlay style={{ width: 400, height: 400 }} />
                                <Text style={{ fontSize: 16, fontWeight: "500", color: "#00000080" }} >You have no notification</Text>
                            </View>
                        )
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