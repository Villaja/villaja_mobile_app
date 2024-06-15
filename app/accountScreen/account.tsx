import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, TextInput, Button, Alert, Modal, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../../context/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { defaultStyles } from '../../constants/Styles'
import * as ImagePicker from 'expo-image-picker';
import { Dropdown } from 'react-native-element-dropdown';
import { base_url } from '../../constants/server';
import LottieView from "lottie-react-native";
import { AntDesign, FontAwesome5 } from '@expo/vector-icons';
import Colors from '../../constants/Colors';

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

const { width, height } = Dimensions.get("window")

const account = () => {
    const { user } = useAuth();
    const router = useRouter()
    const [loading, setLoading] = useState(true);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordSecure, setPasswordSecure] = useState(true);
    const [token, setToken] = useState<string>();
    const [address, setAddress] = useState<Address | null>(null);
    const [addressTypeValue, setAddressTypeValue] = useState<string | null>(null);
    const [addressModalVisible, setAddressModalVisible] = useState(false);
    const [passwordModalVisible, setPasswordModalVisible] = useState(false);
    const [userImage, setUserImage] = useState("");
    const [country, setCountry] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");
    const [address2, setAddress2] = useState("");
    const [address1, setAddress1] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [addressType, setAddressType] = useState("")


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
        addressType: '',
    });



    useEffect(() => {
        const fetchData = async () => {
            const storedToken = await AsyncStorage.getItem('token');
            setToken(storedToken!);

            if (user) {
                // Fetch user details
                axios.get(`${base_url}/user/getuser`, {
                    headers: {
                        Authorization: storedToken
                    }
                })
                    .then(response => {
                        const userData = response.data.user;
                        setFirstName(userData.firstname);
                        setLastName(userData.lastname);
                        setPhoneNumber(userData.phoneNumber.toString());
                        setEmail(userData.email);
                        setAddress(userData.addresses.length > 0 ? userData.addresses[0] : null);
                        setCountry(userData.addresses[0]?.country)
                        setState(userData.addresses[0]?.city);
                        setAddress1(userData.addresses[0]?.address1);
                        setAddress2(userData.addresses[0]?.address2);
                        setAddressType(userData.addresses[0]?.addressType)
                        setZipCode(userData.addresses[0]?.zipcode);
                        setLoading(false);
                    })
                    .catch(error => {
                        console.error('Error fetching user details:', error);
                        setLoading(false);
                    });
            }
        };

        fetchData();
    }, [user]);

    const handleUpdate = async () => {
        if (!user) {
            Alert.alert('Login required', 'Please login to update your profile');
            return router.replace('/(modals)/login');
        }

        const userToken = await AsyncStorage.getItem('token')

        try {
            const response = await axios.put(`${base_url}/user/update-user-info`,
                {
                    firstname: firstName,
                    lastname: lastName,
                    email: email,
                    phoneNumber: phoneNumber,
                    password: password
                },

                {
                    headers: {
                        Authorization: userToken
                    }
                }
            );
            if (response.data && response.data.success) {
                Alert.alert('Update Successful', 'Your profile has been successfully updated!!')
                console.log('profile update successful!!!')
            } else {
                Alert.alert('Error', 'Something went wrong, please try again')
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log('Error response:', error.response);
                if (error.response?.status === 500) {
                    Alert.alert('Server Error', 'An error occurred on the server. Please try again later.');
                } else if (error.response?.status === 401) {
                    Alert.alert('Unauthorized', 'Please check your token and try again.');
                } else {
                    Alert.alert('Error', `Please Enter your password to confirm change`);
                    console.log('user password not found', error.message)
                }
            } else {
                Alert.alert('Error', 'An unexpected error occurred');
            }
        }
    };



    // Logic to save/update address
    const handleSaveAddress = async () => {
        if (!user) {
            Alert.alert('Login required', 'Please login to update your address');
            return;
        }

        const userToken = await AsyncStorage.getItem('token')

        try {
            const response = await axios.put(`${base_url}/user/update-user-addresses`,
                {
                    address1: address1,
                    address2: address2,
                    country: country,
                    city: state, //using state useState because there is no state address object to be received by the backend and collecting user's state address is more important than city address 
                    zipCode: zipCode,
                    addressType: addressType,
                },
                {
                    headers: {
                        Authorization: userToken
                    }
                })
            if (response.data && response.data.success) {
                Alert.alert('Success', 'Address successfully updated!!!');
                console.log('User Address changed', response.data);
                setAddressModalVisible(false)
            } else {
                Alert.alert('Error', 'Failed to change address, please try again');
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log('Error response:', error.response);
                if (error.response?.status === 500) {
                    Alert.alert('Update Failed', 'Please delete your address with the button below before updating.');
                } else if (error.response?.status === 401) {
                    Alert.alert('Unauthorized', 'Please check your token and try again.');
                } else {
                    Alert.alert('Error', `Failed to update address: ${error.response?.data.message}`);
                }
            } else {
                Alert.alert('Error', 'An unexpected error occurred');
            }
        }
    };


    const handleDeleteAddress = () => {
        if (!user) {
            Alert.alert('Login required', 'Please login to delete your address');
            return;
        }

        if (!address) {
            Alert.alert('No Address', 'There is no address to delete');
            return;
        }

        // Make a DELETE request to delete the address
        axios.delete(`${base_url}/user/delete-user-address/${address._id}`, {
            headers: {
                Authorization: token,
            }
        })
            .then(response => {
                // Handle success
                console.log('Address deleted successfully:', response.data);
                Alert.alert('Confirmed', 'Address deleted');
                setAddress(null); // Clear the address state
                setCountry('');
                setState('');
                setAddress1('');
                setAddress2('');
                setAddressType('')
                setZipCode('');
            })
            .catch(error => {
                console.error('Error deleting address:', error);
                Alert.alert('Error', 'Failed to delete address');
            });
    };



    const openAddressModal = () => {
        setAddressForm(address || { country: '', state: '', city: '', address1: '', address2: '', zipCode: '', addressType: 'Home' });
        setAddressModalVisible(true);
    };

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState<boolean>(true); // State to manage password visibility
    const [showPassword2, setShowPassword2] = useState<boolean>(true);
    const [showPassword3, setShowPassword3] = useState<boolean>(true);
    const oldPasswordVisible = "VillajaUser12345"; // just for testing input real logic from backend for user old password


    const handleChangePassword = async () => {
        if (!user) {
            Alert.alert('Error', 'Please Log in to change password');
            router.replace('/(modals)/login');
            return;
        }

        if (newPassword !== confirmPassword) {
            Alert.alert('Error', 'Please ensure your new password matches with the confirmed password');
            return;
        }
        const userToken = await AsyncStorage.getItem('token');
        

        try {
            const response = await axios.put(`${base_url}/user/update-user-password`,

                {
                    oldPassword: oldPassword,
                    newPassword: newPassword,
                    confirmPassword: confirmPassword,
                },

                {
                    withCredentials: true,
                    headers: {
                        Authorization: userToken
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
    }


    //functionality for user image upload
    {/*  SUSPENDED FEATURE
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
            setUserImage(result.uri);
            saveUserImage(result.uri);
            // You can now upload 'result.uri' to the backend database here
        }
    };

    // to save selected image to async
    const saveUserImage = async (imageUri) => {
        try {
            await AsyncStorage.setItem('userImage', imageUri);
            setUserImage(imageUri);
        } catch (error) {
            console.error('Error saving user image:', error);
        }
    };


    // to fetch user image from async

    useEffect(() => {
        fetchUserImage();
    }, []);

    const fetchUserImage = async () => {
        try {
            const storedUserImage = await AsyncStorage.getItem('userImage');
            if (storedUserImage !== null) {
                setUserImage(storedUserImage);
            } else {
                setUserImage(testUser.image)
            }
        } catch (error) {
            console.error('Error fetching user image:', error);
            setUserImage(testUser.image)
        }
    };

    let displayImage;
    if (!userImage) {
        displayImage = testUser.image;
    } else {
        displayImage = { uri: userImage };
    } */}


    return (
        <ScrollView showsVerticalScrollIndicator={false} style={styles.pageContainer}>
            <View>
                {/*user image*/}
                <View style={styles.userIconContainer}>
                    <Image source={testUser.image} resizeMode='contain' style={styles.userIcon} />
                    {/* suspended feature
                    <TouchableOpacity style={styles.cameraContainer} onPress={handleImagePicker} > 
                        <Ionicons name="camera-outline" size={23} color={"#ffffff"} style={styles.cameraIcon} />
    </TouchableOpacity> */}
                </View>
                <View style={styles.accountNameContainer} >
                    <Text style={styles.accountName}>{firstName}{lastName}</Text>
                </View>
            </View>
            <View style={styles.section2}>
                <View style={styles.inputContainer}>
                    {/*First name input*/}
                    <Text style={styles.text}>First Name</Text>
                    <View style={styles.textInput}>
                        <TextInput
                            style={{ top: 8, left: 13, fontSize: 12, color: '#00000099' }}
                            value={firstName}
                            onChangeText={text => setFirstName(text)}
                            placeholder="First Name"
                            returnKeyType='done'
                            keyboardType='default'
                        />
                    </View>
                </View>
                <View style={styles.inputContainer}>
                    {/*Last name input*/}
                    <Text style={styles.text}>Last Name</Text>
                    <View style={styles.textInput}>
                        <TextInput
                            style={{ top: 8, left: 13, fontSize: 12, color: '#00000099' }}
                            value={lastName}
                            onChangeText={text => setLastName(text)}
                            placeholder="Last Name"
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

                {/*password input/Edit Button*/}
                <View style={styles.inputContainer}>
                    <Text style={styles.text}>Password</Text>
                    <View style={styles.addressComponent}>
                        <View style={styles.addressTextInput}>
                            <TextInput
                                style={{ top: 8, left: 13, fontSize: 12, color: '#00000099' }}
                                value={password}
                                onChangeText={text => setPassword(text)}
                                secureTextEntry={passwordSecure}
                                placeholder='Enter to confirm change '
                                returnKeyType='done'
                            />
                            <TouchableOpacity style={{ position: 'absolute', right: 1, top: 8, width: 40, height: 30, justifyContent: "center", alignItems: "center" }} onPress={() => setPasswordSecure(!passwordSecure)}>
                                <AntDesign name="eye" size={18} style={{ color: "#00000080" }} />
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity onPress={() => setPasswordModalVisible(!passwordModalVisible)} style={styles.editButton}>
                            <Text style={{ color: "#02549290", fontSize: 12, fontWeight: "400" }}>Change</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/*address input/edit button*/}
                {address ? (
                    <View style={styles.addressInputContainer}>
                        <Text style={styles.text}>Address</Text>
                        <View style={styles.addressComponent}>
                            <TouchableOpacity onPress={openAddressModal} style={styles.addressTextInput}>
                                <Text numberOfLines={1} style={{ top: 15, left: 13, fontSize: 12, color: '#00000099', maxWidth: 200 }}>{address.address1}{/** to display users address before editing */} </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleDeleteAddress} style={styles.editButton}>
                                <Text style={{ color: "#02549290", fontSize: 12, fontWeight: "400" }}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ) : (
                    <View style={styles.addressInputContainer}>
                        <Text style={styles.text}>Address</Text>
                        <View style={styles.addressComponent}>
                            <TouchableOpacity onPress={openAddressModal} style={styles.addressTextInput2}>
                                <Text style={{ top: 15, left: 13, fontSize: 12, color: '#00000099' }}> {/** to display users address before editing */}No Address recorded yet (tap to edit)</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}

            </View>

            {/**confirm change button */}
            <TouchableOpacity
                style={[styles.btn, { marginHorizontal: 20, marginTop: 90, marginBottom: 30 }]}
                onPress={handleUpdate}
            >
                <Text style={styles.btnText}>Confirm Change</Text>
            </TouchableOpacity>

            {/**edit password button modal  */}
            <Modal
                animationType='slide'
                transparent={true}
                visible={passwordModalVisible}
                onRequestClose={() => setPasswordModalVisible(false)}>
                <View style={styles.modalContainer}>
                    <View style={[styles.modalContent, { height: height - 300 }]}>
                        <ScrollView showsVerticalScrollIndicator={false}  >
                            <View style={styles.modalHeader}>
                                <View>
                                    <LottieView source={require('../../assets/images/password.json')} autoPlay loop={false} style={{ width: 200, height: 200 }} />
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
                                            onChangeText={(value) => setOldPassword(value)}
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
                                            secureTextEntry={showPassword2}
                                            value={newPassword}
                                            onChangeText={(value) => setNewPassword(value)}
                                            returnKeyType='done'
                                        />
                                        <TouchableOpacity style={{ position: 'absolute', right: 1, top: 10, width: 40, height: 30, justifyContent: "center", alignItems: "center" }} onPress={() => setShowPassword2(!showPassword2)}>
                                            <AntDesign name="eye" size={18} style={{ color: "#00000080" }} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={{ marginBottom: 30 }} >
                                    <Text style={styles.text} >Confirm Password</Text>
                                    <View style={styles.input3}>
                                        <TextInput
                                            style={{ top: 8, left: 13, fontSize: 14 }}
                                            secureTextEntry={showPassword3}
                                            value={confirmPassword}
                                            onChangeText={(value) => setConfirmPassword(value)}
                                            returnKeyType='done'
                                        />
                                        <TouchableOpacity style={{ position: 'absolute', right: 1, top: 10, width: 40, height: 30, justifyContent: "center", alignItems: "center" }} onPress={() => setShowPassword3(!showPassword3)}>
                                            <AntDesign name="eye" size={18} style={{ color: "#00000080" }} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={styles.buttonContainer}>
                                    <TouchableOpacity onPress={handleChangePassword} style={[styles.button3, { marginRight: 20 }]}>
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

            {/**edit address button modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={addressModalVisible}
                onRequestClose={() => setAddressModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <ScrollView style={styles.addressModalContent}>
                        <Text style={styles.modalHeading}>{address ? 'Update Address' : 'Add Address'}</Text>
                        <Text style={{ fontSize: 13, color: "#00000090", fontWeight: "500", marginBottom: 5 }} >Country</Text>
                        <TextInput
                            placeholder="Enter your country"
                            value={country}
                            onChangeText={(value) => setCountry(value)}
                            style={styles.input}
                            returnKeyType='done'
                        />
                        <Text style={{ fontSize: 13, color: "#00000090", fontWeight: "500", marginBottom: 5 }} >State</Text>
                        <TextInput
                            placeholder="Enter your state"
                            value={state}
                            onChangeText={(value) => setState(value)}
                            style={styles.input}
                            returnKeyType='done'
                        />
                        {/* CHECK LINE 177 FOR EXPLANATION <Text style={{ fontSize: 13, color: "#00000090", fontWeight: "500", marginBottom: 5 }} >City</Text>
                        <TextInput
                            placeholder="Enter your city"
                            value={city}
                            onChangeText={(value) => setCity(value)}
                            style={styles.input}
                            returnKeyType='done'
                        />*/}
                        <Text style={{ fontSize: 13, color: "#00000090", fontWeight: "500", marginBottom: 5 }} >Address Line 1</Text>
                        <TextInput
                            placeholder="Enter your first address"
                            value={address1}
                            onChangeText={(value) => setAddress1(value)}
                            style={styles.input}
                            returnKeyType='done'
                        />
                        <Text style={{ fontSize: 13, color: "#00000090", fontWeight: "500", marginBottom: 5 }} >Address Details</Text>
                        <TextInput
                            placeholder="Enter more details of your address, i.e directions"
                            value={address2}
                            onChangeText={(value) => setAddress2(value)}
                            style={styles.input}
                            returnKeyType='done'
                        />
                        <Text style={{ fontSize: 13, color: "#00000090", fontWeight: "500", marginBottom: 5 }} >Zip Code</Text>
                        <TextInput
                            placeholder="Enter your city zip code"
                            value={zipCode}
                            onChangeText={(value) => setZipCode(value)}
                            style={styles.input}
                            returnKeyType='done'
                        />

                        <Text style={{ fontSize: 13, color: "#00000090", fontWeight: "500", marginBottom: 5 }} >Address Type</Text>
                        <TextInput
                            placeholder="Enter address type (home or work)"
                            value={addressType}
                            onChangeText={(value) => setAddressType(value)}
                            style={styles.input}
                            returnKeyType='done'
                        />
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity onPress={handleDeleteAddress} style={styles.button5}>
                                <Text style={[defaultStyles.btnText, { color: '#025492' }]}>Delete Address</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleSaveAddress} style={styles.button3}>
                                <Text style={defaultStyles.btnText}>Save Address</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setAddressModalVisible(false)} style={[defaultStyles.btn, { backgroundColor: 'rgba(255,0,0,0.05)', marginBottom: 30 }]}>
                                <Text style={[defaultStyles.btnText, { color: "rgb(255,0,0)" }]}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </Modal>
        </ScrollView>
    )
}

export default account

const styles = StyleSheet.create({
    pageContainer: {
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