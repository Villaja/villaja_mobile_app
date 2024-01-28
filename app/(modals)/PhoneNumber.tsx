import React from 'react'
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import { Svg, Rect, Path } from 'react-native-svg';
import { defaultStyles } from '../../constants/Styles';
import { router, useRouter } from 'expo-router';



export default function PhoneNumber() {

  return (
    <view>
      <View style={defaultStyles.frame11}>
        <TouchableOpacity style={defaultStyles.ionchevronback}>
          <Svg style={defaultStyles.vector} width="8" height="14" viewBox="0 0 8 14" fill="none" >
            <Path d="M6.8125 1.375L1.1875 7L6.8125 12.625" stroke="black" strokeWidth="1.875" strokeLinecap="round" strokeLinejoin="round" />
          </Svg>
        </TouchableOpacity>
      </View>
      <Text style={defaultStyles.enteryourphonenumber}>
        {`enter your phone number`}
      </Text>
      <View style={defaultStyles.frame129}>
        <View style={defaultStyles.frame10}>
        <Image source={require('../../assets/images/phone number/pana.png')} resizeMode='contain' style={{alignSelf:'center',marginVertical:26}}/>
          <Text style={defaultStyles.wewillsendyoua5digitOTPcodetoverify}>
            {`we will send you a 5 digit OTP code to verify`}
          </Text>
          {/*still working on the country mobil number code selection*/}
          <View style={defaultStyles.frame9}>
            <View style={defaultStyles.frame99}>
              <View style={defaultStyles.frame100}>
                <Svg style={defaultStyles.group69} width="39" height="21" viewBox="0 0 39 21" fill="none" >
                  <Rect width="13" height="21" fill="#118E06" />
                  <Rect x="13" width="13" height="21" fill="white" />
                  <Rect x="26" width="13" height="21" fill="#118E06" />
                </Svg>
              </View>
              <Svg style={defaultStyles.polygon1} width="13" height="9" viewBox="0 0 13 9" fill="none" >
                <Path d="M6.8503 8.65851C6.5305 9.04921 5.93118 9.04336 5.61906 8.6465L0.206065 1.76394C-0.203425 1.24327 0.171836 0.480212 0.834203 0.486673L11.7934 0.593584C12.4558 0.600046 12.8161 1.37028 12.3965 1.88286L6.8503 8.65851Z" fill="black" fillOpacity="0.15" />
              </Svg>
            </View>
            <TextInput style={defaultStyles.enteryourphonenumer}>
              {`enter your phone numer`}
            </TextInput>
          </View>
        </View>
        <View style={defaultStyles.frame3}>
          <TouchableOpacity style={defaultStyles.getstarted} onPress={() => router.push(`/(modals)/otp`) }>
            {`send`}
          </TouchableOpacity>
        </View>
      </View>
    </view>
  )
}

