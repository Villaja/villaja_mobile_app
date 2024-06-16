import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Product } from '../types/Product';
import { Link } from 'expo-router';
import Colors from '../constants/Colors';



const SwapCard: React.FC<any> = ({ product }) => {
  return (
    <View style={[styles.container]} key={product._id}>


      <Link href={`/${product._id}`} asChild >
        <TouchableOpacity>
          <View style={styles.imgContainer}>
            <Image style={styles.image} source={{ uri: product.userProductImages[0]?.url }} />

          </View>
          <Text style={styles.title}>{product.userProductName.length < 30 ? product.userProductName : product.userProductName.slice(0, 30) + '...'}</Text>
          <Text style={styles.price}>{'₦' + (product.userProductPrice === 0 ? product.userProductPrice?.toLocaleString() : product.userProductPrice?.toLocaleString())} </Text>
          <Text style={styles.discountPrice}></Text>
          {/* <Text style={styles.shopName}>{product.shop?.name}</Text> */}

        </TouchableOpacity>
      </Link>
      <Text style={styles.discountPercentage}>
        
      </Text>


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 8,
    elevation: 2,
    shadowColor: 'rgba(2,84,146,0.10)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    height: 250,

  },
  image: {
    width: '100%',
    height: 130,
    // aspectRatio: 16 / 9, // Maintain a 16:9 aspect ratio
    resizeMode: 'contain',
    borderRadius: 8,
  },
  title: {
    fontSize: 12,
    fontFamily: 'roboto-condensed-sb',
    color: '#00000080',
    marginTop: 7,
    marginBottom: 9,
    minHeight: 30
  },
  price: {
    fontSize: 17,
    fontWeight: '500',
    color: '#025492', // or any other color you prefer
    fontFamily: 'roboto-condensed-sb',
  },
  discountPrice: {
    fontSize: 12,
    color: "rgba(0,0,0,0.30)", // or any other color you prefer
    fontFamily: 'roboto-condensed-sb',
    textDecorationLine: 'line-through'
  },
  shopName: {
    fontSize: 14,
    color: '#3498db', // or any other color you prefer
    marginTop: 8,
  },
  imgContainer: {
    width: '100%',
    height: 130,
    borderRadius: 5,
    // backgroundColor:Colors.primaryTransparent,
    overflow: 'hidden',
  },
  discountPercentage: {
    position: 'absolute',
    top: 0,
    right: 0,
    paddingHorizontal: 10,
    paddingVertical: 3,
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '500',
    borderTopRightRadius: 5,
    width: 39,
    height: 20,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default SwapCard;
