import { View, Text, ScrollView, StyleSheet } from 'react-native'
import React from 'react'
import { defaultStyles } from '../../constants/Styles'
import Colors from '../../constants/Colors'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Svg, { Path } from 'react-native-svg'
import { AntDesign, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import OrderHistoryCard from '../../components/OrderHistoryCard'
import CheckoutProductCard from '../../components/CheckoutProductCard'

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
    originalPrice:226500,
    discountPrice:179000,
    image:'https://s3-alpha-sig.figma.com/img/a000/158a/e391fe89bb97d2e6089708e8be878a43?Expires=1707696000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=oMqKbmkexD7H1VIiEVL2UB9L0jUPi89DO4c7sMgIa6uxWSIm6cQqqUTC2vSzCdM3fPieuFFo3C9XgR028dKhb-AUC9EPinkth33FySyWJ6YURzsNkvk~FAsIWjWlYCTTvWLEqNiXpUUZCC4cv48k0A7kxUR2Pd7i8sRCBZbPwxTZjSwOS6aGUQNqDrf7zCRc4lBFCZqIB~Ym9Cv8FdZSTHrUP64Bh6OwYlx7kO8uqhrKGMy-LQ-JO6ZfRObTzU7t3W8GlwaoluJzB-MAii1xK~tS2uh0aWb779iZ6A8UrsBMgoM4yxJh0fclGp~zdoGxm5JLQfvlvgM0fpWxSXPHPQ__'
  },
]

const checkout = () => {

    const total = sampleCartItems.reduce((a,b) => {return(a + b.discountPrice)},0)
  return (
    <View style={{flex:1,backgroundColor:Colors.primaryUltraTransparent,paddingBottom:100}}>

    <ScrollView style={{flex:1,backgroundColor:Colors.primaryUltraTransparent,paddingVertical:4,}}>
      <View style={styles.orderSummaryContainer}>
        <Text 
            style={{fontFamily:'roboto-condensed',
            color:'rgba(0,0,0,0.70)',
            fontSize:18}}
        >Order Summary</Text>
        <View style={styles.orderSummarySection}>
            <Text style={styles.orderSummaryText}>Total</Text>
            <Text style={styles.orderSummaryPrice}>{total}</Text>
        </View>
        <View style={styles.orderSummarySection}>
            <Text style={styles.orderSummaryText}>Delivery Fee</Text>
            <Text style={styles.orderSummaryPrice}>N650</Text>
        </View>
        <View style={[styles.orderSummarySection,{paddingVertical:8}]}>
            <Text style={[styles.orderSummaryText,{fontSize:18}]}>Total</Text>
            <Text style={[styles.orderSummaryText,{color:Colors.primary,fontSize:18}]}>N{(total+650).toLocaleString()}</Text>
        </View>
      </View>

      <View>
        
        <TouchableOpacity style={styles.promoCodeSection}>
            <Svg  width="20" height="20" viewBox="0 0 20 20" fill="none">
                <Path d="M17.7492 8.1625C18.0316 8.10505 18.2854 7.95182 18.4678 7.72874C18.6501 7.50566 18.7498 7.22642 18.75 6.93828V5C18.75 4.66848 18.6183 4.35054 18.3839 4.11612C18.1495 3.8817 17.8315 3.75 17.5 3.75H2.5C2.16848 3.75 1.85054 3.8817 1.61612 4.11612C1.3817 4.35054 1.25 4.66848 1.25 5V6.93828C1.25016 7.22642 1.34986 7.50566 1.53223 7.72874C1.71459 7.95182 1.96843 8.10505 2.25078 8.1625C2.67298 8.25005 3.05209 8.48044 3.32427 8.81485C3.59644 9.14926 3.74505 9.56726 3.74505 9.99844C3.74505 10.4296 3.59644 10.8476 3.32427 11.182C3.05209 11.5164 2.67298 11.7468 2.25078 11.8344C1.9679 11.8919 1.71366 12.0456 1.53124 12.2693C1.34881 12.4931 1.24944 12.773 1.25 13.0617V15C1.25 15.3315 1.3817 15.6495 1.61612 15.8839C1.85054 16.1183 2.16848 16.25 2.5 16.25H17.5C17.8315 16.25 18.1495 16.1183 18.3839 15.8839C18.6183 15.6495 18.75 15.3315 18.75 15V13.0617C18.7498 12.7736 18.6501 12.4943 18.4678 12.2713C18.2854 12.0482 18.0316 11.8949 17.7492 11.8375C17.327 11.7499 16.9479 11.5196 16.6757 11.1851C16.4036 10.8507 16.255 10.4327 16.255 10.0016C16.255 9.57039 16.4036 9.15239 16.6757 8.81798C16.9479 8.48357 17.327 8.25318 17.7492 8.16562V8.1625ZM2.5 13.0625C3.20601 12.9187 3.84064 12.5353 4.29644 11.9773C4.75224 11.4193 5.00121 10.7209 5.00121 10.0004C5.00121 9.27988 4.75224 8.5815 4.29644 8.02349C3.84064 7.46547 3.20601 7.0821 2.5 6.93828V5H6.875V15H2.5V13.0625ZM17.5 13.0625V15H8.125V5H17.5V6.9375C16.794 7.08132 16.1594 7.46469 15.7036 8.02271C15.2478 8.58072 14.9988 9.2791 14.9988 9.99961C14.9988 10.7201 15.2478 11.4185 15.7036 11.9765C16.1594 12.5345 16.794 12.9179 17.5 13.0617V13.0625Z" fill="#9E4AE0"/>
            </Svg>
            <Text style={styles.promoCodeText}>Use Promo Code</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.addressContainer}>
        <View style={styles.addressHeader}>
            <Text style={styles.addressHeaderText}>Address</Text>
            <TouchableOpacity style={styles.changeLocationBtn}>
                <Text style={styles.changeLocationText}>Change Location</Text>
                <MaterialIcons name='keyboard-arrow-down' color={Colors.primary} size={15} />
            </TouchableOpacity>
        </View>

        <View style={styles.addressContentSection}>
            <Ionicons name="location-outline" size={24} color={"#68e349"} />
            <Text style={styles.addressContentText} numberOfLines={1}>28, soluyi estate, gbagada phase 1, Lagos nigeria</Text>
        </View>
      </View>

      <View style={{backgroundColor:'#fff',marginBottom:4,paddingHorizontal:20,paddingVertical:10}}>
        <Text style={styles.addressHeaderText} >Products</Text>
      </View>

      <View>
         {
          sampleCartItems && sampleCartItems.map((item) => (
            <CheckoutProductCard key={item.id}  {...item} />
          ))
        }
      </View>
    </ScrollView>

     <View style={{position:'absolute',bottom:0,right:0,left:0,padding:20,backgroundColor:'#fff'}}>
        <TouchableOpacity style={defaultStyles.btn}>
            <Text style={defaultStyles.btnText}>Proceed To Payment</Text>
        </TouchableOpacity>
    </View> 
    </View>

  )
}

const styles = StyleSheet.create({

    addressContainer:{
        padding:20,
        backgroundColor:"#fff",
        gap:4,
        marginBottom:4                                                                                
    },
    addressHeader:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
    addressHeaderText:{
        fontFamily:'roboto-condensed',
        fontSize:18
    },
    changeLocationBtn:{
        flexDirection:'row',
        gap:4,
        alignItems:'center'
    },
    changeLocationText:{
        fontFamily:'roboto-condensed',
        fontSize:15,
        color:Colors.primary
    },
    addressContentSection:{
        flexDirection:'row',
        alignItems:'center',
        gap:4,
        paddingVertical:8
    },
    addressContentText:{
        fontFamily:'roboto-condensed',
        fontSize:15,
        color:'rgba(0,0,0,0.50)',
        flexShrink:1
    },
    orderSummaryContainer:{
        padding:20,
        gap:9,
        backgroundColor:"#fff",
        marginBottom:4
    },
    orderSummarySection:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
    orderSummaryText:{
        fontFamily:'roboto-condensed',
        color:'rgba(0,0,0,0.50)',
        fontSize:15
    },
    orderSummaryPrice:{
        fontFamily:'roboto-condensed',
        color:'rgba(0,0,0,0.70)',
        fontSize:15
    },
    promoCodeSection:{
        padding:20,
        flexDirection:'row',
        alignItems:'center',
        gap:8,
        backgroundColor:'#fff',
        marginBottom:4
    },
    promoCodeText:{
        fontFamily:'roboto-condensed',
        color:'rgba(0,0,0,0.90)',
        fontSize:18
    }

})

export default checkout