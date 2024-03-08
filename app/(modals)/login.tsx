import { View, StyleSheet, TextInput, Text, TouchableOpacity, Image, Alert, ScrollView } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useWarmUpBrowser } from '../../hooks/useWarmUpBrowser';
import { defaultStyles } from '../../constants/Styles'
import Colors from '../../constants/Colors';
import { useState } from 'react';
import { AntDesign, FontAwesome5 } from '@expo/vector-icons';
import { Link, router } from 'expo-router';
import React from 'react';
import { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';



const Page = () => {
  useWarmUpBrowser();
  const [toggleCheckBox, setToggleCheckBox] = useState<boolean>(false)
  const [passwordVisible, setPasswordVisisble] = useState<boolean>(true)

  const { login, isLoading, error, user } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await login(email, password);
      // Navigate to the home screen or handle it based on your navigation structure
    } catch (error) {
      Alert.alert('Login Failed', 'Invalid credentials. Please try again.', [{ text: 'OK' }]);
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      router.replace('/')
      console.log("successs")
    }

  })

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>

      <View style={styles.container}>
        <Text style={styles.headerText}>Welcome Back</Text>
        <Text style={styles.headerInfo}>You Are Welcome Back To Villaja. Please Fill In Your Details</Text>

        <View style={{ marginTop: 30, gap: 12 }}>
          <View style={{ gap: 4 }}>
            <Text style={{ fontFamily: 'roboto-condensed', fontSize: 15, color: 'rgba(0,0,0,0.70)' }}>Email</Text>
            <TextInput style={defaultStyles.inputField} returnKeyType="done" placeholder='Enter Your Email' value={email}
              onChangeText={(text) => setEmail(text)} placeholderTextColor={'rgba(0,0,0,0.20)'} />
          </View>
          <View style={{ gap: 4 }}>
            <Text style={{ fontFamily: 'roboto-condensed', fontSize: 15, color: 'rgba(0,0,0,0.70)' }}>Password</Text>
            <TextInput style={defaultStyles.inputField} secureTextEntry={passwordVisible} value={password}
              onChangeText={(text) => setPassword(text)} placeholder='Enter Your Password' returnKeyType="done" placeholderTextColor={'rgba(0,0,0,0.20)'} />
            {error && <Text style={{ color: 'red', marginTop: 10, marginBottom: 10 }}>{error}</Text>}
            <TouchableOpacity style={{ position: 'absolute', right: 1, top: 33, width: 40, height: 30, justifyContent: "center", alignItems: "center" }} onPress={() => setPasswordVisisble(oldvalue => !oldvalue)}>
              <AntDesign name="eye" size={18} color={Colors.grey} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ marginVertical: 6, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <BouncyCheckbox
            size={17}
            fillColor={Colors.primary}
            unfillColor="#FFFFFF"
            text="Remember me"
            iconStyle={{ borderColor: Colors.primary }}
            innerIconStyle={{ borderWidth: 2 }}
            textStyle={{ fontFamily: "roboto-condensed", fontSize: 13 }}
            onPress={(isChecked: boolean) => { setToggleCheckBox(isChecked) }}
          />

          <Link href={'/(modals)/forgotPassword'}>
            <Text style={{ color: Colors.grey, textDecorationLine: 'underline', fontSize: 10, fontFamily: 'roboto-condensed' }}>Forgot Your Password?</Text>
          </Link>
        </View>

        <View style={{ marginTop: 25, gap: 13 }}>
          <TouchableOpacity style={defaultStyles.btn} onPress={handleLogin}>
            <Text style={defaultStyles.btnText}>{isLoading ? 'Loading...' : 'Login'}</Text>
          </TouchableOpacity>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontFamily: 'roboto-condensed', fontSize: 13, color: "#00000050", fontWeight: "500" }}>Don't have and account?</Text>
            <Link href='/(modals)/register'> <Text style={{ fontFamily: 'roboto-condensed-sb', color: Colors.primary }}>Sign Up</Text></Link>
          </View>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2, marginVertical: 26 }}>
          <View style={{ borderBottomColor: Colors.grey, borderBottomWidth: StyleSheet.hairlineWidth, flexGrow: 1 }}></View>
          <Text style={{ fontFamily: 'roboto-condensed', fontSize: 13, color: Colors.grey }}>OR</Text>
          <View style={{ borderBottomColor: Colors.grey, borderBottomWidth: StyleSheet.hairlineWidth, flexGrow: 1 }}></View>
        </View>

        <View style={{ gap: 12 }}>
          <TouchableOpacity style={defaultStyles.ThirdPartyBtn}>
            <Image source={require('../../assets/images/google.png')} style={{ width: 15, height: 15 }} />
            <Text style={[defaultStyles.btnText, { color: '#00000080', fontFamily: 'roboto-condensed', fontWeight: "700", fontSize: 13 }]}>Login With Google</Text>
          </TouchableOpacity>
          <TouchableOpacity style={defaultStyles.ThirdPartyBtn}>
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
    paddingVertical: 35,
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
