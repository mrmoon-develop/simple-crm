import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
  Cols,
  Cell,
} from 'react-native-table-component';

const CloseIssues = ({ navigation }) => {
  const [headers, SetHeaders] = useState(['ID', 'Title', 'State', 'Priority']);
  const [issues, setIssues] = useState([
    [1, 'Prueba', 'Finished', 'Medium'],
    [2, 'Prueba', 'Finished', 'Medium'],
  ]);

  return (
    <View style={styles.container}>
      <Text style={{ textTransform: 'uppercase', margin: 20 }}>
        Active Issues
      </Text>
      <Table borderStyle={{ borderWidth: 2, borderColor: '#c8e1ff' }}>
        <Row data={headers} style={styles.head} textStyle={styles.text} />
        <Rows data={issues} textStyle={styles.text} />
      </Table>
    </View>
  );
};

export default CloseIssues;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 30,
    backgroundColor: '#fff',
    textAlign: 'center',
    // justifyContent: 'center',
  },
  head: { height: 40, backgroundColor: '#f1f8ff' },
  text: { margin: 6 },
});
