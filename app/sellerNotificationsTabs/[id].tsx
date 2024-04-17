import React from 'react'
import { Platform, SafeAreaView, StyleSheet, Text, View , TouchableOpacity,Image} from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import Colors from '../../constants/Colors'

const Chat = () => {
  const {id} = useLocalSearchParams()
  return (
    <SafeAreaView style={styles.container}>
      <View style={Platform.OS === "android" ? {flex:1,paddingTop:40}:{flex:1}} >

        <View style={styles.chatHeader}>
          <TouchableOpacity>
            <Ionicons name='arrow-back-sharp' size={25} color={"#000"} />
          </TouchableOpacity>
          <View style={styles.userInfo}>
            <Image source={require("../../assets/images/user2.png")} style={styles.userInfoImg} resizeMode='contain'/>
            <Text style={styles.userInfoText}>Lynn Tanner</Text>
          </View>
        </View>
        <Text>{id}</Text>
      </View>
    </SafeAreaView>
  )
}

export default Chat

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff'
    },
    chatHeader:{
      flexDirection:'row',
      alignItems:'center',
      gap:20,
      paddingHorizontal:20,
      paddingVertical:8
    },
    userInfoImg:{
      width:40,
      height:40
    },
    userInfo:{
      flexDirection:'row',
      gap:8
    },
    userInfoText:{
      fontSize:20,
      fontFamily:'roboto-condensed-m',
      color:Colors.primary
    },
})