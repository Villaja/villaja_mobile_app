import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, ScrollView, StyleSheet } from 'react-native';
import axios, { AxiosResponse } from 'axios';
import ProductCard from '../../components/ProductCard';
import { Product } from '../../types/Product';
import { base_url } from '../../constants/server';

const Home: React.FC = () => {
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: AxiosResponse<{ products: Product[] }> = await axios.get(
          `${base_url}/product/get-all-products`
        );
  
        // Get the first 10 products
        const first10Products = response.data.products.slice(0, 10);
  
        setData(first10Products);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);
  

  const renderProductCards = () => {
    const cardsPerRow = 2;

    return (
      <View style={styles.gridContainer}>
        {data.map((product, index) => (
          <View
            key={product._id}
            style={[
              styles.productCard,
              index % cardsPerRow === cardsPerRow - 1 ? styles.lastCardInRow : null,
            ]}
          >
            <ProductCard product={product} />
          </View>
        ))}
      </View>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loadingIndicator} />
      ) : (
        renderProductCards()
      )}
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
  },
  loadingIndicator: {
    marginTop: 16,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  productCard: {
    flexBasis: '48%', // Adjust as needed based on your styling preference
    marginBottom: 16,
  },
  lastCardInRow: {
    marginRight: 0,
  },
});

export default Home;
