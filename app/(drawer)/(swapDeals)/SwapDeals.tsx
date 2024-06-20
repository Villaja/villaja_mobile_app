import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Text, TextInput, View, ScrollView, TouchableOpacity, Dimensions, Alert } from "react-native";
import { base_url } from "../../../constants/server";
import { Product } from '../../../types/Product';
import ProductCard2 from "../../../components/ProductCard2";
import ProductCard from "../../../components/ProductCard";
import ProductCard3 from "../../../components/ProductCard3";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Stack, router, useRouter } from 'expo-router';
import axios, { Axios, AxiosResponse } from 'axios';
import { Skeleton } from '@rneui/themed';
import { Ionicons, Entypo, FontAwesome, Feather, AntDesign } from "@expo/vector-icons";
import SwapCard from '../../../components/SwapCard';
import SwapCard2 from '../../../components/SwapCard2';
import Colors from '../../../constants/Colors';
import { defaultStyles } from '../../../constants/Styles';

const swapDeals = () => {
  const [products, setProducts] = useState<Array<any>>([]);
  const [seller, setSeller] = useState<any>([]);
  const [token, setToken] = useState<string>();
  const [loading, setLoading] = useState<boolean>(true);
  const [viewType, setViewType] = useState<boolean>(true); // true for ProductCard2, false for ProductCard
  const [searchValue, setSearchValue] = useState<string>("")

  // Fetch seller token
  useEffect(() => {
    const fetchToken = async () => {
      const token = await AsyncStorage.getItem('sellerToken');
      const seller = await AsyncStorage.getItem('seller');

      if (!token) return router.replace(`/sellerAuthScreens/SellerLogin`);
      setSeller(JSON.parse(seller!).seller);
      setToken(token);
    };
    fetchToken();
  }, []);

  const handleSearch = (e: any) => {
    setSearchValue(searchValue)
    searchValue && router.setParams({ id: searchValue })
  }

  // Fetch seller products logic
  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${base_url}/quick-swap/get-unsold-products`);
            if (response.data.success) {
                setProducts(response.data.unsoldQuickSwapProducts);
                
            } else {
                console.error('Failed to fetch unsold quick swap orders');
            }
    } catch (error) {
      let errorMessage = 'An unknown error occurred';

      // Axios error
      if (axios.isAxiosError(error)) {
        if (error.response) {
          // The request was made and the server responded with a status code that falls out of the range of 2xx
          errorMessage = error.response.data?.message || error.response.statusText || 'Error in response';
        } else if (error.request) {
          // The request was made but no response was received
          errorMessage = 'No response received from server';
        } else {
          // Something happened in setting up the request that triggered an Error
          errorMessage = error.message;
        }
      } else if (error instanceof Error) {
        // Generic Error object
        errorMessage = error.message;
      }

      Alert.alert('Error fetching products', errorMessage);
      console.log('Error fetching products', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch seller product after token and sellerId confirmation
  useEffect(() => {
    if (seller && token) {
      fetchProducts();
    }
  }, [seller, token]);

  const renderSkeletonLoader = (start: number, end: number) => {
    const cardsPerRow = 2;

    return (
      <View>
        <View style={styles.gridContainer2}>
          {Array(40).fill(0).slice(start, end).map((_, index) => (
            <View
              key={index}
              style={[
                styles.productCard,
                index % cardsPerRow === cardsPerRow - 1 ? styles.lastCardInRow : null,
              ]}
            >
              <Skeleton skeletonStyle={{
                backgroundColor: 'rgba(0,0,0,0.10)',
                borderRadius: 5,
              }} animation="pulse" width={(Dimensions.get('window').width - 40) / 2 - 5} height={250} />
            </View>
          ))}
        </View>
      </View>
    );
  };

  const renderProductCards = (start: number, end: number) => {
    const cardsPerRow = 2;

    return (
      <View>
        <View style={styles.gridContainer2}>
          {products.map((product, index) => (
            <View
              key={product._id}
              style={[
                styles.productCard,
                index % cardsPerRow === cardsPerRow - 1 ? styles.lastCardInRow : null,
              ]}
            >
              <SwapCard product={product} />
            </View>
          ))}
        </View>
      </View>
    );
  };

  const renderProductCards2 = (start: number, end: number) => {
    const cardsPerRow = 2;

    return (
      <View>
        <View style={styles.gridContainer}>
          {products.map((product, index) => (
            <View
              key={product._id}
              style={[
                styles.productCard,
                index % cardsPerRow === cardsPerRow - 1 ? styles.lastCardInRow : null,
              ]}
            >
              <SwapCard2 product={product} />
            </View>
          ))}
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.searchWrapper}>
          <AntDesign name='search1' size={18} color={Colors.grey} style={styles.searchIcon} />
          <TextInput keyboardType='web-search' value={searchValue} onChangeText={(text) => setSearchValue(text)} onSubmitEditing={handleSearch} placeholder='I Am Looking For...' placeholderTextColor={Colors.grey} style={[defaultStyles.inputField, { height: 40, paddingLeft: 40, backgroundColor: 'rgba(0,0,0,0.03)' }]} />
        </View>
      <View style={{ flexDirection: "row", height: 50 }}>
        <TouchableOpacity
          style={{ justifyContent: "center", alignItems: "center", flexBasis: '15%', borderTopWidth: 1, borderBottomWidth: 1, borderColor: "#00000010" }}
          onPress={() => setViewType(!viewType)}
        >
          {viewType ? (
            <Ionicons name="grid-outline" size={20} color="#00000090" />
          ) : (
            <Entypo name='list' size={20} color='#00000090' />
          )}
        </TouchableOpacity>
        {/*TouchableOpacity style={{ justifyContent: "center", alignItems: "center", flexBasis: '42.5%', borderWidth: 1, borderColor: "#00000010" }}>
          <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 4 }}>
            <FontAwesome name="sort" size={15} color="#00000070" />
            <Text style={{ fontSize: 15, color: "#00000070" }}>Sort</Text>
          </View>
        </>
        <TouchableOpacity style={{ justifyContent: "center", alignItems: "center", flexBasis: '42.5%', borderTopWidth: 1, borderBottomWidth: 1, borderColor: "#00000010" }}>
          <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 4 }}>
            <Feather name="filter" size={15} color="#00000070" />
            <Text style={{ fontSize: 15, color: "#00000070" }}>Filter</Text>
          </View>
        </TouchableOpacity>*/}
      </View>
      <View style={{ paddingHorizontal: 20, backgroundColor: "#FAFBFD" }}>
        <View style={{ marginTop: 20, backgroundColor: "#FAFBFD" }}>
          {loading ? (
            renderSkeletonLoader(0, 16)
            // <ActivityIndicator size="small" color={Colors.primary} style={styles.loadingIndicator}  />
          ) : (
            viewType ? renderProductCards2(0, 1) : renderProductCards(0, 1)
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default swapDeals

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff"
  },
  gridContainer: {
    flexDirection: 'column',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
    // paddingHorizontal: 8,
  },
  gridContainer2: {
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
  searchWrapper: {
    flex: 1,
    marginHorizontal:20,
    marginVertical:6
  },
  searchIcon: {
    position: 'absolute',
    top: 10,
    left: 10
  },
})