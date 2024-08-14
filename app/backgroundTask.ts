import React from "react";
import * as Notifications from "expo-notifications";
import * as TaskManager from "expo-task-manager";
import * as BackgroundFetch from 'expo-background-fetch';



const NOTIFICATION_TASK = 'notification-task';

TaskManager.defineTask(NOTIFICATION_TASK, async ({ data, error }) => {
    if (error) {
        console.error('Error creating background notification task', error)
        return;
    };

    const notifications = [
        {
            title: "Claim Your Promo Voucher Now",
            body: "Get ₦10,000 free on your first order, active for 12hrs"
        },
        {
            title: "Sell and Swap Your Used Devices in Less Time",
            body: "List your products now!!!",
        },
        {
            title: "Buy Your Device With Ease At Your Fingertips",
            body: "Get your phones, chargers and earphones and much more!!!",
        },
        {
            title: "Always Get What you Ordered",
            body: "Safest Payment System Ever",
        },
        {
            title: "Enjoy Best Prices",
            body: "Connect with gadget sellers and buy what you want",
        }
    ];

    const notification = notifications[Math.floor(Math.random() * notifications.length)];
    await Notifications.scheduleNotificationAsync({
        content: {
            title: notification.title,
            body: notification.body,
            sound: true,
            priority: "max",
            vibrate: [250,250],
        },
        trigger: {
            seconds: 10
        }
    })

    return BackgroundFetch.BackgroundFetchResult.NewData
});


export const registerBackgroundTask = async () => {
    try {
        await BackgroundFetch.registerTaskAsync(NOTIFICATION_TASK, {
            minimumInterval: 10800, // 3 hours interval in seconds
            stopOnTerminate: false,
            startOnBoot: true,
        });
        console.log("background task registered")
    } catch (error) {
        console.error('Failed to register background task', error)
    }
};
