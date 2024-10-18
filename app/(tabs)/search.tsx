import React, { useEffect, useRef, useState } from 'react';
import { View, Text, ActivityIndicator, ScrollView, StyleSheet, Image, Dimensions, ImageProps, SafeAreaView, TextInput } from 'react-native';
import axios, { AxiosResponse } from 'axios';
import ProductCard from '../../components/ProductCard';
import { Product } from '../../types/Product';
import { base_url } from '../../constants/server';
import Colors from '../../constants/Colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import SellerExploreCard from '../../components/SellerExploreCard';

const Tags = ["All", "Price", "Earpods", "Iphone 15 Pro Max", "Camera", "Samsung"]

const Categories = [
  {
    name: "Phones",
    image: require('../../assets/images/PhoneCategory.png')
  },
  {
    name: "Accessories",
    image: require('../../assets/images/Earpods.png')
  },
  {
    name: "Computers",
    image: require('../../assets/images/Monitor.png')
  },
  {
    name: "Smart Watches",
    image: require('../../assets/images/smw.png')
  },
]

const { width } = Dimensions.get("window")

const explore: React.FC = () => {

  const [headerSelection, setHeaderSelection] = useState<string>('Products')
  const [loading, setLoading] = useState<boolean>(false);
  const [merchantList, setMerchantList] = useState<any[]>([]);
  const [filteredMerchantList, setFilteredMerchantList] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const scrollRef = useRef<ScrollView>();


  // fetch list of all merchants that exist on villaja DB
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchMerchantList = async () => {
      setLoading(true)
      try {
        const response = await axios.get(`${base_url}/shop/user-get-all-sellers`, { signal })
        if (response.status === 201) {
          setMerchantList(response.data.sellers);
        }
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchMerchantList()

    return () => {
      controller.abort()
    }
  }, [headerSelection]);

  // merchant search query results
  useEffect(() => {
    const filteredMerchants = merchantList.filter((merchant) => (
      merchant?.name?.toLowerCase().includes(searchQuery.toLowerCase())
    ))

    setFilteredMerchantList(filteredMerchants)
  }, [searchQuery]);

  console.log(merchantList)
  console.log(filteredMerchantList);


  // display search results based on search query
  const displaySearchResults = () => {
    if (searchQuery === '') {
      return merchantList.map((item) => <SellerExploreCard key={item._id} merchant={item} />)
    } else if (filteredMerchantList.length > 0) {
      return filteredMerchantList.map((item) => <SellerExploreCard key={item._id} merchant={item} />)
    } else {
      return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%' }} >
        <Text style={{ fontFamily: 'roboto-condensed', fontSize: 16, color: Colors.grey, alignSelf: 'center' }} >No results found</Text>
      </View>
    }
  }










  const renderCategoryCards = () => {
    return <View>
      {
        Categories.map((cat, index) => <ProductCategory key={index} category={cat.name} picture={cat.image} />)
      }

    </View>
  }

  return (
    <SafeAreaView style={{ backgroundColor: "#ffffff", flex: 1 }} >
      <View style={styles.pageHeader}>
        <TouchableOpacity style={headerSelection === 'Products' ? styles.textContainerActive : styles.textContainer} onPress={() => setHeaderSelection('Products')}>
          <Text style={headerSelection === 'Products' ? styles.textActive : styles.text}>Products</Text>
        </TouchableOpacity>
        <TouchableOpacity style={headerSelection === 'Merchants' ? styles.textContainerActive : styles.textContainer} onPress={() => setHeaderSelection('Merchants')}>
          <Text style={headerSelection === 'Merchants' ? styles.textActive : styles.text}>Merchants</Text>
        </TouchableOpacity>
      </View>

      {/* Products Tab Header */}
      {
        headerSelection === "Products" && (
          <View style={{ paddingHorizontal: 12, paddingVertical: 12, gap: 12, backgroundColor: '#fff' }} >
            <TouchableOpacity style={{ flexDirection: 'row', gap: 6, paddingHorizontal: 12, paddingVertical: 14, backgroundColor: Colors.primaryTransparent, borderRadius: 2 }} onPress={() => router.push('/search/searchPage')}>
              <AntDesign name='search1' size={18} color={Colors.grey} />
              <Text style={{ color: Colors.grey, fontFamily: 'roboto-condensed' }}>I Am Looking For...</Text>
            </TouchableOpacity>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={
                {
                  alignItems: 'center',
                  gap: 8,
                  paddingRight: 16,


                }
              }>
              {Tags.map((tag, key) => <TouchableOpacity key={key} style={{ paddingHorizontal: 12, paddingVertical: 8, backgroundColor: Colors.primaryTransparent, borderRadius: 2 }}>
                <Text style={{ fontFamily: 'roboto-condensed-sb', color: Colors.primary, fontSize: 12 }}>{tag}</Text>
              </TouchableOpacity>)}
            </ScrollView>
          </View>
        )
      }

      {/* Merchants Tab Header */}
      {
        headerSelection === "Merchants" && (
          <View style={{ paddingHorizontal: 12, paddingVertical: 12, gap: 12, backgroundColor: '#fff' }} >
            <TextInput value={searchQuery} onChangeText={(text) => setSearchQuery(text)} style={{ paddingHorizontal: 12, paddingVertical: 8, backgroundColor: Colors.primaryTransparent, borderRadius: 2 }} placeholder='Search Merchants...' />
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={
                {
                  alignItems: 'center',
                  gap: 8,
                  paddingRight: 16,


                }
              }>
              {Tags.map((tag, key) => <TouchableOpacity key={key} style={{ paddingHorizontal: 12, paddingVertical: 8, backgroundColor: Colors.primaryTransparent, borderRadius: 2 }}>
                <Text style={{ fontFamily: 'roboto-condensed-sb', color: Colors.primary, fontSize: 12 }}>{tag}</Text>
              </TouchableOpacity>)}
            </ScrollView>
          </View>
        )
      }

      {/* Products Tab Content */}
      {
        headerSelection === "Products" && (
          <>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
              {loading ? (
                <ActivityIndicator size="small" color={Colors.primary} style={styles.loadingIndicator} />
              ) : (
                renderCategoryCards()
              )}
            </ScrollView>
          </>
        )
      }

      {/* Merchants Tab Content */}
      {
        headerSelection === "Merchants" && (
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={loading ? { justifyContent: "center", alignItems: "center" } : styles.merchantContainer} >
            {
              loading ? (
                <ActivityIndicator size="small" color={Colors.primary} style={styles.loadingIndicator} />
              ) : (
                displaySearchResults()
              )
            }
          </ScrollView>
        )
      }
    </SafeAreaView>
  );
};


const ProductCategory = ({ category, picture }: { category: string, picture: ImageProps }): JSX.Element => {

  return <TouchableOpacity style={styles.categoryContainer} onPress={() => router.push({ pathname: `/categoryCatalog/${category}`, params: { minPrice: "1", maxPrice: "5000000" } })}>
    <Text style={{ fontFamily: 'roboto-condensed-sb', fontSize: 14, color: "#00000099" }}>{category}</Text>
    <Image source={picture} style={styles.productPicture} resizeMode='contain' />
  </TouchableOpacity>
}


const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 16,
    backgroundColor: '#fff',
  },
  merchantContainer: {
    paddingTop: 10,
    paddingBottom: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: "center",
    alignItems: "center",
    gap: 9
  },
  pageHeader: {
    paddingTop: 24,
    paddingHorizontal: 60,
    width: '100%',
    height: 53,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(79,79,79,0.3)',
  },
  textContainer: {

    paddingHorizontal: 12,
    paddingBottom: 12
  },
  textContainerActive: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.primary,
    paddingHorizontal: 12,
    paddingBottom: 8


  },
  text: {
    fontFamily: 'roboto-condensed',
    fontSize: 16,
    color: Colors.grey,

  },
  textActive: {
    fontFamily: 'roboto-condensed',
    fontSize: 16,
    color: Colors.primary
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

  categoryContainer: {
    width,
    flexDirection: 'row',
    paddingLeft: 36,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: 'rgba(0,0,0,0.05)',

  },

  productPicture: {
    width: 170,
    height: 110,
  }
});

export default explore