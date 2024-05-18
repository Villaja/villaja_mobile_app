import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, Dimensions, TextInput, Button, Alert, Modal, StyleSheet, TouchableOpacity, Image } from "react-native";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { defaultStyles } from '../../../constants/Styles'
import * as ImagePicker from 'expo-image-picker';
import { Dropdown } from 'react-native-element-dropdown';
import { FontAwesome5 } from '@expo/vector-icons';
import { useAuth } from "../../../context/SellerAuthContext";
import { base_url } from '../../../constants/server';

interface Address {
    _id?: string;
    country: string;
    state: string;
    city: string;
    address1: string;
    address2: string;
    zipCode: string;
    addressType: string;
};

const testUser = {
    id: 1,
    name: "Tony Danza",
    image: require("../../../assets/images/user2.png")
};

const addressTypeData = [
    { label: 'Home', value: '1' },
    { label: 'Work', value: '2' },
    { label: 'Others', value: '3' }
];

const { width } = Dimensions.get("window")

const editSellerProfile = () => {
    const { shop } = useAuth();
    const [seller, setSeller] = useState<any>([])
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(true);
    const [shopName, setShopName] = useState('');
    const [about, setAbout] = useState(3);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState<string>();
    const [address, setAddress] = useState<Address | null>(null);
    const [addressTypeValue, setAddressTypeValue] = useState(null);
    const [addressModalVisible, setAddressModalVisible] = useState(false);
    const [passwordModalVisible, setPasswordModalVisible] = useState(false);
    const [sellerImage, setSellerImage] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false); // State to manage password visibility
    const oldPasswordVisible = "bighead"; // just for testing input real logic from backend for user old password


    //fetch seller token 
    useEffect(() => {
        const fetchSellerDetails = async () => {
            const token = await AsyncStorage.getItem('sellerToken');
            const seller = await AsyncStorage.getItem('seller');

            if (!token) return router.replace('/sellerAuthScreens/SellerLogin')
            setToken(token);
            setSeller(JSON.parse(seller!).seller);

            if (seller) {
                axios.get(`${base_url}/shop/getSeller`, {
                    headers: {
                        Authorization: token,
                    },
                })
                    .then(response => {
                        const sellerData = response.data.seller;
                        setShopName(sellerData.name);
                        setAbout(sellerData.description);

                    })
            }
        }
    }, [])


    // fetch shop information


    //



    //functionality for user image upload
    const handleImagePicker = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permissionResult.granted) {
            Alert.alert('Permission Denied', 'You need to grant Villaja permission to access the camera roll to upload an image.');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            setSellerImage(result.uri);
            // You can now upload 'result.uri' to the backend database here
        }
    };

    let displayImage;
    if (!sellerImage) {
        displayImage = testUser.image;
    } else {
        displayImage = { uri: sellerImage };
    }

    const openPasswordModalVisible = () => {
        setPasswordModalVisible(true)
    }
    const [addressForm, setAddressForm] = useState<Address>({
        country: '',
        state: '',
        city: '',
        address1: '',
        address2: '',
        zipCode: '',
        addressType: 'Home',
    });

    const openAddressModal = () => {
        setAddressForm(address || { country: '', state: '', city: '', address1: '', address2: '', zipCode: '', addressType: 'Home' });
        setAddressModalVisible(true);
    };

    return (
        <ScrollView showsVerticalScrollIndicator={false} style={styles.container} >
            <View>
                {/*user image*/}
                <View style={styles.userIconContainer}>
                    <Image source={testUser.image} resizeMode='contain' style={styles.userIcon} />
                    <TouchableOpacity style={styles.cameraContainer} onPress={handleImagePicker} >
                        <Ionicons name="camera-outline" size={23} color={"#ffffff"} style={styles.cameraIcon} />
                    </TouchableOpacity>
                </View>
                <View style={styles.accountNameContainer} >
                    <Text style={styles.accountName}>Ademoyinwa Fasiku</Text>
                </View>
            </View>
            <View style={styles.section2} >
                <View style={styles.inputContainer}>
                    {/*First name input*/}
                    <Text style={styles.text}>Shop Name</Text>
                    <View style={styles.textInput}>
                        <TextInput
                            style={{ top: 8, left: 13, fontSize: 12 }}
                            value={shopName}
                            onChangeText={text => setShopName(text)}
                            placeholder="First Name"
                        />
                    </View>
                </View>
                <View style={styles.inputContainer}>
                    {/*Phone Number Input*/}
                    <Text style={styles.text}>Phone Number</Text>
                    <View style={styles.textInput}>
                        <TextInput
                            style={{ top: 8, left: 13, fontSize: 12 }}
                            value={phoneNumber}
                            onChangeText={text => setPhoneNumber(text)}
                            placeholder='Phone Number'
                            keyboardType="phone-pad"
                        />
                    </View>
                </View>

                {/*password input/Edit Button*/}
                <View style={styles.addressInputContainer}>
                    <Text style={styles.text}>Password</Text>
                    <View style={styles.addressComponent}>
                        <View style={styles.addressTextInput}>
                            <Text style={{ top: 15, left: 13, fontSize: 12 }}>{oldPasswordVisible && '*'.repeat(oldPasswordVisible.length)}</Text>
                        </View>
                        <TouchableOpacity onPress={openPasswordModalVisible} style={styles.editButton}>
                            <Text style={{ color: "#02549290", fontSize: 12, fontWeight: "400" }}>Edit</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
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
        height: 180
    },
    userIcon: {
        top: 30,
        height: 150,
        width: 150,
        marginHorizontal: 106,
        borderRadius: 150,

    },
    cameraContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#025491",
        width: 35,
        marginHorizontal: 212,
        position: "absolute",
        top: 144,
        borderRadius: 5,
    },
    cameraIcon: {
        width: 95,
        left: 36.5,
        top: 1,
        paddingVertical: 5,
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
        height: 500,
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
        width: width - 70,
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
    },
    addressComponent: {
        flexDirection: "row",
        alignItems: "center",
        width: 320,

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
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        marginHorizontal: 270
    },
    textInput2: {
        top: 3.5,
        flex: 1,
        paddingHorizontal: 15
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
        color: "#fff",
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
        padding: 20,
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
        flexDirection: "row",
        alignItems: "center"
    },
    modalHeaderText: {
        fontSize: 22,
        fontWeight: "700",
        color: "#00000090",
        fontFamily: "Roboto",
        marginHorizontal: 30
    },
    modalIconContainer: {
        justifyContent: "center",
        alignItems: "center",
        width: 50,
        height: 50,
        backgroundColor: "#88c7dc",
        borderRadius: 50,
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
        textAlign: "justify",

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