import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, Dimensions, TextInput, Button, Alert, Modal, StyleSheet, TouchableOpacity, Image } from "react-native";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { defaultStyles } from '../../../constants/Styles'
import * as ImagePicker from 'expo-image-picker';
import { Dropdown } from 'react-native-element-dropdown';
import { useAuth } from "../../../context/SellerAuthContext";
import { base_url } from '../../../constants/server';
import LottieView from "lottie-react-native";
import { AntDesign, FontAwesome5 } from '@expo/vector-icons';
import Colors from '../../../constants/Colors';


const testUser = {
    id: 1,
    name: "Tony Danza",
    Image: require('../../../assets/images/user2.png')
};

const addressTypeData = [
    { label: 'Home', value: '1' },
    { label: 'Work', value: '2' },
    { label: 'Others', value: '3' }
];

const { width, height } = Dimensions.get("window")


const editSellerProfile = () => {
    const router = useRouter();
    const [seller, setSeller] = useState<any>([]);
    const [token, setToken] = useState<string>();
    const [loading, setLoading] = useState(true);
    const [shopName, setShopName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordSecure, setPasswordSecure] = useState(true);
    const [address, setAddress] = useState('');
    const [addressTypeValue, setAddressTypeValue] = useState<string | null>(null);
    const [addressModalVisible, setAddressModalVisible] = useState(false);
    const [passwordModalVisible, setPasswordModalVisible] = useState(false);
    const [zipCode, setZipCode] = useState('');
    const [selectedImages, setSelectedImages] = useState<string[]>([]);
    const [description, setDescription] = useState("")



    //fetch seller details 
    useEffect(() => {
        const fetchToken = async () => {
            const token = await AsyncStorage.getItem('sellerToken');
            const seller = await AsyncStorage.getItem('seller')

            if (!token) return router.replace('/sellerAuthScreens/SellerLogin')
            setSeller(JSON.parse(seller!).seller)
            setToken(token)
        }

        fetchToken()
    }, [])


   // Functionality to select and upload a product image
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
      setSelectedImages([newImage]); // Reset and store the new image
    }
  };



    const openPasswordModalVisible = () => {
        setPasswordModalVisible(true)
    }


    useEffect(() => {
        const fetchData = async () => {
            const storedToken = await AsyncStorage.getItem('sellerToken');

            if (seller) {
                // Fetch user details
                axios.get(`${base_url}/shop/getSeller`, {
                    headers: {
                        Authorization: storedToken
                    }
                })
                    .then(response => {
                        const userData = response.data.seller;
                        setShopName(userData.name);
                        setPhoneNumber(userData.phoneNumber.toString());
                        setEmail(userData.email);
                        setAddress(userData.address ? userData.address : '');
                        setZipCode(userData.zipCode ? userData.zipCode : '');
                        setDescription(userData.description);
                        setLoading(false);
                    })
                    .catch(error => {
                        console.error('Error fetching seller details:', error);
                        setLoading(false);
                    });
            }
        };

        fetchData();
    }, [seller]);

    //functionality to handle seller profile update
    const updateProfile = async () => {
        const token = await AsyncStorage.getItem('sellerToken');
        
        try {
            if (seller) {
                const response = await axios.put(`${base_url}/shop/update-seller-info`, 
                    {
                        name: shopName,
                        description: description,
                        address: address,
                        phoneNumber: phoneNumber,
                        zipCode: zipCode
                    },

                    {
                        headers: {
                            Authorization: token
                        }
                    }
                );
                if (response.data.success) {
                    Alert.alert('Success', 'Your shop profile has been successfully updated!!');
                    console.log('shop profile successfully updated')
                } else {
                    Alert.alert('Error', 'Failed to update shop profile, please try again');
                }
            } else {
                router.push('/sellerAuthScreens/SellerLogin');
                Alert.alert('Unauthorized', 'Please log in to continue')
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log('Error response:', error.response);
                if (error.response?.status === 500) {
                    Alert.alert('Update Failed', 'Please delete your address with the button below before updating.');
                } else if (error.response?.status === 401) {
                    Alert.alert('Unauthorized', 'Please check your token and try again.');
                } else {
                    Alert.alert('Error', `Failed to update shop profile: ${error.response?.data.message}`);
                }
            } else {
                Alert.alert('Error', 'An unexpected error occurred');
            }
        }
    }

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState<boolean>(true); // State to manage password visibility
    const [showPassword2, setShowPassword2] = useState<boolean>(true);
    const [showPassword3, setShowPassword3] = useState<boolean>(true);
    const oldPasswordVisible = "VillajaUser12345"; // just for testing input real logic from backend for user old password


{/*    const handleChangePassword = async () => {
        if (!seller) {
            Alert.alert('Error', 'Please Log in to change password');
            router.replace('/(modals)/login');
            return;
        }

        if (newPassword !== confirmPassword) {
            Alert.alert('Error', 'Please ensure your new password matches with the confirmed password');
            return;
        }
        const sellerToken = await AsyncStorage.getItem('sellerToken');
        

        try {
            const response = await axios.post(`${base_url}/shop/reset-password`,

                {
                    oldPassword: oldPassword,
                    newPassword: newPassword,
                    confirmPassword: confirmPassword,
                },

                {
                    withCredentials: true,
                    headers: {
                        Authorization: sellerToken
                    }
                }
            )
            if (response && response.data.success) {
                Alert.alert('Success', "Your password has been successfully updated!!!");
                console.log("User's password successfully changed", response.data);
                setOldPassword("");
                setNewPassword("");
                setConfirmPassword("");
                setPasswordModalVisible(false)
            } else {
                Alert.alert('Error', "Failed to change password, please try again")
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log('Error response:', error.response);
                if (error.response?.status === 500) {
                    Alert.alert('Success', "Your password has been successfully updated!!!");
                    setOldPassword("");
                    setNewPassword("");
                    setConfirmPassword("");
                    setPasswordModalVisible(false)
                } else if (error.response?.status === 401) {
                    Alert.alert('Unauthorized', 'Please check your token and try again.');
                } else if (error.response?.status === 400) {
                    Alert.alert('Error', 'your old password is incorrect')
                } else {
                    Alert.alert('Error', `Failed to update password: ${error}`);
                }
            } else {
                Alert.alert('Error', 'An unexpected error occurred');
            }
        };
    }*/}

    const openAddressModal = () => {
        setAddressModalVisible(true);
    };

    const imageSource = selectedImages.length > 0 ? { uri: selectedImages[0] } : seller?.avatar?.url ? { uri: seller.avatar.url } : testUser.Image; // Display the first image from selectedImages
    

    return (
        <ScrollView showsVerticalScrollIndicator={false} style={styles.container} >
            <View>
                {/*seller image*/}
                <View style={styles.userIconContainer}>
                    <Image source={imageSource} style={styles.userIcon} />
                    <TouchableOpacity style={styles.cameraContainer} onPress={pickImage} >
                        <Ionicons name="camera-outline" size={23} color={"#ffffff"} style={styles.cameraIcon} />
                    </TouchableOpacity>
                </View>
                <View style={styles.accountNameContainer} >
                    <Text style={styles.accountName}>{seller.name}</Text>
                </View>
            </View>
            <View style={styles.section2}>
                <View style={styles.inputContainer}>
                    {/*Shop name input*/}
                    <Text style={styles.text}>Shop Name</Text>
                    <View style={styles.textInput}>
                        <TextInput
                            style={{ top: 8, left: 13, fontSize: 12, color: '#00000099' }}
                            value={shopName}
                            placeholder="First Name"
                            returnKeyType='done'
                            keyboardType='default'
                        />
                    </View>
                </View>
                <View style={styles.inputContainer}>
                    {/*Phone Number Input*/}
                    <Text style={styles.text}>Phone Number</Text>
                    <View style={styles.textInput}>
                        <TextInput
                            style={{ top: 8, left: 13, fontSize: 12, color: '#00000099' }}
                            value={phoneNumber}
                            onChangeText={text => setPhoneNumber(text)}
                            placeholder='Phone Number'
                            keyboardType='phone-pad'
                        />
                    </View>
                </View>
                <View style={styles.inputContainer}>
                    {/*E-mail Input*/}
                    <Text style={styles.text}>E-mail</Text>
                    <View style={styles.textInput}>
                        <TextInput
                            style={{ top: 8, left: 13, fontSize: 12, color: '#00000099' }}
                            value={email}
                            onChangeText={text => setEmail(text)}
                            placeholder='Phone Number'
                            keyboardType='default'
                            returnKeyType='done'
                        />

                    </View>
                </View>

                {/*address input/edit button*/}
         
                    <View style={styles.inputContainer}>
                        <Text style={styles.text}>Address</Text>
                        <View style={styles.addressComponent}>
                            <View style={styles.addressTextInput2}>
                                <TextInput
                                    style={{ top: 8, left: 13, fontSize: 12, color: '#00000099' }}
                                    value={address}
                                    onChangeText={text => setAddress(text)}
                                    returnKeyType='done'
                                    placeholder='No address recorded yet'
                                />
                            </View>
                        </View>
                    </View>
      

                {/**Zip Code Input*/}
                <View style={styles.inputContainer}>
                    {/*Shop name input*/}
                    <Text style={styles.text}>Zip Code</Text>
                    <View style={styles.textInput}>
                        <TextInput
                            style={{ top: 8, left: 13, fontSize: 12, color: '#00000099' }}
                            value={zipCode}
                            onChangeText={(value) => setZipCode(value)}
                            placeholder="Enter your shop location zip code"
                            returnKeyType='done'
                            keyboardType='default'
                        />
                    </View>
                </View>
                <View style={styles.addressInputContainer}>
                    {/*More Details input*/}
                    <Text style={styles.text}>Shop Description</Text>
                    <View style={styles.textInput3}>
                        <TextInput
                            multiline={true}
                            style={{ top: 3, left: 13, width: width - 59, fontSize: 12 }}
                            placeholder="Describe what your shop is about"
                            value={description}
                            onChangeText={(text) => setDescription(text)}
                        />
                    </View>
                </View>
            </View>

            {/**confirm change button */}
            <TouchableOpacity
                style={[styles.btn, { marginHorizontal: 20, marginTop: 90, marginBottom: 30 }]}
                onPress={updateProfile}
            >
                <Text style={styles.btnText}>Submit</Text>
            </TouchableOpacity>
            {/*<TouchableOpacity
                style={[styles.btn, { backgroundColor: Colors.primaryTransparent, marginHorizontal: 20, marginBottom: 30 }]}
                onPress={() => setPasswordModalVisible(!passwordModalVisible)}
            >
                <Text style={{fontSize: 14, fontFamily: 'roboto-condensed-sb', color: '#025492'}}>Change Password</Text>
            </TouchableOpacity>*/}

            {/**edit password button modal  */}
            <Modal
                animationType='slide'
                transparent={true}
                visible={passwordModalVisible}
                onRequestClose={() => setPasswordModalVisible(false)}>
                <View style={styles.modalContainer}  >
                    <View style={[styles.modalContent, { height: height - 300 }]}>
                        <ScrollView showsVerticalScrollIndicator={false}  >
                            <View style={styles.modalHeader}>
                                <View>
                                    <LottieView source={require('../../../assets/images/password.json')} autoPlay loop={false} style={{ width: 200, height: 200 }} />
                                </View>
                                <Text style={styles.modalHeaderText}>Change Password</Text>
                            </View>
                            <Text style={styles.p}>To change your password, please fill in the details below. Your new password must contain at least 8 characters, and must have one upper case letter.</Text>
                            <View style={styles.container3}>
                                <View style={{ marginBottom: 30 }} >
                                    <Text style={styles.text} >Current Password</Text>
                                    <View style={styles.input3}>
                                        <TextInput
                                            style={{ top: 8, left: 13, fontSize: 14 }}
                                            secureTextEntry={showPassword}
                                            value={oldPassword}
                                            onChangeText={(text) => setOldPassword(text)}
                                            returnKeyType='done'
                                        />
                                        <TouchableOpacity style={{ position: 'absolute', right: 1, top: 10, width: 40, height: 30, justifyContent: "center", alignItems: "center" }} onPress={() => setShowPassword(!showPassword)}>
                                            <AntDesign name="eye" size={18} style={{ color: "#00000080" }} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={{ marginBottom: 30 }} >
                                    <Text style={styles.text} >New Password</Text>
                                    <View style={styles.input3}>
                                        <TextInput
                                            style={{ top: 8, left: 13, fontSize: 14 }}
                                            returnKeyType='done'
                                            value={newPassword}
                                            onChangeText={(text) => setNewPassword(text)}
                                            secureTextEntry={showPassword2}                        
                                        />
                                        <TouchableOpacity onPress={() => setShowPassword2(!showPassword2)} style={{ position: 'absolute', right: 1, top: 10, width: 40, height: 30, justifyContent: "center", alignItems: "center" }}>
                                            <AntDesign name="eye" size={18} style={{ color: "#00000080" }} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={{ marginBottom: 30 }} >
                                    <Text style={styles.text} >Confirm Password</Text>
                                    <View style={styles.input3}>
                                        <TextInput
                                            style={{ top: 8, left: 13, fontSize: 14 }}
                                            value={confirmPassword}
                                            returnKeyType='done'
                                            secureTextEntry={showPassword3}
                                            onChangeText={(text) => setConfirmPassword(text)}
                                        />
                                        <TouchableOpacity onPress={() => setShowPassword3(!showPassword3)} style={{ position: 'absolute', right: 1, top: 10, width: 40, height: 30, justifyContent: "center", alignItems: "center" }}>
                                            <AntDesign name="eye" size={18} style={{ color: "#00000080" }} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={styles.buttonContainer}>
                                    <TouchableOpacity  style={[styles.button3, { marginRight: 20 }]}>
                                        <Text style={defaultStyles.btnText}>Update</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => setPasswordModalVisible(false)} style={[defaultStyles.btn, { backgroundColor: 'rgba(255,0,0,0.05)', marginRight: 20, marginBottom: 30 }]}>
                                        <Text style={[defaultStyles.btnText, { color: "rgb(255,0,0)" }]}>Cancel</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        </ScrollView>
    )
}

export default editSellerProfile

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff"
    },
    userIconContainer: {
        top: 28,
        width: 200,
        height: 180,
        alignSelf: 'center'
    },
    userIcon: {
        top: 30,
        height: 150,
        width: 150,
        alignSelf: 'center',
        borderRadius: 150,
    },
    cameraContainer: {
       position: 'absolute',
       bottom: 5,
       left: 140,
       width: 42,
       height: 41,
       paddingBottom: 3,
       borderRadius: 5,
       backgroundColor: '#025492',
       justifyContent: 'center',
       alignItems: 'center'
    },
    cameraIcon: {
        width: 22,
        height: 22,
    },
    accountName: {
        color: "#242124",
        fontSize: 25,
        fontWeight: "400",
        textAlign: 'center'
    },
    accountNameContainer: {
        position: "relative",
        top: 40,
        width: 200,
        flex: 1,
        marginHorizontal: 84,
        justifyContent: "center",
        alignItems: "center"
    },
    section2: {
        height: 700,
        flex: 1,
        top: 57,
    },
    inputContainer: {
        top: 30,
        left: 20,
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
    input3: {
        borderWidth: 1,
        width: width - 75,
        height: 50,
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
        marginBottom: 30
    },
    addressComponent: {
        flexDirection: "row",
        alignItems: "center",
        width: width - 40,
    },
    addressTextInput: {
        borderWidth: 1,
        width: width - 100,
        height: 50,
        top: 5,
        borderColor: "#0000001A",
        borderRadius: 5,
        backgroundColor: "#00000005",
    },
    addressTextInput2: {
        borderWidth: 1,
        width: width - 40,
        height: 50,
        top: 5,
        borderColor: "#0000001A",
        borderRadius: 5,
        backgroundColor: "#00000005",
    },
    modalTextContainer: {
        marginBottom: 20,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "#0000001A",
        height: 35,
        alignItems: "center",
        justifyContent: "center"
    },
    modalText: {
        fontFamily: "Roboto",
        color: "#00000090"
    },
    editAddress: {
        fontSize: 5
    },
    editButton: {
        backgroundColor: "#ffffff",
        borderWidth: 0.5,
        borderColor: "#02549290",
        height: 50,
        width: 50,
        top: 5,
        right: 0,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
    },
    textInput2: {
        top: 3.5,
        flex: 1,
        paddingHorizontal: 15
    },
    textInput3: {
        borderWidth: 1,
        width: width - 40,
        height: 220,
        top: 5,
        borderColor: "#0000001A",
        borderRadius: 5,
        backgroundColor: "#00000005"
      },
    btn: {
        backgroundColor: "#025492",
        height: 50,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        top: 5
    },
    btnText: {
        color: "#ffffff",
        fontSize: 14,
        fontFamily: "roboto-condensed-sb",
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',

    },
    modalContent: {
        backgroundColor: '#fff',
        width: '90%',
        paddingLeft: 20,
        borderRadius: 10,
    },
    addressModalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    addressModalContent: {
        backgroundColor: '#fff',
        flex: 1,
        height: 200,
        width: '100%',
        padding: 20,
    },
    modalHeading: {
        fontSize: 16,
        marginBottom: 20,
        fontWeight: "500",
        color: "#00000090"
    },
    buttonContainer: {
        marginTop: 20,
        justifyContent: "space-between"
    },
    button: {
        backgroundColor: '#025492',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 14,
    },
    input: {
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
        fontSize: 13
    },
    addressTypeContainer: {
        flexDirection: "row",
        left: 10,
        alignItems: "center"
    },
    addressTypeButton: {
        flexDirection: "row",
        left: 10,
        alignItems: "center",
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        width: 90,
        height: 40,
        justifyContent: "space-around"
    },
    txte: {
        fontWeight: "400"
    },
    txt: {
        color: "#00000090"
    },
    modalHeader: {
        justifyContent: 'center',
        alignItems: "center",
        paddingRight: 20
    },
    modalHeaderText: {
        fontSize: 22,
        fontWeight: "500",
        color: "#00000090",
    },
    modalIcon: {
        width: 30,
        height: 30,
    },
    p: {
        color: "#00000030",
        fontWeight: "500",
        maxWidth: 300,
        marginTop: 20,
        textAlign: 'center',
        paddingRight: 20,
    },
    cancelButton: {
        backgroundColor: '#025492',
        width: 90,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        alignSelf: "center"
    },
    container3: {
        marginTop: 40
    },
    button3: {
        backgroundColor: "#025492",
        height: 50,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20
    },
    button5: {
        backgroundColor: "#02549220",
        height: 50,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20
    },
    button4: {
        backgroundColor: "#FF000050",
        height: 50,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    dropdown: {
        margin: 16,
        height: 50,
        borderBottomColor: '#00000050',
        borderBottomWidth: 0.5,
    },
    icon: {
        marginRight: 5,
    },
    placeholderStyle: {
        fontSize: 14,
        color: "#00000070"
    },
    selectedTextStyle: {
        fontSize: 14,
        color: "#00000070"
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    itemTextStyle: {
        color: "#00000070",
        fontSize: 14
    }
})