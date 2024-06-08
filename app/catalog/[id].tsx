import { View, Text, Platform, SafeAreaView, TextInput, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator, Dimensions, Modal } from 'react-native'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useGlobalSearchParams, useLocalSearchParams, useRouter } from 'expo-router'
import { Ionicons, AntDesign, Entypo, FontAwesome, Feather } from '@expo/vector-icons'
import Colors from '../../constants/Colors'
import { defaultStyles } from '../../constants/Styles'
import AsyncStorage from '@react-native-async-storage/async-storage'
import ProductCard from '../../components/ProductCard'
import { Product } from '../../types/Product'
import axios, { AxiosResponse } from 'axios'
import { base_url } from '../../constants/server'
import BottomSheet, { WINDOW_HEIGHT } from '@gorhom/bottom-sheet';
import LottieView from "lottie-react-native";
import { color } from '@rneui/base'

const Tags = ["Samsung S23 Ultra", "Monitor", "EarPods", "IPhone 15 Pro Max", "Camera", "Samsung S22 Ultra", "Samsung A45", "Razer Gaming Mouse"]


const catalog = () => {
  const { id } = useLocalSearchParams()
  const q = useGlobalSearchParams()
  const router = useRouter()
  const {height, width} = Dimensions.get('window')


  const [data, setData] = useState<Array<Product>>([]);
  const [sortedData, setSortedData] = useState<Array<Product>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchValue, setSearchValue] = useState<string>("")
  const [productDisplayType, setProductDisplayType] = useState<boolean>(true);
  const [sortValue, setSortValue] = useState<string>('New In');
  const [reviewModalVisible, setReviewModalVisible] = useState(false)
  const [productName, setProductName] = useState("")
  const [ramSize, setRamSize] = useState("")
  const [romSize, setRomSize] = useState("")
  


  const handleReviewModalVisibility = () => {
    setReviewModalVisible(!reviewModalVisible);
  }

  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => ['35%'], []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const handleRecentSearch = async (searchTerm: string) => {
    var searches = [] as any

    await AsyncStorage.getItem('recentSearches', (err, result) => {
      if (err) {
        return console.log(err);

      }
      searches = JSON.parse(result!) || []

    })

    searchTerm && await AsyncStorage.setItem('recentSearches', JSON.stringify([...searches, searchTerm]))
    // console.log(searches); 

  }

  const handleSearch = (e: any) => {
    // console.log(e.nativeEvent.key)
    // if((e.nativeEvent.key ===  "Enter") || e.type == 'ended'){
    setSearchValue(searchValue)
    handleRecentSearch(searchValue)
    searchValue && router.setParams({ id: searchValue })
    // }
  }

  useEffect(() => {
    setLoading(true)
    setSortValue('New In')
    const fetchData = async () => {
      try {
        const response: AxiosResponse<{ products: Product[] }> = await axios.get(
          `${base_url}/product/search-products?name=${id?.toString().toLowerCase()}`
        );

        // Get the first 10 products
        // console.log(id.toString());
        // console.log(q);
        // console.log(maxPrice);

        var products = response.data.products.filter(
          (data) =>
            data
            // data.name.toLowerCase().slice(0,id.toString().length) === id.toString().toLowerCase()
            && data.originalPrice > parseInt(q.minPrice as string) && data.originalPrice < parseInt(q.maxPrice as string)
        )



        setData(products);
        setSortedData(products);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    setSearchValue(id as any)
  }, [id, q])

  useEffect(() => {
    var products = data.map((product) => product)
    switch (sortValue) {
      case "Highest Price":
        products = products.sort((a, b) => b.originalPrice - a.originalPrice)
        break;
      case "Lowest Price":
        products = products.sort((a, b) => a.originalPrice - b.originalPrice)
        break;
      case "Best Rating":
        products = products.sort((a, b) => a.ratings - b.ratings)
        break;

      default:
        break;
    }
    setSortedData(products);

  }, [sortValue])

  const renderProductCards = (start: number, end: number) => {
    const cardsPerRow = 1;

    return (
      <>
        {
          <View>
            <View style={styles.gridContainer}>
              {sortedData.map((product, index) => (
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
          </View>
        }
      </>



    );
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff', paddingTop: Platform.OS === "android" ? 30 : 0 }}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back-outline" size={16} color={"#000"} />
        </TouchableOpacity>
        <View style={styles.searchWrapper}>
          <AntDesign name='search1' size={18} color={Colors.grey} style={styles.searchIcon} />
          <TextInput keyboardType='web-search' value={searchValue} onChangeText={(text) => setSearchValue(text)} onSubmitEditing={handleSearch} placeholder='I Am Looking For...' placeholderTextColor={Colors.grey} style={[defaultStyles.inputField, { height: 40, paddingLeft: 40, backgroundColor: 'rgba(0,0,0,0.03)' }]} />
        </View>
      </View>
      <View style={styles.filterHeader}>
        <TouchableOpacity style={[styles.filterHeaderSection, { flexBasis: '15%' }]} onPress={() => setProductDisplayType(!productDisplayType)}>
          {
            productDisplayType ?
              <Entypo name='list' size={24} color={Colors.grey} />
              :
              <Ionicons name='grid-outline' size={23} color={Colors.grey} />
          }
        </TouchableOpacity>
        <TouchableOpacity style={[styles.filterHeaderSection, { flexBasis: '42.5%', borderLeftWidth: 1, borderLeftColor: 'rgba(0,0,0,0.10)' }]} onPress={() => bottomSheetRef.current?.snapToIndex(0)}>
          <FontAwesome name="sort" size={18} color={Colors.grey} />
          <Text style={styles.text}>Sort</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.filterHeaderSection, { flexBasis: '42.5%', borderLeftWidth: 1, borderLeftColor: 'rgba(0,0,0,0.10)' }]} onPress={() => router.push({ pathname: '/filter/filter', params: { id: id, prevRouteName: 'catalog' } })}>
          <Feather size={18} name="filter" color={Colors.grey} />
          <Text style={styles.text}>Filter</Text>
        </TouchableOpacity>
      </View>

      <View style={{ padding: 11 }}>
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
            <Text style={{ fontFamily: 'roboto-condensed', color: Colors.primary }}>{tag}</Text>
          </TouchableOpacity>)}
        </ScrollView>
      </View>

      <ScrollView style={{ paddingHorizontal: 20, marginTop: 25 }}>
        <View>
          {loading ? (
            <ActivityIndicator size="small" color={Colors.primary} style={styles.loadingIndicator} />
          ) : (
            sortedData.length >= 1 ? (
              renderProductCards(0, 4)
              ) : (
                <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false} >
                  <View style={{ justifyContent: "center", alignItems: "center"}} >
                  <LottieView
                    source={require('../../assets/images/no-result.json')}
                    autoPlay
                    loop
                    style={{ height: 200, width: 200}}
                  />
                <Text style={{ fontFamily: 'roboto-condensed-sb', fontSize: 20, color: "#02549296", textAlign: 'center' }}>No Products Found</Text>
                <Text style={{color: "#00000099", fontSize: 13, marginBottom: 15}} >Didn't find what you were looking for?</Text>
                <TouchableOpacity style={{backgroundColor: "#02549299", paddingVertical: 12, paddingHorizontal: 80, borderRadius: 10  }} onPress={handleReviewModalVisibility}>
                  <Text style={{fontFamily: 'roboto-condensed-sb', color: "#ffffff", fontSize: 14, fontWeight: "500"}} >Tell Us Now</Text>
                </TouchableOpacity>
                </View>
              </ScrollView>
            )
          )}
        </View>
      </ScrollView>
        <Modal
          animationType="slide"
          transparent={true}
          visible={reviewModalVisible}
          onRequestClose={() => { handleReviewModalVisibility }}>
          <View style={styles.centeredView}>
            <View style={[styles.modalView, {height: height-300}]}>
              <ScrollView showsVerticalScrollIndicator={false}>
              <View style={{ alignItems: "center", justifyContent:"center", gap: 30, marginBottom: 10, marginTop: 30}} >
                <View>
                  <LottieView
                          source={require('../../assets/images/search-review.json')}
                          autoPlay
                          style={{ height: 90, width: 90 }}
                        />
                </View>
                <Text style={{fontSize: 18, color: "#025492", fontWeight: "900", marginBottom: 50}}>Tell Us More About It!!!!</Text>
              </View>
              <View style={{marginBottom: 30}} >
                <Text style={{ fontSize: 12, color: "#00000090", fontWeight:"500" }}>Product Name</Text>
                <View style={{ borderWidth: 1, width: width - 70, height: 50, top: 5, borderColor: "#0000001A", borderRadius: 5, backgroundColor: "#00000005"}} >
                  <TextInput
                    placeholder='Enter the what you did not find'
                    onChangeText={(text) => { setProductName(text)}}
                    keyboardType='visible-password'
                    style={{ top: 8, fontSize: 13, left: 13, width: width -70 }}
                    
                  />
                </View>
              </View>
              <View style={{marginBottom: 30}} >
                <Text style={{ fontSize: 12, color: "#00000090", fontWeight:"500" }}>RAM Size</Text>
                <View style={{ borderWidth: 1, width: width - 70, height: 50, top: 5, borderColor: "#0000001A", borderRadius: 5, backgroundColor: "#00000005"}} >
                  <TextInput
                    placeholder='Enter "none" if not applicable'
                    onChangeText={(text) => {setRamSize(text)}}
                    keyboardType='visible-password'
                    style={{ top: 8, fontSize: 13, left: 13, width: width -70 }}
                  />
                </View>
              </View>
              <View style={{marginBottom: 50}} >
                <Text style={{ fontSize: 12, color: "#00000090", fontWeight:"500" }}>ROM Size</Text>
                <View style={{ borderWidth: 1, width: width - 70, height: 50, top: 5, borderColor: "#0000001A", borderRadius: 5, backgroundColor: "#00000005"}} >
                  <TextInput
                    placeholder='Enter "none" if not applicable'
                    onChangeText={(text) => {setRomSize(text)}}
                    keyboardType='visible-password'
                    style={{ top: 8, fontSize: 13, left: 13, width: width -70 }}
                  />
                </View>
              </View>
              <TouchableOpacity style={[defaultStyles.btn, {marginBottom: 20}]} >
                <Text style={defaultStyles.btnText} >Submit</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[defaultStyles.btn, {marginBottom: 40, backgroundColor: "rgba(255,0,0,0.05)"}]} onPress={handleReviewModalVisibility} >
                <Text style={[defaultStyles.btnText, {color: 'rgb(255,0,0)'}]} >Cancel</Text>
              </TouchableOpacity>
              </ScrollView>
            </View>
          </View>
        </Modal>

      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        enablePanDownToClose
        style={styles.bottomSheet}
      >
        <View style={styles.contentContainer}>
          <View style={{ padding: 10, paddingTop: 0, width: '100%', alignItems: 'flex-start', borderBottomColor: 'rgba(0,0,0,0.20)', borderBottomWidth: 1 }}>
            <Text style={[styles.text, { fontSize: 18 }]}>Sort By</Text>
          </View>
          <View style={{ width: '100%', padding: 20, gap: 20 }}>
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }} onPress={() => setSortValue('New In')}>
              <Text></Text>
              <Text style={[styles.text, { fontSize: 18, color: 'rgba(0,0,0,0.50)', textAlign: 'center' }]}>New In</Text>
              {sortValue === "New In" ? <FontAwesome size={20} color={Colors.primary} name='check' /> : <Text></Text>}
            </TouchableOpacity>
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }} onPress={() => setSortValue('Best Rating')}>
              <Text></Text>
              <Text style={[styles.text, { fontSize: 18, color: 'rgba(0,0,0,0.50)', textAlign: 'center' }]}>Best Rating</Text>
              {sortValue === "Best Rating" ? <FontAwesome size={20} color={Colors.primary} name='check' /> : <Text></Text>}
            </TouchableOpacity>
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }} onPress={() => setSortValue("Lowest Price")}>
              <Text></Text>
              <Text style={[styles.text, { fontSize: 18, color: 'rgba(0,0,0,0.50)', textAlign: 'center' }]}>Lowest Price</Text>
              {sortValue === "Lowest Price" ? <FontAwesome size={20} color={Colors.primary} name='check' /> : <Text></Text>}
            </TouchableOpacity>
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }} onPress={() => setSortValue("Highest Price")}>
              <Text></Text>
              <Text style={[styles.text, { fontSize: 18, color: 'rgba(0,0,0,0.50)', textAlign: 'center' }]}>Highest Price</Text>
              {sortValue === "Highest Price" ? <FontAwesome size={20} color={Colors.primary} name='check' /> : <Text></Text>}
            </TouchableOpacity>
          </View>
        </View>
      </BottomSheet>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
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
    fontSize: 20
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
    fontSize: 18,
    fontWeight: "200"
  },
  filterHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(0,0,0,0.20)'
  },
  filterHeaderSection: {
    paddingVertical: 11,
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  loadingIndicator: {
    marginVertical: 16,
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
  bottomSheet: {
    elevation: 4,
    shadowColor: 'rgba(2, 84, 146, 0.30)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    backgroundColor: '#fff'
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    margin: 0
  },
  modalView: {
    backgroundColor: '#fff',
    borderRadius: 10,
    margin: 20,
    width: '90%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },


})

export default catalog