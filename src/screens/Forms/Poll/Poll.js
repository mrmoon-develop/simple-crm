import React, { useState, useContext } from 'react';

//Components
import { ScrollView, Picker, TextInput, Button } from 'react-native';
import { Grid, Row, Col } from 'react-native-easy-grid';
import { Text, Header } from 'react-native-elements';

//Styles
import { pollStyles } from '../../../styles/styles';

//Services
import PollServices from '../../../services/polls';

//React navigation hooks
import { useFocusEffect } from '@react-navigation/native';

//Context reducer
import { UserContext } from '../../../context/userContext';

const Poll = ({ route, navigation }) => {
  //Login context
  const [login, loginAction] = useContext(UserContext);

  //Enable form
  const [enabled, setEnabled] = useState(false);

  //Form inputs
  const [questions, setQuestions] = useState({
    q1: 0,
    q2: 0,
    q3: 0,
    q4: 0,
    q5: 0,
    comment: '',
  });

  /**
   * Save data on db
   */
  const handleSave = () => {
    let formatRequest = {
      q1: questions.q1,
      q2: questions.q2,
      q3: questions.q3,
      q4: questions.q4,
      q5: questions.q5,
      comment: questions.comment,
    };

    console.log('formatRequest', formatRequest);
  };

  /**
   * Get poll details by issue
   */
  const getPollDetails = (issueId) => {
    PollServices.getPollByIssue(issueId)
      .then((res) => {
        switch (res.code) {
          case 200:
            console.log('res.data', res.data);
            setQuestions(res.data);
            setEnabled(false);
            break;

          default:
            if (login.user.type === 2) {
              setEnabled(false);
            } else {
              setEnabled(true);
            }
            break;
        }
      })
      .catch((err) => {
        console.log('err', err);
        ToastAndroid.show('Error' + err, ToastAndroid.SHORT);
      });
  };

  /**
   * Component did mount with react navigation for component focus
   */
  useFocusEffect(
    React.useCallback(() => {
      //Do somthing when the screen is focused
      getPollDetails(route.params.issueId);
      // getTechnicalUsers();
      return () => {
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
          text: 'Encuesta',
          style: {
            color: '#fff',
            fontWeight: 'bold',
            textTransform: 'uppercase',
          },
        }}
      />
      <ScrollView>
        <Grid style={pollStyles.container}>
          <Row>
            <Text style={pollStyles.title}>Encuesta: {'\n'}</Text>
          </Row>

          <Row>
            <Text style={pollStyles.subtitle}>
              Se siente satisfecho con la atencion del servicio? {'\n'}
            </Text>
          </Row>

          <Row style={pollStyles.rowPicker}>
            <Picker
              enabled={enabled}
              style={{ height: 50, width: 350 }}
              selectedValue={questions.q1}
              onValueChange={(itemValue, itemIndex) => {
                setQuestions({ ...questions, q1: itemValue });
              }}
            >
              <Picker.Item label="No" value={0} />
              <Picker.Item label="Yes" value={1} />
            </Picker>
          </Row>

          <Row>
            <Text style={pollStyles.subtitle}>
              La solucion del caso fue oportunda?{'\n'}
            </Text>
          </Row>

          <Row style={pollStyles.rowPicker}>
            <Picker
              enabled={enabled}
              style={{ height: 50, width: 350 }}
              selectedValue={questions.q2}
              onValueChange={(itemValue, itemIndex) => {
                setQuestions({ ...questions, q2: itemValue });
              }}
            >
              <Picker.Item label="No" value={0} />
              <Picker.Item label="Yes" value={1} />
            </Picker>
          </Row>

          <Row>
            <Text style={pollStyles.subtitle}>
              El asesor encargado despejo todas las dudas?{'\n'}
            </Text>
          </Row>

          <Row style={pollStyles.rowPicker}>
            <Picker
              enabled={enabled}
              style={{ height: 50, width: 350 }}
              selectedValue={questions.q3}
              onValueChange={(itemValue, itemIndex) => {
                setQuestions({ ...questions, q3: itemValue });
              }}
            >
              <Picker.Item label="No" value={0} />
              <Picker.Item label="Yes" value={1} />
            </Picker>
          </Row>

          <Row>
            <Text style={pollStyles.subtitle}>
              La comunicacion con el asesor fue exitosa?{'\n'}
            </Text>
          </Row>

          <Row style={pollStyles.rowPicker}>
            <Picker
              enabled={enabled}
              style={{ height: 50, width: 350 }}
              selectedValue={questions.q4}
              onValueChange={(itemValue, itemIndex) => {
                setQuestions({ ...questions, q4: itemValue });
              }}
            >
              <Picker.Item label="No" value={0} />
              <Picker.Item label="Yes" value={1} />
            </Picker>
          </Row>

          <Row>
            <Text style={pollStyles.subtitle}>
              La plataforma le presento algun tipo de inconveniente?{'\n'}
            </Text>
          </Row>

          <Row style={pollStyles.rowPicker}>
            <Picker
              enabled={enabled}
              style={{ height: 50, width: 350 }}
              selectedValue={questions.q5}
              onValueChange={(itemValue, itemIndex) => {
                setQuestions({ ...questions, q5: itemValue });
              }}
            >
              <Picker.Item label="No" value={0} />
              <Picker.Item label="Yes" value={1} />
            </Picker>
          </Row>

          <Row style={pollStyles.row}>
            <Col>
              <Text style={pollStyles.subtitle}>Comentarios: {'\n'}</Text>
              <TextInput
                style={pollStyles.textArea}
                underlineColorAndroid="transparent"
                placeholder="Escribe una descripcion completa del caso"
                placeholderTextColor="grey"
                numberOfLines={10}
                multiline={true}
                editable={enabled}
                onChangeText={(text) => {
                  setQuestions({ ...questions, comment: text });
                }}
                value={questions.comment}
              />
            </Col>
          </Row>

          <Row style={[pollStyles.row, pollStyles.center]}>
            {enabled && login.user.type == 1 ? (
              <Button
                title={'Calificar'}
                color={'red'}
                onPress={() => handleSave()}
              />
            ) : (
              <Button
                title={'Atras'}
                color={'gray'}
                onPress={() => navigation.goBack()}
              />
            )}
          </Row>
        </Grid>
      </ScrollView>
    </>
  );
};

export default Poll;
