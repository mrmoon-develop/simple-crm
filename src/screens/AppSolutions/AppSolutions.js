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
import { Header, Overlay, Button } from 'react-native-elements';

//Resources
import noProfileImage from '../../resources/images/no-profile-img.png';
import CustomButton from '../../components/CustomButton/CustomButton';

// import AppSolutions from './views/AppSolutions/AppSolutions';
// import NewIssue from '../Forms/NewIssue/NewIssue';
// import ActiveISsues from '../ActiveIssues/ActiveIssues';
// import Poll from '../Forms/Poll/Poll';
// import CloseIssues from '../CloseIssues/CloseIssues';

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
        <Text style={styles.alignCenter}>New Issue {'\n'}</Text>
        <Text style={styles.alignCenter}>
          Need help? Choose service's category and send details to our technical
          support team.
        </Text>
      </View>
    </TouchableHighlight>
  );
};

const ActiveIssuesButton = ({ navigation }) => {
  return (
    <TouchableHighlight
      onPress={() => navigation.navigate('Active Issues')}
      underlayColor="white"
      style={{ padding: 20 }}
    >
      <View style={styles.center}>
        <Image
          source={ActiveIssuesImg}
          style={{ width: 100, height: 100, alignSelf: 'center' }}
        />
        <Text style={styles.alignCenter}>Active Issues {'\n'}</Text>
        <Text style={styles.alignCenter}>
          Check your active issues, check progress, add comments, attach extra
          data, understand solution.
        </Text>
      </View>
    </TouchableHighlight>
  );
};

const PQRButton = ({ navigation }) => {
  return (
    <TouchableHighlight
      onPress={() => navigation.navigate('New Issue')}
      underlayColor="white"
      style={{ padding: 20 }}
    >
      <View style={styles.center}>
        <Image
          source={PQRImg}
          style={{ width: 100, height: 100, alignSelf: 'center' }}
        />
        <Text style={styles.alignCenter}>PQR {'\n'}</Text>
        <Text style={styles.alignCenter}>
          Petitions, claims and rosources as frecuently questions from users.
        </Text>
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
        <Text style={styles.alignCenter}>Closed Issues {'\n'}</Text>
        <Text style={styles.alignCenter}>
          Here you can check finished issues.
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
    // <TouchableOpacity
    //   onPress={() => navigation.navigate('Profile')}
    //   underlayColor="white"
    //   style={{ padding: 30 }}
    // >
    //   <View style={[mainStyles.userDetailsContainer]}>
    //     <Text style={mainStyles.userDetailsText}>
    //       Bienvenido{' '}
    //       {utils.isNullOrEmpty(UserDetails.name) && !UserDetails.name
    //         ? ''
    //         : UserDetails.name}
    //     </Text>
    //     <Text style={mainStyles.userDetailsText}>{UserDetails.role_name}</Text>
    //     <Text style={mainStyles.userDetailsText}>
    //       {utils.isNullOrEmpty(UserDetails.company_name) &&
    //       !UserDetails.company_name
    //         ? ''
    //         : UserDetails.company_name}
    //     </Text>
    //   </View>
    // </TouchableOpacity>
  );
};

const AppSolutions = ({ navigation }) => {
  return (
    <>
      <UserDetails navigation={navigation} />
      <Grid>
        <Row style={{ marginTop: 30 }}>
          <Col>
            <NewIssueButton navigation={navigation} />
          </Col>
          <Col>
            <ActiveIssuesButton navigation={navigation} />
          </Col>
        </Row>

        <Row>
          <Col>
            <PQRButton navigation={navigation} />
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
