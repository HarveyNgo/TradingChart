import { Image, StyleSheet, View } from 'react-native';
import React from 'react';
import { Icons } from '../assets';
import CryptoText from './CryptoText';

type HeaderProps = { title?: string };
const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <View style={styles.logoContainer}>
      <Image style={styles.menu} source={Icons.menu} />
      <CryptoText style={styles.title}>{title || 'Header Title'}</CryptoText>
      <Image style={styles.notification} source={Icons.notification} />
    </View>
  );
};

export default Header;

export const styles = StyleSheet.create({
  logoContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 26,
  },
  menu: {
    width: 24,
    height: 24,
  },
  notification: {
    width: 16,
    height: 16,
  },
  title: {
    fontSize: 12,
    fontWeight: 700,
  },
});
