import { View, Text, TouchableOpacity,StyleSheet, ScrollView } from 'react-native'
import { useRouter } from 'expo-router'
import React, { useState } from 'react'
import Colors from '../../constants/Colors'
import CartCard from '../../components/CartCard'
import { defaultStyles } from '../../constants/Styles'
import OrdersCard from '../../components/OrdersCard'
import OrderHistoryCard from '../../components/OrderHistoryCard'

const sampleCartItems = [
  {
    id:1,
    name:'Soundcore Space Q45, 2022 Vision',
    originalPrice:234000,
    discountPrice:199000,
    image:'https://s3-alpha-sig.figma.com/img/d741/058d/03f244cdf5ece1cea44eeee2751fbaca?Expires=1707696000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=LaourMMgrWTY6aVMjYiteL5MqgRzjDHrinqz6Nj57UzRovBXz7BLjm8sUUVlnEOY1-b~TfLLmiGzamNPtfAXxfBnVxgLUvXYG8PA~YOpADQSS3AMz2C7dTMMozdTSuWRJ-Wfp80UQYH1rgYfQbBCyNCc1amAsWmKBghrQn7wxoCz4PB1HA1hR2liTQX5vTE07girINUPdkKn5E4jAnE0fMp4Hw4r8u4hSZSKfp5eiB636iRhXY8LsKHFgRnkuv0DHlUIjE6af4pAy44~Wr9LsDE~dgwsAuK6Cl6wD4nDI-GTuw5~~uBE5F~iv9iOqk9CcFk41h9SaX7Yux-Y~22I~g__'
  },
  {
    id:2,
    name:'Soundcore Space A45, 2022 Vision',
    originalPrice:234000,
    discountPrice:199000,
    image:'https://s3-alpha-sig.figma.com/img/a000/158a/e391fe89bb97d2e6089708e8be878a43?Expires=1707696000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=oMqKbmkexD7H1VIiEVL2UB9L0jUPi89DO4c7sMgIa6uxWSIm6cQqqUTC2vSzCdM3fPieuFFo3C9XgR028dKhb-AUC9EPinkth33FySyWJ6YURzsNkvk~FAsIWjWlYCTTvWLEqNiXpUUZCC4cv48k0A7kxUR2Pd7i8sRCBZbPwxTZjSwOS6aGUQNqDrf7zCRc4lBFCZqIB~Ym9Cv8FdZSTHrUP64Bh6OwYlx7kO8uqhrKGMy-LQ-JO6ZfRObTzU7t3W8GlwaoluJzB-MAii1xK~tS2uh0aWb779iZ6A8UrsBMgoM4yxJh0fclGp~zdoGxm5JLQfvlvgM0fpWxSXPHPQ__'
  },
]

const cart = () => {
  const router = useRouter()
  const [activeTab,setActiveTab] = useState<string>('Cart')



  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.headerBtn} onPress={() => setActiveTab('Cart')}>
          <Text style={activeTab === "Cart" ? styles.activeTextHeader:styles.textHeader}>Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerBtn} onPress={() => setActiveTab('Orders')}>
          <Text style={activeTab === "Orders" ? styles.activeTextHeader:styles.textHeader}>Orders</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerBtn} onPress={() => setActiveTab('History')}>
          <Text style={activeTab === "History" ? styles.activeTextHeader:styles.textHeader}>History</Text>
        </TouchableOpacity>
      </View>
      {
        activeTab==='Cart'?
      <ScrollView style={{padding:20,gap:16}}>
        {
          sampleCartItems && sampleCartItems.map((item) => (
            <CartCard key={item.id}  {...item} />
          ))
        }
      </ScrollView>
      :activeTab === 'Orders'?
      <ScrollView style={{padding:20}}>
        {
          sampleCartItems && sampleCartItems.map((item) => (
            <OrdersCard key={item.id}  {...item} />
          ))
        }
      </ScrollView>
      :
      <ScrollView style={{padding:0,gap:16}}>
        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingHorizontal:20,paddingVertical:7}}>
          <Text style={{fontFamily:'roboto-condensed',color:'rgba(0,0,0,0.35)'}}>History</Text>
          <TouchableOpacity><Text style={{fontFamily:'roboto-condensed',color:Colors.primary}}>Clear History</Text></TouchableOpacity>
        </View>
        {
          sampleCartItems && sampleCartItems.map((item) => (
            <OrderHistoryCard key={item.id}  {...item} />
          ))
        }
      </ScrollView>
      }

      
      {

        activeTab === 'Cart' &&
        <View style={{position:'absolute',bottom:10,left:0,right:0,padding:20}}>
          <TouchableOpacity style={defaultStyles.btn} onPress={() => router.push('/checkoutPage/checkout')}>
            <Text style={defaultStyles.btnText}>Place Order</Text>
          </TouchableOpacity>
        </View>
      }
    </View>
  )
}


const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:Colors.primaryUltraTransparent
  },
  headerContainer:{
    padding:20,
    backgroundColor:'#fff',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  },
  headerBtn:{
    paddingHorizontal:13
  },
  textHeader:{
    fontSize:18,
    fontFamily:'roboto-condensed',
    color:'rgba(0,0,0,0.40)',
    fontWeight:'500'
  },
  activeTextHeader:{
    fontSize:18,
    fontFamily:'roboto-condensed',
    color:'#000',
    fontWeight:'500'

  }
})

export default cart