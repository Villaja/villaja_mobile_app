import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { defaultStyles } from '../../constants/Styles'
import Colors from '../../constants/Colors'
import { AntDesign } from '@expo/vector-icons'

const changePassword = () => {

    const [passwordVisible,setPasswordVisisble] = useState<boolean>(true)
  const [confirmPasswordVisible,setConfirmPasswordVisisble] = useState<boolean>(true)
  return (
    <View style={defaultStyles.container}>
        <Text style={{alignSelf:'center',fontSize:30,fontFamily:"roboto-condensed-sb",color:Colors.primary}}>Enter New Password</Text>

      <Text style={{alignSelf:'center',color:'rgba(0,0,0,0.40)',fontSize:16,fontFamily:"roboto-condensed",marginTop:8}} >Enter A New Password That Work For You</Text>
    
        <View style={{paddingHorizontal:20,marginVertical:16,gap:16}}>
            <View style={{gap:4}}>
                <Text style={{fontFamily:'roboto-condensed',fontSize:15,color:'rgba(0,0,0,0.70)'}}>Password</Text>
                <TextInput style={defaultStyles.inputField} secureTextEntry={passwordVisible} placeholder='Enter Your Password' placeholderTextColor={'rgba(0,0,0,0.20)'} />
                <TouchableOpacity style={{position:'absolute',right:6,top:36}} onPress={() => setPasswordVisisble(oldvalue => !oldvalue)}> 
                    <AntDesign name="eye" size={18} color={Colors.grey}  />
                </TouchableOpacity>
                </View>
                <View style={{gap:4}}>
                <Text style={{fontFamily:'roboto-condensed',fontSize:15,color:'rgba(0,0,0,0.70)'}}>Confirm Password</Text>
                <TextInput style={defaultStyles.inputField} secureTextEntry={confirmPasswordVisible} placeholder='Confirm Your Password' placeholderTextColor={'rgba(0,0,0,0.20)'} />
                <TouchableOpacity style={{position:'absolute',right:6,top:36}} onPress={() => setConfirmPasswordVisisble(oldvalue => !oldvalue)}> 
                    <AntDesign name="eye" size={18} color={Colors.grey}  />
                </TouchableOpacity>
            </View>
        </View>

        <View style={{paddingHorizontal:20}}>
            <View style={defaultStyles.btn}><Text style={defaultStyles.btnText}>Confirm</Text></View>
        </View>

    
    </View>
  )
}

export default changePassword