import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState, useRef } from 'react'
import { defaultStyles } from '../../constants/Styles'
import Colors from '../../constants/Colors'

const otp = () => {

    const inputRef = useRef<Array<TextInput>>([])

    const [inputValue1,setInputValue1] = useState<string>("")
    const [inputValue2,setInputValue2] = useState<string>("")
    const [inputValue3,setInputValue3] = useState<string>("")
    const [inputValue4,setInputValue4] = useState<string>("")
    const [inputValue5,setInputValue5] = useState<string>("")
    const [activeInput,setActiveInput] = useState<number>(1)

    const handleInputChange = (index:number,text:string) => {
        if(text === "" && index!==1)
        {
            setActiveInput(index-1)
            inputRef.current[index].focus()
            console.log(index-1);
            
        }
        else if (text !== "" && index !==5)
        {
            setActiveInput(index + 1)
            inputRef.current[index+1].focus()
            console.log(index+1);


        }
    }
  return (
    <View style={defaultStyles.container}>
        <Text style={{alignSelf:'center',fontSize:25,fontFamily:"roboto-condensed-sb",color:Colors.primary}}>OTP Verification</Text>
        

        <Text style={{color:"rgba(0,0,0,0.50)",fontFamily:'roboto-condensed',alignSelf:'center',marginTop:24}}>Enter the OTP sent to <Text style={{color:Colors.primary}}>You@Example.com</Text></Text>
        
        <View style={{flexDirection:'row',alignSelf:'center',gap:11,marginTop:12}}>
            <TextInput ref={(el) => inputRef.current[1] = el!} style={styles.optInput} value={inputValue1}  placeholder="" keyboardType='numeric' maxLength={1} onChangeText={(text) => {handleInputChange(1,text);setInputValue1(text)}}/>
            <TextInput ref={(el) => inputRef.current[2] = el!} style={styles.optInput} value={inputValue2}  placeholder="" keyboardType='numeric' maxLength={1} onChangeText={(text) => {handleInputChange(2,text);setInputValue2(text)}}/>
            <TextInput ref={(el) => inputRef.current[3] = el!} style={styles.optInput} value={inputValue3}  placeholder="" keyboardType='numeric' maxLength={1} onChangeText={(text) => {handleInputChange(3,text);setInputValue3(text)}}/>
            <TextInput ref={(el) => inputRef.current[4] = el!} style={styles.optInput} value={inputValue4}  placeholder="" keyboardType='numeric' maxLength={1} onChangeText={(text) => {handleInputChange(4,text);setInputValue4(text)}}/>
            <TextInput ref={(el) => inputRef.current[5] = el!} style={styles.optInput} value={inputValue5}  placeholder="" keyboardType='numeric' maxLength={1} onChangeText={(text) => {handleInputChange(5,text);setInputValue5(text)}}/>
        </View>
        

        <TouchableOpacity style={[defaultStyles.btn,{marginHorizontal:20,marginVertical:15}]}>
          <Text style={defaultStyles.btnText}>Verify Code</Text>
        </TouchableOpacity>
    
    </View>
  )
}

const styles = StyleSheet.create({
    optInput:{
        width:45,
        height:45,
        borderRadius:5,
        backgroundColor:'rgba(0,0,0,0.10)',
        textAlign:'center',
        fontFamily:'roboto-condensed-sb',
        color:Colors.primary,
        fontSize:22
    }
})

export default otp