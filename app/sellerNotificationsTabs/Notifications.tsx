import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const mockNotifications = [
    {
        id:1,
        title:`The IPhone 15 pro max your GGBBCY tech is now available to buy`,
        image:"https://www.apple.com/newsroom/images/2023/09/apple-unveils-iphone-15-pro-and-iphone-15-pro-max/article/Apple-iPhone-15-Pro-lineup-hero-230912_Full-Bleed-Image.jpg.large.jpg",
        date:"1:25 PM"
    },
    {
        id:2,
        title:'The IPhone 15 pro max your GGBBCY tech is now available to buy',
        image:"https://www.apple.com/newsroom/images/2023/09/apple-unveils-iphone-15-pro-and-iphone-15-pro-max/article/Apple-iPhone-15-Pro-lineup-hero-230912_Full-Bleed-Image.jpg.large.jpg",
        date:"1:25 PM"
    },
    {
        id:3,
        title:'The IPhone 15 pro max your GGBBCY tech is now available to buy',
        image:"https://www.apple.com/newsroom/images/2023/09/apple-unveils-iphone-15-pro-and-iphone-15-pro-max/article/Apple-iPhone-15-Pro-lineup-hero-230912_Full-Bleed-Image.jpg.large.jpg",
        date:"1:25 PM"
    },
    {
        id:4,
        title:'The IPhone 15 pro max your GGBBCY tech is now available to buy',
        image:"https://www.apple.com/newsroom/images/2023/09/apple-unveils-iphone-15-pro-and-iphone-15-pro-max/article/Apple-iPhone-15-Pro-lineup-hero-230912_Full-Bleed-Image.jpg.large.jpg",
        date:"1:25 PM"
    },
    {
        id:5,
        title:'The IPhone 15 pro max your GGBBCY tech is now available to buy',
        image:"https://www.apple.com/newsroom/images/2023/09/apple-unveils-iphone-15-pro-and-iphone-15-pro-max/article/Apple-iPhone-15-Pro-lineup-hero-230912_Full-Bleed-Image.jpg.large.jpg",
        date:"1:25 PM"
    },
]

const Notifications = () => {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{
        gap:5
      }}>
        {
            mockNotifications.map((noti) => (
                <View key={noti.id} style={styles.notificationContainer}>
                    <Image source={{uri:noti.image}} style={styles.notificationImage} resizeMode='cover' />
                    <View style={{flexShrink:1,gap:5}}>
                        <Text style={styles.notificationTitle}>{noti.title}</Text>
                        <Text style={styles.notificationDate}>{noti.date}</Text>
                    </View>
                </View>
            ))
        }
      </ScrollView>
    </View>
  )
}

export default Notifications

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#FAFBFD',
        
    },
    notificationContainer:{
        paddingHorizontal:20,
        paddingVertical:12,
        flexDirection:'row',
        gap:10,
        backgroundColor:'#fff'
    },
        notificationImage:{
        width:51,
        height:51,
        borderRadius:51
    },
    notificationTitle:{
        fontSize:15,
        color:'rgba(0,0,0,0.50)',
        fontFamily:'roboto-condensed'
    },
    notificationDate:{
        fontSize:10,
        color:'rgba(0,0,0,0.50)',
        fontFamily:'roboto-condensed'

    }
})