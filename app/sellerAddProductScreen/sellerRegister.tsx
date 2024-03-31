import React, { useState } from 'react';
import { View, ScrollView, Text, StyleSheet, TextInput } from "react-native";
import { Dropdown } from 'react-native-element-dropdown';

const data = [
  { label: 'Abia State', value: '1' },
  { label: 'Adamawa State', value: '2' },
  { label: 'Akwa Ibom State', value: '3' },
  { label: 'Anambra State', value: '4' },
  { label: 'Bauchi State', value: '5' },
  { label: 'Bayelsa State', value: '6' },
  { label: 'Benue State', value: '7' },
  { label: 'Borno State', value: '8' },
  { label: 'Cross River State', value: '9' },
  { label: 'Delta State', value: '10' },
  { label: 'Ebonyi State', value: '11' },
  { label: 'Edo State', value: '12' },
  { label: 'Ekiti State', value: '13' },
  { label: 'Enugu State', value: '14' },
  { label: 'Gombe State', value: '15' },
  { label: 'Imo State', value: '16' },
  { label: 'Jigawa State', value: '17' },
  { label: 'Kaduna State', value: '18' },
  { label: 'Kano State', value: '19' },
  { label: 'Katsina State', value: '20' },
  { label: 'Kebbi State', value: '21' },
  { label: 'Kogi State', value: '22' },
  { label: 'Kwara State', value: '23' },
  { label: 'Lagos State', value: '24' },
  { label: 'Nasarawa State', value: '25' },
  { label: 'Niger State', value: '26' },
  { label: 'Ogun State', value: '27' },
  { label: 'Ondo State', value: '28' },
  { label: 'Osun State', value: '29' },
  { label: 'Oyo State', value: '30' },
  { label: 'Plateau State', value: '31' },
  { label: 'Rivers State', value: '32' },
  { label: 'Sokoto State', value: '33' },
  { label: 'Taraba State', value: '34' },
  { label: 'Yobe State', value: '35' },
  { label: 'Zamfara State', value: '36' },
];

const sellerRegister = () => {
  const [shopName, setShopName] = useState("");
  const [handler, setHandler] = useState("");
  const [handlerPhoneNumber, setHandlerPhoneNumber] = useState("");
  const [shopEmailAddress, setShopEmailAddress] = useState("");
  const [shopAddress, setShopAddress] = useState("")
  const [addressState, setAddressState] = useState(null);
  const [zipCode, setZipCode] = useState("")


  const renderStates = (item) => {
    return (
      <View style={styles.item} >
        <Text style={styles.textItem} >{item.label}</Text>
      </View>
    )
  };


  return (
    <ScrollView style={styles.container}>
      <View style={{ marginHorizontal: 20, marginTop: 10 }}>
        <Text style={{ fontSize: 29, fontStyle: "italic", fontWeight: "700", color: "#025492" }} >Let's Get Started</Text>
        <Text style={{ fontSize: 13, color: "#00000040", fontWeight: "400" }} >You are welcome to villaja verified merchant centre. Please fill in your shop details</Text>
      </View>
      <View style={styles.section2} >
        <View style={styles.inputContainer}>
          {/*Shop name input*/}
          <Text style={styles.text}>Shop Name</Text>
          <View style={styles.textInput}>
            <TextInput
              style={{ top: 12, left: 13, fontSize: 13 }}
              placeholder="Enter your shop name...."
              onChangeText={(value) => setShopName(value)}
            />
          </View>
        </View>
        <View style={styles.inputContainer}>
          {/*Account handler full name input*/}
          <Text style={styles.text}>Account Handler Full Name</Text>
          <View style={styles.textInput}>
            <TextInput
              style={{ top: 12, left: 13, fontSize: 13 }}
              placeholder="Enter your full name...."
              onChangeText={(value) => setHandler(value)}
            />
          </View>
        </View>
        <View style={styles.inputContainer}>
          {/*Account handler phone number input*/}
          <Text style={styles.text}>Account Handler Phone Number</Text>
          <View style={styles.textInput}>
            <TextInput
              style={{ top: 12, left: 13, fontSize: 13 }}
              placeholder="Enter your phone number...."
              onChangeText={(value) => setHandlerPhoneNumber(value)}
              keyboardType="number-pad"
            />
          </View>
        </View>
        <View style={styles.inputContainer}>
          {/*e-mail address input*/}
          <Text style={styles.text}>E-mail Address</Text>
          <View style={styles.textInput}>
            <TextInput
              style={{ top: 12, left: 13, fontSize: 13 }}
              placeholder="Enter your e-mail address...."
              onChangeText={(value) => setShopEmailAddress(value)}
            />
          </View>
        </View>
        <View style={styles.inputContainer}>
          {/*shop address input*/}
          <Text style={styles.text}>Shop Address</Text>
          <View style={styles.textInput}>
            <TextInput
              style={{ top: 12, left: 13, fontSize: 13 }}
              placeholder="Enter your shop address...."
              onChangeText={(value) => setShopAddress(value)}
            />
          </View>
        </View>
        <View style={styles.inputContainer}>
          {/*Address State input*/}
          <Text style={styles.text}>Shop Address State</Text>
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={data}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="Select your shop state"
              searchPlaceholder="Search..."
              value={addressState}
              onChange={item => {
                setAddressState(item.value);
              }}
              renderItem={renderStates}
            />
          </View>
          <View style={styles.inputContainer}>
          {/*Zip Code input*/}
          <Text style={styles.text}>Zip Code</Text>
          <View style={styles.textInput}>
            <TextInput
              style={{ top: 12, left: 13, fontSize: 13 }}
              placeholder="Enter your address zip code...."
              onChangeText={(value) => setZipCode(value)}
              keyboardType= "number-pad"
            />
          </View>
        </View>
        </View>
    </ScrollView>
  )
}

export default sellerRegister

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff"
  },
  section2: {
    flex: 1,
    top: 23,
    marginHorizontal: 20,
    marginBottom: 80
  },
  inputContainer: {
    height: 80,
    marginBottom: 12
  },
  text: {
    fontSize: 13,
    color: "#00000090",
    fontWeight: "500"
  },
  textInput: {
    borderWidth: 0.5,
    width: 320,
    height: 60,
    top: 5,
    borderColor: "#0000001A",
    borderRadius: 8,
    backgroundColor: "#00000005",
  },
  dropdown: {
    top: 5,
    height: 60,
    width: 320,
    backgroundColor: '#00000005',
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: "#0000001A",
    padding: 12,
  },
  item: {
    padding: 13,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textItem: {
    flex: 1,
    fontSize: 13,
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
})