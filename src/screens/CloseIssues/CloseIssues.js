import React, { useState, useEffect, useContext } from 'react';
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

//Context reducer
import { UserContext } from '../../context/userContext';

var { height, width } = Dimensions.get('window');

const ActiveIssues = ({ navigation }) => {
  //Login context
  const [login, loginAction] = useContext(UserContext);
  const [headers, setHeaders] = useState([
    'ID',
    'Titulo',
    'Compañia',
    'Estado',
    'Prioridad',
  ]);
  const [issues, setIssues] = useState([]);

  const [layout, setLayout] = useState({
    height: height,
    width: width,
  });

  const getFinishedIssues = () => {
    IssuesServices.getFinishedIssues()
      .then((res) => {
        switch (res.code) {
          case 200:
            var issuesArray = utils.jsonArrayToArray(res.data);
            setIssues(issuesArray);
            break;

          default:
            setIssues([]);
            ToastAndroid.show(
              'No hay incidencias cerradas aun',
              ToastAndroid.SHORT
            );
            break;
        }
      })
      .catch((err) => {
        ToastAndroid.show('Ha ocurrido un error', ToastAndroid.SHORT);
        console.log('err', err);
      });
  };

  /**
   * Get Incidencias activas by customer id
   * @param {Number} customerId identifies customer
   */
  const getFinishedIssuesByCustomer = (customerId) => {
    IssuesServices.getFinishedIssuesByCustomer(customerId)
      .then((res) => {
        switch (res.code) {
          case 200:
            var issuesArray = utils.jsonArrayToArray(res.data);
            setIssues(issuesArray);
            break;

          default:
            setIssues([]);
            ToastAndroid.show(
              'No hay incidencias cerradas aun',
              ToastAndroid.SHORT
            );
            break;
        }
      })
      .catch((err) => {
        ToastAndroid.show('Ha ocurrido un error', ToastAndroid.SHORT);
        console.log('err', err);
      });
  };

  useEffect(() => {
    if (login.user.type == 1) {
      getFinishedIssuesByCustomer(login.user.id);
    } else {
      getFinishedIssues();
    }
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      if (login.user.type == 1) {
        getFinishedIssuesByCustomer(login.user.id);
      } else {
        getFinishedIssues();
      }
      return () => {
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
          text: 'Incidencias cerradas',
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
