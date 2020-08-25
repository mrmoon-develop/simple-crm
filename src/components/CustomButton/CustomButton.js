import React from 'react';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { loginStyles } from '../../styles/styles';

const CustomButton = ({ style, onPress, title, transparent = false }) => {
  return (
    <TouchableOpacity style={[loginStyles.btnMain, style]} onPress={onPress}>
      <Text style={loginStyles.btnText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
