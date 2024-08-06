import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Dimensions, TextInput, ActivityIndicator, Alert } from 'react-native';
import Colors from "../../constants/Colors";
// import DataTable , { COL_TYPES } from 'react-native-datatable-component';
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from 'expo-router';
import axios from 'axios';
import { base_url } from "../../constants/server";

const data = [
  { name: 'Muhammad Rafeh', age: 21, gender: 'male', select: false },
  { name: 'Muhammad Akif', age: 22, gender: 'male', select: false },
  { name: 'Muhammad Umar', age: 21, gender: 'male', select: false },
  { name: 'Amna Shakeel', age: 22, gender: 'female', select: false },
  { name: 'Muhammad Ammar', age: 20, gender: 'male', select: false },
  { name: 'Muhammad Ammar', age: 20, gender: 'male', select: false },
  { name: 'Muhammad Ammar', age: 20, gender: 'male', select: false },
  { name: 'Muhammad Ammar', age: 20, gender: 'male', select: false },
  { name: 'Muhammad Ammar', age: 20, gender: 'male', select: false },
  { name: 'Muhammad Ammar', age: 20, gender: 'male', select: false },
  { name: 'Muhammad Ammar', age: 20, gender: 'male', select: false },
  { name: 'Muhammad Ammar', age: 20, gender: 'male', select: false },
  { name: 'Muhammad Ammar', age: 20, gender: 'male', select: false },
  { name: 'Muhammad Ammar', age: 20, gender: 'male', select: false },
  { name: 'Muhammad Ammar', age: 20, gender: 'male', select: false },
  { name: 'Muhammad Ammar', age: 20, gender: 'male', select: false },
  { name: 'Muhammad Ammar', age: 20, gender: 'male', select: false },
  { name: 'Muhammad Ammar', age: 20, gender: 'male', select: false },
  { name: 'Muhammad Ammar', age: 20, gender: 'male', select: false },
  { name: 'Muhammad Ammar', age: 20, gender: 'male', select: false },
  { name: 'Muhammad Ammar', age: 20, gender: 'male', select: false },
  { name: 'Muhammad Ammar', age: 20, gender: 'male', select: false },
  { name: 'Muhammad Ammar', age: 20, gender: 'male', select: false },
  { name: 'Muhammad Ammar', age: 20, gender: 'male', select: false },
  { name: 'Muhammad Ammar', age: 20, gender: 'male', select: false },
  { name: 'Muhammad Ammar', age: 20, gender: 'male', select: false },
  { name: 'Muhammad Ammar', age: 20, gender: 'male', select: false },
  { name: 'Muhammad Ammar', age: 20, gender: 'male', select: false },
  { name: 'Muhammad Ammar', age: 20, gender: 'male', select: false },
  { name: 'Muhammad Moiz', age: 13, gender: 'male', select: false }
]

const { width, height } = Dimensions.get("window")

export default function Transactions() {
  //const [page, setPage] = useState<number>(0);
  //const [numberOfItemsPerPageList] = useState([2, 3, 4]);
  const [seller, setSeller] = useState<any>([]);
  //const [token, setToken] = useState<string>();
  const [bankAccountButtonStatus, setBankAccountButtonStatus] = useState(false);
  const [isBankAccountAvailable, setIsBankAccountAvailable] = useState(false);
  //const [isLoading, setIsLoading] = useState(true);
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const [positiveWithdrawRequest, setPositiveWithdrawRequest] = useState(false)
  const [bankInfo, setBankInfo] = useState({
    bankName: "",
    bankCountry: "",
    bankAccountNumber: "",
    bankHolderName: "",
    shopAddress: "",
    bankSwiftCode: 10002
  });

  const { width, height } = Dimensions.get("window")
  const withdrawableBalance = seller?.availableBalance?.toLocaleString() || 0;
  const cashOutBalance = seller?.availableBalance || 0

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem('sellerToken');
        const response = await axios.get(`${base_url}/shop/getSeller`, {
          headers: {
            Authorization: token
          }
        })

        if (!token) {
          router.replace('/sellerAuthScreens/SellerLogin');
          return
        };
        setSeller(response.data.seller);
      } catch (error) {
        console.log("Error fetching seller details", error)
      }
    }

    checkToken();
  }, [isBankAccountAvailable, positiveWithdrawRequest]);

  useEffect(() => {
    const fetchBankDetails = () => {
      if (seller?.withdrawMethod) {
        setIsBankAccountAvailable(true);
      } else {
        setIsBankAccountAvailable(false)
      }
    }

    fetchBankDetails();
  }, [seller.withdrawMethod]);


  const handleDeleteBankAccount = async () => {
    const token = await AsyncStorage.getItem('sellerToken');

    try {
      const response = await axios.delete(`${base_url}/shop/delete-withdraw-method`, {
        withCredentials: true,
        headers: {
          Authorization: token,
        },
      });

      if (response.data.success) {
        Alert.alert("Deleted", "Withdrawal method deleted successfully");
        setIsBankAccountAvailable(false)
      };

    } catch (error) {
      console.log("error deleting withdrawal method", error)
    }
  };


  const sendSellerBankAccountDetails = async () => {
    const token = await AsyncStorage.getItem('sellerToken');

    try {
      const withdrawMethod = {
        bankName: bankInfo.bankName,
        bankCountry: bankInfo.bankCountry,
        bankSwiftCode: bankInfo.bankSwiftCode,
        bankAccountNumber: bankInfo.bankAccountNumber,
        bankHolderName: bankInfo.bankHolderName,
        bankAddress: bankInfo.shopAddress,
      }
      const response = await axios.put(`${base_url}/shop/update-payment-methods`,
        {
          withdrawMethod
        },
        {
          withCredentials: true,
          headers: {
            Authorization: token,
          },
        });

      if (response.data.success) {
        Alert.alert("Success", "Bank Account details added");
        setIsBankAccountAvailable(true);
        setBankAccountButtonStatus(false);
      } else {
        console.log("error updating bank details");
        Alert.alert("Error", "update failed")
      };

    } catch (error) {
      console.log("Error uploading bank account details", error);
      Alert.alert("Error", `Error uploading bank account details: ${error}`)
    }
  };



  const handleCashOut = async () => {
    try {
      if (withdrawAmount === 0) {
        Alert.alert("Warning", "Please enter an amount to withdraw")
      } else if (withdrawAmount < 200) {
        Alert.alert("Unauthorized", "You can only withdraw ₦200 and above")
      } else if (cashOutBalance < withdrawAmount) {
        Alert.alert("Unauthorized", "Insufficient funds!!!!")
      } else {
        const amount = withdrawAmount;
        const token = await AsyncStorage.getItem('sellerToken');

        const response = await axios.post(`${base_url}/withdraw/create-withdraw-request`, 
          {
            amount
          },
          {
            withCredentials: true,
            headers: {
              Authorization: token
            },
          },
        )

        if (response.data.success) {
          Alert.alert("Success", "Withdrawal request successful and transfer is in processing and will be successful in 24 hours, if after 24 hours no transfer is received, please reach out to our help team.");
          setPositiveWithdrawRequest(true)
        } else {
          console.log(`Withdrawal failed ${response.data.error}`)
        }
      }
    } catch (error) {
      Alert.alert('Error', 'error sending withdrawal request');
    }
  };

  console.log(withdrawAmount)
  console.log(cashOutBalance)
  console.log(seller)

  return (
    <View style={styles.container}>
      <View style={{ marginHorizontal: 20 }}>
        <View style={{ backgroundColor: "#ffffff", width: width - 40, marginTop: 30, justifyContent: 'center', alignItems: 'center', height: 200 }} >
          <Text style={{ fontSize: 30, marginTop: 21, letterSpacing: 0.18, color: "#000000", fontWeight: "500" }} >₦{withdrawableBalance}</Text>
          <Text style={{ fontSize: 15, color: "#00000030", fontFamily: "roboto-condensed", marginTop: 10, marginBottom: 24 }} >My Balance</Text>
          <TouchableOpacity style={{ backgroundColor: "#025492", width: "90%", flexDirection: "row", height: 45, justifyContent: "center", alignItems: "center", borderRadius: 10, gap: 10, marginBottom: 30 }} >
            <Text style={{ fontSize: 15, color: "#ffffff", fontFamily: "roboto-condensed-m" }} >Withdraw</Text>
            <Ionicons name='cash-outline' size={24} color="#ffffff" />
          </TouchableOpacity>
        </View>
        <View style={{ backgroundColor: "#ffffff", width: width - 40, marginTop: 30, marginBottom: height / 1 / 18 }} >
          {
            seller.withdrawMethod !== null && isBankAccountAvailable ? (
              <View style={{ margin: 20 }} >
                <Text style={{ color: "#000000", fontSize: 16 }} >Available Withdrawal Methods</Text>
                <Text style={{ color: "#00000099", fontSize: 13, marginTop: 10 }} >Account number: {seller?.withdrawMethod?.bankAccountNumber}</Text>
                <Text style={{ color: "#00000099", fontSize: 13 }} >Bank Name: {seller?.withdrawMethod?.bankName}</Text>
                <Text style={{ color: "#00000099", fontSize: 13, marginTop: 30 }} >Available Balance: <Text style={{ color: "#00000099", fontSize: 13, marginTop: 30, fontWeight: "500" }} >{withdrawableBalance}</Text></Text>
                <TouchableOpacity style={{ position: "absolute", right: 0, top: 40 }} onPress={handleDeleteBankAccount}>
                  <Ionicons name='trash-outline' size={22} color="red" />
                </TouchableOpacity>
                <View style={{ marginTop: 50, marginBottom: 25, flexDirection: "row", gap: 20 }} >
                  <TextInput value={withdrawAmount === 0 ? "" : withdrawAmount.toString()} onChangeText={(value) => setWithdrawAmount(isNaN(parseFloat(value)) ? 0 : parseFloat(value))} placeholder='Cashout Amount' keyboardType='number-pad' style={{ borderWidth: 1, borderColor: "#00000050", borderRadius: 5, height: 40, width: 180, padding: 0, paddingHorizontal: 10 }} />
                  <TouchableOpacity onPress={handleCashOut} style={{ backgroundColor: "#025492", height: 40, paddingHorizontal: 12, justifyContent: "center", alignItems: "center", borderRadius: 5 }} >
                    <Text style={{ color: "#ffffff", fontSize: 13 }} >Cash Out</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <View style={[bankAccountButtonStatus ? { margin: 20 } : { margin: 20, justifyContent: "center", alignItems: "center" }]}>
                {bankAccountButtonStatus ? (
                  <View>
                    <View style={{ marginBottom: 10 }} >
                      <Text style={{ marginBottom: 5, color: "#00000099", fontWeight: "500", fontSize: 13 }} >Bank Name</Text>
                      <TextInput value={bankInfo.bankName} onChangeText={(bankName) => setBankInfo({ ...bankInfo, bankName })} placeholder='Enter your bank name!' style={{ borderWidth: 1, borderColor: "#00000050", borderRadius: 5, height: 50, width: "100%", padding: 0, paddingHorizontal: 10 }} />
                    </View>
                    <View style={{ marginBottom: 10 }} >
                      <Text style={{ marginBottom: 5, color: "#00000099", fontWeight: "500", fontSize: 13 }} >Bank Country</Text>
                      <TextInput value={bankInfo.bankCountry} onChangeText={(bankCountry) => setBankInfo({ ...bankInfo, bankCountry })} placeholder='Enter your bank country!' style={{ borderWidth: 1, borderColor: "#00000050", borderRadius: 5, height: 50, width: "100%", padding: 0, paddingHorizontal: 10 }} />
                    </View>
                    <View style={{ marginBottom: 10 }} >
                      <Text style={{ marginBottom: 5, color: "#00000099", fontWeight: "500", fontSize: 13 }} >Bank Account Number</Text>
                      <TextInput value={bankInfo.bankAccountNumber} onChangeText={(bankAccountNumber) => setBankInfo({ ...bankInfo, bankAccountNumber })} placeholder='Enter your bank account number!' keyboardType='number-pad' style={{ borderWidth: 1, borderColor: "#00000050", borderRadius: 5, height: 50, width: "100%", padding: 0, paddingHorizontal: 10 }} />
                    </View>
                    <View style={{ marginBottom: 10 }} >
                      <Text style={{ marginBottom: 5, color: "#00000099", fontWeight: "500", fontSize: 13 }} >Bank Holder Name</Text>
                      <TextInput value={bankInfo.bankHolderName} onChangeText={(bankHolderName) => setBankInfo({ ...bankInfo, bankHolderName })} placeholder='Enter your bank holder name!' style={{ borderWidth: 1, borderColor: "#00000050", borderRadius: 5, height: 50, width: "100%", padding: 0, paddingHorizontal: 10 }} />
                    </View>
                    <View style={{ marginBottom: 10 }} >
                      <Text style={{ marginBottom: 5, color: "#00000099", fontWeight: "500", fontSize: 13 }} >Shop Address</Text>
                      <TextInput value={bankInfo.shopAddress} onChangeText={(shopAddress) => setBankInfo({ ...bankInfo, shopAddress })} placeholder='Enter your shop address!' style={{ borderWidth: 1, borderColor: "#00000050", borderRadius: 5, height: 50, width: "100%", padding: 0, paddingHorizontal: 10 }} />
                    </View>
                    <TouchableOpacity style={{ backgroundColor: "#025492", width: "100%", paddingVertical: 14, justifyContent: "center", alignItems: "center", borderRadius: 10, marginTop: 20 }} onPress={sendSellerBankAccountDetails} >
                      <Text style={{ color: "#ffffff", fontFamily: "roboto-condensed-m" }} > Add Account</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View style={{ justifyContent: "center", height: 200, alignItems: "center" }}>
                    <Text style={{ color: "#000000", fontSize: 16 }} >Available Withdrawal Methods</Text>
                    <Text style={{ color: "#00000099", fontSize: 13, marginTop: 10 }} >No Bank account available!</Text>
                    <TouchableOpacity style={{ backgroundColor: "#025492", marginTop: 30, paddingVertical: 12, paddingHorizontal: 20, borderRadius: 5 }} >
                      <Text style={{ color: "#ffffff", fontFamily: "roboto-condensed-m", fontSize: 13 }} onPress={() => setBankAccountButtonStatus(!bankAccountButtonStatus)} >Add Bank Account</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            )
          }
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primaryTransparent,
  }
})