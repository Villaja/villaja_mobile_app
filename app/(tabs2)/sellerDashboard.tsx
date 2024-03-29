import { Dimensions, Image, ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import Colors from '../../constants/Colors'
import { AntDesign, EvilIcons, Feather, Ionicons } from '@expo/vector-icons'
import {
  BarChart,
} from "react-native-chart-kit";
import { useNavigation } from '@react-navigation/native'; 
const {width} = Dimensions.get('window')

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


const swapRequests = [
    {
        id:1,
        name:"Angus McGyver",
        image:"https://image.cnbcfm.com/api/v1/image/106452529-1584646955287macbook-air-2020-10.png?v=1584647237&w=929&h=523&vtcrop=y",
        date: Date.now(),
        avatar:require('../../assets/images/user1.png')
    },
    {
        id:2,
        name:"Angus McGyver",
        image:"https://fdn.gsmarena.com/imgroot/news/23/09/iphone-15-dummies-colors-video/inline/-1200/gsmarena_001.jpg",
        date: Date.now(),
        avatar:require('../../assets/images/user1.png')
    },
    {
        id:3,
        name:"Angus McGyver",
        image:"https://www.digitaltrends.com/wp-content/uploads/2020/12/macbook-air-m1.jpg?resize=625%2C417&p=1",
        date: Date.now(),
        avatar:require('../../assets/images/user1.png')
    }
]

// const swapRequests = []
// const pendingOrders = []

const pendingOrders = [
    {
        id:1,
        image:'https://th.bing.com/th/id/OIP.D1x6HuaGwHrCegoqEvR_8gHaHa?w=530&h=530&rs=1&pid=ImgDetMain',
        name:'IPhone 14 Pro Max',
        price:200000,
        user:'Lynn Tanner'
    },
    {
        id:2,
        image:'https://th.bing.com/th/id/OIP.D1x6HuaGwHrCegoqEvR_8gHaHa?w=530&h=530&rs=1&pid=ImgDetMain',
        name:'IPhone 14 Pro Max',
        price:200000,
        user:'Lynn Tanner'
    },
    {
        id:3,
        image:'https://th.bing.com/th/id/OIP.D1x6HuaGwHrCegoqEvR_8gHaHa?w=530&h=530&rs=1&pid=ImgDetMain',
        name:'IPhone 14 Pro Max',
        price:200000,
        user:'Lynn Tanner'
    },
    {
        id:4,
        image:'https://th.bing.com/th/id/OIP.D1x6HuaGwHrCegoqEvR_8gHaHa?w=530&h=530&rs=1&pid=ImgDetMain',
        name:'IPhone 14 Pro Max',
        price:200000,
        user:'Lynn Tanner'
    },
]

const SellerDashboard = () => {

    const [activeTab,setActiveTab] = useState<string>("overview")
    

  return (
    <View style={styles.container}>

        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.tabs}>
                <TouchableOpacity style={activeTab === "overview"?styles.activeTab:styles.tab} onPress={()=> setActiveTab('overview')}>
                    <Text style={activeTab === "overview"?styles.activeText:styles.tabText} >Overview</Text>
                </TouchableOpacity>
                <TouchableOpacity style={activeTab === "transactions"?styles.activeTab:styles.tab} onPress={()=> setActiveTab('transactions')}>
                    <Text style={activeTab === "transactions"?styles.activeText:styles.tabText}>Transactions</Text>
                </TouchableOpacity>
                <TouchableOpacity style={activeTab === "analytics"?styles.activeTab:styles.tab} onPress={()=> setActiveTab('analytics')}>
                    <Text style={activeTab === "analytics"?styles.activeText:styles.tabText}>Analytics</Text>
                </TouchableOpacity>
            </View>


            <View>
                {activeTab === "overview" && <Overview/>}
                {activeTab === "transactions" && <Transactions/>}
                {activeTab === "analytics" && <Analytics/>}
            </View>
        </ScrollView>
    </View>
  )
}

const Overview = () => {
    const navigation = useNavigation(); 
    
    return (
        <View>
            <View style={styles.swapHeader}>
                <Text style={styles.headerText}>Swap Now</Text>
                <TouchableOpacity>
                    <Text style={styles.headerBtn}>View Swaps</Text>
                </TouchableOpacity>
            </View>
            {
                swapRequests.length > 1?
            <ScrollView horizontal showsHorizontalScrollIndicator={false}  contentContainerStyle={
          {
            alignItems: 'center',
            gap: 5,
            paddingHorizontal: 20,
            paddingVertical:10

          }} >
                {
                    
                    swapRequests.map((item,index) => (
                        <View style={styles.swapContainer} key={index}>
                            <Image source={{uri:item.image}} resizeMode='cover' style={styles.swapImage} />
                            <View style={styles.infoContainer}>
                                <View style={styles.info}>
                                    <Image source={item.avatar} resizeMode='cover' style={styles.userImage} />
                                    <View style={styles.infoContact}>
                                        <Text style={styles.name}>{item.name
                                        }</Text>
                                        <View style={styles.dateContainer}>
                                            <EvilIcons name='clock' size={14} color="rgba(0,0,0,0.4)"/> 
                                            <Text style={styles.date}> {(new Date(item.date)).toLocaleDateString()}</Text>
                                        </View>
                                    </View>
                                </View>
                                <TouchableOpacity style={styles.swapBtn}>
                                    <Text style={styles.swapText}>Swap Now</Text>
                                    <AntDesign name='arrowright' size={15} color={Colors.primary} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))
                    
                }
            </ScrollView>
            :
                    <View  style={{padding:20,gap:10,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                            <AntDesign name='frowno' size={20} color={Colors.primary}/>
                            <Text style={{fontFamily:'roboto-condensed',fontSize:15}}>No Swap Requests</Text>
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
                        pendingOrders.length > 1 ?
                        pendingOrders.map((order,index) => (
                            <TouchableOpacity style={styles.orderCard} key={index}>
                                <View style={styles.orderCardLeft}>
                                    <Image source={{uri:order.image}} resizeMode='contain'  style={styles.orderImg}/>
                                    <View style={styles.orderInfo}>
                                        <Text style={styles.orderName}>{order.name}</Text>
                                        <Text style={styles.orderUser}>By: {order.user}</Text>
                                    </View>
                                </View>
                                <Text style={styles.orderPrice}>₦{order.price.toLocaleString()}</Text>
                            </TouchableOpacity>
                        ))

                        :

                        <View style={{gap:10,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                            <AntDesign name='frowno' size={25} color={Colors.primary}/>
                            <Text style={{fontFamily:'roboto-condensed',fontSize:17}}>No Pending Orders</Text>
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
                            <Text style={styles.totalSalesPrice}>₦534,987,34</Text>
                            <View style={styles.salesDate}>
                                <Text style={styles.totalSalesDate}>12-Sep-22 To Date</Text>
                                <Feather name='calendar' size={11} color={'rgba(0,0,0,0.6)'} />
                            </View>
                        </View>
                        <View style={{flexDirection:'row',alignItems:'center',gap:4}}>
                            <EvilIcons name='clock' size={12}  color={Colors.grey} />
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
                        width={0.8  * width}
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
const Transactions = () => {
    return (
        <Text>Transactions</Text>
    )
}
const Analytics = () => {
    return (
        <Text>Analytics</Text>
    )
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#fff"
    },
    tabs:{
        paddingHorizontal:20,
        paddingVertical:10,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
    activeTab:{
        borderBottomColor:"#000000",
        borderBottomWidth:2,
        paddingVertical: 4.5
    },
    tab:{
        paddingVertical:10
    },
    activeText:{
        color:"#000",
        fontSize:15,
        fontFamily:'roboto-condensed-sb'
    },
    tabText:{
        color:Colors.grey,
        fontSize:15,
        fontFamily:'roboto-condensed'
    },
    swapHeader:{
        marginBottom:5,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingHorizontal:20
    },
    headerText:{
        fontSize:15,
        fontFamily:'roboto-condensed',
        color:'#00000070',
        lineHeight: 15,
        letterSpacing: -0.18
    },
    headerBtn:{
        color:Colors.primary,
        fontFamily:'roboto-condensed',
        fontSize: 12,
        lineHeight: 15,
        letterSpacing: -0.18
    },
    swapContainer:{
        width: 0.75 * width,
        backgroundColor:'#fff',
        borderRadius:5,
        shadowColor: "rgba(0,0,0,0.5)",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
        overflow:'hidden',

        
    },
    swapImage:{
        width:'100%',
        height: 145
    },
    infoContainer:{
        flexDirection:'row',
        padding:10,
        alignItems:'center',
        justifyContent:'space-between'
    },
    userImage:{
        width:29,
        height:29,
        borderRadius:29
    },
    info: {
        flexDirection:'row',
        gap:10,
        alignItems:'center'
    },
    infoContact:{
        gap:2
    },
    
    name:{
        fontFamily:'roboto-condensed-sb',
        fontSize: 12,
        lineHeight: 15,
        letterSpacing: -0.18
    },
    dateContainer:{
        flexDirection:'row',
        alignItems:'center',
        
    },
    date:{
        fontFamily:'roboto-condensed',
        color:'rgba(0,0,0,0.4)',
        fontSize: 10,
        lineHeight: 15,
        letterSpacing: -0.18
    },
    swapBtn:{
        flexDirection:'row',
        alignItems:'center',
        gap:5
    },
    swapText:{
        fontFamily:'roboto-condensed',
        color:Colors.primary,
        fontSize: 14
    },
    pendingOrders:{
        borderTopColor:'rgba(0,0,0,0.05)',
        borderTopWidth:1,
        paddingVertical:10
    },
    warning:{
        gap:5,
        flexDirection:'row',
        alignItems:'center'
    },
    orderSection:{
        padding:20,
        gap:10
    },
    orderCard:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
    orderCardLeft:{
        flexDirection:'row',
        alignItems:'center'
    },
    orderInfo:{
        justifyContent:'space-between',
        gap: 7
    },
    orderName:{
        fontSize: 15,
        fontFamily:'roboto-condensed-sb',
        lineHeight: 15,
        letterSpacing: -0.18
    },
    orderPrice:{
        fontSize: 15,
        fontFamily:'roboto-condensed',
        lineHeight: 15,
        letterSpacing: -0.18,
        fontWeight: "600"
    },
    orderUser:{
        fontSize:12,
        fontFamily:'roboto-condensed',
        color:Colors.grey,
        lineHeight: 15,
        letterSpacing: -0.18
    },
    orderImg:{
        width:50,
        height:42,
        marginRight:10
    },
    salesSection:{
        paddingHorizontal:20,
        paddingVertical:10,
        backgroundColor:Colors.primaryUltraTransparent
    },
    salesContainer:{
        padding:25,
        backgroundColor:'#fff',
        // borderRadius:8,
        borderStartStartRadius:8,
        borderStartEndRadius:8,
        shadowColor: "rgba(0,0,0,0.4)",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    salesTop:{
        gap: 3
    },
    salesHeader:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
    salesMain:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
    salesDate:{
        borderWidth:0.79,
        borderColor:'#ece9f1',
        borderRadius:4,
        gap:6,
        flexDirection:'row',
        alignItems:'center',
        padding:8
    },
    salesChart:{
        marginTop:5,
        padding:20,
        backgroundColor:'#fff',
        borderEndStartRadius:8,
        borderEndEndRadius:8,
        shadowColor: "rgba(0,0,0,0.4)",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    },
    totalSales:{
        color:'#828282',
        fontSize:12.47,
        fontFamily:'roboto-condensed-m'
    },
    totalSalesPrice:{
        color:Colors.primary,
        fontSize:31.16,
        fontFamily:'roboto-condensed-m'
    },
    totalSalesDate:{
        fontSize:9,
        color:'rgba(0,0,0,0.6)',
        fontFamily:'roboto-condensed'

        
    },
    month:{
        fontSize:11,
        color:'rgba(0,0,0,0.3)',
        fontFamily:'roboto-condensed'

    },
    graphStyle:{

    }
})
export default SellerDashboard