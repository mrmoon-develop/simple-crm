import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import 'react-native-gesture-handler';

//Screens
import NewUser from '../screens/Forms/NewUser/NewUser';
import Settings from '../screens/Settings/Settings';

const SettingStack = createDrawerNavigator();

const SettingStackNavigator = ({ navigation }) => {
  return (
    <SettingStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <SettingStack.Screen name={'Configuraciones'} component={Settings} />
      <SettingStack.Screen name={'Nuevo usuario'} component={NewUser} />
    </SettingStack.Navigator>
  );
};

export default SettingStackNavigator;
