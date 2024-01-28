import { View, Text, Image, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler';
import Colors from '../../constants/Colors'
import { Link } from 'expo-router';

const Page = () => {
  const [toggleCheckBox, setToggleCheckBox] = useState<boolean>(false)
  const [passwordVisible,setPasswordVisisble] = useState<boolean>(true)

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Forgot Password</Text>
      <Text style={styles.headerInfo}>To Create New Account, Please Select Method Of Recovery</Text>
    
    <Link href={'/(modals)/recovery'} style={{marginVertical:30,alignSelf:'center',flexGrow:1}}>
      <TouchableOpacity >
        <Image source={require('../../assets/images/ViaEmailBtn.png')} />
      </TouchableOpacity>
    </Link>
    {/* <Link href={'/(modals)/PhoneNumber'} style={{marginVertical:30,alignSelf:'center',flexGrow:1}}>
      <TouchableOpacity >
        <Image source={require('../../assets/images/ViaEmailBtn.png')} />
      </TouchableOpacity>
    </Link> */}

      

     

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