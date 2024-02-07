import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, Alert, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import PickerSelect from 'react-native-picker-select';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../../context/AuthContext';

interface Address {
    _id?: string;
    country: string;
    city: string;
    address1: string;
    address2: string;
    zipCode: string;
    addressType: string;
  }

const Profile = () => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState('');
    const [address, setAddress] = useState<Address | null>(null);
    const [addressModalVisible, setAddressModalVisible] = useState(false);
    const [addressForm, setAddressForm] = useState<Address>({
      country: '',
      city: '',
      address1: '',
      address2: '',
      zipCode: '',
      addressType: 'home', 
    });

  useEffect(() => {
    const fetchData = async () => {
      const storedToken = await AsyncStorage.getItem('token');
      setToken(storedToken);

      if (user) {
        // Fetch user details
        axios.get('https://api-villaja.cyclic.app/api/user/getuser', {
          headers: {
            Authorization: storedToken
          }
        })
          .then(response => {
            const userData = response.data.user;
            setFirstName(userData.firstname);
            setLastName(userData.lastname);
            setPhoneNumber(userData.phoneNumber.toString());
            setAddress(userData.addresses.length > 0 ? userData.addresses[0] : null);
            setLoading(false);
          })
          .catch(error => {
            console.error('Error fetching user details:', error);
            setLoading(false);
          });
      }
    };

    fetchData();
  }, [user]);

  const handleUpdate = () => {
    if (!user) {
      Alert.alert('Login required', 'Please login to update your profile');
      return;
    }

    const updatedUser = {
      firstname: firstName,
      lastname: lastName,
      email: user?.user.email,
      password: password,
      phoneNumber: phoneNumber
    };

    // Update user information
    axios.put('https://api-villaja.cyclic.app/api/user/update-user-info', updatedUser, {
      headers: {
        Authorization: token
      }
    })
      .then(response => {
       
        Alert.alert('Success', 'Details updated');
        console.log('User information updated successfully:');
      })
      .catch(error => {
       
        Alert.alert('Error', 'Failed to update profile');
        console.error('Error updating user information:', error.message);
      });
  };

  


  const handleSaveAddress = () => {
    if (!user) {
      Alert.alert('Login required', 'Please login to update your profile');
      return;
    }
  
    
    const newAddress = {
      ...addressForm
    };
  
    // Logic to save/update address
    axios.put('https://api-villaja.cyclic.app/api/user/update-user-addresses', newAddress, {
      headers: {
        Authorization: token
      }
    })
      .then(response => {
        // Handle success
        console.log('Address saved/updated successfully:', response.data);
        Alert.alert('succes', 'address aded, refresh please');
        setAddressModalVisible(false);
        // You may want to update the address state here if needed
      })
      .catch(error => {
        // Handle error
        console.error('Error saving/updating address:', error);
        Alert.alert('Error', 'Failed to save/update address');
      });
  };

  const handleDeleteAddress = () => {
    if (!user) {
      Alert.alert('Login required', 'Please login to delete your address');
      return;
    }

    if (!address) {
      Alert.alert('No Address', 'There is no address to delete');
      return;
    }

    // Make a DELETE request to delete the address
    axios.delete(`https://api-villaja.cyclic.app/api/user/delete-user-address/${address._id}`, {
      headers: {
        Authorization: token
      }
    })
      .then(response => {
        // Handle success
        console.log('Address deleted successfully:', response.data);
        Alert.alert('deleted', 'address deleted');
        setAddress(null); // Clear the address state
      })
      .catch(error => {
        console.error('Error deleting address:', error);
        Alert.alert('Error', 'Failed to delete address');
      });
  };


  const openAddressModal = () => {
    setAddressForm(address || { country: '', city: '', address1: '', address2: '', zipCode: '', addressType: 'home' });
    setAddressModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Profile</Text>
      <TextInput
        placeholder="First Name"
        value={firstName}
        onChangeText={text => setFirstName(text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Last Name"
        value={lastName}
        onChangeText={text => setLastName(text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={text => setPhoneNumber(text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={text => setPassword(text)}
        secureTextEntry
        style={styles.input}
      />

<Button title="Update Information" onPress={handleUpdate} />



       {address ? (
        <View>
          <Text>Address:</Text>
          <Text>{`${address.address1}, ${address.city}, ${address.country}`}</Text>
          <Text>{`Address Type: ${address.addressType}`}</Text>
          {/* <Button title="Update Address" onPress={openAddressModal} /> */}
          <Button title="Delete Address" onPress={handleDeleteAddress} />
        </View>
      ) : (
        <Button title="Add Address" onPress={openAddressModal} />
      )}
      

      <Modal
  animationType="slide"
  transparent={true}
  visible={addressModalVisible}
  onRequestClose={() => setAddressModalVisible(false)}
>
  <View style={styles.modalContainer}>
    <View style={styles.modalContent}>
      <Text style={styles.modalHeading}>{address ? 'Update Address' : 'Add Address'}</Text>
      <TextInput
        placeholder="Country"
        value={addressForm.country}
        onChangeText={text => setAddressForm({...addressForm, country: text})}
        style={styles.input}
      />
      <TextInput
        placeholder="City"
        value={addressForm.city}
        onChangeText={text => setAddressForm({...addressForm, city: text})}
        style={styles.input}
      />
      <TextInput
        placeholder="Address Line 1"
        value={addressForm.address1}
        onChangeText={text => setAddressForm({...addressForm, address1: text})}
        style={styles.input}
      />
      <TextInput
        placeholder="Address Line 2"
        value={addressForm.address2}
        onChangeText={text => setAddressForm({...addressForm, address2: text})}
        style={styles.input}
      />
      <TextInput
        placeholder="Zip Code"
        value={addressForm.zipCode}
        onChangeText={text => setAddressForm({...addressForm, zipCode: text})}
        style={styles.input}
      />
      <PickerSelect
        style={{ inputIOS: styles.input, inputAndroid: styles.input }}
        value={addressForm.addressType}
        onValueChange={(value) =>
          setAddressForm({...addressForm, addressType: value})
        }
        items={[
          { label: 'Home', value: 'home' },
          { label: 'Work', value: 'work' },
          { label: 'Other', value: 'other' },
        ]}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleSaveAddress} style={styles.button}>
          <Text style={styles.buttonText}>Save Address</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setAddressModalVisible(false)} style={styles.button}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
</Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    width: '80%',
    padding: 20,
    borderRadius: 10,
  },
  modalHeading: {
    fontSize: 20,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Profile;
