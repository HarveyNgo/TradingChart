import React from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';
import { Colors } from '../constants/colors';

const CryptoText: React.FC<TextProps> = ({ style, ...props }) => {
  return <Text style={[styles.text, style]} {...props} />;
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'sf-compact-display',
    color: Colors.white,
  },
});
export default CryptoText;
