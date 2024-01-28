import { View, StyleSheet, TextInput, Text, TouchableOpacity,Image } from 'react-native';
import { useWarmUpBrowser } from '../../hooks/useWarmUpBrowser';
import { defaultStyles} from '../../constants/Styles'
import { Link, useRouter } from 'expo-router';
import React from 'react';

const Page = () => {
  useWarmUpBrowser();
  const router = useRouter()
  

  return (
    <View style={styles.container}>

      <Image style={{position:'absolute',left:20,top:-79}} source={require('../../assets/images/LoginRectangle1.png')} />
      <Image style={{position:'absolute',left:0,top:488}} source={require('../../assets/images/LoginRectangle2.png')} />
    
      <Image style={{alignSelf:'center',marginBottom:20}} source={require('../../assets/images/shoppingCart.png')} />
      <Image source={require('../../assets/images/logo.png')} />

      <Text style={{fontFamily:'roboto-condensed-sb-i',fontSize:44}}>The Best Online Shopping Has To Offer</Text>

      <TouchableOpacity style={defaultStyles.btn}>
        <Text style={defaultStyles.btnText}>Get Started</Text>
      </TouchableOpacity>

      <View style={{flexDirection:'row',gap:8,marginTop:16}}>

        <TouchableOpacity style={defaultStyles.btnStyleBorder} onPress={() => router.push('/(modals)/login')}>
          <Text style={defaultStyles.btnTextBorder}>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity style={defaultStyles.btnStyleBorder} onPress={() => router.push('/(modals)/register')}> 
          <Text style={defaultStyles.btnTextBorder}>Register</Text>
        </TouchableOpacity>
      </View>
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
