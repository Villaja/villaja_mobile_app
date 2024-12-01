import { View, ScrollView, Text, Modal, StyleSheet, Image, Dimensions, TouchableOpacity, TextInput, Alert, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { useOrders } from '../../context/OrderContext';
import { useFocusEffect } from '@react-navigation/native';
import OrderedProductsCard from '../../components/OrderedProductsCard';
import Colors from '../../constants/Colors';
import { CartItem } from "../../types/Order";
import StarRating from '../../components/StarRating';
import { defaultStyles } from "../../constants/Styles"


const { width } = Dimensions.get('window')

const Page: React.FC = () => {
  const { id } = useLocalSearchParams();
  const { getOrderById, singleOrder, submitOrderApproval, message, loading, success, clearMessage } = useOrders();
  const [openReviewModal, setOpenReviewModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<CartItem | null>(null);
  const [rating, setRating] = useState(0);
  const [approvalStatus, setApprovalStatus] = useState("Pending");
  const [comment, setComment] = useState("");


  useFocusEffect(
    React.useCallback(() => {
      getOrderById(id as string);
    }, [id, success])
  );

  useEffect(() => {
    if (openReviewModal === false) {
      setApprovalStatus("Pending");
      setRating(1);
      setComment("");
    }
  }, [openReviewModal]);

  useEffect(() => {
    if (success === 1) {
      setRating(1);
      setApprovalStatus("Pending");
      setComment("");
      setOpenReviewModal(false);
      Alert.alert("Success", message);
      clearMessage();
    } else if (success === 0) {
      Alert.alert("Error", message);
      clearMessage();
    }
  }, [success])

  const cart = singleOrder?.order?.cart;
  const displayableStatus = singleOrder?.order?.status;

  const sendOrderApprovalAndReview = (productId: string) => {
    setOpenReviewModal(true);
    const product = cart?.find((item: any) => item._id === productId);
    setCurrentProduct(product)
  };


  const handleSubmit = () => {
    if (rating === 0) {
      Alert.alert("Please rate the product");
    } else if (approvalStatus === "Pending") {
      Alert.alert("Please approve or reject the product");
    } else if (comment === "") {
      Alert.alert("Please leave a comment");
    } else {
      console.log(id, currentProduct?._id, approvalStatus, rating, comment)
      submitOrderApproval(id as string, currentProduct?._id, approvalStatus, rating, comment);
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={[styles.topContainer, loading ? { justifyContent: "center", alignItems: "center" } : {}]}>
      {
        loading ? (
          <ActivityIndicator size="large" color={Colors.primary} />
        ) : (
          <ScrollView showsVerticalScrollIndicator={false} >

            {cart?.map((item: any, index: number) => (
              <OrderedProductsCard key={index} item={item} index={index} orderId={id as string} status={displayableStatus} sendOrderApprovalAndReview={sendOrderApprovalAndReview} />
            ))}
            <View style={styles.centeredView} >
              <Modal visible={openReviewModal} transparent={true} animationType="fade" onRequestClose={() => setOpenReviewModal(false)} >
                <View style={styles.centeredView} >
                  <View style={styles.modalView} >
                    <ScrollView showsVerticalScrollIndicator={false} >
                      <View style={styles.modalProductContainer} >
                        <Image source={{ uri: currentProduct?.colorList[0]?.images[0]?.url }} style={styles.modalImage} />
                        <Text numberOfLines={1} style={styles.modalProductName} >{currentProduct?.name}</Text>
                        <Text style={styles.modalProductPrice} >
                          ₦{(currentProduct?.discountPrice === 0 || currentProduct?.discountPrice === null
                            ? currentProduct?.originalPrice?.toLocaleString()
                            : currentProduct?.discountPrice?.toLocaleString())}
                        </Text>
                        <Text style={styles.modalProductDiscount}>
                          {currentProduct?.discountPrice !== 0 && currentProduct?.discountPrice !== null
                            ? '₦' + (currentProduct?.originalPrice?.toLocaleString() || '')
                            : null}
                        </Text>
                        <Text style={styles.modalProductOwner} >Order Id: {singleOrder?.order?._id}</Text>
                      </View>
                      <View style={styles.modalReviewTextContainer} >
                        <Text style={styles.modalReviewTitle} >Approve Delivery</Text>
                        <Text style={styles.modalReviewText} >Please confirm that what you ordered is what you got. This is needed to give final approval of the delivery.</Text>
                        <View style={styles.modalReviewButtonContainer} >
                          <TouchableOpacity style={[defaultStyles.btn, { backgroundColor: approvalStatus === "Approved" ? Colors.primary : "transparent", borderColor: Colors.primary, borderWidth: 1, width: "45%" }]} onPress={() => setApprovalStatus("Approved")}>
                            <Text style={[defaultStyles.btnText, { color: approvalStatus === "Approved" ? "#fff" : Colors.primary }]} >Approve</Text>
                          </TouchableOpacity>
                          <TouchableOpacity style={[defaultStyles.btn, { backgroundColor: approvalStatus === "Declined" ? Colors.red : "transparent", borderColor: Colors.red, borderWidth: 1, width: "45%" }]} onPress={() => setApprovalStatus("Declined")}>
                            <Text style={[defaultStyles.btnText, { color: approvalStatus === "Declined" ? "#fff" : Colors.red }]} >Reject</Text>
                          </TouchableOpacity>
                        </View>
                        <View style={styles.modalReviewProductContainer} >
                          <Text style={styles.modalReviewProductText} >Rate Product</Text>
                          <View style={{ marginTop: 10 }} >
                            <StarRating starLength={5} color="gold" size={26} disabled={false} starStyle={{ flexDirection: "row", alignItems: "center", gap: 2 }} starTextStyle={{ color: "#000000" }} messages={["Terrible", "Bad", "Okay", "Good", "Amazing"]} defaultRating={rating} newRating={(rating) => setRating(rating)} />
                          </View>
                        </View>
                        <View style={{ marginTop: 20, marginBottom: 25 }}   >
                          <Text style={styles.modalReviewCommentText} >Comment</Text>
                          <View style={styles.modalReviewCommentInput}>
                            <TextInput multiline={true} style={{ marginTop: 3, paddingHorizontal: 9, fontSize: 12 }} placeholder='Leave a comment' value={comment} onChangeText={(text) => setComment(text)} />
                          </View>
                        </View>
                        <TouchableOpacity style={defaultStyles.btn} onPress={handleSubmit} >
                          <Text style={defaultStyles.btnText} > {loading ? "Submitting..." : "Submit"}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[defaultStyles.btn, { backgroundColor: Colors.redTransparent, borderColor: Colors.red, borderWidth: 1, marginTop: 10 }]} onPress={() => setOpenReviewModal(false)} >
                          <Text style={{ color: Colors.red, fontSize: 13, fontWeight: "500" }} >Cancel</Text>
                        </TouchableOpacity>
                      </View>
                    </ScrollView>
                  </View>
                </View>
              </Modal>
            </View>
          </ScrollView>
        )
      }
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  topContainer: {
    paddingHorizontal: 14,
    paddingTop: 14,
    backgroundColor: Colors.primaryUltraTransparent,
    flex: 1
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 25,
    paddingVertical: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    width: width - 40,
    height: "80%",
  },
  modalProductContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  modalImage: {
    width: 118,
    height: 106,
    marginBottom: 8,
  },

  modalProductName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    color: "#00000050",
  },
  modalProductPrice: {
    fontSize: 18,
    fontWeight: '500',
    color: "#025492",
  },
  modalProductDiscount: {
    fontSize: 13,
    fontWeight: '500',
    color: "#00000030",
    textDecorationLine: "line-through",
  },
  modalProductOwner: {
    fontSize: 13,
    fontWeight: '500',
    color: "#00000050",
  },
  modalReviewTextContainer: {
    marginTop: 36,
    width: "100%",
  },
  modalReviewTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: "#000000",
  },
  modalReviewText: {
    fontSize: 13,
    fontWeight: '500',
    color: "#00000050",
  },
  modalReviewButtonContainer: {
    marginTop: 20,
    flexDirection: "row",
    gap: 10,
  },
  modalReviewProductContainer: {
    marginTop: 20,
  },
  modalReviewProductText: {
    fontSize: 14,
    fontWeight: '500',
    color: "#000000",
  },
  modalReviewCommentText: {
    fontSize: 14,
    fontWeight: '500',
    color: "#000000",
  },
  modalReviewCommentInput: {
    borderWidth: 1,
    height: 115,
    top: 5,
    borderColor: "#0000001A",
    borderRadius: 5,
    backgroundColor: "#00000005",
  },
})

export default Page