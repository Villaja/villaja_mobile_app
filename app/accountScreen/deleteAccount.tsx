import React, {useState, useEffect} from 'react'
import { View, Text, TextInput, Button, Alert, Modal, StyleSheet, TouchableOpacity, Image } from "react-native";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../../context/AuthContext';
import { ScrollView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { defaultStyles } from '../../constants/Styles'


interface Address {
    _id?: string;
    country: string;
    state: string;
    city: string;
    address1: string;
    address2: string;
    zipCode: string;
    addressType: string;
}

const deleteAccount = () => {
    const testUser = {
        id: 1,
        name: "Tony Danza",
        image: require("../../assets/images/user2.png")
    }

    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [passwordModalVisible, setPasswordModalVisible] = useState(false)
    const [token, setToken] = useState('');
    const router = useRouter()

    const openPasswordModalVisible = () => {
        setPasswordModalVisible(true)
    }

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

    

    return (
        <ScrollView style={styles.pageContainer}>
             <View>
                {/*user image*/}
                <View style={styles.userIconContainer}>
                    <Image source={testUser.image} resizeMode='contain' style={styles.userIcon} />
                    <TouchableOpacity style={styles.cameraContainer} >
                        <Ionicons name="camera-outline" size={23} color={"#ffffff"} style={styles.cameraIcon} />
                    </TouchableOpacity>
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
                            style={{ top: 8, left: 13, }}
                            value={firstName}
                            onChangeText={text => setFirstName(text)}
                            autoFocus
                            placeholder="First Name"
                        />
                    </View>
                </View>
                <View style={styles.inputContainer}>
                    {/*Last name input*/}
                    <Text style={styles.text}>Last Name</Text>
                    <View style={styles.textInput}>
                        <TextInput
                            style={{ top: 8, left: 13, }}
                            value={lastName}
                            onChangeText={text => setLastName(text)}
                            autoFocus
                            placeholder="Last Name"
                        />
                    </View>
                </View>
                 {/*password input/Edit Button*/}
                 <View style={styles.addressInputContainer}>
                    <Text style={styles.text}>Password</Text>
                    <View style={styles.addressComponent}>
                        <View style={styles.addressTextInput}>
                        <TextInput
                            style={{ top: 8, left: 13, }}
                            value={password}
                            onChangeText={text => setPassword(text)}
                            autoFocus
                            placeholder="Enter Password"
                        />
                        </View>
                    </View>
                </View>
                <TouchableOpacity style={{backgroundColor: "#D40606", left: 20, height: 50, width: 320, borderRadius: 10, justifyContent: "center", alignItems: "center", marginTop: 52}}>
                <Text style={{color: "#fff", fontSize: 15, fontFamily: "roboto-condensed-sb"}}>Delete Account</Text>
            </TouchableOpacity>
            </View>
          
        </ScrollView>
    )
}

export default deleteAccount

const styles = StyleSheet.create({
    pageContainer: {
        flex: 1,
        backgroundColor: "#ffffff"
    },
    userIconContainer: {
        top: 28,
        flex: 1,
        height: 180
    },
    userIcon: {
        top: 30,
        height: 150,
        width: 150,
        marginHorizontal: 106,
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
        fontWeight: "500",
    },
    accountNameContainer: {
        position: "relative",
        top: 30,
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
        fontSize: 15,
    },
    textInput: {
        borderWidth: 1,
        width: 320,
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
        width: 320,
        height: 50,
        top: 5,
        borderColor: "#0000001A",
        borderRadius: 5,
        backgroundColor: "#00000005",
    },

})