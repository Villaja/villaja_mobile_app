import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router'



const OrderSuccess = () => {
    const router = useRouter()

  const handleSeeAllOrders = () => {
    // Navigate to the screen where you display all orders
    router.replace('/checkoutPage/checkout')
  };

  return (
    <View style={styles.container}>
      <Text style={styles.successText}>Your order was successful!</Text>
      <TouchableOpacity onPress={handleSeeAllOrders} style={styles.button}>
        <Text style={styles.buttonText}>See All Your Orders</Text>
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
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default OrderSuccess;
