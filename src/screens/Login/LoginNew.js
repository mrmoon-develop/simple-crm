import React, { useState, useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  Button,
  ToastAndroid,
  StatusBar,
  ScrollView,
} from 'react-native';
// import { Col, Row, Grid } from 'react-native-easy-grid';
import loginServices from '../../services/login';
import IconButton from '../../components/IconButton/IconButton';

import { loginStyles } from '../../styles/styles';
import { TouchableOpacity } from 'react-native-gesture-handler';

import SolveTicLogo from '../../resources/images/logo1.png';
import Color from '../../styles/colors';

//Components
import CustomTextInput from '../../components/CustomTextInput/CustomTextInput';
import CustomButton from '../../components/CustomButton/CustomButton';

//Context reducer
import { UserContext } from '../../context/userContext';

const Login = ({ navigation }) => {
  //Context
  const [login, loginAction] = useContext(UserContext);

  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(false);

  const userLogin = () => {
    let loginRequestFormat = {
      email: user,
      password,
    };
    loginServices.login(loginRequestFormat).then((res) => {
      switch (res.code) {
        case 200:
          loginAction({
            type: 'sign',
            data: res.data,
          });
          navigation.replace('HomeStack');
          break;

        default:
          ToastAndroid.show('Error', ToastAndroid.SHORT);
          break;
      }
    });
  };

  return (
    <ScrollView
      keyboardDismissMode="on-drag"
      keyboardShouldPersistTaps="always"
    >
      <View style={[loginStyles.container, { padding: 20 }]}>
        <StatusBar backgroundColor={Color.RED} translucent={true} />

        <View style={loginStyles.logo}>
          <Image source={SolveTicLogo} style={{ height: 250, width: 250 }} />
        </View>

        <CustomTextInput
          keyboardType={'email-address'}
          placeholder={'E-mail'}
          image="email"
          onChangeText={(text) => setUser(text)}
        />
        <CustomTextInput
          keyboardType={null}
          placeholder={'Password'}
          image="lock"
          bolGone={true}
          secureTextEntry={hidePassword}
          onPress={() => setHidePassword(!hidePassword)}
          onChangeText={(text) => setPassword(text)}
        />
        <CustomButton
          title={'Login'}
          onPress={() => userLogin()}
          style={{ backgroundColor: Color.RED }}
        />
        {/* <View style={loginStyles.btnTransparent}>
          <TouchableOpacity>
            <Text style={[loginStyles.btnText, { color: color.Blue }]}>
              Registrarse
            </Text>
          </TouchableOpacity>
        </View>
        <View style={loginStyles.btnTransparent}>
          <TouchableOpacity>
            <Text
              style={[
                loginStyles.txtTransparent,
                { textDecorationLine: 'underline' },
              ]}
            >
              Olvide mi password
            </Text>
          </TouchableOpacity>
        </View> */}
      </View>
    </ScrollView>
  );
};

export default Login;
