import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions, useNavigation } from '@react-navigation/native'; // Import useNavigation hook

const UserNotAuthenticated = () => {
  const navigation = useNavigation(); // Use useNavigation hook to get the navigation object

  const handleLogout = async () => {
    try {
      // Clear the userToken and fa_enabled from AsyncStorage
      await AsyncStorage.removeItem('userID');
      await AsyncStorage.removeItem('fa_enabled');

      // Navigate back to the LoginScreen
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        })
      );
    } catch (error) {
      console.log('Error logging out:', error);
      // Handle error if necessary
    }
  };

  return (
    <View>
      <Text>Contacte o Administrador para ativar a conta. Terá de pagar 1€ para aceder à versão beta</Text>
      <TouchableOpacity onPress={handleLogout}>
        <Text>Logout</Text>
      </TouchableOpacity>
      
      
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
  },
});

export default UserNotAuthenticated;
