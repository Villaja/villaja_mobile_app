import { Image, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, View, ScrollView, Modal, FlatList, TouchableOpacity, Dimensions, ImageSourcePropType, Alert } from 'react-native'
import React, { useState } from 'react'
import * as ImagePicker from 'expo-image-picker';
import { useSeller } from '../../../context/SellerContext';
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import axios from 'axios';
import { AntDesign } from '@expo/vector-icons';
import { useProductUpload } from "../../../context/ProductUpload";
import { useAuth } from "../../../context/SellerAuthContext";
import Colors from '../../../constants/Colors';

const { width } = Dimensions.get("window")

interface Category {
  id: number,
  name: string,
  image: ImageSourcePropType
}

interface ColorVariation {
  color: string;
  stock: number | null;
  images: string[];
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
  const [productDetails, setProductDetails] = useState<string>("")
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [stock, setStock] = useState<number | null>(null);
  const [variationData, setVariationData] = useState<{
    color: string;
    stock: number | null;
    images: string[];
  }>({
    color: "",
    stock: null,
    images: []
  });
  const [colorVariation, setColorVariation] = useState<ColorVariation[]>([]);
  const [variationModal, setVariationModal] = useState<boolean>(false);
  const router = useRouter();


  const shopId = seller?.seller._id;

  console.log(variationData);
  console.log(colorVariation);


  // functionality to select and upload product images
  const pickImage = async () => {
    // Check if the number of selected images is less than 4
    if (variationData.images.length >= 4) {
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
      const remainingSlots = 4 - variationData.images.length;
      const imagesToAdd = newImages.map(asset => `data:image/${asset.mimeType?.split('/')[1]};base64,` + asset.base64).slice(0, remainingSlots);
      setVariationData({ ...variationData, images: [...variationData.images, ...imagesToAdd] });
    }
  };

  // Function to clear selected images
  const clearSelectedImages = () => {
    setVariationData({ ...variationData, images: [] });
  };

  // Function to remove a single selected image
  const removeSelectedImage = (indexToRemove: number) => {
    setVariationData({ ...variationData, images: variationData.images.filter((_, index) => index !== indexToRemove) });
  };


  // Additional styling
  const additionalStyling = () => {
    if (colorVariation.length === 0) {
      return { marginBottom: 150 }
    } else if (colorVariation.length === 1) {
      return { marginBottom: 290 }
    } else if (colorVariation.length === 2) {
      return { marginBottom: 320 }
    } else if (colorVariation.length === 3) {
      return { marginBottom: 490 }
    }
  }

  console.log(colorVariation.length);
  console.log(additionalStyling());



  // functionality to render and select categories inside the modal
  const renderCategories = ({ item }: { item: Category }) => {
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
    if (name === "") {
      Alert.alert("Incomplete Fields", "Please enter the product's name")
    } else if (originalPrice === "") {
      Alert.alert("Incomplete Fields", "Please enter the product's original price")
    } else if (productDetails === "") {
      Alert.alert("Incomplete Fields", "Please enter the product's description")
    } else if (selectedCategory === null) {
      Alert.alert("Incomplete Fields", "Please select the product's category")
    } else if (colorVariation.length === 0) {
      Alert.alert("Incomplete Fields", "Please add at least one color variant")
    } else {
      const payload = {
        name: name,
        description: productDetails,
        category: selectedCategory?.name,
        originalPrice: originalPrice,
        discountPrice: discountPrice,
        stock: stock,
        shopId: shopId,
        colorList: colorVariation,
      };

      setProductUploadPayload(payload);
      router.push('/sellerAddProductScreen/addProducts')
    }
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <ScrollView style={styles.container}>
        <TouchableOpacity style={styles.category} onPress={() => setModalVisible(true)}>
          {selectedCategory ? (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image source={selectedCategory.image} style={{ width: 60, height: 60, borderTopLeftRadius: 5, borderBottomLeftRadius: 5 }} />
              <View style={{ width: width - 100, alignItems: "center" }}>
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

        {/* Modal for category selection */}
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
        <View style={{ marginHorizontal: 20, marginBottom: 28 }} >
          <View style={[styles.section2, additionalStyling()]} >
            <View style={styles.inputContainer}>
              {/*Product name input*/}
              <Text style={styles.text}>Name</Text>
              <View style={styles.textInput}>
                <TextInput
                  style={{ left: 13, width: 302, height: 45, fontSize: 12 }}
                  placeholder="Product Name"
                  onChangeText={(text) => setName(text)}
                  value={name}
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
                  keyboardType='number-pad'
                  value={originalPrice}
                  onChangeText={(text) => setOriginalPrice(text)}
                />
              </View>
            </View>
            <View style={styles.inputContainer}>
              {/*Discount input*/}
              <Text style={styles.text}>Discount price</Text>
              <View style={styles.textInput}>
                <TextInput
                  style={{ left: 13, width: 302, height: 45, fontSize: 12 }}
                  placeholder="₦0.00, if none skip"
                  keyboardType='number-pad'
                  value={discountPrice}
                  onChangeText={(text) => setDiscountPrice(text)}
                />
              </View>
            </View>
            <View style={styles.inputContainer}>
              {/*Quantity input*/}
              <Text style={styles.text}>Total Quantity Available</Text>
              <View style={styles.textInput}>
                <TextInput
                  style={{ left: 13, width: 302, height: 45, fontSize: 12 }}
                  placeholder="Enter amount of product in stock"
                  keyboardType='number-pad'
                  value={stock !== null ? stock.toString() : ''}
                  onChangeText={(value) => setStock(value ? parseInt(value) : null)}
                />
              </View>
            </View>
            <TouchableOpacity disabled={colorVariation.length > 2} onPress={() => setVariationModal(prev => !prev)} style={styles.colorVariationContainer}>
              <Ionicons name="color-palette-sharp" size={32} color="#025492" style={styles.colorVariationIcon} />
              <View style={styles.colorVariationTextContainer}>
                <Text style={styles.colorVariationText}>{colorVariation.length === 3 ? "Color Variant Limit Reached" : "Add a Color Variant"}</Text>
                <Text style={styles.colorVariationText2}>{colorVariation.length === 3 ? "You have reached the limit of 3 color variants" : "Upload pictures based on the colors and amount of stock available for your product, you can only add 3 color variants"}</Text>
              </View>
              {colorVariation.length === 3 ? (
                <TouchableOpacity style={styles.colorVariationIcon} onPress={() => setColorVariation([])}>
                  <AntDesign name='delete' size={18} color='#FF0000' />
                </TouchableOpacity>
              ) : (
                <Ionicons name="chevron-forward-outline" size={24} color="#00000030" style={styles.colorVariationIcon} />
              )}
            </TouchableOpacity>
            {
              colorVariation.length > 0 && (
                colorVariation.map((item, index) => (
                  <View style={{ marginTop: 20, marginBottom: 15, flexDirection: "row", justifyContent: "space-between", backgroundColor: Colors.primaryTransparent, borderWidth: 2, borderColor: Colors.primaryTransparent, borderRadius: 10 }} key={index} >
                    <Image source={{ uri: item.images[0] }} style={{ width: 114, height: 85, borderRadius: 10 }} />
                    <View style={{ width: width - 130, paddingHorizontal: 20, paddingVertical: 10 }}>
                      <Text style={{ fontSize: 14, lineHeight: 15.2, letterSpacing: -0.18, color: item.color.toLowerCase(), fontWeight: "500" }}>{`${item.color} ${"Color"}`}</Text>
                      <Text style={{ fontSize: 12, lineHeight: 15.2, letterSpacing: -0.18, color: "#00000070", fontWeight: "400" }}>{`${item.stock} product(s) in stock for this color`}</Text>
                    </View>
                  </View>
                ))
              )
            }
            <Modal
              animationType="slide"
              transparent={true}
              visible={variationModal}
              onRequestClose={() => setVariationModal(prev => !prev)}
            >
              <View style={styles.colorVariationModalCenteredView} >
                <View style={styles.colorVariationModalView} >
                  <View style={{ justifyContent: "center", alignItems: "center" }} >
                    <Text style={{ fontSize: 15, color: "#000000", fontWeight: "500", marginBottom: 5 }}>Add At Least 4 Images</Text>
                    <Text style={{ fontSize: 11, color: "#00000050", marginBottom: 10, textAlign: "center" }}>The First image you upload is the title image and must be a clear 1080p downloaded picture likewise the rest of the 3 images of the gadget. Ensure each picture is less than 10MB of size and is only the picture of the color variant.</Text>
                    <View style={{ flexDirection: "row" }}>
                      <TouchableOpacity
                        style={{ width: 114, height: 79, backgroundColor: "#02549220", borderRadius: 10, justifyContent: "center", alignItems: "center", marginRight: 10 }}
                        onPress={pickImage}
                      >
                        <Text style={{ fontSize: 24, color: "#025492" }}>+</Text>
                      </TouchableOpacity>
                      <View style={variationData.images.length > 0 ? { flex: 1 } : {}}>
                        {variationData.images.length > 0 ? (
                          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 5, position: "relative" }}>
                            {variationData.images.map((uri, index) => (
                              <View key={index} style={{ width: '45%', paddingRight: 5, paddingBottom: 5, borderWidth: 1, borderColor: '#0000001A', borderRadius: 5 }}>
                                <Image
                                  source={{ uri }}
                                  style={{ width: '100%', aspectRatio: 10 / 10, borderRadius: 10 }}
                                />
                              </View>
                            ))}
                            <TouchableOpacity onPress={clearSelectedImages} style={{ position: "absolute", right: 5, bottom: -25 }} >
                              <AntDesign name='delete' size={18} color='#FF0000' />
                            </TouchableOpacity>
                          </View>
                        ) : (
                          <Image source={require('../../../assets/images/watchcat.png')} style={{ width: 114, height: 79, borderRadius: 10 }} />
                        )}

                      </View>
                    </View>
                  </View>
                  <View style={{ paddingTop: 40 }} >
                    <View style={styles.inputContainer}>
                      {/*Quantity input*/}
                      <Text style={styles.text}>Quantity Available</Text>
                      <View style={{
                        borderWidth: 1,
                        height: 50,
                        top: 5,
                        borderColor: "#0000001A",
                        borderRadius: 5,
                        backgroundColor: "#00000005"
                      }}>
                        <TextInput
                          style={{ left: 13, width: 302, height: 45, fontSize: 12 }}
                          placeholder="Enter amount of product in stock"
                          keyboardType='number-pad'
                          value={variationData.stock !== null ? variationData.stock.toString() : ''}
                          onChangeText={(value) => setVariationData({ ...variationData, stock: value ? parseInt(value) : null })}
                        />
                      </View>
                    </View>
                    <View style={styles.inputContainer}>
                      {/*Color input*/}
                      <Text style={styles.text}>Product Color</Text>
                      <View style={{
                        borderWidth: 1,
                        height: 50,
                        top: 5,
                        borderColor: "#0000001A",
                        borderRadius: 5,
                        backgroundColor: "#00000005"
                      }}>
                        <TextInput
                          style={{ left: 13, width: 302, height: 45, fontSize: 12 }}
                          placeholder="Enter only the color of the product"
                          keyboardType='default'
                          value={variationData.color}
                          onChangeText={(value) => setVariationData({ ...variationData, color: value })}
                        />
                      </View>
                    </View>
                    <TouchableOpacity
                      onPress={() => {
                        setVariationModal(prev => !prev)
                        setColorVariation((prev) => [...prev, variationData])
                        setVariationData({ color: "", stock: null, images: [] })
                      }}
                      style={{ justifyContent: "center", alignItems: "center", backgroundColor: "#025492", paddingVertical: 15, borderRadius: 5, marginTop: 20 }} >
                      <Text style={{ color: "#fff", fontSize: 13, fontWeight: "500" }}>Add Color Variant</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setVariationModal(prev => !prev)} style={{ justifyContent: "center", alignItems: "center", backgroundColor: Colors.redTransparent, paddingVertical: 15, borderRadius: 5, marginTop: 20 }} >
                      <Text style={{ color: Colors.red, fontSize: 13, fontWeight: "500" }}>Cancel</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
            <View style={styles.inputContainer}>
              {/*Description input*/}
              <Text style={styles.text}>Description</Text>
              <View style={styles.textInput2}>
                <TextInput
                  multiline={true}
                  style={{ top: 3, left: 13, width: width - 61, fontSize: 12 }}
                  placeholder="Enter your product description, e.g. brief description about the product from the manufacturer."
                  value={productDetails}
                  onChangeText={(text) => setProductDetails(text)}
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
    marginBottom: 23
  },
  section2: {
    height: 500,
    flex: 1,

  },
  inputContainer: {
    height: 80,
    position: "relative"
  },
  colorVariationContainer: {
    backgroundColor: Colors.primaryTransparent,
    borderRadius: 5,
    flexDirection: "row",
    paddingLeft: 10,
    paddingRight: 14,
    paddingVertical: 10,
    justifyContent: "space-between"
  },
  colorVariationTextContainer: {
    width: width - 130,
    paddingLeft: 10
  },
  colorVariationText: {
    fontSize: 14,
    lineHeight: 15.2,
    letterSpacing: -0.18,
    color: "#00000090",
    fontWeight: "500"
  },
  colorVariationText2: {
    fontSize: 12,
    lineHeight: 15.2,
    letterSpacing: -0.18,
    color: "#00000070",
    fontWeight: "400"
  },
  colorVariationIcon: {
    alignSelf: "center"
  },
  colorVariationModalCenteredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  colorVariationModalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingVertical: 35,
    paddingHorizontal: 20,
    width: width - 40
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
