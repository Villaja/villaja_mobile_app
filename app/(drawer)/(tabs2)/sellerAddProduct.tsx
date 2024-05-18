import { Image, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, View, ScrollView, Modal, FlatList, TouchableOpacity, Dimensions, ImageSourcePropType } from 'react-native'
import React, { useState } from 'react'
import * as ImagePicker from 'expo-image-picker';
import { useSeller } from '../../../context/SellerContext';
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import axios from 'axios';
import { AntDesign } from '@expo/vector-icons'

const {width} = Dimensions.get("window")

interface Category{
  id:number,
  name:string,
  image:ImageSourcePropType
}

const categoriesData = [
  { id: 1, name: 'Mobile Phones', image: require('../../../assets/images/phonecat.png') },
  { id: 2, name: 'Smart Watches and Trackers', image: require('../../../assets/images/watchcat.png') },
  { id: 3, name: 'Tablets', image: require('../../../assets/images/tabcat.png') },
  { id: 4, name: 'Phone Accessories', image: require('../../../assets/images/phoneacc.png') },
  { id: 5, name: 'Computer Accessories', image: require('../../../assets/images/computeracc.png') },
  { id: 6, name: 'Computer Monitors', image: require('../../../assets/images/Monitor.png') },
  { id: 7, name: 'Headphones', image: require('../../../assets/images/headphonescat.png') },
  { id: 8, name: 'Laptops', image: require('../../../assets/images/laptopcat.png') },
  { id: 9, name: 'Networking Products', image: require('../../../assets/images/networkcat.png') },
  { id: 10, name: 'Printers & Scanners', image: require('../../../assets/images/printercat.png') },
  { id: 11, name: 'Cameras', image: require('../../../assets/images/cameracat.png') },
  { id: 12, name: 'Security & Surveillance', image: require('../../../assets/images/security.png') },
  { id: 13, name: 'Video Games', image: require('../../../assets/images/videogame.jpg') },
  { id: 14, name: 'Tv', image: require('../../../assets/images/tvcat.png') },
  { id: 15, name: 'Video Game Console', image: require('../../../assets/images/ps5.jpg') },
  { id: 16, name: 'Computer Hardware', image: require('../../../assets/images/comphardware.png') }
];

const sellerAddProduct = () => {
  const { addValue } = useSeller()
  const [name, setName] = useState<string>("");
  const [originalPrice, setOriginalPrice] = useState<string>("");
  const [discountPrice, setDiscountPrice] = useState<string>("");
  const [quantity, setQuantity] = useState<string>("");
  const [productDetails, setProductDetails] = useState<string>("")
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const router = useRouter()


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
      allowsMultipleSelection: false, // denies multiple image selection
      allowsEditing: true,
    });

    if (!result.canceled && result.assets.length > 0) {
      const newImages = result.assets.map(asset => asset.uri);
      // Ensure the total number of selected images doesn't exceed 4
      const remainingSlots = 4 - selectedImages.length;
      const imagesToAdd = newImages.slice(0, remainingSlots);
      setSelectedImages(prevImages => [...prevImages, ...imagesToAdd]);
    }
  };

  // Function to clear selected images
  const clearSelectedImages = () => {
    setSelectedImages([]);
  };

  // Function to remove a single selected image
  const removeSelectedImage = (indexToRemove:number) => {
    setSelectedImages(prevImages => prevImages.filter((_, index) => index !== indexToRemove));
  };


  // functionality to render and select categories inside the modal
  const renderCategories = ({ item }:{item:Category}) => {
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
          <Ionicons name='chevron-forward-outline' size={24} style={{ color: "#00000050" }} />
        </View>
      </TouchableOpacity>
    );
  };

  const handleSubmit = () => {
    addValue({
      name,
      originalPrice,
      discount: discountPrice || 0,
      quantity,
      productDetails,
      selectedImages,
      selectedCategory
    })
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <ScrollView style={styles.container}>
        <TouchableOpacity style={styles.category} onPress={() => setModalVisible(true)}>
          {selectedCategory ? (
            <View style={{ flexDirection: "row", alignItems: "center" }}> 
              <Image source={selectedCategory.image} style={{ width: 60, height: 60, borderTopLeftRadius: 5, borderBottomLeftRadius: 5 }} />
              <View style={{ width: width - 100, alignItems: "center"}}>
                <Text style={{ fontSize: 14, lineHeight: 15.2, letterSpacing: -0.18, color: "#00000090", fontWeight: "500" }}>{selectedCategory.name}</Text>
              </View>
            </View>
          ) : (
            <View style={{ flexDirection: "row", alignItems: "center", width: 325, justifyContent: "space-between" }}>
              <View style={{ flexDirection: "row", alignItems: "center", marginLeft: 20 }}>
                <Text style={{ fontSize: 14, color: "#FF0000", fontWeight: "900" }}>*</Text>
                <Text style={{ fontSize: 14, color: "#00000050", fontWeight: "500", marginLeft: 5 }}>Select Category</Text>
              </View>
              <Ionicons name='chevron-forward-outline' size={24} style={{ color: "#00000030", marginLeft: 'auto', marginRight: 20 }} />
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
        <View style={{ marginHorizontal: 20, marginBottom: 28 }}>
          <Text style={{ fontSize: 13, color: "#000000", fontWeight: "500", marginBottom: 5 }}>Add At Least 4 Images</Text>
          <Text style={{ fontSize: 10, color: "#00000050", marginBottom: 10 }}>First image you upload is the title image and must be a clear 1080p downloaded picture likewise the rest of the 3 images of the gadget</Text>
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
                      source={{ uri: uri }}
                      style={{ width: '100%', aspectRatio: 10 / 10, borderRadius: 10 }}
                    />
                  </View>
                ))}
              </View>                           
              ) : (
                <Image source={require('../../../assets/images/watchcat.png')} style={{ width: 114, height: 79, borderRadius: 10 }} />
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
                  style={{ left: 13, width: 302, height: 45, fontSize: 12 }}
                  placeholder="Product Name"
                  onChangeText={(value) => setName(value)}
                />
              </View>
            </View>
            <View style={styles.inputContainer}>
              {/*Amount input*/}
              <Text style={styles.text}>Original Price</Text>
              <View style={styles.textInput}>
                <TextInput
                  style={{ left: 13, width: 302, height: 45, fontSize: 12 }}
                  placeholder="₦0.00"
                  keyboardType= 'number-pad'
                  onChangeText={(value) => setOriginalPrice(value)}
                />
              </View>
            </View>
            <View style={styles.inputContainer}>
              {/*Discount input*/}
              <Text style={styles.text}>Discount price</Text>
              <View style={styles.textInput}>
                <TextInput
                 style={{ left: 13, width: 302, height: 45, fontSize: 12 }}
                  placeholder="₦0.00"
                  keyboardType= 'number-pad'
                  onChangeText={(value) => setDiscountPrice(value)}
                />
              </View>
            </View>
            <View style={styles.inputContainer}>
              {/*Quantity input*/}
              <Text style={styles.text}>Quantity Available</Text>
              <View style={styles.textInput}>
                <TextInput
                  style={{ left: 13, width: 302, height: 45, fontSize: 12 }}
                  placeholder="Enter amount of product in stock"
                  keyboardType='number-pad'
                  onChangeText={(value) => setQuantity(value)}
                />
              </View>
            </View>
            <View style={styles.inputContainer}>
              {/*Description input*/}
              <Text style={styles.text}>Description</Text>
              <View style={styles.textInput2}>
                <TextInput
                  multiline={true}
                  style={{ top: 3, left: 13, width: width - 61, fontSize: 12 }}
                  placeholder="Enter Details"
                  onChangeText={(value) => setProductDetails(value)}
                />
              </View>
            </View>
          </View>
          <TouchableOpacity style={styles.button} onPress={() => router.push ('/sellerAddProductScreen/addProducts')}>
            <Text style={styles.buttonText1}>Next</Text>
            <AntDesign name="arrowright" size={12} color="#ffffff" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>


  )
}

export default sellerAddProduct

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff"
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
    marginLeft: 20,
    top: 10,
    marginBottom: 43
  },
  section2: {
    height: 500,
    flex: 1,
    top: 23,
    marginBottom: 100
  },
  inputContainer: {

    height: 80,
    position: "relative"
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
    backgroundColor: "#00000005",
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
    width: width - 40,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#025492",
    flexDirection: "row",
    gap: 10
  },
  buttonText1: {
    color: "#fff",
    fontSize: 13,
    fontFamily: "roboto-condensed-sb",
  },
  buttonText2: {
    color: "#fff",
    marginLeft: 10
  }
})