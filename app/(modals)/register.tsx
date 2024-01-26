import { View, StyleSheet, TextInput, Text, TouchableOpacity } from 'react-native';
import { useWarmUpBrowser } from '../../hooks/useWarmUpBrowser';
import { defaultStyles } from '../../constants/Styles';
import { AntDesign, FontAwesome5 } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { Link } from 'expo-router';
import { useState } from 'react';


const Page = () => {
  useWarmUpBrowser();
  const [toggleCheckBox, setToggleCheckBox] = useState<boolean>(false)
  const [passwordVisible,setPasswordVisisble] = useState<boolean>(true)
  const [confirmPasswordVisible,setConfirmPasswordVisisble] = useState<boolean>(true)

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Lets Get Started</Text>
      <Text style={styles.headerInfo}>You Are Welcome Back To Villaja. Please Fill In Your Details To Create Your Account</Text>

      <View style={{marginTop:30,gap:12}}>
        <View style={{gap:4}}>
          <Text style={{fontFamily:'roboto-condensed',fontSize:15,color:'rgba(0,0,0,0.70)'}}>Username</Text>
          <TextInput style={defaultStyles.inputField} placeholder='Enter Your Username' placeholderTextColor={'rgba(0,0,0,0.20)'} />
        </View>
        <View style={{gap:4}}>
          <Text style={{fontFamily:'roboto-condensed',fontSize:15,color:'rgba(0,0,0,0.70)'}}>Email</Text>
          <TextInput style={defaultStyles.inputField} placeholder='Enter Your Email' placeholderTextColor={'rgba(0,0,0,0.20)'} />
        </View>
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

      <View style={{marginVertical:6,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
        <BouncyCheckbox
          size={25}
          fillColor={Colors.primary}
          unfillColor="#FFFFFF"
          text="I Agree with the Terms and Condition and Privacy Policy"
          
          iconStyle={{ borderColor:Colors.primary }}
          innerIconStyle={{ borderWidth: 2 }}
          textStyle={{ fontFamily: "roboto-condensed",fontSize:10}}
          onPress={(isChecked: boolean) => {setToggleCheckBox(isChecked)}}
        />

        <Text style={{color:Colors.grey,textDecorationLine:'underline',fontSize:10,fontFamily:'roboto-condensed'}}>Forgot Your Password?</Text>
      </View>

      <View style={{flexDirection:'row',alignItems:'center',gap:2,marginVertical:16}}>
        <View style={{borderBottomColor:Colors.grey,borderBottomWidth:StyleSheet.hairlineWidth,flexGrow:1}}></View>
        <Text style={{fontFamily:'roboto-condensed',fontSize:13,color:Colors.grey}}>OR</Text>
        <View style={{borderBottomColor:Colors.grey,borderBottomWidth:StyleSheet.hairlineWidth,flexGrow:1}}></View>
      </View>

      <View style={{gap:12}}>
        <TouchableOpacity style={defaultStyles.ThirdPartyBtn}>
          <AntDesign name="google" size={15} color={Colors.primary} />
          <Text style={[defaultStyles.btnText,{color:'#000',fontFamily:'roboto-condensed'}]}>Login With Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={defaultStyles.ThirdPartyBtn}>
          <FontAwesome5 name="facebook" size={15} color={Colors.primary} />
          <Text style={[defaultStyles.btnText,{color:'#000',fontFamily:'roboto-condensed'}]}>Login With Facebook</Text>
        </TouchableOpacity>
      </View>

      <View style={{marginTop:15,gap:13}}>
        <TouchableOpacity style={defaultStyles.btn}>
          <Text style={defaultStyles.btnText}>Continue</Text>
        </TouchableOpacity>
        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
          <Text style={{fontFamily:'roboto-condensed'}}>Already have and account?</Text>
          <Link href='/(modals)/login'> <Text style={{fontFamily:'roboto-condensed-sb',color:Colors.primary}}>Sign In</Text></Link>
        </View>
      </View>
      
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical:6,
    paddingHorizontal:20
  },
  headerText:{
    fontFamily:'roboto-condensed-sb-i',
    fontSize:35,
    color:Colors.primary,
    marginBottom:4
  },
  headerInfo:{
    color:Colors.grey,
    fontFamily:'roboto-condensed',
    fontSize:16
  }


  
});
