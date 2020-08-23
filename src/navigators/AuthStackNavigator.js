import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';

import Login from '../screens/Login/Login';
import LoginNew from '../screens/Login/LoginNew';

const AuthStack = createStackNavigator();

const AuthStackNavigator = ({ navigation }) => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <AuthStack.Screen name={'Login'} component={LoginNew} />
    </AuthStack.Navigator>
  );
};

export default AuthStackNavigator;
