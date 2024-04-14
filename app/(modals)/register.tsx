import { View, StyleSheet, TextInput, Text, TouchableOpacity, Alert, ScrollView, Image } from 'react-native';
import { useWarmUpBrowser } from '../../hooks/useWarmUpBrowser';
import { defaultStyles } from '../../constants/Styles';
import { AntDesign, FontAwesome5 } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { Link, router } from 'expo-router';
import { useState } from 'react';
import React from 'react';
import { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';



const Page = () => {
  useWarmUpBrowser();
  const [toggleCheckBox, setToggleCheckBox] = useState<boolean>(false)
  const { register, isLoading, error, user } = useAuth();
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [phoneNumber, setPhonenumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  const [passwordVisible, setPasswordVisisble] = useState<boolean>(true)
  const [confirmPasswordVisible, setConfirmPasswordVisisble] = useState<boolean>(true)

  const handleRegister = async () => {
    try {
      await register(firstname, lastname, phoneNumber, email, password);
      Alert.alert('Verifiy Your Acount', 'please check your email to activate your account with the verification code', [{ text: 'OK' }]);
      router.replace('/(modals)/otp')
      // Navigate to the home screen or handle it based on your navigation structure
    } catch (error) {
      Alert.alert('Registration Failed', 'Unable to register. Please try again.', [{ text: 'OK' }]);
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      router.replace('/(tabs)')
    }
  })



  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.headerText}>Lets Get Started</Text>
        <Text style={styles.headerInfo}>You Are Welcome Back To Villaja. Please Fill In Your Details To Create Your Account</Text>

        <View style={{ marginTop: 30, gap: 12 }}>
          <View style={{ gap: 4 }}>
            <Text style={{ fontFamily: 'roboto-condensed', fontSize: 15, color: 'rgba(0,0,0,0.70)' }}>First Name</Text>
            <TextInput style={defaultStyles.inputField} value={firstname}
              onChangeText={(text) => setFirstname(text)} placeholder='Enter Your Firstname' placeholderTextColor={'rgba(0,0,0,0.20)'} />
          </View>
          <View style={{ gap: 4 }}>
            <Text style={{ fontFamily: 'roboto-condensed', fontSize: 15, color: 'rgba(0,0,0,0.70)' }}>Last Name</Text>
            <TextInput style={defaultStyles.inputField} value={lastname}
              onChangeText={(text) => setLastname(text)} placeholder='Enter Your Last' placeholderTextColor={'rgba(0,0,0,0.20)'} />
          </View>
          <View style={{ gap: 4 }}>
            <Text style={{ fontFamily: 'roboto-condensed', fontSize: 15, color: 'rgba(0,0,0,0.70)' }}>Email</Text>
            <TextInput style={defaultStyles.inputField} value={email}
              onChangeText={(text) => setEmail(text)} returnKeyType="done" placeholder='Enter Your Email' placeholderTextColor={'rgba(0,0,0,0.20)'} />
          </View>
          <View style={{ gap: 4 }}>
            <Text style={{ fontFamily: 'roboto-condensed', fontSize: 15, color: 'rgba(0,0,0,0.70)' }}>Phone Number</Text>
            <TextInput style={defaultStyles.inputField} value={phoneNumber}
              onChangeText={(text) => setPhonenumber(text)} returnKeyType="done" placeholder='Enter Your Email' placeholderTextColor={'rgba(0,0,0,0.20)'} />
          </View>
          <View style={{ gap: 4 }}>
            <Text style={{ fontFamily: 'roboto-condensed', fontSize: 15, color: 'rgba(0,0,0,0.70)' }}>Password</Text>
            <TextInput style={defaultStyles.inputField} secureTextEntry={passwordVisible} placeholder='Enter Your Password' value={password} returnKeyType="done"
              onChangeText={(text) => setPassword(text)} placeholderTextColor={'rgba(0,0,0,0.20)'} />
            <TouchableOpacity style={{ position: 'absolute', right: 6, top: 36 }} onPress={() => setPasswordVisisble(oldvalue => !oldvalue)}>
              <AntDesign name="eye" size={18} color={Colors.grey} />
            </TouchableOpacity>
          </View>
          <View style={{ gap: 4 }}>
            <Text style={{ fontFamily: 'roboto-condensed', fontSize: 15, color: 'rgba(0,0,0,0.70)' }}>Confirm Password</Text>
            <TextInput style={defaultStyles.inputField} returnKeyType="done" secureTextEntry={confirmPasswordVisible} placeholder='Confirm Your Password' placeholderTextColor={'rgba(0,0,0,0.20)'} />
            <TouchableOpacity style={{ position: 'absolute', right: 6, top: 36 }} onPress={() => setConfirmPasswordVisisble(oldvalue => !oldvalue)}>
              <AntDesign name="eye" size={18} color={Colors.grey} />
            </TouchableOpacity>
          </View>
          {error && <Text style={{ color: 'red', marginTop: 10, marginBottom: 10 }}>{error}</Text>}
        </View>

        <View style={{ marginVertical: 6, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <BouncyCheckbox
            size={18}
            fillColor={Colors.primary}
            unfillColor="#FFFFFF"
            text="I Agree with the Terms and Conditions"
            iconStyle={{ borderColor: Colors.primary }}
            innerIconStyle={{ borderWidth: 2 }}
            textStyle={{ fontFamily: "roboto-condensed", fontSize: 9, }}
            onPress={(isChecked: boolean) => { setToggleCheckBox(isChecked) }}
          />
        </View>

        <View style={{ marginTop: 15, gap: 13 }}>
          <TouchableOpacity style={defaultStyles.btn} onPress={handleRegister}>
            <Text style={defaultStyles.btnText}>{isLoading ? 'Loading...' : 'Contnue'}</Text>
          </TouchableOpacity>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontFamily: 'roboto-condensed', color: "#00000050" }}>Already have and account?</Text>
            <Link href='/(modals)/login'> <Text style={{ fontFamily: 'roboto-condensed-sb', color: Colors.primary }}>Sign In</Text></Link>
          </View>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2, marginVertical: 16 }}>
          <View style={{ borderBottomColor: Colors.grey, borderBottomWidth: StyleSheet.hairlineWidth, flexGrow: 1 }}></View>
          <Text style={{ fontFamily: 'roboto-condensed', fontSize: 13, color: Colors.grey }}>OR</Text>
          <View style={{ borderBottomColor: Colors.grey, borderBottomWidth: StyleSheet.hairlineWidth, flexGrow: 1 }}></View>
        </View>

        <View style={{ gap: 12 }}>
          <TouchableOpacity style={defaultStyles.ThirdPartyBtn}>
            <Image source={require('../../assets/images/google.png')} style={{ width: 15, height: 15 }} />
            <Text style={[defaultStyles.btnText, { color: '#00000080', fontFamily: 'roboto-condensed', fontWeight: "700", fontSize: 13 }]}>Login With Google</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{
            backgroundColor: "rgba(0,0,0,0.03)",
            height: 50,
            borderRadius: 10,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 8,
            marginBottom: 50
          }}>
            <Image source={require('../../assets/images/facebook.png')} style={{ width: 15, height: 15 }} />
            <Text style={[defaultStyles.btnText, { color: '#00000080', fontFamily: 'roboto-condensed', fontWeight: "700", fontSize: 13 }]}>Login With Facebook</Text>
          </TouchableOpacity>
        </View>



      </View>
    </ScrollView>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 4,
    paddingHorizontal: 20
  },
  headerText: {
    fontFamily: 'roboto-condensed-sb-i',
    fontSize: 35,
    color: Colors.primary,
    marginBottom: 4
  },
  headerInfo: {
    color: Colors.grey,
    fontFamily: 'roboto-condensed',
    fontSize: 15
  }



});
