
import { View, Text, StyleSheet,Pressable,TouchableOpacity, Modal } from 'react-native'
import React, { useState } from 'react'
import Colors from '../constants/Colors';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { IconProps } from '@expo/vector-icons/build/createIconSet';

const PopUpModal3 = ({triggerCartModal,setTriggerCartModal,icon = 'shoppingcart',message,iconColor}:{triggerCartModal:boolean,setTriggerCartModal:any,icon:string,message:string,iconColor:string}) => {

    const router = useRouter()
  return (
    <View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={triggerCartModal}
        presentationStyle='overFullScreen'
        onRequestClose={() => {
          // Alert.alert('Modal has been closed.');
          setTriggerCartModal(!triggerCartModal);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <AntDesign name={icon as any} size={48} color={iconColor} style={{marginBottom:16}} />
            <Text style={styles.modalText}>{message}</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {setTriggerCartModal(false);router.push('/(tabs)/QuickSell')}}>
              <Text style={styles.textStyle}>Done</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  )
}


const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 22,
    backgroundColor: 'rgba(0,0,0,0.20)'
},
modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
},
button: {
    borderRadius: 5,
    padding: 12,
    elevation: 2,
},
buttonOpen: {
    backgroundColor: '#F194FF',
},
buttonClose: {
    backgroundColor: Colors.primary,
},
textStyle: {
    color: 'white',
    fontWeight: '500',
    textAlign: 'center',
},
modalText: {
    marginBottom: 15,
    fontWeight: '500',
    textAlign: 'center',
},
});

export default PopUpModal3