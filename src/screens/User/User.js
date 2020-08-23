import React, { useState, useContext, useEffect } from 'react';
import { View, Text } from 'react-native';

//Styles
import { mainStyles } from '@styles/styles';
import { ScrollView } from 'react-native-gesture-handler';

//Grid
import { Col, Row, Grid } from 'react-native-easy-grid';

//Services
import UserServices from '@services/users';

//Components
import CustomButton from '../../components/CustomButton/CustomButton';

//Context reducer
import { UserContext } from '../../context/userContext';

export default function User({ navigation }) {
  //Context
  const [login, loginAction] = useContext(UserContext);

  /**
   * Handle logout
   */
  const logout = () => {
    loginAction({
      type: 'logout',
    });
    navigation.replace('AuthStack');
  };

  /**
   * user details on components state
   */
  const [UserDetails, setUserDetails] = useState(login.user);

  /**
   * Get user details
   */
  const getuserDetails = () => {
    UserServices.getUser()
      .then((res) => {
        switch (res.code) {
          case 200:
            setUserDetails(res.data.user);
            break;

          default:
            console.log('Error');
            break;
        }
      })
      .catch((error) => console.log('error', error));
  };

  /**
   * Component did mount
   */
  useEffect(() => {}, []);

  return (
    <ScrollView>
      <Grid style={{ padding: 20 }}>
        <Row style={mainStyles.verticalRowMargin}>
          <Col style={mainStyles.alignItems}>
            <Text style={mainStyles.text}>{'Name: '}</Text>
          </Col>
          <Col>
            <Text style={mainStyles.text}>{UserDetails.name}</Text>
          </Col>
        </Row>
        <Row style={mainStyles.verticalRowMargin}>
          <Col style={mainStyles.alignItems}>
            <Text style={mainStyles.text}>{'Role: '}</Text>
          </Col>
          <Col>
            <Text style={mainStyles.text}>{UserDetails.role_name}</Text>
          </Col>
        </Row>
        <Row style={mainStyles.verticalRowMargin}>
          <Col style={mainStyles.alignItems}>
            <Text style={mainStyles.text}>{'Email: '}</Text>
          </Col>
          <Col>
            <Text style={mainStyles.text}>{UserDetails.email}</Text>
          </Col>
        </Row>
        <Row style={mainStyles.verticalRowMargin}>
          <Col style={mainStyles.alignItems}>
            <Text style={mainStyles.text}>{'Phone: '}</Text>
          </Col>
          <Col>
            <Text style={mainStyles.text}>{UserDetails.phone}</Text>
          </Col>
        </Row>
        <Row style={mainStyles.verticalRowMargin}>
          <Col style={mainStyles.alignItems}>
            <Text style={mainStyles.text}>{'Company: '}</Text>
          </Col>
          <Col>
            <Text style={mainStyles.text}>{UserDetails.company_name}</Text>
          </Col>
        </Row>

        <Row style={mainStyles.centerContent}>
          <CustomButton title={'Cerrar sesion'} onPress={() => logout()} />
        </Row>
      </Grid>
    </ScrollView>
  );
}
