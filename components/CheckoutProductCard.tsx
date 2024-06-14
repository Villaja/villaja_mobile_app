import { View, Text, TouchableOpacity , Image, StyleSheet} from 'react-native'
import React from 'react'
import { defaultStyles } from '../constants/Styles';
import Colors from '../constants/Colors';
import { AntDesign } from '@expo/vector-icons';
import { Product } from '../types/Product';

interface Props {
  id: number;
  name: string;
  originalPrice: number;
  discountPrice: number;
  image: string;
}



const CheckoutProductCard = (item:Product) => {
  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <View style={styles.imageContainer}>
            <Image source={{uri:item.images[0].url}} style={styles.image} />
        </View>
        <View style={{paddingVertical:12.5}}>
            <Text numberOfLines={2} style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>₦{item.originalPrice.toLocaleString()}</Text>
            {item.discountPrice > 0 && <Text style={styles.discount}>₦{item.discountPrice}</Text>}
        </View>
      </View>

    
      
        
      
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        gap:15,
        padding:20,
        backgroundColor:'#fff',
        borderRadius:5,
        elevation: 4,
        shadowColor: 'rgba(2, 84, 146, 0.10)',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 8,
        borderBottomWidth:StyleSheet.hairlineWidth,
        borderBottomColor:'rgba(0,0,0,0.10)'

    },
    topSection:{
        flexDirection:'row',
        gap:18,
        
    },
    imageContainer:{
         width:83,
        height:83,
        borderRadius:3,
    },
    image:{
        width:83,
        height:83,
        resizeMode:'contain',
        borderRadius:3,
        borderWidth:StyleSheet.hairlineWidth,
        borderColor:'rgba(0,0,0,0.05)',
        position:'absolute',
        
    },
    name:{
        fontFamily:'roboto-condensed',
        fontWeight:'500',
        color:'rgba(0,0,0,0.50)',
        marginBottom:6,  
        maxWidth: 210                                                   
    },
    price:{
        fontFamily:'roboto-condensed',
        fontSize:18,
                color:'rgba(0,0,0,0.50)',

        fontWeight:'500'
    },
    discount:{
        fontFamily:'roboto-condensed',
        fontSize:10,
        color:'rgba(0,0,0,0.30)',
        fontWeight:'500',
        textDecorationLine:'line-through'
    },
    closeBtn:{
        position:'absolute',
        right:30,
        top:20,
        opacity:0.3
    }
})

export default CheckoutProductCard