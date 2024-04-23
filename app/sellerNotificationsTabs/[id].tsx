import React, { useEffect, useRef, useState } from 'react'
import { Platform, SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, ScrollViewComponent, KeyboardAvoidingView, TextInput } from 'react-native'
import { router, useLocalSearchParams } from 'expo-router'
import { Ionicons, MaterialCommunityIcons, SimpleLineIcons, FontAwesome } from '@expo/vector-icons'
import Colors from '../../constants/Colors'
import axios from 'axios'
import { base_url } from '../../constants/server'
import AsyncStorage from '@react-native-async-storage/async-storage'
import moment from 'moment'
import * as ImagePicker from 'expo-image-picker';


interface Conversation {
  _id: string;
  groupTitle: string;
  members: Array<string>;
  createdAt: any;
  updatedAt: Date;
  lastMessage: string;
  lastMessageId: string;
}

const Chat = () => {
  const { id, userName } = useLocalSearchParams()
  const [conversation, setConversation] = useState<Conversation | null>(null)
  const [messages, setMessages] = useState<any>([])
  const [newMessage, setNewMessage] = useState<string>("")
  const [sellerId, setSellerId] = useState<string>("")
  const [images, setImages] = useState<any>([])
  const scrollRef = useRef<any>(null)
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      allowsMultipleSelection: false, // denies multiple image selection
      allowsEditing: true,
    });
    // console.log(result);

    if (false) {
      const response = await axios.get(result.assets![0].uri, {
        responseType: 'blob'
      })
      // console.log(response);

      const blob = URL.createObjectURL(response.data)
      console.log(blob)
      sendImageHandler(response.data)
    }


  }

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

  const sendImageHandler = async (result: any) => {

    try {
      await axios
        .post(`${base_url}/message/create-new-message`, {
          images: result,
          sender: sellerId,
          text: newMessage,
          conversationId: id,
        })
        .then((res) => {
          setImages([]);
          setMessages([...messages, res.data.message]);
          updateLastMessageForImage();
        });
    } catch (error) {
      console.log(error);
    }
  }

  const updateLastMessageForImage = async () => {
    await axios.put(
      `${base_url}/conversation/update-last-message/${id}`,
      {
        lastMessage: "Photo",
        lastMessageId: sellerId,
      }
    );
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
  }, [id])

  useEffect(() => {
    const getConversation = async () => {

      try {
        const token = await AsyncStorage.getItem('sellerToken')
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
      catch (err) {
        console.log("error retrieving conversation", err);

      }

    }
  }, [id])

  return (
    <SafeAreaView style={styles.container}>
      <View style={Platform.OS === 'android' ? { flex: 1, paddingTop: 40 } : { flex: 1 }}>
        <View style={styles.chatHeader}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name='arrow-back-sharp' size={20} color={"#000"} />
          </TouchableOpacity>
          <View style={styles.userInfo}>
            <Image source={require("../../assets/images/user2.png")} style={styles.userInfoImg} resizeMode='contain' />
            <Text style={styles.userInfoText}>{userName}</Text>
          </View>
        </View>

        <ScrollView
          ref={scrollRef}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
          style={styles.messageBox}
        >
          {messages ? (
            messages.map((msg: any) =>
              msg.sender != sellerId ? (
                <View key={msg._id}>
                  <View style={[styles.messageBubble]}>
                    {msg.text && <Text style={styles.msgText}>{msg.text}</Text>}
                    <Text style={styles.date}>{moment(msg.createdAt).fromNow()}</Text>
                  </View>
                  {msg.images ? (
                    <View style={styles.messageBubble2}>
                      <Image
                        source={{ uri: msg.images.url }}
                        resizeMode="cover"
                        style={styles.messageImage}
                      />
                      <Text style={styles.date}>{moment(msg.createdAt).fromNow()}</Text>
                    </View>
                  ) : null}
                </View>
              ) : (
                <View key={msg._id} style={[styles.messageBubbleUser]}>
                  <Text style={styles.msgTextUser}>{msg.text}</Text>
                  <Text style={styles.date}>{moment(msg.createdAt).fromNow()}</Text>
                </View>
              )
            )
          ) : null}
        </ScrollView>

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.select({ ios: 40, android: 0 })}
        >
          <View style={styles.messageInputBox}>
            <TextInput
              style={styles.messageInput}
              placeholder={isTyping ? 'Upload image' : 'Type a message...'}
              placeholderTextColor={'rgba(0,0,0,0.40)'}
              onChangeText={text => {
                setNewMessage(text);
                setIsTyping(!!text);
              }}
              value={newMessage}
              multiline={true}
            />
            <TouchableOpacity onPress={isTyping ? sendMessageHandler : pickImage} style={styles.camera}>
              {isTyping ? <FontAwesome name="send" size={22} color={Colors.primary} /> : <SimpleLineIcons name='camera' size={22} color={Colors.primary} />}
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};

export default Chat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  chatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: "#02549205"
  },
  userInfoImg: {
    width: 40,
    height: 40
  },
  userInfo: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center'
  },
  userInfoText: {
    fontSize: 16,
    fontFamily: 'roboto-condensed-m',
    color: Colors.primary,
  },
  messageBox: {
    paddingHorizontal: 20,
    gap: 50,
    paddingBottom: 20,
    backgroundColor: "#02549209"
  },
  messageBubble: {
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    maxWidth: "70%",
    marginVertical: 10,
    padding: 5,
    paddingHorizontal: 15,
    paddingVertical: 13,
    alignSelf: 'flex-start',
    backgroundColor: '#DCDCDC',
  },
  messageBubble2: {
    borderRadius: 10,
    maxWidth: "70%",
    marginVertical: 10,
    paddingVertical: 13,
    alignSelf: 'flex-start',
  },
  date: {
    fontSize: 10,
    color: 'rgba(0,0,0,0.5)',
    // color:'#000',
    position: 'absolute',
    right: 6,
    bottom: -15,
    fontFamily: 'roboto-condensed'
  },
  messageBubbleUser: {
    borderRadius: 20,
    maxWidth: "70%",
    marginVertical: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: Colors.primary,
    alignSelf: 'flex-end',
  },
  msgText: {
    fontSize: 14,
    marginRight: 5,
    textAlign: "justify",
    fontFamily: 'roboto-condensed',
    color: "#00000090"
  },
  msgTextUser: {
    fontSize: 14,
    marginRight: 5,
    color: '#fff',
    textAlign: 'left',
    fontFamily: 'roboto-condensed'
  },
  messageInputBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: "#fff",
    gap: 8.5
  },
  messageInput: {
    backgroundColor: "#fff",
    borderColor: Colors.primaryTransparent,
    borderWidth: 2,
    width: '100%',
    height: 48,
    borderRadius: 10,
    fontSize: 12,
    textAlign: "justify",
    padding: 9,
    paddingVertical: 5,
    color: '#111',
    fontFamily: 'roboto-condensed',
    flexShrink: 1
  },
  messageImage: {
    width: 200,
    height: 200,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  camera: {
    height: 48,
    width: 48,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: Colors.primaryTransparent,
    borderWidth: 2
  }
});
