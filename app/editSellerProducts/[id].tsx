import { Image, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, View, ScrollView, Modal, FlatList, TouchableOpacity, Dimensions, ImageSourcePropType, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import * as ImagePicker from 'expo-image-picker';
import { useSeller } from '../../context/SellerContext';
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import axios from 'axios';
import { AntDesign } from '@expo/vector-icons';
import { useProductUpload } from "../../context/ProductUpload";
import { useAuth } from "../../context/SellerAuthContext";
import { useLocalSearchParams } from 'expo-router';
import { base_url } from "../../constants/server";
import { Dropdown } from "react-native-element-dropdown";
import AsyncStorage from '@react-native-async-storage/async-storage';
const {width} = Dimensions.get("window")

interface Category{
  id:number,
  name:string,
  image:ImageSourcePropType
}

const categoriesData = [
    { id: 1, name: 'Mobile Phones', image: require('../../assets/images/phonecat.png') }, 
    { id: 2, name: 'Smart Watches and Trackers', image: require('../../assets/images/sm-w.png') }, 
    { id: 3, name: 'Tablets', image: require('../../assets/images/tabcat.png') }, 
    { id: 4, name: 'Accessories', image: require('../../assets/images/phoneacc.png') }, 
    { id: 5, name: 'Stands and lights', image: require('../../assets/images/stands.png') },
    { id: 6, name: 'Laptop Bags', image: require('../../assets/images/bags.png') }, 
    { id: 7, name: 'Earphones and Headphones', image: require('../../assets/images/headphonescat.png') }, 
    { id: 8, name: 'Laptops', image: require('../../assets/images/laptopcat.png') }, 
    { id: 9, name: 'Cases and Covers', image: require('../../assets/images/cases.png') },
    { id: 10, name: 'Stylus and tablets', image: require('../../assets/images/stylus.png') },
    { id: 11, name: 'Microphones', image: require('../../assets/images/microphone.png') }, 
    { id: 12, name: 'Speakers', image: require('../../assets/images/speakers.png') },
    { id: 13, name: 'Chargers and More', image: require('../../assets/images/charger.png') }, 
    { id: 14, name: 'Gaming Accessories', image: require('../../assets/images/gaming.png') },
    { id: 15, name: 'Keyboard and Mice', image: require('../../assets/images/keyboard.png') } 
];

const options = [
    { label: 'Brand New', value: 'Brand New' },
    { label: 'Open Box', value: 'Open Box' },
    { label: 'Refurbished', value: 'Refurbished' },
    { label: 'Uk-used', value: 'Uk-used' },
    { label: 'Pre-owned', value: 'Pre-owned' },
];

const options2 = [
    { label: 'Headphones', value: 'Headphones' },
    { label: 'Charger and cable', value: 'Charger and cable' },
    { label: 'Original Box', value: 'Original Box' },
    { label: 'No accessories', value: 'No accessories' }
];

const options3 = [
    { label: 'None', value: 'None' },
    { label: '64GB', value: '64GB' },
    { label: '100GB', value: '100GB' },
    { label: '128GB', value: '128GB' },
    { label: '250GB', value: '250GB' },
    { label: '512GB', value: '512GB' },
    { label: '800GB', value: '800GB' },
    { label: '1TB', value: '1TB' },
    { label: '2TB & more', value: '2TB & more' },
];

const options4 = [
    { label: 'None', value: 'None' },
    { label: '2GB', value: '2GB' },
    { label: '4GB', value: '4GB' },
    { label: '6GB', value: '6GB' },
    { label: '8GB', value: '8GB' },
    { label: '10GB', value: '10GB' },
    { label: '12GB', value: '12GB' },
    { label: '16GB', value: '16GB' },
    { label: '32GB', value: '32GB' }
];

const options5 = [
    { label: 'None', value: 'None' },
    { label: 'LCD', value: 'LCD' },
    { label: 'LED', value: 'LED' },
    { label: 'OLED', value: 'OLED' },
    { label: 'AMOLED', value: 'AMOLED' },
    { label: 'QLED', value: 'QLED' },
    { label: 'PLASMA', value: 'PLASMA' },
    { label: 'CRT', value: 'CRT' },
    { label: 'E-ink', value: 'E-ink' },
    { label: 'Micro-LED', value: 'Micro-LED' },
    { label: 'Mini-LED', value: 'Mini-LED' },
];

const options6 = [
    { label: 'None', value: 'None' },
    { label: 'Nano Sim Factory Unlocked', value: 'Nano Sim Factory Unlocked' },
    { label: 'Dual Sim Factory Unlocked', value: 'Dual Sim Factory Unlocked' },
    { label: 'e-Sim Factory Unlocked', value: 'e-Sim Factory Unlocked' },
    { label: 'Nano Sim Factory Locked', value: 'Nano Sim Factory Locked' },
    { label: 'Dual Sim Factory Locked', value: 'Dual Sim Factory Locked' },
    { label: 'e-Sim Factory Locked', value: 'e-Sim Factory Locked' },
];

const options7 = [
    { label: 'None', value: 'None' },
    { label: 'Android OS', value: 'Android OS' },
    { label: 'IOS', value: 'IOS' },
    { label: 'Mac OS', value: 'Mac OS' },
    { label: 'Windows xp OS', value: 'Windows xp OS' },
    { label: 'Windows Vista OS', value: 'Windows Vista OS' },
    { label: 'Windows 7 OS', value: 'Windows 7 OS' },
    { label: 'Windows 7 Professional OS', value: 'Windows 7 Professional OS' },
    { label: 'Windows 8 OS', value: 'Windows 8 OS' },
    { label: 'Windows 10 OS', value: 'Windows 10 OS' },
    { label: 'Windows 10 Education OS', value: 'Windows 10 Education OS' },
    { label: 'Windows 10 Pro OS', value: 'Windows 10 Pro OS' },
    { label: 'Windows 11 Home OS', value: 'Windows 11 Home OS' },
    { label: 'Windows 11 Pro OS', value: 'Windows 11 Pro OS' },
    { label: 'Linux OS', value: 'Linux OS' },
    { label: 'Chrome OS', value: 'Chrome OS' },
    { label: 'Ubuntu OS', value: 'Ubuntu OS' },
    { label: 'FreeDOS', value: 'FreeDOS' },
];

const options8 = [
    { label: 'None', value: 'None' },
    { label: '2 months', value: '2 months' },
    { label: '4 months', value: '4 months' },
    { label: '6 months', value: '6 months' },
    { label: '8 months', value: '8 months' },
    { label: '10 months', value: '10 months' },
    { label: '12 months', value: '12 months' },
    { label: '12 months & above', value: '12 months & above' }
]

const options9 = [
    { label: 'Bluetooth Only', value: 'Bluetooth Only' },
    { label: 'Wi-fi Only', value: 'Wi-fi Only' },
    { label: 'Bluetooth and Wi-fi', value: 'Bluetooth and Wi-fi' },
];


const sellerAddProduct: React.FC = () => {
  const { seller } = useAuth();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { setProductUploadPayload } = useProductUpload();
  const [name, setName] = useState<string>("");
  const [originalPrice, setOriginalPrice] = useState<string>("");
  const [discountPrice, setDiscountPrice] = useState<string>("");
  const [stock, setStock] = useState<string>("");
  const [color, setColor] = useState<string>("");
  const [productDetails, setProductDetails] = useState<string>("")
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const router = useRouter();
  const {productUploadPayload} = useProductUpload();
  const [brandName, setBrandName] = useState("");
  const [modelName, setModelName] = useState("");
  const [weight, setWeight] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  //const [batteryCapacity, setBatteryCapacity] = useState("");
  const [gadgetCondition, setGadgetCondition] = useState("");
  const [comesWith, setComesWith] = useState("");
  const [storageCapacity, setStorageCapacity] = useState("");
  const [ramSize, setRamSize] = useState("");
  const [displayType, setDisplayType] = useState("");
  const [simCard, setSimCard] = useState("");
  const [operatingSystem, setOperatingSystem] = useState("");
  const [connectivityTechnology, setConnectivityTechnology] = useState("");
  const [warranty, setWarranty] = useState("");
  const [isFocus1, setIsFocus1] = useState<boolean>(false);
  const [isFocus2, setIsFocus2] = useState<boolean>(false);
  const [isFocus3, setIsFocus3] = useState<boolean>(false);
  const [isFocus4, setIsFocus4] = useState<boolean>(false);
  const [isFocus5, setIsFocus5] = useState<boolean>(false);
  const [isFocus6, setIsFocus6] = useState<boolean>(false);
  const [isFocus7, setIsFocus7] = useState<boolean>(false);
  const [isFocus8, setIsFocus8] = useState<boolean>(false);
  const [isFocus9, setIsFocus9] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const renderLabel1 = () => {
    if (gadgetCondition || isFocus1) {
      return (
        <Text style={[styles.label, isFocus1 && { color: '#025492' }]}>
          Select product condition
        </Text>
      )
    }
    return null;
  };

  const renderLabel2 = () => {
    if (comesWith || isFocus2) {
      return (
        <Text style={[styles.label, isFocus2 && { color: "#025492" }]}>
          Select other conditions
        </Text>
      )
    }
    return null;
  };

  const renderLabel3 = () => {
    if (storageCapacity || isFocus3) {
      return (
        <Text style={[styles.label, isFocus3 && { color: "#025492" }]}>
          Select storage size
        </Text>
      )
    }
    return null;
  };

  const renderLabel4 = () => {
    if (ramSize || isFocus4) {
      return (
        <Text style={[styles.label, isFocus4 && { color: "#025492" }]}>
          select RAM size
        </Text>
      )
    }
    return null;
  };

  const renderLabel5 = () => {
    if (displayType || isFocus5) {
      return (
        <Text style={[styles.label, isFocus5 && { color: "#025492" }]}>
          Select screen display type
        </Text>
      )
    }
    return null;
  };

  const renderLabel6 = () => {
        if (simCard || isFocus6) {
            return (
                <Text style={[styles.label, isFocus6 && { color: "#025492" }]}>
                    Select sim card type and condition
                </Text>
            )
        }
        return null;
    };

    const renderLabel7 = () => {
        if (operatingSystem || isFocus7) {
            return (
                <Text style={[styles.label, isFocus7 && { color: "#025492" }]}>
                    Select gadget OS
                </Text>
            )
        }
        return null;
    };

    const renderLabel8 = () => {
        if (warranty || isFocus8) {
            return (
                <Text style={[styles.label, isFocus8 && { color: "#025492" }]}>
                    Select product warranty period
                </Text>
            )
        }
        return null;
    };

    const renderLabel9 = () => {
        if (connectivityTechnology || isFocus9) {
            return (
                <Text style={[styles.label, isFocus9 && { color: "#025492" }]}>
                    Select connectivity technology
                </Text>
            )
        }
        return null;
    };



    const shopId = seller?.seller._id

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await axios.get(`${base_url}/product/get-product-details/${id}`);
                setName(response.data.product.name);
                setProductDetails(response.data.product.description);
                setOriginalPrice(response.data.product.originalPrice.toString());
                setDiscountPrice(response.data.product.discountPrice.toString());
                setStock(response.data.product.stock.toString());
                setColor(response.data.product.colorList.color);
                setBrandName(response.data.product.brand);
                setModelName(response.data.product.model);
                setGadgetCondition(response.data.product.condition);
                setComesWith(response.data.product.inTheBox);
                setStorageCapacity(response.data.product.internalMemory);
                setRamSize(response.data.product.memorySize);
                setSerialNumber(response.data.product.serialNumber);
                setSimCard(response.data.product.cellularTechnology);
                setOperatingSystem(response.data.product.os);
                setWarranty(response.data.product.tags);
                setDisplayType(response.data.product.displaySize);
                setConnectivityTechnology(response.data.product.connectivityTechnology);
                setDisplayType(response.data.product.displaySize)
                setWeight(response.data.product.weight)
                console.log('product details fetch successful', response)
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };

        fetchProductDetails();
    }, [id]);

    const updateProductDetails = async () => {
        const token = await AsyncStorage.getItem('sellerToken');
        try {
            const response = await axios.put(`${base_url}/product/update-product/${id}`,
                {
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
                    ],
                    brand: brandName,
                    model: modelName,
                    condition: gadgetCondition,
                    inTheBox: comesWith,
                    internalMemory: storageCapacity,
                    memorySize: ramSize,
                    serialNumber: serialNumber,
                    cellularTechnology: simCard,
                    os: operatingSystem,
                    tags: warranty,
                    displaySize: displayType,
                    connectivityTechnology: connectivityTechnology,
                    weight: weight
                },

                {
                    headers: {
                        Authorization: token
                    },
                    withCredentials: true
                }
            )
            if (response.data.success) {
                Alert.alert('Upload Success', 'Your product has been successfully updated');
                setLoading(false);
                router.replace('/(drawer)/(otherDrawerScreens)/SellerProducts')
              } else {
                setLoading(false)
                return console.log('error updating product');
              }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log('Error response:', error.response);
                if (error.response?.status === 500) {
                    Alert.alert(`Update Failed', 'something went wrong:${error.response?.data.message}` );
                } else if (error.response?.status === 401) {
                    Alert.alert('Unauthorized', 'Please log in and try again.');
                } else {
                    Alert.alert('Error', `Failed to upload product: ${error.response?.data.message}`);
                }
            } else {
                Alert.alert('Error', 'An unexpected error occurred');
            }
        }
    }



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
          <View style={styles.section22}>
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
                  value={stock}
                  onChangeText={(value) => setStock(value)}
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
          <View style={styles.section2} >
        <View style={styles.inputContainer}>
          {/*Brand name input*/}
          <Text style={styles.text}>Brand Name</Text>
          <View style={styles.textInput}>
            <TextInput
              style={{ top: 5, left: 13, width: 302, height: 45, fontSize: 12 }}
              placeholder="Enter product brand name...."
              onChangeText={(value) => setBrandName(value)}
              value={brandName}
            />
          </View>
        </View>
        <View style={styles.inputContainer}>
          {/*Model name input*/}
          <Text style={styles.text}>Model Name</Text>
          <View style={styles.textInput}>
            <TextInput
              style={{ top: 5, left: 13, width: width - 59, height: 45, fontSize: 12 }}
              placeholder="Enter product model name...."
              onChangeText={(value) => setModelName(value)}
              value={modelName}
            />
          </View>
        </View>
        <View style={styles.inputContainer}>
          {/*phone condition input*/}
          <Text style={styles.text}>Product Condition</Text>
          <View style={styles.dropdownInput}>
            {renderLabel1()}
            <Dropdown
              style={[styles.dropdown, isFocus1 && { borderColor: '#025492' }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              itemTextStyle={styles.itemTextStyle}
              iconStyle={styles.iconStyle}
              data={options}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocus1 ? 'Select product condition' : '...'}
              searchPlaceholder="Search..."
              value={gadgetCondition}
              onFocus={() => setIsFocus1(true)}
              onBlur={() => setIsFocus1(false)}
              onChange={item => {
                setGadgetCondition(item.value);
                setIsFocus1(false);
              }}
              renderLeftIcon={() => (
                <AntDesign
                  style={styles.icon2}
                  color={isFocus1 ? '#02549290' : '#00000090'}
                  name="Safety"
                  size={18}
                />
              )}
            />
          </View>
        </View>
        <View style={styles.inputContainer}>
          {/*other conditions input*/}
          <Text style={styles.text}>Comes With</Text>
          <View style={styles.dropdownInput}>
            {renderLabel2()}
            <Dropdown
              style={[styles.dropdown, isFocus2 && { borderColor: '#025492' }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              itemTextStyle={styles.itemTextStyle}
              iconStyle={styles.iconStyle}
              data={options2}
              keyboardAvoiding={true}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocus2 ? 'Select product extras' : '...'}
              searchPlaceholder="Search..."
              value={comesWith}
              onFocus={() => setIsFocus2(true)}
              onBlur={() => setIsFocus2(false)}
              onChange={item => {
                setComesWith(item.value);
                setIsFocus2(false);
              }}
              renderLeftIcon={() => (
                <AntDesign
                  style={styles.icon2}
                  color={isFocus2 ? '#02549290' : '#00000090'}
                  name="Safety"
                  size={18}
                />
              )}
            />
          </View>
        </View>
        <View style={styles.inputContainer}>
          {/*storage capacity input*/}
          <Text style={styles.text}>Storage Capacity</Text>
          <View style={styles.dropdownInput}>
            {renderLabel3()}
            <Dropdown
              style={[styles.dropdown, isFocus3 && { borderColor: '#025492' }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              itemTextStyle={styles.itemTextStyle}
              iconStyle={styles.iconStyle}
              data={options3}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              keyboardAvoiding={true}
              placeholder={!isFocus3 ? 'Select storage size' : '...'}
              searchPlaceholder="Search..."
              value={storageCapacity}
              onFocus={() => setIsFocus3(true)}
              onBlur={() => setIsFocus3(false)}
              onChange={item => {
                setStorageCapacity(item.value);
                setIsFocus3(false);
              }}
              renderLeftIcon={() => (
                <AntDesign
                  style={styles.icon2}
                  color={isFocus3 ? '#02549290' : '#00000090'}
                  name="Safety"
                  size={18}
                />
              )}
              dropdownPosition='top'
            />
          </View>
        </View>
        <View style={styles.inputContainer}>
          {/*RAM capacity input*/}
          <Text style={styles.text}>RAM Capacity</Text>
          <View style={styles.dropdownInput}>
            {renderLabel4()}
            <Dropdown
              style={[styles.dropdown, isFocus4 && { borderColor: '#025492' }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              itemTextStyle={styles.itemTextStyle}
              iconStyle={styles.iconStyle}
              data={options4}
              search
              maxHeight={300}
              keyboardAvoiding={true}
              labelField="label"
              valueField="value"
              placeholder={!isFocus4 ? 'Select RAM size' : '...'}
              searchPlaceholder="Search..."
              value={ramSize}
              onFocus={() => setIsFocus4(true)}
              onBlur={() => setIsFocus4(false)}
              onChange={item => {
                setRamSize(item.value);
                setIsFocus4(false);
              }}
              renderLeftIcon={() => (
                <AntDesign
                  style={styles.icon2}
                  color={isFocus4 ? '#02549290' : '#00000090'}
                  name="Safety"
                  size={18}
                />
              )}
              dropdownPosition='top'
            />
          </View>
        </View>
        <View style={styles.inputContainer}>
          {/*Connectivity Technology input*/}
          <Text style={styles.text}>Connectivity Technology</Text>
          <View style={styles.dropdownInput}>
            {renderLabel9()}
            <Dropdown
              style={[styles.dropdown, isFocus9 && { borderColor: '#025492' }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              itemTextStyle={styles.itemTextStyle}
              iconStyle={styles.iconStyle}
              data={options9}
              search
              maxHeight={300}
              keyboardAvoiding={true}
              labelField="label"
              valueField="value"
              placeholder={!isFocus9 ? 'Select connectivity technology' : '...'}
              searchPlaceholder="Search..."
              value={connectivityTechnology}
              onFocus={() => setIsFocus9(true)}
              onBlur={() => setIsFocus9(false)}
              onChange={item => {
                setConnectivityTechnology(item.value);
                setIsFocus9(false);
              }}
              renderLeftIcon={() => (
                <AntDesign
                  style={styles.icon2}
                  color={isFocus9 ? '#02549290' : '#00000090'}
                  name="Safety"
                  size={18}
                />
              )}
              dropdownPosition='top'
            />
          </View>
        </View>
        <View style={styles.inputContainer}>
          {/*main camera input*/}
          <Text style={styles.text}>Serial Number</Text>
          <View style={styles.textInput}>
            <TextInput
              style={{ top: 5, left: 13, width: width - 59, height: 45, fontSize: 12 }}
              placeholder="Enter the product's serial (this will not be displayed)"
              value={serialNumber}
              onChangeText={(value) => setSerialNumber(value)}
            />
          </View>
        </View>
        <View style={styles.inputContainer}>
          {/*Resolution input*/}
          <Text style={styles.text}>Weight</Text>
          <View style={styles.textInput}>
            <TextInput
              style={{ top: 5, left: 13, width: width - 59, height: 45, fontSize: 12 }}
              placeholder="Enter the weight of the product"
              value={weight}
              onChangeText={(value) => setWeight(value)}
            />
          </View>
        </View>
        <View style={styles.inputContainer}>
          {/*display type input*/}
          <Text style={styles.text}>Display Type</Text>
          <View style={styles.dropdownInput}>
            {renderLabel5()}
            <Dropdown
              style={[styles.dropdown, isFocus5 && { borderColor: '#025492' }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              itemTextStyle={styles.itemTextStyle}
              iconStyle={styles.iconStyle}
              data={options5}
              search
              maxHeight={300}
              labelField="label"
              keyboardAvoiding={true}
              valueField="value"
              placeholder={!isFocus5 ? 'Select screen display type' : '...'}
              searchPlaceholder="Search..."
              value={displayType}
              onFocus={() => setIsFocus5(true)}
              onBlur={() => setIsFocus5(false)}
              onChange={item => {
                setDisplayType(item.value);
                setIsFocus5(false);
              }}
              renderLeftIcon={() => (
                <AntDesign
                  style={styles.icon2}
                  color={isFocus5 ? '#02549290' : '#00000090'}
                  name="Safety"
                  size={18}
                />
              )}
              dropdownPosition='top'
            />
          </View>
        </View>
        <View style={styles.inputContainer}>
          {/*sim card type input*/}
          <Text style={styles.text}>Sim Card</Text>
          <View style={styles.dropdownInput}>
            {renderLabel6()}
            <Dropdown
              style={[styles.dropdown, isFocus6 && { borderColor: '#025492' }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              itemTextStyle={styles.itemTextStyle}
              iconStyle={styles.iconStyle}
              data={options6}
              search
              maxHeight={300}
              keyboardAvoiding={true}
              labelField="label"
              valueField="value"
              placeholder={!isFocus6 ? 'Select sim card type and condition' : '...'}
              searchPlaceholder="Search..."
              value={simCard}
              onFocus={() => setIsFocus6(true)}
              onBlur={() => setIsFocus6(false)}
              onChange={item => {
                setSimCard(item.value);
                setIsFocus6(false);
              }}
              renderLeftIcon={() => (
                <AntDesign
                  style={styles.icon2}
                  color={isFocus6 ? '#02549290' : '#00000090'}
                  name="Safety"
                  size={18}
                />
              )}
            />
          </View>
        </View>
        <View style={styles.inputContainer}>
          {/*OS input*/}
          <Text style={styles.text}>Operating System</Text>
          <View style={styles.dropdownInput}>
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
              keyboardAvoiding={true}
              valueField="value"
              placeholder={!isFocus7 ? 'Select the OS of the product (if any)' : '...'}
              searchPlaceholder="Search..."
              value={operatingSystem}
              onFocus={() => setIsFocus7(true)}
              onBlur={() => setIsFocus7(false)}
              onChange={item => {
                setOperatingSystem(item.value);
                setIsFocus7(false);
              }}
              renderLeftIcon={() => (
                <AntDesign
                  style={styles.icon2}
                  color={isFocus7 ? '#02549290' : '#00000090'}
                  name="Safety"
                  size={18}
                />
              )}
              dropdownPosition='top'
            />
          </View>
        </View>
        <View style={styles.inputContainer}>
          {/*Warranty input*/}
          <Text style={styles.text}>Warranty</Text>
          <View style={styles.dropdownInput}>
            {renderLabel8()}
            <Dropdown
              style={[styles.dropdown, isFocus8 && { borderColor: '#025492' }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              itemTextStyle={styles.itemTextStyle}
              iconStyle={styles.iconStyle}
              data={options8}
              keyboardAvoiding={true}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocus8 ? 'Select product warranty period' : '...'}
              searchPlaceholder="Search..."
              value={warranty}
              onFocus={() => setIsFocus8(true)}
              onBlur={() => setIsFocus8(false)}
              onChange={item => {
                setWarranty(item.value);
                setIsFocus8(false);
              }}
              renderLeftIcon={() => (
                <AntDesign
                  style={styles.icon2}
                  color={isFocus8 ? '#02549290' : '#00000090'}
                  name="Safety"
                  size={18}
                />
              )}
              dropdownPosition='top'
            />
          </View>
        </View>
        {/*<View style={styles.inputContainer}>
          Battery capacity input
          <Text style={styles.text}>Battery Capacity</Text>
          <View style={styles.textInput}>
            <TextInput
              style={{ top: 5, left: 13, width: width - 59, height: 45, fontSize: 12 }}
              placeholder="5000 mAh or type 'None' if product has none...."
              onChangeText={(value) => setBatteryCapacity(value)}
            />
          </View>
        </View>*/}
      </View>
          <TouchableOpacity style={styles.button} onPress={() => updateProductDetails()}>
            <Text style={styles.buttonText1}>Next</Text>
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
    marginBottom: 13
  },
  section22: {
    height: 500,
    flex: 1,
    marginBottom: 200
  },
  inputContainer2: {
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
  },
  section2: {
    flex: 1,
    top: 23,
    marginBottom: 80
  },
  inputContainer: {
    height: 80,
    position: "relative",
    marginBottom: 12
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
  dropdownInput: {
    paddingVertical: 10,
  },
})