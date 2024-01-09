import { View, StyleSheet, TextInput, Text, TouchableOpacity } from 'react-native';
import { useWarmUpBrowser } from '../../hooks/useWarmUpBrowser';



const Page = () => {
  useWarmUpBrowser();

  return (
    <View style={styles.container}>
    
      <Text>Login Screen</Text>

    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 26,
  },

  
});
