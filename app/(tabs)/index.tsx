import { View, Text, StyleSheet, Image, Dimensions, ScrollView, ActivityIndicator, SafeAreaView, Platform, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AntDesign, Entypo, FontAwesome5 } from '@expo/vector-icons'
import Colors from '../../constants/Colors'
import { Carousel } from 'react-native-basic-carousel'
import axios, { AxiosResponse } from 'axios'
import { Product } from '../../types/Product'
import { base_url } from '../../constants/server'
import ProductCard from '../../components/ProductCard'
import ProductCard2 from '../../components/ProductCard2';
import ProductCard3 from '../../components/ProductCard3';
// import InsetShadow from "react-native-inset-shadow";
import { useAuth } from '../../context/AuthContext'
import { Redirect, useRouter } from 'expo-router'
import { Skeleton } from '@rneui/themed'
import AsyncStorage from '@react-native-async-storage/async-storage';



const { width } = Dimensions.get('window')

const testUser = {
  id: 1,
  name: "Tony Danza",
  image: require("../../assets/images/user2.png")
}

const carouselData = [
  {
    id: 1,
    device: "Apple Watch Gen 2",
    store: 'Apple Store',
    image: require('../../assets/images/new-smartwatch-balancing-with-hand.jpg')
  },
  {
    id: 6,
    device: "Apple Vision Pro",
    store: 'Apple Store',
    image: require('../../assets/images/portrait_base__bwsgtdddcl7m_large.jpg')
  },
  {
    id: 7,
    device: "Sony Wh1000xm4",
    store: 'Sony Store',
    image: require('../../assets/images/sonyheadphones.png')


  }
]

const categoryData = [
  {
    name: "Headphones",
    image: require('../../assets/images/Ellipse29.png')
  },
  {
    name: "Phones",
    image: require('../../assets/images/Phonecatt.png')
  },
  {
    name: "Laptop",
    image: require('../../assets/images/laptop.png')
  },
  {
    name: "Microphone",
    image: require('../../assets/images/Mic.png')
  },
  {
    name: "Power Bank",
    image: require('../../assets/images/PB.png')
  },
  {
    name: "Watch",
    image: require('../../assets/images/watch.png')
  },


]

const adsData = [
  {
    id: 1,
    device: "IPhone 15 Pro Max",
    store: 'Apple Store',
    image: "https://s3-alpha-sig.figma.com/img/cf44/84c4/67231f7c05350cd2531b35ca90159215?Expires=1707091200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=H9zHwJTQk5LEz1p2jJlWKZX3DnPaY6cY01E89qDntJjOOr3SrG271c3vR8rEtbXhPcN2oqu4nI5qyucfyWPvF1SP19YM5ZoB7Zl5a2u6F0AowGGMW2uRRXGSqrc4E618dubTOnTBjbErZbaQ9OTGvoJuCwZ5Hal90oAmtBiwLppEQWv~UdFFM4rZ-zZEfWDjFP2t1te7j5x6NQXRJ3pVi4ZghXts2sW~vQJG8pz866QlaQUvd2U5uJsDXGSBn~elNkzmtICM4pCVzn6Tpv8IKrN1GgKZm5tYKfQJeIKBM1b4SZp5xpMHrkAIUPbc1ByIy6XoyDRAf68dSC4bdkfdXw__",
  },
]

const index = () => {

  const { user } = useAuth();
  const router = useRouter();
  const [data, setData] = useState<Array<Product>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [userImage, setUserImage] = useState('')



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: AxiosResponse<{ products: Product[] }> = await axios.get(
          `${base_url}/product/get-all-products` 
        );

        // Get the first 10 products
        const first10Products = response.data.products.slice(0, 50);

        setData(first10Products);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  const renderSkeletonLoader = (start: number, end: number) => {
    const cardsPerRow = 2;

    return (
      <View>



        <View style={styles.gridContainer}>
          {Array(40).fill(0).slice(start, end).map((_, index) => (

            <View
              key={index}
              style={[
                styles.productCard,
                index % cardsPerRow === cardsPerRow - 1 ? styles.lastCardInRow : null,
              ]}
            >

              <Skeleton skeletonStyle={{
                backgroundColor: 'rgba(0,0,0,0.10)',
                borderRadius: 5,

              }} animation="pulse" width={(Dimensions.get('window').width - 40) / 2 - 5} height={250} />

            </View>
          ))}
        </View>
      </View>

    );
  }


  const renderProductCards = (start: number, end: number) => {
    const cardsPerRow = 2;

    return (
      <View>



        <View style={styles.gridContainer}>
          {data.slice(start, end).map((product, index) => (
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

  const renderProductCards2 = (start: number, end: number) => {
    const cardsPerRow = 2;

    return (
      <View>



        <View style={styles.gridContainer2}>
          {data.slice(start, end).map((product, index) => (
            <View
              key={product._id}
              style={[
                styles.productCard,
                index % cardsPerRow === cardsPerRow - 1 ? styles.lastCardInRow : null,
              ]}
            >
              <ProductCard2 product={product} />
            </View>
          ))}
        </View>
      </View>

    );
  };


  const renderProductCards3 = (start: number, end: number) => {
    const cardsPerRow = 2;

    return (
      <View>



        <View style={styles.gridContainer2}>
          {data.slice(start, end).map((product, index) => (
            <View
              key={product._id}
              style={[
                styles.productCard,
                index % cardsPerRow === cardsPerRow - 1 ? styles.lastCardInRow : null,
              ]}
            >
              <ProductCard3 product={product} />
            </View>
          ))}
        </View>
      </View>

    );
  };

 {/* suspended feature
  useEffect(() => {
    fetchUserImage();
  }, []);


  const fetchUserImage = async () => {
    try {
      const storedUserImage = await AsyncStorage.getItem('userImage');
      if (storedUserImage !== null) {
        setUserImage(storedUserImage);
      }
    } catch (error) {
      console.error('Error fetching user image:', error);
    }
  };

  const displayImage = userImage ? { uri: userImage } : testUser.image;
*/}


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.primaryUltraTransparent, paddingTop: Platform.OS === 'android' ? 30 : 0 }}>
      {/* <Redirect href={'/(tabs2)/sellerAddProduct'} /> */}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 8, }} >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 9 }}>
          <Image source={testUser.image} resizeMode='contain' style={{ width: 50, top: 1, height: 50, borderRadius: 40 }} />
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 15 }}>
            <View style={{}}>
              {user ? (

                <>
                  <Text style={{ fontFamily: 'roboto-condensed', color: 'rgba(0,0,0,0.30)', fontSize: 12 }}>Welcome To Villaja</Text>
                  <Text numberOfLines={1} style={styles.userName}>
                    {user?.user.firstname}{user?.user.lastname}
                  </Text>
                </>
              ) : (

                <>
                  <Text style={{ fontFamily: 'roboto-condensed', color: 'rgba(0,0,0,0.30)', fontSize: 12 }}>Welcome To Villaja</Text>
                  <TouchableOpacity
                    onPress={() => router.push(`/(modals)/login`)}
                    style={styles.Login}
                  >
                    <Text style={styles.Logintext}>Log in</Text>
                  </TouchableOpacity>
                </>

              )}
            </View>
            {/*<Entypo name="chevron-thin-down" size={16} color={Colors.grey} />*/}
          </View>

        </View>
        <TouchableOpacity style={{ width: 40, height: 40, backgroundColor: Colors.primaryTransparent, borderRadius: 40, justifyContent: 'center', alignItems: 'center' }} onPress={() => router.push('/cartScreen/cart')}>
          <AntDesign name="shoppingcart" size={20} color={Colors.primary} />
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false} >


        <View>
          <Carousel
            data={carouselData}
            style={{ backgroundColor: '#fff' }}
            renderItem={({ item, index }) => <View key={index}>

              <Image source={item.image} style={{ height: 211, width: "100%", }} resizeMode='cover' />
              <Text style={{ fontFamily: 'roboto-condensed', position: 'absolute', left: 20, top: 10, fontWeight: '500', color: 'rgba(255, 255, 255, 0.50)', zIndex: 100, fontSize: 12 }}>{item.store}</Text>
              <Text style={{ fontSize: 17, fontFamily: 'roboto-condensed', position: 'absolute', fontWeight: '400', left: 20, top: 25, color: '#fff', zIndex: 100 }}>{item.device}</Text>
              <TouchableOpacity style={styles.buyNowBtn}>
                <Text style={{ fontFamily: 'roboto-condensed', color: '#fff', fontSize: 9.92}}>BUY NOW</Text>
                <AntDesign name="arrowright" size={11} color={"#ffffff"} />
              </TouchableOpacity>
            </View>}
            itemWidth={width}
            // onSnapItem={(item) => console.log(item)}
            pagination
            autoplay
          />
        </View>

        <Text style={{ backgroundColor: '#fff', fontFamily: 'roboto-condensed', fontSize: 13, fontWeight: "700", color: '#00000090', paddingHorizontal: 20, paddingVertical: 6 }}>Top Categories</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ height: 100 }} contentContainerStyle={
          {
            alignItems: 'center',
            gap: 20,
            paddingHorizontal: 20,
            height: 100,
            backgroundColor: '#fff'

          }} >

          {
            categoryData.map((cat, index) => (
              <View key={index} style={{ alignItems: 'center' }}>
                <Image source={cat.image} style={{ width: 47, height: 47, borderRadius: 40 }} />
                <Text style={{ fontFamily: 'roboto-condensed', color: "#00000060", fontSize: 10, fontWeight: "700" }}>{cat.name}</Text>
              </View>
            ))
          }
        </ScrollView>

        <View style={{ paddingHorizontal: 20 }}>
          <Text style={{ fontFamily: 'roboto-condensed', fontSize: 14, fontWeight: "700", color: '#00000080', marginVertical: 9 }}>Popular</Text>
          <View>
            {loading ? (
              renderSkeletonLoader(0, 4)
              // <ActivityIndicator size="small" color={Colors.primary} style={styles.loadingIndicator}  />
            ) : (
              renderProductCards(0, 4)
            )}
          </View>
        </View>
        <View>
          <Text style={{ fontFamily: 'roboto-condensed', fontSize: 14, fontWeight: "700", color: '#00000080', marginHorizontal: 20 }}>Selected for you</Text>
          <ScrollView horizontal overScrollMode="never" showsHorizontalScrollIndicator={false} style={{ marginTop: 10, marginBottom: 20, height: 406.02}} contentContainerStyle={
            {
              alignItems: 'center',
              gap: 4,
              paddingLeft: 20,
              paddingRight: 10,
              borderRadius: 5,
              overflow: 'hidden'

            }} >
            {
              carouselData.map((cat, index) => (
                <TouchableOpacity activeOpacity={1} key={index} style={{ alignItems: 'center', borderRadius: 5, overflow: 'hidden' }}>
                  <Image source={cat.image} style={{ width: 302, height: 406.02, borderRadius: 5 }} />
                  <Text style={{ fontFamily: 'roboto-condensed', position: 'absolute', left: 20, top: 10, fontWeight: '500', color: 'rgba(255, 255, 255, 0.50)', zIndex: 100 }}>{cat.store}</Text>
                  <Text style={{ fontSize: 18.9, fontWeight: "500", fontFamily: 'roboto-condensed', position: 'absolute', left: 20, top: 30, color: '#fff', zIndex: 100 }}>{cat.device}</Text>

                </TouchableOpacity>
              ))
            }
          </ScrollView>
        </View>

        <View style={{ paddingHorizontal: 20 }}>
          <View>
          <Text style={{ fontFamily: 'roboto-condensed', fontSize: 14, fontWeight: "700", color: '#00000080', marginBottom: 10 }}>Best price offers</Text>
            {loading ? (
              // <ActivityIndicator size="small" color={Colors.primary} style={styles.loadingIndicator}  />
              renderSkeletonLoader(0, 4)
            ) : (
              renderProductCards(20, 24)
            )}
          </View>
        </View>
        <View style={{ width:'100%', height: 150, backgroundColor: "#02549210", marginBottom: 20 }} >
          <View style={{ marginHorizontal: 20, marginVertical: 15 }} >
            <Text style={{ fontSize: 12, color: "#00000090", marginBottom: 5, fontWeight: "400" }} >Top Picks For You Today</Text>
            <Text style={{ fontSize: 30, color: "#000000", fontWeight: "700" }} >Buy Your Favorite Tech Product Now</Text>
          </View>
        </View>
        <View style={{ paddingHorizontal: 20 }}>
          <View>
            {loading ? (
              // <ActivityIndicator size="small" color={Colors.primary} style={styles.loadingIndicator}  />
              renderSkeletonLoader(0, 4)
            ) : (
              renderProductCards2(32, 36)
            )}
          </View>
        </View>
        <View style={styles.imgContainer}>
          <Image source={require('../../assets/images/villaja-seller.png')} style={{ width: 350, height: 129 }} />
          <View style={styles.imageText} >
            <Text style={styles.text1}> BECOME A VERIFIED</Text>
            <Text style={styles.text2}>Merchant On Villaja</Text>
            <TouchableOpacity style={styles.getStarted} onPress={() => router.push('/sellerAuthScreens/SellerLogin') } >
              <Text style={styles.gtText} >Get Started</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ paddingHorizontal: 20 }}>
          <View>
          <Text style={{ fontFamily: 'roboto-condensed', fontSize: 14, fontWeight: "700", color: '#00000080', marginBottom: 10 }}>Most Viewed Products</Text>
            {loading ? (
              // <ActivityIndicator size="small" color={Colors.primary} style={styles.loadingIndicator}  />
              renderSkeletonLoader(0, 4)
            ) : (
              renderProductCards3(40, 44)
            )}
          </View>
        </View>
      </ScrollView>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  buyNowBtn: {
    backgroundColor: "#02549290",
    width: 92,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    height: 30,
    justifyContent: 'center',
    position: 'absolute',
    right: 30,
    bottom: 15,

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
  gridContainer2: {
    flexDirection: 'column-reverse',
    flexWrap: 'nowrap',
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
    left: 8,
    maxWidth: 150,
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
    marginTop: 10,
    marginBottom: 30,
    height: 102,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'red',
    padding: 20,
    // left:14,
  },

  imageText: {
    color: '#FFFFFF99',
    height: 87,
    left: 13,
    position: 'absolute',
    paddingHorizontal: 20
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