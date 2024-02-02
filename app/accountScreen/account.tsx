import React from 'react'
import { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView, StyleSheet, Switch, Modal, Alert } from "react-native";
import { Svg, Path } from "react-native-svg";
import { defaultStyles } from "../../constants/Styles";
import { useRouter } from "expo-router";
import { Link } from "expo-router";
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';
import { Input } from '@rneui/base';


function account() {
    const router = useRouter()
    const testUser = {
        id: 1,
        name: "Tony Danza",
        image: "https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg"
    }
    const { user } = useAuth();
    //User Name
    const [loggedIn, setLoggedIn] = useState(false) // Set to false when the user is not logged in to test or set login authentication

    const [userName, setUserName] = useState(`${user?.user.firstname || ''} ${user?.user.lastname || ''}`);
    const [nameEditing, setNameEditing] = useState(false);

    const handleNameEditClick = () => {
        setNameEditing(true);
    };
    const handleNameSaveClick = () => {
        // logic to save the updated user name
        setNameEditing(false);
    };

    //User Email
    const [userEmail, setUserEmail] = useState(`${user?.user.email}`)
    const [mailEditing, setMailEditing] = useState(false)

    const handleMailEditClick = () => {
        setMailEditing(true);
    }
    const handleMailSaveClick = () => {
        setMailEditing(false)
        // Logic to save the uploaded user email
    }

    //Phone Number
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState({
        code: "+1",
        name: "United States",
        flag: "🇺🇸",
    });
    const [phoneNumber, setPhoneNumber] = useState("");
    const [phoneNumberEditing, setPhoneNumberEditing] = useState(false)
    const handlePhoneNumberEditClick = () => {
        setPhoneNumberEditing(true)
    }
    const handlePhoneNumberSaveClick = () => {
        setPhoneNumberEditing(false)
        //Logic to save uploaded phone number
    }


    const countryCodes = [
        { id: "1", code: "+1", name: "United States", flag: "🇺🇸" },
        { id: "44", code: "+44", name: "United Kingdom", flag: "🇬🇧" },
        { id: "81", code: "+81", name: "Japan", flag: "🇯🇵" },
        { id: "49", code: "+49", name: "Germany", flag: "🇩🇪" },
        { id: "86", code: "+86", name: "China", flag: "🇨🇳" },
        { id: "91", code: "+91", name: "India", flag: "🇮🇳" },
        { id: "7", code: "+7", name: "Russia", flag: "🇷🇺" },
        { id: "33", code: "+33", name: "France", flag: "🇫🇷" },
        { id: "55", code: "+55", name: "Brazil", flag: "🇧🇷" },
        { id: "39", code: "+39", name: "Italy", flag: "🇮🇹" },
        { id: "82", code: "+82", name: "South Korea", flag: "🇰🇷" },
        { id: "34", code: "+34", name: "Spain", flag: "🇪🇸" },
        { id: "52", code: "+52", name: "Mexico", flag: "🇲🇽" },
        { id: "61", code: "+61", name: "Australia", flag: "🇦🇺" },
        { id: "46", code: "+46", name: "Sweden", flag: "🇸🇪" },
        { id: "31", code: "+31", name: "Netherlands", flag: "🇳🇱" },
        { id: "62", code: "+62", name: "Indonesia", flag: "🇮🇩" },
        { id: "54", code: "+54", name: "Argentina", flag: "🇦🇷" },
        { id: "27", code: "+27", name: "South Africa", flag: "🇿🇦" },
        { id: "92", code: "+92", name: "Pakistan", flag: "🇵🇰" },
        { id: "880", code: "+880", name: "Bangladesh", flag: "🇧🇩" },
        { id: "234", code: "+234", name: "Nigeria", flag: "🇳🇬" },
        { id: "966", code: "+966", name: "Saudi Arabia", flag: "🇸🇦" },
        { id: "90", code: "+90", name: "Turkey", flag: "🇹🇷" },
        { id: "63", code: "+63", name: "Philippines", flag: "🇵🇭" },
        { id: "84", code: "+84", name: "Vietnam", flag: "🇻🇳" },
        { id: "351", code: "+351", name: "Portugal", flag: "🇵🇹" },
        { id: "357", code: "+357", name: "Cyprus", flag: "🇨🇾" },
    ];

    const handleCountrySelect = (country) => {
        setSelectedCountry(country);
        setModalVisible(false);
    };

    const validatePhoneNumber = () => {
        const countryCode = selectedCountry.code;
        const enteredNumber = phoneNumber.trim();

        // validation for countries
        switch (countryCode) {
            case "+1": // United States
                if (!/^[2-9]\d{9}$/.test(enteredNumber)) {
                    showAlert("Invalid phone number format for the United States");
                }
                break;
            case "+44": // United Kingdom
                if (!/^\d{10,14}$/.test(enteredNumber)) {
                    showAlert("Invalid phone number format for the United Kingdom");
                }
                break;
            case "+234": // Nigeria
                if (!/^\d{10}$/.test(enteredNumber)) {
                    showAlert("Invalid phone number format for Nigeria");
                }
                break;
            case "+1": // United States
                if (!/^[2-9]\d{9}$/.test(enteredNumber)) {
                    showAlert("Invalid phone number format for the United States");
                }
                break;
            case "+44": // United Kingdom
                if (!/^\d{10,14}$/.test(enteredNumber)) {
                    showAlert("Invalid phone number format for the United Kingdom");
                }
                break;
            case "+81": // Japan
                if (!/^\d{10,11}$/.test(enteredNumber)) {
                    showAlert("Invalid phone number format for Japan");
                }
                break;
            case "+49": // Germany
                if (!/^\d{10,11}$/.test(enteredNumber)) {
                    showAlert("Invalid phone number format for Germany");
                }
                break;
            case "+86": // China
                if (!/^\d{11}$/.test(enteredNumber)) {
                    showAlert("Invalid phone number format for China");
                }
                break;
            case "+91": // India
                if (!/^[6789]\d{9}$/.test(enteredNumber)) {
                    showAlert("Invalid phone number format for India");
                }
                break;
            case "+7": // Russia
                if (!/^[789]\d{9}$/.test(enteredNumber)) {
                    showAlert("Invalid phone number format for Russia");
                }
                break;
            case "+33": // France
                if (!/^[67]\d{8}$/.test(enteredNumber)) {
                    showAlert("Invalid phone number format for France");
                }
                break;
            default:
                if (!/^\d{1,15}$/.test(enteredNumber)) {
                    showAlert("Invalid phone number format");
                }
        }
    };


    const showAlert = (message) => {
        Alert.alert("Validation Error", message, [{ text: "OK" }]);
    };


    //Location
    const [location, setLocation] = useState(`${user?.user.address}`)
    const [locationEditing, setLocationEditing] = useState(false)

    const handleLocationEditClick = () => {
        setLocationEditing(true)
    }
    const handleLocationSaveClick = () => {
        setLocationEditing(false)
        //Logic to save uploaded phone number
    }

    return (
        <ScrollView style={styles.pageContainer}>
            <View style={styles.imageContainer}>
                {/*user image*/}
                <Image source={{uri:testUser.image}} resizeMode='contain' style={styles.userIcon} />
                <TouchableOpacity style={styles.cameraContainer} >
                    <Ionicons name="camera-outline" size={23} color={"#ffffff"} style={styles.cameraIcon} />
                </TouchableOpacity>

                <Text style={styles.accountName}>{user?.user.firstname} {user?.user.lastname}</Text>

            </View>
            <View style={styles.section2}>
                <View style={styles.inputContainer}>
                    {/*name input*/}
                    <Text style={styles.text}>Name</Text>
                    <View style={styles.textInput}>
                        {loggedIn ? (
                            nameEditing ? (
                                <TextInput
                                    style={{ top: 15, left: 13, }}
                                    value={userName}
                                    onChangeText={(text) => setUserName(text)}
                                    onBlur={handleNameSaveClick}
                                    autoFocus
                                />
                            ) : (
                                <TouchableOpacity onPress={handleNameEditClick} style={{ top: 15, left: 13 }}>
                                    <Text style={{ color: "#00000080" }}>{userName}</Text>
                                </TouchableOpacity>
                            )
                        ) : (
                            <Text style={{ top: 15, left: 13, color: "#00000080" }}>Please Log in To Change Your Name</Text>
                        )}
                    </View>
                </View>
                <View style={styles.inputContainer}>
                    {/*Email Input*/}
                    <Text style={styles.text}>Email</Text>
                    <View style={styles.textInput}>
                        {loggedIn ? (
                            mailEditing ? (
                                <TextInput
                                    style={{ top: 15, left: 13 }}
                                    value={userEmail}
                                    onChangeText={(text) => setUserEmail(text)}
                                    onBlur={handleMailSaveClick}
                                    autoFocus
                                />
                            ) : (
                                <TouchableOpacity onPress={handleMailEditClick} style={{ top: 15, left: 13 }}>
                                    <Text style={{ color: "#00000080" }}>{userEmail}</Text>
                                </TouchableOpacity>
                            )
                        ) : (
                            <Text style={{ top: 15, left: 13, color: "#00000080" }}>Please Log in To Change Your Email</Text>
                        )}
                    </View>
                </View>
                <View style={styles.inputContainer}>
                    {/*Phone Number Input*/}
                    <Text style={styles.text}>Phone Number</Text>
                    <View style={styles.frame99}>
                        <TouchableOpacity
                            onPress={() => setModalVisible(true)}
                            style={styles.countrySelectorContainer}
                        >
                            <View style={styles.countrySelector}>
                                <Text style={styles.flag}>{selectedCountry.flag}</Text>
                                <Text style={styles.countryCode}>{selectedCountry.code}</Text>
                            </View>
                            <View style={styles.phoneNumberInputContainer}>
                                {loggedIn ? (
                                    <TextInput
                                        style={styles.textInput2}
                                        placeholder={`Enter your phone number`}
                                        keyboardType="phone-pad"
                                        onChangeText={(text) => setPhoneNumber(text)}
                                        onBlur={validatePhoneNumber}
                                    />
                                ) : (
                                    <Text style={{ top: 2, left: 13, color: "#00000080" }}>Please Log in To Change Your Email</Text>
                                )}
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Country Code Selector Modal */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <ScrollView>
                                {countryCodes.map((country) => (
                                    <TouchableOpacity
                                        key={country.id}
                                        style={styles.countryOption}
                                        onPress={() => handleCountrySelect(country)}
                                    >
                                        <Text style={styles.flag}>{country.flag}</Text>
                                        <Text style={styles.countryCode}>{country.code}</Text>
                                        <Text style={styles.countryName}>{country.name}</Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        </View>
                    </View>
                </Modal>
                <View style={styles.inputContainer}>
                    <Text style={styles.text}>Location</Text>
                    <View style={styles.textInput}>
                        {loggedIn ? (
                            location ? (
                                <TextInput
                                    style={{ top: 15, left: 13, }}
                                    value={location}
                                    onChangeText={(text) => setLocation(text)}
                                    onBlur={handleLocationSaveClick}
                                />
                            ) : (
                                <TouchableOpacity onPress={handleLocationEditClick} style={{ top: 15, left: 13, }}>
                                    <Text style={{ color: "#00000080" }}>{location}</Text>
                                </TouchableOpacity>
                            )
                        ) : (
                            <Text style={{ top: 15, left: 13, color: "#00000080" }}>Please Log in To Change Your Address</Text>
                        )}
                    </View>
                </View>
            </View>
            <TouchableOpacity
                style={[styles.btn, { marginHorizontal: 20, marginVertical: 15, }]}
                onPress={() => router.push(`/(modals)/otp`)}
            >
                <Text style={styles.btnText}>Confirm Change</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}

export default account

const styles = StyleSheet.create({
    pageContainer: {
        flex: 1,
        backgroundColor: "#ffffff"
    },
    userIcon: {
        top: 30,
        height: 150,

        flex: 1,
        paddingHorizontal: 180,
    },
    cameraContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#025491",
        width: 35,
        left: 210,
        position: "absolute",
        top: 150,
        borderRadius: 5
    },
    cameraIcon: {
        width: 95,
        left: 36.5,
        top: 1,

        paddingVertical: 5
    },
    accountName: {
        color: "#242124",
        fontSize: 25,
        position: "relative",
        top: 40,
        paddingHorizontal: 49,
        left: 60,
        fontWeight: "500"
    },
    accountNameContainer: {
        height: 90
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
        fontSize: 16
    },
    textInput: {
        borderWidth: 1,
        width: 320,
        height: 51,
        top: 5,
        borderColor: "#0000001A",
        borderRadius: 5,
    },
    textInput2: {
        top: 2
    },
    frame99: {
        borderWidth: 1,
        width: 320,
        height: 51,
        top: 5,
        borderColor: "#0000001A",
        borderRadius: 5,
    },
    countrySelector: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        width: 60,
        left: 1,
        top: 3,
    },
    flag: {
        marginRight: 5,
    },
    countryCode: {
        fontWeight: "bold",
    },
    countryName: {
        marginLeft: 10,
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 10,
        elevation: 5,
        height: 500,
        width: 320,
    },
    countryOption: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
    },
    countrycodeselector: {
        width: 200,
        borderWidth: 0,
    },
    countrySelectorContainer: {
        flexDirection: "row",
        alignItems: "center",
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
        fontSize: 16,
        fontFamily: "roboto-condensed-sb",
    }
})