import React, { useState, useContext } from 'react';

//Components
import {
  View,
  ScrollView,
  ToastAndroid,
  Picker,
  TextInput,
  Image,
  Button,
  Text,
} from 'react-native';
import { Header } from 'react-native-elements';
import { Grid, Row, Col } from 'react-native-easy-grid';

//React native hooks
import { useFocusEffect, CommonActions } from '@react-navigation/native';
import { newIssueFormStyles } from '../../../styles/styles';

//Services
import IssuesServices from '../../../services/issues';
import UserServices from '../../../services/users';

//Context reducer
import { UserContext } from '../../../context/userContext';
import utils from '../../../utils';

const EditIssue = ({ route, navigation }) => {
  //Login context
  const [login, loginAction] = useContext(UserContext);

  //Issue details
  const [issueDetails, setIssueDetails] = useState({
    title: '',
    description: '',
    customer_name: '',
    company_name: '',
    email: '',
    phone: '',
    attender_id: '',
    area: '',
    response: '',
  });
  //Technical Users
  const [technicalUsers, setTechnicalUsers] = useState([]);
  const [editable, setEditable] = useState(false);

  /**
   * Get issue details
   */
  const getIssueDetails = (issueId) => {
    IssuesServices.getIssue(issueId)
      .then((res) => {
        switch (res.code) {
          case 200:
            setIssueDetails({
              id: res.data.id,
              state: res.data.state,
              priority: res.data.priority,
              title: res.data.title,
              description: res.data.description,
              customer_name: res.data.customer_name,
              company_name: res.data.company_name,
              email: res.data.email,
              phone: res.data.phone,
              attender_id: res.data.attender_id,
              area: res.data.area,
              response: res.data.response,
            });
            break;

          default:
            ToastAndroid.show('Error', ToastAndroid.SHORT);
            setIssueDetails({});
            break;
        }
      })
      .catch((err) => {
        ToastAndroid.show('Error' + err, ToastAndroid.SHORT);
      });
  };

  const getTechnicalUsers = () => {
    UserServices.getTechnicalUsers()
      .then((res) => {
        switch (res.code) {
          case 200:
            setTechnicalUsers(res.data);
            break;

          default:
            break;
        }
      })
      .catch((err) => {
        ToastAndroid.show('Error' + err, ToastAndroid.SHORT);
      });
  };

  /**
   * Handle save
   */
  const handleSave = () => {
    const formatRequestData = {
      id: issueDetails.id,
      attender_id: issueDetails.attender_id,
      state: issueDetails.response && issueDetails.attender_id ? 'F' : 'AS',
      priority: issueDetails.priority,
      area: issueDetails.area,
      response: issueDetails.response,
    };

    console.log('formatRequestData', formatRequestData);

    IssuesServices.updateIssue(formatRequestData)
      .then((res) => {
        switch (res.code) {
          case 200:
            // setIssueDetails(res.data);
            navigation.goBack();
            break;

          default:
            break;
        }
      })
      .catch((err) => {
        console.log('err', err);
        ToastAndroid.show('Error' + err, ToastAndroid.SHORT);
      });
  };

  /**
   * Handle rate issue
   */
  const handleRate = () => {
    navigation.navigate('Poll', { issueId: issueDetails.id });
  };

  /**
   * Component did mount with react navigation for component focus
   */
  useFocusEffect(
    React.useCallback(() => {
      //Do somthing when the screen is focused
      getIssueDetails(route.params.issueId);
      getTechnicalUsers();

      if (login.user.type == 2 && issueDetails.state != 'F') {
        setEditable(true);
      }

      return () => {
        setIssueDetails({});
        // route.params.issueId = null;
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [route.params.issueId])
  );

  return (
    <>
      <Header
        statusBarProps={{ barStyle: 'default' }}
        backgroundColor={'red'}
        leftComponent={{
          icon: 'chevron-left',
          color: '#fff',
          onPress: () => {
            navigation.goBack();
          },
        }}
        centerComponent={{
          text: editable ? 'Editar novedad' : 'Visualizar novedad',
          style: {
            color: '#fff',
            fontWeight: 'bold',
            textTransform: 'uppercase',
          },
        }}
      />
      <ScrollView style={{ paddingHorizontal: 20 }}>
        <Grid>
          <Row>
            <Text style={newIssueFormStyles.sectionHeader}>Usuario</Text>
          </Row>

          <Row styles={newIssueFormStyles.marginVertical}>
            <Col style={newIssueFormStyles.centerColItems}>
              <Text style={newIssueFormStyles.fieldText}>Cliente:</Text>
              <Text>
                {issueDetails.customer_name}
                {' \n'}
              </Text>
            </Col>
            <Col style={newIssueFormStyles.centerColItems}>
              <Text style={newIssueFormStyles.fieldText}>Empresa:</Text>
              <Text>
                {issueDetails.company_name}
                {' \n'}
              </Text>
            </Col>
          </Row>

          <Row>
            <Col style={newIssueFormStyles.centerColItems}>
              <Text style={newIssueFormStyles.fieldText}>Email:</Text>
              <Text>
                {issueDetails.email}
                {' \n'}
              </Text>
            </Col>
            <Col style={newIssueFormStyles.centerColItems}>
              <Text style={newIssueFormStyles.fieldText}>Telefono:</Text>
              <Text>
                {issueDetails.phone}
                {' \n'}
              </Text>
            </Col>
          </Row>

          <View
            style={{
              borderBottomColor: 'black',
              borderBottomWidth: 1,
              marginVertical: 20,
            }}
          />

          <Row style={{ marginBottom: 10 }}>
            <Text style={newIssueFormStyles.sectionHeader}>
              Novedad #{route.params.issueId}{' '}
            </Text>
          </Row>

          <Row>
            <Col>
              <Text style={[newIssueFormStyles.fieldText, { marginLeft: 9 }]}>
                Titulo:
              </Text>
              <Text style={[newIssueFormStyles.fieldText, { marginLeft: 9 }]}>
                {issueDetails.title}
                {' \n'}
              </Text>
            </Col>
            <Col>
              <Text style={newIssueFormStyles.fieldText}>Prioridad:</Text>
              <Picker
                selectedValue={issueDetails.priority}
                enabled={editable}
                onValueChange={(itemValue, itemIndex) => {
                  setIssueDetails({ ...issueDetails, priority: itemValue });
                }}
              >
                <Picker.Item label="Low" value="L" color={'green'} />
                <Picker.Item label="Medium" value="M" color={'#ffd966'} />
                <Picker.Item label="High" value="H" color={'red'} />
              </Picker>
            </Col>
          </Row>

          <Row>
            <Col>
              <Text style={newIssueFormStyles.fieldText}>Area:</Text>
              <Picker
                selectedValue={issueDetails.area}
                enabled={editable}
                onValueChange={(itemValue, itemIndex) =>
                  setIssueDetails({ ...issueDetails, area: itemValue })
                }
              >
                <Picker.Item label="Select..." value="" />
                <Picker.Item label="Soporte" value="S" />
                <Picker.Item label="Desarrollo" value="D" />
                <Picker.Item label="Proyectos" value="P" />
              </Picker>
            </Col>
          </Row>

          <Row>
            <Col>
              <Text style={newIssueFormStyles.fieldText}>Descripcion:</Text>
              <TextInput
                style={newIssueFormStyles.textArea}
                editable={false}
                underlineColorAndroid="transparent"
                placeholder="Escribe una descripcion completa del caso"
                placeholderTextColor="grey"
                numberOfLines={10}
                multiline={true}
                value={issueDetails.description}
              />
            </Col>
          </Row>

          <Row>
            <Col>
              <Text style={newIssueFormStyles.fieldText}>Respuesta:</Text>
              <TextInput
                style={newIssueFormStyles.textArea}
                underlineColorAndroid="transparent"
                placeholder="Escribe una descripcion completa del caso"
                placeholderTextColor="grey"
                numberOfLines={10}
                multiline={true}
                editable={editable}
                onChangeText={(text) => {
                  setIssueDetails({ ...issueDetails, response: text });
                }}
                value={issueDetails.response}
              />
            </Col>
          </Row>

          <Row>
            <Col style={{ alignSelf: 'center' }}>
              <Text style={newIssueFormStyles.fieldText}>Atendido por:</Text>
            </Col>
            <Col>
              <Picker
                selectedValue={issueDetails.attender_id}
                style={{ height: 50, width: 150 }}
                enabled={editable}
                onValueChange={(itemValue, itemIndex) => {
                  setIssueDetails({ ...issueDetails, attender_id: itemValue });
                }}
              >
                <Picker.Item label={'Select...'} value={''} />
                {technicalUsers.map((technical, i) => {
                  return (
                    <Picker.Item
                      key={i}
                      label={technical.name}
                      value={technical.id}
                    />
                  );
                })}
              </Picker>
            </Col>
          </Row>

          <View
            style={{
              borderBottomColor: 'black',
              borderBottomWidth: 1,
              marginVertical: 20,
            }}
          />

          <Row>
            <Col>
              <Text>Evidencias:{'\n'}</Text>
            </Col>
          </Row>

          <Row style={{ alignSelf: 'center' }}>
            {issueDetails.evidence && (
              <Image
                source={{
                  uri: `data:image/png;base64,${issueDetails.evidence}`,
                }}
                style={{
                  width: 340,
                  height: 340,
                  margin: 10,
                  borderRadius: 10,
                }}
              />
            )}
          </Row>

          <Row
            style={{
              marginVertical: 30,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Col
              style={{
                marginHorizontal: 5,
              }}
            >
              <Button
                title={'Atras'}
                color={'gray'}
                onPress={() => navigation.goBack()}
              />
            </Col>

            {issueDetails.state == 'F' ? (
              <Col
                style={{
                  marginHorizontal: 5,
                }}
              >
                <Button
                  title={'Encuesta'}
                  color={'red'}
                  onPress={() => handleRate()}
                />
              </Col>
            ) : (
              editable && (
                <Col
                  style={{
                    marginHorizontal: 5,
                  }}
                >
                  <Button
                    title={'Guardar'}
                    color={'red'}
                    disabled={issueDetails.state == 'F'}
                    onPress={() => handleSave()}
                  />
                </Col>
              )
            )}
          </Row>
        </Grid>
      </ScrollView>
    </>
  );
};

export default EditIssue;
