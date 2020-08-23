import React from 'react';
import { Col, Row, Grid } from 'react-native-easy-grid';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

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
          source={{
            uri: 'https://reactnative.dev/docs/assets/p_cat2.png',
          }}
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
          source={{
            uri: 'https://reactnative.dev/docs/assets/p_cat2.png',
          }}
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
          source={{
            uri: 'https://reactnative.dev/docs/assets/p_cat2.png',
          }}
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
          source={{
            uri: 'https://reactnative.dev/docs/assets/p_cat2.png',
          }}
          style={{ width: 100, height: 100, alignSelf: 'center' }}
        />
        <Text style={styles.alignCenter}>Close Issues {'\n'}</Text>
        <Text style={styles.alignCenter}>
          Here you can check finished issues.
        </Text>
      </View>
    </TouchableHighlight>
  );
};

const AppSolutions = ({ navigation }) => {
  return (
    <Grid>
      <Row>
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
