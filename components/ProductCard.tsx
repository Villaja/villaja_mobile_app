import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Product } from '../types/Product';
import { Link } from 'expo-router';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <View style={styles.container} key={product._id}>
      
      <Link href={`/product/${product._id}`} asChild>
        <TouchableOpacity>
        <Image style={styles.image} source={{ uri: product.images[0]?.url }} />
        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.price}>₦{product.originalPrice.toFixed(2)}</Text>
        <Text style={styles.shopName}>{product.shop?.name}</Text>
        </TouchableOpacity>
      </Link>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    backgroundColor: '#fff',
    padding: 16,
    margin: 8,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
   
  },
  image: {
    width: '100%',
    aspectRatio: 16 / 9, // Maintain a 16:9 aspect ratio
    resizeMode: 'cover',
    borderRadius: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  price: {
    fontSize: 14,
    color: '#e74c3c', // or any other color you prefer
    fontWeight: 'bold',
  },
  shopName: {
    fontSize: 14,
    color: '#3498db', // or any other color you prefer
    marginTop: 8,
  },
});

export default ProductCard;
