import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, StyleSheet, TextInput, Dimensions, TouchableOpacity, Alert, FlatList, Image } from "react-native";
import { Dropdown } from 'react-native-element-dropdown';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { EvilIcons } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import * as ImagePicker from 'expo-image-picker';
import { useAuth } from "../../context/SellerAuthContext";
import { Link, useRouter } from 'expo-router';


const { width } = Dimensions.get('window')

const data = [
  { label: 'Abia State', value: '1' },
  { label: 'Adamawa State', value: '2' },
  { label: 'Akwa Ibom State', value: '3' },
  { label: 'Anambra State', value: '4' },
  { label: 'Bauchi State', value: '5' },
  { label: 'Bayelsa State', value: '6' },
  { label: 'Benue State', value: '7' },
  { label: 'Borno State', value: '8' },
  { label: 'Cross River State', value: '9' },
  { label: 'Delta State', value: '10' },
  { label: 'Ebonyi State', value: '11' },
  { label: 'Edo State', value: '12' },
  { label: 'Ekiti State', value: '13' },
  { label: 'Enugu State', value: '14' },
  { label: 'Gombe State', value: '15' },
  { label: 'Imo State', value: '16' },
  { label: 'Jigawa State', value: '17' },
  { label: 'Kaduna State', value: '18' },
  { label: 'Kano State', value: '19' },
  { label: 'Katsina State', value: '20' },
  { label: 'Kebbi State', value: '21' },
  { label: 'Kogi State', value: '22' },
  { label: 'Kwara State', value: '23' },
  { label: 'Lagos State', value: '24' },
  { label: 'Nasarawa State', value: '25' },
  { label: 'Niger State', value: '26' },
  { label: 'Ogun State', value: '27' },
  { label: 'Ondo State', value: '28' },
  { label: 'Osun State', value: '29' },
  { label: 'Oyo State', value: '30' },
  { label: 'Plateau State', value: '31' },
  { label: 'Rivers State', value: '32' },
  { label: 'Sokoto State', value: '33' },
  { label: 'Taraba State', value: '34' },
  { label: 'Yobe State', value: '35' },
  { label: 'Zamfara State', value: '36' },
];

const sellerRegister = () => {
  const [shopName, setShopName] = useState("");
  const [handler, setHandler] = useState("");
  const [handlerPhoneNumber, setHandlerPhoneNumber] = useState("");
  const [shopEmailAddress, setShopEmailAddress] = useState("");
  const [shopAddress, setShopAddress] = useState("")
  const [addressState, setAddressState] = useState(null);
  const [zipCode, setZipCode] = useState("");
  const [phonesNiche, setPhonesNiche] = useState<boolean>(false);
  const [laptopNiche, setLaptopNiche] = useState<boolean>(false);
  const [tabletsNiche, setTabletsNiche] = useState<boolean>(false);
  const [accessoriesNiche, setAccessoriesNiche] = useState<boolean>(false);
  const [profileImage, setProfileImage] = useState("");
  const [backgroundImage, setBackgroundImage] = useState("");
  const {submit, isLoading, error, seller} = useAuth()
  const router = useRouter()

  const renderStates = (item) => {
    return (
      <View style={styles.item} >
        <Text style={styles.textItem} >{item.label}</Text>
      </View>
    )
  };

  // Function to request permission and launch image picker for profile picture
  const handleImagePicker = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permission Denied',
        'You need to grant permission to access the camera roll to upload an image.'
      );
      return;
    }

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        setProfileImage(result.uri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
    }
  };

    // Function to request permission and launch image picker for background picture
    const handleImagePicker2 = async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permission Denied',
          'You need to grant permission to access the camera roll to upload an image.'
        );
        return;
      }
  
      try {
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          allowsMultipleSelection: false,
          quality: 1,
        });
  
        if (!result.canceled) {
          setBackgroundImage(result.uri);
        }
      } catch (error) {
        console.error('Error picking image:', error);
      }
    };

    const handleGetStartedButton = async () => {
      try {
        await submit(shopName, handler, handlerPhoneNumber, shopEmailAddress, shopAddress,
          addressState, zipCode, phonesNiche, laptopNiche, tabletsNiche, accessoriesNiche,
          profileImage, backgroundImage
        )
        Alert.alert('Verify Your Account', 'Please check your e-mail to activate your account with the verification code', [{text: "OK"}]);
        router.replace('/(modals)/otp')
      } catch (error) {
        Alert.alert('Registration Failed', 'Unable to register, please try again', [{text: "OK"}]); 
        console.log(error)
      }
    }; 


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
        <Text style={{ fontSize: 18, fontWeight: "500", marginBottom: 5 }} >Logo & Background Image</Text>
        <Text style={{ fontSize: 13, color: "#00000050" }} >Upload your shop logo as your profile picture and background image</Text>
      </View>
      <View style={{ flexDirection: "row"}} >
        <View style={{ marginHorizontal: 20, marginBottom: 11.69 }} >
          <Text style={{ fontSize: 13, color: "#00000090", fontWeight: "500", marginBottom: 5 }} >Profile Picture</Text>
          <TouchableOpacity style={{
            width: width - 252, height: 63.31, justifyContent: "center", alignItems: "center",
            backgroundColor: "#02549210", borderRadius: 5, borderWidth: 1,
            borderColor: "#02549250", borderStyle: "dashed",
          }} onPress={handleImagePicker} >
            <EvilIcons name="camera" size={25} color="#025492" />
            <Text style={{ fontSize: 8.79, color: "#00000040", textAlign: "center", marginTop: 5 }} >Click to upload profile picture</Text>
          </TouchableOpacity>
        </View>
        {profileImage && <Image source={{ uri: profileImage }} style={{ width: 200, height: 200, marginBottom: 50 }} />}
      </View>
      <View style={{ marginHorizontal: 20, marginBottom: 33.69 }} >
        <Text style={{ fontSize: 13, color: "#00000090", fontWeight: "500", marginBottom: 5 }} >Background Image</Text>
        <TouchableOpacity style={{
          width: width - 40, height: 63.31, justifyContent: "center", alignItems: "center",
          backgroundColor: "#02549210", borderRadius: 5, borderWidth: 1,
          borderColor: "#02549250", borderStyle: "dashed",
        }} onPress={handleImagePicker2} >
          <EvilIcons name="camera" size={25} color="#025492" />
          <Text style={{ fontSize: 8.79, color: "#00000040", textAlign: "center", marginTop: 5 }} >Click to upload background image</Text>
        </TouchableOpacity>
      </View>
      <View style={{justifyContent: "center", alignItems: "center", marginBottom: 20}} >
      {backgroundImage && <Image source={{ uri: backgroundImage }} style={{ width: 200, height: 200 }} />}
      </View>
      <TouchableOpacity style={styles.button} onPress={handleGetStartedButton} >
        <Text style={styles.buttonText1}>Get Started</Text>
        <AntDesign name="arrowright" size={12} color="#ffffff" />
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
    top: 23,
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
    height: 220,
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