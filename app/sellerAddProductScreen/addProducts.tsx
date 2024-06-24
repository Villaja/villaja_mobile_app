import React, { useState } from 'react'
import { ScrollView, View, Text, TextInput, Image, StyleSheet, TouchableOpacity, Dimensions, Alert, ActivityIndicator } from 'react-native'
import { useSeller } from '../../context/SellerContext';
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from '@expo/vector-icons/AntDesign';
import { useRouter } from "expo-router";
import { useProductUpload } from "../../context/ProductUpload";
import { useAuth } from "../../context/SellerAuthContext";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { base_url } from '../../constants/server';
const { width } = Dimensions.get("window")



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


const addProducts = () => {
  const router = useRouter();
  const {seller} = useAuth();
  const {productUploadPayload} = useProductUpload();
  const [brandName, setBrandName] = useState("");
  const [modelName, setModelName] = useState("");
  const [weight, setWeight] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  //const [batteryCapacity, setBatteryCapacity] = useState("");
  const [gadgetCondition, setGadgetCondition] = useState<string | null>(null);
  const [comesWith, setComesWith] = useState<string | null>(null);
  const [storageCapacity, setStorageCapacity] = useState<string | null>(null);
  const [ramSize, setRamSize] = useState<string | null>(null);
  const [displayType, setDisplayType] = useState<string | null>(null);
  const [simCard, setSimCard] = useState<string | null>(null);
  const [operatingSystem, setOperatingSystem] = useState<string | null>(null);
  const [connectivityTechnology, setConnectivityTechnology] = useState<string | null>(null);
  const [warranty, setWarranty] = useState<string | null>(null);
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
  };

  const renderLabel2 = () => {
    if (comesWith || isFocus2) {
      return (
        <Text style={[styles.label, isFocus2 && { color: "#025492" }]}>
          Select other conditions
        </Text>
      )
    }
  };

  const renderLabel3 = () => {
    if (storageCapacity || isFocus3) {
      return (
        <Text style={[styles.label, isFocus3 && { color: "#025492" }]}>
          Select storage size
        </Text>
      )
    }
  };

  const renderLabel4 = () => {
    if (ramSize || isFocus4) {
      return (
        <Text style={[styles.label, isFocus4 && { color: "#025492" }]}>
          select RAM size
        </Text>
      )
    }
  };

  const renderLabel5 = () => {
    if (displayType || isFocus5) {
      return (
        <Text style={[styles.label, isFocus5 && { color: "#025492" }]}>
          Select screen display type
        </Text>
      )
    }
  };

  const renderLabel6 = () => {
    if (simCard || isFocus6) {
      return (
        <Text style={[styles.label, isFocus6 && { color: "#025492" }]}>
          Select sim card type and condition
        </Text>
      )
    }
  };

  const renderLabel7 = () => {
    if (operatingSystem || isFocus7) {
      return (
        <Text style={[styles.label, isFocus7 && { color: "#025492" }]}>
          Select gadget OS
        </Text>
      )
    }
  };

  const renderLabel8 = () => {
    if (warranty || isFocus8) {
      return (
        <Text style={[styles.label, isFocus8 && { color: "#025492" }]}>
          Select product warranty period
        </Text>
      )
    }
  };

  const renderLabel9 = () => {
    if (connectivityTechnology || isFocus9) {
      return (
        <Text style={[styles.label, isFocus9 && { color: "#025492" }]}>
          Select connectivity technology
        </Text>
      )
    }
  };


  const shopId = seller?.seller._id



  const handleProductUploadSubmit = async() => {
    setLoading(true);
  
    try {
      const productUploadPayloadJSON = productUploadPayload

      const finalProductUploadPayload = {
        ...productUploadPayloadJSON,
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
      }

      const token = await AsyncStorage.getItem('sellerToken');

      const response = await axios.post(`${base_url}/product/create-product`,
        finalProductUploadPayload,

        {
          headers: {
            Authorization: token,
          },
          withCredentials: true
        }
      )

      if (response.data.success) {
        Alert.alert('Upload Success', 'Your product has been successfully uploaded');
        setLoading(false);
        router.replace('/(drawer)/(tabs2)/sellerDashboard')
      } else {
        setLoading(false)
        return console.log('error creating swap request');
      }
    } catch (error) {
      setLoading(false);
      if (axios.isAxiosError(error)) {
        console.log('Error response:', error.response);
        if (error.response?.status === 500) {
            Alert.alert('Update Failed', 'Please delete your address with the button below before updating.');
        } else if (error.response?.status === 401) {
            Alert.alert('Unauthorized', 'Please check your token and try again.');
        } else {
            Alert.alert('Error', `Failed to upload product: ${error.response?.data.message}`);
        }
    } else {
        Alert.alert('Error', 'An unexpected error occurred');
    }
    } finally {
      setLoading(false)
    }
  }



  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container} >
      <View style={styles.section2} >
        <View style={styles.inputContainer}>
          {/*Brand name input*/}
          <Text style={styles.text}>Brand Name</Text>
          <View style={styles.textInput}>
            <TextInput
              style={{ top: 5, left: 13, width: 302, height: 45, fontSize: 12 }}
              placeholder="Enter product brand name...."
              onChangeText={(value) => setBrandName(value)}
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
              placeholder={!isFocus1 ? 'Select phone condition' : '...'}
              searchPlaceholder="Search..."
              value={gadgetCondition}
              onFocus={() => setIsFocus1(true)}
              onBlur={() => setIsFocus1(false)}
              onChange={item => {
                setGadgetCondition(item.label);
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
                setComesWith(item.label);
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
              placeholder={!isFocus3 ? 'Select storage size' : '...'}
              searchPlaceholder="Search..."
              value={storageCapacity}
              onFocus={() => setIsFocus3(true)}
              onBlur={() => setIsFocus3(false)}
              onChange={item => {
                setStorageCapacity(item.label);
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
              labelField="label"
              valueField="value"
              placeholder={!isFocus4 ? 'Select RAM size' : '...'}
              searchPlaceholder="Search..."
              value={ramSize}
              onFocus={() => setIsFocus4(true)}
              onBlur={() => setIsFocus4(false)}
              onChange={item => {
                setRamSize(item.label);
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
              labelField="label"
              valueField="value"
              placeholder={!isFocus9 ? 'Select connectivity technology' : '...'}
              searchPlaceholder="Search..."
              value={connectivityTechnology}
              onFocus={() => setIsFocus9(true)}
              onBlur={() => setIsFocus9(false)}
              onChange={item => {
                setConnectivityTechnology(item.label);
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
              valueField="value"
              placeholder={!isFocus5 ? 'Select screen display type' : '...'}
              searchPlaceholder="Search..."
              value={displayType}
              onFocus={() => setIsFocus5(true)}
              onBlur={() => setIsFocus5(false)}
              onChange={item => {
                setDisplayType(item.label);
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
              labelField="label"
              valueField="value"
              placeholder={!isFocus6 ? 'Select sim card type and condition' : '...'}
              searchPlaceholder="Search..."
              value={simCard}
              onFocus={() => setIsFocus6(true)}
              onBlur={() => setIsFocus6(false)}
              onChange={item => {
                setSimCard(item.label);
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
              valueField="value"
              placeholder={!isFocus7 ? 'Select the OS of the product (if any)' : '...'}
              searchPlaceholder="Search..."
              value={operatingSystem}
              onFocus={() => setIsFocus7(true)}
              onBlur={() => setIsFocus7(false)}
              onChange={item => {
                setOperatingSystem(item.label);
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
                setWarranty(item.label);
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
      <TouchableOpacity style={styles.button} onPress={() => handleProductUploadSubmit()} >
        {
          loading ?
            <ActivityIndicator size='small' color="#ffffff" />
            :
            <Text style={styles.buttonText1}>Finish</Text>}
      </TouchableOpacity>
    </ScrollView>
  )
}

export default addProducts

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  section2: {
    flex: 1,
    top: 23,
    marginHorizontal: 20,
    marginBottom: 80
  },
  inputContainer: {
    left: 5,
    height: 80,
    position: "relative",
    marginBottom: 12
  },
  text: {
    fontSize: 13,
    color: "#00000090",
    fontWeight: "500"
  },
  textInput: {
    borderWidth: 0.5,
    width: width - 40,
    height: 60,
    top: 5,
    borderColor: "gray",
    borderRadius: 8,
    backgroundColor: "#00000009",
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
  button: {
    backgroundColor: "#025492",
    width: width - 40,
    marginHorizontal: 25,
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 18.29,
    flexDirection: "row",
    gap: 10
  },
  buttonText1: {
    color: "#fff",
    fontSize: 13,
    fontFamily: "roboto-condensed-sb",
  },
})