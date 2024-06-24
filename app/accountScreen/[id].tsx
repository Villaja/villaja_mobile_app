import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Text, TextInput, View, ScrollView, TouchableOpacity, Dimensions, Alert } from "react-native";
import { MaterialIcons, MaterialCommunityIcons, Ionicons, FontAwesome, Feather, Entypo } from "@expo/vector-icons";
import { timeAgo } from '../../utils/timeAgo';
import { base_url } from "../../constants/server";
import { Product } from '../../types/Product';
import ProductCard2 from "../../components/ProductCard2";
import ProductCard from "../../components/ProductCard";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams, useRouter } from 'expo-router';
import axios, { Axios, AxiosResponse } from 'axios';
import { Skeleton } from '@rneui/themed'
import { useAuth } from "../../context/AuthContext";
import Toast from 'react-native-toast-message';

interface Conversation {
    _id: string;
    groupTitle: string;
    members: Array<string>;
    createdAt: any;
    updatedAt: Date;
    lastMessage: string;
    lastMessageId: string;
  }


const { width } = Dimensions.get("window");

const testUser = {
    id: 1,
    name: "Tony Danza",
    image: require("../../assets/images/user2.png")
};

const merchantProfile = () => {

    const {id} = useLocalSearchParams()

    const router = useRouter()
    const [user, setUser] = useState<any>({});
    const [about, setAbout] = useState(3);
    const [products, setProducts] = useState<Array<Product>>([]);
    const [seller, setSeller] = useState<any>([]);
    const [token, setToken] = useState<string>();
    const [userToken, setUserToken] = useState<string>();
    const [loading, setLoading] = useState<boolean>(true);
    const [viewType, setViewType] = useState<boolean>(true)

    const fetchSeller  = async () => {
        try
        {
            const response = await axios.get(`${base_url}/shop/get-shop-info/${id}`)

            if(response.data.success)
            {
                setSeller(response.data.shop)
            }
            else
            {
                console.log("could not get seller information");   
            }
        }
        catch(e)
        {
                console.log("error fetching seller information",e);   
        }
        finally
        {
            setLoading(false)
        }
    }




    //fetch user and seller token
    useEffect(() => {
        const fetchToken = async () => {
            const token = await AsyncStorage.getItem('sellerToken');
            const userToken = await AsyncStorage.getItem('user')
            const user = await AsyncStorage.getItem('user')
            const seller = await AsyncStorage.getItem('seller')

            if (!token) return router.replace('/sellerAuthScreens/SellerLogin')
            if (!userToken) {
                return router.replace('/(modals)/login')
            }
            setUser(JSON.parse(user!).user)
            setSeller(JSON.parse(seller!).seller)
            setToken(token)
            setUserToken(userToken)
        }

        // fetchToken()
        fetchSeller()
    }, [])

        // fetch shop products functionality

        const fetchProducts = async () => {
            try {
                const response: AxiosResponse<{ products: Product[] }> = await axios.get(`${base_url}/product/get-all-products-shop/${seller._id}`, {
                    headers: {
                        Authorization: token,
                    },
                });
    
                const first10Products = response.data.products.slice(0, 50);
                setProducts(first10Products)
    
            } catch (error) {
                console.error('Error fetching products', error);
            } finally {
                setLoading(false)
            }
        };

    // finally fetch product after token confirmation
    useEffect(() => {
        if (seller) {
            fetchProducts();
        }
    }, [seller, token]);



    const renderSkeletonLoader = (start: number, end: number) => {
        const cardsPerRow = 2;

        return (
            <View>
                <View style={styles.gridContainer2}>
                    {Array(40).fill(0).slice(start, end).map((_, index) => (
                        <View
                            key={index}
                            style={[
                                styles.productCard,
                                index % cardsPerRow === cardsPerRow - 1 ? styles.lastCardInRow : null,
                            ]}
                        >
                            <Skeleton skeletonStyle={{
                                backgroundColor: 'rgba(0,0,0,0.10)',
                                borderRadius: 5,
                            }} animation="pulse" width={(Dimensions.get('window').width - 40) / 2 - 5} height={250} />
                        </View>
                    ))}
                </View>
            </View>
        );
    };


    const renderProductCards = (start: number, end: number) => {
        const cardsPerRow = 2;

        return (
            <View>
                <View style={styles.gridContainer}>
                    {products.map((product, index) => (
                        <View
                            key={product._id}
                            style={[
                                styles.productCard,
                                index % cardsPerRow === cardsPerRow - 1 ? styles.lastCardInRow : null,
                            ]}
                        >
                            <ProductCard2 product={product} />
                        </View>
                    ))}
                </View>
            </View>

        );
    };

    //fetch user token to ensure user is logged in before sending a message 

    

    //Create new conversation Logic to send message to seller







    return (
        <ScrollView style={styles.container} >
            <View style={{ width: width , height: 78, marginBottom: 34 }} >
                <Image source={require('../../assets/images/The-Ultimate-Guide-to-Online-Sales-Tax-2023.png')}  style={{ width: width , height: 100, }} />
            </View>
            <View style={{ width: 95, height: 90.48, flexDirection: "row", justifyContent: "center", alignItems: "center", marginHorizontal: 20, position: "absolute", marginTop: 53 }} >
                <View style={{ width: 95, height: 90.48, marginTop: 50, borderRadius: 50, justifyContent: "center", alignItems: "center", backgroundColor: "#02549290", }} >
                    <Image source={seller?.avatar?.url ? { uri: seller.avatar.url } : testUser.image} style={{ width: 92, height: 87.48, borderRadius: 50 }} />
                </View>
                <MaterialIcons name="verified" size={18} color="green" style={{ alignSelf: "flex-end", right: 25, bottom: -19 }} />
            </View>
            <Text style={{ marginLeft: 50, fontSize: 14, fontWeight: "500", alignSelf: "center" }} >{seller?.name}</Text>
            <Text style={{ marginLeft: 40, alignSelf: "center", marginBottom: 37, flexDirection: 'row', justifyContent: "center", alignItems: 'center', fontFamily: 'roboto-condensed', fontSize: 10, color: 'rgba(0,0,0,0.50)' }}><MaterialCommunityIcons name='clock-outline' size={12} color={"rgba(0,0,0,0.50)"} /> 5 months on Villaja</Text>
            <View style={{ marginHorizontal: 20, marginTop: 12 }} >
                <View style={{ flexDirection: "row", gap: 8 }} >
                    <View style={{ width: 53, height: 23, justifyContent: "center", alignItems: "center", backgroundColor: "#02549210", borderRadius: 2 }} >
                        <Text style={{ fontSize: 10, color: "#025492", lineHeight: 14.2, letterSpacing: -0.17 }} >Phones</Text>
                    </View>
                    <View style={{ width: 55, height: 23, justifyContent: "center", alignItems: "center", backgroundColor: "#02549210", borderRadius: 2 }} >
                        <Text style={{ fontSize: 10, color: "#025492", lineHeight: 14.2, letterSpacing: -0.17 }} >Tablets</Text>
                    </View>
                    <View style={{ width: 55, height: 23, justifyContent: "center", alignItems: "center", backgroundColor: "#02549210", borderRadius: 2 }} >
                        <Text style={{ fontSize: 10, color: "#025492", lineHeight: 14.2, letterSpacing: -0.17 }} >Laptops</Text>
                    </View>
                    <View style={{ width: 85, height: 23, justifyContent: "center", alignItems: "center", backgroundColor: "#02549210", borderRadius: 2 }} >
                        <Text style={{ fontSize: 10, color: "#025492", lineHeight: 14.2, letterSpacing: -0.17 }} >Accessories</Text>
                    </View>
                </View>
                {/* <TouchableOpacity style={{backgroundColor: "#025492", height: 38, width: 125, justifyContent: "center", alignItems: "center", marginTop: 20, borderRadius: 8}} >
                    <Text style={{color:"#ffffff", fontSize: 13, fontWeight: "500" }} >Message</Text>
                </TouchableOpacity> */}
                <View style={{ marginTop: 40 }} >
                    <Text style={{ fontSize: 12, color: "#00000070", lineHeight: 15.2, letterSpacing: -0.18, fontWeight: "700" }} >About this merchant</Text>
                    <Text numberOfLines={about} style={{ marginTop: 6, fontSize: 11, color: "#00000070", lineHeight: 15, letterSpacing: -0.18 }} >{seller?.description}</Text>
                    {
                        about === 100 ?
                            <TouchableOpacity onPress={() => setAbout(3)} style={{ flexDirection: 'row', alignItems: 'center', gap: 4, alignSelf: 'flex-end' }}>
                                <Text style={{ fontSize: 11, color: "#025492", lineHeight: 15, letterSpacing: -0.18 }} >Show Less</Text>
                                <MaterialIcons name='keyboard-arrow-up' color="#025492" size={14} />
                            </TouchableOpacity>

                            :

                            <TouchableOpacity onPress={() => setAbout(100)} style={{ flexDirection: 'row', alignItems: 'center', gap: 4, alignSelf: 'flex-end' }}>
                                <Text style={{ fontSize: 11, color: "#025492", lineHeight: 15, letterSpacing: -0.18 }} >Show More</Text>
                                <MaterialIcons name='keyboard-arrow-down' color="#025492" size={14} />
                            </TouchableOpacity>
                    }
                </View>
            </View>
            <View style={{ height: 3, width: width + 10, backgroundColor: "#00000010", marginTop: 40 }} ></View>
            <View style={{ flexDirection: "row", height: 50 }} >
                <TouchableOpacity style={{ justifyContent: "center", alignItems: "center", flexBasis: '15%', borderTopWidth: 1, borderBottomWidth: 1, borderColor: "#00000010" }} onPress={() => setViewType(!viewType) } >
                    {
                        viewType ?
                            <Ionicons name="grid-outline" size={20} color="#00000090" />
                            :
                            <Entypo name='list' size={20} color='#00000090' />
                    }
                </TouchableOpacity>
                <TouchableOpacity style={{ justifyContent: "center", alignItems: "center", flexBasis: '42.5%', borderWidth: 1, borderColor: "#00000010" }} >
                    <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 4 }} >
                        <FontAwesome name="sort" size={15} color="#00000070" />
                        <Text style={{ fontSize: 15, color: "#00000070" }} >Sort</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={{ justifyContent: "center", alignItems: "center", flexBasis: '42.5%', borderTopWidth: 1, borderBottomWidth: 1, borderColor: "#00000010" }} >
                    <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 4 }} >
                        <Feather name="filter" size={15} color="#00000070" />
                        <Text style={{ fontSize: 15, color: "#00000070" }} >Filter</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={{ paddingHorizontal: 20, backgroundColor: "#FAFBFD" }}>
                <View style={{ marginTop: 20, backgroundColor: "#FAFBFD" }} >
                    {loading ? (
                        renderSkeletonLoader(0, 16)
                        // <ActivityIndicator size="small" color={Colors.primary} style={styles.loadingIndicator}  />
                    ) : (
                        renderProductCards(0, 1)
                    )}
                </View>
            </View>

        </ScrollView>
    )
}

export default merchantProfile

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    editButton: {
        marginHorizontal: 20
    },
    gridContainer: {
        flexDirection: 'column-reverse',
        flexWrap: 'nowrap',
        justifyContent: 'space-between',
        // paddingHorizontal: 8,
    },
    gridContainer2: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        // paddingHorizontal: 8,
    },
    productCard: {
        flexBasis: '48%',
        marginBottom: 16,
    },
    lastCardInRow: {
        marginRight: 0,
    },
})