import { View, Text, TouchableOpacity , Image, StyleSheet} from 'react-native'
import React, { useEffect, useState } from 'react'
import { defaultStyles } from '../constants/Styles';
import Colors from '../constants/Colors';
import { Product } from '../types/Product';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import BouncyCheckbox from 'react-native-bouncy-checkbox'


interface Props {
  id: number;
  name: string;
  originalPrice: number;
  discountPrice: number;
  image: string;
}



const CartCard = ({item,handleRemoveCart}:{item:Product,handleRemoveCart:(id:string) => void}) => {
  const router = useRouter()
  const [toggleCheckBox, setToggleCheckBox] = useState<boolean>(item.isSavedForLater! || false)


  const handleSaveForLater = async() => {
    var cart = [] as Product[]
    try{
      await AsyncStorage.getItem('cart',(err,result) => {
        cart = JSON.parse(result!)
        cart = cart.filter((it) => it._id !== item._id)
      })
      if(toggleCheckBox)
      {
        await AsyncStorage.setItem('cart',JSON.stringify([...cart , {...item, isSavedForLater : true}]))
      }
      else
      {
        await AsyncStorage.setItem('cart',JSON.stringify([...cart , {...item, isSavedForLater : false}]))
      } 
      // console.log("Successfully updated Cart");
      
    }
    catch(err)
    {
      console.log(err);
      
    }
  }


  useEffect(() => {
    handleSaveForLater()
  },[toggleCheckBox])

  
  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Image source={{uri:item.images[0]?.url}} style={styles.image} />
        <View style={{paddingVertical:12.5}}>
            <Text numberOfLines={2} style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>₦{item.originalPrice.toLocaleString()}</Text>
            <Text style={styles.discount}>{item.discountPrice === 0?null:'₦'+item.discountPrice.toLocaleString()}</Text>
        </View>
      </View>

      <BouncyCheckbox
          size={20}
          fillColor={Colors.primary}
          unfillColor="#FFFFFF"
          text="Buy Later"
          iconStyle={{ borderColor:Colors.primary }}
          innerIconStyle={{ borderWidth: 2 }}
          textStyle={{ fontFamily: "roboto-condensed",fontSize:13 }}
          onPress={(isChecked: boolean) => {setToggleCheckBox(isChecked)}}
          isChecked={toggleCheckBox}
        />
      
        <TouchableOpacity style={[defaultStyles.btn,{backgroundColor:Colors.primaryTransparent}]} onPress={() => handleRemoveCart(item._id)}>
            <Text style={[defaultStyles.btnText,{color:Colors.primary}]}>Remove</Text>
        </TouchableOpacity>
      
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        gap:15,
        padding:14,
        backgroundColor:'#fff',
        borderRadius:5,
        elevation: 4,
        shadowColor: 'rgba(2, 84, 146, 0.10)',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 8,
        marginBottom:16

    },
    topSection:{
        flexDirection:'row',
        gap:18,
        
    },
    image:{
        width:83,
        height:83,
        resizeMode:'contain',
        borderRadius:3,
        borderColor:'rgba(0,0,0,0.05)'
    },
    name:{
        fontFamily:'roboto-condensed',
        fontWeight:'500',
        color:'rgba(0,0,0,0.50)',
        marginBottom:6, 
        maxWidth: 180,                                                   
    },
    price:{
        fontFamily:'roboto-condensed',
        fontSize:18,
        color:Colors.primary,
        fontWeight:'500'
    },
    discount:{
        fontFamily:'roboto-condensed',
        fontSize:10,
        color:'rgba(0,0,0,0.30)',
        fontWeight:'500',
        textDecorationLine:'line-through'
    }
})

export default CartCard