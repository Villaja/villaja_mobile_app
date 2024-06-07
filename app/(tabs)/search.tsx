import React, { useEffect, useRef, useState } from 'react';
import { View, Text, ActivityIndicator, ScrollView, StyleSheet, Image, Dimensions, ImageProps} from 'react-native';
import axios, { AxiosResponse } from 'axios';
import ProductCard from '../../components/ProductCard';
import { Product } from '../../types/Product';
import { base_url } from '../../constants/server';
import Colors from '../../constants/Colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';

const Tags = ["All","Price","Earpods","Iphone 15 Pro Max","Camera","Samsung"]

const Categories = [
  {
    name:"Phones",
    image:require('../../assets/images/PhoneCategory.png')
  },
  {
    name:"Accessories",
    image:require('../../assets/images/Earpods.png')
  },
  {
    name:"Computers",
    image:require('../../assets/images/Monitor.png')
  },
  {
    name:"Camera",
    image:require('../../assets/images/Camera.png')
  },
  {
    name:"Smart Watches",
    image:require('../../assets/images/SmartWatch.png')
  },
]

const {width} = Dimensions.get("window")

const explore: React.FC = () => {

  const [headerSelection,setHeaderSelection] = useState<string>('Products')
  const [loading, setLoading] = useState<boolean>(false);

  const scrollRef = useRef<ScrollView>()



  const renderCategoryCards = () => {
    return <View>
      {
        Categories.map((cat,index) => <ProductCategory key={index} category={cat.name} picture={cat.image} /> )
      }
      
    </View>
  }

  return (
    <View>
      <View style={styles.pageHeader}>
        <TouchableOpacity style={headerSelection === 'Products' ? styles.textContainerActive :styles.textContainer} onPress={() => setHeaderSelection('Products')}>
          <Text style={headerSelection === 'Products' ? styles.textActive :styles.text}>Products</Text>
        </TouchableOpacity>
        <TouchableOpacity  style={headerSelection === 'Merchants' ? styles.textContainerActive :styles.textContainer} onPress={() => setHeaderSelection('Merchants')}>
          <Text style={headerSelection === 'Merchants' ? styles.textActive :styles.text}>Merchants</Text>
        </TouchableOpacity>
      </View>
      
      <View style={{paddingHorizontal:18,paddingVertical:12,gap:12,backgroundColor:'#fff'}}>
          <TouchableOpacity style={{flexDirection:'row',gap:6,paddingVertical:8,paddingHorizontal:12,borderWidth:StyleSheet.hairlineWidth,borderColor:Colors.grey,borderRadius:5,backgroundColor:'rgba(0,0,0,0.03)'}} onPress={() => router.push('/search/searchPage')}>
            <AntDesign name='search1' size={18} color={Colors.grey} />
            <Text style={{color:Colors.grey,fontFamily:'roboto-condensed'}}>I Am Looking For...</Text>
          </TouchableOpacity>

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
              <Text style={{fontFamily:'roboto-condensed-sb',color:Colors.primary}}>{tag}</Text>
            </TouchableOpacity>)}
          </ScrollView>
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        {loading ? (
          <ActivityIndicator size="small" color={Colors.primary} style={styles.loadingIndicator} />
          ) : (
            renderCategoryCards()
            )}
      </ScrollView>
    </View>
  );
};


const ProductCategory = ({category,picture}:{category:string,picture:ImageProps}):JSX.Element => {
  
  return <TouchableOpacity style={styles.categoryContainer} onPress={() => router.push({ pathname: `/categoryCatalog/${category}`, params: { minPrice: "1", maxPrice: "5000000" } })}>
    <Text style={{fontFamily:'roboto-condensed-sb',fontSize:16}}>{category}</Text>
    <Image source={picture} style={styles.productPicture} resizeMode='contain'/>
  </TouchableOpacity>
}


const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 16,
    backgroundColor:'#fff'
  },
  pageHeader:{
    paddingTop:24,
    paddingHorizontal:60,
    width:'100%',
    height:53,
    flexDirection:'row',
    justifyContent:'space-between',
    backgroundColor:'#fff',
    borderBottomWidth:StyleSheet.hairlineWidth,
    borderBottomColor:'rgba(79,79,79,0.3)',
  },
  textContainer:{
    
    paddingHorizontal:12,
    paddingBottom:12
  },
  textContainerActive:{
    borderBottomWidth:2,
    borderBottomColor:Colors.primary,
    paddingHorizontal:12,
    paddingBottom:8


  },
  text:{
    fontFamily:'roboto-condensed',
    fontSize:16,
    color:Colors.grey,
    
  },
  textActive:{
    fontFamily:'roboto-condensed',
    fontSize:16,
    color:Colors.primary
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

  categoryContainer:{
    width,
    flexDirection:'row',
    paddingLeft: 36,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth:StyleSheet.hairlineWidth,
    borderTopColor:'rgba(0,0,0,0.05)',

  },

  productPicture:{
    width:170,
    height:110,
  }
});

export default explore