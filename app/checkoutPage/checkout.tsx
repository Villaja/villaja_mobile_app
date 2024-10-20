import { View, Text, ScrollView, StyleSheet, Alert, Modal, ActivityIndicator, Dimensions, TouchableOpacity, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { defaultStyles } from '../../constants/Styles'
import Colors from '../../constants/Colors'
import Svg, { Path } from 'react-native-svg'
import { AntDesign, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import OrderHistoryCard from '../../components/OrderHistoryCard'
import CheckoutProductCard from '../../components/CheckoutProductCard'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Product } from '../../types/Product'
import { useAuth } from '../../context/AuthContext'
import axios from 'axios'
import  { Paystack }  from 'react-native-paystack-webview';
import { useRouter } from 'expo-router'
import { base_url } from '../../constants/server';
import LottieView from "lottie-react-native";



const checkout = () => {

    const [total,setTotal] = useState<number>(0)
    const [cart,setCart] = useState<Product[]>([])
    const [savedCart,setSavedCart] = useState<Product[]>([])
    const [showPaystack, setShowPaystack] = useState(false);
    const [checkoutModal,setCheckoutModal] = useState(false)
    const [orderSuccessModal, setOrderSuccessModal] = useState(false);
    const [promoCode, setPromoCode] = useState('');
    const [newPromoPrice, setNewPromoPrice] = useState<number | undefined>(undefined); 
    const [promoApplied, setPromoApplied] = useState(false);
    const [promoExpiry, setPromoExpiry] = useState<number | null>(null);
    const [promoInputModal, setPromoInputModal] = useState(false);
    const [token, setToken] = useState<string>();
    const [country, setCountry] = useState("");
    const [state, setState] = useState("");
    const [address1, setAddress1] = useState("");
    const router = useRouter()
    const { user } = useAuth();
    const {height, width} = Dimensions.get('window');


    useEffect(() => {
      const fetchData = async () => {
          const storedToken = await AsyncStorage.getItem('token');
          

          if (user) {
              // Fetch user details
              axios.get(`${base_url}/user/getuser`, {
                  headers: {
                      Authorization: storedToken
                  }
              })
                  .then(response => {
                      const userData = response.data.user;
                      setCountry(userData.addresses[0]?.country)
                      setState(userData.addresses[0]?.city);
                      setAddress1(userData.addresses[0]?.address1);
                  })
                  .catch(error => {
                      console.error('Error fetching user details:', error);
                  });
          }
      };

      fetchData();
  }, [user]);
    

    const handleGetCart = async () => {
        await AsyncStorage.getItem('cart', (err, result) => {
          const cart = JSON.parse(result!).filter((item:any) => !item.isSavedForLater);
          setSavedCart(JSON.parse(result!).filter((item:any) => item.isSavedForLater))
          const total = cart.reduce((a: number, b: Product) => {
            return a + (b.discountPrice > 0 ? b.discountPrice : b.originalPrice);
          }, 0);
          
          setCart(cart);
          setNewPromoPrice(total);

        });
    };
    
      useEffect(() => {
        handleGetCart();
      }, []);

      console.log(cart);

  //Product Promo functionality
  const validPromoCode = 'VJPR1024';
  const promoAmount = 10000;

  // Fetch login time from AsyncStorage and set promo expiry time
  useEffect(() => {
    const fetchLoginTime = async () => {
      const loginTime = await AsyncStorage.getItem('loginTime');
      setPromoExpiry(JSON.parse(loginTime!))
    };

    fetchLoginTime();
  }, []);

  const applyPromoCode = () => {
    if (promoCode === validPromoCode) {
      if (Date.now() < promoExpiry!) {
        {/** subtract product price from promo price and add delivery fees of 2650 */ }
        setNewPromoPrice(newPromoPrice! - promoAmount + 2650);
        setPromoApplied(true);
        setPromoInputModal(false);
        Alert.alert('Success', 'Promo code accepted!!!')
      } else {
        Alert.alert('Error', 'Promo code has expired.');
      }
    } else {
      Alert.alert('Failed', 'Invalid promo code')
    }
  };

 

  const proceedToPayment = () => {
    if (address1 != undefined) {
      setShowPaystack(true); 
    } else {
      Alert.alert('No Address Found!!!', 'Please enter your address before placing an order')
    }
  };

  console.log(user?.user.firstname)
  console.log(newPromoPrice)

  const onPaystackSuccess = async (response: any) => {
    // Handle successful payment
    setShowPaystack(false);

    const order = {
      cart: cart,
      shippingAddress: {
        address: address1,
        city: state,
        country: country
      }, // Replace with actual address
      user: user && user?.user,
      totalPrice: promoApplied? newPromoPrice! : newPromoPrice! + 2650  ,
    };

        // Add paymentInfo dynamically
        (order as any)['paymentInfo'] = {
            id: response.reference,
            status: 'succeeded',
            type: 'Paystack',
          };
    
        // Make a POST request to create the order
        try {
          const config = {
            headers: {
              'Content-Type': 'application/json',
              
            },
          };

          setCheckoutModal(true)
    
          // Make a POST request to create the order
          const createOrderResponse = await axios.post(`${base_url}/order/create-order`, order, config);
    
          if (createOrderResponse.data.success) {
            // Order created successfully
            setCheckoutModal(false);
            setOrderSuccessModal(true);
            // toast.success('Order successful!');
            console.log("order succeeded")
            await AsyncStorage.setItem('cart',JSON.stringify(savedCart));
          } else {
            console.error('Failed to create order');
          }
        } catch (error) {
          console.error('Error creating order:', error);
        }
      };
    
      const onPaystackClose = () => {
        // Handle when Paystack modal is closed
        setShowPaystack(false);
        Alert.alert('Payment Cancelled', 'Your progress would be lost.');
      };
    


  return (
    <View style={{flex:1,backgroundColor:Colors.primaryUltraTransparent,paddingBottom:100}}>

      <Modal
        animationType="fade"
        transparent={true}
        visible={checkoutModal}
        presentationStyle='overFullScreen'
        >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <ActivityIndicator size={'small'} color={Colors.primary} />
          </View>
        </View>
      </Modal>

      <Modal
        animationType='fade'
        transparent={true}
        visible={orderSuccessModal}
        onRequestClose={() => setOrderSuccessModal(false)}
      >
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          margin: 0
        }}>
          <View style={{
            backgroundColor: '#fff',
            margin: 20,
            width: '90%',
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,

          }}>
            <LottieView source={require('../../assets/images/order-success.json')} autoPlay loop={false} style={{ width: 200, height: 200 }} />
            <Text style={{
              fontSize: 18,
              fontWeight: '500',
              marginBottom: 20,
            }}>Your order was successful!</Text>
            <TouchableOpacity onPress={() => router.replace('/cartScreen/cart') } style={{
              backgroundColor: '#025492',
              paddingVertical: 15,
              paddingHorizontal: 30,
              borderRadius: 10,
              marginBottom: 50
            }}>
              <Text style={{
                color: '#fff',
                fontSize: 14,
                fontWeight: '500',
              }}>Check Your Order
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        animationType='fade'
        transparent={true}
        visible={promoInputModal}
        onRequestClose={() => setPromoInputModal(false)}
      >
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          margin: 0
        }}>
          <View style={{
            backgroundColor: '#fff',
            margin: 20,
            width: '90%',
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,

          }}>
            <LottieView source={require('../../assets/images/voucher2.json')} autoPlay loop={false} style={{ width: 100, height: 100, marginTop: 30, marginBottom: 50 }}  />
            <Text style={{
              fontSize: 18,
              fontWeight: '500',
              marginBottom: 20,
            }}>Enter Promo Code Here!</Text>
            <TextInput placeholder='Enter code here' placeholderTextColor={"#00000080"} value={promoCode} onChangeText={setPromoCode} editable={!promoApplied} style={{backgroundColor: '#00000005', borderColor: "#025492",  height: 45, width: width - 100, borderRadius: 5, fontSize: 14, marginHorizontal: 50, marginBottom: 30, color: "#000000", paddingLeft: 10, borderBottomWidth: 1}} />
            <TouchableOpacity onPress={applyPromoCode} disabled={promoApplied} style={{
              backgroundColor: '#025492',
              paddingVertical: 15,
              paddingHorizontal: 87,
              borderRadius: 5,
              marginBottom: 10
            }}>
              <Text style={{
                color: '#fff',
                fontSize: 13,
                fontWeight: '500',
              }}>Apply Voucher
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setPromoInputModal(false)} style={{
              backgroundColor: Colors.redTransparent,
              paddingVertical: 15,
              paddingHorizontal: 110,
              borderRadius: 5,
              marginBottom: 50
            }}>
              <Text style={{
                color: Colors.red,
                fontSize: 13,
                fontWeight: '500',
              }}>Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>


    <ScrollView style={{flex:1,backgroundColor:Colors.primaryUltraTransparent,paddingVertical:4,}}>
      <View style={styles.orderSummaryContainer}>
        <Text 
            style={{fontFamily:'roboto-condensed-sb',
            color:'rgba(0,0,0,0.70)',
            fontSize:16, fontWeight: '500'}}
        >Order Summary</Text>
        <View style={styles.orderSummarySection}>
            <Text style={styles.orderSummaryText}>Price</Text>
            <Text style={styles.orderSummaryPrice}>₦{(newPromoPrice ?? 0).toLocaleString()}</Text>
        </View>
        <View style={styles.orderSummarySection}>
            <Text style={styles.orderSummaryText}>Delivery Fee</Text>
            <Text style={styles.orderSummaryPrice}>₦2,650</Text>
        </View>
        <View style={[styles.orderSummarySection,{paddingVertical:8}]}>
            <Text style={[styles.orderSummaryText,{fontSize:18}]}>Total</Text>
            {
              promoApplied ? (
                <Text style={[styles.orderSummaryText,{color:Colors.primary,fontSize:18}]}>₦{(newPromoPrice!).toLocaleString()}</Text>
              ) : (
                <Text style={[styles.orderSummaryText,{color:Colors.primary,fontSize:18}]}>₦{(((newPromoPrice ?? 0) + 2650).toLocaleString())}</Text>
              )
            }
        </View>
      </View>

      <View>
        
        <TouchableOpacity style={styles.promoCodeSection}>
            <Svg  width="20" height="20" viewBox="0 0 20 20" fill="none">
                <Path d="M17.7492 8.1625C18.0316 8.10505 18.2854 7.95182 18.4678 7.72874C18.6501 7.50566 18.7498 7.22642 18.75 6.93828V5C18.75 4.66848 18.6183 4.35054 18.3839 4.11612C18.1495 3.8817 17.8315 3.75 17.5 3.75H2.5C2.16848 3.75 1.85054 3.8817 1.61612 4.11612C1.3817 4.35054 1.25 4.66848 1.25 5V6.93828C1.25016 7.22642 1.34986 7.50566 1.53223 7.72874C1.71459 7.95182 1.96843 8.10505 2.25078 8.1625C2.67298 8.25005 3.05209 8.48044 3.32427 8.81485C3.59644 9.14926 3.74505 9.56726 3.74505 9.99844C3.74505 10.4296 3.59644 10.8476 3.32427 11.182C3.05209 11.5164 2.67298 11.7468 2.25078 11.8344C1.9679 11.8919 1.71366 12.0456 1.53124 12.2693C1.34881 12.4931 1.24944 12.773 1.25 13.0617V15C1.25 15.3315 1.3817 15.6495 1.61612 15.8839C1.85054 16.1183 2.16848 16.25 2.5 16.25H17.5C17.8315 16.25 18.1495 16.1183 18.3839 15.8839C18.6183 15.6495 18.75 15.3315 18.75 15V13.0617C18.7498 12.7736 18.6501 12.4943 18.4678 12.2713C18.2854 12.0482 18.0316 11.8949 17.7492 11.8375C17.327 11.7499 16.9479 11.5196 16.6757 11.1851C16.4036 10.8507 16.255 10.4327 16.255 10.0016C16.255 9.57039 16.4036 9.15239 16.6757 8.81798C16.9479 8.48357 17.327 8.25318 17.7492 8.16562V8.1625ZM2.5 13.0625C3.20601 12.9187 3.84064 12.5353 4.29644 11.9773C4.75224 11.4193 5.00121 10.7209 5.00121 10.0004C5.00121 9.27988 4.75224 8.5815 4.29644 8.02349C3.84064 7.46547 3.20601 7.0821 2.5 6.93828V5H6.875V15H2.5V13.0625ZM17.5 13.0625V15H8.125V5H17.5V6.9375C16.794 7.08132 16.1594 7.46469 15.7036 8.02271C15.2478 8.58072 14.9988 9.2791 14.9988 9.99961C14.9988 10.7201 15.2478 11.4185 15.7036 11.9765C16.1594 12.5345 16.794 12.9179 17.5 13.0617V13.0625Z" fill="#9E4AE0"/>
            </Svg>
            <TouchableOpacity onPress={() => setPromoInputModal(true)} >
              <Text style={styles.promoCodeText}>Use Promo Code</Text>
            </TouchableOpacity>
        </TouchableOpacity>
      </View>

      <View style={styles.addressContainer}>
        <View style={styles.addressHeader}>
            <Text style={styles.addressHeaderText}>Address</Text>
            <TouchableOpacity style={styles.changeLocationBtn} onPress={()=> router.push('/accountScreen/account')}>
                <Text style={styles.changeLocationText}>Change Location</Text>
                <MaterialIcons name='keyboard-arrow-down' color={Colors.primary} size={15} />
            </TouchableOpacity>
        </View>

        <View style={styles.addressContentSection}>
            <Ionicons name="location-outline" size={24} color={"#68e349"} />
            {
              address1 != undefined ? (
                <Text style={styles.addressContentText} numberOfLines={1}>
                  {address1}
                </Text>
              ) : (
                <Text style={{
                  fontFamily: 'roboto-condensed',
                  fontSize: 15,
                  color: 'rgba(0,0,0,0.50)',
                  flexShrink: 1, alignSelf: 'center'
                }} >No address found</Text>
              )
            }
          </View>
      </View>

      <View style={{backgroundColor:'#fff',marginBottom:4,paddingHorizontal:20,paddingVertical:10}}>
        <Text style={styles.addressHeaderText} >Products</Text>
      </View>

      <View>
         {
          cart && cart.length > 0 && cart.map((item) => (
            <CheckoutProductCard key={item._id}  {...item} />
          ))
        }
      </View>
    </ScrollView>

    <View style={{ position: 'absolute', bottom: 0, right: 0, left: 0, padding: 20, backgroundColor: '#fff' }}>
          <TouchableOpacity style={defaultStyles.btn} onPress={proceedToPayment}>
            <Text style={defaultStyles.btnText}>Proceed To Payment</Text>
          </TouchableOpacity>
     </View>


     {showPaystack && (
        <Paystack  
        paystackKey="pk_live_f5d8cd9c059579b4592ba6b28e9090d9bd887438"
        amount={promoApplied? newPromoPrice! : newPromoPrice! + 2650} 
        billingEmail={user?.user.email}
        billingName={`${user?.user.firstname} ${user?.user.lastname}`}
        onSuccess={onPaystackSuccess}
        onCancel={onPaystackClose}
        activityIndicatorColor="green"
        autoStart={true}
        channels={['bank', 'card', 'mobile_money', 'qr', 'ussd']}
      />
      )}
    </View>

  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 22,
    backgroundColor:'rgba(0,0,0,0.20)'
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
        fontSize:16
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
        fontSize:16
    }

})

export default checkout