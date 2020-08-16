import React, { useState } from 'react';
import { StyleSheet, Text, View, Picker, Button } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { TextInput } from 'react-native-gesture-handler';

const NewIssue = ({ navigation }) => {
  const [selectedValue, setSelectedValue] = useState('java');
  const [impactSelected, setImpactSelected] = useState('Low');

  const [customer, setCustomer] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [issueTitle, setIssueTitle] = useState('');

  return (
    <Grid style={{ padding: 25 }}>
      <Row>
        <Col>
          <Text>Empresa:</Text>
        </Col>
        <Col>
          <Picker
            selectedValue={selectedValue}
            style={{ height: 50, width: 150 }}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedValue(itemValue)
            }
          >
            <Picker.Item label="Java" value="java" />
            <Picker.Item label="Java" value="java" />
          </Picker>
        </Col>
      </Row>

      <Row>
        <Col>
          <Text>Customer:</Text>
        </Col>
        <Col>
          <TextInput onTextInput={(text) => setCustomer(text)} />
        </Col>
      </Row>

      <Row>
        <Col>
          <Text>Email:</Text>
        </Col>
        <Col>
          <TextInput onTextInput={(text) => setEmail(text)} />
        </Col>
      </Row>

      <Row>
        <Col>
          <Text>Phone:</Text>
        </Col>
        <Col>
          <TextInput onTextInput={(text) => setPhone(text)} />
        </Col>
      </Row>

      {/* <Row> */}
      <View
        style={{
          borderBottomColor: 'black',
          borderBottomWidth: 1,
          marginBottom: 20,
        }}
      />
      {/* </Row> */}

      <Row>
        <Col>
          <Text>Issue title:</Text>
        </Col>
        <Col>
          <TextInput onTextInput={(text) => setIssueTitle(text)} />
        </Col>
      </Row>

      <Row>
        <Col>
          <Text>Impact:</Text>
        </Col>
        <Col>
          <Picker
            selectedValue={selectedValue}
            style={{ height: 50, width: 150 }}
            onValueChange={(itemValue, itemIndex) =>
              setImpactSelected(itemValue)
            }
          >
            <Picker.Item label="Low" value="Low" />
            <Picker.Item label="Medium" value="Medium" />
            <Picker.Item label="High" value="High" />
          </Picker>
        </Col>
      </Row>

      <Row>
        <Col>
          <Text>Priority:</Text>
        </Col>
        <Col>
          <Picker
            selectedValue={selectedValue}
            style={{ height: 50, width: 150 }}
            onValueChange={(itemValue, itemIndex) =>
              setImpactSelected(itemValue)
            }
          >
            <Picker.Item label="Low" value="Low" />
            <Picker.Item label="Medium" value="Medium" />
            <Picker.Item label="High" value="High" />
          </Picker>
        </Col>
      </Row>

      <Row>
        <Col>
          <Text>Description:</Text>
          <TextInput
            style={styles.textArea}
            underlineColorAndroid="transparent"
            placeholder="Type something"
            placeholderTextColor="grey"
            numberOfLines={10}
            multiline={true}
          />
        </Col>
      </Row>

      <View
        style={{
          borderBottomColor: 'black',
          borderBottomWidth: 1,
          marginBottom: 20,
        }}
      />

      <Row>
        <Col>
          <Text>Evidences:{'\n'}</Text>
          {/* <Text>Attach issue evidences</Text> */}
        </Col>
      </Row>

      <Row
        style={{
          marginBottom: 20,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Button
          title={'Create Issue'}
          onPress={() => navigation.navigate('AppSolutions')}
        />
      </Row>
    </Grid>
  );
};

export default NewIssue;

const styles = StyleSheet.create({
  textArea: {
    height: 150,
    justifyContent: 'flex-start',
  },
});
