import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import 'react-native-gesture-handler';

import AppSolutions from '../screens/AppSolutions/AppSolutions';
import NewIssue from '../screens/Forms/NewIssue/NewIssue';
import ActiveIssues from '../screens/ActiveIssues/ActiveIssues';
import CloseIssues from '../screens/CloseIssues/CloseIssues';
import UserDetails from '../screens/User/User';

const HomeStack = createDrawerNavigator();

const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name={'AppSolutions'} component={AppSolutions} />
      <HomeStack.Screen name={'New Issue'} component={NewIssue} />
      <HomeStack.Screen name={'Active Issues'} component={ActiveIssues} />
      <HomeStack.Screen name={'Closed Issues'} component={CloseIssues} />
      <HomeStack.Screen name={'Profile'} component={UserDetails} />
    </HomeStack.Navigator>
  );
};

export default HomeStackNavigator;
