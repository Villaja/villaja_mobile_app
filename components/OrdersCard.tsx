import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import React from 'react';
import { defaultStyles } from '../constants/Styles';
import Colors from '../constants/Colors';
import { Order } from '../types/Order';
import { Link } from 'expo-router';

interface OrderCardProps {
  order: Order;
}

const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  return (
    
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Image source={{ uri: order.cart[0].images[0].url }} style={styles.image} />
        <View style={{ paddingVertical: 12.5 }}>
          <Text style={styles.name}>{order.cart[0].name}</Text>
          <Text style={styles.price}>N{order.totalPrice.toLocaleString()}</Text>
          <Text style={styles.discount}>N{order.cart[0].discountPrice}</Text>
        </View>
      </View>

     <Link style={[defaultStyles.btn, { backgroundColor: Colors.primaryTransparent }]} href={`/order/${order._id}`}>
        <Text style={[defaultStyles.btnText, { color: Colors.primary }]}>Track Order</Text>
     </Link>
      <TouchableOpacity style={[defaultStyles.btn, { backgroundColor: Colors.redTransparent }]}>
        <Text style={[defaultStyles.btnText, { color: Colors.red }]}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 15,
    padding: 14,
    backgroundColor: '#fff',
    borderRadius: 5,
    elevation: 4,
    shadowColor: 'rgba(2, 84, 146, 0.10)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    marginBottom: 16,
  },
  topSection: {
    flexDirection: 'row',
    gap: 18,
  },
  image: {
    width: 83,
    height: 83,
    resizeMode: 'contain',
    borderRadius: 3,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  name: {
    fontFamily: 'roboto-condensed',
    fontWeight: '500',
    color: 'rgba(0,0,0,0.50)',
    marginBottom: 6,
  },
  price: {
    fontFamily: 'roboto-condensed',
    fontSize: 18,
    color: Colors.primary,
    fontWeight: '500',
  },
  discount: {
    fontFamily: 'roboto-condensed',
    fontSize: 10,
    color: 'rgba(0,0,0,0.30)',
    fontWeight: '500',
    textDecorationLine: 'line-through',
  },
});

export default OrderCard;
