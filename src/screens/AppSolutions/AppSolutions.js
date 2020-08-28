import React, { useContext, useState } from 'react';
import { Col, Row, Grid } from 'react-native-easy-grid';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';

//Context reducer
import { UserContext } from '../../context/userContext';

//Styles
import { mainStyles } from '../../styles/styles';
import colors from '../../styles/colors';

//Resources
import NewIssueImg from '../../resources/images/app-solutions-view/new-issue.png';
import ActiveIssuesImg from '../../resources/images/app-solutions-view/active-issues.png';
import PQRImg from '../../resources/images/app-solutions-view/pqr.png';
import ClosedIssuesImg from '../../resources/images/app-solutions-view/closed-issues.png';
import utils from '../../utils';
import { Header, Overlay, Button, Badge } from 'react-native-elements';

//Resources
import noProfileImage from '../../resources/images/no-profile-img.png';
import CustomButton from '../../components/CustomButton/CustomButton';

//Services
import IssuesServices from '../../services/issues';
import { useFocusEffect } from '@react-navigation/native';

const NewIssueButton = ({ navigation }) => {
  return (
    <TouchableHighlight
      onPress={() => navigation.navigate('New Issue')}
      underlayColor="white"
      style={{ padding: 20 }}
    >
      <View style={styles.center}>
        <Image
          source={NewIssueImg}
          style={{
            width: 100,
            height: 100,
            alignSelf: 'center',
          }}
        />
        <Text style={styles.alignCenter}>Nueva Incidencia {'\n'}</Text>
        <Text style={styles.alignCenter}>
          Envie su caso a nuestro equipo de soporte tecnico.
        </Text>
      </View>
    </TouchableHighlight>
  );
};

const ActiveIssuesButton = ({ navigation, activeIssues }) => {
  return (
    <TouchableHighlight
      onPress={() => navigation.navigate('Active Issues')}
      underlayColor="white"
      style={{ padding: 20 }}
    >
      <View style={styles.center}>
        <Badge
          status="success"
          containerStyle={{ position: 'absolute', top: 0, right: 20 }}
          // textStyle={{ fontSize: 40 }}
          value={activeIssues}
        />
        <Image
          source={ActiveIssuesImg}
          style={{ width: 100, height: 100, alignSelf: 'center' }}
        />
        <Text style={styles.alignCenter}>Incidencias Activas {'\n'}</Text>
        <Text style={styles.alignCenter}>Revise sus peticiones en curso</Text>
      </View>
    </TouchableHighlight>
  );
};

const Reports = ({ navigation }) => {
  return (
    <TouchableHighlight
      onPress={() => navigation.navigate('Reports')}
      underlayColor="white"
      style={{ padding: 20 }}
    >
      <View style={styles.center}>
        <Image
          source={PQRImg}
          style={{ width: 100, height: 100, alignSelf: 'center' }}
        />
        <Text style={styles.alignCenter}>Informes {'\n'}</Text>
        <Text style={styles.alignCenter}>Informes y documentos</Text>
      </View>
    </TouchableHighlight>
  );
};

const ClosedIssuesButton = ({ navigation }) => {
  return (
    <TouchableHighlight
      onPress={() => navigation.navigate('Closed Issues')}
      underlayColor="white"
      style={{ padding: 20 }}
    >
      <View style={styles.center}>
        <Image
          source={ClosedIssuesImg}
          style={{ width: 100, height: 100, alignSelf: 'center' }}
        />
        <Text style={styles.alignCenter}>Incidencias cerradas {'\n'}</Text>
        <Text style={styles.alignCenter}>Revise sus incidencias cerradas</Text>
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

const AppSolutions = ({ navigation }) => {
  //Login context
  const [login, loginAction] = useContext(UserContext);

  const [activeIssues, setActiveIssues] = useState();

  /**
   * Get active issues by customer id
   * @param {Number} customerId identifies customer
   */
  const getActiveIssuesByCustomer = (customerId) => {
    IssuesServices.getActiveIssuesByCustomer(customerId)
      .then((res) => {
        switch (res.code) {
          case 200:
            console.log('res.data.length', res.data.length);
            setActiveIssues(res.data.length);
            break;

          default:
            setActiveIssues([]);
            ToastAndroid.show('An error has ocurred', ToastAndroid.SHORT);
            break;
        }
      })
      .catch((err) => {
        ToastAndroid.show('An error has ocurred', ToastAndroid.SHORT);
        console.log('err', err);
      });
  };

  /**
   * Get general active issues
   */
  const getActiveIssues = () => {
    IssuesServices.getActiveIssues()
      .then((res) => {
        switch (res.code) {
          case 200:
            console.log('res.data.length', res.data.length);
            setActiveIssues(res.data.length);
            break;

          default:
            setActiveIssues([]);
            ToastAndroid.show('An error has ocurred', ToastAndroid.SHORT);
            break;
        }
      })
      .catch((err) => {
        ToastAndroid.show('An error has ocurred', ToastAndroid.SHORT);
        console.log('err', err);
      });
  };

  useFocusEffect(
    React.useCallback(() => {
      console.log('login.user.type', login.user.type);
      if (login.user.type == 1) {
        getActiveIssuesByCustomer(login.user.id);
      } else {
        getActiveIssues();
      }
      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [])
  );

  return (
    <>
      <UserDetails navigation={navigation} />
      <Grid>
        <Row style={{ marginTop: 30 }}>
          <Col>
            <NewIssueButton navigation={navigation} />
          </Col>
          <Col>
            <View>
              <ActiveIssuesButton
                navigation={navigation}
                activeIssues={activeIssues}
              />
            </View>
          </Col>
        </Row>

        <Row>
          <Col>
            <Reports navigation={navigation} />
          </Col>
          <Col>
            <ClosedIssuesButton navigation={navigation} />
          </Col>
        </Row>
      </Grid>
    </>
  );
};

export default AppSolutions;

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
