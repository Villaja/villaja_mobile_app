import { ActivityIndicator, Image, ScrollView, StyleSheet, Text, TextInput, View, Dimensions } from 'react-native'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { base_url } from '../../constants/server'
import Colors from '../../constants/Colors'
import { AntDesign } from '@expo/vector-icons'
import { defaultStyles } from '../../constants/Styles'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useAuth } from '../../context/SellerAuthContext'
import AsyncStorage from '@react-native-async-storage/async-storage'
import moment from 'moment'
import { router, useRouter } from 'expo-router';
import LottieView from "lottie-react-native";


interface Conversation {
    _id: string,
    groupTitle: string,
    members: Array<string>,
    createdAt: any,
    updatedAt: Date,
    lastMessage: string,
    lastMessageId: string
}


const Messages = () => {
    const { isLoading } = useAuth();
    const {height} = Dimensions.get('window');
    const [convoLoading, setConvoLoading] = useState<boolean>(true)
    const [conversations, setConversations] = useState<Conversation[] | any>([]);
    const [messages, setMessages] = useState([]);
    const [searchValue, setSearchValue] = useState<string>("")
    const [user, setUser] = useState<any>({});
    const [token, setToken] = useState<string>()


    const handleSearch = () => {
        
    }

    useEffect(() => {
        const getConversation = async () => {
            try {
                const token = await AsyncStorage.getItem('token'); // Get the token from local storage
                const user = await AsyncStorage.getItem('user'); // Get the token from local storage
                
                const response = await axios.get(
                    `${base_url}/conversation/get-all-conversation-user/${JSON.parse(user!)?._id}`,
                    {
                        headers: {
                            Authorization: token // Set the authorization header with the token
                        },
                        withCredentials: true // Send cookies along with the request
                    }
                );
                setToken(token!)
                setUser(JSON.parse(user!))
                setConversations(response.data.conversations);
                setConvoLoading(false)
            } catch (error) {
                // Handle error
                console.log(error);
            }
        };
        getConversation();
    }, [user, messages]);


    //fetch user token 
   


    return (
        <View style={styles.container}>
            <View style={{ paddingHorizontal: 20 }}>
                <AntDesign name='search1' size={18} color={Colors.grey} style={styles.searchIcon} />
                <TextInput keyboardType='web-search' value={searchValue} onChangeText={(text) => setSearchValue(text)} onSubmitEditing={handleSearch} placeholder='I Am Looking For...' placeholderTextColor={"#00000040"} style={[defaultStyles.inputField, { height: 40, paddingLeft: 40, backgroundColor: 'rgba(0,0,0,0.03)' }]} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} style={{ marginTop: 20 }}>
                {/* Display seller's information */}
                
                
                {
                    convoLoading && user ? <ActivityIndicator size={'small'} color={Colors.primary} /> :
                        conversations && conversations.length > 1 ? conversations.map((item: Conversation) => (

                            <MessageItem key={item._id} data={item} me={user._id} searchValue={searchValue} />
                        ))

                            :
                            <View style={{flex: 1,justifyContent: 'center', alignItems: 'center', marginTop: height/1/8}} >
                                <LottieView source={require("../../assets/images/no-message.json")} autoPlay loop={true} style={{width: 200, height: 200,}} />
                                <Text style={{color: '#025492', fontSize: 16, fontWeight: '500', marginBottom: 20}} >No Message Found</Text>
                                <Text style={{color: '#00000097', fontSize: 13, fontWeight: '500', paddingHorizontal: 50}} >You can text a seller from their profile, accessible through the product details</Text>
                            </View>
                }
            </ScrollView>

        </View>
    )
}

const MessageItem = ({ data, me, searchValue }: { data: Conversation, me: string, searchValue: string }) => {


    const router = useRouter()
    const [user, setUser] = useState<any>({});
    const [lastMessage, setLastMessage] = useState(1)






    useEffect(() => {
        const userId = data.members.find((user) => user != me);
        console.log(me);

        const getUser = async () => {
            try {
                const res = await axios.get(`${base_url}/shop/get-shop-info/${userId}`);
                
                setUser(res.data.shop);
            } catch (error) {
                console.log(error);
            }
            console.log('running user/user-info');
            
        };
        getUser();
    }, []);
    
    return (
        <View>

            {/* Display user's information */}
            {
            user?.name?.toLowerCase().includes(searchValue.toLowerCase()) ? 
            <TouchableOpacity style={styles.messageItemContainer} onPress={() => router.push({pathname:`/userNotificationsTabs/${data._id}`,params:{userName:user?.name}})}>
            <View style={styles.messageItemleft}>
                <Image source={user?.avatar?.url ? { uri: user.avatar.url } : require("../../assets/images/user2.png")} style={styles.messageAvatar} resizeMode='contain' />
                <View style={styles.messageItemInfo}>
                    <Text style={styles.messageItemName}>{user?.name}</Text>
                    <Text numberOfLines={lastMessage} style={styles.messageItemText}>{data.lastMessage}</Text>
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
    container: {
        backgroundColor: '#FAFBFD',
        // padding:20,
        paddingTop: 10,
        flex: 1
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
    messageAvatar: {
        width: 49,
        height: 49,
        borderRadius: 49
    },
    messageItemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 15
    },
    messageItemleft: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
    },
    messageItemInfo: {
        gap: 5,
    },
    messageItemName: {
        fontSize: 13,
        color: 'rgba(0,0,0,0.70)',
        fontFamily: 'roboto-condensed-m',
        fontWeight: "500",
    },
    messageItemText: {
        fontSize: 11,
        color: '#000',
        fontFamily: 'roboto-condensed',
        width: 200,
    },
    messageItemRight: {
        alignSelf: "center"
    },
    messageItemDate: {
        fontSize: 10,
        color: 'rgba(0,0,0,0.60)',
        fontFamily: 'roboto-condensed-m'
    },

})