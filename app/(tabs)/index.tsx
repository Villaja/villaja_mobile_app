import { View, Text,StyleSheet, Image, Dimensions,ScrollView, ActivityIndicator, SafeAreaView, Platform, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AntDesign, Entypo, FontAwesome5 } from '@expo/vector-icons'
import Colors from '../../constants/Colors'
import { Carousel } from 'react-native-basic-carousel'
import axios, { AxiosResponse } from 'axios'
import { Product } from '../../types/Product'
import { base_url } from '../../constants/server'
import ProductCard from '../../components/ProductCard'
// import InsetShadow from "react-native-inset-shadow";
import { useAuth } from '../../context/AuthContext'
import { useRouter } from 'expo-router'
import { Skeleton } from '@rneui/themed'
import { Svg, SvgXml, Path } from "react-native-svg";



const {width} = Dimensions.get('window')

const testUser = {
  id:1,
  name:"Tony Danza",
  image:"https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg"
}

const carouselData = [
  {
    id:1,
    device:"Apple Watch Gen2",
    store:'Apple Store',
    image:"https://downloadscdn6.freepik.com/23/2150297/2150296477.jpg?filename=new-smartwatch-balancing-with-hand.jpg&token=exp=1707936661~hmac=c634714fadddaa04ed2356927ead657d",
  },
  {
    id:2,
    device:"XBOX Series X",
    store:'Microsoft Store',
    image:"https://s3-alpha-sig.figma.com/img/ee8d/6e9c/57e60530c207b324c3bee0ce8dd3f5e5?Expires=1707696000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=EJjLL~JHRLTCYsDFSm~kbxZZXDLaFPxAXeR3YSW3sC6Pcg45gd81FdJgBP14WTraWBZvWnhsLJqOyMGU~UsWb5TeFWAhh6VyU~bdAticdjmdUAdMdmym2VBfs5uo6c06zGHffKJKYPZZMF7ppgqhvc0YtL9ti4oPQSb~7EKb0sez4qIlyp~e7O5FEEw6ktCIgz3nC8c5-cLc6ObfMLeQUav-mo~AesMVQGDpNZfLwKXWBrpuftjtZk4Z6wXoEBwxOI5wOHDP9kcjpDld3EGq2DdIcUcgJ6WzqzGLK56-5oUc9DUkazMrz~MkqWTWBUtnXGghEDU1P1zWsRwkVF2iaA__",


  },
  {
    id:3,
    device:"PS5 Controllers",
    store:'Play Station Store',
    image:"https://s3-alpha-sig.figma.com/img/6ced/489b/209bd616948f0fe0f23dd36c9bb9c2b2?Expires=1707696000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=VPjvKGmZ1Jbiv0RdVV04793R8g6A~STGsP~eo8mEvOFF4eE7ug4ZzaNVNelIEQJzjIua7gK~smhGzxmxRxBavm7B6ihDNABmnm3nfhtg0gTS3hGl~PAR6ZHGyfQOKz6plpWWybGLnVVyd--QFHV5DdZHuPldTBT2WGqzESLM7fMu0Qwg7rLkfDMKjwg4V-NdOMcwHhts3W7kTupuJ0fq0jVsvSnN~R43884~smqk7XBZ4GtU1t6q05gv31Xw5LR0eUi4TVHNzXjgyQAkGGTBl5zwW8iDGCqv5n4hig8wOrh79yFY4N9CkXUSUZcMpPTued4XbIMTTmeC1sEzE2AIJw__",


  },
  {
    id:4,
    device:"Airpods Max",
    store:'Apple Store',
    image:"https://s3-alpha-sig.figma.com/img/4ba6/d06b/2d8443c5ddabe1d6c8f1a83f532d4e94?Expires=1707696000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=lwDfH0Q968GcDryX3piBy1xastGeMoaNbbJSVU2zgQDyFrb6kBhplYHGTAf8HWXnIkk1WJTBjmU47NqrZtaRKwa2lZLhD8FeXY85Y28hJUnT2FmI-cCUWhs0o9ZBksm8wVdB93Iu1RS2p-6wIlw7qcxVfkpCMQADT0~tQ6Cb5arCEds-REtm5AzuSznKzkSWNUrCtK6hQSpCkUnBslnKUkBxuApCP9jJy5MOywAspDDQtZGfnuM0A9OGWk4X5ClFGB-tMYH8Xbf3QX4cd4chzT81z2eh81S8U5yfQsLsJUVjAYwnAIt41FUaHhQreFT93mOb9V8cwaeKJ6~oNosxpg__",


  },
  {
    id:5,
    device:"Apple Watch Series 8",
    store:'Apple Store',
    image:"https://s3-alpha-sig.figma.com/img/0224/3585/80ad73065ed751c28ac0579cae3d8d74?Expires=1707696000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=JFSCm5RxMrClttF6kj9HMtIhCzyGXpHdqVnaITFzxmah-Uq8fRriz0As7CQrxX0~PKER~oD6cG42NglLR59r1RPeWAer5cv5nlNPZnhS07l1m-SoiOg826VfHusNMGyp8Ej8sqXlMOaLdUj~qmupAf5L~1ygjSrGakxZj5itLfRWPhaiLLBTc2c80cPE4~fzJAVMa5g6Y4sNXA1TsOycqn7Qil-~Md4i2RvT9Ycb9Zr7yqoTbd9Ya0Hp4Kl~a1pqdZ~yR-mSpIsU5walRTX7KOAeAM50os0s6B3Pke7S1440tylOzuZ1MfKD7lucxw1YEebMkr5wdENEnSx8FHgBrA__",


  },
  {
    id:6,
    device:"Apple Vision Pro",
    store:'Apple Store',
    image:"https://www.apple.com/v/apple-vision-pro/c/images/overview/hero/portrait_base__bwsgtdddcl7m_large.jpg",


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

const adsData = [
  {
    id:1,
    device:"IPhone 15 Pro Max",
    store:'Apple Store',
    image:"https://s3-alpha-sig.figma.com/img/cf44/84c4/67231f7c05350cd2531b35ca90159215?Expires=1707091200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=H9zHwJTQk5LEz1p2jJlWKZX3DnPaY6cY01E89qDntJjOOr3SrG271c3vR8rEtbXhPcN2oqu4nI5qyucfyWPvF1SP19YM5ZoB7Zl5a2u6F0AowGGMW2uRRXGSqrc4E618dubTOnTBjbErZbaQ9OTGvoJuCwZ5Hal90oAmtBiwLppEQWv~UdFFM4rZ-zZEfWDjFP2t1te7j5x6NQXRJ3pVi4ZghXts2sW~vQJG8pz866QlaQUvd2U5uJsDXGSBn~elNkzmtICM4pCVzn6Tpv8IKrN1GgKZm5tYKfQJeIKBM1b4SZp5xpMHrkAIUPbc1ByIy6XoyDRAf68dSC4bdkfdXw__",
  },
]

const index = () => {

  const { user } = useAuth();
  const router = useRouter();
  
  
  const [data, setData] = useState<Array<Product>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: AxiosResponse<{ products: Product[] }> = await axios.get(
          `${base_url}/product/get-all-products`
        );
  
        // Get the first 10 products
        const first10Products = response.data.products.slice(0,40);
  
        setData(first10Products);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);


  const renderSkeletonLoader = (start:number,end:number) => {
    const cardsPerRow = 2;

    return (
      <View>

        
        
        <View style={styles.gridContainer}>
          {Array(40).fill(0).slice(start,end).map((_, index) => (

            <View
              key={index}
              style={[
                styles.productCard,
                index % cardsPerRow === cardsPerRow - 1 ? styles.lastCardInRow : null,
              ]}
            >
            
            <Skeleton  skeletonStyle={{ 
              backgroundColor:'rgba(0,0,0,0.10)',
              borderRadius:5,
              
            }} animation="pulse" width={(Dimensions.get('window').width - 40)/2 - 5} height={250} />
            
            </View>
          ))}
        </View>
      </View>

    );
  }


  const renderProductCards = (start:number,end:number) => {
    const cardsPerRow = 2;

    return (
      <View>

        
        
        <View style={styles.gridContainer}>
          {data.slice(start,end).map((product, index) => (
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
    <SafeAreaView style={{flex:1,backgroundColor:Colors.primaryUltraTransparent,paddingTop:Platform.OS === 'android'?30:0}}>
      <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',paddingHorizontal:20,paddingVertical:8,}} >
        <View style={{flexDirection:'row',alignItems:'center',gap:9      }}>
            <Image source={{uri:testUser.image}} resizeMode='contain' style={{width:50, top:1, height:50,borderRadius:40}} />
          <View style={{flexDirection:'row',alignItems:'center',gap:15}}>
          <View style={{}}>
            {user ? (
            
              <>
                <Text style={{ fontFamily: 'roboto-condensed', color: 'rgba(0,0,0,0.30)', fontSize: 12 }}>Welcome To Villaja</Text>
                <Text style={styles.userName}>
                  {user?.user.firstname} {user?.user.lastname}
                </Text>
              </>
            ) : (
            
              <>
               <Text style={{ fontFamily: 'roboto-condensed', color: 'rgba(0,0,0,0.30)', fontSize: 12}}>Welcome To Villaja</Text>
            <TouchableOpacity
              onPress={() => router.push(`/(modals)/login`)} 
              style={styles.Login}
            >
            <Text style={styles.Logintext}>Log in</Text>
            </TouchableOpacity>
              </>
            
            )}
          </View>
            <Entypo name="chevron-thin-down" size={16} color={Colors.grey} />
          </View>

        </View>
        <TouchableOpacity style={{width:40,height:40,backgroundColor:Colors.primaryTransparent,borderRadius:40,justifyContent:'center',alignItems:'center'}} onPress={() => router.push('/cartScreen/cart')}>
          <AntDesign name="shoppingcart" size={24} color={Colors.primary} />
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} >


        <View>
          <Carousel
            data={carouselData}
            style={{backgroundColor:'#fff'}}
            renderItem={({ item, index }) => <View >

              <Image source={{ uri: item.image }} style={{ height: 230}}  />
              <Text style={{ fontFamily: 'roboto-condensed', position: 'absolute', left: 20, top: 10, fontWeight: '500', color: 'rgba(255, 255, 255, 0.50)', zIndex: 100 }}>{item.store}</Text>
              <Text style={{ fontSize: 20, fontFamily: 'roboto-condensed', position: 'absolute', fontWeight: '400', left: 20, top: 30, color: '#fff', zIndex: 100 }}>{item.device}</Text>
              <TouchableOpacity style={styles.buyNowBtn}>
                <Text style={{ fontFamily: 'roboto-condensed', color: '#fff', fontSize: 12 }}>BUY NOW</Text>
                <AntDesign name="arrowright" size={12} color={"#fff"} />
              </TouchableOpacity>
            </View>}
            itemWidth={width}
            // onSnapItem={(item) => console.log(item)}
            pagination
            autoplay
          />
        </View>

      <Text style={{backgroundColor:'#fff',fontFamily:'roboto-condensed',fontSize:18,color:'#000000B2',paddingHorizontal:20,paddingVertical:6}}>Top Categories</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{height:100}}  contentContainerStyle={
                {
                    alignItems:'center',
                    gap:20,
                    paddingHorizontal:20,
                    height:100,
                    backgroundColor:'#fff'

                }} >

        {
          categoryData.map((cat,index) => (
            <View key={index} style={{alignItems:'center'}}>
              <Image source={{uri:cat.image}} style={{width:47,height:47,borderRadius:40}} />
              <Text style={{fontFamily:'roboto-condensed',color:"#00000099"}}>{cat.name}</Text>
            </View>
          ))
        }
      </ScrollView>

      <View style={{paddingHorizontal:20}}>
        <Text style={{fontFamily:'roboto-condensed',fontSize:18,color:'#000000B2',marginVertical:9}}>Popular</Text>
        <View>
          {loading ? (
            renderSkeletonLoader(0,4)
          // <ActivityIndicator size="small" color={Colors.primary} style={styles.loadingIndicator}  />
          ) : (
            renderProductCards(0,4)
            )}
        </View>
      </View>
      

      <View style={styles.imgContainer}>
      <SvgXml xml={`
                        <svg width="335" height="129" viewBox="0 0 335 129" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                        <g clip-path="url(#clip0_203_3138)">
                        <rect width="335" height="129" fill="black"/>
                        <rect x="184.592" y="169.885" width="77.1442" height="178.689" transform="rotate(-117.475 184.592 169.885)" fill="white"/>
                        <rect x="221" y="21.5303" width="115.138" height="178.689" transform="rotate(-49.4832 221 21.5303)" fill="#025492"/>
                        </g>
                        <defs>
                        <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                        <use xlink:href="#image0_203_3138" transform="matrix(0.00265957 0 0 0.00218826 0 0.0010773)"/>
                        </pattern>
                        <clipPath id="clip0_203_3138">
                        <rect width="335" height="129" fill="white"/>
                        </clipPath>
                        </defs>
                        </svg>
                        
                    `} style={styles.image} />
                    <Image source={require("../../assets/images/onlineshoppingdelivery.png")} style={{resizeMode: "contain", width: 130, height: 130, left: 105 }}/>
                        <View style={styles.imageText} >
                        <Text style={styles.text1}> BECOME A</Text>
                        <Text style={styles.text2}>Merchant For Villaja</Text>
                        <TouchableOpacity style={styles.getStarted} >
                            <Text style={styles.gtText} >Get Started</Text>
                        </TouchableOpacity>
                    </View>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{marginVertical:20,height:400}}  contentContainerStyle={
                {
                    alignItems:'center',
                    gap:4,
                    paddingHorizontal:20,
                    borderRadius:5,
                    overflow:'hidden'

                }} >

        {
          carouselData.map((cat,index) => (
            <View key={index} style={{alignItems:'center',borderRadius:5,overflow:'hidden'}}>
              <Image source={{uri:cat.image}} style={{width:300,height:400,borderRadius:5}} />
              <Text style={{ fontFamily: 'roboto-condensed', position: 'absolute', left: 20, top: 10, fontWeight: '500', color: 'rgba(255, 255, 255, 0.50)', zIndex: 100 }}>{cat.store}</Text>
              <Text style={{ fontSize: 25, fontFamily: 'roboto-condensed', position: 'absolute', fontWeight: '400', left: 20, top: 30, color: '#fff', zIndex: 100 }}>{cat.device}</Text>
              
            </View>
          ))
        }
      </ScrollView>

      <View style={{paddingHorizontal:20}}>
        <View>
          {loading ? (
          // <ActivityIndicator size="small" color={Colors.primary} style={styles.loadingIndicator}  />
          renderSkeletonLoader(0,4)
          ) : (
            renderProductCards(4,40)
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
    bottom:15,
  },
  loadingIndicator: {
    marginVertical: 16,
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
  userName: {
    fontFamily: 'roboto-condensed',
    color: Colors.primary,
    fontSize: 14,
    fontWeight: '400',
    left: 8
  },
  Login: {
    backgroundColor: '#025492',
    padding: 7,
    borderRadius: 5, 
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    textAlign: 'center',
    width: 60,
    fontWeight: '400',
    bottom: 5
  },
  Logintext: {
    color: '#ffffff',
    fontWeight: '500',
    fontSize: 10
  },
  imgContainer: {
        // width: 335,
        marginVertical: 24,
        height: 102,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: 'red',
        padding:20
        // left:14,
    },
    image: {
        position: "absolute",
        width: 210,
        resizeMode:'cover',
        // width: 340
        backgroundColor: "red"
    },
    imageText: {
        
        color: '#FFFFFF99',
        height: 87,
        // width: 307,
        left: 43,
        position: 'absolute'
    },
    text1: {
        color: "#FFFFFF99",
        fontSize: 10,
        fontWeight: '500',
        lineHeight: 11.72,
    },
    text2: {
        fontSize: 20,
        color: "#FFFFFF",
        fontWeight: '500',
        lineHeight: 29.3,
    },
    getStarted: {
        borderWidth: 1,
        borderColor: '#ffffff',
        width: 91,
        height: 34,
        top: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    gtText: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: '500',
        lineHeight: 14.06
    },
})

export default index