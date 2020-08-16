import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import 'react-native-gesture-handler';

import AuthStackNavigator from './navigators/AuthStackNavigator';
import HomeStackNavigator from './navigators/HomeStackNavigator';

const RootStack = createStackNavigator();

const App = ({ navigation }) => {
  return (
    <NavigationContainer independent={true}>
      <RootStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <RootStack.Screen name={'AuthStack'} component={AuthStackNavigator} />
        <RootStack.Screen name={'HomeStack'} component={HomeStackNavigator} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default App;
