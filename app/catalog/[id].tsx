import { View, Text, Platform, SafeAreaView, TextInput, TouchableOpacity,StyleSheet, ScrollView, ActivityIndicator } from 'react-native'
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
import BottomSheet from '@gorhom/bottom-sheet';

const Tags = ["Samsung S23 Ultra","Monitor","EarPods","IPhone 15 Pro Max","Camera","Samsung S22 Ultra","Samsung A45","Razer Gaming Mouse"]


const catalog = () => {
  const {id} = useLocalSearchParams()
  const q = useGlobalSearchParams()
  const router = useRouter()
  
  
  const [data, setData] = useState<Array<Product>>([]);
  const [sortedData, setSortedData] = useState<Array<Product>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchValue,setSearchValue] = useState<string>("")
  const [productDisplayType,setProductDisplayType] = useState<boolean>(true)
  const [sortValue,setSortValue] = useState<string>('New In')

  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => ['35%'], []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const handleRecentSearch = async (searchTerm:string) => {
    var searches = [] as any

    await AsyncStorage.getItem('recentSearches',(err,result) => {
      if(err)
      {
        return console.log(err);
        
      }
      searches = JSON.parse(result!) || []  

    }) 

    searchTerm && await AsyncStorage.setItem('recentSearches',JSON.stringify([...searches,searchTerm]))
    // console.log(searches); 
    
  }

  const handleSearch = (e:any) => {
    // console.log(e.nativeEvent.key)
    // if((e.nativeEvent.key ===  "Enter") || e.type == 'ended'){
      setSearchValue(searchValue)
      handleRecentSearch(searchValue)
      searchValue && router.setParams({id:searchValue})
    // }
  }

  useEffect(()=>{
    setLoading(true)
    setSortValue('New In')
    const fetchData = async () => {
      try {
        const response: AxiosResponse<{ products: Product[] }> = await axios.get(
          `${base_url}/product/get-all-products`
        );
  
        // Get the first 10 products
        // console.log(id.toString());
        // console.log(q);
        // console.log(maxPrice);
        
        var products = response.data.products.filter(
          (data) => 
          data.name.toLowerCase().slice(0,id.toString().length) === id.toString().toLowerCase()
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
  },[id,q])

  useEffect(() => {
    var products = data.map((product) => product)
    switch (sortValue) {
          case "Highest Price":
            products = products.sort((a,b) => b.originalPrice - a.originalPrice)
            break;
          case "Lowest Price":
            products = products.sort((a,b) => a.originalPrice - b.originalPrice)
            break;
          case "Best Rating":
            products = products.sort((a,b) => a.ratings - b.ratings)
            break;
        
          default:
            break;
        }
        setSortedData(products);

  },[sortValue])

  const renderProductCards = (start:number,end:number) => {
    const cardsPerRow = 1;

    return (
      <>
      {
        sortedData?.length > 0 ?
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

      :
      <View>
        <Text style={{fontFamily:'roboto-condensed-sb',fontSize:20,textAlign:'center'}}>No Products Found</Text>
      </View>
        
      }
      </>

      

    );
            }
  return (
    <SafeAreaView style={{flex:1,backgroundColor:'#fff',paddingTop:Platform.OS === "android"?30:0}}>
      <View style={styles.headerContainer}>
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="arrow-back-outline" size={16} color={"#000"} />
            </TouchableOpacity>
            <View style={styles.searchWrapper}>
              <AntDesign name='search1' size={18} color={Colors.grey}  style={styles.searchIcon}/>
              <TextInput  keyboardType='web-search' value={searchValue} onChangeText={(text) => setSearchValue(text)} onSubmitEditing={handleSearch} placeholder='I Am Looking For...' placeholderTextColor={Colors.grey} style={[defaultStyles.inputField,{height:40,paddingLeft:40,backgroundColor:'rgba(0,0,0,0.03)'}]} />
            </View>
      </View>
      <View style={styles.filterHeader}>
        <TouchableOpacity style={[styles.filterHeaderSection,{flexBasis:'15%'}]} onPress={() => setProductDisplayType(!productDisplayType)}>
          {
            productDisplayType?
            <Entypo name='list' size={24} color={Colors.grey} />
          :
          <Ionicons name='grid-outline' size={23} color={Colors.grey}  />
          }
        </TouchableOpacity>
        <TouchableOpacity style={[styles.filterHeaderSection,{flexBasis:'42.5%',borderLeftWidth:1,borderLeftColor:'rgba(0,0,0,0.10)'}]} onPress={() => bottomSheetRef.current?.snapToIndex(0)}>
          <FontAwesome name="sort" size={18} color={Colors.grey}/>
          <Text style={styles.text}>Sort</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.filterHeaderSection,{flexBasis:'42.5%',borderLeftWidth:1,borderLeftColor:'rgba(0,0,0,0.10)'}]} onPress={() => router.push({pathname:'/filter/filter',params:{id:id}})}>
          <Feather size={18}  name="filter" color={Colors.grey}/>
          <Text style={styles.text}>Filter</Text>
        </TouchableOpacity>
      </View>

      <View style={{padding:20}}>
          <ScrollView 
            horizontal  
            showsHorizontalScrollIndicator={false}
            
            contentContainerStyle={
                {
                    alignItems:'center',
                    gap:8,
                    paddingRight:16,
                    

                }
            }>
            {Tags.map((tag,key) => <TouchableOpacity key={key} style={{paddingHorizontal:12,paddingVertical:8,backgroundColor:Colors.primaryTransparent,borderRadius:2}}>
              <Text style={{fontFamily:'roboto-condensed',color:Colors.primary}}>{tag}</Text>
            </TouchableOpacity>)}
          </ScrollView>
      </View>

      <ScrollView style={{paddingHorizontal:20}}>
        <View>
          {loading ? (
          <ActivityIndicator size="small" color={Colors.primary} style={styles.loadingIndicator}  />
          ) : (
            renderProductCards(0,4)
            )}
        </View>
      </ScrollView>

      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        enablePanDownToClose
        style={styles.bottomSheet}
      >
        <View style={styles.contentContainer}>
          <View style={{padding:10,paddingTop:0,width:'100%',alignItems:'flex-start',borderBottomColor:'rgba(0,0,0,0.20)',borderBottomWidth:1}}>
            <Text style={[styles.text,{fontSize:22}]}>Sort By</Text>
          </View>
          <View style={{width:'100%',padding:20,gap:20}}>
            <TouchableOpacity style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}} onPress={() => setSortValue('New In')}>
              <Text></Text>
              <Text style={[styles.text,{fontSize:22,color:'rgba(0,0,0,0.50)',textAlign:'center'}]}>New In</Text>
              {sortValue === "New In" ? <FontAwesome size={24} color={Colors.primary} name='check' /> : <Text></Text>}
            </TouchableOpacity>
            <TouchableOpacity style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}} onPress={() => setSortValue('Best Rating')}>
              <Text></Text>
              <Text style={[styles.text,{fontSize:22,color:'rgba(0,0,0,0.50)',textAlign:'center'}]}>Best Rating</Text>
              {sortValue === "Best Rating" ? <FontAwesome size={24} color={Colors.primary} name='check' /> : <Text></Text>}
            </TouchableOpacity>
            <TouchableOpacity style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}} onPress={() => setSortValue("Lowest Price")}>
              <Text></Text>
              <Text style={[styles.text,{fontSize:22,color:'rgba(0,0,0,0.50)',textAlign:'center'}]}>Lowest Price</Text>
              {sortValue === "Lowest Price" ? <FontAwesome size={24} color={Colors.primary} name='check' />: <Text></Text>}
            </TouchableOpacity>
            <TouchableOpacity style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between'}} onPress={() => setSortValue("Highest Price")}>
              <Text></Text>
              <Text style={[styles.text,{fontSize:22,color:'rgba(0,0,0,0.50)',textAlign:'center'}]}>Highest Price</Text>
              {sortValue === "Highest Price" ? <FontAwesome size={24} color={Colors.primary} name='check' /> : <Text></Text>}
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
  headerContainer:{
    padding:20,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    gap:20,
    paddingBottom:10,
    borderBottomColor:'rgba(0,0,0,0.30)',
    borderBottomWidth:StyleSheet.hairlineWidth
  },
  searchWrapper:{
    flex:1
  },
  searchIcon:{
    position: 'absolute',
    top:10,
    left:10
  },
  searchContainer:{
    paddingVertical:10,
    paddingHorizontal:20,
    gap:20
  },
  recentSearch:{
    gap:10
  },
  headerText:{
    fontFamily:'roboto-condensed-sb',
    fontSize:20
  },
  recentSearchOutput:
  {
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  },
  text:{
    fontFamily:'roboto-condensed',
    color:Colors.grey,
    fontSize:18
  },
  filterHeader:{
    flexDirection:'row',
    alignItems:'center',
    borderBottomWidth:StyleSheet.hairlineWidth,
    borderColor:'rgba(0,0,0,0.20)'
  },
  filterHeaderSection:{
    paddingVertical:15,
    flexDirection:'row',
    gap:10,
    alignItems:'center',
    justifyContent:'center'
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
  bottomSheet:{
    elevation: 4,
        shadowColor: 'rgba(2, 84, 146, 0.30)',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 8,
        backgroundColor:'#fff'
  }
})

export default catalog