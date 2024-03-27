import React, { useState } from 'react'
import { ScrollView, View, Text, TextInput, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { useSeller } from '../../context/SellerContext';
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from '@expo/vector-icons/AntDesign';


const options = [
  { label: 'Brand New', value: '1' },
  { label: 'Open Box', value: '2' },
  { label: 'Refurbished', value: '3' },
  { label: 'Uk-used', value: '4' },
  { label: 'Pre-owned', value: '5' },
];

const options2 = [
  { label: 'No Faults', value: '1' },
  { label: 'Small Crack', value: '2' },
  { label: 'Minor Crack', value: '3' },
  { label: 'Huge Crack', value: '4' },
];

const options3 = [
  { label: '64GB', value: '1' },
  { label: '100GB', value: '2' },
  { label: '128GB', value: '3' },
  { label: '250GB', value: '4' },
  { label: '512GB', value: '5' },
  { label: '800GB', value: '6' },
  { label: '1TB', value: '7' },
  { label: '2TB & more', value: '8' },
];

const options4 = [
  { label: '2GB', value: '1' },
  { label: '4GB', value: '2' },
  { label: '6GB', value: '3' },
  { label: '8GB', value: '4' },
  { label: '10GB', value: '5' },
  { label: '12GB', value: '6' },
  { label: '16GB', value: '7' },
  { label: '32GB', value: '8' }
];

const options5 = [
  { label: 'LCD', value: '1' },
  { label: 'LED', value: '2' },
  { label: 'OLED', value: '3' },
  { label: 'AMOLED', value: '4' },
  { label: 'QLED', value: '5' },
  { label: 'PLASMA', value: '6' },
  { label: 'CRT', value: '7' },
  { label: 'E-ink', value: '8' },
  { label: 'Micro-LED', value: '9' },
  { label: 'Mini-LED', value: '10' },
];

const options6 = [
  { label: 'Nano Sim Factory Unlocked', value: '1' },
  { label: 'Dual Sim Factory Unlocked', value: '2' },
  { label: 'e-Sim Factory Unlocked', value: '3' },
  { label: 'Nano Sim Factory Locked', value: '4' },
  { label: 'Dual Sim Factory Locked', value: '5' },
  { label: 'e-Sim Factory Locked', value: '6' },
];

const options7 = [
  { label: 'Android OS', value: '1' },
  { label: 'IOS', value: '2' },
  { label: 'Mac OS', value: '3' },
  { label: 'Windows xp OS', value: '4' },
  { label: 'Windows Vista OS', value: '5' },
  { label: 'Windows 7 OS', value: '6' },
  { label: 'Windows 7 Professional OS', value: '7' },
  { label: 'Windows 8 OS', value: '8' },
  { label: 'Windows 10 OS', value: '9' },
  { label: 'Windows 10 Education OS', value: '10' },
  { label: 'Windows 10 Pro OS', value: '11' },
  { label: 'Windows 11 Home OS', value: '12' },
  { label: 'Windows 11 Pro OS', value: '13' },
  { label: 'Linux OS', value: '14' },
  { label: 'Chrome OS', value: '15' },
  { label: 'Ubuntu OS', value: '16' },
  { label: 'FreeDOS', value: '17' },
];

const addProducts = () => {
  const { addValue } = useSeller()
  const [brandName, setBrandName] = useState("");
  const [modelName, setModelName] = useState("");
  const [mainCamera, setMainCamera] = useState("")
  const [selectedOption1, setSelectedOption1] = useState(null);
  const [selectedOption2, setSelectedOption2] = useState(null);
  const [selectedOption3, setSelectedOption3] = useState(null);
  const [selectedOption4, setSelectedOption4] = useState(null);
  const [selectedOption5, setSelectedOption5] = useState(null);
  const [selectedOption6, setSelectedOption6] = useState(null);
  const [selectedOption7, setSelectedOption7] = useState(null);
  const [isFocus1, setIsFocus1] = useState(false);
  const [isFocus2, setIsFocus2] = useState(false);
  const [isFocus3, setIsFocus3] = useState(false);
  const [isFocus4, setIsFocus4] = useState(false);
  const [isFocus5, setIsFocus5] = useState(false);
  const [isFocus6, setIsFocus6] = useState(false);
  const [isFocus7, setIsFocus7] = useState(false);


  const renderLabel1 = () => {
    if (selectedOption1 || isFocus1) {
      return (
        <Text style={[styles.label, isFocus1 && { color: '#025492' }]}>
          Select phone condition
        </Text>
      )
    }
  };

  const renderLabel2 = () => {
    if (selectedOption2 || isFocus2) {
      return (
        <Text style={[styles.label, isFocus2 && { color: "#025492" }]}>
          Select other conditions
        </Text>
      )
    }
  };

  const renderLabel3 = () => {
    if (selectedOption3 || isFocus3) {
      return (
        <Text style={[styles.label, isFocus3 && { color: "#025492" }]}>
          Select storage size
        </Text>
      )
    }
  };

  const renderLabel4 = () => {
    if (selectedOption4 || isFocus4) {
      return (
        <Text style={[styles.label, isFocus4 && { color: "#025492" }]}>
          select RAM size
        </Text>
      )
    }
  };

  const renderLabel5 = () => {
    if (selectedOption5 || isFocus5) {
      return (
        <Text style={[styles.label, isFocus5 && { color: "#025492" }]}>
          Select screen display type
        </Text>
      )
    }
  };

  const renderLabel6 = () => {
    if (selectedOption6 || isFocus6) {
      return (
        <Text style={[styles.label, isFocus6 && { color: "#025492" }]}>
          Select sim card type and condition
        </Text>
      )
    }
  };

  const renderLabel7 = () => {
    if (selectedOption7 || isFocus7) {
      return (
        <Text style={[styles.label, isFocus7 && { color: "#025492" }]}>
          Select gadget OS
        </Text>
      )
    }
  }





  const handleScreenSubmit = () => {
    addValue({
      brandName,
      modelName,
      mainCamera,
      selectedOption1,
      selectedOption2,
      selectedOption3,
      selectedOption4,
      selectedOption5,
    })
  }



  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container} >
      <View style={styles.section2} >
        <View style={styles.inputContainer}>
          {/*Brand name input*/}
          <Text style={styles.text}>Brand Name</Text>
          <View style={styles.textInput}>
            <TextInput
              style={{ top: 12, left: 13, fontSize: 13 }}
              placeholder="Enter product brand name...."
              onChangeText={(value) => setBrandName(value)}
            />
          </View>
        </View>
        <View style={styles.inputContainer}>
          {/*Model name input*/}
          <Text style={styles.text}>Model Name</Text>
          <View style={styles.textInput}>
            <TextInput
              style={{ top: 12, left: 13, fontSize: 13 }}
              placeholder="Enter product model name...."
              onChangeText={(value) => setModelName(value)}
            />
          </View>
        </View>
        <View style={styles.inputContainer}>
          {/*phone condition input*/}
          <Text style={styles.text}>Gadget Condition</Text>
          <View style={styles.dropdownInput}>
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
              placeholder={!isFocus1 ? 'Select phone condition' : '...'}
              searchPlaceholder="Search..."
              value={selectedOption1}
              onFocus={() => setIsFocus1(true)}
              onBlur={() => setIsFocus1(false)}
              onChange={item => {
                setSelectedOption1(item.value);
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
        <View style={styles.inputContainer}>
          {/*other conditions input*/}
          <Text style={styles.text}>Other Conditions</Text>
          <View style={styles.dropdownInput}>
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
              placeholder={!isFocus2 ? 'Select other conditions' : '...'}
              searchPlaceholder="Search..."
              value={selectedOption2}
              onFocus={() => setIsFocus2(true)}
              onBlur={() => setIsFocus2(false)}
              onChange={item => {
                setSelectedOption2(item.value);
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
        <View style={styles.inputContainer}>
          {/*storage capacity input*/}
          <Text style={styles.text}>Storage Capacity</Text>
          <View style={styles.dropdownInput}>
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
              placeholder={!isFocus3 ? 'Select storage size' : '...'}
              searchPlaceholder="Search..."
              value={selectedOption3}
              onFocus={() => setIsFocus3(true)}
              onBlur={() => setIsFocus3(false)}
              onChange={item => {
                setSelectedOption3(item.value);
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
              dropdownPosition='top'
            />
          </View>
        </View>
        <View style={styles.inputContainer}>
          {/*RAM capacity input*/}
          <Text style={styles.text}>RAM Capacity</Text>
          <View style={styles.dropdownInput}>
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
              placeholder={!isFocus4 ? 'Select RAM size' : '...'}
              searchPlaceholder="Search..."
              value={selectedOption4}
              onFocus={() => setIsFocus4(true)}
              onBlur={() => setIsFocus4(false)}
              onChange={item => {
                setSelectedOption4(item.value);
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
              dropdownPosition='top'
            />
          </View>
        </View>
        <View style={styles.inputContainer}>
          {/*main camera input*/}
          <Text style={styles.text}>Main Camera</Text>
          <View style={styles.textInput}>
            <TextInput
              style={{ top: 12, left: 13, fontSize: 13 }}
              placeholder="Triple 48MP/12MP...."
              onChangeText={(value) => setMainCamera(value)}
            />
          </View>
        </View>
        <View style={styles.inputContainer}>
          {/*Resolution input*/}
          <Text style={styles.text}>Screen Resolution</Text>
          <View style={styles.textInput}>
            <TextInput
              style={{ top: 12, left: 13, fontSize: 13 }}
              placeholder="1920 X 1080...."
              onChangeText={(value) => setMainCamera(value)}
            />
          </View>
        </View>
        <View style={styles.inputContainer}>
          {/*display type input*/}
          <Text style={styles.text}>Display Type</Text>
          <View style={styles.dropdownInput}>
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
              placeholder={!isFocus5 ? 'Select screen display type' : '...'}
              searchPlaceholder="Search..."
              value={selectedOption5}
              onFocus={() => setIsFocus5(true)}
              onBlur={() => setIsFocus5(false)}
              onChange={item => {
                setSelectedOption5(item.value);
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
              dropdownPosition='top'
            />
          </View>
        </View>
        <View style={styles.inputContainer}>
          {/*sim card type input*/}
          <Text style={styles.text}>Sim Card</Text>
          <View style={styles.dropdownInput}>
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
              placeholder={!isFocus6 ? 'Select sim card type and condition' : '...'}
              searchPlaceholder="Search..."
              value={selectedOption6}
              onFocus={() => setIsFocus6(true)}
              onBlur={() => setIsFocus6(false)}
              onChange={item => {
                setSelectedOption6(item.value);
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
            />
          </View>
        </View>
        <View style={styles.inputContainer}>
          {/*OS input*/}
          <Text style={styles.text}>Operating System</Text>
          <View style={styles.dropdownInput}>
            {renderLabel7()}
            <Dropdown
              style={[styles.dropdown, isFocus7 && { borderColor: '#025492' }]}
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
              placeholder={!isFocus6 ? 'Select sim card type and condition' : '...'}
              searchPlaceholder="Search..."
              value={selectedOption6}
              onFocus={() => setIsFocus6(true)}
              onBlur={() => setIsFocus6(false)}
              onChange={item => {
                setSelectedOption6(item.value);
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
            />
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText1}>Post Ad</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

export default addProducts

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  section2: {
    flex: 1,
    top: 23,
    marginHorizontal: 20,
    marginBottom: 100
  },
  inputContainer: {
    left: 5,
    height: 80,
    position: "relative",
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
    borderColor: "gray",
    borderRadius: 8,
    backgroundColor: "#00000009",
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
  dropdown: {
    height: 60,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: "#00000009"
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
  inputSearchStyle: {
    height: 40,
    fontSize: 12,
    color: "#00000090"
  },
  itemTextStyle: {
    color: "#00000070",
    fontSize: 12
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  icon2: {
    marginRight: 5,
    marginTop: 2,
    height: 20,
  },
  dropdownInput: {
    paddingVertical: 10,
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
})