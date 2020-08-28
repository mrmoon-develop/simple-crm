import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  Image,
  StyleSheet,
} from 'react-native';

//Resources
import NewUserImg from '../../resources/images/no-profile-img.png';
import noProfileImage from '../../resources/images/no-profile-img.png';

//Components
import { Grid, Row, Col } from 'react-native-easy-grid';
import { Header, Overlay } from 'react-native-elements';

//Context reducer
import { UserContext } from '../../context/userContext';
import { mainStyles } from '../../styles/styles';
import utils from '../../utils';
import CustomButton from '../../components/CustomButton/CustomButton';

const NewUserButton = ({ navigation }) => {
  return (
    <TouchableHighlight
      onPress={() => navigation.navigate('New User')}
      underlayColor="white"
      style={{ padding: 20, maxHeight: 200 }}
    >
      <View style={styles.center}>
        <Image
          source={NewUserImg}
          style={{
            width: 100,
            height: 100,
            alignSelf: 'center',
          }}
        />
        <Text style={styles.alignCenter}>Nuevo usuario {'\n'}</Text>
        <Text style={styles.alignCenter}>
          Aqui puedes crear un nuevo usuario
        </Text>
      </View>
    </TouchableHighlight>
  );
};

const UserDetails = ({ navigation }) => {
  const [login, loginAction] = useContext(UserContext);
  /**
   * user details on components state
   */
  const [UserDetails, setUserDetails] = useState(login.user);

  /**
   * State for overlay
   */
  const [visible, setVisible] = useState(false);

  /**
   * Toggle overlay
   */
  const toggleOverlay = () => {
    setVisible(!visible);
  };

  return (
    <>
      <Header
        statusBarProps={{ barStyle: 'default' }}
        backgroundColor={'red'}
        leftComponent={{
          icon: 'chevron-left',
          color: '#fff',
          onPress: () => {
            console.log('Entreee');
            navigation.navigate('HomeStack', { screen: 'AppSolutions' });
          },
        }}
        centerComponent={{
          text: 'App Solutions',
          style: {
            color: '#fff',
            fontWeight: 'bold',
            textTransform: 'uppercase',
          },
        }}
        rightComponent={{
          icon: 'account-circle',
          color: '#fff',
          onPress: () => toggleOverlay(),
        }}
      />
      <Overlay
        isVisible={visible}
        onBackdropPress={toggleOverlay}
        overlayStyle={{
          height: 500,
          width: 350,
        }}
      >
        <Grid>
          <Row style={{ alignSelf: 'center' }}>
            <Image
              source={noProfileImage}
              style={{ height: 100, width: 100 }}
            />
          </Row>
          <Row style={{ alignSelf: 'center' }}>
            <Text style={mainStyles.overlayText}>
              Bienvenido{' '}
              {utils.isNullOrEmpty(UserDetails.name) && !UserDetails.name
                ? ''
                : UserDetails.name}
            </Text>
          </Row>
          <Row style={{ alignSelf: 'center' }}>
            <Text style={{ color: 'black' }}>{UserDetails.role_name}</Text>
          </Row>
          <Row style={{ alignSelf: 'center' }}>
            <Text style={{ color: 'black' }}>
              {utils.isNullOrEmpty(UserDetails.company_name) &&
              !UserDetails.company_name
                ? ''
                : UserDetails.company_name}
            </Text>
          </Row>
          <Row style={{ alignSelf: 'center' }}>
            <CustomButton
              transparent={false}
              title={'Cerrar sesion'}
              onPress={() => logout()}
              style={{ backgroundColor: 'red' }}
            />
          </Row>
        </Grid>
      </Overlay>
    </>
  );
};

const Settings = ({ navigation }) => {
  return (
    <>
      <UserDetails navigation={navigation} />
      <Grid>
        <Row style={{ marginTop: 30, alignSelf: 'center' }}>
          <NewUserButton navigation={navigation} />
        </Row>
      </Grid>
    </>
  );
};

export default Settings;

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  col: {
    flex: 2,
    height: 100,
    // flexDirection: 'column',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  center: {
    justifyContent: 'center',
    textAlign: 'center',
  },
  alignCenter: {
    alignSelf: 'center',
    textAlign: 'center',
    // justifyContent: 'center',
  },
});
