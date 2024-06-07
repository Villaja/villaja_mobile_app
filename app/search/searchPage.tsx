import { View, Text, SafeAreaView, TouchableOpacity, Platform, StyleSheet, FlatList, ActivityIndicator, TextInputComponent } from 'react-native'
import React, { ProfilerOnRenderCallback, useEffect, useState, useRef } from 'react'
import { AntDesign, FontAwesome, FontAwesome5, Ionicons, Octicons } from '@expo/vector-icons'
import { TextInput } from 'react-native-gesture-handler'
import Colors from '../../constants/Colors'
import { defaultStyles } from '../../constants/Styles'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { base_url } from '../../constants/server'
import axios, { AxiosResponse } from 'axios'
import { Product } from '../../types/Product'
import { useRouter } from 'expo-router'

const tags = ["Samsung S23 Ultra", "Monitor", "EarPods", "IPhone 15 Pro Max", "Camera", "Samsung S22 Ultra", "Samsung A45", "Razer Gaming Mouse"]

const search = () => {

  const router = useRouter()

  const [data, setData] = useState<Array<Product>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchResult, setSearchResult] = useState<Array<Product>>([])
  const [searchValue, setSearchValue] = useState<string>("")
  const [recentSearch, setRecentSearch] = useState<Array<string>>([])

  const searchRef = useRef<any>(null)

  const handleRecentSearch = async (searchTerm: string) => {
    var searches = [] as any

    await AsyncStorage.getItem('recentSearches', (err, result) => {
      if (err) {
        return console.log(err);

      }
      searches = JSON.parse(result!) || []

    })

    searchTerm && !searches.includes(searchTerm) && await AsyncStorage.setItem('recentSearches', JSON.stringify([...searches, searchTerm]))
    // console.log(searches); 

  }

  const handleDeleteRecentSearch = async (searchTerm: string) => {
    var searches = [] as any

    await AsyncStorage.getItem('recentSearches', (err, result) => {
      if (err) {
        return console.log(err);

      }
      searches = JSON.parse(result!).filter((value: string) => value !== searchTerm) || []

    })

    await AsyncStorage.setItem('recentSearches', JSON.stringify([...searches]))
    setRecentSearch(searches.reverse())
    console.log(searches);
  }

  const handleSearch = (e: any) => {
    // console.log(e.nativeEvent.key)
    // if((e.nativeEvent.key ===  "Enter") || e.type == 'ended'){
    setSearchValue(searchValue)
    handleRecentSearch(searchValue)
    searchValue && router.push({ pathname: `/catalog/${searchValue}`, params: { minPrice: "1", maxPrice: "5000000" } })
    // }
  }

  useEffect(() => {
    setSearchResult(data.filter((item) => item.name.toLowerCase().slice(0, searchValue.length) === searchValue.toLowerCase()).slice(0, 10))
  }, [data, searchValue])

  useEffect(() => {
    const getRecentSearch = async () => {
      await AsyncStorage.getItem('recentSearches', (err, result) => {
        if (err) {
          return console.log(err);

        }
        const res = (JSON.parse(result!) || [])
        setRecentSearch(res.reverse())
      })
    }
    getRecentSearch()
  }, [])





  useEffect(() => {
    if(searchRef.current) searchRef.current.focus()
    const fetchData = async () => {
      try {
        const response: AxiosResponse<{ products: Product[] }> = await axios.get(
          `${base_url}/product/get-all-products`
        );

        // Get the first 10 products
        const first10Products = response.data.products;

        setData(first10Products);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff', paddingTop: Platform.OS === "android" ? 30 : 0 }}>


      <View>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => router.replace('/(tabs)/search')}>
            <Ionicons name="arrow-back-outline" size={16} color={"#000"} />
          </TouchableOpacity>
          <View style={styles.searchWrapper}>
            <AntDesign name='search1' size={18} color={Colors.grey} style={styles.searchIcon} />
            <TextInput ref={searchRef} keyboardType='web-search' value={searchValue} onChangeText={(text) => setSearchValue(text)} onSubmitEditing={handleSearch} placeholder='I Am Looking For...' placeholderTextColor={Colors.grey} style={[defaultStyles.inputField, { height: 40, paddingLeft: 40, backgroundColor: 'rgba(0,0,0,0.03)' }]} />
          </View>
        </View>


        {
          searchValue ?
            <View>
              {
                recentSearch && recentSearch.length > 0 && recentSearch.filter((value) => value.toLowerCase().slice(0, searchValue.length) === searchValue.toLowerCase()).slice(0, 4).map((value, index) =>
                  <TouchableOpacity key={index} style={[styles.recentSearchOutput, { paddingHorizontal: 20, gap: 20, marginTop: 20 }]} onPress={() => router.push({ pathname: `/catalog/${value}`, params: { minPrice: "1", maxPrice: "5000000" } })}>
                    <View style={{ flexDirection: 'row', gap: 4, alignItems: 'center' }}>
                      <Octicons name='history' size={18} color={Colors.primary} />
                      <Text style={styles.text}>{value}</Text>
                    </View>
                    <TouchableOpacity onPress={() => handleDeleteRecentSearch(value)} >
                      <AntDesign name='close' size={16} color={Colors.grey} />
                    </TouchableOpacity>
                  </TouchableOpacity>)
              }
              <FlatList
                data={searchResult}
                renderItem={({ item }) =>
                  <View style={styles.searchContainer}>

                    <TouchableOpacity style={styles.recentSearch} onPress={() => router.push(`/product/${item._id}`)}>
                      <View style={styles.recentSearchOutput}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                          <Text style={[styles.text, { color: '#000' }]} numberOfLines={1}>{item.name.slice(0, searchValue.length)}</Text>
                          <Text style={[styles.text, { color: '#000', fontFamily: 'roboto-condensed-sb' }]} numberOfLines={1}>{item.name.slice(searchValue.length)}</Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                }
                keyExtractor={item => item._id}
                ListEmptyComponent={() => <ActivityIndicator style={{ marginVertical: 20 }} color={Colors.primary} size={'small'} />}

              />

            </View>


            :

            <View style={styles.searchContainer}>
              <View style={styles.recentSearch}>
                <Text style={styles.headerText}>Recent Search</Text>
                {
                  recentSearch && recentSearch.length > 0 && recentSearch.slice(0, 4).map((value, index) =>
                    <TouchableOpacity key={index} style={styles.recentSearchOutput} onPress={() => router.push({ pathname: `/catalog/${value}`, params: { minPrice: "1", maxPrice: "5000000" } })}>
                      <View style={{ flexDirection: 'row', gap: 4, alignItems: 'center' }}>
                        <Octicons name='history' size={18} color={Colors.primary} />
                        <Text style={styles.text}>{value}</Text>
                      </View>
                      <TouchableOpacity onPress={() => handleDeleteRecentSearch(value)} >
                        <AntDesign name='close' size={16} color={Colors.grey} />
                      </TouchableOpacity>
                    </TouchableOpacity>

                  )
                }

              </View>

              <View style={styles.tagSection}>
                <Text style={styles.headerText}>Trending</Text>
                <View style={styles.tagContent}>
                  {
                    tags.map((tag, index) => <TouchableOpacity key={index} style={styles.tagBtn}>
                      <Text style={styles.tagText}>{tag}</Text>
                    </TouchableOpacity>)
                  }
                </View>
              </View>
            </View>
        }

      </View>



    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 20,
    paddingBottom: 10,
    borderBottomColor: 'rgba(0,0,0,0.30)',
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  searchWrapper: {
    flex: 1
  },
  searchIcon: {
    position: 'absolute',
    top: 10,
    left: 10
  },
  searchContainer: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    gap: 20
  },
  recentSearch: {
    gap: 10
  },
  headerText: {
    fontFamily: 'roboto-condensed-sb',
    fontSize: 15
  },
  recentSearchOutput:
  {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  text: {
    fontFamily: 'roboto-condensed',
    color: Colors.grey,
    fontSize: 13
  },
  tagSection: {
    gap: 10
  },
  tagContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10
  },
  tagBtn: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    backgroundColor: Colors.primaryTransparent,

  },
  tagText: {
    fontFamily: 'roboto-condensed',
    color: Colors.primary,
    fontSize: 10,
    fontWeight: '500'
  }
})

export default search