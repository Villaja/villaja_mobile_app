import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, {useState,useEffect} from 'react'
import axios from 'axios'
import { base_url } from '../../constants/server'
import Colors from '../../constants/Colors'
import { AntDesign } from '@expo/vector-icons'
import { defaultStyles } from '../../constants/Styles'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useAuth } from '../../context/SellerAuthContext'
import AsyncStorage from '@react-native-async-storage/async-storage'
import moment from 'moment'


interface Conversation{
    _id:string,
    groupTitle:string,
    members:Array<string>,
    createdAt:any,
    updatedAt:Date,
    lastMessage:string,
    lastMessageId:string
}



const Messages = () => {
    const { seller,isLoading } = useAuth()
    const [convoLoading,setConvoLoading] = useState<boolean>(true)
  const [conversations, setConversations] = useState<Conversation[] | any>([]);
  const [messages, setMessages] = useState([]);
  const [searchValue,setSearchValue] = useState<string>("")


    const handleSearch = () => {
        
    }

    useEffect(() => {
        const getConversation = async () => {
            try {
                const token = await AsyncStorage.getItem('sellerToken'); // Get the token from local storage
                const seller = await AsyncStorage.getItem('seller'); // Get the token from local storage
                const response = await axios.get(
                    `${base_url}/conversation/get-all-conversation-seller/${JSON.parse(seller!)?.seller._id}`,
                    {
                        headers: {
                            Authorization: token // Set the authorization header with the token
                        },
                        withCredentials: true // Send cookies along with the request
                    }
                );
                
                setConversations(response.data.conversations);
                setConvoLoading(false)
            } catch (error) {
                // Handle error
                console.log(error);
            }
        };
        getConversation();
    }, [seller, messages]);
  return (
    <View style={styles.container}>
      <View style={{paddingHorizontal:20}}>
            <AntDesign name='search1' size={18} color={Colors.grey} style={styles.searchIcon} />
            <TextInput keyboardType='web-search' value={searchValue} onChangeText={(text) => setSearchValue(text)} onSubmitEditing={handleSearch} placeholder='I Am Looking For...' placeholderTextColor={Colors.grey} style={[defaultStyles.inputField, { height: 40, paddingLeft: 40, backgroundColor: 'rgba(0,0,0,0.03)' }]} />
          </View>

          <ScrollView showsVerticalScrollIndicator={false} style={{marginTop:20}}>

        
        {
            convoLoading ? <ActivityIndicator size={'small'} color={Colors.primary} /> :
            conversations && conversations.length > 1 ?  conversations.map((item:Conversation) => (
                <MessageItem key={item._id} data={item} me={seller._id} searchValue={searchValue} />
            ))

            :
            <Text>no messages</Text>
        }
          </ScrollView>

    </View>
  )
}

const MessageItem = ({data,me,searchValue}:{data:Conversation,me:string,searchValue:string}) => 
{
  
    
    const [user, setUser] = useState<any>({});


   

    
    useEffect(() => {
    const userId = data.members.find((user) => user != me);

    const getUser = async () => {
      try {
        const res = await axios.get(`${base_url}/user/user-info/${userId}`);
        setUser(res.data.user);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [me, data]);
    return (
        <View>

        {
            user?.firstname?.toLowerCase().includes(searchValue.toLowerCase()) ? 
            <TouchableOpacity style={styles.messageItemContainer}>
            <View style={styles.messageItemleft}>
                <Image source={{uri:user?.avatar?.url || "https://i.pinimg.com/564x/65/25/a0/6525a08f1df98a2e3a545fe2ace4be47.jpg"}} style={styles.messageAvatar} resizeMode='contain' />
                <View style={styles.messageItemInfo}>
                    <Text style={styles.messageItemName}>{user?.firstname}</Text>
                    <Text style={styles.messageItemText}>{data.lastMessage}</Text>
                </View>
            </View>
            <View style={styles.messageItemRight}>
                <Text style={styles.messageItemDate}>{moment(data?.updatedAt).fromNow()}</Text>
            </View>
        </TouchableOpacity>
            : null
        }
        </View>
        
    )
}

export default Messages

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#FAFBFD',
        // padding:20,
        paddingTop:10,
        flex:1
    },
    
    searchIcon: {
        position: 'absolute',
        top: 10,
        left: 30
    },
    searchContainer: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        gap: 20
    },
    messageAvatar:{
        width:51,
        height:51,
        borderRadius:51
    },
    messageItemContainer:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginBottom:4,
        backgroundColor:'#fff',
        paddingHorizontal:20,
        paddingVertical:15
    },
    messageItemleft:{
        flexDirection:'row',
        gap:10,
        alignItems:'center'
    },
    messageItemInfo:{
        gap:5
    },
    messageItemName:{
        fontSize:15,
        color:'rgba(0,0,0,0.60)',
        fontFamily:'roboto-condensed-m'
    },
    messageItemText:{
        fontSize:11,
        color:'#000',
        fontFamily:'roboto-condensed'
    },
    messageItemRight:{},
    messageItemDate:{
        fontSize:10,
        color:'rgba(0,0,0,0.60)',
        fontFamily:'roboto-condensed-m'
    },   

})