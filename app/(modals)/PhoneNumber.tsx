import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, Modal, FlatList } from 'react-native';
import { Svg, Rect, Path } from 'react-native-svg';
import { defaultStyles } from '../../constants/Styles';
import { Link, useRouter } from 'expo-router';

const countryCodes = [
  { id: '1', code: '+1', name: 'United States' },
  { id: '44', code: '+44', name: 'United Kingdom' },
  { id: '81', code: '+81', name: 'Japan' },
  { id: '49', code: '+49', name: 'Germany' },
  { id: '86', code: '+86', name: 'China' },
  { id: '91', code: '+91', name: 'India' },
  { id: '7', code: '+7', name: 'Russia' },
  { id: '33', code: '+33', name: 'France' },
  { id: '55', code: '+55', name: 'Brazil' },
  { id: '39', code: '+39', name: 'Italy' },
  { id: '81', code: '+81', name: 'Japan' },
  { id: '82', code: '+82', name: 'South Korea' },
  { id: '34', code: '+34', name: 'Spain' },
  { id: '52', code: '+52', name: 'Mexico' },
  { id: '61', code: '+61', name: 'Australia' },
  { id: '46', code: '+46', name: 'Sweden' },
  { id: '31', code: '+31', name: 'Netherlands' },
  { id: '62', code: '+62', name: 'Indonesia' },
  { id: '54', code: '+54', name: 'Argentina' },
  { id: '27', code: '+27', name: 'South Africa' },
  { id: '91', code: '+91', name: 'India' },
  { id: '7', code: '+7', name: 'Russia' },
  { id: '81', code: '+81', name: 'Japan' },
  { id: '86', code: '+86', name: 'China' },
  { id: '92', code: '+92', name: 'Pakistan' },
  { id: '880', code: '+880', name: 'Bangladesh' },
  { id: '234', code: '+234', name: 'Nigeria' },
  { id: '62', code: '+62', name: 'Indonesia' },
  { id: '966', code: '+966', name: 'Saudi Arabia' },
  { id: '90', code: '+90', name: 'Turkey' },
  { id: '33', code: '+33', name: 'France' },
  { id: '49', code: '+49', name: 'Germany' },
  { id: '34', code: '+34', name: 'Spain' },
  { id: '54', code: '+54', name: 'Argentina' },
  { id: '63', code: '+63', name: 'Philippines' },
  { id: '82', code: '+82', name: 'South Korea' },
  { id: '84', code: '+84', name: 'Vietnam' },
  { id: '351', code: '+351', name: 'Portugal' },
  { id: '357', code: '+357', name: 'Cyprus' },
];


export default function PhoneNumber() {
  const router = useRouter();
  const [selectedCountryCode, setSelectedCountryCode] = useState(countryCodes[0]);
  const [modalVisible, setModalVisible] = useState(false);

  const renderCountryCodeItem = (item:any) => (
    <TouchableOpacity
      // style={defaultStyles.countryCodeItem}
      onPress={() => {
        setSelectedCountryCode(item);
        setModalVisible(false);
      }}
    >
      <Text>{`${item.name} ${item.code}`}</Text>
    </TouchableOpacity>
  );

  return (
    <View>
      <View style={defaultStyles.frame11}>
        <TouchableOpacity style={defaultStyles.ionchevronback}>
          <Svg style={defaultStyles.vector} width="8" height="14" viewBox="0 0 8 14" fill="none">
            <Path d="M6.8125 1.375L1.1875 7L6.8125 12.625" stroke="black" strokeWidth="1.875" strokeLinecap="round" strokeLinejoin="round" />
          </Svg>
        </TouchableOpacity>
      </View>
      <Text style={defaultStyles.enteryourphonenumber}>
        {`enter your phone number`}
      </Text>
      <View style={defaultStyles.frame129}>
        <View style={defaultStyles.frame10}>
          <Image source={require('../../assets/images/phone number/pana.png')} resizeMode='contain' style={{ alignSelf: 'center', marginVertical: 26 }} />
          <Text style={defaultStyles.wewillsendyoua5digitOTPcodetoverify}>
            {`we will send you a 5 digit OTP code to verify`}
          </Text>

          {/* Country Code Button */}
          <TouchableOpacity
            // style={defaultStyles.countryCodeButton}
            onPress={() => setModalVisible(true)}
          >
            <Text>{selectedCountryCode.code}</Text>
            <Svg
            //  style={defaultStyles.dropdownIcon} 
            width="13" height="9" viewBox="0 0 13 9" fill="none">
              <Path d="M6.8503 8.65851C6.5305 9.04921 5.93118 9.04336 5.61906 8.6465L0.206065 1.76394C-0.203425 1.24327 0.171836 0.480212 0.834203 0.486673L11.7934 0.593584C12.4558 0.600046 12.8161 1.37028 12.3965 1.88286L6.8503 8.65851Z" fill="black" fillOpacity="0.15" />
            </Svg>
          </TouchableOpacity>

          {/* Country Code Modal */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View 
            // style={defaultStyles.modalContainer}
            >
              <FlatList
                data={countryCodes}
                keyExtractor={(item) => item.id}
                renderItem={({item}) => renderCountryCodeItem(item)}
              />
            </View>
          </Modal>

          {/* Phone Number Input */}
          <View style={defaultStyles.frame9}>
            <View style={defaultStyles.frame99}>
              <View style={defaultStyles.frame100}>
                <Svg style={defaultStyles.group69} width="39" height="21" viewBox="0 0 39 21" fill="none">
                  <Rect width="13" height="21" fill="#118E06" />
                  <Rect x="13" width="13" height="21" fill="white" />
                  <Rect x="26" width="13" height="21" fill="#118E06" />
                </Svg>
              </View>
              <Svg style={defaultStyles.polygon1} width="13" height="9" viewBox="0 0 13 9" fill="none">
                <Path d="M6.8503 8.65851C6.5305 9.04921 5.93118 9.04336 5.61906 8.6465L0.206065 1.76394C-0.203425 1.24327 0.171836 0.480212 0.834203 0.486673L11.7934 0.593584C12.4558 0.600046 12.8161 1.37028 12.3965 1.88286L6.8503 8.65851Z" fill="black" fillOpacity="0.15" />
              </Svg>
            </View>
            <TextInput
              style={defaultStyles.enteryourphonenumer}
              placeholder={`Enter your phone number`}
            />
          </View>
        </View>
        <View style={defaultStyles.frame3}>
          <TouchableOpacity style={defaultStyles.getstarted} onPress={() => router.push(`/(modals)/otp`)}>
            <Text>{`Send`}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
