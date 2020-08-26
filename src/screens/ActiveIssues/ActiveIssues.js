import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ToastAndroid,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
  Cols,
  Cell,
} from 'react-native-table-component';

import { Icon, Header } from 'react-native-elements';

import IssuesServices from '../../services/issues';
import utils from '../../utils';

//Hook for react navigation
import { useFocusEffect, CommonActions } from '@react-navigation/native';
import { newIssueFormStyles } from '../../styles/styles';

var { height, width } = Dimensions.get('window');

const ActiveIssues = ({ navigation }) => {
  const [widthArr, setWidthArr] = useState([
    40,
    60,
    80,
    100,
    120,
    140,
    160,
    180,
    200,
  ]);
  const [headers, setHeaders] = useState(['ID', 'Title', 'State', 'Priority']);
  const [issues, setIssues] = useState([
    [1, 'Prueba', 'Assigned', 'Medium'],
    [2, 'Prueba', 'Assigned', 'Medium'],
  ]);

  const [layout, setLayout] = useState({
    height: height,
    width: width,
  });

  const _onLayout = (event) => {
    console.log(
      '------------------------------------------------' +
        JSON.stringify(event.nativeEvent.layout)
    );

    // console.log('layout', layout);

    setLayout({
      height: event.nativeEvent.layout.height,
      width: event.nativeEvent.layout.width,
    });
  };

  const getActiveIssues = () => {
    IssuesServices.getActiveIssues().then((res) => {
      switch (res.code) {
        case 200:
          var issuesArray = utils.jsonArrayToArray(res.data);
          // console.log('Object.keys(res.data[0])', Object.keys(res.data[0]));
          // setHeaders(Object.keys(res.data[0]));
          setIssues(issuesArray);
          break;

        default:
          setIssues([]);
          ToastAndroid.show('An error has ocurred', ToastAndroid.SHORT);
          break;
      }
    });
  };

  useEffect(() => {
    getActiveIssues();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      getActiveIssues();
      return () => {
        setIssues([]);

        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [])
  );

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
          text: 'Novedades activas',
          style: {
            color: '#fff',
            fontWeight: 'bold',
            textTransform: 'uppercase',
          },
        }}
      />

      <Text
        style={{
          marginHorizontal: 20,
          marginBottom: 10,
          marginVertical: 20,
          fontSize: 30,
        }}
      >
        Toca una novedad para visualizarla
      </Text>
      <ScrollView horizontal={true} style={{ marginVertical: 10 }}>
        <View
          style={{
            width: layout.width - 10,
            margin: 5,
          }}
        >
          <Table borderStyle={{ borderColor: '#C1C0B9' }}>
            <Row
              data={headers}
              style={styles.head}
              textStyle={styles.textHeader}
            />
          </Table>
          <ScrollView style={styles.dataWrapper}>
            <Table borderStyle={{ borderColor: '#C1C0B9' }}>
              {issues.map((dataRow, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    console.log('dataRow[0]', dataRow[0]);
                    // navigation.navigate('Edit Issue', { issueId: dataRow[0] });
                    navigation.dispatch(
                      CommonActions.navigate('Edit Issue', {
                        issueId: dataRow[0],
                      })
                    );
                  }}
                >
                  <Row
                    data={dataRow}
                    // widthArr={widthArr}
                    style={[
                      styles.row,
                      index % 2 && { backgroundColor: '#ffffff' },
                    ]}
                    textStyle={styles.text}
                  />
                </TouchableOpacity>
              ))}
            </Table>
          </ScrollView>
        </View>
      </ScrollView>
    </>
  );
};

export default ActiveIssues;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 30,
    backgroundColor: '#ffffff',
  },
  head: {
    height: 50,
    backgroundColor: '#FF8D74',
  },
  text: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'black',
  },
  textHeader: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white',
  },
  dataWrapper: {
    marginTop: -1,
  },
  row: {
    height: 60,
    backgroundColor: '#F7F8FA',
  },
});
