import React, { useState, useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ToastAndroid,
  StatusBar,
  ScrollView,
} from 'react-native';
import { Image, Button } from 'react-native-elements';
// import { Col, Row, Grid } from 'react-native-easy-grid';
import IconButton from '../../components/IconButton/IconButton';

import SolveTicLogo from '../../resources/images/logo1.png';
import Color from '../../styles/colors';

//Components
import CustomTextInput from '../../components/CustomTextInput/CustomTextInput';
import CustomButton from '../../components/CustomButton/CustomButton';

//Context reducer
import { UserContext } from '../../context/userContext';
import { Row, Grid } from 'react-native-easy-grid';

//Services
import LoginServices from '../../services/login';

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
    LoginServices.login(loginRequestFormat).then((res) => {
      switch (res.code) {
        case 200:
          loginAction({
            type: 'sign',
            data: res.data,
          });
          navigation.replace('HomeStack');
          break;

        default:
          ToastAndroid.show(
            'El usuario no existe o la contraseña es incorrecta',
            ToastAndroid.LONG
          );
          break;
      }
    });
  };

  return (
    <>
      <StatusBar backgroundColor={Color.RED} translucent={true} />

      <ScrollView
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="always"
        style={{ marginTop: 20, padding: 20 }}
      >
        <Grid>
          <Row style={{ alignSelf: 'center', marginVertical: 20 }}>
            <Image
              source={SolveTicLogo}
              style={{ height: 250, width: 300 }}
              containerStyle={{ padding: 10 }}
            />
          </Row>

          <Row style={{ alignSelf: 'center', marginVertical: 20 }}>
            <CustomTextInput
              keyboardType={'email-address'}
              placeholder={'E-mail'}
              image="email"
              onChangeText={(text) => setUser(text)}
            />
          </Row>

          <Row style={{ alignSelf: 'center', marginVertical: 20 }}>
            <CustomTextInput
              keyboardType={null}
              placeholder={'Password'}
              image="lock"
              bolGone={true}
              secureTextEntry={hidePassword}
              onPress={() => setHidePassword(!hidePassword)}
              onChangeText={(text) => setPassword(text)}
            />
          </Row>

          <Row style={{ alignSelf: 'center' }}>
            <Button
              title={'Iniciar sesion'}
              buttonStyle={{
                backgroundColor: 'red',
                borderRadius: 30,
                paddingHorizontal: 20,
              }}
              titleStyle={{
                fontWeight: 'bold',
                fontSize: 30,
              }}
              onPress={userLogin}
            />
          </Row>
        </Grid>
      </ScrollView>
    </>
  );
};

export default Login;
