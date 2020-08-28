import React, { useContext, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import 'react-native-gesture-handler';

import AppSolutions from '../screens/AppSolutions/AppSolutions';
import NewIssue from '../screens/Forms/NewIssue/NewIssue';
import ActiveIssues from '../screens/ActiveIssues/ActiveIssues';
import CloseIssues from '../screens/CloseIssues/CloseIssues';
import UserDetails from '../screens/User/User';
import EditIssue from '../screens/Forms/EditIssue/EditIssue';
import Poll from '../screens/Forms/Poll/Poll';

import SettingsStackNavigator from './SettingsStackNavigator';

//Context reducer
import { UserContext } from '../context/userContext';
import { useFocusEffect } from '@react-navigation/native';
import { View } from 'react-native';
import utils from '../utils';
import Reports from '../screens/Reports/Reports';

const HomeStack = createDrawerNavigator();

const HomeStackNavigator = () => {
  //Context
  const [login, loginAction] = useContext(UserContext);
  //Render Settings
  const [showSettings, setShowSettings] = useState(false);
  /**
   * Component did mount with react navigation for component focus
   */
  useFocusEffect(
    React.useCallback(() => {
      //Do somthing when the screen is focused
      if (!utils.isNullOrEmpty(login.user.type) && login.user.type == 2) {
        setShowSettings(true);
      }
      return () => {
        // route.params.issueId = null;
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [])
  );

  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name={'AppSolutions'} component={AppSolutions} />
      <HomeStack.Screen name={'New Issue'} component={NewIssue} />
      <HomeStack.Screen name={'Active Issues'} component={ActiveIssues} />
      <HomeStack.Screen name={'Reports'} component={Reports} />
      <HomeStack.Screen name={'Closed Issues'} component={CloseIssues} />
      <HomeStack.Screen name={'Profile'} component={UserDetails} />
      {showSettings && (
        <HomeStack.Screen
          name={'Settings'}
          component={SettingsStackNavigator}
        />
      )}
      <HomeStack.Screen
        name={'Edit Issue'}
        component={EditIssue}
        options={{
          drawerLabel: () => (
            <View style={{ display: 'none', width: 0 }}></View>
          ),
          title: () => <View style={{ display: 'none', width: 0 }}></View>,
          drawerIcon: () => <View style={{ display: 'none', width: 0 }}></View>,
        }}
      />
      <HomeStack.Screen
        name={'Poll'}
        component={Poll}
        options={{
          drawerLabel: () => (
            <View style={{ display: 'none', width: 0 }}></View>
          ),
          title: () => <View style={{ display: 'none', width: 0 }}></View>,
          drawerIcon: () => <View style={{ display: 'none', width: 0 }}></View>,
        }}
      />
    </HomeStack.Navigator>
  );
};

export default HomeStackNavigator;
