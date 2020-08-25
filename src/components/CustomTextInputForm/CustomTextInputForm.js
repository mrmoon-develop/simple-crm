import React from 'react';
import { Input } from 'react-native-elements';

const CustomTextInputForm = ({ style, onChangeText, value, placeholder }) => {
  return (
    <Input
      containerStyle={{
        borderWidth: 1,
        borderRadius: 20,
      }}
      inputContainerStyle={{
        top: 10,
        borderBottomColor: 'transparent',
      }}
      underlineColorAndroid={'transparent'}
      onChangeText={onChangeText}
      value={value}
      placeholder={placeholder}
    />
  );
};

export default CustomTextInputForm;
