import * as React from 'react'
import { useState } from 'react';
import { ScrollView, View, Text, Image, TouchableOpacity, StyleSheet, Modal, FlatList, TextInput, Dimensions, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from "expo-router";
import { AntDesign } from '@expo/vector-icons';
import { Dropdown } from "react-native-element-dropdown";
import { base_url } from '../../constants/server';
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator } from 'react-native-paper';




const { width } = Dimensions.get("window")

interface CategoryInterface {
  id: number,
  name: string,
  image: any
}

const options7 = [
  { label: 'less than a month', value: '33' },
  { label: '1 month', value: '34' },
  { label: '2 months', value: '35' },
  { label: 'quarter of a year', value: '36' },
  { label: 'half a year', value: '37' },
  { label: '1 year', value: '38' },
  { label: '2 years', value: '39' },
  { label: '3 years', value: '40' },
  { label: '4 years', value: '41' },
  { label: '5 years', value: '42' },
];



const categoriesData = [
  { id: 1, name: 'Mobile Phones', image: require('../../assets/images/phonecat.png') },
  { id: 2, name: 'Smart Watches and Trackers', image: require('../../assets/images/watchcat.png') },
  { id: 3, name: 'Tablets', image: require('../../assets/images/tabcat.png') },
  { id: 4, name: 'Phone Accessories', image: require('../../assets/images/phoneacc.png') },
  { id: 5, name: 'Computer Accessories', image: require('../../assets/images/computeracc.png') },
  { id: 6, name: 'Computer Monitors', image: require('../../assets/images/Monitor.png') },
  { id: 7, name: 'Headphones', image: require('../../assets/images/headphonescat.png') },
  { id: 8, name: 'Laptops', image: require('../../assets/images/laptopcat.png') },
  { id: 9, name: 'Networking Products', image: require('../../assets/images/networkcat.png') },
  { id: 10, name: 'Printers & Scanners', image: require('../../assets/images/printercat.png') },
  { id: 11, name: 'Cameras', image: require('../../assets/images/cameracat.png') },
  { id: 12, name: 'Security & Surveillance', image: require('../../assets/images/security.png') },
  { id: 13, name: 'Video Games', image: require('../../assets/images/videogame.jpg') },
  { id: 14, name: 'Tv', image: require('../../assets/images/tvcat.png') },
  { id: 15, name: 'Video Game Console', image: require('../../assets/images/ps5.jpg') },
  { id: 16, name: 'Computer Hardware', image: require('../../assets/images/comphardware.png') }
];

const QuickSell = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<CategoryInterface | null>(null);
  const [selectedImages, setSelectedImages] = useState<any[]>([]);
  const [productName, setProductName] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [moreDetails, setMoreDetails] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [number, setNumber] = useState<string>("");
  const [selectedValue7, setSelectedValue7] = useState<string | null>(null);
  const [isFocus7, setIsFocus7] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false)
  const router = useRouter();


  const renderLabel7 = () => {
    if (selectedValue7 || isFocus7) {
      return (
        <Text style={[styles.label, isFocus7 && { color: '#025492' }]}>
          Select the time usage of the product
        </Text>
      );
    }
    return null;
  };

  // functionality to render and select categories in modal
  const renderCategories = ({ item }: { item: CategoryInterface }) => {
    return (
      <TouchableOpacity
        style={{ flex: 1, flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}
        onPress={() => {
          setSelectedCategory(item);
          setModalVisible(false);
        }}>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: 325 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image source={item.image} style={{ width: 50, height: 50, marginRight: 10 }} />
            <Text style={{ fontSize: 12, lineHeight: 15.2, letterSpacing: -0.18, color: "#00000090", fontWeight: "500" }}>{item.name}</Text>
          </View>
          <Ionicons name='chevron-forward-outline' size={20} style={{ color: "#00000050" }} />
        </View>
      </TouchableOpacity>
    );
  }

  // functionality to select and upload product images
  const pickImage = async () => {
    // Check if the number of selected images is less than 4
    if (selectedImages.length >= 4) {
      alert('You can only upload up to 4 images.');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      allowsEditing: true,
      allowsMultipleSelection: false, // denies multiple image selection
      base64: true,
    });

    if (!result.canceled && result.assets.length > 0) {
      const newImages = result.assets.map(asset => ({
        uri: asset.uri,
        base64: asset.base64,
        mimeType: asset.mimeType
      }));
      // Ensure the total number of selected images doesn't exceed 4
      const remainingSlots = 4 - selectedImages.length;
      const imagesToAdd = newImages.map(asset => `data:image/${asset.mimeType?.split('/')[1]};base64,` + asset.base64).slice(0, remainingSlots);
      setSelectedImages(prevImages => [...prevImages, ...imagesToAdd]);
    }
  };

  // Function to clear selected images
  const clearSelectedImages = () => {
    setSelectedImages([]);
  };

  // Function to remove a single selected image
  const removeSelectedImage = (indexToRemove: number) => {
    setSelectedImages(prevImages => prevImages.filter((_, index) => index !== indexToRemove));
  };



  // function to handle product upload
  const handleQuickSellUpload = async () => {
    setLoading(true)
    const token = await AsyncStorage.getItem('token')
    try {
      const response = await axios.post(`${base_url}/quick-sell/create-product`,
        {
          images: selectedImages,
          name: productName,
          price: price,
          description: moreDetails,
          category: selectedCategory?.name,
          condition: selectedValue7,
          location: address,
          phoneNumber: number
        },

        {
          headers: {
            Authorization: token
          },
          withCredentials: true
        }

      )
      if (response.data.success) {
        setLoading(false)
        Alert.alert('Upload Success', 'Your product has been uploaded successfully, sit back and relax as you make your first sale in minutes');
        console.log('quick sell product upload success');
        router.replace('/(tabs)/QuickSell');
      } else {
        Alert.alert('Error', 'Something went wrong, please try again')
      }
    } catch (error) {
      setLoading(false)
      if (axios.isAxiosError(error)) {
        console.log('Error response:', error.response);
        if (error.response?.status === 500) {
          Alert.alert('Server Error', `An error occurred on the server. Please try again later, ${error.response?.data.message}`);
          console.log(error.message)
        } else if (error.response?.status === 401) {
          Alert.alert('Unauthorized', 'Please check your token and try again.');
        } else {
          Alert.alert('Error', `${error.response?.data.message}`);
          console.log('Something went wrong, please try again', error.message)
        }
      } else {
        Alert.alert('Error', 'An unexpected error occurred');
      }
    }
  }


  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.pageContainer}>
      <TouchableOpacity style={styles.category} onPress={() => setModalVisible(true)}>
        {selectedCategory ? (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image source={selectedCategory.image} style={{ width: 60, height: 60, borderTopLeftRadius: 5, borderBottomLeftRadius: 5 }} />
            <View style={{ width: 265, alignItems: "center" }}>
              <Text style={{ fontSize: 14, lineHeight: 15.2, letterSpacing: -0.18, color: "#00000090", fontWeight: "500" }}>{selectedCategory.name}</Text>
            </View>
          </View>
        ) : (
          <View style={{ flexDirection: "row", alignItems: "center", width: '100%', justifyContent: "space-between" }}>
            <View style={{ flexDirection: "row", alignItems: "center", marginLeft: 20 }}>
              <Text style={{ fontSize: 14, color: "#FF0000", fontWeight: "900" }}>*</Text>
              <Text style={{ fontSize: 14, color: "#00000050", fontWeight: "500", marginLeft: 5 }}>Select Category</Text>
            </View>
            <Ionicons name='chevron-forward-outline' size={20} style={{ color: "#00000030", marginRight: 20 }} />
          </View>
        )}
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={{ flex: 1, justifyContent: 'center', left: 20, top: 50, marginBottom: 50 }}>
          <FlatList
            data={categoriesData}
            renderItem={renderCategories}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      </Modal>
      <View style={{ marginBottom: 28 }}>
        <Text style={{ fontSize: 13, color: "#000000", fontWeight: "500", marginBottom: 5 }}>Add At Least 2 Images</Text>
        <Text style={{ fontSize: 10, color: "#00000050", marginBottom: 10 }}>First image you upload is the title image and must be a clear 1080p downloaded picture, the rest of the pictures should be a live picture of the gadget</Text>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={{ width: 114, height: 79, backgroundColor: "#02549220", borderRadius: 10, justifyContent: "center", alignItems: "center", marginRight: 10 }}
            onPress={pickImage}
          >
            <Text style={{ fontSize: 24, color: "#025492" }}>+</Text>
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            {selectedImages.length > 0 ? (
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', }}>
                {selectedImages.map((uri, index) => (
                  <View key={index} style={{ width: '50%', paddingRight: 5, paddingBottom: 5 }}>
                    <Image
                      source={{ uri }}
                      style={{ width: '100%', aspectRatio: 10 / 10, borderRadius: 10 }}
                    />
                  </View>
                ))}
              </View>
            ) : (
              <Image source={require('../../assets/images/watchcat.png')} style={{ width: 114, height: 79, borderRadius: 10 }} />
            )}
            {selectedImages.length > 0 && (
              <TouchableOpacity onPress={clearSelectedImages} style={{ marginLeft: 175 }} >
                <AntDesign name='delete' size={18} color='#FF0000' />
              </TouchableOpacity>
            )}
          </View>
        </View>
        <View style={styles.section2}>
          <View style={styles.inputContainer}>
            {/*Product name input*/}
            <Text style={styles.text}>Name</Text>
            <View style={styles.textInput}>
              <TextInput
                style={{ left: 13, width: width - 59, height: 45, fontSize: 12 }}
                placeholder="Product Name"
                value={productName}
                onChangeText={(text) => setProductName(text)}
              />
            </View>
          </View>
          <View style={styles.inputContainer}>
            {/*Amount input*/}
            <Text style={styles.text}>Amount</Text>
            <View style={styles.textInput}>
              <TextInput
                style={{ left: 13, width: width - 59, height: 45, fontSize: 12 }}
                placeholder="0.00"
                keyboardType='numeric'
                value={price}
                onChangeText={(text) => setPrice(text)}
              />
            </View>
          </View>
          <View style={styles.inputContainer}>
            {/*Location input*/}
            <Text style={styles.text}>Address</Text>
            <View style={styles.textInput}>
              <TextInput
                style={{ left: 13, width: width - 59, height: 45, fontSize: 12 }}
                placeholder="enter your pickup address"
                keyboardType='default'
                value={address}
                onChangeText={(text) => setAddress(text)}
              />
            </View>
          </View>
          <View style={styles.inputContainer}>
            {/*Phone number input*/}
            <Text style={styles.text}>Phone Number</Text>
            <View style={styles.textInput}>
              <TextInput
                style={{ left: 13, width: width - 59, height: 45, fontSize: 12 }}
                placeholder="Enter your active phone number"
                keyboardType='numeric'
                value={number}
                onChangeText={(text) => setNumber(text)}
              />
            </View>
          </View>
          <View style={styles.inputContainer}>
            {/*More Details input*/}
            <Text style={styles.text}>More Details</Text>
            <View style={styles.textInput2}>
              <TextInput
                multiline={true}
                style={{ top: 3, left: 13, width: width - 59, fontSize: 12 }}
                placeholder="Enter Details"
                value={moreDetails}
                onChangeText={(text) => setMoreDetails(text)}
              />
            </View>
          </View>
        </View>
        <View style={styles.textInputContainer2}>
          <Text style={styles.text} >Years Used</Text>
          <View style={styles.container}>
            {renderLabel7()}
            <Dropdown
              style={[styles.dropdown, isFocus7 && { borderColor: '#025492' }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              itemTextStyle={styles.itemTextStyle}
              iconStyle={styles.iconStyle}
              data={options7}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocus7 ? 'Select the time usage of the product' : '...'}
              searchPlaceholder="Search..."
              value={selectedValue7}
              onFocus={() => setIsFocus7(true)}
              onBlur={() => setIsFocus7(false)}
              onChange={item => {
                setSelectedValue7(item.value);
                setIsFocus7(false);
              }}
              dropdownPosition='top'
              renderLeftIcon={() => (
                <AntDesign
                  style={styles.icon2}
                  color={isFocus7 ? '#02549290' : '#00000090'}
                  name="Safety"
                  size={18}
                />
              )}
            />
          </View>
        </View>
        <TouchableOpacity style={styles.button} onPress={() => handleQuickSellUpload()} >
          {
            loading ?
              <ActivityIndicator size='small' color="#ffffff" />
              :
              <Text style={styles.buttonText1}>Finish</Text>}
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

export default QuickSell;

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingHorizontal: 20
  },
  category: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: width - 40,
    height: 60,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#00000010",
    // marginLeft: 20,
    top: 10,
    marginBottom: 43
  },
  section2: {
    height: 640,
    flex: 1,
    top: 23,
  },
  inputContainer: {
    height: 80,
    position: "relative",
    marginBottom: 10
  },
  text: {
    fontSize: 13,
    color: "#00000090",
    fontWeight: "500"
  },
  textInput: {
    borderWidth: 1,
    width: width - 40,
    height: 50,
    top: 5,
    borderColor: "#0000001A",
    borderRadius: 5,
    backgroundColor: "#00000005"
  },
  textInput2: {
    borderWidth: 1,
    width: width - 40,
    height: 220,
    top: 5,
    borderColor: "#0000001A",
    borderRadius: 5,
    backgroundColor: "#00000005"
  },
  addressInputContainer: {
    top: 30,
    left: 20,
    height: 80,
    position: "relative",
  },
  addressComponent: {
    flexDirection: "row",
    alignItems: "center",
    width: 320,

  },
  addressTextInput: {
    borderWidth: 1,
    width: 320,
    height: 50,
    top: 5,
    borderColor: "#0000001A",
    borderRadius: 5,
    backgroundColor: "#00000005",
  },
  button: {
    height: 50,
    width: '100%',
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#025492",
    flexDirection: "row"
  },
  buttonText1: {
    color: "#fff",
    fontSize: 15,
    fontFamily: "roboto-condensed-sb",
  },
  buttonText2: {
    color: "#fff",
    marginLeft: 10
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 12,
    color: "#00000050"
  },
  container: {
    paddingVertical: 10,
    marginEnd: 16,
    width: width - 40
  },
  dropdown: {
    height: 60,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: "#00000009"
  },
  placeholderStyle: {
    fontSize: 12,
    color: "#00000070",
    marginVertical: 10,
    height: 20,
    top: 1.5
  },
  selectedTextStyle: {
    fontSize: 12,
    color: "#000000",
    paddingVertical: 5,
    height: 30,
    top: 1.5
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 12,
    color: "#00000090"
  },
  itemTextStyle: {
    color: "#00000070",
    fontSize: 12
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  icon2: {
    marginRight: 5,
    marginTop: 2,
    height: 20,
  },
  textInputContainer2: {

    marginBottom: 40.29
  },
})
