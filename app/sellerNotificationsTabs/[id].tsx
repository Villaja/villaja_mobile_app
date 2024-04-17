import React, { useEffect, useRef, useState } from 'react'
import { Platform, SafeAreaView, StyleSheet, Text, View , TouchableOpacity,Image, ScrollView, ScrollViewComponent, KeyboardAvoidingView, TextInput} from 'react-native'
import { router, useLocalSearchParams } from 'expo-router'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import Colors from '../../constants/Colors'
import axios from 'axios'
import { base_url } from '../../constants/server'
import AsyncStorage from '@react-native-async-storage/async-storage'
import moment from 'moment'

interface Conversation {
    _id: string,
    groupTitle: string,
    members: Array<string>,
    createdAt: any,
    updatedAt: Date,
    lastMessage: string,
    lastMessageId: string
}


const Chat = () => {
  const {id,userName} = useLocalSearchParams()
  const [conversation,setConversation] = useState<Conversation | null>(null)
  const [messages,setMessages] = useState<any>([])
  const [newMessage,setNewMessage] = useState<string>("")
  const [sellerId,setSellerId] = useState<string>("")
  const scrollRef = useRef<any>(null)

  const updateLastMessage = async () => {
    

    await axios
      .put(`${base_url}/conversation/update-last-message/${id}`, {
        lastMessage: newMessage,
        lastMessageId: sellerId,
      })
      .then((res) => {
        setNewMessage("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const sendMessageHandler = async () => {

    const message = {
      sender: sellerId,
      text: newMessage,
      conversationId: id,
    };

    try {
      if (newMessage !== "") {
        await axios
          .post(`${base_url}/message/create-new-message`, message)
          .then((res) => {
            setMessages([...messages, res.data.message]);
            updateLastMessage();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getMessage = async () => {

      try {
        const seller = await AsyncStorage.getItem('seller')
        setSellerId(JSON.parse(seller!)?.seller._id)
        const response = await axios.get(
          `${base_url}/message/get-all-messages/${id}`
        );
        setMessages(response.data.messages);
      } catch (error) {
        console.log(error);
      }
    };
    getMessage();
  },[id])

  useEffect(() => {
    const getConversation  = async () => {

      try
      {
        const token  = await AsyncStorage.getItem('sellerToken')
        const response = await axios.get(`${base_url}/conversation/get-conversation/${id}`,
          {
                        headers: {
                            Authorization: token 
                        },
                        withCredentials: true 
                    }
        )
        setConversation(response.data.conversation)
      }
      catch(err)
      {
        console.log("error retrieving conversation",err);
        
      }

    }
  }, [id])


  return (
    <SafeAreaView style={styles.container}>
      <View style={Platform.OS === "android" ? {flex:1,paddingTop:40}:{flex:1}} >

        <View style={styles.chatHeader}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name='arrow-back-sharp' size={25} color={"#000"} />
          </TouchableOpacity>
          <View style={styles.userInfo}>
            <Image source={require("../../assets/images/user2.png")} style={styles.userInfoImg} resizeMode='contain'/>
            <Text style={styles.userInfoText}>{userName}</Text>
          </View>
        </View>

        <ScrollView   ref={scrollRef} showsVerticalScrollIndicator={false} contentContainerStyle={{
        paddingBottom:20
      }} style={styles.messageBox}>
        {
          messages?
            messages.map((msg:any) => 
      
              (
                msg.sender != sellerId ?
                
                  <View key={msg._id} style={[styles.messageBubble]}>
                    {msg.text && <Text style={styles.msgText} >{msg.text}</Text> }
                    {msg.images && <Image source={{uri:msg.images.url}} resizeMode='cover' style={styles.messageImage} />}
                    <Text style={styles.date} >{moment(msg.createdAt).fromNow()}</Text>

                  </View>
                
                :
                <View key={msg._id} style={[styles.messageBubbleUser]}>
                    <Text style={styles.msgTextUser} >{msg.text}</Text>
                    <Text style={styles.date} >{moment(msg.createdAt).fromNow()}</Text>
                  </View>
                

              )
            
            )

          :
          null
        }
      </ScrollView>
      <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.select({ios: 70, android: 0})}
      >

      <View style={[styles.messageInputBox]}>
        <TextInput placeholder='' style={styles.messageInput} onChangeText={(text) => setNewMessage(text) } value={newMessage}/>
        <TouchableOpacity onPress={() => sendMessageHandler()}>
          <MaterialCommunityIcons name='send-circle' size={40} color={Colors.primary} />
        </TouchableOpacity>
      </View>
      </KeyboardAvoidingView>
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
      gap:8,
      alignItems:'center'
    },
    userInfoText:{
      fontSize:20,
      fontFamily:'roboto-condensed-m',
      color:Colors.primary
    },
    messageBox:{
    paddingHorizontal:20,
    gap:50,
    paddingBottom:20
  },
  messageBubble:{
    borderRadius:10,
    maxWidth:"70%",
    marginVertical:10,
    padding:5,
    paddingHorizontal:15,
    paddingVertical:13,
    alignSelf:'flex-start'
  },
  messageBubbleUser:{
    borderRadius:10,
    maxWidth:"70%",
    marginVertical:10,
    padding:5,
    paddingHorizontal:15,
    paddingVertical:13,
    backgroundColor:Colors.primary,
    alignSelf:'flex-end'
  },
  msgText:{
    fontSize:13,
    marginRight:55,
    fontFamily:'roboto-condensed'
  },
  msgTextUser:{
    fontSize:13,
    marginRight:55,
    color:'#fff',
    fontFamily:'roboto-condensed'


  },
  messageInputBox:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    paddingHorizontal:50,
    paddingVertical:30,
    paddingTop:10,
    backgroundColor:'#ececec'
  },
  messageInput:{
    backgroundColor:"#fff",
    borderColor:'#000',
    borderWidth:StyleSheet.hairlineWidth,
    width:'80%',
    borderRadius:15,
    fontSize:16,
    padding:8,
    paddingVertical:5
  },
  date:{
    fontSize:10,
    alignSelf:'flex-end',
    color:'rgba(0,0,0,0.5)',
    position:'absolute',
    right:6,
    bottom:2
  },
  messageImage:{
    width:200,
    height:200
  }
})