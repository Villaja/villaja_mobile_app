import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { defaultStyles } from '../../constants/Styles'
import Colors from '../../constants/Colors'
import { RangeSlider } from '@react-native-assets/slider'
import { TextInput } from 'react-native-gesture-handler'
import { useLocalSearchParams, useRouter } from 'expo-router'

const filter = () => {
    
    const router = useRouter()
    const {id,prevRouteName} = useLocalSearchParams()

    const [minPrice,setMinPrice] = useState<number>(1)
    const [maxPrice,setMaxPrice] = useState<number>(1)

    const handleApplyFilter = () => {
        router.replace({pathname:`/${prevRouteName}/${id}`,params:{minPrice:minPrice.toString(),maxPrice:maxPrice.toString()}})
    }
  return (
    <View style={{flex:1,backgroundColor:Colors.primaryUltraTransparent,paddingBottom:60}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.priceSection}>
            <Text style={styles.headerText}>Price (₦)</Text>
            <View style={{padding:20}}>
                <RangeSlider
                    // onSlidingStart={(value) => console.log("start:", value)}
                    // onSlidingComplete={(value) => console.log("complete:", value)}
                    onValueChange={(value) => {setMinPrice(value[0]);setMaxPrice(value[1])}}
                    style={styles.slider}
                    minimumValue={1}
                    maximumValue={5000000}
                    step={1}
                    outboundColor={'rgba(0,0,0,0.10)'}              // The track color outside the current range value
                    inboundColor={Colors.primary}               // The track color inside the current range value
                    thumbTintColor={Colors.primary}
                    thumbSize={17}
                    />
            </View>
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                <View style={{gap:10,flexBasis:'48%'}}>
                    <Text style={styles.text}>From</Text>
                    <TextInput style={defaultStyles.inputField} value={minPrice.toString()} placeholder='Min Price' placeholderTextColor={Colors.grey} onChangeText={(text) => text===""?setMinPrice(0): setMinPrice(parseInt(text))} />
                </View>
                <View style={{gap:10,flexBasis:'48%'}}>
                    <Text style={styles.text}>To</Text>
                    <TextInput keyboardType='numeric' style={defaultStyles.inputField} value={maxPrice.toString()} placeholder='Max Price' placeholderTextColor={Colors.grey} onChangeText={(text) => text === ""?setMaxPrice(0) : setMaxPrice(parseInt(text))}/>
                </View>
            </View>
        </View>
      </ScrollView>

        <View style={{position:'absolute',left:0,right:0,bottom:0,padding:20,paddingBottom:25}}>

      <TouchableOpacity style={[defaultStyles.btn]} onPress={() => handleApplyFilter()}>
        <Text style={defaultStyles.btnText}>Apply</Text>
      </TouchableOpacity>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    priceSection:{
        padding:20,
        backgroundColor:'#fff'
    },
    headerText:{
        fontFamily:'roboto-condensed',
        fontSize:18
    },
    text:{
        fontFamily:'roboto-condensed',
        fontSize:16,
        color:Colors.grey
    },
    slider: {
    // width: 200,
    height: 40,
    flexGrow: 0,
    
  },
})
export default filter