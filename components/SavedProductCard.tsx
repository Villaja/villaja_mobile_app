import { ScrollView, View, Text, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';
import Colors from '../constants/Colors';
import { Product } from '../types/Product';

interface ProductCardProps {
    product: Product;
    handleRemoveWishList: (id: string) => void;
}

const SavedProductCard: React.FC<ProductCardProps> = ({ product, handleRemoveWishList }) => {
    const { width } = Dimensions.get('window');
    return (
        <ScrollView style={{ flex: 1, backgroundColor: "#ffffff" }} >
            <View style={styles.container} key={product._id}>
                <Link href={`/product/${product._id}`} asChild>
                    <TouchableOpacity style={styles.topSection}>
                        <View style={{ paddingVertical: 12.5, flexDirection: "row", alignItems: "center" }}>
                            <Image source={{ uri: product.images[0]?.url }} style={styles.image} />
                            <View style={{ marginLeft: 18 }}>
                                <Text numberOfLines={2} style={styles.name}>{product.name}</Text>
                                <Text style={styles.price}>₦{product.originalPrice.toLocaleString()}</Text>
                                <Text style={styles.discount}>{product.discountPrice === 0 ? null : '₦' + product.discountPrice.toLocaleString()}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </Link>
                <TouchableOpacity onPress={() => handleRemoveWishList(product._id)}>
                    <Text style={{ color: "#00000070", fontSize: 12 }}>Remove</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 14,
        paddingHorizontal: 14,
        borderRadius: 5,
        elevation: 4,
        shadowColor: 'rgba(2, 84, 146, 0.10)',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 8,
        marginBottom: 16,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottomWidth: 0.3,
        borderBottomColor: "#00000040",
        backgroundColor: '#ffffff'
    },
    topSection: {
        flexDirection: 'row',
        gap: 18,
    },
    image: {
        width: 83,
        height: 83,
        resizeMode: 'contain',
        borderRadius: 5,
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: 'rgba(0,0,0,0.05)',
    },
    name: {
        fontFamily: 'roboto-condensed',
        fontWeight: '700',
        color: 'rgba(0,0,0,0.50)',
        marginBottom: 6,
        fontSize: 13,
        maxWidth: 120,
    },
    price: {
        fontFamily: 'roboto-condensed',
        fontSize: 15,
        color: Colors.primary,
        fontWeight: '700',
    },
    discount: {
        fontFamily: 'roboto-condensed',
        fontSize: 9,
        color: 'rgba(0,0,0,0.30)',
        fontWeight: '500',
        textDecorationLine: 'line-through',
    },
});

export default SavedProductCard;
