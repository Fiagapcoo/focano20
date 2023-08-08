import React from 'react';
import { NavigationContainer, CommonActions } from '@react-navigation/native';
import { View, Text, DrawerLayoutAndroid, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Dashboard = ({ navigation }) => {
  const VerDisciplinas = () => {
    navigation.navigate('VerDisciplinas');
  };

  const AdicionarDisciplina = () => {
    navigation.navigate('AdicionarDisciplina');
  };

  const EncontrarRecurso = () => {
    navigation.navigate('EncontrarRecurso');
  };

  const AdicionarRecurso = () => {
    navigation.navigate('AdicionarRecurso');
  };


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
    <View style={styles.container}>
      <TouchableOpacity onPress={VerDisciplinas}>
        <Text style={styles.title}>Ver Disciplinas</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={AdicionarDisciplina}>
        <Text style={styles.title}>Adicionar Disciplina</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={EncontrarRecurso}>
        <Text style={styles.title}>Encontrar Recurso</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={AdicionarRecurso}>
        <Text style={styles.title}>Adicionar Recurso</Text>
      </TouchableOpacity>


      <TouchableOpacity onPress={handleLogout}>
        <Text style={styles.title}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: 'black',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default Dashboard;
