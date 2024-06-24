import { Image, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, View, ScrollView, Modal, FlatList, TouchableOpacity, Dimensions, ImageSourcePropType } from 'react-native'
import React, { useState } from 'react'
import * as ImagePicker from 'expo-image-picker';
import { useSeller } from '../../../context/SellerContext';
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import axios from 'axios';
import { AntDesign } from '@expo/vector-icons';
import { useProductUpload } from "../../../context/ProductUpload";
import { useAuth } from "../../../context/SellerAuthContext";

const {width} = Dimensions.get("window")

interface Category{
  id:number,
  name:string,
  image:ImageSourcePropType
}

const categoriesData = [
  { id: 1, name: 'Mobile Phones', image: require('../../../assets/images/phonecat.png') }, 
  { id: 2, name: 'Smart Watches and Trackers', image: require('../../../assets/images/sm-w.png') }, 
  { id: 3, name: 'Tablets', image: require('../../../assets/images/tabcat.png') }, 
  { id: 4, name: 'Accessories', image: require('../../../assets/images/phoneacc.png') }, 
  { id: 5, name: 'Stands and lights', image: require('../../../assets/images/stands.png') },
  { id: 6, name: 'Laptop Bags', image: require('../../../assets/images/bags.png') }, 
  { id: 7, name: 'Earphones and Headphones', image: require('../../../assets/images/headphonescat.png') }, 
  { id: 8, name: 'Laptops', image: require('../../../assets/images/laptopcat.png') }, 
  { id: 9, name: 'Cases and Covers', image: require('../../../assets/images/cases.png') },
  { id: 10, name: 'Stylus and tablets', image: require('../../../assets/images/stylus.png') },
  { id: 11, name: 'Microphones', image: require('../../../assets/images/microphone.png') }, 
  { id: 12, name: 'Speakers', image: require('../../../assets/images/speakers.png') },
  { id: 13, name: 'Chargers and More', image: require('../../../assets/images/charger.png') }, 
  { id: 14, name: 'Gaming Accessories', image: require('../../../assets/images/gaming.png') },
  { id: 15, name: 'Keyboard and Mice', image: require('../../../assets/images/keyboard.png') } 
];

const sellerAddProduct = () => {
  const { seller } = useAuth();
  const { setProductUploadPayload } = useProductUpload();
  const [name, setName] = useState<string>("");
  const [originalPrice, setOriginalPrice] = useState<string>("");
  const [discountPrice, setDiscountPrice] = useState<string>("");
  const [stock, setStock] = useState<number | null>(null);
  const [color, setColor] = useState<string>("");
  const [productDetails, setProductDetails] = useState<string>("")
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const router = useRouter();


  const shopId = seller?.seller._id


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


  const handleNextUploadPage = async () => {
    const payload = {
      name: name,
      description: productDetails,
      category: selectedCategory?.name,
      originalPrice: originalPrice,
      discountPrice: discountPrice,
      stock: stock,
      shopId: shopId,
      colorList: [
        {
          color: color,
          stock: stock,
          images: selectedImages
        }
      ]
    };

    setProductUploadPayload (payload);
    router.push('/sellerAddProductScreen/addProducts')
  }

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
          <Text style={{ fontSize: 10, color: "#00000050", marginBottom: 10 }}>First image you upload is the title image and must be a clear 1080p downloaded picture likewise the rest of the 3 images of the gadget. Ensure each picture is less than 10MB of size.</Text>
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
                  value={name}
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
                  value={originalPrice}
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
                  value={discountPrice}
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
                  value={stock !== null ? stock.toString() : '' }
                  onChangeText={(value) => setStock(value ? parseInt(value) : null)}
                />
              </View>
            </View>
            <View style={styles.inputContainer}>
              {/*Color input*/}
              <Text style={styles.text}>Product Color</Text>
              <View style={styles.textInput}>
                <TextInput
                  style={{ left: 13, width: 302, height: 45, fontSize: 12 }}
                  placeholder="Enter color of the product"
                  keyboardType='default'
                  value={color}
                  onChangeText={(value) => setColor(value)}
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
                  placeholder="Enter your product description, e.g. brief description about the product from the manufacturer."
                  value={productDetails}
                  onChangeText={(value) => setProductDetails(value)}
                />
              </View>
            </View>
          </View>
          <TouchableOpacity style={styles.button} onPress={() => handleNextUploadPage()}>
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
    marginBottom: 200
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
    gap: 10,
    marginTop: 20
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