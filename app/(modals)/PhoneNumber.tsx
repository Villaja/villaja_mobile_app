import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Modal,
  Alert,
} from "react-native";
import { Svg, Path } from "react-native-svg";
import { defaultStyles } from "../../constants/Styles";
import { useRouter } from "expo-router";

const PhoneNumber = () => {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState({
    code: "+1",
    name: "United States",
    flag: "🇺🇸",
  });
  const [phoneNumber, setPhoneNumber] = useState("");

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

  return (
    <ScrollView style={styles.pagecontainer}>
      <View style={styles.textContainer}>
        <Text style={styles.enteryourphonenumber}>
          {`Enter Your Phone Number`}
        </Text>
      </View>
      <View style={styles.pic1}>
        <Image
          source={require("../../assets/images/pana.jpg")}
          resizeMode="contain"
          style={{ alignSelf: "center", marginVertical: 48, width: 136, height: 139 }}
        />
      </View>
      <View style={styles.textcont}>
        <Text style={styles.wewillsendyoua5digitOTPcodetoverify}>
          {`We Will Send You A 5 Digit OTP Code To Verify`}
        </Text>
      </View>

      {/* Phone Number Input */}

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
            <TextInput
              style={styles.textinput}
              placeholder={`Enter your phone number`}
              keyboardType="phone-pad"
              onChangeText={(text) => setPhoneNumber(text)}
              onBlur={validatePhoneNumber}
            />
          </View>
        </TouchableOpacity>
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
      <View style={styles.frame3}>
        <TouchableOpacity
          style={[defaultStyles.btn,{marginHorizontal:20,marginVertical:15,}]}
          onPress={() => router.push(`/(modals)/otp`)}
        >
          <Text style={defaultStyles.btnText}>Send</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  pagecontainer: {
    flex: 1,
    backgroundColor: "#FDFFFF",
  },
  textContainer: {
    flex: 1,
    paddingHorizontal: 50,
    left: 10,
    top: 0
  },
  enteryourphonenumber: {
    fontSize: 22,
    top: 0,
    
    color: "#025492",
    fontWeight: "700",
    lineHeight: 29.3,
    fontFamily: "Roboto",
    
  },
  pic1: {
    top: 10,
  },

  wewillsendyoua5digitOTPcodetoverify: {
    lineHeight: 17.58,
    left: 20,
    fontSize: 15,
    fontWeight: "400",
    fontFamily: "Roboto",
    color: "#00000080",
    height: 20,
    bottom: 0,
  },
  textinput: {
    width: 269,
    height: 51,
    top: 3,
    flex: 1,
    paddingHorizontal: 10,
  },
  phoneNumberInputContainer: {
    width: 259,
    right: 30,
    position: "absolute",
    left: 70,
  },
  frame99: {
    borderWidth: 1,
    width: 320,
    height: 51,
    left: 20,
    top: 0,
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
    backgroundColor: "#0254922",
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    color: "#ffffff",
  },
  send: {
    color: "ffffff"
  }
});

export default PhoneNumber;
