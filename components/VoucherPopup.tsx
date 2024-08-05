import { View, Text, Modal, TouchableOpacity } from 'react-native'
import React from 'react'
import LottieView from "lottie-react-native";

const VoucherPopup = ({ visible, onClose, route }) => {
    return (
        <View>
            <Modal transparent={true} visible={visible} animationType='slide' onRequestClose={onClose} >
                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" }} onStartShouldSetResponder={onClose} >
                    <View style={{ backgroundColor: "#ffffff", paddingHorizontal: 35, paddingBottom: 35, alignItems: "center", shadowColor: "#000", shadowRadius: 4, margin: 20, borderRadius: 10}} >
                        <View><LottieView source={require("../assets/images/Animation - 1722110394474 (1).json")} style={{width: 200, height: 200}} autoPlay loop={false} /></View>
                        <Text style={{fontSize: 20, fontWeight: "500", color: "#00000099", marginBottom: 10}} >Congratulations!</Text>
                        <Text style={{textAlign: "center", marginBottom: 35, color: "#00000099"}} >You've won ₦10,000 on your first order. Valid for 12 hours</Text>
                        <TouchableOpacity onPress={route}  style={{backgroundColor: "#025492", paddingVertical: 13, paddingHorizontal: 40, borderRadius: 5}}>
                            <Text style={{color: "#ffffff"}} >Claim Now</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default VoucherPopup