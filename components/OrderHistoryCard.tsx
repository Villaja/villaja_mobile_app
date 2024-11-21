import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React from 'react'
import { defaultStyles } from '../constants/Styles';
import Colors from '../constants/Colors';
import { AntDesign } from '@expo/vector-icons';
import { Order } from '../types/Order';

interface OrderHistoryCardProps {
  order: Order;
}



const OrderHistoryCard: React.FC<OrderHistoryCardProps> = ({ order }) => {
  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: order.cart[0].images[0].url }} style={styles.image} />
        </View>
        <View style={{ paddingVertical: 12.5 }}>
          <Text numberOfLines={2} style={styles.name}>{order.cart[0].name}</Text>
          <Text style={styles.price}>₦{order.totalPrice.toLocaleString()}</Text>
          <Text style={styles.discount}>{order.cart[0].discountPrice !== 0 && order.cart[0].discountPrice !== null && '₦' + order.cart[0].discountPrice?.toLocaleString()}</Text>
        </View>
      </View>
      {/* NOT NECESSARY <TouchableOpacity style={styles.closeBtn}>
        <AntDesign name='closecircle' size={18} color={'#000'} />
      </TouchableOpacity>*/}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 15,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 5,
    elevation: 4,
    shadowColor: 'rgba(2, 84, 146, 0.10)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(0,0,0,0.10)',
  },
  topSection: {
    flexDirection: 'row',
    gap: 38,

  },
  imageContainer: {
    width: 83,
    height: 83,
    borderRadius: 3,
  },
  image: {
    width: 103,
    height: 96,
    resizeMode: 'contain',
    borderRadius: 3,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(0,0,0,0.05)',
    position: 'absolute',
    opacity: 0.3

  },
  name: {
    fontFamily: 'roboto-condensed-sb',
    color: 'rgba(0,0,0,0.50)',
    fontSize: 13,
    marginBottom: 6,
    maxWidth: 150
  },
  price: {
    fontFamily: 'roboto-condensed-sb',
    fontSize: 16,
    color: 'rgba(0,0,0,0.50)',
    fontWeight: '500'
  },
  discount: {
    fontFamily: 'roboto-condensed',
    fontSize: 10,
    color: 'rgba(0,0,0,0.30)',
    fontWeight: '500',
    textDecorationLine: 'line-through'
  },
  closeBtn: {
    position: 'absolute',
    right: 20,
    top: 5,
    opacity: 0.3
  }
})

export default OrderHistoryCard