import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Image, StyleSheet, ScrollView, FlatList } from 'react-native';
import axios from 'axios';
import { useLocalSearchParams } from 'expo-router';
import { base_url } from '../../constants/server';
import { Product } from '../../types/Product';

const Page: React.FC = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [productDetails, setProductDetails] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`${base_url}/product/get-product-details/${id}`);
        setProductDetails(response.data.product);
      } catch (error) {
        console.error('Error fetching product details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  return (
    <ScrollView>
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" style={styles.loadingIndicator} />
        ) : (
          <>
            {productDetails && (
              <>
                <Image style={styles.image} source={{ uri: productDetails?.images[0]?.url }} />
                <FlatList
                  data={productDetails.images.slice(1)} 
                  keyExtractor={(item) => item._id}
                  renderItem={({ item }) => (
                    <Image style={styles.smallImage} source={{ uri: item.url }} />
                  )}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.smallImagesContainer}
                />
                <Text style={styles.title}>{productDetails?.name}</Text>
                <Text style={styles.price}>₦{productDetails?.originalPrice.toFixed(2)}</Text>
                <Text style={styles.shopName}>{productDetails.shop?.name}</Text>
                <Text style={styles.description}>{productDetails?.description}</Text>
               
              </>
            )}
          </>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingIndicator: {
    marginTop: 16,
  },
  image: {
    width: '100%',
    aspectRatio: 16 / 9,
    resizeMode: 'contain',
    borderRadius: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  description: {
    fontSize: 16,
    marginVertical: 8,
  },
  price: {
    fontSize: 18,
    color: '#e74c3c',
    fontWeight: 'bold',
  },
  shopName: {
    fontSize: 16,
    color: '#3498db',
    marginTop: 8,
  },
  smallImagesContainer: {
    marginTop: 16,
  },
  smallImage: {
    width: 60,
    height: 60,
    resizeMode: 'cover',
    borderRadius: 8,
    marginRight: 8,
  },
});

export default Page;
