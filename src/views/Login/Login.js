import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Image, Button } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';

const Login = ({ navigation }) => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: 'https://reactnative.dev/docs/assets/p_cat2.png',
        }}
        style={{ width: 200, height: 200 }}
      />

      <Text>User</Text>
      <TextInput
        style={styles.input}
        key={'user'}
        onChangeText={(text) => setUser(text)}
      />

      <Text>Password</Text>
      <TextInput
        style={styles.input}
        key={'password'}
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
      />

      <Button
        title={'Log in'}
        onPress={() => navigation.navigate('AppSolutions')}
      />
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    marginBottom: 20,
    height: 40,
    borderColor: 'gray',
    borderBottomWidth: 1,
  },
});
