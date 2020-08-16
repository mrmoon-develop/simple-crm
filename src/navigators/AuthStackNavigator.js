import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';

import Login from '../screens/Login/Login';

const AuthStack = createStackNavigator();

const AuthStackNavigator = ({ navigation }) => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <AuthStack.Screen name={'Login'} component={Login} />
    </AuthStack.Navigator>
  );
};

export default AuthStackNavigator;
