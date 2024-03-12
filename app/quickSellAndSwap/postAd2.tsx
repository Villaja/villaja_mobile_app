import React, { useState } from 'react'
import { ScrollView, View, Text, TextInput, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from '@expo/vector-icons/AntDesign';


const options = [
    { label: 'No Crack', value: '1' },
    { label: 'Small Crack', value: '2' },
    { label: 'Minor Crack', value: '3' },
    { label: 'Huge Crack', value: '4' },
];

const options2 = [
    { label: 'No scratches, dents or chips', value: '5' },
    { label: 'Some scratches, dents, and chips', value: '6' },
    { label: 'Major Cracks and dents', value: '7' },
];

const options3 = [
    { label: 'Headphones', value: '8' },
    { label: 'Charger and cable', value: '9' },
    { label: 'Original Box', value: '10' },
    { label: 'No accessories', value: '11' }
]


const postAd2 = () => {
    const [selectedValue1, setSelectedValue1] = useState(null);
    const [selectedValue2, setSelectedValue2] = useState(null);
    const [selectedValue3, setSelectedValue3] = useState(null);
    const [isFocus1, setIsFocus1] = useState(false);
    const [isFocus2, setIsFocus2] = useState(false);
    const [isFocus3, setIsFocus3] = useState(false);

    const renderLabel1 = () => {
        if (selectedValue1 || isFocus1) {
            return (
                <Text style={[styles.label, isFocus1 && { color: '#025492' }]}>
                    Select Screen Condition
                </Text>
            );
        }
        return null;
    };

    const renderLabel2 = () => {
        if (selectedValue2 || isFocus2) {
            return (
                <Text style={[styles.label, isFocus2 && { color: '#025492' }]}>
                    Select Cosmetics Condition
                </Text>
            );
        }
        return null;
    };

    const renderLabel3 = () => {
        if (selectedValue3 || isFocus3) {
            return (
                <Text style={[styles.label, isFocus3 && { color: '#025492' }]}>
                    Select Accessories
                </Text>
            );
        }
        return null;
    };


    return (
        <ScrollView style={styles.pageContainer}>
            <View style={styles.textInputContainer}>
                <Text style={styles.text} >Screen Condition</Text>
                <View style={styles.container}>
                    {renderLabel1()}
                    <Dropdown
                        style={[styles.dropdown, isFocus1 && { borderColor: '#025492' }]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        itemTextStyle={styles.itemTextStyle}
                        iconStyle={styles.iconStyle}
                        data={options}
                        search
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder={!isFocus1 ? 'Select Screen Condition' : '...'}
                        searchPlaceholder="Search..."
                        value={selectedValue1}
                        onFocus={() => setIsFocus1(true)}
                        onBlur={() => setIsFocus1(false)}
                        onChange={item => {
                            setSelectedValue1(item.value);
                            setIsFocus1(false);
                        }}
                        renderLeftIcon={() => (
                            <AntDesign
                                style={styles.icon2}
                                color={isFocus1 ? '#02549290' : '#00000090'}
                                name="Safety"
                                size={20}
                            />
                        )}
                    />
                </View>
            </View>
            <View style={styles.textInputContainer}>
                <Text style={styles.text} >Phone Condition</Text>
                <View style={styles.container}>
                    {renderLabel2()}
                    <Dropdown
                        style={[styles.dropdown, isFocus2 && { borderColor: '#025492' }]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        itemTextStyle={styles.itemTextStyle}
                        iconStyle={styles.iconStyle}
                        data={options2}
                        search
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder={!isFocus2 ? 'Select Cosmetics Condition' : '...'}
                        searchPlaceholder="Search..."
                        value={selectedValue2}
                        onFocus={() => setIsFocus2(true)}
                        onBlur={() => setIsFocus2(false)}
                        onChange={item => {
                            setSelectedValue2(item.value);
                            setIsFocus2(false);
                        }}
                        renderLeftIcon={() => (
                            <AntDesign
                                style={styles.icon2}
                                color={isFocus2 ? '#02549290' : '#00000090'}
                                name="Safety"
                                size={18}
                            />
                        )}
                    />
                </View>
            </View>
            <View style={styles.textInputContainer}>
                <Text style={styles.text} >Comes With</Text>
                <View style={styles.container}>
                    {renderLabel3()}
                    <Dropdown
                        style={[styles.dropdown, isFocus2 && { borderColor: '#025492' }]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        itemTextStyle={styles.itemTextStyle}
                        iconStyle={styles.iconStyle}
                        data={options3}
                        search
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder={!isFocus3 ? 'Select Accessories' : '...'}
                        searchPlaceholder="Search..."
                        value={selectedValue3}
                        onFocus={() => setIsFocus3(true)}
                        onBlur={() => setIsFocus3(false)}
                        onChange={item => {
                            setSelectedValue3(item.value);
                            setIsFocus3(false);
                        }} 
                        renderLeftIcon={() => (
                            <AntDesign
                                style={styles.icon2}
                                color={isFocus2 ? '#02549290' : '#00000090'}
                                name="Safety"
                                size={18}
                            />
                        )}
                    />
                </View>
            </View>
    
            <TouchableOpacity style={styles.button} >
                <Text style={styles.buttonText1}>Post Ad</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}

export default postAd2

const styles = StyleSheet.create({
    pageContainer: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    text: {
        fontSize: 15,
        color: "#00000090",
        fontWeight: "500"
    },
    textInput: {
        flexDirection: "row",
        alignItems: "center",
        top: 10,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "#00000010",
        width: 320,
        height: 50
    },
    textInput2: {
        borderWidth: 1,
        width: 320,
        height: 50,
        top: 5,
        borderColor: "#0000001A",
        borderRadius: 5,
        backgroundColor: "#00000005"
    },
    textInputContainer: {
        top: 25,
        marginLeft: 20,
        marginBottom: 28.29
    },
    textInputContainer2: {
        top: 25,
        marginLeft: 20,
        marginBottom: 440.29
    },
    icon: {
        width: 12.94,
        height: 12.93,
        marginRight: 10,
        marginLeft: 11.77,
    },
    button: {
        backgroundColor: "#025492",
        width: 320,
        marginStart: 20,
        height: 50,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },
    buttonText1: {
        color: "#fff",
        fontSize: 15,
        fontFamily: "roboto-condensed-sb",
    },
    container: {
        backgroundColor: 'white',
        paddingVertical: 10,
        marginEnd: 16
    },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    icon2: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 14,
        color: "#00000070",
        marginVertical: 10
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
        fontSize: 14,
        color: "#00000090"
    },
    itemTextStyle: {
        color: "#00000070",
        fontSize: 14
    }
})