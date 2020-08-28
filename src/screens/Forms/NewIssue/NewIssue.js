import React, { useState, useContext, useEffect } from 'react';
import {
  Text,
  View,
  Picker,
  Button,
  ScrollView,
  Image,
  ToastAndroid,
} from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { TextInput } from 'react-native-gesture-handler';
import { newIssueFormStyles } from '../../../styles/styles';
import utils from '../../../utils';

//Context reducer
import { UserContext } from '../../../context/userContext';

//Components
import CustomTextInputForm from '../../../components/CustomTextInputForm/CustomTextInputForm';
import { Header } from 'react-native-elements';

//Image picker
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

//Services
import issueServices from '../../../services/issues';

const NewIssue = ({ route, navigation }) => {
  const [login, loginAction] = useContext(UserContext);

  /**
   * user details on components state
   */
  const [UserDetails, setUserDetails] = useState(login.user);

  const [prioritySelected, setPrioritySelected] = useState('L');

  const [issueTitle, setIssueTitle] = useState('');
  const [description, setDescription] = useState('');
  const [evidence, setEvidence] = useState(null);

  const getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  };

  const _pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        base64: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled) {
        setEvidence(result);
      }
    } catch (E) {
      console.log(E);
    }
  };

  const saveIssue = () => {
    let formatRequest = {
      title: issueTitle,
      description: description,
      state: 'CR',
      priority: prioritySelected,
      company_id: UserDetails.company_id,
      customer_id: UserDetails.id,
      evidence: evidence.base64,
    };

    console.log('formatRequest', formatRequest);

    issueServices
      .createIssue(formatRequest)
      .then((res) => {
        switch (res.code) {
          case 200:
            setIssueTitle('');
            setDescription('');
            setEvidence(null);
            setPrioritySelected('L');
            ToastAndroid.show(
              'Novedad creada correctamente',
              ToastAndroid.SHORT
            );
            navigation.navigate('AppSolutions');
            break;

          default:
            ToastAndroid.show('Error', ToastAndroid.SHORT);
            break;
        }
      })
      .catch((err) => {
        ToastAndroid.show('Error' + err, ToastAndroid.SHORT);
        console.log('err', err);
      });
  };

  /**
   * Component did mount
   */
  useEffect(() => {
    getPermissionAsync();
  }, []);

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
          text: 'Nueva novedad',
          style: {
            color: '#fff',
            fontWeight: 'bold',
            textTransform: 'uppercase',
          },
        }}
      />
      <ScrollView style={{ padding: 20 }}>
        <Grid>
          <Row>
            <Text style={newIssueFormStyles.sectionHeader}>Usuario</Text>
          </Row>

          <Row styles={newIssueFormStyles.marginVertical}>
            <Col style={newIssueFormStyles.centerColItems}>
              <Text style={newIssueFormStyles.fieldText}>Cliente:</Text>
              <Text>
                {UserDetails.name}
                {' \n'}
              </Text>
            </Col>
            <Col style={newIssueFormStyles.centerColItems}>
              <Text style={newIssueFormStyles.fieldText}>Compañia:</Text>
              <Text>
                {UserDetails.company_name}
                {' \n'}
              </Text>
            </Col>
          </Row>

          <Row>
            <Col style={newIssueFormStyles.centerColItems}>
              <Text style={newIssueFormStyles.fieldText}>Email:</Text>
              <Text>
                {UserDetails.email}
                {' \n'}
              </Text>
            </Col>
            <Col style={newIssueFormStyles.centerColItems}>
              <Text style={newIssueFormStyles.fieldText}>Telefono:</Text>
              <Text>
                {UserDetails.phone}
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
            <Text style={newIssueFormStyles.sectionHeader}>Incidencia</Text>
          </Row>

          <Row>
            <Col>
              <Text style={[newIssueFormStyles.fieldText, { marginLeft: 9 }]}>
                Titulo:
              </Text>
              <CustomTextInputForm
                placeholder={'Titulo'}
                onChangeText={(text) => setIssueTitle(text)}
                value={issueTitle}
              />
            </Col>
            <Col>
              <Text style={newIssueFormStyles.fieldText}>Prioridad:</Text>
              <Picker
                selectedValue={prioritySelected}
                onValueChange={(itemValue, itemIndex) =>
                  setPrioritySelected(itemValue)
                }
              >
                <Picker.Item label="Low" value="L" color={'green'} />
                <Picker.Item label="Medium" value="M" color={'#ffd966'} />
                <Picker.Item label="High" value="H" color={'red'} />
              </Picker>
            </Col>
          </Row>

          <Row>
            <Col>
              <Text style={newIssueFormStyles.fieldText}>Descripcion:</Text>
              <TextInput
                style={newIssueFormStyles.textArea}
                underlineColorAndroid="transparent"
                placeholder="Escribe una descripcion completa del caso"
                placeholderTextColor="grey"
                numberOfLines={10}
                multiline={true}
                onChangeText={(text) => setDescription(text)}
                value={description}
              />
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

          <Row>
            <Col>
              <Button title="Selecciona archivo" onPress={() => _pickImage()} />

              {evidence && (
                <Image
                  source={{ uri: evidence.uri }}
                  style={{
                    width: 100,
                    height: 100,
                    margin: 10,
                    borderRadius: 10,
                  }}
                />
              )}
            </Col>
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
                onPress={() => navigation.navigate('AppSolutions')}
              />
            </Col>
            <Col
              style={{
                marginHorizontal: 5,
              }}
            >
              <Button
                title={'Crear novedad'}
                color={'red'}
                onPress={() => saveIssue()}
              />
            </Col>
          </Row>
        </Grid>
      </ScrollView>
    </>
  );
};

export default NewIssue;
