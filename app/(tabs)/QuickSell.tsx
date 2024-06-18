import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, Dimensions, Alert, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { defaultStyles } from '../../constants/Styles';
import QuickSellProductCard from "../../components/QuickSellProductCard";
import QuickSwapProductCard from "../../components/QuickSwapProductCard";
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import Colors from '../../constants/Colors'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons, Entypo, FontAwesome, Feather, AntDesign } from "@expo/vector-icons";
import { base_url } from '../../constants/server';

const QuickSell = () => {
  const { user } = useAuth();
  const router = useRouter();
  const { height } = Dimensions.get('window');
  const [products, setProducts] = useState<Array<any>>([]);
  const [swapProducts, setSwapProducts] = useState<Array<any>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [productExists, setProductExists] = useState(false)
  const [swapProductExists, setSwapProductExists] = useState(false)

  //function to fetch QUICK SELL products for the user
  useEffect(() => {
    const fetchQuickSellProducts = async () => {
      const token = await AsyncStorage.getItem('token');
      try {
        if (user) {
          const response = await axios.get(`${base_url}/quick-sell/get-all-products-user`,
            {
              headers: {
                Authorization: token
              }
            })
          if (response.data.success) {
            setProducts(response.data.quickSellProducts);
            setProductExists(response.data.quickSellProducts.length > 0);
          } else {
            console.log('Failed to fetch unsold quick sell orders')
            setProductExists(false)
          }
        } else {
          return router.replace('/modals/login')
        }
      } catch (error) {
        setProductExists(false)
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
        console.log('Error fetching products', error);
      } finally {
        setLoading(false)
      }
    }

    fetchQuickSellProducts();
  }, [user, router]);


  //function to fetch QUICK SWAP products for the user
  useEffect(() => {
    const fetchQuickSwapProducts = async () => {
      const token = await AsyncStorage.getItem('token');
      try {
        if (user) {
          const response = await axios.get(`${base_url}/quick-swap/get-user-products`,
            {
              headers: {
                Authorization: token
              }
            })
          if (response.data.success) {
            setSwapProducts(response.data.quickSwapProducts);
            setSwapProductExists(response.data.quickSwapProducts.length > 0);
            console.log(response.data.message)
          } else {
            console.log('Failed to fetch unsold quick swap orders')
            setSwapProductExists(false)
          }
        } else {
          return router.replace('/modals/login')
        }
      } catch (error) {
        setSwapProductExists(false)
        if (axios.isAxiosError(error)) {
          console.log('Error response:', error.response);
          if (error.response?.status === 500) {
            Alert.alert('Server Error', 'An error occurred on the server. Please try again later.');
          } else if (error.response?.status === 401) {
            Alert.alert('Unauthorized', 'Please check your token and try again.');
          } else {
            Alert.alert('Error', `Please Enter your password to confirm change`);
            console.log('user password not found', error.message)
          }
        } else {
          Alert.alert('Error', 'An unexpected error occurred');
        }
        console.log('Error fetching products', error);
      } finally {
        setLoading(false)
      }
    }

    fetchQuickSwapProducts();
  }, [user, router]);


  const handleDeleteQuickSellProducts = async (productId: string) => {
    const token = await AsyncStorage.getItem('token');
    try {
      if (user) {
        const response = await axios.delete(`${base_url}/quick-sell/delete-product/${productId}`,
          {
            headers: {
              Authorization: token
            }
          })
        if (response.data.success) {
          setProducts(prevProducts => {
            const updatedProducts = prevProducts.filter(product => product._id !== productId);
            const productExists = updatedProducts.length > 0;
            setProductExists(productExists);
            console.log(updatedProducts); // This will log the correct updated products array
            return updatedProducts;
          });
          Alert.alert('Success', 'Products deleted successfully');
          console.log(response.data.message);
        }
      } else {
        router.replace('/(modals)/login')
        Alert.alert('Unauthorized', 'Please log in to delete this product')
      }
    } catch (error) {
      setProductExists(false)
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

      Alert.alert('Error deleting products', errorMessage);
      console.log('Error deleting products', error);
    }
  }

  const handleDeleteQuickSwapProducts = async (productId: string) => {
    const token = await AsyncStorage.getItem('token');
    try {
      if (user) {
        const response = await axios.delete(`${base_url}/quick-swap/delete-product/${productId}`,
          {
            headers: {
              Authorization: token
            }
          })
        if (response.data.success) {
          setSwapProducts(prevSwapProducts => {
            const updatedSwapProducts = prevSwapProducts.filter(product => product._id !== productId);
            const swapProductExists = updatedSwapProducts.length > 0;
            setSwapProductExists(swapProductExists);
            console.log(updatedSwapProducts); // This will log the correct updated products array
            return updatedSwapProducts;
          });
          Alert.alert('Success', 'Products deleted successfully');
          console.log(response.data.message);
        }
      } else {
        router.replace('/(modals)/login')
        Alert.alert('Unauthorized', 'Please log in to delete this product')
      }
    } catch (error) {
      setProductExists(false)
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

      Alert.alert('Error deleting products', errorMessage);
      console.log('Error deleting products', error);
    }
  }

  const renderProductCards2 = (start: number, end: number) => {
    return (
      <View>
        <View style={styles.gridContainer}>
          {products.map((product) => (
            <View
              key={product._id}
              style={[
                styles.productCard,

              ]}
            >
              <QuickSellProductCard product={product} handleDeleteQuickSellProducts={handleDeleteQuickSellProducts} />
            </View>
          ))}
        </View>
      </View>
    );
  };

  const renderProductCards1 = (start: number, end: number) => {
    return (
      <View>
        <View style={styles.gridContainer}>
          {swapProducts.map((product) => (
            <View
              key={product._id}
              style={[
                styles.productCard,

              ]}
            >
              <QuickSwapProductCard product={product} handleDeleteQuickSwapProducts={handleDeleteQuickSwapProducts} />
            </View>
          ))}
        </View>
      </View>
    );
  };


  return (
    <View style={productExists ? styles.container : styles.container2}>
      {
        loading ? <ActivityIndicator size={'small'} color={Colors.primary} /> : productExists || swapProductExists ?
          (
            <ScrollView showsVerticalScrollIndicator={false}>
              <TouchableOpacity style={styles.uploadButton} onPress={() => router.push(`/quickSellAndSwap/uploadScreen`)}>
                <Text style={styles.uploadText} >Upload Product</Text>
                <AntDesign name="plus" size={14} color="#025492" />
              </TouchableOpacity>
              <View>{renderProductCards2(0, 16)}</View>
              <View>{renderProductCards1(0, 16)}</View>
            </ScrollView>
          )
          :

          (
            <View style={{ marginTop: height / 6, justifyContent: "center", alignItems: "center" }} >
              <Image source={require("../../assets/images/quick.png")} style={styles.image} />
              <View style={styles.textContainer}>
                <Text style={styles.text1} >You Have Not Yet Uploaded A Product</Text>
                <Text style={styles.text2} >Quick swap and sell is typical for selling or swapping used gadgets or accessories. You need to upload a product for it to be listed to sell on this page. To do so, click on the button at the bottom of the page to get started.</Text>
              </View>
              <TouchableOpacity style={styles.button} onPress={() => router.push(`/quickSellAndSwap/uploadScreen`)}>
                <Text style={styles.buttonText1}>Upload Product </Text>
                <Text style={styles.buttonText2}>  +</Text>
              </TouchableOpacity>
            </View>

          )

      }
    </View>
  )
}

export default QuickSell

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primaryUltraTransparent,
  },
  container2: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  image: {
    width: 139.37,
    height: 131,
    marginBottom: 30
  },
  textContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 340
  },
  text1: {
    fontSize: 15,
    color: "#00000070",
    fontWeight: "700",
    marginBottom: 4
  },
  text2: {
    fontSize: 12,
    color: "#00000040",
    textAlign: "center",
    marginBottom: 30
  },
  button: {
    height: 50,
    width: 330,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#025492",
    flexDirection: "row"
  },
  buttonText1: {
    color: "#fff",
    fontSize: 15,
    fontFamily: "roboto-condensed-sb",
  },
  buttonText2: {
    color: "#fff",
    fontSize: 25,
    fontWeight: "300"
  },
  gridContainer: {
    flexDirection: 'column-reverse',
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
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginRight: 22,
    marginTop: 20,
    gap: 5,
    backgroundColor: Colors.primaryUltraTransparent
  },
  uploadText: {
    fontSize: 13,
    color: "#025492",
    lineHeight: 15,
    fontFamily: 'roboto-condensed'
  },
})