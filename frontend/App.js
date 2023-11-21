import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Import the screens
import LoginScreen from './Views/Login';
import RegisterScreen from './Views/Register';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }}/>
        <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Register' }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}