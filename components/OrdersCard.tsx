import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import React from 'react';
import { defaultStyles } from '../constants/Styles';
import Colors from '../constants/Colors';
import { Order } from '../types/Order';
import { Link, useRouter } from 'expo-router';
import { useOrders } from "../context/OrderContext";


interface OrderCardProps {
  order: Order;
}

const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
  const router = useRouter();

  const handleOrderStatusTextColor = () => {
    if (order.status === "Processing") {
      return { color: "#FAFF00", fontSize: 9 }
    } else if (order.status === "Delivered") {
      return { color: "#00FF00", fontSize: 9 }
    } else if (order.status === "Ready To Ship") {
      return { color: "#FC8B00", fontSize: 9 }
    } else {
      return { color: "#FF0000", fontSize: 9 }
    }
  };
  console.log(`status0`, order.status)


  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        {
          order.cart.length > 1 ? (
            <View style={styles.groupImageContainer}>
              {
                order.cart[0] && (
                  <Image source={{ uri: order.cart[0].images[0].url }} style={styles.groupImage} />
                )
              }
              {
                order.cart[1] && (
                  <Image source={{ uri: order.cart[1].images[0].url }} style={styles.groupImage} />
                )
              }
              {
                order.cart[2] && (
                  <Image source={{ uri: order.cart[2].images[0].url }} style={styles.groupImage} />
                )
              }
              {
                order.cart[3] && (
                  <Image source={{ uri: order.cart[3].images[0].url }} style={styles.groupImage} />
                )
              }
            </View>
          ) : (
            <Image source={{ uri: order.cart[0].images[0].url }} style={styles.image} />
          )
        }
        <View style={{ paddingVertical: 12.5 }}>
          <Text numberOfLines={2} style={styles.name}>{order.cart[0].name}</Text>
          <Text style={styles.price}>₦{order.totalPrice?.toLocaleString()}</Text>
          <Text style={styles.discount}>{order.cart[0].discountPrice && '₦' + order.cart[0].discountPrice?.toLocaleString()}</Text>
          <View style={styles.statusContainer} >
            <View style={[styles.ellipse, { backgroundColor: handleOrderStatusTextColor().color }]}></View>
            <Text style={styles.status}>{order.status}</Text>
            {order.cart.length === 1 && (
              <Text style={{ fontFamily: 'roboto-condensed', fontSize: 13, color: 'rgba(0,0,0,0.50)' }}>Quantity : {order.cart[0].stock}</Text>
            )}
          </View>
        </View>
      </View>
      {
        order.cart.length > 1 ? (
          <Link
            href={{
              pathname: `/orderList/${order._id}`,
            }}
            style={styles.trackButton}
          >
            {order.cart.length > 1 ? order.status === "Delivered" || order.status === "Cancelled" ? order.status === "Delivered" ? "Review Orders" : "Check Details" : "Track Orders" : order.status === "Delivered" || order.status === "Cancelled" ? order.status === "Delivered" ? "Review Order" : "Check Details" : "Track Order"}
          </Link>
        ) : (
          <TouchableOpacity onPress={() => router.push(`/order/${order._id}`)} style={[defaultStyles.btn, { flexGrow: 1, flexBasis: '100%', backgroundColor: Colors.primaryTransparent }]}>
            <Text style={[defaultStyles.btnText, { color: Colors.primary }]}>{order.cart.length > 1 ? order.status === "Delivered" || order.status === "Cancelled" ? order.status === "Delivered" ? "Review Orders" : "Check Details" : "Track Orders" : order.status === "Delivered" || order.status === "Cancelled" ? order.status === "Delivered" ? "Review Order" : "Check Details" : "Track Order"}</Text>
          </TouchableOpacity>
        )
      }
      {
        order.status === "Processing" && (
          <TouchableOpacity style={[defaultStyles.btn, { backgroundColor: Colors.redTransparent }]}>
            <Text style={[defaultStyles.btnText, { color: Colors.red }]}>Cancel</Text>
          </TouchableOpacity>
        )
      }
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
  groupImageContainer: {
    maxWidth: 100,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 2,
  },
  groupImage: {
    width: 43,
    height: 43,
    resizeMode: 'contain',
  },
  topSection: {
    flexDirection: 'row',
    gap: 28,
  },
  image: {
    width: 83,
    height: 83,
    resizeMode: 'contain',
  },
  name: {
    fontFamily: 'roboto-condensed',
    fontWeight: '500',
    color: 'rgba(0,0,0,0.50)',
    marginBottom: 6,
    maxWidth: 180,
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
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  ellipse: {
    width: 10,
    height: 10,
    borderRadius: 50,
  },
  status: {
    fontSize: 12,
    color: 'rgba(0,0,0,0.80)',
  },
  trackButton: {
    backgroundColor: Colors.primaryTransparent,
    color: Colors.primary,
    fontSize: 13,
    fontFamily: "roboto-condensed-sb",
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    display: 'flex',
    textAlign: 'center',
    borderRadius: 10,
  }
});

export default OrderCard;
