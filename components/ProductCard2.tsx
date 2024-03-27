import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Product } from '../types/Product';
import { Link } from 'expo-router';
import Colors from '../constants/Colors';

interface ProductCardProps {
  product: Product;
}

const ProductCard2: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <View style={[styles.container]} key={product._id}>


      <Link href={`/product/${product._id}`} asChild >
        <TouchableOpacity style={styles.topSection}>
          <View style={styles.imgContainer}>
            <Image style={styles.image} source={{ uri: product.images[0]?.url }} />
            <View style={{ marginLeft: 18 }}>
              <Text style={styles.title}>{product.name.length < 30 ? product.name : product.name.slice(0, 30) + '...'}</Text>
              <Text style={styles.price}>{'₦' + (product.discountPrice === 0 ? product.originalPrice?.toLocaleString() : product.discountPrice?.toLocaleString())} </Text>
              <Text style={styles.discountPrice}>{product.discountPrice !== 0 ? '₦' + (product.originalPrice?.toLocaleString() || '') : null}</Text>
            </View>

          </View>
          {/* <Text style={styles.shopName}>{product.shop?.name}</Text> */}

        </TouchableOpacity>
      </Link>
      <Text style={styles.discountPercentage}>
        {
          product.discountPrice && (((product.originalPrice - product.discountPrice) / product.originalPrice) * 100).toFixed()
        }%
      </Text>


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 15,
    backgroundColor: "#ffffff",
    padding: 14,
    borderRadius: 5,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 0.3,
    borderBottomColor: "#00000040"
  },
  topSection: {
    flexDirection: 'row',
    gap: 8,
  },
  image: {
    width: 83,
    height: 83,
    resizeMode: 'contain',
    borderRadius: 5,
    borderColor: 'rgba(0,0,0,0.05)'
  },
  title: {
    fontFamily: 'roboto-condensed-sb',
    color: '#00000080',
    marginBottom: 6,
    fontSize: 13
  },
  price: {
    fontSize: 17,
    fontWeight: '500',
    color: '#025492', // or any other color you prefer
    fontFamily: 'roboto-condensed-sb',
  },
  discountPrice: {
    fontFamily: 'roboto-condensed',
    fontSize: 12,
    color: 'rgba(0,0,0,0.30)',
    fontWeight: '500',
    textDecorationLine: 'line-through'
  },
  shopName: {
    fontSize: 14,
    color: '#3498db', // or any other color you prefer
    marginTop: 8,
  },
  imgContainer: {
    paddingVertical: 12.5,
    flexDirection: "row",
    alignItems: "center"
  },
  discountPercentage: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: "#02549290",
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

export default ProductCard2;
