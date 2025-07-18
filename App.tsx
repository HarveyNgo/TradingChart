import React from 'react';
import { StyleSheet, View } from 'react-native';
import TradingDetailsScreen from './src/screen/TradingDetails';

export default function App() {
  return (
    <View style={styles.container}>
      <TradingDetailsScreen />
    </View>
  );
}

export const styles = StyleSheet.create({
  container: { flex: 1 },
});
