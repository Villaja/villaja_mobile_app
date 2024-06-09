{/* NOT NEEDED ANYMORE; USED MODAL FOR ORDER SUCCESS IN CHECKOUT import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import LottieView from "lottie-react-native";



const OrderSuccess = () => {
    const router = useRouter()

  const handleSeeAllOrders = () => {
    // Navigate to the screen where you display all orders
    router.replace('/cartScreen/cart')
  };

  return (
    <View style={styles.container}>
      <LottieView source={require('../../assets/images/order-success.json')} autoPlay loop={false} style={{width: 200, height: 200}} />
      <Text style={styles.successText}>Your order was successful!</Text>
      <TouchableOpacity onPress={handleSeeAllOrders} style={styles.button}>
        <Text style={styles.buttonText}>Check Your Order</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  successText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#025492',
    paddingVertical: 20,
    paddingHorizontal: 40, 
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default OrderSuccess; */}
