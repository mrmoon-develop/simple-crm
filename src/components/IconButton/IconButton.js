import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-ionicons';

const IconButton = ({ iconName, style, onPress }) => {
  return (
    <TouchableOpacity style={[styles.icon, style]} onPress={onPress}>
      <Icon ios={`ios-${iconName}`} android={`md-${iconName}`} />
    </TouchableOpacity>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  icon: {},
});
