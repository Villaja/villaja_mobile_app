import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { defaultStyles } from '../../constants/Styles'
import Colors from '../../constants/Colors'
import { useRouter } from 'expo-router'

const recovery = () => {
    const router = useRouter()
  return (
    <View style={defaultStyles.container}>
        <Text style={{alignSelf:'center',fontSize:25,fontFamily:"roboto-condensed-sb",color:Colors.primary}}>Recovery Account</Text>
        <Image source={require('../../assets/images/recovery.png')}  style={{alignSelf:'center',marginVertical:26, width: 147, height: 146}} />

        <View style={{gap:4,marginHorizontal:20}}>
          <Text style={{fontFamily:'roboto-condensed',fontSize:15,color:'rgba(0,0,0,0.50)'}}>Please, Enter Your Email Address. You Will Receive An OTP For Accounts Recovery</Text>
          <TextInput style={defaultStyles.inputField} placeholder='Enter Your Email' placeholderTextColor={'rgba(0,0,0,0.20)'} />
        </View>

        <TouchableOpacity style={[defaultStyles.btn,{marginHorizontal:20,marginVertical:15}]} onPress={() => router.push('/(modals)/otp')}>
          <Text style={defaultStyles.btnText}>Send</Text>
        </TouchableOpacity>
    
    </View>
  )
}

export default recovery