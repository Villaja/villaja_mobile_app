import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Alert, SafeAreaView, Image, Dimensions, TouchableOpacity, TextInput } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'expo-router'
import { ScrollView } from 'react-native-gesture-handler';
import { base_url } from '../../constants/server';
import { usePushNotifications } from "../usePushNotifications";
import { defaultStyles } from '../../constants/Styles';
import { useOrders } from "../../context/OrderContext"
import axios from 'axios';
import LottieView from "lottie-react-native";
import Colors from '../../constants/Colors';
import StarRating from '../../components/StarRating';

const statusColor = new Map([
  ['delivered', 'green'],
  ['cancelled', 'red'],
  ['processing', 'orange']
])



const Page = () => {
  const router = useRouter();
  const { width } = Dimensions.get('window')
  const { id, index } = useLocalSearchParams<{ id: string; index: string }>();
  const { user } = useAuth();
  const { submitOrderApproval, message, loading, success, clearMessage } = useOrders()
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [pageLoading, setPageLoading] = useState(true);
  const { notification } = usePushNotifications();
  const [approvalStatus, setApprovalStatus] = useState("Pending");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  console.log(notification)


  const userid = user?.user._id

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        if (user) {
          const response = await axios.get(`${base_url}/order/get-all-orders/${userid}`);
          if (response.data.success && response.data.orders.length > 0) {
            const specificOrder = response.data.orders.find((order: any) => order._id === id);
            if (specificOrder) {
              setOrderDetails(specificOrder);
            } else {
              console.error('Order not found');
            }
          } else {
            console.error('Failed to fetch orders');
          }
        }

        else {
          router.replace("/(modals)/login")
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setPageLoading(false);
      }
    };

    fetchOrderDetails();
  }, [id, success]);

  useEffect(() => {
    if (success === 1) {
      setRating(1);
      setApprovalStatus("Pending");
      setComment("");
      Alert.alert("Success", message);
      clearMessage();
    } else if (success === 0) {
      Alert.alert("Error", message);
      clearMessage();
    }
  }, [success])

  console.log(orderDetails);

  const orderId = orderDetails?._id;
  const productId = orderDetails?.cart[parseInt(index) || 0]?._id;
  console.log(orderId);
  console.log(productId);


  const submitReview = () => {
    if (rating === 0) {
      Alert.alert("Error", "Please rate the product");
    } else if (approvalStatus === "Pending") {
      Alert.alert("Error", "Please approve or reject the product");
    } else if (comment === "") {
      Alert.alert("Error", "Please leave a comment");
    } else {
      submitOrderApproval(orderId, productId, approvalStatus, rating, comment);
    }
  };

  const handleOrderStatusImage = () => {
    if (orderDetails.status === "Processing") {
      return require('../../assets/images/track-order.png')
    } else if (orderDetails.status === "Ready To Ship") {
      return require('../../assets/images/track-order2.png')
    } else if (orderDetails.status === "Delivered") {
      return require('../../assets/images/track-order3.png')
    }
  };

  const sendMessage = async() => {
    try {
      if (orderDetails.cart[parseInt(index) || 0].approvalStatus === "Declined") {
        const groupTitle = orderDetails.cart[parseInt(index) || 0]._id + userid;
        const userId = userid;
        const sellerId = orderDetails.cart[parseInt(index) || 0].shop._id;
        const response = await axios.post(`${base_url}/conversation/create-new-conversation`,
          {
            groupTitle,
            userId,
            sellerId,
          }
        );
        if (response.data.success) {
          router.push({ pathname: `/userNotificationsTabs/${response.data.conversation._id}` });
          console.log('conversation created');
        } else {
          console.log('an error occurred')
        }
      } 
    } catch (error) {
      console.log(error)
    }
  };

  const handleReviewDisplayLogic = () => {
    if (orderDetails.cart[parseInt(index) || 0].approvalStatus === "Pending") {
      return (
        <View style={styles.reviewTextContainer} >
          <Text style={styles.reviewTitle} >Approve Product Delivery</Text>
          <Text style={styles.reviewText} >Please confirm that what you ordered is what you got. This is needed to give final approval of the delivery.</Text>
          <View style={styles.reviewButtonContainer} >
            <TouchableOpacity style={[defaultStyles.btn, { backgroundColor: approvalStatus === "Approved" ? Colors.primary : "transparent", borderColor: Colors.primary, borderWidth: 1, width: "45%" }]} onPress={() => setApprovalStatus("Approved")}>
              <Text style={[defaultStyles.btnText, { color: approvalStatus === "Approved" ? "#fff" : Colors.primary }]} >Approve</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[defaultStyles.btn, { backgroundColor: approvalStatus === "Declined" ? Colors.red : "transparent", borderColor: Colors.red, borderWidth: 1, width: "45%" }]} onPress={() => setApprovalStatus("Declined")}>
              <Text style={[defaultStyles.btnText, { color: approvalStatus === "Declined" ? "#fff" : Colors.red }]} >Reject</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.reviewProductContainer} >
            <Text style={styles.reviewProductText} >Rate Product</Text>
            <View style={{ marginTop: 10 }} >
              <StarRating starLength={5} color="gold" size={26} disabled={false} starStyle={{ flexDirection: "row", alignItems: "center", gap: 2 }} starTextStyle={{ color: "#000000" }} messages={["Terrible", "Bad", "Okay", "Good", "Amazing"]} defaultRating={rating} newRating={(rating) => setRating(rating)} />
            </View>
          </View>
          <View style={{ marginTop: 20, marginBottom: 25 }} >
            <Text style={styles.reviewCommentText} >Comment</Text>
            <View style={styles.reviewCommentInput} >
              <TextInput multiline={true} style={{ marginTop: 3, paddingHorizontal: 9, fontSize: 12 }} placeholder='Leave a comment' value={comment} onChangeText={(text) => setComment(text)} />
            </View>
          </View>
          <TouchableOpacity style={[defaultStyles.btn, { backgroundColor: Colors.primary, width: "100%", marginBottom: 40 }]} onPress={submitReview} >
            <Text style={[defaultStyles.btnText, { color: "#fff" }]} >{loading ? "Submitting..." : "Submit"}</Text>
          </TouchableOpacity>
        </View>
      )
    } else if (orderDetails.cart[parseInt(index) || 0].approvalStatus === "Approved") {
      return (
        <TouchableOpacity style={[defaultStyles.btn, { backgroundColor: Colors.grey, width: "100%", marginBottom: 40 }]} >
          <Text style={[defaultStyles.btnText, { color: "#fff" }]} >Product Reviewed</Text>
        </TouchableOpacity>
      )
    } else if (orderDetails.cart[parseInt(index) || 0].approvalStatus === "Declined") {
      return (
        <View>
          <Text style={{ fontSize: 13, fontWeight: '500', color: "#00000050",  maxWidth: "100%" }} >You have rejected this product and an order issue ticket has been raised, the seller has been informed of this order issue and will be in touch shortly or you can message them directly. Our order fulfillment team will also be in touch shortly to resolve this issue.</Text>
          <TouchableOpacity onPress={sendMessage} style={[defaultStyles.btn, { backgroundColor: Colors.red, width: "100%", marginBottom: 20, marginTop: 20 }]} >
            <Text style={[defaultStyles.btnText, { color: "#fff" }]} >Message Seller</Text>
          </TouchableOpacity>
        </View>
      )
    }
  }


  return (

    <View style={styles.parentContainer}>
      {pageLoading ? (
        <ActivityIndicator size="large" color="#025492" />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
          <View style={{ paddingHorizontal: 20 }} >
            <Image source={require('../../assets/images/amico.png')} style={{ height: 240, width: 290, marginTop: 65, alignSelf: "center", marginBottom: 23 }} />
          </View>
          {
            orderDetails ? (
              <View>
                <View style={{ alignItems: 'center', marginBottom: 10 }} >
                  <Image source={handleOrderStatusImage()} resizeMode='contain' style={{ height: 209, width: width }} />
                  <View style={{ justifyContent: "center", alignItems: 'center', position: 'absolute', top: 20, gap: 10 }} >
                    <Text numberOfLines={1} style={{ fontSize: 13, color: '#00000080', fontWeight: '500' }}>{orderDetails.cart[parseInt(index) || 0].name}</Text>
                    <Text style={{ fontSize: 16, fontWeight: '500' }} >₦{orderDetails.cart[parseInt(index) || 0].discountPrice === 0 || orderDetails.cart[parseInt(index) || 0].discountPrice === null ? orderDetails.cart[parseInt(index) || 0].originalPrice?.toLocaleString() : orderDetails.cart[parseInt(index) || 0].discountPrice?.toLocaleString()}</Text>
                  </View>
                </View>
                <View style={{ paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }} >
                  <View>
                    <Text style={{ fontSize: 13, color: '#00000080' }} >Order Id</Text>
                    <Text style={{ fontSize: 14, fontWeight: '700', color: '#00000099', width: 110 }} >{id}</Text>
                  </View>
                  <View>
                    <Text style={{ fontSize: 13, color: '#00000080' }} >Order Status</Text>
                    <Text style={{ fontSize: 14, fontWeight: '700', color: statusColor.get(orderDetails.status.toLowerCase()) }} >{orderDetails.status}</Text>
                  </View>
                </View>
                <View style={{ paddingHorizontal: 20 }} >
                  <View style={{ justifyContent: 'center', alignItems: 'center', marginVertical: 10 }}>
                    {
                      orderDetails.status === "Processing" && (
                        <Text style={{ fontSize: 12, fontWeight: '700', color: '#00000099', textAlign: 'center', maxWidth: 200 }} >You would receive an email progress alert once it is on its way</Text>
                      )
                    }
                    {
                      orderDetails.status === "Ready To Ship" && (
                        <Text style={{ fontSize: 12, fontWeight: '700', color: '#00000099', textAlign: 'center', maxWidth: 200 }} >Your order has been packed and is on its way</Text>
                      )
                    }
                    {
                      orderDetails.status === "Cancelled" && (
                        <Text style={{ fontSize: 12, fontWeight: '700', color: '#00000099', textAlign: 'center', maxWidth: 200 }} >Your order has been cancelled</Text>
                      )
                    }
                  </View>
                  {
                    orderDetails.status === "Delivered" && (
                      handleReviewDisplayLogic()
                    )
                  }
                </View>
              </View>
            ) : (
              <View>
                <View style={{ justifyContent: "center", alignItems: "center" }} >
                  <LottieView
                    source={require('../../assets/images/no-result.json')}
                    autoPlay
                    loop
                    style={{ height: 200, width: 200 }}
                  />
                  <Text style={{ fontFamily: 'roboto-condensed-sb', fontSize: 20, color: "#02549296", textAlign: 'center' }}>No Orders Found</Text>
                </View>
              </View>
            )
          }
        </ScrollView >
      )}
    </View >

  );
};

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  reviewTextContainer: {
    width: "100%"
  },
  reviewTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: "#000000",
  },
  reviewText: {
    fontSize: 13,
    fontWeight: '500',
    color: "#00000050",
  },
  reviewButtonContainer: {
    marginTop: 20,
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-between"
  },
  reviewProductContainer: {
    marginTop: 20,
  },
  reviewProductText: {
    fontSize: 16,
    fontWeight: '500',
    color: "#000000",
  },
  reviewCommentText: {
    fontSize: 16,
    fontWeight: '500',
    color: "#000000",
  },
  reviewCommentInput: {
    borderWidth: 1,
    height: 115,
    top: 5,
    borderColor: "#0000001A",
    borderRadius: 5,
    backgroundColor: "#00000005",
  },
});

export default Page;
