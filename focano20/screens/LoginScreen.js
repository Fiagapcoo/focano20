import React, { useState, useEffect } from 'react';
import { NavigationContainer, CommonActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userToken, setUserToken] = useState(null);
  const [fa_enabled, setFA_enabled] = useState(null);

  useEffect(() => {
    // Fetch the user token and fa_enabled from AsyncStorage when the component mounts
    const fetchUserData = async () => {
      try {
        const token = await AsyncStorage.getItem('userID');
        const faEnabled = await AsyncStorage.getItem('fa_enabled');
        setUserToken(token);
        setFA_enabled(faEnabled);
      } catch (error) {
        console.log('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, []);

  // Handle automatic login if userToken and fa_enabled are not null
  useEffect(() => {
    if (userToken && fa_enabled) {
      if (fa_enabled === '1') {
        // Navigate to Dashboard if the user is enabled
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              {
                name: 'Dashboard',
                params: { user: { id: parseInt(userToken) } }, // Assuming the user ID is an integer
              },
            ],
          })
        );
      } else {
        // Navigate to UserNotAuthenticated if the user is not enabled
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'UserNotAuthenticated' }],
          })
        );
      }
    }
  }, [userToken, fa_enabled]);

  const handleLogin = () => {
    setPassword('');
    fetch('https://62cc-89-114-75-214.ngrok-free.app/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: username, password: password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          setUsername('');
          AsyncStorage.setItem('userID', data[0].id.toString());
          AsyncStorage.setItem('fa_enabled', data[0].fa_enabled.toString());
          setUserToken(data[0].id.toString());
          setFA_enabled(data[0].fa_enabled.toString());
        }
      })
      .catch((error) => {
        console.log('Error logging in:', error);
        alert('Error logging in. Please try again.');
      });
  };

  const handleSignUp = () => {
    navigation.navigate('Register');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholderTextColor="#666666" // Gray placeholder color
          selectionColor="#000000" // Black cursor color
          placeholder="Nome de Utilizador"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="#666666" // Gray placeholder color
          selectionColor="#000000" // Black cursor color
          placeholder="Palavra Passe"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleSignUp}>
        <Text style={styles.signUpText}>Não tens uma conta? Regista-te</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color : '#000000',
  },
  inputContainer: {
    width: '80%',
  },
  input: {
    height: 40,
    borderColor: '#cccccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 12,
    paddingLeft: 10,
    color: '#000000', // Black text color
  },
  loginButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  loginButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  signUpText: {
    color: '#007BFF',
    fontSize: 16,
    marginTop: 12,
  },

});

export default LoginScreen;
