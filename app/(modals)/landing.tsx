import { View, StyleSheet, TextInput, Text, TouchableOpacity,Image, Dimensions } from 'react-native';
import { useWarmUpBrowser } from '../../hooks/useWarmUpBrowser';
import { defaultStyles} from '../../constants/Styles'
import { Link, useRouter } from 'expo-router';
import React from 'react';

const {width} = Dimensions.get('window')

const Page = () => {
  useWarmUpBrowser();
  const router = useRouter()
  

  return (
    <View style={styles.container}>

      <Image style={{width: 522.84, height: 590.83, position: 'absolute', top: -146, left: 20}} source={require('../../assets/images/Rectangle3.png')} />
      <Image style={{position:'absolute',left:0,top: 505}} source={require('../../assets/images/Rectangle4.png')} />

      <View style={{width:width * 0.8,height:width *0.8,alignSelf:'center', marginBottom: 80}}>
        <Image style={{alignSelf:'center',marginBottom:20,width: 233,height: 330, left: 20, top: 7 }} source={require('../../assets/images/shoppingCart.png')} />
      </View>
      <Text style={{fontFamily:'roboto-condensed-sb-i',fontSize:40, color: "#2C3033"}}>The Best Online Shopping Has To Offer</Text>

      <TouchableOpacity style={{
    backgroundColor: '#025492',
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 130
    }} onPress={() => router.push('/(modals)/register')} >
        <Text style={defaultStyles.btnText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical:60,
    paddingHorizontal:20
  },

  
});
