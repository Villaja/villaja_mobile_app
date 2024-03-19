import {Image, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, View } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown';
import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AntDesign } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import Colors from '../../constants/Colors';
import { defaultStyles } from '../../constants/Styles';
import { useSeller } from '../../context/SellerContext';

 const data = [
    { label: 'Item 1', value: '1' },
    { label: 'Item 2', value: '2' },
    { label: 'Item 3', value: '3' },
    { label: 'Item 4', value: '4' },
    { label: 'Item 5', value: '5' },
    { label: 'Item 6', value: '6' },
    { label: 'Item 7', value: '7' },
    { label: 'Item 8', value: '8' },
  ];

const sellerAddProduct = () => {

  const {addValue} = useSeller()

  const [category, setCategory] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [discount, setDiscount] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");
  const [images, setImages] = useState<Array<any>>([]);


  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsMultipleSelection:true,
      orderedSelection:true,
      aspect: [4, 3],
      quality: 1,
    });


    if (!result.canceled) {
      setImages(result.assets);

    }
  };

  const handleSubmit = () => {
    addValue({
      name,
      amount,
      discount: discount || 0,
      quantity,
      images,
      category
    })
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>

    <View>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        data={data}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Category"
        searchPlaceholder="Search..."
        value={category}
        onChange={item => {
          setCategory(item.value);
        }}
      />

      <View style={styles.imageSection}>
        <Text style={styles.imageHeaderText}>Add At Least 2 Images</Text>
        <Text style={styles.imageHeaderNote}>First image is the title picture. You can change the order of the images - just grab the image and drop.</Text>
        
        <View style={styles.selectedImages}>
          <TouchableOpacity style={styles.addImg} onPress={() => pickImage()}>
            <AntDesign name='plus' color={Colors.primary} size={30}/>
          </TouchableOpacity>

          {images && images.length > 1 ?
          
          images.map((image) => (


            <Image source={{ uri: image.uri || "https://www.apple.com/newsroom/images/product/watch/standard/Apple_delivers-apple-watch-series-6_09152020.jpg.news_app_ed.jpg" }} style={{ width: 115, height: 80, borderRadius:10 }} resizeMode='cover' />

          ))
                :
            <Image source={{uri:"https://www.apple.com/newsroom/images/product/watch/standard/Apple_delivers-apple-watch-series-6_09152020.jpg.news_app_ed.jpg" }} style={{ width: 115, height: 80, borderRadius:10 }} resizeMode='cover' />

}

        </View>
      </View>

      <View style={{padding:20}}>

        <View style={{gap:4}}>
            <Text style={{fontFamily:'roboto-condensed',fontSize:15,color:'rgba(0,0,0,0.70)'}}>Name</Text>
            <TextInput style={defaultStyles.inputField}  returnKeyType="done" placeholder='Product Name' value={name}
              onChangeText={(text) => setName(text)} placeholderTextColor={'rgba(0,0,0,0.20)'} />
          </View>
        <View style={{gap:4}}>
            <Text style={{fontFamily:'roboto-condensed',fontSize:15,color:'rgba(0,0,0,0.70)'}}>Amount</Text>
            <TextInput style={defaultStyles.inputField}  returnKeyType="done" placeholder='0.0' value={amount}
              onChangeText={(text) => setAmount(text)} placeholderTextColor={'rgba(0,0,0,0.20)'} />
          </View>
        <View style={{gap:4}}>
            <Text style={{fontFamily:'roboto-condensed',fontSize:15,color:'rgba(0,0,0,0.70)'}}>Discount</Text>
            <TextInput style={defaultStyles.inputField}  returnKeyType="done" placeholder='Product Name' value={discount}
              onChangeText={(text) => setDiscount(text)} placeholderTextColor={'rgba(0,0,0,0.20)'} />
          </View>
        <View style={{gap:4}}>
            <Text style={{fontFamily:'roboto-condensed',fontSize:15,color:'rgba(0,0,0,0.70)'}}>Quantity Available</Text>
            <TextInput style={defaultStyles.inputField}  returnKeyType="done" placeholder='0' value={name}
              onChangeText={(text) => setQuantity(text)} placeholderTextColor={'rgba(0,0,0,0.20)'} />
          </View>
        <View style={{gap:4}}>
            <Text style={{fontFamily:'roboto-condensed',fontSize:15,color:'rgba(0,0,0,0.70)'}}>More Details</Text>
            <TextInput style={defaultStyles.inputField}  returnKeyType="done" placeholder='Product Name' value={name}
              onChangeText={(text) => setName(text)} placeholderTextColor={'rgba(0,0,0,0.20)'} />
          </View>
        
      </View>



    </View>
    </KeyboardAvoidingView>

  )
}

export default sellerAddProduct

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#fff"
  },
  imageSection:{
    paddingHorizontal:20,
    paddingVertical:10
  },
  imageHeaderText:{
    fontFamily:'roboto-condensed-m',
    fontSize:17,
    marginBottom:4
  },
  imageHeaderNote:{
    fontFamily:'roboto-condensed',
    color:'rgba(0,0,0,0.5)',
    marginBottom:8
  },
  addImg:{
      width:115,
      height:80,
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:Colors.primaryTransparent,
      borderRadius:10
    },
    selectedImages:{
      flexDirection:'row',
      alignItems:'center',
      gap:5
    },
  dropdown: {
      margin: 16,
      height: 50,
      backgroundColor: 'white',
      borderRadius: 5,
      padding: 12,
      borderWidth:1,
      borderColor:'rgba(0,0,0,0.05)'
    },
    
    placeholderStyle: {
      fontSize: 16,
    fontFamily:'roboto-condensed',

    },
    selectedTextStyle: {
      fontSize: 16,
    fontFamily:'roboto-condensed',

    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    fontFamily:'roboto-condensed',

    },
    
})