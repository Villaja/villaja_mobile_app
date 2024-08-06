import { View, Text, Modal, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'

const TermsAndCondition = ({visible, onClose}) => {
    return (
        <Modal transparent={true} visible={visible} animationType='slide' onRequestClose={onClose} >
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" }} >
                <View style={{ backgroundColor: "#ffffff", paddingHorizontal: 15, paddingVertical: 15, alignItems: "center", shadowColor: "#000", shadowRadius: 4, margin: 20, borderRadius: 10, height: 500 }} >
                    <ScrollView showsVerticalScrollIndicator={false} >
                        <Text style={{fontWeight: "700", fontSize: 15}} >TERMS AND CONDITIONS FOR VILLAJA MOBILE APP USAGE</Text>
                        <Text style={{fontWeight: "700", fontSize: 14, marginTop: 10, width: 200}} >Terms and Conditions for The Using Villaja Mobile App</Text>
                        <Text style={{fontWeight: "700", fontSize: 14, marginTop: 5}} >Effective Date: [8th of November 2023]</Text>
                        <Text style={{fontSize: 14, marginTop: 30, textAlign: 'left'}} >Please read these Terms and Conditions ("Terms") carefully before using Villaja Mobile App. These Terms govern your use of the app and your interactions with the app's services, including, but not limited to, buying and selling products. By using the app, you agree to comply with and be bound by these Terms.</Text>
                        <Text style={{fontWeight: "500", fontSize: 14, marginTop: 20}} >1. Acceptance of Terms</Text>
                        <Text style={{fontSize: 14}} >By using the app, you acknowledge that you have read and understood these Terms and agree to abide by them. If you do not agree with these Terms, please do not use the app.</Text>
                        <Text style={{fontWeight: "500", fontSize: 14, marginTop: 20}} >2. Registration and User Accounts</Text>
                        <Text style={{fontSize: 14}} ><Text style={{fontWeight: "500", fontSize: 14}} >2.1.</Text> You may be required to create a user account to access certain features of the Website. When creating your user account, you agree to provide accurate and up-to-date information. You are responsible for maintaining the confidentiality of your account information and are fully responsible for any activities that occur under your account.</Text>
                        <Text style={{fontSize: 14}} ><Text style={{fontWeight: "500", fontSize: 14}} >2.2.</Text> You must be at least 18 years old or the legal age of majority in your jurisdiction to use the Website. By using the Website, you represent that you meet this requirement.</Text>
                        <Text style={{fontWeight: "500", fontSize: 14, marginTop: 20}} >3. Seller Responsibilities</Text>
                        <Text style={{fontSize: 14}} ><Text style={{fontWeight: "500", fontSize: 14}} >3.1.</Text> If you are a seller on the app, you agree to provide accurate and truthful information about the products you list for sale.</Text>
                        <Text style={{fontSize: 14, marginTop: 5}} ><Text style={{fontWeight: "500", fontSize: 14}} >3.2.</Text> <Text style={{fontWeight: "500", fontSize: 14}} >Serial Numbers:</Text> Sellers are required to input the serial number of the products they want to upload to the Website. This serial number will not be visible to the general public on the app, but it will be stored securely with Villaja for verification purposes.</Text>
                        <Text style={{fontSize: 14, marginTop: 5}} ><Text style={{fontWeight: "500", fontSize: 14}} >3.3.</Text> <Text style={{fontWeight: "500", fontSize: 14}} >Originality of Products:</Text> The serial numbers will be used in the event of a customer disputing the originality a the product. Sellers agree to cooperate with Villaja and provide necessary information, including the originality and authenticity of the product, to resolve any such disputes.</Text>
                        <Text style={{fontSize: 14, marginTop: 5}} ><Text style={{fontWeight: "500", fontSize: 14}} >3.4.</Text> <Text style={{fontWeight: "500", fontSize: 14}} >Prohibited Items:</Text> Sellers are prohibited from listing counterfeit, stolen, or products considered illegal by the constitution of the <Text style={{fontWeight: '500'}} >Federal Republic of Nigeria</Text> on the Website.</Text>
                        <Text style={{fontWeight: "500", fontSize: 14, marginTop: 20}} >4. Buyer Responsibilities</Text>
                        <Text style={{fontSize: 14}} ><Text style={{fontWeight: "500", fontSize: 14}} >4.1.</Text> Buyers are responsible for reviewing product listings, descriptions, and seller information before making a purchase.</Text>
                        <Text style={{fontSize: 14,  marginTop: 5}} ><Text style={{fontWeight: "500", fontSize: 14}} >4.2.</Text> In the event of a dispute regarding the originality or authenticity of a product, buyers may contact the Villaja's customer support <Text style={{fontWeight: '500'}} >(villajahelpteam@gmail.com)</Text> for assistance, providing any necessary information and evidence.</Text>
                        <Text style={{fontWeight: "500", fontSize: 14, marginTop: 20}} >5. Privacy</Text>
                        <Text style={{fontSize: 14}} >Your use of Villaja mobile app is also governed by our Privacy Policy, check it out on our website, <Text style={{fontWeight: '500'}} >wwww.villaja.com</Text>.</Text>
                        <Text style={{fontWeight: "500", fontSize: 14, marginTop: 20}} >6. Termination</Text>
                        <Text style={{fontSize: 14}} >We reserve the right to terminate or suspend your account or access to the Website and mobile app, with notice, for any reason, including if you violate these Terms or fraudulent activities have been found in the usage of your account or in association with any fraudulent activities.</Text>
                        <Text style={{fontWeight: "500", fontSize: 14, marginTop: 20}} >7. Changes to Terms</Text>
                        <Text style={{fontSize: 14}} >We reserve the right to update or change these Terms at any time. Any changes to these Terms will be posted on the Website and mobile app with the effective date. Your continued use of the mobile app after any changes constitute your acceptance of the new Terms.</Text>
                        <Text style={{fontWeight: "500", fontSize: 14, marginTop: 20}} >8. Limitation of Liability</Text>
                        <Text style={{fontSize: 14}} >To the fullest extent permitted by law, we shall not be liable for any direct, indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly by you.</Text>
                        <Text style={{fontWeight: "500", fontSize: 14, marginTop: 20}} >9. Governing Law</Text>
                        <Text style={{fontSize: 14}} >These Terms shall be governed by and construed in accordance with the laws of the <Text style={{fontWeight: '500'}} >Federal Republic of Nigeria</Text>, without regard to its conflict of law principles.</Text>
                        <Text style={{fontWeight: "500", fontSize: 14, marginTop: 20}} >10. Contact Information</Text>
                        <Text style={{fontSize: 14}} >For any questions or concerns regarding these Terms, please contact us at any of our emails; <Text style={{fontWeight: '500'}} >villajamarketplace@gmail.com, villajahelpteam@gmail.com</Text> or on Instagram; <Text style={{fontWeight: '500'}} >@villajatech</Text>.</Text>
                        <TouchableOpacity onPress={onClose} style={{marginTop: 30, backgroundColor: "#025492", width: "100%", justifyContent: 'center', alignItems: 'center', paddingVertical: 15, borderRadius: 10, marginBottom: 10}} >
                            <Text style={{color: "#ffffff", fontFamily: "roboto-condensed-sb"}} >Finished Reading</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </View>
        </Modal>
    )
}

export default TermsAndCondition