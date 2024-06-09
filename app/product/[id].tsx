import React, { useEffect, useRef, useState } from 'react';
import { View, Text, ActivityIndicator, Image, StyleSheet, ScrollView, FlatList, Dimensions, TouchableOpacity, Modal, Pressable } from 'react-native';
import axios from 'axios';
import { useLocalSearchParams } from 'expo-router';
import { base_url } from '../../constants/server';
import { Product } from '../../types/Product';
import { Carousel } from 'react-native-basic-carousel';
import Colors from '../../constants/Colors';
import { AntDesign, FontAwesome, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { defaultStyles } from '../../constants/Styles';
import { timeAgo } from '../../utils/timeAgo';
import Svg, { Path } from 'react-native-svg';
import SimilarSection from '../../components/SimilarSection';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PopUpModal from '../../components/popUpModal';
import { useRouter } from "expo-router";



const { width } = Dimensions.get('window')

const Page: React.FC = () => {



  const scrollRef = useRef<ScrollView>(null)
  const { id } = useLocalSearchParams<{ id: string }>();
  const [productDetails, setProductDetails] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [triggerCartModal, setTriggerCartModal] = useState(false);
  const [modalInfo, setModalInfo] = useState<{ icon: string, message: string, iconColor: string } | undefined>();
  const [descriptionLength, setDescriptionLength] = useState(3);
  const router = useRouter()

  const handleAddToCart = async () => {

    var cart = [] as Product[]

    try {
      await AsyncStorage.getItem('cart', (err, result) => {
        if (err) {
          console.log("err");

        }
        cart = JSON.parse(result!)
      })

      const itemExists = cart && cart?.length > 0 && cart.find((item: Product) => item._id === productDetails?._id)

      if (itemExists) {
        // alert("This item is already in your cart")
        setModalInfo({ icon: 'exclamationcircle', message: 'This Item is Already In Your Cart', iconColor: 'red' })
        setTriggerCartModal(true)


      }
      else if (cart && cart.length > 0 && !itemExists) {
        await AsyncStorage.setItem('cart', JSON.stringify([...cart, productDetails]))
        setModalInfo({ icon: 'shoppingcart', message: 'Item Added To The Shopping Cart', iconColor: Colors.primary })
        setTriggerCartModal(true)
      }
      else {
        await AsyncStorage.setItem('cart', JSON.stringify([productDetails]))
        setModalInfo({ icon: 'shoppingcart', message: 'Item Added To The Shopping Cart', iconColor: Colors.primary })
        setTriggerCartModal(true)
      }

    }
    catch (err) {
      console.log("")
    }
  }

  useEffect(() => {
    if (triggerCartModal) {
      setTimeout(() => setTriggerCartModal(false), 2000)
    }
  }, [triggerCartModal])

  useEffect(() => {
    // scrollRef.current?.scrollTo({x:0,y:0})
    setLoading(true)
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`${base_url}/product/get-product-details/${id}`);
        setProductDetails(response.data.product);
      } catch (error) {
        console.error('Error fetching product details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);


  return (
    <ScrollView style={{ backgroundColor: Colors.primaryUltraTransparent }} ref={scrollRef} >
      <View>
        <PopUpModal icon={modalInfo?.icon!} message={modalInfo?.message!} iconColor={modalInfo?.iconColor!} triggerCartModal={triggerCartModal} setTriggerCartModal={setTriggerCartModal} />
      </View>
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator size="small" color={Colors.primary} style={styles.loadingIndicator} />
        ) : (
          <>
            {productDetails && (
              <>
                <Carousel
                  data={productDetails?.images}
                  renderItem={({ item, index }) => <Image key={index} style={styles.image} source={{ uri: item.url }} />
                  }
                  itemWidth={width}
                  // onSnapItem={(item) => console.log(item)}
                  pagination
                  paginationType='circle'
                  autoplay
                />
                {/* <FlatList
                  data={productDetails.images.slice(1)} 
                  keyExtractor={(item) => item._id}
                  renderItem={({ item }) => (
                    <Image style={styles.smallImage} source={{ uri: item.url }} />
                  )}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.smallImagesContainer}
                /> */}
                <View style={{}}>

                  <View style={{ backgroundColor: "#fff", padding: 20 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                      <Text style={{ flexDirection: 'row', alignItems: 'center', fontFamily: 'roboto-condensed', fontSize: 12, color: 'rgba(0,0,0,0.50)', marginBottom: 8 }}><MaterialCommunityIcons name='clock-outline' size={15} color={"rgba(0,0,0,0.50)"} /> {timeAgo(productDetails?.shop.createdAt)} on Villaja</Text>
                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                        <View style={{ padding: 3, borderRadius: 12, backgroundColor: productDetails?.stock > 5 ? 'rgba(0,255,0,0.10)' : 'rgba(255,0,0,0.10)' }}>
                          <AntDesign name='exclamationcircleo' size={9} color={productDetails?.stock > 5 ? 'green' : 'red'} />
                        </View>
                        <Text style={{ fontFamily: 'roboto-condensed', fontSize: 12, color: productDetails?.stock > 5 ? 'green' : 'red' }}>{productDetails?.stock} units left</Text>
                      </View>
                    </View>
                    <Text style={styles.title}>{productDetails?.name}</Text>
                    <Text style={styles.price}>₦{productDetails?.originalPrice.toLocaleString()}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
                      {
                        productDetails?.ratings ?
                          Array(5).fill(0).map((val, index) => {
                            if (index < productDetails.ratings) {
                              return (<FontAwesome key={index} name='star' size={16} color={'#fc8b00'} />)

                            }
                            return (<FontAwesome key={index} name='star' size={16} color={'rgba(0,0,0,0.10)'} />)

                          }
                          )
                          :

                          Array(5).fill(0).map((val, index) => (
                            <FontAwesome key={index} name='star' size={16} color={'rgba(0,0,0,0.10)'} />
                          ))
                      }
                      <Text style={{ color: "#025492" }}>({productDetails?.ratings} ratings)</Text>
                    </View>

                    <View style={{ flexDirection: 'row', gap: 8, paddingVertical: 16 }}>
                      <TouchableOpacity style={[defaultStyles.btn, { flexBasis: '49%' }]} onPress={() => handleAddToCart()}><Text style={[defaultStyles.btnText, { fontSize: 16, fontFamily: 'roboto-condensed' }]}>Add To Cart</Text></TouchableOpacity>
                      <TouchableOpacity style={[defaultStyles.btnStyleBorder, { flexBasis: '49%' }]}><Text style={[defaultStyles.btnText, { fontSize: 16, fontFamily: 'roboto-condensed', color: Colors.primary }]}>Buy Now</Text></TouchableOpacity>
                    </View>
                  </View>


                  <View style={{ marginTop: 10, paddingVertical: 20, paddingHorizontal: 20, backgroundColor: '#fff' }}>
                    <Text style={{ fontFamily: 'roboto-condensed', fontSize: 13, color: "rgba(0,0,0,0.70)", marginBottom: 12, fontWeight: "700" }}>Specs</Text>
                    <View style={{ gap: 12 }}>
                      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <View style={{ gap: 4, flexBasis: '49%' }}>
                          <Text style={{ fontFamily: 'roboto-condensed', color: 'rgba(0,0,0,0.40)', fontSize: 12, lineHeight: 15.2 }}>BRAND</Text>
                          <Text style={{ fontFamily: 'roboto-condensed', textTransform: 'capitalize', fontSize: 15 }}>{productDetails?.brand || 'N/A'}</Text>
                        </View>
                        <View style={{ gap: 4, flexBasis: '49%' }}>
                          <Text style={{ fontFamily: 'roboto-condensed', color: 'rgba(0,0,0,0.40)', fontSize: 12, lineHeight: 15.2 }}>MODEL</Text>
                          <Text style={{ fontFamily: 'roboto-condensed', textTransform: 'capitalize', fontSize: 15 }}>{productDetails?.model || 'N/A'}</Text>
                        </View>
                      </View>
                      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <View style={{ gap: 4, flexBasis: '49%' }}>
                          <Text style={{ fontFamily: 'roboto-condensed', color: 'rgba(0,0,0,0.40)', fontSize: 12, lineHeight: 15.2 }}>CONDITION</Text>
                          <Text style={{ fontFamily: 'roboto-condensed', textTransform: 'capitalize', fontSize: 15 }}>{productDetails?.condition || 'N/A'}</Text>
                        </View>
                        <View style={{ gap: 4, flexBasis: '49%' }}>
                          <Text style={{ fontFamily: 'roboto-condensed', color: 'rgba(0,0,0,0.40)', fontSize: 12, lineHeight: 15.2 }}>INTERNAL MEMORY</Text>
                          <Text style={{ fontFamily: 'roboto-condensed', textTransform: 'capitalize', fontSize: 15 }}>{productDetails?.internalMemory || 'N/A'}</Text>
                        </View>
                      </View>
                      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <View style={{ gap: 4, flexBasis: '49%' }}>
                          <Text style={{ fontFamily: 'roboto-condensed', color: 'rgba(0,0,0,0.40)', fontSize: 12, lineHeight: 15.2 }}>WEIGHT</Text>
                          <Text style={{ fontFamily: 'roboto-condensed', textTransform: 'capitalize', fontSize: 15 }}>{productDetails?.weight || 'N/A'}</Text>
                        </View>
                        <View style={{ gap: 4, flexBasis: '49%' }}>
                          <Text style={{ fontFamily: 'roboto-condensed', color: 'rgba(0,0,0,0.40)', fontSize: 12, lineHeight: 15.2 }}>CELLULAR TECHNOLOGY</Text>
                          <Text style={{ fontFamily: 'roboto-condensed', textTransform: 'capitalize', fontSize: 15 }}>{productDetails?.cellularTechnology || 'N/A'}</Text>
                        </View>
                      </View>
                      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <View style={{ gap: 4, flexBasis: '49%' }}>
                          <Text style={{ fontFamily: 'roboto-condensed', color: 'rgba(0,0,0,0.40)', fontSize: 12, lineHeight: 15.2 }}>CONNECTIVITY TECHNOLOGY</Text>
                          <Text style={{ fontFamily: 'roboto-condensed', textTransform: 'capitalize', fontSize: 15 }}>{productDetails?.os || 'N/A'}</Text>
                        </View>
                        <View style={{ gap: 4, flexBasis: '49%' }}>
                          <Text style={{ fontFamily: 'roboto-condensed', color: 'rgba(0,0,0,0.40)', fontSize: 12, lineHeight: 15.2 }}>SIM CARD</Text>
                          <Text style={{ fontFamily: 'roboto-condensed', textTransform: 'capitalize', fontSize: 15 }}>{productDetails?.connectivityTechnology || 'N/A'}</Text>
                        </View>
                      </View>
                      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <View style={{ gap: 4, flexBasis: '49%' }}>
                          <Text style={{ fontFamily: 'roboto-condensed', color: 'rgba(0,0,0,0.40)', fontSize: 12, lineHeight: 15.2 }}>COLOR</Text>
                          <Text style={{ fontFamily: 'roboto-condensed', textTransform: 'capitalize', fontSize: 15 }}>{productDetails?.color || 'N/A'}</Text>
                        </View>
                        <View style={{ gap: 4, flexBasis: '49%' }}>
                          <Text style={{ fontFamily: 'roboto-condensed', color: 'rgba(0,0,0,0.40)', fontSize: 12, lineHeight: 15.2 }}>IN THE BOX</Text>
                          <Text numberOfLines={1} style={{ fontFamily: 'roboto-condensed', textTransform: 'capitalize', fontSize: 15 }}>{productDetails?.inTheBox || 'N/A'}</Text>
                        </View>
                      </View>
                      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <View style={{ gap: 4, flexBasis: '49%' }}>
                          <Text style={{ fontFamily: 'roboto-condensed', color: 'rgba(0,0,0,0.40)', fontSize: 12, lineHeight: 15.2 }}>DISPLAY SIZE</Text>
                          <Text style={{ fontFamily: 'roboto-condensed', textTransform: 'capitalize', fontSize: 15 }}>{productDetails?.displaySize || 'N/A'}</Text>
                        </View>
                        <View style={{ gap: 4, flexBasis: '49%' }}>
                          <Text style={{ fontFamily: 'roboto-condensed', color: 'rgba(0,0,0,0.40)', fontSize: 12, lineHeight: 15.2 }}>DIMENSION</Text>
                          <Text numberOfLines={1} style={{ fontFamily: 'roboto-condensed', textTransform: 'capitalize', fontSize: 15 }}>{productDetails?.dimensions || 'N/A'}</Text>
                        </View>
                      </View>
                      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <View style={{ gap: 4, flexBasis: '49%' }}>
                          <Text style={{ fontFamily: 'roboto-condensed', color: 'rgba(0,0,0,0.40)', fontSize: 12, lineHeight: 15.2 }}>MEMORY SIZE</Text>
                          <Text style={{ fontFamily: 'roboto-condensed', textTransform: 'capitalize', fontSize: 15 }}>{productDetails?.memorySize || 'N/A'}</Text>
                        </View>
                        <View style={{ gap: 4, flexBasis: '49%' }}>
                          <Text style={{ fontFamily: 'roboto-condensed', color: 'rgba(0,0,0,0.40)', fontSize: 12, lineHeight: 15.2 }}>SERIAL NUMBER</Text>
                          <Text style={{ fontFamily: 'roboto-condensed', textTransform: 'capitalize', fontSize: 15 }}>{productDetails?.serialNumber || 'N/A'}</Text>
                        </View>
                      </View>
                    </View>


                  </View>

                  <View style={{ marginTop: 8, paddingHorizontal: 20, paddingVertical: 15, gap: 8, backgroundColor: '#fff' }}>
                    <Text style={{ fontSize: 13, fontFamily: 'roboto-condensed', color: "rgba(0,0,0,0.70)", fontWeight: "700" }}>Description</Text>
                    <Text numberOfLines={descriptionLength} style={{ fontSize: 13, fontFamily: 'roboto-condensed', color: "rgba(0,0,0,0.70)" }} >{productDetails.description}</Text>
                    {
                      descriptionLength === 100 ?

                        <TouchableOpacity onPress={() => setDescriptionLength(3)} style={{ flexDirection: 'row', alignItems: 'center', gap: 4, alignSelf: 'flex-end' }}>
                          <Text style={{ fontFamily: 'roboto-condensed', fontSize: 12, color: Colors.primary }}>Show Less</Text>
                          <MaterialIcons name='keyboard-arrow-up' color={Colors.primary} size={16} />
                        </TouchableOpacity>

                        :
                        <TouchableOpacity onPress={() => setDescriptionLength(100)} style={{ flexDirection: 'row', alignItems: 'center', gap: 4, alignSelf: 'flex-end' }}>
                          <Text style={{ fontFamily: 'roboto-condensed', fontSize: 12, color: Colors.primary }}>Show More</Text>
                          <MaterialIcons name='keyboard-arrow-down' color={Colors.primary} size={16} />
                        </TouchableOpacity>
                    }
                  </View>

                  <View style={{ marginTop: 8, paddingHorizontal: 20, paddingVertical: 30, gap: 15, backgroundColor: '#fff' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Text style={{ fontSize: 13, fontFamily: 'roboto-condensed', color: "rgba(0,0,0,0.70)", fontWeight: "700" }}>Profile</Text>
                      <TouchableOpacity onPress={() => router.push('/accountScreen/merchantProfile')} style={{ flexDirection: 'row', alignItems: 'center', gap: 4, }}>
                        <Text style={{ fontFamily: 'roboto-condensed', fontSize: 12, color: Colors.primary }}>View Profile</Text>
                        <MaterialIcons name='keyboard-arrow-right' color={Colors.primary} size={16} />
                      </TouchableOpacity>
                    </View>

                    <View style={{ flexDirection: 'row', gap: 10}}>
                      <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }} >
                        <Image source={{ uri: productDetails?.shop.avatar.url }} style={{ width: 60, height: 60, borderRadius: 58, resizeMode: 'contain' }} />
                        <MaterialIcons name="verified" size={18} color="green" style={{ alignSelf: "flex-end", right: 20 }} />
                      </View>
                      <View style={{ gap: 4, justifyContent: "center", alignItems: "center"}}>
                        <Text style={{ flexDirection: 'row', alignItems: 'center', fontFamily: 'roboto-condensed', fontSize: 12, color: 'rgba(0,0,0,0.50)' }}><MaterialCommunityIcons name='clock-outline' size={15} color={"rgba(0,0,0,0.50)"} /> {timeAgo(productDetails?.shop.createdAt)} on Villaja</Text>
                        <Text style={{ fontFamily: 'roboto-condensed-sb', fontSize: 14 }}>{productDetails?.shop.name}</Text>
                      </View>
                    </View>
                  </View>


                  <View style={{ marginTop: 8, paddingHorizontal: 20, paddingVertical: 30, gap: 15, backgroundColor: '#fff' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                      <View>
                        <Text style={{ fontSize: 12, fontFamily: 'roboto-condensed', color: "rgba(0,0,0,0.70)", fontWeight: "700" }}>Product Rating & Review</Text>
                        <Text style={{ fontSize: 12, fontFamily: 'roboto-condensed', color: "rgba(0,0,0,0.70)" }}> <Text style={{ color: '#fc8b00' }}>{productDetails?.ratings} </Text> ({productDetails?.reviews?.length} Review ) </Text>
                      </View>
                      <TouchableOpacity onPress={() => { }} style={{ flexDirection: 'row', alignItems: 'center', gap: 4, }}>
                        <MaterialIcons name='keyboard-arrow-right' color={Colors.grey} size={34} />
                      </TouchableOpacity>
                    </View>

                    {
                      productDetails?.reviews.map((review) =>
                        <Reviews key={review._id} author={review.user.firstname} rating={review.rating} comment={review.comment} createdAt={review.createdAt} />
                      )
                    }


                  </View>

                  <View style={{ marginTop: 8, paddingHorizontal: 20, paddingVertical: 30, gap: 15 }}>
                    <Text style={{ fontSize: 13, fontFamily: 'roboto-condensed', color: "rgba(0,0,0,0.70)", fontWeight: "700" }}>Similar</Text>
                    <View>
                      <SimilarSection category={productDetails?.category} />
                    </View>
                  </View>




                </View>

              </>
            )}
          </>
        )}
      </View>
    </ScrollView>
  );
};

interface reviewProps {
  rating: number,
  comment: string,
  createdAt: string,
  author: string
}

const Reviews = ({ rating, comment, createdAt, author }: reviewProps) => {
  return (
    <View style={{ borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: Colors.grey, paddingVertical: 10, gap: 8 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <View style={{ flexDirection: 'row', gap: 4 }}>
          {
            rating ?
              Array(5).fill(0).map((val, index) => {
                if (index < rating) {
                  return (<FontAwesome key={index} name='star' size={16} color={'#fc8b00'} />)

                }
                return (<FontAwesome key={index} name='star' size={16} color={'rgba(0,0,0,0.10)'} />)

              }
              )
              :

              Array(5).fill(0).map((val, index) => (
                <FontAwesome key={index} name='star' size={16} color={'rgba(0,0,0,0.10)'} />
              ))
          }
        </View>
        <Text>{createdAt.slice(0, 10)}</Text>
      </View>
      <View>
        <Text style={{ fontFamily: 'roboto-condensed' }}>{comment}</Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text style={{ fontFamily: 'roboto-condensed' }}>By {author}</Text>
        <View>
          <Svg width="60" height="10" viewBox="0 0 60 10" fill="none">
            <Path d="M9.00813 5.5554C8.68783 7.15697 7.48027 8.66502 5.78584 9.00199C4.95945 9.16657 4.10219 9.06622 3.33614 8.71524C2.57009 8.36425 1.93429 7.78052 1.51929 7.04716C1.10428 6.31381 0.931218 5.4682 1.02474 4.63077C1.11827 3.79333 1.47361 3.00674 2.04017 2.38301C3.20225 1.10303 5.16445 0.750683 6.76598 1.39131" stroke="#55B30C" stroke-width="0.960932" stroke-linecap="round" stroke-linejoin="round" />
            <Path d="M3.56287 4.91457L5.1644 6.51614L9.00809 2.35205" stroke="#55B30C" stroke-width="0.960932" stroke-linecap="round" stroke-linejoin="round" />
            <Path d="M14.9359 6.65625L15.9954 2.60254H16.8943L15.4075 7.5791H14.7923L14.9359 6.65625ZM14.0096 2.60254L15.0623 6.65625L15.2161 7.5791H14.6009L13.1141 2.60254H14.0096ZM18.4823 7.64746C18.243 7.64746 18.03 7.61214 17.8431 7.5415C17.6563 7.46859 17.4979 7.36149 17.368 7.22021C17.2381 7.07666 17.139 6.9012 17.0706 6.69385C17.0023 6.48421 16.9681 6.24154 16.9681 5.96582V5.61035C16.9681 5.29818 17.0034 5.0293 17.0741 4.80371C17.147 4.57585 17.2472 4.389 17.3748 4.24316C17.5024 4.09733 17.6528 3.9891 17.826 3.91846C18.0015 3.84782 18.1917 3.8125 18.3968 3.8125C18.6292 3.8125 18.8309 3.8501 19.0018 3.92529C19.1727 4.00049 19.3128 4.11328 19.4222 4.26367C19.5339 4.41406 19.6159 4.59977 19.6683 4.8208C19.723 5.04183 19.7503 5.2959 19.7503 5.58301V5.98291H17.3509V5.38135H18.9642V5.2959C18.9596 5.12728 18.9391 4.98258 18.9027 4.86182C18.8662 4.73877 18.807 4.64535 18.7249 4.58154C18.6452 4.51546 18.5347 4.48242 18.3934 4.48242C18.2909 4.48242 18.1997 4.50179 18.12 4.54053C18.0402 4.57926 17.9741 4.64193 17.9217 4.72852C17.8716 4.8151 17.8329 4.93132 17.8055 5.07715C17.7782 5.2207 17.7645 5.39844 17.7645 5.61035V5.96582C17.7645 6.15039 17.7804 6.30648 17.8123 6.43408C17.8465 6.56169 17.8967 6.6665 17.9627 6.74854C18.0288 6.82829 18.1086 6.88753 18.202 6.92627C18.2977 6.96273 18.4082 6.98096 18.5335 6.98096C18.7181 6.98096 18.8765 6.94678 19.0086 6.87842C19.1431 6.80778 19.2593 6.71663 19.3573 6.60498L19.7093 7.09375C19.6432 7.18262 19.5544 7.27035 19.4427 7.35693C19.3311 7.44124 19.1955 7.51074 19.036 7.56543C18.8788 7.62012 18.6942 7.64746 18.4823 7.64746ZM21.0033 4.59521V7.5791H20.2069V3.88086H20.9657L21.0033 4.59521ZM21.8954 3.85693L21.892 4.64307C21.8464 4.63167 21.7974 4.62484 21.745 4.62256C21.6949 4.618 21.6447 4.61572 21.5946 4.61572C21.4852 4.61572 21.3907 4.63509 21.3109 4.67383C21.2312 4.71257 21.1639 4.76839 21.1092 4.84131C21.0546 4.91423 21.0113 5.00195 20.9794 5.10449C20.9497 5.20703 20.9315 5.32324 20.9247 5.45312L20.7538 5.45996C20.7538 5.22754 20.772 5.01221 20.8085 4.81396C20.8449 4.61344 20.8996 4.43913 20.9725 4.29102C21.0477 4.14062 21.1411 4.02327 21.2528 3.93896C21.3645 3.85465 21.4943 3.8125 21.6424 3.8125C21.6835 3.8125 21.7302 3.81706 21.7826 3.82617C21.835 3.83529 21.8726 3.84554 21.8954 3.85693ZM23.1039 3.88086V7.5791H22.3075V3.88086H23.1039ZM22.2665 2.91357C22.2665 2.78597 22.3052 2.68001 22.3827 2.5957C22.4602 2.50911 22.5684 2.46582 22.7074 2.46582C22.8464 2.46582 22.9547 2.50798 23.0321 2.59229C23.1096 2.6766 23.1483 2.78255 23.1483 2.91016C23.1483 3.03548 23.1096 3.1403 23.0321 3.22461C22.9547 3.30892 22.8464 3.35107 22.7074 3.35107C22.5684 3.35107 22.4602 3.30892 22.3827 3.22461C22.3052 3.1403 22.2665 3.03662 22.2665 2.91357ZM24.7533 7.5791H23.957V3.64844C23.957 3.34993 24.0094 3.09701 24.1142 2.88965C24.219 2.68229 24.3705 2.52507 24.5688 2.41797C24.767 2.31087 25.0029 2.25732 25.2763 2.25732C25.4358 2.25732 25.5873 2.27669 25.7309 2.31543C25.8767 2.35417 26.0271 2.40316 26.1821 2.4624L26.059 3.14941C25.9679 3.1084 25.8608 3.0708 25.7377 3.03662C25.617 3.00244 25.4814 2.98535 25.331 2.98535C25.1259 2.98535 24.9778 3.04118 24.8866 3.15283C24.7978 3.26449 24.7533 3.42969 24.7533 3.64844V7.5791ZM25.3378 3.88086V4.49609H23.4921V3.88086H25.3378ZM26.5512 3.88086V7.5791H25.7548V3.88086H26.5512ZM28.6484 7.64746C28.4091 7.64746 28.1961 7.61214 28.0092 7.5415C27.8224 7.46859 27.664 7.36149 27.5341 7.22021C27.4043 7.07666 27.3051 6.9012 27.2368 6.69385C27.1684 6.48421 27.1342 6.24154 27.1342 5.96582V5.61035C27.1342 5.29818 27.1696 5.0293 27.2402 4.80371C27.3131 4.57585 27.4134 4.389 27.541 4.24316C27.6686 4.09733 27.819 3.9891 27.9921 3.91846C28.1676 3.84782 28.3579 3.8125 28.5629 3.8125C28.7954 3.8125 28.997 3.8501 29.1679 3.92529C29.3388 4.00049 29.479 4.11328 29.5883 4.26367C29.7 4.41406 29.782 4.59977 29.8344 4.8208C29.8891 5.04183 29.9165 5.2959 29.9165 5.58301V5.98291H27.517V5.38135H29.1303V5.2959C29.1258 5.12728 29.1053 4.98258 29.0688 4.86182C29.0323 4.73877 28.9731 4.64535 28.8911 4.58154C28.8113 4.51546 28.7008 4.48242 28.5595 4.48242C28.457 4.48242 28.3658 4.50179 28.2861 4.54053C28.2063 4.57926 28.1403 4.64193 28.0878 4.72852C28.0377 4.8151 27.999 4.93132 27.9716 5.07715C27.9443 5.2207 27.9306 5.39844 27.9306 5.61035V5.96582C27.9306 6.15039 27.9466 6.30648 27.9785 6.43408C28.0126 6.56169 28.0628 6.6665 28.1289 6.74854C28.1949 6.82829 28.2747 6.88753 28.3681 6.92627C28.4638 6.96273 28.5743 6.98096 28.6997 6.98096C28.8842 6.98096 29.0426 6.94678 29.1748 6.87842C29.3092 6.80778 29.4254 6.71663 29.5234 6.60498L29.8754 7.09375C29.8094 7.18262 29.7205 7.27035 29.6088 7.35693C29.4972 7.44124 29.3616 7.51074 29.2021 7.56543C29.0449 7.62012 28.8603 7.64746 28.6484 7.64746ZM32.2324 6.80664V2.3291H33.0288V7.5791L32.3076 7.58252L32.2324 6.80664ZM30.2466 5.88037V5.58984C30.2466 5.28678 30.2739 5.02474 30.3286 4.80371C30.3833 4.5804 30.463 4.39469 30.5679 4.24658C30.675 4.09847 30.8037 3.9891 30.9541 3.91846C31.1045 3.84782 31.2742 3.8125 31.4634 3.8125C31.6479 3.8125 31.8074 3.85465 31.9419 3.93896C32.0763 4.021 32.1902 4.13835 32.2837 4.29102C32.3771 4.44368 32.4512 4.62598 32.5058 4.83789C32.5628 5.04753 32.6015 5.28223 32.6221 5.54199V5.94531C32.597 6.19596 32.5571 6.42611 32.5024 6.63574C32.4477 6.8431 32.3737 7.02197 32.2803 7.17236C32.1868 7.32275 32.0718 7.4401 31.935 7.52441C31.8006 7.60645 31.6422 7.64746 31.4599 7.64746C31.2708 7.64746 31.1011 7.60986 30.9507 7.53467C30.8026 7.45947 30.675 7.34782 30.5679 7.19971C30.463 7.0516 30.3833 6.86816 30.3286 6.64941C30.2739 6.42839 30.2466 6.17204 30.2466 5.88037ZM31.043 5.58984V5.88037C31.043 6.0695 31.0543 6.23242 31.0771 6.36914C31.0999 6.50586 31.1364 6.61865 31.1865 6.70752C31.2366 6.79411 31.3027 6.85905 31.3847 6.90234C31.4668 6.94336 31.5659 6.96387 31.6821 6.96387C31.8279 6.96387 31.9464 6.92741 32.0376 6.85449C32.131 6.78158 32.2028 6.68359 32.2529 6.56055C32.3053 6.43522 32.3418 6.29622 32.3623 6.14355V5.34717C32.3509 5.2264 32.3281 5.11475 32.2939 5.01221C32.2597 4.90739 32.2153 4.81624 32.1606 4.73877C32.1059 4.6613 32.0387 4.60091 31.959 4.55762C31.8815 4.51204 31.7903 4.48926 31.6855 4.48926C31.5693 4.48926 31.4702 4.51204 31.3882 4.55762C31.3061 4.60091 31.2401 4.66813 31.1899 4.75928C31.1398 4.84814 31.1022 4.96208 31.0771 5.10107C31.0543 5.23779 31.043 5.40072 31.043 5.58984ZM36.8028 5.7334H35.7535V5.03955H36.8028C36.9759 5.03955 37.1149 5.00309 37.2198 4.93018C37.3246 4.85726 37.4009 4.757 37.4488 4.62939C37.4989 4.50179 37.524 4.3571 37.524 4.19531C37.524 4.04036 37.4989 3.89453 37.4488 3.75781C37.4009 3.62109 37.3246 3.51058 37.2198 3.42627C37.1149 3.34196 36.9759 3.2998 36.8028 3.2998H35.9859V7.5791H35.1587V2.60254H36.8028C37.1332 2.60254 37.4134 2.6709 37.6436 2.80762C37.876 2.94434 38.0537 3.13232 38.1768 3.37158C38.2998 3.60856 38.3614 3.88086 38.3614 4.18848C38.3614 4.50749 38.2998 4.7832 38.1768 5.01562C38.0537 5.24577 37.876 5.4235 37.6436 5.54883C37.4134 5.67188 37.1332 5.7334 36.8028 5.7334ZM40.6739 6.70752V3.88086H41.4703V7.5791H40.7217L40.6739 6.70752ZM40.7867 5.93506L41.0396 5.92822C41.0396 6.17432 41.0168 6.40332 40.9713 6.61523C40.9257 6.82487 40.855 7.00716 40.7593 7.16211C40.6659 7.31478 40.544 7.43441 40.3936 7.521C40.2455 7.60531 40.0666 7.64746 39.857 7.64746C39.7066 7.64746 39.5687 7.62126 39.4434 7.56885C39.3181 7.51644 39.2099 7.43555 39.1187 7.32617C39.0276 7.2168 38.9569 7.07438 38.9068 6.89893C38.8567 6.72347 38.8316 6.51383 38.8316 6.27002V3.88086H39.628V6.27686C39.628 6.40902 39.6394 6.51953 39.6622 6.6084C39.6872 6.69499 39.7191 6.76562 39.7579 6.82031C39.7989 6.87272 39.8445 6.91032 39.8946 6.93311C39.947 6.95361 40.0028 6.96387 40.0621 6.96387C40.2421 6.96387 40.3845 6.91943 40.4893 6.83057C40.5964 6.73942 40.6728 6.61637 40.7183 6.46143C40.7639 6.30648 40.7867 6.13102 40.7867 5.93506ZM42.8805 4.59521V7.5791H42.0841V3.88086H42.8429L42.8805 4.59521ZM43.7726 3.85693L43.7691 4.64307C43.7236 4.63167 43.6746 4.62484 43.6222 4.62256C43.572 4.618 43.5219 4.61572 43.4718 4.61572C43.3624 4.61572 43.2678 4.63509 43.1881 4.67383C43.1083 4.71257 43.0411 4.76839 42.9864 4.84131C42.9317 4.91423 42.8884 5.00195 42.8565 5.10449C42.8269 5.20703 42.8087 5.32324 42.8018 5.45312L42.631 5.45996C42.631 5.22754 42.6492 5.01221 42.6856 4.81396C42.7221 4.61344 42.7768 4.43913 42.8497 4.29102C42.9249 4.14062 43.0183 4.02327 43.13 3.93896C43.2416 3.85465 43.3715 3.8125 43.5196 3.8125C43.5606 3.8125 43.6074 3.81706 43.6598 3.82617C43.7122 3.83529 43.7498 3.84554 43.7726 3.85693ZM45.381 6.98096C45.4835 6.98096 45.5747 6.95931 45.6544 6.91602C45.7364 6.87272 45.8014 6.8055 45.8492 6.71436C45.8971 6.62093 45.9233 6.50016 45.9279 6.35205H46.6764C46.6718 6.6141 46.6114 6.8431 46.4952 7.03906C46.379 7.23275 46.2241 7.38314 46.0304 7.49023C45.839 7.59505 45.6259 7.64746 45.3912 7.64746C45.1474 7.64746 44.9344 7.60872 44.7521 7.53125C44.5721 7.4515 44.4228 7.33643 44.3043 7.18604C44.1858 7.03564 44.097 6.85335 44.0377 6.63916C43.9808 6.42269 43.9523 6.17546 43.9523 5.89746V5.5625C43.9523 5.28678 43.9808 5.04069 44.0377 4.82422C44.097 4.60775 44.1858 4.42432 44.3043 4.27393C44.4228 4.12354 44.5721 4.0096 44.7521 3.93213C44.9321 3.85238 45.144 3.8125 45.3878 3.8125C45.6476 3.8125 45.872 3.86719 46.0612 3.97656C46.2526 4.08366 46.4018 4.24089 46.5089 4.44824C46.616 4.6556 46.6718 4.90967 46.6764 5.21045H45.9279C45.9233 5.05094 45.8994 4.91764 45.8561 4.81055C45.8128 4.70117 45.7513 4.61914 45.6715 4.56445C45.594 4.50977 45.4961 4.48242 45.3776 4.48242C45.2477 4.48242 45.1406 4.50749 45.0563 4.55762C44.9742 4.60547 44.9104 4.67611 44.8649 4.76953C44.8216 4.86296 44.7908 4.97689 44.7726 5.11133C44.7566 5.24349 44.7487 5.39388 44.7487 5.5625V5.89746C44.7487 6.07064 44.7566 6.22445 44.7726 6.35889C44.7885 6.49105 44.8182 6.60384 44.8614 6.69727C44.907 6.79069 44.972 6.86133 45.0563 6.90918C45.1406 6.95703 45.2488 6.98096 45.381 6.98096ZM47.8952 2.3291V7.5791H47.1022V2.3291H47.8952ZM47.755 5.59668H47.5021C47.4998 5.33919 47.5272 5.10221 47.5841 4.88574C47.6411 4.66927 47.7231 4.48014 47.8302 4.31836C47.9373 4.15658 48.0661 4.03239 48.2165 3.9458C48.3691 3.85693 48.5377 3.8125 48.7223 3.8125C48.875 3.8125 49.0128 3.8387 49.1359 3.89111C49.2612 3.94124 49.3683 4.021 49.4572 4.13037C49.5483 4.23975 49.6178 4.3833 49.6657 4.56104C49.7135 4.73649 49.7375 4.95068 49.7375 5.20361V7.5791H48.9411V5.19678C48.9411 5.02132 48.9217 4.88232 48.883 4.77979C48.8465 4.67725 48.7918 4.60319 48.7189 4.55762C48.646 4.51204 48.5537 4.48926 48.442 4.48926C48.3327 4.48926 48.2347 4.51888 48.1481 4.57812C48.0638 4.63509 47.992 4.71484 47.9328 4.81738C47.8735 4.91764 47.8291 5.03499 47.7995 5.16943C47.7698 5.3016 47.755 5.44401 47.755 5.59668ZM52.0637 6.82715V4.98486C52.0637 4.85726 52.0454 4.75472 52.009 4.67725C51.9748 4.59977 51.9235 4.54395 51.8552 4.50977C51.7891 4.47331 51.7059 4.45508 51.6056 4.45508C51.5008 4.45508 51.412 4.47673 51.339 4.52002C51.2684 4.56331 51.2149 4.62256 51.1784 4.69775C51.1419 4.77067 51.1237 4.85498 51.1237 4.95068H50.3273C50.3273 4.80257 50.3569 4.66016 50.4162 4.52344C50.4777 4.38672 50.5654 4.26481 50.6794 4.15771C50.7933 4.05062 50.9312 3.96631 51.0929 3.90479C51.2547 3.84326 51.4347 3.8125 51.633 3.8125C51.87 3.8125 52.0807 3.85238 52.2653 3.93213C52.4499 4.0096 52.5946 4.13607 52.6994 4.31152C52.8065 4.4847 52.86 4.71257 52.86 4.99512V6.72119C52.86 6.89209 52.8703 7.04476 52.8908 7.1792C52.9136 7.31136 52.9443 7.42643 52.9831 7.52441V7.5791H52.173C52.1366 7.49023 52.1092 7.3763 52.091 7.2373C52.0728 7.09831 52.0637 6.96159 52.0637 6.82715ZM52.1696 5.32666L52.173 5.84277H51.7902C51.6763 5.84277 51.5737 5.85872 51.4826 5.89062C51.3915 5.92025 51.314 5.96354 51.2502 6.02051C51.1887 6.0752 51.1408 6.14242 51.1066 6.22217C51.0747 6.30192 51.0588 6.38965 51.0588 6.48535C51.0588 6.60156 51.0747 6.69613 51.1066 6.76904C51.1408 6.84196 51.1898 6.89665 51.2536 6.93311C51.3197 6.96729 51.3994 6.98438 51.4929 6.98438C51.6205 6.98438 51.731 6.95703 51.8244 6.90234C51.9201 6.84538 51.993 6.77702 52.0431 6.69727C52.0956 6.61751 52.1161 6.5446 52.1047 6.47852L52.2858 6.81006C52.2676 6.89665 52.2334 6.98779 52.1833 7.0835C52.1354 7.1792 52.0728 7.27035 51.9953 7.35693C51.9178 7.44352 51.8244 7.51416 51.715 7.56885C51.6056 7.62126 51.4792 7.64746 51.3356 7.64746C51.1283 7.64746 50.9437 7.60417 50.7819 7.51758C50.6201 7.43099 50.4925 7.3068 50.3991 7.14502C50.308 6.98096 50.2624 6.78499 50.2624 6.55713C50.2624 6.37256 50.2931 6.20508 50.3547 6.05469C50.4162 5.9043 50.5073 5.77555 50.6281 5.66846C50.7489 5.55908 50.9004 5.47477 51.0827 5.41553C51.2673 5.35628 51.4826 5.32666 51.7287 5.32666H52.1696ZM55.2067 6.60498C55.2067 6.52751 55.184 6.45915 55.1384 6.3999C55.0951 6.33838 55.0245 6.27799 54.9265 6.21875C54.8285 6.15951 54.6975 6.0957 54.5334 6.02734C54.3625 5.95671 54.211 5.88607 54.0788 5.81543C53.9467 5.74479 53.835 5.66732 53.7439 5.58301C53.6527 5.49642 53.5832 5.3973 53.5354 5.28564C53.4875 5.17399 53.4636 5.04411 53.4636 4.896C53.4636 4.74333 53.4921 4.60205 53.549 4.47217C53.606 4.34229 53.688 4.22835 53.7951 4.13037C53.9022 4.03011 54.031 3.95264 54.1814 3.89795C54.3317 3.84098 54.5015 3.8125 54.6906 3.8125C54.9572 3.8125 55.1851 3.86149 55.3742 3.95947C55.5656 4.05518 55.7115 4.18962 55.8117 4.36279C55.9143 4.53369 55.9655 4.73079 55.9655 4.9541H55.1691C55.1691 4.86068 55.1521 4.77637 55.1179 4.70117C55.0837 4.6237 55.0313 4.56217 54.9607 4.5166C54.89 4.46875 54.8 4.44482 54.6906 4.44482C54.5904 4.44482 54.5061 4.46419 54.4377 4.50293C54.3716 4.53939 54.3215 4.58952 54.2873 4.65332C54.2554 4.71484 54.2395 4.78434 54.2395 4.86182C54.2395 4.91878 54.2497 4.96891 54.2702 5.01221C54.2907 5.0555 54.3249 5.09766 54.3728 5.13867C54.4206 5.17741 54.4844 5.21729 54.5642 5.2583C54.6462 5.29932 54.7499 5.34603 54.8752 5.39844C55.1236 5.49414 55.3298 5.59326 55.4939 5.6958C55.6579 5.79834 55.781 5.91797 55.863 6.05469C55.945 6.19141 55.986 6.36117 55.986 6.56396C55.986 6.72803 55.9553 6.87614 55.8938 7.0083C55.8345 7.14046 55.7479 7.25439 55.634 7.3501C55.5223 7.4458 55.3868 7.51986 55.2273 7.57227C55.07 7.6224 54.8946 7.64746 54.7009 7.64746C54.4115 7.64746 54.1665 7.59049 53.966 7.47656C53.7678 7.36035 53.6174 7.2111 53.5149 7.02881C53.4123 6.84652 53.361 6.65397 53.361 6.45117H54.1301C54.1369 6.59701 54.1677 6.71094 54.2224 6.79297C54.2793 6.875 54.3511 6.93197 54.4377 6.96387C54.5243 6.99349 54.6143 7.0083 54.7077 7.0083C54.8194 7.0083 54.9117 6.99349 54.9846 6.96387C55.0575 6.93197 55.1122 6.88525 55.1486 6.82373C55.1874 6.76221 55.2067 6.68929 55.2067 6.60498ZM57.9123 7.64746C57.6731 7.64746 57.46 7.61214 57.2732 7.5415C57.0863 7.46859 56.928 7.36149 56.7981 7.22021C56.6682 7.07666 56.5691 6.9012 56.5007 6.69385C56.4324 6.48421 56.3982 6.24154 56.3982 5.96582V5.61035C56.3982 5.29818 56.4335 5.0293 56.5041 4.80371C56.5771 4.57585 56.6773 4.389 56.8049 4.24316C56.9325 4.09733 57.0829 3.9891 57.2561 3.91846C57.4315 3.84782 57.6218 3.8125 57.8269 3.8125C58.0593 3.8125 58.261 3.8501 58.4319 3.92529C58.6028 4.00049 58.7429 4.11328 58.8523 4.26367C58.9639 4.41406 59.046 4.59977 59.0984 4.8208C59.1531 5.04183 59.1804 5.2959 59.1804 5.58301V5.98291H56.781V5.38135H58.3943V5.2959C58.3897 5.12728 58.3692 4.98258 58.3327 4.86182C58.2963 4.73877 58.237 4.64535 58.155 4.58154C58.0753 4.51546 57.9647 4.48242 57.8235 4.48242C57.7209 4.48242 57.6298 4.50179 57.55 4.54053C57.4703 4.57926 57.4042 4.64193 57.3518 4.72852C57.3017 4.8151 57.2629 4.93132 57.2356 5.07715C57.2082 5.2207 57.1946 5.39844 57.1946 5.61035V5.96582C57.1946 6.15039 57.2105 6.30648 57.2424 6.43408C57.2766 6.56169 57.3267 6.6665 57.3928 6.74854C57.4589 6.82829 57.5386 6.88753 57.6321 6.92627C57.7278 6.96273 57.8383 6.98096 57.9636 6.98096C58.1482 6.98096 58.3065 6.94678 58.4387 6.87842C58.5731 6.80778 58.6894 6.71663 58.7873 6.60498L59.1394 7.09375C59.0733 7.18262 58.9844 7.27035 58.8728 7.35693C58.7611 7.44124 58.6256 7.51074 58.466 7.56543C58.3088 7.62012 58.1243 7.64746 57.9123 7.64746Z" fill="#55B30C" />
          </Svg>

        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor:"#fff"
    // backgroundColor:'red',

  },
  loadingIndicator: {
    marginTop: 16,
  },
  image: {
    width: '100%',
    height: 321,
    resizeMode: 'contain',
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 15,
    fontFamily: 'roboto-condensed',
    textTransform: 'capitalize',
    color: '#00000090',
    fontWeight: "500"
  },
  description: {
    fontSize: 16,
    marginVertical: 8,
  },
  price: {
    fontSize: 30,
    color: Colors.primary,
    fontFamily: 'roboto-condensed-sb',
    letterSpacing: 1,
    paddingVertical: 8
  },
  shopName: {
    fontSize: 16,
    color: '#3498db',
    marginTop: 8,
  },
  smallImagesContainer: {
    marginTop: 16,
  },
  smallImage: {
    width: 60,
    height: 60,
    resizeMode: 'cover',
    borderRadius: 8,
    marginRight: 8,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default Page;
