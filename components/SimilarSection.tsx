import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios, { AxiosResponse } from 'axios';
import { base_url } from '../constants/server';
import { Product } from '../types/Product';
import Colors from '../constants/Colors';
import ProductCard from './ProductCard';


const cardsPerRow = 2

const SimilarSection = ({category}:{category:string}) => {

    const [data,setData] = useState<Array<Product>>([])
    const [loading,setLoading] = useState<boolean>(true)

    useEffect(() => {
    const fetchData = async () => {
      try {
        const response: AxiosResponse<{ products: Product[] }> = await axios.get(
          `${base_url}/product/get-all-products`
        );
  
        // Get the first 10 products
        const first6Products = response.data.products.slice(0,6);
  
        setData(first6Products);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);
  return (
    <View>

        {
            loading ?
            <ActivityIndicator size={'small'} color={Colors.primary} style={{marginVertical
            :20}} />
            :
        
        
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
        }

      </View>
  )
}

const styles = StyleSheet.create({
  buyNowBtn:{
    backgroundColor:Colors.primary,
    width:120,
    borderRadius:5,
    flexDirection:'row',
    alignItems:'center',
    gap:5,
    height:35,
    justifyContent:'center',
    position:'absolute',
    right:30,
    bottom:15
  },
  loadingIndicator: {
    marginTop: 16,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    // paddingHorizontal: 8,
  },
  productCard: {
    flexBasis: '48%',
    marginBottom: 16,
  },
  lastCardInRow: {
    marginRight: 0,
  },
})


export default SimilarSection