import React, { useContext, useState } from 'react';

//Components
import {
  ScrollView,
  View,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { Text, Header, Image } from 'react-native-elements';

//Resources
import PollsExcel from '../../resources/images/reports/polls-excel.png';
import { Grid, Row, Col } from 'react-native-easy-grid';

//Context reducer
import { UserContext } from '../../context/userContext';

//React navigation hook
import { useFocusEffect } from '@react-navigation/native';

//Services
import PollsServices from '../../services/polls';

const Reports = ({ navigation }) => {
  //Login context
  const [login, loginAction] = useContext(UserContext);

  /**
   * Toggle overlay
   */
  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const generatePollsReport = () => {
    const requestFormat = {
      company_id: login.user.company_id,
    };

    PollsServices.getPollsReportByCompany(requestFormat)
      .then((res) => {
        switch (res.code) {
          case 200:
            Linking.canOpenURL(res.data).then((supported) => {
              if (supported) {
                Linking.openURL(res.data);
              } else {
                console.log("Don't know how to open URI: " + res.data);
              }
            });
            toggleOverlay();
            break;

          default:
            break;
        }
      })
      .catch((err) => {
        console.log('err', err);
        return err;
      });
  };

  return (
    <>
      <Header
        statusBarProps={{ barStyle: 'default' }}
        backgroundColor={'red'}
        centerComponent={{
          text: 'Reportes',
          style: {
            color: '#fff',
            fontWeight: 'bold',
            textTransform: 'uppercase',
          },
        }}
        leftComponent={{
          icon: 'chevron-left',
          color: '#fff',
          onPress: () => {
            navigation.goBack();
          },
        }}
      />
      <ScrollView>
        <TouchableOpacity onPress={generatePollsReport}>
          <Grid>
            <Row style={{ marginVertical: 20 }}>
              <Col size={30} style={{ alignSelf: 'center' }}>
                <Image
                  source={PollsExcel}
                  style={{ width: 100, height: 100, marginLeft: 10 }}
                />
              </Col>
              <Col size={70} style={{ alignSelf: 'center' }}>
                <Text h4 h4Style={{ fontSize: 20 }}>
                  Reporte de encuestas
                </Text>
                <Text style={{ textAlignVertical: 'center' }}>
                  Genera un informe de las encuestas realizadas por los clientes
                </Text>
              </Col>
            </Row>
          </Grid>
        </TouchableOpacity>
      </ScrollView>
    </>
  );
};

export default Reports;
