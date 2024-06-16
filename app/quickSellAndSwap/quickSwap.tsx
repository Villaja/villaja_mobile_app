import * as React from 'react'
import { useState } from 'react';
import { View, ScrollView, Text, Image, TouchableOpacity, StyleSheet, Modal, FlatList, TextInput, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from "expo-router";
import { AntDesign } from '@expo/vector-icons'
import { useQuickSwap } from '../../context/QuickSwapContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface CategoryInterface{
  id:number,
  name:string,
  image:any
}

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


const { width } = Dimensions.get("window");

const quickSwap = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<CategoryInterface | null>(null);
    const [selectedImages, setSelectedImages] = useState<any[]>([]);
    const [productName,setProductName] = useState<string>("")
    const [swapWith,setSwapWith] = useState<string>("")
    const [moreDetails,setMoreDetails] = useState<string>("")
    const router = useRouter()

    const {setQuickSwapPayload}  = useQuickSwap()

    // functionality to render and select categories inside the modal
    const renderCategories = ({ item }:{item:CategoryInterface}) => {
        return (
            <TouchableOpacity
                style={{ flex: 1, flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}
                onPress={() => {
                    setSelectedCategory(item);
                    setModalVisible(false);
                }}>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: '100%' }}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Image source={item.image} style={{ width: 50, height: 50, marginRight: 10 }} />
                        <Text style={{ fontSize: 12, lineHeight: 15.2, letterSpacing: -0.18, color: "#00000090", fontWeight: "500" }}>{item.name}</Text>
                    </View>
                    <Ionicons name='chevron-forward-outline' size={24} style={{ color: "#00000050" }} />
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
            mimeType:asset.mimeType
        }));
      // Ensure the total number of selected images doesn't exceed 4
      const remainingSlots = 4 - selectedImages.length;
      const imagesToAdd = newImages.map(asset => `data:image/${asset.mimeType?.split('/')[1]};base64,`+ asset.base64).slice(0, remainingSlots);
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

  const handleSwapNextPage = async () => {
    // return console.log(selectedImages);
    
    const payload = {
        userProductName : productName,
        userProductCategory: selectedCategory?.name,
        userProductImages:selectedImages,
        swapProductName:swapWith,
        swapProductDetails:moreDetails
    }

    setQuickSwapPayload(payload)
    // await AsyncStorage.setItem('swapPayload',JSON.stringify(payload))
    router.push(`/quickSellAndSwap/postAd2`)}


      

    return (
        <ScrollView style={styles.container}>
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
                        <Ionicons name='chevron-forward-outline' size={24} style={{ color: "#00000030", marginLeft: 'auto', marginRight: 20 }} />
                    </View>
                )}
            </TouchableOpacity>
            <Modal
                animationType="slide"
                transparent={false}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}>
                <View style={{ flex: 1, justifyContent: 'center', paddingHorizontal:20, top: 50, marginBottom: 50 }}>
                    <FlatList
                        data={categoriesData}
                        renderItem={renderCategories}
                        keyExtractor={(item) => item.id.toString()}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
            </Modal>
            <View style={{marginBottom: 28 }}>
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

                                  source={{uri}}
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
                                style={{ left: 13, width: 302, height: 45, fontSize: 12 }}
                                placeholder="Product Name"
                                value={productName}
                                onChangeText={(text) => setProductName(text)}

                            />
                        </View>
                    </View>
                    <View style={styles.inputContainer}>
                        {/*swap with input*/}
                        <Text style={styles.text}>Swap With?</Text>
                        <View style={styles.textInput}>
                            <TextInput
                                style={{ left: 13, width: 302, height: 45, fontSize: 12 }}
                                placeholder="Enter product(s) you want for your product"
                                keyboardType= 'name-phone-pad'
                                value={swapWith}
                                onChangeText={(text) => setSwapWith(text)}

                            />
                        </View>
                    </View>
                    <View style={styles.inputContainer}>
                        {/*More Details input*/}
                        <Text style={styles.text}>More Details</Text>
                        <View style={styles.textInput2}>
                            <TextInput
                                multiline={true}
                                style={{ top: 3, left: 13, width: 302, fontSize: 12 }}
                                placeholder="Enter Details"
                                value={moreDetails}
                                onChangeText={(text) => setMoreDetails(text)}
                            />
                        </View>
                    </View>
                </View>
                <TouchableOpacity style={styles.button} 
                    onPress={() => 
                        
                            handleSwapNextPage()
                    }
                        >
                    <Text style={styles.buttonText1}>Next</Text>
                    <Ionicons name='arrow-forward-outline' size={18} style={styles.buttonText2} />
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default quickSwap

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
        paddingHorizontal:20
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
        height: 500,
        flex: 1,
        top: 23,
    },
    inputContainer: {
        // left: 5,
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
    }
})