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
    const [loggedIn, setLoggedIn] = useState(true) // Set to false when the user is not logged in to test or set login authentication

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
    const [phoneNumber, setPhoneNumber] = useState("");
    const [phoneNumberEditing, setPhoneNumberEditing] = useState(false)
    const handlePhoneNumberEditClick = () => {
        setPhoneNumberEditing(true)
    }
    const handlePhoneNumberSaveClick = () => {
        setPhoneNumberEditing(false)
        //Logic to save uploaded phone number
    }

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
                <View style={styles.camera}>
                <TouchableOpacity style={styles.cameraContainer} >
                    <Ionicons name="camera-outline" size={23} color={"#ffffff"} style={styles.cameraIcon} />
                </TouchableOpacity>
                </View>

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
                    <View style={styles.textInput}>
                        {loggedIn ? (
                            phoneNumberEditing ? (
                                <TextInput
                                    style={{ top: 15, left: 13 }}
                                    value={phoneNumber}
                                    onChangeText={(text) => setPhoneNumber(text)}
                                    onBlur={handlePhoneNumberSaveClick}
                                    autoFocus
                                />
                            ) : (
                                <TouchableOpacity onPress={handlePhoneNumberEditClick} style={{ top: 15, left: 13 }}>
                                    <Text style={{ color: "#00000080" }}>{phoneNumber}</Text>
                                </TouchableOpacity>
                            )
                        ) : (
                            <Text style={{ top: 15, left: 13, color: "#00000080" }}>Please Log in To Change Your Phone Number</Text>
                        )}
                    </View>
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.text}>Location</Text>
                    <View style={styles.textInput}>
                        {loggedIn ? (
                            location ? (
                                <TextInput
                                    style={{ top: 15, left: 13, }}
                                    
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
    camera: {
        width: 100,
        backgroundColor: "red",
        marginHorizontal: 200,
        position: 'absolute'
    },
    cameraContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#025491",
        width: 35,
        marginHorizontal: 20,
        position: "absolute",
        top: 150,
        borderRadius: 5,
        
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
        width: 200,
        marginHorizontal: 125,
        fontWeight: "500",
        
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
        fontSize: 16,
        
    },
    textInput: {
        borderWidth: 1,
        width: 320,
        height: 51,
        top: 5,
        borderColor: "#0000001A",
        borderRadius: 5,
        backgroundColor: "#00000005"
    },
    textInput2: {
        top: 3.5,
        flex: 1,
        paddingHorizontal: 15
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