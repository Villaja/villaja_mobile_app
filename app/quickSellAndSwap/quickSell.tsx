import React, { useState } from 'react';
import { ScrollView, View, Text, Image, TouchableOpacity, StyleSheet, Modal, FlatList, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';

const categoriesData = [
  { id: 1, name: 'Mobile Phones', image: require('../../assets/images/phonecat.png') },
  { id: 2, name: 'Smart Watches and Trackers', image: require('../../assets/images/watchcat.png') },
  { id: 3, name: 'Tablets', image: require('../../assets/images/tabcat.png') },
  {id: 4, name: 'Phone Accessories', image: require('../../assets/images/phoneacc.png')},
  {id: 5, name: 'Computer Accessories', image: require('../../assets/images/computeracc.png')},
  {id: 6, name: 'Computer Monitors', image: require('../../assets/images/Monitor.png')},
  {id: 7, name: 'Headphones', image: require('../../assets/images/headphonescat.png')},
  {id: 8, name: 'Laptops', image: require('../../assets/images/laptopcat.png')},
  {id: 9, name: 'Networking Products', image: require('../../assets/images/networkcat.png')},
  {id: 10, name: 'Printers & Scanners', image: require('../../assets/images/printercat.png')},
  {id: 11, name: 'Cameras', image: require('../../assets/images/cameracat.png')},
  {id: 12, name: 'Security & Surveillance', image: require('../../assets/images/security.png')},
  {id: 13, name: 'Video Games', image: require('../../assets/images/videogame.jpg')}
];

const QuickSell = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  const renderCategories = ({ item }) => {
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
          <Ionicons name='chevron-forward-outline' size={24} style={{ color: "#00000050"}} />
        </View>
      </TouchableOpacity>
    );
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      multiple: true, // Allows multiple image selection
    });

    if (!result.canceled && result.assets.length > 0) {
      const newImages = result.assets.map(asset => asset.uri);
      setSelectedImages(prevImages => [...prevImages, ...newImages]);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.category} onPress={() => setModalVisible(true)}>
        {selectedCategory ? (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image source={selectedCategory.image} style={{ width: 60, height: 60, marginRight: 40, borderTopLeftRadius: 5, borderBottomLeftRadius: 5 }} />
            <Text style={{ fontSize: 15, lineHeight: 15.2, letterSpacing: -0.18, color: "#00000090", fontWeight: "500" }}>{selectedCategory.name}</Text>
          </View>
        ) : (
          <View style={{ flexDirection: "row", alignItems: "center", width: 325, justifyContent: "space-between" }}>
            <View style={{ flexDirection: "row", alignItems: "center", marginLeft: 20 }}>
              <Text style={{ fontSize: 14, color: "#FF0000", fontWeight: "900" }}>*</Text>
              <Text style={{ fontSize: 15, color: "#00000050", fontWeight: "500", marginLeft: 5 }}>Select Category</Text>
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
        <View style={{ flex: 1, justifyContent: 'center', left: 20, top: 50 }}>
          <FlatList
            data={categoriesData}
            renderItem={renderCategories}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      </Modal>
      <View style={{ marginHorizontal: 20, marginBottom: 28 }}>
        <Text style={{ fontSize: 13, color: "#000000", fontWeight: "500", marginBottom: 5 }}>Add At Least 4 Images</Text>
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
              <FlatList
                data={selectedImages}
                renderItem={({ item }) => (
                  <Image source={{ uri: item }} style={{ width: 114, height: 79, borderRadius: 10, margin: 5 }} />
                )}
                keyExtractor={(item, index) => index.toString()}
                numColumns={2} // Set the number of columns for the grid
                contentContainerStyle={{ paddingBottom: 100 }} // Adjust padding to prevent overflow
              />
            ) : (
              <Image source={require('../../assets/images/watchcat.png')} style={{ width: 114, height: 79, borderRadius: 10 }} />
            )}
          </View>
        </View>
        <View style={styles.section2}>
          <View style={styles.inputContainer}>
            {/*Product name input*/}
            <Text style={styles.text}>Name</Text>
            <View style={styles.textInput}>
              <TextInput
                style={{ top: 8, left: 13, }}
                placeholder="Product Name"
              />
            </View>
          </View>
          <View style={styles.inputContainer}>
            {/*Amount input*/}
            <Text style={styles.text}>Amount</Text>
            <View style={styles.textInput}>
              <TextInput
                style={{ top: 8, left: 13, }}
                placeholder="0.00"
                keyboardType='numeric'
              />
            </View>
          </View>
          <View style={styles.inputContainer}>
            {/*More Details input*/}
            <Text style={styles.text}>More Details</Text>
            <View style={styles.textInput2}>
              <TextInput
                multiline={true}
                style={{ top: 8, left: 13, width: 300, height: 218, }}
                placeholder="Enter Details"
              />
            </View>
          </View>
        </View>
        <TouchableOpacity style={styles.button} >
          <Text style={styles.buttonText1}>Next</Text>
          <Ionicons name='arrow-forward-outline' size={18} style={styles.buttonText2}/>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

export default QuickSell;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff"
  },
  category: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 325,
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
  },
  inputContainer: {
    left: 5,
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
    width: 320,
    height: 50,
    top: 5,
    borderColor: "#0000001A",
    borderRadius: 5,
    backgroundColor: "#00000005"
  },
  textInput2: {
    borderWidth: 1,
    width: 320,
    height: 218,
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
    width: 330,
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
