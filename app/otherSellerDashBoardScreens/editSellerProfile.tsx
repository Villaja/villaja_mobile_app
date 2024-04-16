import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, Dimensions, TextInput, Button, Alert, Modal, StyleSheet, TouchableOpacity, Image } from "react-native";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { defaultStyles } from '../../constants/Styles'
import * as ImagePicker from 'expo-image-picker';
import { Dropdown } from 'react-native-element-dropdown';
import { FontAwesome5 } from '@expo/vector-icons';
import { useAuth } from "../../context/SellerAuthContext";
import { base_url } from '../../constants/server';

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
    image: require("../../assets/images/user2.png")
};

const addressTypeData = [
    { label: 'Home', value: '1' },
    { label: 'Work', value: '2' },
    { label: 'Others', value: '3' }
];

const { width } = Dimensions.get("window")

const editSellerProfile = () => {
    const {shop} = useAuth();
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
        const fetchToken = async() => {
            const token = await AsyncStorage.getItem("sellerToken");
            const seller = await AsyncStorage.getItem("seller");

            if (!token) return router.replace('/sellerAuthScreens/SellerLogin');
            setSeller(JSON.parse(seller!).seller);
            setToken(token)
        }

        fetchToken()
    }, []);

    // fetch shop information
    const fetchShop = async() => {
        try {
            const response = await axios.get(`${base_url}/shop/getSeller`, {
                headers: {
                    Authorization: token
                },
            });

            await AsyncStorage.setItem('seller', JSON.stringify(response.data));
            
        } catch (error) {
            console.error('Error fetching shop details', error)
        }
    };  
    
    
    useEffect(() => {
        if (seller && token) {
            fetchShop()
        }
    }, [seller, token]);
    
    

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

        if (!result.cancelled) {
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
    <ScrollView style={styles.container} >
        <Text>Bitch</Text>
    </ScrollView>
  )
}

export default editSellerProfile

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff"
    }
})