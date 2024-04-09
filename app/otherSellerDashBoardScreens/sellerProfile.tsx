import React, {useState} from 'react';
import { Image, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, View, ScrollView, Modal, FlatList, TouchableOpacity, Dimensions } from "react-native";
import { MaterialIcons, MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { timeAgo } from '../../utils/timeAgo';
import { base_url } from "../../constants/server";
import { Product } from '../../types/Product';


const { width } = Dimensions.get("window");

const sellerProfile = () => {
    const [about, setAbout] = useState(3);



    return (
        <ScrollView style={styles.container} >
            <View style={styles.editButton} >
                <TouchableOpacity style={{ width: 88, height: 28, backgroundColor: "#025492", borderRadius: 2, justifyContent: "center", alignItems: "center", alignSelf: "flex-end", marginBottom: 16 }} >
                    <Text style={{ color: "#fff", fontSize: 12 }} >Edit Profile</Text>
                </TouchableOpacity>
            </View>
            <View style={{ width: width + 10, height: 78, marginBottom: 14 }} >
                <Image source={require('../../assets/images/sellerbackgroundpic.png')} resizeMode='contain' style={{ width: width + 10, height: 78, }} />
            </View>
            <View style={{ width: 95, height: 90.48, flexDirection: "row", justifyContent: "center", alignItems: "center", marginHorizontal: 20, position: "absolute", marginTop: 95}} >
                <View style={{ width: 95, height: 90.48, borderRadius: 50, justifyContent: "center", alignItems: "center", backgroundColor: "#02549290",  }} >
                    <Image source={require('../../assets/images/sellerpic.png')} style={{ width: 92, height: 87.48, borderRadius: 50 }} />
                </View>
                <MaterialIcons name="verified" size={18} color="green" style={{ alignSelf: "flex-end", right: 25, bottom: 5 }} />
            </View>
            <Text style={{ fontSize: 18, fontWeight: "500", alignSelf: "center" }} >Thomas Tech</Text>
            <Text style={{ alignSelf: "center", marginBottom: 37,  flexDirection: 'row', alignItems: 'center', fontFamily: 'roboto-condensed', fontSize: 12, color: 'rgba(0,0,0,0.50)' }}><MaterialCommunityIcons name='clock-outline' size={15} color={"rgba(0,0,0,0.50)"} /> 5 months on Villaja</Text>
            <View style={{marginHorizontal: 20}} >
                <View style={{flexDirection: "row", gap: 8}} >
                    <View style={{ width: 53, height: 23, justifyContent: "center", alignItems: "center", backgroundColor: "#02549210", borderRadius: 2}} >
                        <Text style={{fontSize: 10, color: "#025492", lineHeight: 14.2, letterSpacing: -0.17}} >Phones</Text>
                    </View>
                    <View style={{ width: 55, height: 23, justifyContent: "center", alignItems: "center", backgroundColor: "#02549210", borderRadius: 2}} >
                        <Text style={{fontSize: 10, color: "#025492", lineHeight: 14.2, letterSpacing: -0.17}} >Tablets</Text>
                    </View>
                    <View style={{ width: 55, height: 23, justifyContent: "center", alignItems: "center", backgroundColor: "#02549210", borderRadius: 2}} >
                        <Text style={{fontSize: 10, color: "#025492", lineHeight: 14.2, letterSpacing: -0.17}} >Laptops</Text>
                    </View>
                    <View style={{ width: 85, height: 23, justifyContent: "center", alignItems: "center", backgroundColor: "#02549210", borderRadius: 2}} >
                        <Text style={{fontSize: 10, color: "#025492", lineHeight: 14.2, letterSpacing: -0.17}} >Accessories</Text>
                    </View>
                </View>
                <View style={{marginTop: 60}} >
                    <Text style={{fontSize: 13, color: "#00000070", lineHeight: 15.2, letterSpacing: -0.18, fontWeight: "700"}} >About Me</Text>
                    <Text numberOfLines={about} style={{fontSize: 11, color: "#00000070", lineHeight: 15, letterSpacing: -0.18}} >Lorem ipsum dolor sit amet consectetur. Dolor eu sit scelerisque nulla at auctor vitae justo. Viverra tempor velit enim cursus ut purus tortor commodo lacus. Est donec nulla nunc ac mauris nibh. Feugiat molestie malesuada sollicitudin sodales aenean praesent quam ornare fames. Aliquet pharetra massa sed vel.</Text>
                    {
                        about === 100 ?
                        <TouchableOpacity onPress={() => setAbout(3)} style={{ flexDirection: 'row', alignItems: 'center', gap: 4, alignSelf: 'flex-end' }}>
                            <Text style={{fontSize: 11, color: "#025492", lineHeight: 15, letterSpacing: -0.18}} >Show Less</Text>
                            <MaterialIcons name='keyboard-arrow-up' color="#025492" size={14} />
                        </TouchableOpacity>

                        :

                        <TouchableOpacity onPress={() => setAbout(100)} style={{ flexDirection: 'row', alignItems: 'center', gap: 4, alignSelf: 'flex-end' }}>
                            <Text style={{fontSize: 11, color: "#025492", lineHeight: 15, letterSpacing: -0.18}} >Show More</Text>
                            <MaterialIcons name='keyboard-arrow-down' color="#025492" size={14} />
                        </TouchableOpacity>
                    }
                </View>
            </View>
            <View style={{height: 3, width: width + 10, backgroundColor: "#00000010", marginTop: 40}} ></View>
            <View style={{marginTop: 10, flexDirection: "row"}} >
                <TouchableOpacity style={{justifyContent: "center", alignItems: "center", width: 50, height: 50, borderWidth: 1, borderColor: "#00000010"}} >
                    <Ionicons name="grid-outline" size={20} color="#00000070" />
                </TouchableOpacity>
                <TouchableOpacity style={{justifyContent: "center", alignItems: "center", width: 163, height: 50, borderWidth: 1, borderColor: "#00000010"}} >
                    <Ionicons name="grid-outline" size={20} color="#00000070" />
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default sellerProfile

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    editButton: {
        marginHorizontal: 20
    }
})