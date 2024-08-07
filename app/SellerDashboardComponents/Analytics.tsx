import { Dimensions, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import React, {useState, useEffect} from 'react';
import { AntDesign, EvilIcons, Feather } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import { BarChart, PieChart } from 'react-native-chart-kit';
import { Order } from '../../types/Order';
import { Link } from "expo-router";
import { useRouter } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { base_url } from '../../constants/server';

interface SellerOrdersCardProps {
    order: Order
}

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

const PieChartData = [
  {
    name: "Phones",
    population: 1,
    color: "#165BAA",
    legendFontColor: "#7F7F7F",
    legendFontSize: 12,

  },
  {
    name: "Laptops",
    population: 1,
    color: "#A155B9",
    legendFontColor: "#7F7F7F",
    legendFontSize: 12
  },
  {
    name: "Speaker",
    population: 1,
    color: "#F765A3",
    legendFontColor: "#7F7F7F",
    legendFontSize: 12
  },
  {
    name: "Watch",
    population: 1,
    color: "#16BFD6",
    legendFontColor: "#7F7F7F",
    legendFontSize: 12
  },
  {
    name: "Others",
    population: 1,
    color: "#1DDD8D",
    legendFontColor: "#7F7F7F",
    legendFontSize: 12
  },
  
];

const Analytics = () => {
  const [seller, setSeller] = useState<any>([]);
  const [token, setToken] = useState<string>();
  const [loading, setLoading] = useState<boolean>(true);
  const [allOrders, setAllOrders] = useState<any>([]);
  const router = useRouter();
  

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem('sellerToken');
        const response = await axios.get(`${base_url}/shop/getSeller`, {
          headers: {
            Authorization: token
          }
        })

        if (!token) {
          router.replace('/sellerAuthScreens/SellerLogin');
          return
        };
        setSeller(response.data.seller);
        setToken(token)
      } catch (error) {
        console.log("Error fetching seller details", error)
      }
    }

    checkToken();
  }, []);

  const totalSales = seller?.availableBalance?.toLocaleString() || "0.00"

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
  };

  useEffect(() => {
    handleGetOrders();
  }, [seller])

  return (
    <View style={styles.container}>
      <View style={styles.analyticsTop}>
        <View style={styles.analyticsBox}>
          <View style={styles.analyticsBoxAction}>
            <Feather name='activity' color={'#FFA800'} size={20}/>
            {/* no earnings screen to navigate to <AntDesign name='arrowright' color={'#11263C'} size={18}/>*/}
          </View>
          <View style={styles.analyticsBoxText}>
            <Text style={styles.analyticsBoxMainText}>₦{totalSales}</Text>
            { totalSales !== "0.00" && <Text style={styles.analyticsBoxPercentageText}>+55%</Text>}
          </View>
          <View style={styles.analyticsBoxBottom}>
            <Text style={styles.analyticsBoxBottomText}>Total Earnings</Text>
            <Text style={styles.analyticsBoxBottomText}>30d</Text>
          </View>
        </View>
        <View style={styles.analyticsBox}>
          <View style={styles.analyticsBoxAction}>
            <AntDesign name='adduser' color={'#3699FF'} size={20}/>
            <TouchableOpacity onPress={() => router.push('/(drawer)/(tabs2)/sellerOrders')} >
            <AntDesign name='arrowright' color={'#11263C'} size={18}/>
            </TouchableOpacity>
          </View>
          <View style={styles.analyticsBoxText}>
            <Text style={styles.analyticsBoxMainText}>{loading ? <ActivityIndicator size="small" color={Colors.primary} /> : allOrders.length }</Text>
            { allOrders !== undefined && <Text style={styles.analyticsBoxPercentageText}>+55%</Text>}
          </View>
          <View style={styles.analyticsBoxBottom}>
            <Text style={styles.analyticsBoxBottomText}>Total Orders</Text>
            <Text style={styles.analyticsBoxBottomText}>30d</Text>
          </View>
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
                            <Text style={styles.totalSalesPrice}>₦{totalSales}</Text>
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
                    
                    <PieChart
                      data={PieChartData}
                      width={width- 50}
                      height={180}
                      chartConfig={chartConfig}
                      accessor={"population"}
                      backgroundColor={"transparent"}
                      paddingLeft={"0"}
                      center={[0, 0]}
                      absolute
                    />
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
                            <Text style={styles.totalSalesPrice}>₦{totalSales}</Text>
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


const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#fff',
    // padding:20,
    paddingTop:10
  },
  analyticsTop:{
    flexDirection:'row',
    gap:7,
    alignItems:'center',
    justifyContent:'space-between',
    paddingHorizontal:20
  },
  analyticsBox:{
    width:'49%',
    borderColor:'#E8E8E8',
    borderWidth:1,
    borderRadius:6,
    padding:10
  },
  analyticsBoxAction:{
    flexDirection:'row',
    justifyContent:'space-between',
    paddingVertical:10
  },
  analyticsBoxText:{
    flexDirection:'row',
    gap:5,
    alignItems:'flex-end',
    marginBottom:10
  },
  analyticsBoxMainText:{
    fontSize:21,
    fontFamily:'roboto-condensed-sb',
    color:Colors.primary
  },
  analyticsBoxPercentageText:{
    color:'#48BB78',
    fontSize:10
  },
  analyticsBoxBottom:{
    flexDirection:'row',
    justifyContent:'space-between'
  },
  analyticsBoxBottomText:{
    color:'#929292',
    fontSize:10,
    fontFamily:'roboto-condensed'
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
        fontSize:27.16,
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

export default Analytics