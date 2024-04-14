import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Alert, Modal, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../../context/AuthContext';
import { ScrollView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { defaultStyles } from '../../constants/Styles'
import * as ImagePicker from 'expo-image-picker';
import { Dropdown } from 'react-native-element-dropdown';
import { FontAwesome5 } from '@expo/vector-icons';

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

const account = () => {
    const { user } = useAuth();
    const router = useRouter()
    const [loading, setLoading] = useState(true);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');
    const [address, setAddress] = useState<Address | null>(null);
    const [addressTypeValue, setAddressTypeValue] = useState(null);
    const [addressModalVisible, setAddressModalVisible] = useState(false);
    const [passwordModalVisible, setPasswordModalVisible] = useState(false);
    const [userImage, setUserImage] = useState("");

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

    useEffect(() => {
        const fetchData = async () => {
            const storedToken = await AsyncStorage.getItem('token');
            setToken(storedToken);

            if (user) {
                // Fetch user details
                axios.get('https://api-villaja.cyclic.app/api/user/getuser', {
                    headers: {
                        Authorization: storedToken
                    }
                })
                    .then(response => {
                        const userData = response.data.user;
                        setFirstName(userData.firstname);
                        setLastName(userData.lastname);
                        setPhoneNumber(userData.phoneNumber.toString());
                        setAddress(userData.addresses.length > 0 ? userData.addresses[0] : null);
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

    const handleUpdate = () => {
        if (!user) {
            Alert.alert('Login required', 'Please login to update your profile');
            return;
        }

        const updatedUser = {
            firstname: firstName,
            lastname: lastName,
            email: user?.user.email,
            password: password,
            phoneNumber: phoneNumber
        };

        // Update user information
        axios.put('https://api-villaja.cyclic.app/api/user/update-user-info', updatedUser, {
            headers: {
                Authorization: token
            }
        })
            .then(response => {

                Alert.alert('Success', 'Details updated');
                console.log('User information updated successfully:');
            })
            .catch(error => {

                Alert.alert('Error', 'Failed to update profile');
                console.error('Error updating user information:', error.message);
            });
    };




    const handleSaveAddress = () => {
        if (!user) {
            Alert.alert('Login required', 'Please login to update your address');
            return;
        }


        const newAddress = {
            ...addressForm
        };

        // Logic to save/update address
        axios.put('https://api-villaja.cyclic.app/api/user/update-user-addresses', newAddress, {
            headers: {
                Authorization: token
            }
        })
            .then(response => {
                // Handle success
                console.log('Address saved/updated successfully:', response.data);
                Alert.alert('success', 'address added, refresh please');
                setAddressModalVisible(false);
                // You may want to update the address state here if needed
            })
            .catch(error => {
                // Handle error
                console.error('Error saving/updating address:', error);
                Alert.alert('Error', 'Failed to save/update address');
            });
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
        axios.delete(`https://api-villaja.cyclic.app/api/user/delete-user-address/${address._id}`, {
            headers: {
                Authorization: token
            }
        })
            .then(response => {
                // Handle success
                console.log('Address deleted successfully:', response.data);
                Alert.alert('deleted', 'address deleted');
                setAddress(null); // Clear the address state
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
    const [showPassword, setShowPassword] = useState(false); // State to manage password visibility
    const oldPasswordVisible = "bighead"; // just for testing input real logic from backend for user old password


    //functionality for user image upload
    {/*  suspended feature
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
                    <Text style={styles.accountName}>{firstName} {lastName}</Text>
                </View>
            </View>
            <View style={styles.section2}>
                <View style={styles.inputContainer}>
                    {/*First name input*/}
                    <Text style={styles.text}>First Name</Text>
                    <View style={styles.textInput}>
                        <TextInput
                            style={{ top: 8, left: 13, fontSize: 12 }}
                            value={firstName}
                            onChangeText={text => setFirstName(text)}
                            placeholder="First Name"
                        />
                    </View>
                </View>
                <View style={styles.inputContainer}>
                    {/*Last name input*/}
                    <Text style={styles.text}>Last Name</Text>
                    <View style={styles.textInput}>
                        <TextInput
                            style={{ top: 8, left: 13, fontSize: 12 }}
                            value={lastName}
                            onChangeText={text => setLastName(text)}
                            placeholder="Last Name"
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

                {/*address input/edit button*/}
                {address ? (
                    <View>
                        <Text>Address:</Text>
                        <Text>{`${address.address1}, ${address.city}, ${address.country}`}</Text>
                        <Text>{`Address Type: ${address.addressType}`}</Text>
                        {/* <Button title="Update Address" onPress={openAddressModal} /> */}
                        <Button title="Delete Address" onPress={handleDeleteAddress} />
                    </View>
                ) : (
                    <View style={styles.addressInputContainer}>
                        <Text style={styles.text}>Address</Text>
                        <View style={styles.addressComponent}>
                            <View style={styles.addressTextInput}>
                                <Text style={{ top: 8, left: 13, fontSize: 12 }}> {/** to display users address before editing */} {addressForm.address1}</Text>
                            </View>
                            <TouchableOpacity onPress={openAddressModal} style={styles.editButton}>
                                <Text style={{ color: "#02549290", fontSize: 12, fontWeight: "400" }}>Edit</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}

            </View>

            {/**confirm change button */}
            <TouchableOpacity
                style={[styles.btn, { marginHorizontal: 20, marginVertical: 30, }]}
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
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <View style={styles.modalIconContainer}>
                                <FontAwesome5 name="user-lock" size={25} color="#025492" />
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
                                        secureTextEntry={true}
                                        value={oldPassword}
                                        onChangeText={(text) => setOldPassword(text)}
                                    />
                                </View>
                            </View>
                            <View style={{ marginBottom: 30 }} >
                                <Text style={styles.text} >New Password</Text>
                                <View style={styles.input3}>
                                    <TextInput
                                        style={{ top: 8, left: 13, fontSize: 14 }}
                                        secureTextEntry={true}
                                        value={newPassword}
                                        onChangeText={(text) => setNewPassword(text)}
                                    />
                                </View>
                            </View>
                            <View style={{ marginBottom: 30 }} >
                                <Text style={styles.text} >Confirm Password</Text>
                                <View style={styles.input3}>
                                    <TextInput
                                        style={{ top: 8, left: 13, fontSize: 14 }}
                                        secureTextEntry={true}
                                        value={confirmPassword}
                                        onChangeText={(text) => setConfirmPassword(text)}
                                    />
                                </View>
                            </View>
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity style={styles.button3}>
                                    <Text style={defaultStyles.btnText}>Update</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setPasswordModalVisible(false)} style={[defaultStyles.btn, { backgroundColor: 'rgba(255,0,0,0.05)' }]}>
                                    <Text style={[defaultStyles.btnText, { color: "rgb(255,0,0)" }]}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
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
                            value={addressForm.country}
                            onChangeText={text => setAddressForm({ ...addressForm, country: text })}
                            style={styles.input}
                        />
                        <Text style={{ fontSize: 13, color: "#00000090", fontWeight: "500", marginBottom: 5 }} >State</Text>
                        <TextInput
                            placeholder="Enter your state"
                            value={addressForm.state}
                            onChangeText={text => setAddressForm({ ...addressForm, state: text })}
                            style={styles.input}
                        />
                        <Text style={{ fontSize: 13, color: "#00000090", fontWeight: "500", marginBottom: 5 }} >City</Text>
                        <TextInput
                            placeholder="Enter your city"
                            value={addressForm.city}
                            onChangeText={text => setAddressForm({ ...addressForm, city: text })}
                            style={styles.input}
                        />
                        <Text style={{ fontSize: 13, color: "#00000090", fontWeight: "500", marginBottom: 5 }} >Address Line 1</Text>
                        <TextInput
                            placeholder="Enter your first address"
                            value={addressForm.address1}
                            onChangeText={text => setAddressForm({ ...addressForm, address1: text })}
                            style={styles.input}
                        />
                        <Text style={{ fontSize: 13, color: "#00000090", fontWeight: "500", marginBottom: 5 }} >Address Details</Text>
                        <TextInput
                            placeholder="Enter more details of your address, i.e directions"
                            value={addressForm.address2}
                            onChangeText={text => setAddressForm({ ...addressForm, address2: text })}
                            style={styles.input}
                        />
                        <Text style={{ fontSize: 13, color: "#00000090", fontWeight: "500", marginBottom: 5 }} >Zip Code</Text>
                        <TextInput
                            placeholder="Enter your city zip code"
                            value={addressForm.zipCode}
                            onChangeText={text => setAddressForm({ ...addressForm, zipCode: text })}
                            style={styles.input}
                        />

                        {/**Address type drop down selection */}
                        <Dropdown
                            style={styles.dropdown}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            itemTextStyle={styles.itemTextStyle}
                            iconStyle={styles.iconStyle}
                            data={addressTypeData}
                            maxHeight={300}
                            labelField="label"
                            valueField="value"
                            placeholder="Address Type"
                            value={addressTypeValue}
                            onChange={item => {
                                setAddressTypeValue(item.value);
                            }}
                            dropdownPosition='top'
                        />

                        {/**continuation of edit address modal */}
                        <View style={styles.buttonContainer}>
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