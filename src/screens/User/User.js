import React, { useState, useContext, useEffect } from 'react';

//Components
import { Header } from 'react-native-elements';
import { Text, Image, ScrollView } from 'react-native';

//Resources
import noProfileImage from '../../resources/images/no-profile-img.png';

//Styles
import { mainStyles } from '../../styles/styles';

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
   * user details on components state
   */
  const [UserDetails, setUserDetails] = useState(login.user);

  /**
   * Handle logout
   */
  const logout = () => {
    loginAction({
      type: 'logout',
    });
    navigation.replace('AuthStack', { screen: 'Login' });
  };

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
    <>
      <Header
        statusBarProps={{ barStyle: 'default' }}
        backgroundColor={'red'}
        leftComponent={{
          icon: 'chevron-left',
          color: '#fff',
          onPress: () => navigation.navigate('AppSolutions'),
        }}
        centerComponent={{
          text: 'Mi perfil',
          style: {
            color: '#fff',
            fontWeight: 'bold',
            textTransform: 'uppercase',
          },
        }}
      />
      <ScrollView>
        <Grid style={{ padding: 20 }}>
          <Row style={[mainStyles.centerContent, { marginBottom: 40 }]}>
            <Image
              source={noProfileImage}
              style={{ height: 200, width: 200 }}
            />
          </Row>
          <Row style={mainStyles.verticalRowMargin}>
            <Col style={mainStyles.alignItems}>
              <Text style={mainStyles.text}>{'Nombre: '}</Text>
            </Col>
            <Col>
              <Text style={mainStyles.text}>{UserDetails.name}</Text>
            </Col>
          </Row>
          <Row style={mainStyles.verticalRowMargin}>
            <Col style={mainStyles.alignItems}>
              <Text style={mainStyles.text}>{'Rol: '}</Text>
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
              <Text style={mainStyles.text}>{'Telefono: '}</Text>
            </Col>
            <Col>
              <Text style={mainStyles.text}>{UserDetails.phone}</Text>
            </Col>
          </Row>
          <Row style={mainStyles.verticalRowMargin}>
            <Col style={mainStyles.alignItems}>
              <Text style={mainStyles.text}>{'Compañia: '}</Text>
            </Col>
            <Col>
              <Text style={mainStyles.text}>{UserDetails.company_name}</Text>
            </Col>
          </Row>

          <Row style={mainStyles.centerContent}>
            <CustomButton
              transparent={false}
              title={'Cerrar sesion'}
              onPress={() => logout()}
              style={{ backgroundColor: 'red' }}
            />
          </Row>
        </Grid>
      </ScrollView>
    </>
  );
}
