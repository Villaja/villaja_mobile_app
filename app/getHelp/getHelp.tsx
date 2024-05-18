import React from 'react'
import { ScrollView, View, Image, Text} from "react-native";

const getHelp = () => {
    return (
        <View style={{flex: 1, backgroundColor: "#ffffff"}} >
            <View style={{width: 250, height: 160, top: 30, marginHorizontal: 55, justifyContent: "center", alignItems: "center"}}>
                <Image source={require('../../assets/images/headphone.png')} style={{ height: 58, width: 58 }} />
                <Text style={{fontSize: 25, textAlign: "center", color: "#00000090", fontWeight: "500", marginVertical: 21}} >Hello, How can we help you?</Text>
            </View>
            <View style={{marginVertical: 90, marginHorizontal: 25, flexDirection: "row", alignItems: "center"}} >
                <Text style={{fontSize: 12, color: "#00000040", fontWeight: "500"}} >Customer care will be available from</Text>
                <Text style={{fontSize: 12, color: "#000000", fontWeight: "500"}} > 8:00AM</Text>
                <Text style={{fontSize: 12, color: "#00000040", fontWeight: "500"}} > to </Text>
                <Text style={{fontSize: 12, color: "#000000", fontWeight: "500"}} >6:00PM</Text>
            </View>
            <View style={{marginHorizontal: 40, alignItems: "center"}} >
                <Text style={{fontSize: 12, color: "#00000040", fontWeight: "500", marginBottom: 23}}>Send a mail to us for any complaints</Text>
                <Text style={{fontSize: 14, color: "#025492", fontWeight: "700"}}>villajahelpteam@gmail.com</Text>
            </View>
        </View>
    )
}

export default getHelp