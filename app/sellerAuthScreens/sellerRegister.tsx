import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, StyleSheet, TextInput, Dimensions, TouchableOpacity, Alert, FlatList, Image, ActivityIndicator } from "react-native";
import { Dropdown } from 'react-native-element-dropdown';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { EvilIcons } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import * as ImagePicker from 'expo-image-picker';
import { useAuth } from "../../context/SellerAuthContext";
import { Link, useRouter } from 'expo-router';
import axios, { AxiosError } from 'axios';
import Colors from '../../constants/Colors';
import { usePushNotifications } from '../usePushNotifications';


const { width } = Dimensions.get('window')

const data = [
  { label: 'Abia State', value: 'Abia State' },
  { label: 'Adamawa State', value: 'Adamawa State' },
  { label: 'Akwa Ibom State', value: 'Akwa Ibom State' },
  { label: 'Anambra State', value: 'Anambra State' },
  { label: 'Bauchi State', value: 'Bauchi State' },
  { label: 'Bayelsa State', value: 'Bayelsa State' },
  { label: 'Benue State', value: 'Benue State' },
  { label: 'Borno State', value: 'Borno State' },
  { label: 'Cross River State', value: 'Cross River State' },
  { label: 'Delta State', value: 'Delta State' },
  { label: 'Ebonyi State', value: 'Ebonyi State' },
  { label: 'Edo State', value: 'Edo State' },
  { label: 'Ekiti State', value: 'Ekiti State' },
  { label: 'Enugu State', value: 'Enugu State' },
  { label: 'Gombe State', value: 'Gombe State' },
  { label: 'Imo State', value: 'Imo State' },
  { label: 'Jigawa State', value: 'Jigawa State' },
  { label: 'Kaduna State', value: 'Kaduna State' },
  { label: 'Kano State', value: 'Kano State' },
  { label: 'Katsina State', value: 'Katsina State' },
  { label: 'Kebbi State', value: 'Kebbi State' },
  { label: 'Kogi State', value: 'Kogi State' },
  { label: 'Kwara State', value: 'Kwara State' },
  { label: 'Lagos State', value: 'Lagos State' },
  { label: 'Nasarawa State', value: 'Nasarawa State' },
  { label: 'Niger State', value: 'Niger State' },
  { label: 'Ogun State', value: 'Ogun State' },
  { label: 'Ondo State', value: 'Ondo State' },
  { label: 'Osun State', value: 'Osun State' },
  { label: 'Oyo State', value: 'Oyo State' },
  { label: 'Plateau State', value: 'Plateau State' },
  { label: 'Rivers State', value: 'Rivers State' },
  { label: 'Sokoto State', value: 'Sokoto State' },
  { label: 'Taraba State', value: 'Taraba State' },
  { label: 'Yobe State', value: 'Yobe State' },
  { label: 'Zamfara State', value: 'Zamfara State' },
];

const sellerRegister = () => {
  const [shopName, setShopName] = useState("");
  const [handler, setHandler] = useState("");
  const [handlerPhoneNumber, setHandlerPhoneNumber] = useState("");
  const [shopEmailAddress, setShopEmailAddress] = useState("");
  const [shopAddress, setShopAddress] = useState("")
  const [addressState, setAddressState] = useState<string | null>(null);
  const [zipCode, setZipCode] = useState("");
  const [phonesNiche, setPhonesNiche] = useState<boolean>(false);
  const [laptopNiche, setLaptopNiche] = useState<boolean>(false);
  const [tabletsNiche, setTabletsNiche] = useState<boolean>(false);
  const [accessoriesNiche, setAccessoriesNiche] = useState<boolean>(false);
  const [selectedImages, setSelectedImages] = useState<string>("");
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState<boolean>(true)
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState<boolean>(true)
  const { register, isLoading, error, message } = useAuth();
  const [description, setDescription] = useState("");
  const router = useRouter();
  const { expoPushToken } = usePushNotifications();

  const renderStates = (item: any) => {
    return (
      <View style={styles.item} >
        <Text style={styles.textItem} >{item.label}</Text>
      </View>
    )
  };

  // Function to request permission and launch image picker for profile picture
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      allowsEditing: true,
      allowsMultipleSelection: false, // Denies multiple image selection
      base64: true,
    });

    if (!result.canceled && result.assets.length > 0) {
      const asset = result.assets[0];
      const newImage = `data:image/${asset.mimeType?.split('/')[1]};base64,${asset.base64}`;
      setSelectedImages(newImage); // Reset and store the new image
    }
  };


  
  const handleGetStartedButton = async () => {
    try {
      // await submit(shopName, handler, handlerPhoneNumber, shopEmailAddress, shopAddress,
      //   addressState, zipCode, phonesNiche, laptopNiche, tabletsNiche, accessoriesNiche,
      //   profileImage, backgroundImage
      // )
      // the backend endpoint does not store most of these values
      if (shopName === "" || handler === "" || handlerPhoneNumber === "" || shopEmailAddress === "" || shopAddress === "" || addressState === "" || zipCode === "") {
        Alert.alert('Registration Failed', 'Please fill in all fields', [{ text: "OK" }]);
      } else if (password !== confirmPassword) {
        Alert.alert('Registration Failed', 'Password and Confirm Password do not match', [{ text: "OK" }]);
      } else if (selectedImages.length === 0) {
        Alert.alert('Registration Failed', 'Please upload your shop logo as your profile picture', [{ text: "OK" }]);
      } else {
        await register(shopName, shopEmailAddress, password, shopAddress, selectedImages, handlerPhoneNumber, zipCode, expoPushToken?.data, description);
      }
    } catch (error) {
      Alert.alert('Registration Failed', `${error}`);
      console.log(error)
    }
  };
  
  useEffect(() => {
    if (message) {
      Alert.alert('Verify Your Account', message, [{ text: "OK" }]);
      router.replace('/sellerAuthScreens/SellerLogin')
    } else if (error) {
      Alert.alert('Registration Failed', error, [{ text: "OK" }]);
    }
  }, [message, error])

  return (
    <ScrollView style={styles.container}>
      <View style={{ marginHorizontal: 20, marginTop: 10 }}>
        <Text style={{ fontSize: 29, fontStyle: "italic", fontWeight: "700", color: "#025492" }} >Let's Get Started</Text>
        <Text style={{ fontSize: 13, color: "#00000040", fontWeight: "400" }} >You are welcome to villaja verified merchant centre. Please fill in your shop details</Text>
      </View>
      <View style={styles.section2} >
        <View style={styles.inputContainer}>
          {/*Shop name input*/}
          <Text style={styles.text}>Shop Name</Text>
          <View style={styles.textInput}>
            <TextInput
              style={{ top: 5, left: 13, width: width - 61, height: 45, fontSize: 12 }}
              placeholder="Enter your shop name...."
              onChangeText={(value) => setShopName(value)}
            />
          </View>
        </View>
        <View style={styles.inputContainer}>
          {/*Account handler full name input*/}
          <Text style={styles.text}>Account Handler Full Name</Text>
          <View style={styles.textInput}>
            <TextInput
              style={{ top: 5, left: 13, width: width - 59, height: 45, fontSize: 12 }}
              placeholder="Enter your full name...."
              onChangeText={(value) => setHandler(value)}
            />
          </View>
        </View>
        <View style={styles.inputContainer}>
          {/*Account handler phone number input*/}
          <Text style={styles.text}>Account Handler Phone Number</Text>
          <View style={styles.textInput}>
            <TextInput
              style={{ top: 5, left: 13, width: width - 59, height: 45, fontSize: 12 }}
              placeholder="Enter your phone number...."
              onChangeText={(value) => setHandlerPhoneNumber(value)}
              keyboardType="number-pad"
            />
          </View>
        </View>
        <View style={styles.inputContainer}>
          {/*e-mail address input*/}
          <Text style={styles.text}>E-mail Address</Text>
          <View style={styles.textInput}>
            <TextInput
              style={{ top: 5, left: 13, width: width - 59, height: 45, fontSize: 12 }}
              placeholder="Enter your e-mail address...."
              onChangeText={(value) => setShopEmailAddress(value)}
            />
          </View>
        </View>
        <View style={styles.inputContainer}>
          <Text style={{ fontFamily: 'roboto-condensed', fontSize: 15, color: 'rgba(0,0,0,0.70)' }}>Password</Text>
          <View style={styles.textInput}>
            <TextInput style={{ top: 5, left: 13, width: width - 59, height: 45, fontSize: 12 }} secureTextEntry={passwordVisible} placeholder='Enter Your Password' value={password} returnKeyType="done"
              onChangeText={(text) => setPassword(text)} placeholderTextColor={'rgba(0,0,0,0.20)'} />
            <TouchableOpacity style={{ position: 'absolute', right: 6, top: "35%" }} onPress={() => setPasswordVisible(oldvalue => !oldvalue)}>
              <AntDesign name="eye" size={18} color={Colors.grey} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.inputContainer}>
          <Text style={{ fontFamily: 'roboto-condensed', fontSize: 15, color: 'rgba(0,0,0,0.70)' }}>Confirm Password</Text>
          <View style={styles.textInput}>
            <TextInput style={{ top: 5, left: 13, width: width - 59, height: 45, fontSize: 12 }} returnKeyType="done" secureTextEntry={confirmPasswordVisible} placeholder='Confirm Your Password' value={confirmPassword} placeholderTextColor={'rgba(0,0,0,0.20)'}
              onChangeText={(text) => setConfirmPassword(text)} />
            <TouchableOpacity style={{ position: 'absolute', right: 6, top: "35%" }} onPress={() => setConfirmPasswordVisible(oldvalue => !oldvalue)}>
              <AntDesign name="eye" size={18} color={Colors.grey} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.inputContainer}>
          {/*shop address input*/}
          <Text style={styles.text}>Shop Address</Text>
          <View style={styles.textInput}>
            <TextInput
              style={{ top: 5, left: 13, width: width - 59, height: 45, fontSize: 12 }}
              placeholder="Enter your shop address...."
              onChangeText={(value) => setShopAddress(value)}
            />
          </View>
        </View>
        <View style={styles.inputContainer}>
          {/*Address State input*/}
          <Text style={styles.text}>Shop Address State</Text>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={data}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Select your shop state"
            searchPlaceholder="Search..."
            value={addressState}
            onChange={item => {
              setAddressState(item.value);
            }}
            renderItem={renderStates}
          />
        </View>
        <View style={styles.inputContainer}>
          {/*Zip Code input*/}
          <Text style={styles.text}>Zip Code</Text>
          <View style={styles.textInput}>
            <TextInput
              style={{ top: 5, left: 13, width: width - 59, height: 45, fontSize: 12 }}
              placeholder="Enter your shop address zip code...."
              onChangeText={(value) => setZipCode(value)}
              keyboardType="number-pad"
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
              placeholder="Enter your shop details, what does your shop sell...."
              onChangeText={(value) => setDescription(value)}
              value={description}
            />
          </View>
        </View>
      </View>
      <View style={styles.nicheContainer} >
        {/* Niche Tags Selection */}
        <Text style={styles.text} >Niche Tags</Text>
        <View style={styles.textInput3} >
          <Text style={{ fontSize: 12, marginLeft: 10, color: "#00000070", marginTop: 10, marginBottom: 10 }} >Select your shop niche, what category is your shop involved in....</Text>
          <View style={{ flexDirection: "row" }} >
            <View style={{ marginLeft: 10, marginVertical: 10, width: 92.09, height: 35.06, backgroundColor: "#025492", justifyContent: "center", alignItems: "center", borderRadius: 5 }} >
              <BouncyCheckbox
                size={13}
                fillColor="gray"
                unfillColor="#ffffff"
                text="Phones"
                iconStyle={{ borderColor: "gray" }}
                innerIconStyle={{ borderWidth: 2 }}
                textStyle={{ fontSize: 10, color: "#ffffff" }}
                onPress={(isChecked: boolean) => { setPhonesNiche(isChecked) }}
              />
            </View>
            <View style={{ marginLeft: 10, marginVertical: 10, width: 92.09, height: 35.06, backgroundColor: "#025492", justifyContent: "center", alignItems: "center", borderRadius: 5 }} >
              <BouncyCheckbox
                size={13}
                fillColor="gray"
                unfillColor="#ffffff"
                text="Laptops"
                iconStyle={{ borderColor: "gray" }}
                innerIconStyle={{ borderWidth: 2 }}
                textStyle={{ fontSize: 10, color: "#ffffff" }}
                onPress={(isChecked: boolean) => { setLaptopNiche(isChecked) }}
              />
            </View>
            <View style={{ marginLeft: 10, marginVertical: 10, width: 92.09, height: 35.06, backgroundColor: "#025492", justifyContent: "center", alignItems: "center", borderRadius: 5 }} >
              <BouncyCheckbox
                size={13}
                fillColor="gray"
                unfillColor="#ffffff"
                text="Tablets"
                iconStyle={{ borderColor: "gray" }}
                innerIconStyle={{ borderWidth: 2 }}
                textStyle={{ fontSize: 10, color: "#ffffff" }}
                onPress={(isChecked: boolean) => { setTabletsNiche(isChecked) }}
              />
            </View>
          </View>
          <View style={{ flexDirection: "row" }} >
            <View style={{ marginLeft: 10, marginVertical: 10, width: 110.09, height: 35.06, backgroundColor: "#025492", justifyContent: "center", alignItems: "center", borderRadius: 5 }} >
              <BouncyCheckbox
                size={13}
                fillColor="gray"
                unfillColor="#ffffff"
                text="Accessories"
                iconStyle={{ borderColor: "gray" }}
                innerIconStyle={{ borderWidth: 2 }}
                textStyle={{ fontSize: 10, color: "#ffffff" }}
                onPress={(isChecked: boolean) => { setAccessoriesNiche(isChecked) }}
              />
            </View>
          </View>
        </View>
      </View>
      <View style={{ marginTop: 20, marginHorizontal: 20, marginBottom: 11 }} >
        <Text style={{ fontSize: 18, fontWeight: "500", marginBottom: 5, color: "#00000090" }} >Logo & Background Image</Text>
        <Text style={{ fontSize: 13, color: "#00000050" }} >Upload your shop logo as your profile picture</Text>
      </View>
      <View style={{ flexDirection: "row" }} >
        <View style={{ marginHorizontal: 20, marginBottom: 11.69 }} >
          <Text style={{ fontSize: 13, color: "#00000090", fontWeight: "500", marginBottom: 5 }} >Profile Picture</Text>
          <TouchableOpacity style={{
            width: width - 252, height: 63.31, justifyContent: "center", alignItems: "center",
            backgroundColor: "#02549210", borderRadius: 5, borderWidth: 1,
            borderColor: "#02549250", borderStyle: "dashed",
          }} onPress={pickImage} >
            <EvilIcons name="camera" size={25} color="#025492" />
            <Text style={{ fontSize: 8.79, color: "#00000040", textAlign: "center", marginTop: 5 }} >Click to upload profile picture</Text>
          </TouchableOpacity>
        </View>
        {selectedImages && <Image source={{ uri: selectedImages }} style={{ width: 200, height: 200, marginBottom: 50 }} />}
      </View>
      <TouchableOpacity style={styles.button} onPress={handleGetStartedButton} >
        {
          isLoading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <>
              <Text style={styles.buttonText1}>Get Started</Text>
              <AntDesign name="arrowright" size={12} color="#ffffff" />
            </>
          )
        }
      </TouchableOpacity>
    </ScrollView>
  )
}

export default sellerRegister

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff"
  },
  section2: {
    height: 900,
    top: 23,
    marginHorizontal: 20,
    marginBottom: 15
  },
  inputContainer: {
    height: 80,
    marginBottom: 12
  },
  nicheContainer: {
    marginTop: 180,
    marginHorizontal: 20,
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
    borderColor: "#0000001A",
    borderRadius: 8,
    backgroundColor: "#00000005",
  },
  textInput2: {
    borderWidth: 0.5,
    width: width - 40,
    height: 180,
    top: 5,
    borderColor: "#0000001A",
    borderRadius: 5,
    backgroundColor: "#00000005",
  },
  textInput3: {
    borderWidth: 0.5,
    width: width - 40,
    height: 180,
    top: 5,
    borderColor: "#0000001A",
    borderRadius: 8,
    backgroundColor: "#00000005",
    alignContent: "center",
    marginBottom: 50,
  },
  dropdown: {
    top: 5,
    height: 60,
    width: width - 40,
    backgroundColor: '#00000005',
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: "#0000001A",
    padding: 12,
  },
  item: {
    padding: 13,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textItem: {
    flex: 1,
    fontSize: 13,
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
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 12,
    color: "#00000090"
  },
  button: {
    backgroundColor: "#025492",
    width: 320,
    marginHorizontal: 20,
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