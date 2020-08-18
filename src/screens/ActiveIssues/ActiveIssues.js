import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ToastAndroid,
  ScrollView,
  Dimensions,
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

import IssuesServices from '../../services/issues';
import utils from '../../utils';

var { height, width } = Dimensions.get('window');

const ActiveIssues = () => {
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

    console.log('layout', layout);

    setLayout({
      height: event.nativeEvent.layout.height,
      width: event.nativeEvent.layout.width,
    });
  };

  const getActiveIssues = () => {
    IssuesServices.getActiveIssues().then((res) => {
      switch (res.code) {
        case 200:
          var array = utils.jsonArrayToArray(res.data);
          setHeaders(Object.keys(res.data[0]));
          setIssues(array);
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

  return (
    <View style={styles.container}>
      <Text style={{ textTransform: 'uppercase', margin: 20 }}>
        Active Issues
      </Text>
      <ScrollView horizontal={true}>
        <View
          onLayout={(event) => _onLayout(event)}
          style={{
            // backgroundColor: 'green',
            height: layout.height - 10,
            width: layout.width - 10,
            margin: 5,
          }}
        >
          <Table borderStyle={{ borderColor: '#C1C0B9' }}>
            <Row
              data={headers}
              widthArr={widthArr}
              style={styles.head}
              textStyle={styles.text}
            />
          </Table>
          <ScrollView style={styles.dataWrapper}>
            <Table borderStyle={{ borderColor: '#C1C0B9' }}>
              {issues.map((dataRow, index) => (
                <Row
                  key={index}
                  data={dataRow}
                  widthArr={widthArr}
                  style={[
                    styles.row,
                    index % 2 && { backgroundColor: '#ffffff' },
                  ]}
                  textStyle={styles.text}
                />
              ))}
            </Table>
          </ScrollView>
        </View>
      </ScrollView>
    </View>
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
    backgroundColor: '#d9f1f7',
  },
  text: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  dataWrapper: {
    marginTop: -1,
  },
  row: {
    height: 60,
    backgroundColor: '#F7F8FA',
  },
});
