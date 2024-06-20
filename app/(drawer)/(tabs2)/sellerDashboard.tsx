import { Dimensions, Image, ScrollView, StyleSheet, Text, View, TouchableOpacity, ImageSourcePropType, ActivityIndicator } from 'react-native'
import * as React from 'react';
import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import Colors from '../../../constants/Colors';
import { AntDesign, EvilIcons, Feather, Ionicons } from '@expo/vector-icons';
import { BarChart } from "react-native-chart-kit";
import { useNavigation } from '@react-navigation/native';
import Analytics from '../../SellerDashboardComponents/Analytics';
import Transactions from '../../SellerDashboardComponents/Transactions';
// import { useAuth } from '../../../context/SellerAuthContext'
import { Stack, router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { base_url } from '../../../constants/server';
import LottieView from "lottie-react-native";


const { width } = Dimensions.get('window')

const chartConfig = {
    backgroundColor: '#fff',
    backgroundGradientFrom: '#fff',
    backgroundGradientTo: '#fff',
    color: (opacity = 1) => `${Colors.primary}`,
    style: {
        borderRadius: 16,
    }
};

const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
        {
            data: [20, 45, 28, 80, 99, 43]
        }
    ]
};


const SellerDashboard = () => {
    const [seller, setSeller] = useState<any>([]);
    const [activeTab, setActiveTab] = useState<string>("overview");


    useEffect(() => {
        const checkToken = async () => {
            const token = await AsyncStorage.getItem('sellerToken');
            const seller = await AsyncStorage.getItem('seller');

            if (!token) return router.replace('/sellerAuthScreens/SellerLogin');
            setSeller(JSON.parse(seller!).seller);
        }

        checkToken();
    }, [])




    return (
        <View style={styles.container}>
            <Stack.Screen
                options={{
                    headerLeft: () => (
                        <View style={styles.headerDashboardLeft}>

                            <Image source={{ uri: seller?.avatar?.url }} resizeMode='contain' style={styles.sellerProfilePic} />
                            <Text style={{ color: "#fff", fontSize: 10, marginBottom: 5 }}>{seller?.name}</Text>
                        </View>
                    ),
                }}
            />

            <View style={styles.tabs}>
                <TouchableOpacity style={activeTab === "overview" ? styles.activeTab : styles.tab} onPress={() => setActiveTab('overview')}>
                    <Text style={activeTab === "overview" ? styles.activeText : styles.tabText} >Overview</Text>
                </TouchableOpacity>
                <TouchableOpacity style={activeTab === "withdraw" ? styles.activeTab : styles.tab} onPress={() => setActiveTab('withdraw')}>
                    <Text style={activeTab === "withdraw" ? styles.activeText : styles.tabText}>Withdraw</Text>
                </TouchableOpacity>
                <TouchableOpacity style={activeTab === "analytics" ? styles.activeTab : styles.tab} onPress={() => setActiveTab('analytics')}>
                    <Text style={activeTab === "analytics" ? styles.activeText : styles.tabText}>Analytics</Text>
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                <View>
                    {activeTab === "overview" && <Overview />}
                    {activeTab === "withdraw" && <Transactions />}
                    {activeTab === "analytics" && <Analytics />}
                </View>
            </ScrollView>
        </View>
    )
}

const Overview = () => {
    const navigation = useNavigation();
    const [multiLine, setMultiLine] = useState(1);
    const [seller, setSeller] = useState<any>([]);
    const [token, setToken] = useState<string>();
    const [loading, setLoading] = useState<boolean>(true);
    const [swapOrders, setSwapOrders] = useState<any>([]);
    const [allOrders, setAllOrders] = useState<any>([]);



    const handleGetOrders = async () => {
        try {

            const response = await axios.get(`${base_url}/order/get-seller-all-orders/${seller._id}`);
            if (response.data.success) {
                setAllOrders(response.data.orders);

            } else {
                console.error('Failed to fetch orders');
            }

        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            setLoading(false);
        }
    }

    const handleGetSwapRequests = async () => {
        try {
            const response = await axios.get(`${base_url}/quick-swap/get-unsold-products`);
            if (response.data.success) {
                setSwapOrders(response.data.unsoldQuickSwapProducts);

            } else {
                console.error('Failed to fetch unsold quick swap orders');
            }
        }
        catch (error) {
            console.error('Error fetching quickswap orders:', error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const checkToken = async () => {
            const token = await AsyncStorage.getItem('sellerToken')
            const seller = await AsyncStorage.getItem('seller')

            if (!token) return router.replace('/sellerAuthScreens/SellerLogin')
            setSeller(JSON.parse(seller!).seller)
            setToken(token)
        }

        checkToken()
    }, [])

    useEffect(() => {
        handleGetOrders();
        handleGetSwapRequests();
    }, [seller])

    const totalSales = seller?.availableBalance?.toFixed(2) || "0.00"


    return (
        <View>
            <View style={styles.swapHeader}>
                <Text style={styles.headerText}>Swap Now</Text>
                <TouchableOpacity onPress={() => router.push('/(drawer)/(swapDeals)/SwapDeals')}>
                    <Text style={styles.headerBtn}>View Swaps</Text>
                </TouchableOpacity>
            </View>
            {
                loading ? <ActivityIndicator size="small" color={Colors.primary} style={{ marginVertical: 36 }} /> : swapOrders.length > 0 ?
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={
                        {
                            alignItems: 'center',
                            gap: 5,
                            paddingHorizontal: 20,
                            paddingVertical: 10

                        }} >
                        {
                            swapOrders.map((item: any, index: number) => (
                                <View style={styles.swapContainer} key={index}>
                                    <Image source={{ uri: item.userProductImages[0].url }} resizeMode='contain' style={styles.swapImage} />
                                    <View style={styles.infoContainer}>

                                        <View style={styles.info}>
                                            <Image source={require('../../../assets/images/user1.png')} resizeMode='cover' style={styles.userImage} />
                                            <View style={styles.infoContact}>
                                                <Text numberOfLines={1} style={styles.name}>{item.userProductName}</Text>
                                                <View style={styles.dateContainer}>
                                                    <EvilIcons name='clock' size={14} color="rgba(0,0,0,0.4)" />
                                                    <Text style={styles.date}> {(new Date(item.createdAt)).toLocaleDateString()}</Text>
                                                </View>
                                            </View>
                                        </View>
                                        <TouchableOpacity style={styles.swapBtn} onPress={() => router.push(`/(swapDeals)/${item._id}`)}>
                                            <Text style={styles.swapText}>Swap Now</Text>
                                            <AntDesign name='arrowright' size={15} color={Colors.primary} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            ))

                        }
                    </ScrollView>
                    :
                    <View style={{ height: 200, padding: 20, gap: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <LottieView source={require('../../../assets/images/not-available.json')} autoPlay loop={true} style={{ width: 50, height: 50 }} />
                        <Text style={{ fontFamily: 'roboto-condensed', fontSize: 15 }}>No Swap Requests</Text>
                    </View>

            }


            <View style={styles.pendingOrders}>
                <View style={styles.swapHeader}>
                    <View style={styles.warning}>
                        <Ionicons name='warning' color={"#ff9818"} size={20} />
                        <Text style={styles.headerText}>Pending Orders</Text>
                    </View>
                    <TouchableOpacity>
                        <Text style={styles.headerBtn}>View Orders</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.orderSection}>
                    {
                       loading ? <ActivityIndicator size="small" color={Colors.primary} style={{ marginVertical: 36 }} /> : allOrders.length > 1 ?
                            allOrders
                                .filter((od: any) => od.status != "Delivered")
                                .slice(0, 4)
                                // .filter((od:any) => od.status === "Delivered" )
                                .map((order: any, index: number) => (
                                    <TouchableOpacity style={styles.orderCard} key={index}>
                                        <View style={styles.orderCardLeft}>
                                            <Image source={{ uri: order.cart[0].images[0].url }} resizeMode='contain' style={styles.orderImg} />
                                            <View style={styles.orderInfo}>

                                                <Text numberOfLines={multiLine} style={styles.orderName}>{order.cart[0].name}</Text>
                                                <Text style={styles.orderUser}>By: {order.user.firstname}</Text>
                                            </View>
                                        </View>
                                        <Text style={styles.orderPrice}>₦{order.totalPrice.toLocaleString()}</Text>
                                    </TouchableOpacity>
                                ))

                            :

                            <View style={{ height: 200, padding: 20, gap: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                <LottieView source={require('../../../assets/images/not-available.json')} autoPlay loop={true} style={{ width: 50, height: 50 }} />
                                <Text style={{ fontFamily: 'roboto-condensed', fontSize: 15 }}>No Swap Requests</Text>
                            </View>
                    }
                </View>


            </View>

            <View style={styles.salesSection}>
                <TouchableOpacity style={styles.salesContainer}>
                    <View style={styles.salesTop}>
                        <View style={styles.salesHeader}>
                            <Text style={styles.totalSales}>Total Sales</Text>
                            <AntDesign name='arrowright' size={15} color={Colors.grey} />
                        </View>
                        <View style={styles.salesMain}>
                            <Text style={styles.totalSalesPrice}>₦{totalSales.toLocaleString()}</Text>
                            <View style={styles.salesDate}>
                                <Text style={styles.totalSalesDate}>12-Sep-22 To Date</Text>
                                <Feather name='calendar' size={11} color={'rgba(0,0,0,0.6)'} />
                            </View>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                            <EvilIcons name='clock' size={12} color={Colors.grey} />
                            <Text style={styles.month}>last month</Text>
                        </View>
                        <View>

                        </View>
                    </View>

                </TouchableOpacity>

                <View style={styles.salesChart}>

                    <BarChart
                        style={chartConfig.style}
                        data={data}
                        width={0.8 * width}
                        height={300}
                        yAxisLabel="₦ "
                        yAxisSuffix=''
                        chartConfig={chartConfig}
                        verticalLabelRotation={90}
                        fromZero={true}
                        withInnerLines={false}
                    />
                </View>
            </View>
        </View>
    )
}




const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    headerDashboardLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginLeft: 20,
        marginBottom: -8
    },
    sellerProfilePic: {
        width: 37,
        height: 37,
        borderRadius: 37,
        marginBottom: 5
    },
    tabs: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    activeTab: {
        borderBottomColor: "#000000",
        borderBottomWidth: 2,
        paddingVertical: 4.5
    },
    tab: {
        paddingVertical: 10
    },
    activeText: {
        color: "#000",
        fontSize: 15,
        fontFamily: 'roboto-condensed-sb'
    },
    tabText: {
        color: Colors.grey,
        fontSize: 15,
        fontFamily: 'roboto-condensed'
    },
    swapHeader: {
        marginBottom: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20
    },
    headerText: {
        fontSize: 15,
        fontFamily: 'roboto-condensed',
        color: '#00000070',
        lineHeight: 15,
        letterSpacing: -0.18
    },
    headerBtn: {
        color: Colors.primary,
        fontFamily: 'roboto-condensed',
        fontSize: 12,
        lineHeight: 15,
        letterSpacing: -0.18
    },
    swapContainer: {
        width: 0.75 * width,
        backgroundColor: '#fff',
        borderRadius: 5,
        shadowColor: "rgba(0,0,0,0.5)",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
        overflow: 'hidden',


    },
    swapImage: {
        width: '100%',
        height: 145
    },
    infoContainer: {
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    userImage: {
        width: 29,
        height: 29,
        borderRadius: 29
    },
    info: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center'
    },
    infoContact: {
        gap: 2
    },

    name: {
        fontFamily: 'roboto-condensed-sb',
        fontSize: 12,
        lineHeight: 15,
        letterSpacing: -0.18,
        maxWidth: 150
    },
    dateContainer: {
        flexDirection: 'row',
        alignItems: 'center',

    },
    date: {
        fontFamily: 'roboto-condensed',
        color: 'rgba(0,0,0,0.4)',
        fontSize: 10,
        lineHeight: 15,
        letterSpacing: -0.18
    },
    swapBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5
    },
    swapText: {
        fontFamily: 'roboto-condensed',
        color: Colors.primary,
        fontSize: 14
    },
    pendingOrders: {
        borderTopColor: 'rgba(0,0,0,0.05)',
        borderTopWidth: 1,
        paddingVertical: 10
    },
    warning: {
        gap: 5,
        flexDirection: 'row',
        alignItems: 'center'
    },
    orderSection: {
        padding: 20,
        gap: 10
    },
    orderCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    orderCardLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flexShrink: 1
    },
    orderInfo: {
        justifyContent: 'space-between',
        gap: 7,
        flexShrink: 1,
        maxWidth: 190,
    },
    orderName: {
        fontSize: 14,
        fontFamily: 'roboto-condensed-sb',
        lineHeight: 15,
        letterSpacing: -0.18,

    },
    orderPrice: {
        fontSize: 15,
        fontFamily: 'roboto-condensed',
        lineHeight: 15,
        letterSpacing: -0.18,
        fontWeight: "600"
    },
    orderUser: {
        fontSize: 12,
        fontFamily: 'roboto-condensed',
        color: Colors.grey,
        lineHeight: 15,
        letterSpacing: -0.18
    },
    orderImg: {
        width: 50,
        height: 42,
        marginRight: 10
    },
    salesSection: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: Colors.primaryUltraTransparent
    },
    salesContainer: {
        padding: 25,
        backgroundColor: '#fff',
        // borderRadius:8,
        borderStartStartRadius: 8,
        borderStartEndRadius: 8,
        shadowColor: "rgba(0,0,0,0.4)",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    salesTop: {
        gap: 3
    },
    salesHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    salesMain: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    salesDate: {
        borderWidth: 0.79,
        borderColor: '#ece9f1',
        borderRadius: 4,
        gap: 6,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8
    },
    salesChart: {
        marginTop: 5,
        padding: 20,
        backgroundColor: '#fff',
        borderEndStartRadius: 8,
        borderEndEndRadius: 8,
        shadowColor: "rgba(0,0,0,0.4)",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    totalSales: {
        color: '#828282',
        fontSize: 12.47,
        fontFamily: 'roboto-condensed-m'
    },
    totalSalesPrice: {
        color: Colors.primary,
        fontSize: 31.16,
        fontFamily: 'roboto-condensed-m'
    },
    totalSalesDate: {
        fontSize: 9,
        color: 'rgba(0,0,0,0.6)',
        fontFamily: 'roboto-condensed'


    },
    month: {
        fontSize: 11,
        color: 'rgba(0,0,0,0.3)',
        fontFamily: 'roboto-condensed'

    },
    graphStyle: {

    }
})
export default SellerDashboard