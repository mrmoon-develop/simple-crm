import React from 'react';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { StyleSheet, Text, View, Image } from 'react-native';

const NewIssueButton = () => {
  return (
    <View>
      <Image
        source={{
          uri: 'https://reactnative.dev/docs/assets/p_cat2.png',
        }}
        style={{ width: 100, height: 100 }}
      />
      <Text>New Issue {'\n'}</Text>
      <Text>
        Need help? Choose service's category and send details to our technical
        support team.
      </Text>
    </View>
  );
};

const ActiveIssuesButton = () => {
  return (
    <View>
      <Image
        source={{
          uri: 'https://reactnative.dev/docs/assets/p_cat2.png',
        }}
        style={{ width: 100, height: 100 }}
      />
      <Text>Active Issues {'\n'}</Text>
      <Text>
        Check your active issues, check progress, add comments, attach extra
        data, understand solution.
      </Text>
    </View>
  );
};

const PQRButton = () => {
  return (
    <View>
      <Image
        source={{
          uri: 'https://reactnative.dev/docs/assets/p_cat2.png',
        }}
        style={{ width: 100, height: 100 }}
      />
      <Text>PQR {'\n'}</Text>
      <Text>
        Petitions, claims and rosources as frecuently questions from users.
      </Text>
    </View>
  );
};

const CloseIssuesButton = () => {
  return (
    <View>
      <Image
        source={{
          uri: 'https://reactnative.dev/docs/assets/p_cat2.png',
        }}
        style={{ width: 100, height: 100 }}
      />
      <Text>Close Issues {'\n'}</Text>
      <Text>Here you can check finished issues.</Text>
    </View>
  );
};

const AppSolutions = () => {
  return (
    <Grid>
      <Row>
        <Col>
          <NewIssueButton />
        </Col>
        <Col>
          <ActiveIssuesButton />
        </Col>
      </Row>

      <Row>
        <Col>
          <PQRButton />
        </Col>
        <Col>
          <CloseIssuesButton />
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
});
