import { View, Text, Image, TextInput, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { defaultStyles } from '../../constants/Styles'
import Colors from '../../constants/Colors'
import { useRouter,useLocalSearchParams } from 'expo-router'
import { base_url } from '../../constants/server'

 // Replace with your actual base URL

const Recovery = () => {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const { user_type } = useLocalSearchParams();

    const handleSend = async () => {
        if (!email) {
            Alert.alert('Error', 'Please enter your email address.')
            return
        }

        setLoading(true)
        console.log('user_type', user_type)
        const endpoint = user_type === 'shop' ? 'shop/forgot-password' : 'user/forgot-password';

        try {
          const response = await fetch(`${base_url}/${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            })

            const result = await response.json()

            if (response.ok) {
                Alert.alert('Success', 'a password reset link has been sent to your email.')
                user_type==='shop' ? router.push('/sellerAuthScreens/SellerLogin') : router.push('/(modals)/login')
            } else {
                Alert.alert('Error', result.message || 'Something went wrong. Please try again.')
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to send request. Please check your internet connection and try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <View style={defaultStyles.container}>
            <Text style={{alignSelf:'center',fontSize:25,fontFamily:"roboto-condensed-sb",color:Colors.primary}}>Recovery Account</Text>
            <Image source={require('../../assets/images/recovery.png')} style={{alignSelf:'center',marginVertical:26, width: 147, height: 146}} />

            <View style={{gap:4,marginHorizontal:20}}>
                <Text style={{fontFamily:'roboto-condensed',fontSize:15,color:'rgba(0,0,0,0.50)'}}>Please, Enter Your Email Address. You Will Receive An OTP For Accounts Recovery</Text>
                <TextInput 
                    style={defaultStyles.inputField} 
                    placeholder='Enter Your Email' 
                    placeholderTextColor={'rgba(0,0,0,0.20)'}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType='email-address'
                    autoCapitalize='none'
                />
            </View>

            <TouchableOpacity 
                style={[defaultStyles.btn,{marginHorizontal:20,marginVertical:15, opacity: loading ? 0.5 : 1}]} 
                onPress={handleSend}
                disabled={loading}
            >
                <Text style={defaultStyles.btnText}>{loading ? 'Sending...' : 'Send'}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Recovery
