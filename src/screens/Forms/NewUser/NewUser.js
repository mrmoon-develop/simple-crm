import React, { useState } from 'react';

//Components
import { Text, Header, Input, Button } from 'react-native-elements';
import { Grid, Row } from 'react-native-easy-grid';
import {
  Picker,
  Dimensions,
  ScrollView,
  View,
  ToastAndroid,
} from 'react-native';

//Window dimensions
var { height, width } = Dimensions.get('window');

//Services
import CompaniesServices from '../../../services/companies';
import UserServices from '../../../services/users';

//React navigation hooks
import { useFocusEffect } from '@react-navigation/native';

//Styles
import { pollStyles } from '../../../styles/styles';

const NewUser = ({ navigation }) => {
  //Form state
  const [userDetails, setUserDetails] = useState({
    name: '',
    phone: '',
    company_id: '',
    type: '',
    email: '',
    password: '',
  });

  //Companies
  const [companies, setCompanies] = useState([]);

  /**
   * Get companies from DB
   */
  const getCompanies = () => {
    CompaniesServices.getCompanies()
      .then((res) => {
        switch (res.code) {
          case 200:
            setCompanies(res.data);
            break;

          default:
            break;
        }
      })
      .catch((err) => {
        ToastAndroid.show('Error' + err, ToastAndroid.SHORT);
        console.log('err', err);
      });
  };

  /**
   * Handle save new user
   */
  const handleSave = () => {
    if (
      userDetails.name == '' ||
      userDetails.company_id == 0 ||
      userDetails.password == '' ||
      userDetails.email == ''
    ) {
      ToastAndroid.show('Llena todos los campos por favor', ToastAndroid.SHORT);
      return null;
    }

    UserServices.createUser(userDetails)
      .then((res) => {
        switch (res.code) {
          case 200:
            ToastAndroid.show(
              'Usuario creado correctamente',
              ToastAndroid.SHORT
            );
            navigation.navigate('AppSolutions');
            break;

          default:
            break;
        }
      })
      .catch((err) => {
        ToastAndroid.show('Error' + err, ToastAndroid.SHORT);
        console.log('err', err);
      });
  };

  /**
   * Component did mount with react navigation for component focus
   */
  useFocusEffect(
    React.useCallback(() => {
      //Do somthing when the screen is focused
      getCompanies();
      return () => {
        setUserDetails({
          name: '',
          phone: '',
          company_id: '',
          type: '',
          email: '',
          password: '',
        });
        // route.params.issueId = null;
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
          onPress: () => {
            navigation.goBack();
          },
        }}
        centerComponent={{
          text: 'Crear usuario',
          style: {
            color: '#fff',
            fontWeight: 'bold',
            textTransform: 'uppercase',
          },
        }}
      />
      <ScrollView style={{ paddingHorizontal: 20 }}>
        <Grid>
          <Row style={pollStyles.marginVertical}>
            <Text style={pollStyles.title}>
              Llena el formulario para crear un nuevo usuario
            </Text>
          </Row>

          <Row style={pollStyles.marginVertical}>
            <Input
              label={'Nombre: '}
              placeholder={'Jhon Doe'}
              leftIcon={{ type: 'font-awesome', name: 'user' }}
              value={userDetails.name}
              onChangeText={(text) =>
                setUserDetails({ ...userDetails, name: text })
              }
            />
          </Row>

          <Row style={pollStyles.marginVertical}>
            <Input
              label={'Telefono: '}
              placeholder={'Ej: 3001212011'}
              leftIcon={{ type: 'font-awesome', name: 'phone' }}
              value={userDetails.phone}
              onChangeText={(text) =>
                setUserDetails({ ...userDetails, phone: text })
              }
            />
          </Row>

          <View style={pollStyles.marginVertical}>
            <Row style={{ marginBottom: 10 }}>
              <Text style={{}}>Compañia:</Text>
            </Row>

            <Row style={pollStyles.rowPicker}>
              <Picker
                style={{ width: width }}
                selectedValue={userDetails.company_id}
                onValueChange={(itemValue, itemIndex) => {
                  setUserDetails({ ...userDetails, company_id: itemValue });
                }}
              >
                <Picker.Item label={'Select...'} value={0} />
                {companies.map((company, i) => (
                  <Picker.Item
                    key={i}
                    label={company.name}
                    value={company.id}
                  />
                ))}
              </Picker>
            </Row>
          </View>

          <View style={pollStyles.marginVertical}>
            <Row style={{ marginBottom: 10 }}>
              <Text style={{}}>Tipo de usuario:</Text>
            </Row>

            <Row style={pollStyles.rowPicker}>
              <Picker
                style={{ width: width }}
                selectedValue={userDetails.type}
                onValueChange={(itemValue, itemIndex) => {
                  setUserDetails({ ...userDetails, type: itemValue });
                }}
              >
                <Picker.Item label={'Select...'} value={0} />
                <Picker.Item label={'Cliente'} value={1} />
                <Picker.Item label={'Tecnico'} value={2} />
              </Picker>
            </Row>
          </View>

          <Row style={pollStyles.marginVertical}>
            <Input
              label={'Email: '}
              placeholder={'Ej: jhondoe@email.com'}
              leftIcon={{ type: 'font-awesome', name: 'envelope' }}
              value={userDetails.email}
              onChangeText={(text) =>
                setUserDetails({ ...userDetails, email: text })
              }
            />
          </Row>

          <Row style={pollStyles.marginVertical}>
            <Input
              label={'Clave: '}
              secureTextEntry={true}
              leftIcon={{ type: 'font-awesome', name: 'lock' }}
              value={userDetails.password}
              onChangeText={(text) =>
                setUserDetails({ ...userDetails, password: text })
              }
            />
          </Row>

          <Row style={[pollStyles.marginVertical, pollStyles.center]}>
            <Button
              title={'Crear usuario'}
              type={'solid'}
              buttonStyle={{
                backgroundColor: 'red',
              }}
              onPress={handleSave}
            />
          </Row>
        </Grid>
      </ScrollView>
    </>
  );
};

export default NewUser;
