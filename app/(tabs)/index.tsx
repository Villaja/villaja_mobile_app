import { View, Text,StyleSheet, Image, Dimensions,ScrollView, ActivityIndicator, SafeAreaView, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import {  } from 'react-native-safe-area-context'
import { AntDesign, Entypo, FontAwesome5 } from '@expo/vector-icons'
import Colors from '../../constants/Colors'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Carousel } from 'react-native-basic-carousel'
import axios, { AxiosResponse } from 'axios'
import { Product } from '../../types/Product'
import { base_url } from '../../constants/server'
import ProductCard from '../../components/ProductCard'
// import InsetShadow from "react-native-inset-shadow";
import { useAuth } from '../../context/AuthContext'
import { Link } from 'expo-router'


const {width} = Dimensions.get('window')

const testUser = {
  id:1,
  name:"Tony Danza",
  image:"https://cdn.prod.www.spiegel.de/images/d2caafb1-70da-47e2-ba48-efd66565cde1_w1024_r0.9975262832405689_fpx44.98_fpy48.86.jpg"
}

const carouselData = [
  {
    id:1,
    device:"Apple Watch Gen2",
    store:'Apple Store',
    image:"https://s3-alpha-sig.figma.com/img/cf44/84c4/67231f7c05350cd2531b35ca90159215?Expires=1707091200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=H9zHwJTQk5LEz1p2jJlWKZX3DnPaY6cY01E89qDntJjOOr3SrG271c3vR8rEtbXhPcN2oqu4nI5qyucfyWPvF1SP19YM5ZoB7Zl5a2u6F0AowGGMW2uRRXGSqrc4E618dubTOnTBjbErZbaQ9OTGvoJuCwZ5Hal90oAmtBiwLppEQWv~UdFFM4rZ-zZEfWDjFP2t1te7j5x6NQXRJ3pVi4ZghXts2sW~vQJG8pz866QlaQUvd2U5uJsDXGSBn~elNkzmtICM4pCVzn6Tpv8IKrN1GgKZm5tYKfQJeIKBM1b4SZp5xpMHrkAIUPbc1ByIy6XoyDRAf68dSC4bdkfdXw__",
  },
  {
    id:2,
    device:"Apple Watch Gen2",
    store:'Apple Store',
    image:"https://s3-alpha-sig.figma.com/img/cf44/84c4/67231f7c05350cd2531b35ca90159215?Expires=1707091200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=H9zHwJTQk5LEz1p2jJlWKZX3DnPaY6cY01E89qDntJjOOr3SrG271c3vR8rEtbXhPcN2oqu4nI5qyucfyWPvF1SP19YM5ZoB7Zl5a2u6F0AowGGMW2uRRXGSqrc4E618dubTOnTBjbErZbaQ9OTGvoJuCwZ5Hal90oAmtBiwLppEQWv~UdFFM4rZ-zZEfWDjFP2t1te7j5x6NQXRJ3pVi4ZghXts2sW~vQJG8pz866QlaQUvd2U5uJsDXGSBn~elNkzmtICM4pCVzn6Tpv8IKrN1GgKZm5tYKfQJeIKBM1b4SZp5xpMHrkAIUPbc1ByIy6XoyDRAf68dSC4bdkfdXw__",


  },
  {
    id:3,
    device:"Apple Watch Gen2",
    store:'Apple Store',
    image:"https://s3-alpha-sig.figma.com/img/cf44/84c4/67231f7c05350cd2531b35ca90159215?Expires=1707091200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=H9zHwJTQk5LEz1p2jJlWKZX3DnPaY6cY01E89qDntJjOOr3SrG271c3vR8rEtbXhPcN2oqu4nI5qyucfyWPvF1SP19YM5ZoB7Zl5a2u6F0AowGGMW2uRRXGSqrc4E618dubTOnTBjbErZbaQ9OTGvoJuCwZ5Hal90oAmtBiwLppEQWv~UdFFM4rZ-zZEfWDjFP2t1te7j5x6NQXRJ3pVi4ZghXts2sW~vQJG8pz866QlaQUvd2U5uJsDXGSBn~elNkzmtICM4pCVzn6Tpv8IKrN1GgKZm5tYKfQJeIKBM1b4SZp5xpMHrkAIUPbc1ByIy6XoyDRAf68dSC4bdkfdXw__",


  }
]

const categoryData = [
  {
  name:"Headset",
  image:"https://s3-alpha-sig.figma.com/img/3788/19d2/508be1811e4799eb485a087f8856a61e?Expires=1707091200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Hd7dPJRUdA9ES6CidSt9-2OZw8ELWeGjti-3X2u62lEBvsWPopfVLmQI7ql1A1YykipG0Ka-FpqWjdwv2OVBQEGi4BsNODUByLRR3xQ0miuiDFEmczbxBBkhdXW5oHN~5-i56RjFbhFDNY0UC51pYi~yI98eZLlUAsBhhY7wcsnNohiMoFFwrb6DCo9KYFa44HiBuvDbXLSUHQKdgChgeiiK7JHmc1A5McZ0SsH2G~vf4wwP7BC1~DiD~JK0GDgloFDt7weBvJK5CvHuaWx-d1WekthUgPF5SzD6ym-5fZbNMrZoNKco0iku-kpLXqBL79CbomMg1aS0eFB4KYygJQ__"
},
  {
  name:"IPhone",
  image:"https://s3-alpha-sig.figma.com/img/9e43/06cc/7c0e9635ce694da562bbff71e9f25f3a?Expires=1707091200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=FnDUunm3CeXkPTlKbN1Fh84Kms8C46segwHjE0lQTFrSX5xbU-VIe235oWg6hW1Der4glOgvfNOsA8YRyDZUC9qyRXr-W9ibR~1DBCWWlFLSKL1r13C935QCf7uA-3d6C3VysC7v9gwZIVhC0HIWhiTJe6iyQT~cDzeSxayRgdok~Cj7gbsh0tZuTPe9MJj1vxtguagdYnrx3wtU7Lq1MaY~F60m6oS5-OJyrwfejsQGOVVJ-hjmC-~tSemV~QEbMqF2JR3Wke3Qo6Nw2geiY1VmGCLbNoU9MxxWshi7ValwL71n8wbBo8HihRYrNPjTcsFiFb~Sinl2ikWwR0lHjQ__"
},
  {
  name:"Laptop",
  image:"https://s3-alpha-sig.figma.com/img/fde5/754f/a1de43c5efcdb4baf320776c6a66ab41?Expires=1707091200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=c8UugSR-br-yXl0I8AxuMEms9JspKnJu~F-BIEK3vtVTuS6RUGirREmJd9XoODMKP5l6Ammoy9Hi-D7eAMfYSG64KB42wJPY8XkNmpYnMMzOtiOxn8rS7u29b~zB8mmBTDUH4v94g2z0bVQ94PknRQWEdL~Wjir1oOJN8IY526GNgdG~YOL6erXAdxOyzWiegPXGhTm-dFETbNsTspISmAogzZmhOwp8sWo9nyW4Vc8UDZnOx8ByF6D40-xhQ5e6txFDREzZs26gA1jy4wBs7-IRKveU9uhDs357yYswj7x8j70OkouahBlAClQYN-JNjO2NIq6FddGpn8TafvTPgw__"
},
  {
  name:"Microphone",
  image:"https://s3-alpha-sig.figma.com/img/4742/ffe0/378c3f723258758f11dfa3c5b83f71bd?Expires=1707091200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Ni7LiBBAsHI5MFfviWMxa-r1J7Z0Ts9S0wvYZdPawPeIoNhjTUAz9KJ3vkjc5yc36zaluUB45mMnczwuiY6Nn4U9CCo9SMLJy17kZI2wKwCQtLpwkXVFz~MmC~3zZ~Mu-SrV0JvAFEfwwEQY2h0L2mwj6-p2N-15h98ttvYn7GZpHWAdeNM1pLGEkRV4yAVXgKHbMlat5~0oU7YlEOOO5zqtC8oDjfUOAYOSfkMkMuhYvWyH5Z4lxtwT6G6GFdj5mPeZ0EW3AsFyJeJvHvNMaLQVTNu0S4T~c41R1PiMgS~sil5zWtHEfz1WF2FeIXqAntTpjSham3eOq~yzY4PXVA__"
},
  {
  name:"Power Bank",
  image:"https://s3-alpha-sig.figma.com/img/23df/dfa7/e04eaf1095917326c3a8eea7d81b91ce?Expires=1707091200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=XtTBiktc5JrXLTU9G~OF~42dWmW1d4iM9-1AItQRt71pYy~U829n~Lku8~kKb2lUaItXLfY7LvAb-D1dzH3ysqhabCvxtZdQ4ooDb72cNUyM0MunIR6iZ2nED~XqIhDBYxpc5Y7VGgO8vxcd8dt-oToa~5clofHUB5VGb3Nj9r8CcJ9zyM2LZulPmrRvHNkmKlBIOlFA3jYC6KcRM2JuQHsWfHfqwW25vHDXs5kAkjRe87WHDoLHJ9Vawa9pR0d8YM6EjC~oZjh9NBacPpZJAg5o-P2b9-GeFVnuVSqyVuyp6neXozR1KunwxnmsSSFOj4TDZVsO4fU~9l08sWiaWQ__"
},
  {
  name:"Watch",
  image:"https://s3-alpha-sig.figma.com/img/5279/708e/3503d89fc8c1af7cd119de3312008c23?Expires=1707091200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=GvtqZxhMpDEsUwkr6m548YewhWbk7xa0fQ3qfQgUEEg~MfhJ860OQLPc4yydtuLxcbPFp6VFI4YV4waaJf0bIjfdswJOm2v1hOyRoXnkom5VmBIe7OfA3va5wbpWxL5KJBad3TYwLQ0OoUYXNk5yDP1DS7AVxBj9-9DQp2kLjqcSbomyGI2U7yc9nZknG99fEwjtCk7Oc3Ssd~T-LFYnNvgJTXSEeFWCHyugDieuiWZBNWeqobhZueChGjNoBFzujX-msKqQrV5xYtwv4ohOuS9o~q8IjVxdOHg7YVCmI4X0haAZF6~Tk3mf~M7LlDeF5zSpOyfYCw4i1SviTTByAA__"
},


]

const index = () => {

  const { user } = useAuth();
  
  
  const [data, setData] = useState<Array<Product>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: AxiosResponse<{ products: Product[] }> = await axios.get(
          `${base_url}/product/get-all-products`
        );
  
        // Get the first 10 products
        const first10Products = response.data.products.slice(0,20);
  
        setData(first10Products);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);


  const renderProductCards = () => {
    const cardsPerRow = 2;

    return (
      <View>

        
        
        <View style={styles.gridContainer}>
          {data.map((product, index) => (
            <View
              key={product._id}
              style={[
                styles.productCard,
                index % cardsPerRow === cardsPerRow - 1 ? styles.lastCardInRow : null,
              ]}
            >
              <ProductCard product={product} />
            </View>
          ))}
        </View>
      </View>

    );
  };


  return (
    <SafeAreaView style={{flex:1,backgroundColor:'#fff',paddingTop:Platform.OS === 'android'?30:0}}>
      <View style={{flexDirection:'row',justifyContent:'space-between',paddingHorizontal:20,paddingVertical:8,}} >
        <View style={{flexDirection:'row',alignItems:'center',gap:9      }}>
            <Image source={{uri:testUser.image}} resizeMode='contain' style={{width:40,height:40,borderRadius:40}} />
          <View style={{flexDirection:'row',alignItems:'center',gap:15}}>
          <View style={{}}>
            {user ? (
            
              <>
                <Text style={{ fontFamily: 'roboto-condensed', color: 'rgba(0,0,0,0.30)', fontSize: 12 }}>Welcome To Villaja</Text>
                <Text style={{ fontFamily: 'roboto-condensed', color: Colors.primary, fontSize: 18 }}>
                  {user?.user.firstname} {user?.user.lastname}
                </Text>
              </>
            ) : (
            
              <>
               <Text style={{ fontFamily: 'roboto-condensed', color: 'rgba(0,0,0,0.30)', fontSize: 12}}>Welcome To Villaja</Text>
            <Link
              href="/(modals)/login"  
              style={{
                backgroundColor: Colors.primary,
                padding: 7,
                borderRadius: 5, 
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 10,
                color: 'white'
              }}
            >
                Login
            </Link>
              </>
            
            )}
          </View>
            <Entypo name="chevron-thin-down" size={16} color={Colors.grey} />
          </View>

        </View>
        <TouchableOpacity style={{width:40,height:40,backgroundColor:Colors.primaryTransparent,borderRadius:40,justifyContent:'center',alignItems:'center'}}>
          <AntDesign name="shoppingcart" size={24} color={Colors.primary} />
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} >


      <View>
        <Carousel 
          data={carouselData} 
          renderItem={({item, index}) => <View>
            
            <Image source={{uri:item.image}} style={{height:230}} />
            <Text style={{fontFamily:'roboto-condensed',position:'absolute',left:20,top:10,color:'rgba(255, 255, 255, 0.50)',zIndex:100}}>{item.store}</Text>
            <Text style={{fontSize:20,fontFamily:'roboto-condensed',position:'absolute',left:20,top:30,color:'#fff',zIndex:100}}>{item.device}</Text>
            <TouchableOpacity style={styles.buyNowBtn}>
              <Text style={{fontFamily:'roboto-condensed',color:'#fff',fontSize:12}}>BUY NOW</Text>
              <AntDesign name="arrowright" size={12} color={"#fff"} />
            </TouchableOpacity>
          </View>}
          itemWidth={width}
          // onSnapItem={(item) => console.log(item)}
          pagination
          autoplay
        />
      </View>

      <Text style={{fontFamily:'roboto-condensed',fontSize:18,color:'#000',paddingHorizontal:20,marginBottom:6}}>Top Categories</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{height:100}}  contentContainerStyle={
                {
                    alignItems:'center',
                    gap:20,
                    paddingHorizontal:20,
                    height:100

                }} >

        {
          categoryData.map((cat) => (
            <View style={{alignItems:'center'}}>
              <Image source={{uri:cat.image}} style={{width:47,height:47,borderRadius:40}} />
              <Text style={{fontFamily:'roboto-condensed',color:"#000"}}>{cat.name}</Text>
            </View>
          ))
        }
      </ScrollView>

      <View style={{paddingHorizontal:20,backgroundColor:Colors.primaryTransparent}}>
        <Text style={{fontFamily:'roboto-condensed',fontSize:18,color:'#000',marginVertical:9}}>Popular</Text>
        <View>
          {loading ? (
          <ActivityIndicator size="large" color="#0000ff" style={styles.loadingIndicator} />
          ) : (
            renderProductCards()
            )}
        </View>
      </View>
      </ScrollView>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  buyNowBtn:{
    backgroundColor:Colors.primary,
    width:120,
    borderRadius:5,
    flexDirection:'row',
    alignItems:'center',
    gap:5,
    height:35,
    justifyContent:'center',
    position:'absolute',
    right:30,
    bottom:15
  },
  loadingIndicator: {
    marginTop: 16,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    // paddingHorizontal: 8,
  },
  productCard: {
    flexBasis: '48%',
    marginBottom: 16,
  },
  lastCardInRow: {
    marginRight: 0,
  },
})

export default index