import { useState, useEffect, useRef } from 'react';
import * as Device from 'expo-device';
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { Alert, Platform  } from "react-native";
import { useRouter } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';


export interface pushNotificationState {
    notification?: Notifications.Notification;
    expoPushToken?: Notifications.ExpoPushToken;
};


export const usePushNotifications = () : pushNotificationState => { 
    Notifications.setNotificationHandler({
        handleNotification: async () => ({
            shouldPlaySound: true,
            shouldShowAlert: true,
            shouldSetBadge: true,
        }),
    });

    const [expoPushToken, setExpoPushToken] = useState<Notifications.ExpoPushToken | undefined>();
    const [notification, setNotification] = useState<Notifications.Notification | undefined>();
    const notificationListener = useRef<Notifications.Subscription>();
    const responseListener = useRef<Notifications.Subscription>();
    const router = useRouter();
    
    const registerForPushNotifications = async() => {
        let token;

        if (Device.isDevice) {
            const {status: existingStatus} = await Notifications.getPermissionsAsync();
            
            let finalStatus = existingStatus;

            if (existingStatus !== "granted") {
                const {status} = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }

            if (finalStatus !== "granted") {
                Alert.alert("Notification Failed", "failed to get push token")
            }

            token = await Notifications.getExpoPushTokenAsync({
                projectId: Constants.expoConfig?.extra?.eas?.projectId,
            });

            if (Platform.OS === "android") {
                Notifications.setNotificationChannelAsync("default", {
                    name: "default",
                    importance: Notifications.AndroidImportance.MAX,
                    vibrationPattern: [0, 250, 250, 0, 250, 250],
                    lightColor: "#025492",
                    bypassDnd: true,
                    lockscreenVisibility: Notifications.AndroidNotificationVisibility.PUBLIC,
                    sound: "default",
                    enableLights: true,
                    enableVibrate: true,
                });
            };

            return token
        } else { 
            console.log("Error: Please test on a physical phone")
        }
    };

    useEffect(() => {
        registerForPushNotifications().then((token) => {
            setExpoPushToken(token);
        });

        notificationListener.current = Notifications.addNotificationReceivedListener(async (notification) => {
            setNotification(notification);
            await storeNotification(notification)
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
            redirect(response.notification);
        });

        return () => {
            Notifications.removeNotificationSubscription(
                notificationListener.current!
            );

            Notifications.removeNotificationSubscription(
                responseListener.current!
            )
        }
    }, []);

    function redirect(notification: Notifications.Notification) {
        const url = notification.request.content.data?.url;
        if (url) {
          router.push(url);
        }
      }



    const storeNotification = async(notification: Notifications.Notification) => {
        try {
            await AsyncStorage.setItem(`@notification_${notification?.request.identifier}`, JSON.stringify(notification));
        } catch (error) {
            console.log('Error storing notification', error)
        }
    }

    return {
        expoPushToken,
        notification,
    }
}