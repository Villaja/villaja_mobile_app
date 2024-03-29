import React, { useState } from 'react'
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from "react-native";
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
];

const options4 = [
    { label: 'New', value: '12' },
    { label: 'Open Box', value: '13' },
    { label: 'Uk Used', value: '14' },
    { label: 'Fairly used', value: '15' }, 
    { label: 'For parts', value: '16' }
];

const options5 = [
    { label: '2GB', value: '17' },
    { label: '4GB', value: '18' },
    { label: '6GB', value: '19' },
    { label: '8GB', value: '20' }, 
    { label: '10GB', value: '21' },
    { label: '12GB', value: '22' },
    { label: '16GB', value: '23' },
    { label: '32GB', value: '24' }
];

const options6 = [
    { label: '64GB', value: '25' },
    { label: '100GB', value: '26' },
    { label: '128GB', value: '27' },
    { label: '250GB', value: '28' }, 
    { label: '512GB', value: '29' },
    { label: '800GB', value: '30' },
    { label: '1TB', value: '31' },
    { label: '2TB & more', value: '32' },
];

const options7 = [
    { label: 'less than a month', value: '33' },
    { label: '1 month', value: '34' },
    { label: '2 months', value: '35' },
    { label: 'quarter of a year', value: '36' },
    { label: 'half a year', value: '37' },
    { label: '1 year', value: '38' },
    { label: '2 years', value: '39' },
    { label: '3 years', value: '40' },
    { label: '4 years', value: '41' },
    { label: '5 years', value: '42' },
];


const postAd2 = () => {
    const [selectedValue1, setSelectedValue1] = useState(null);
    const [selectedValue2, setSelectedValue2] = useState(null);
    const [selectedValue3, setSelectedValue3] = useState(null);
    const [selectedValue4, setSelectedValue4] = useState(null);
    const [selectedValue5, setSelectedValue5] = useState(null);
    const [selectedValue6, setSelectedValue6] = useState(null);
    const [selectedValue7, setSelectedValue7] = useState(null);
    const [isFocus1, setIsFocus1] = useState(false);
    const [isFocus2, setIsFocus2] = useState(false);
    const [isFocus3, setIsFocus3] = useState(false);
    const [isFocus4, setIsFocus4] = useState(false);
    const [isFocus5, setIsFocus5] = useState(false);
    const [isFocus6, setIsFocus6] = useState(false);
    const [isFocus7, setIsFocus7] = useState(false);

    const renderLabel1 = () => {
        if (selectedValue1 || isFocus1) {
            return (
                <Text style={[styles.label, isFocus1 && { color: '#025492' }]}>
                    Select screen condition
                </Text>
            );
        }
        return null;
    };

    const renderLabel2 = () => {
        if (selectedValue2 || isFocus2) {
            return (
                <Text style={[styles.label, isFocus2 && { color: '#025492' }]}>
                    Select cosmetics condition
                </Text>
            );
        }
        return null;
    };

    const renderLabel3 = () => {
        if (selectedValue3 || isFocus3) {
            return (
                <Text style={[styles.label, isFocus3 && { color: '#025492' }]}>
                    Select accessories
                </Text>
            );
        }
        return null;
    };

    const renderLabel4 = () => {
        if (selectedValue4 || isFocus4) {
            return (
                <Text style={[styles.label, isFocus4 && { color: '#025492' }]}>
                   Select gadget condition
                </Text>
            );
        }
        return null;
    };

    const renderLabel5 = () => {
        if (selectedValue5 || isFocus5) {
            return (
                <Text style={[styles.label, isFocus5 && { color: '#025492' }]}>
                   Select RAM size
                </Text>
            );
        }
        return null;
    };

    const renderLabel6 = () => {
        if (selectedValue6 || isFocus6) {
            return (
                <Text style={[styles.label, isFocus6 && { color: '#025492' }]}>
                   Select ROM space
                </Text>
            );
        }
        return null;
    };

    const renderLabel7 = () => {
        if (selectedValue7 || isFocus7) {
            return (
                <Text style={[styles.label, isFocus7 && { color: '#025492' }]}>
                   Select the time usage of the product
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
                        placeholder={!isFocus1 ? 'Select screen condition' : '...'}
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
                                size={18}
                            />
                        )}
                    />
                </View>
            </View>
            <View style={styles.textInputContainer}>
                <Text style={styles.text} >Cosmetics Condition</Text>
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
                        placeholder={!isFocus2 ? 'Select cosmetics condition' : '...'}
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
                        style={[styles.dropdown, isFocus3 && { borderColor: '#025492' }]}
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
                        placeholder={!isFocus3 ? 'Select accessories' : '...'}
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
                                color={isFocus3 ? '#02549290' : '#00000090'}
                                name="Safety"
                                size={18}
                            />
                        )}
                    />
                </View>
            </View>
            <View style={styles.textInputContainer}>
                <Text style={styles.text} >Gadget Condition</Text>
                <View style={styles.container}>
                    {renderLabel4()}
                    <Dropdown
                        style={[styles.dropdown, isFocus4 && { borderColor: '#025492' }]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        itemTextStyle={styles.itemTextStyle}
                        iconStyle={styles.iconStyle}
                        data={options4}
                        search
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder={!isFocus4 ? 'Select gadget condition' : '...'}
                        searchPlaceholder="Search..."
                        value={selectedValue4}
                        onFocus={() => setIsFocus4(true)}
                        onBlur={() => setIsFocus4(false)}
                        onChange={item => {
                            setSelectedValue4(item.value);
                            setIsFocus4(false);
                        }} 
                        renderLeftIcon={() => (
                            <AntDesign
                                style={styles.icon2}
                                color={isFocus4 ? '#02549290' : '#00000090'}
                                name="Safety"
                                size={18}
                            />
                        )}
                    />
                </View>
            </View>
            <View style={styles.textInputContainer}>
                <Text style={styles.text} >RAM Size</Text>
                <View style={styles.container}>
                    {renderLabel5()}
                    <Dropdown
                        style={[styles.dropdown, isFocus5 && { borderColor: '#025492' }]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        itemTextStyle={styles.itemTextStyle}
                        iconStyle={styles.iconStyle}
                        data={options5}
                        search
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder={!isFocus5 ? 'Select RAM size' : '...'}
                        searchPlaceholder="Search..."
                        value={selectedValue5}
                        onFocus={() => setIsFocus5(true)}
                        onBlur={() => setIsFocus5(false)}
                        onChange={item => {
                            setSelectedValue5(item.value);
                            setIsFocus5(false);
                        }} 
                        renderLeftIcon={() => (
                            <AntDesign
                                style={styles.icon2}
                                color={isFocus5 ? '#02549290' : '#00000090'}
                                name="Safety"
                                size={18}
                            />
                        )}
                    />
                </View>
            </View>
            <View style={styles.textInputContainer}>
                <Text style={styles.text} >ROM Size</Text>
                <View style={styles.container}>
                    {renderLabel6()}
                    <Dropdown
                        style={[styles.dropdown, isFocus6 && { borderColor: '#025492' }]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        itemTextStyle={styles.itemTextStyle}
                        iconStyle={styles.iconStyle}
                        data={options6}
                        search
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder={!isFocus6 ? 'Select ROM space' : '...'}
                        searchPlaceholder="Search..."
                        value={selectedValue6}
                        onFocus={() => setIsFocus6(true)}
                        onBlur={() => setIsFocus6(false)}
                        onChange={item => {
                            setSelectedValue6(item.value);
                            setIsFocus6(false);
                        }} 
                        renderLeftIcon={() => (
                            <AntDesign
                                style={styles.icon2}
                                color={isFocus6 ? '#02549290' : '#00000090'}
                                name="Safety"
                                size={18}
                            />
                        )}
                        dropdownPosition='top'
                    />
                </View>
            </View>
            <View style={styles.textInputContainer2}>
                <Text style={styles.text} >Years Used</Text>
                <View style={styles.container}>
                    {renderLabel7()}
                    <Dropdown
                        style={[styles.dropdown, isFocus7 && { borderColor: '#025492' }]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        itemTextStyle={styles.itemTextStyle}
                        iconStyle={styles.iconStyle}
                        data={options7}
                        search
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder={!isFocus7 ? 'Select the time usage of the product' : '...'}
                        searchPlaceholder="Search..."
                        value={selectedValue7}
                        onFocus={() => setIsFocus7(true)}
                        onBlur={() => setIsFocus7(false)}
                        onChange={item => {
                            setSelectedValue7(item.value);
                            setIsFocus7(false);
                        }} 
                        renderLeftIcon={() => (
                            <AntDesign
                                style={styles.icon2}
                                color={isFocus7 ? '#02549290' : '#00000090'}
                                name="Safety"
                                size={18}
                            />
                        )}
                    />
                </View>
            </View>
            <TouchableOpacity style={styles.button}>
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
        fontSize: 13,
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
        marginBottom: 8.29
    },
    textInputContainer2: {
        top: 25,
        marginLeft: 20,
        marginBottom: 40.29
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
        marginBottom: 18.29
    },
    buttonText1: {
        color: "#fff",
        fontSize: 15,
        fontFamily: "roboto-condensed-sb",
    },
    container: {
        paddingVertical: 10,
        marginEnd: 16
    },
    dropdown: {
        height: 60,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
        backgroundColor: "#00000009"
    },
    icon2: {
        marginRight: 5,
        marginTop: 2,
        height: 20,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 12,
        color: "#00000050"
    },
    placeholderStyle: {
        fontSize: 12,
        color: "#00000070",
        marginVertical: 10,
        height: 20,
        top: 1.5
    },
    selectedTextStyle: {
        fontSize: 12,
        color: "#000000",
        paddingVertical: 5,
        height: 30,
        top: 1.5
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 12,
        color: "#00000090"
    },
    itemTextStyle: {
        color: "#00000070",
        fontSize: 12
    }
})