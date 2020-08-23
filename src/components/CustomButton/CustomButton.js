import React from 'react';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { loginStyles } from '@styles/styles';

const CustomButton = ({ style = '', onPress, title, transparent = false }) => {
  const buttonStyle = transparent
    ? loginStyles.btnTransparent
    : loginStyles.btnMain;
  return (
    <TouchableOpacity style={[buttonStyle, { style }]} onPress={onPress}>
      <Text style={loginStyles.btnText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
