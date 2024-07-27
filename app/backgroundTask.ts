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

    await Notifications.scheduleNotificationAsync({
        content: {
            title: "Claim Your Promo Voucher Now",
            body: "Get ₦10,000 free on your first order, active for 12hrs",
            sound: true,
            priority: "max",
            vibrate: [250, 250],
            data: { url: '/vouchers/voucherDetails' }
        },
        trigger: {
            seconds: 20,
        },
    });
    await Notifications.scheduleNotificationAsync({
        content: {
            title: "Sell and Swap Your Used Devices in Less Time",
            body: "List your products now!!!",
            sound: true,
            priority: "max",
            vibrate: [250, 250],
        },
        trigger: {
            seconds: 600,
        },
    });

    await Notifications.scheduleNotificationAsync({
        content: {
            title: "Buy Your Device With Ease At Your Fingertips",
            body: "Get your phones, chargers and earphones and much more!!!",
            sound: true,
            priority: "max",
            vibrate: [250, 250],
        },
        trigger: {
            seconds: 1200,
        }
    });

    await Notifications.scheduleNotificationAsync({
        content: {
            title: "Always Get What you Ordered",
            body: "Safest Payment System Ever",
            sound: true,
            priority: "max",
            vibrate: [250, 250],
        },
        trigger: {
            seconds: 1800,
        }
    });

    await Notifications.scheduleNotificationAsync({
        content: {
            title: "Enjoy Best Prices",
            body: "Connect with gadget sellers and buy what you want",
            sound: true,
            priority: "max",
            vibrate: [250, 250],
        },
        trigger: {
            seconds: 2400,
        }
    });

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
