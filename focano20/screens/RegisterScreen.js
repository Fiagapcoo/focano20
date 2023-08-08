import {Text, View, TouchableOpacity} from 'react-native';
import React from 'react';

const RegisterScreen = ({navigation}) => {
    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Register Screen</Text>
        <TouchableOpacity
            style={{marginTop: 20}}
            onPress={() => navigation.navigate('Home')}>
            <Text>Register</Text>
        </TouchableOpacity>
        </View>
    );
    }

export default RegisterScreen;