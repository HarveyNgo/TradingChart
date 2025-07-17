import React from 'react';
import { SafeAreaView, View } from 'react-native';
import ChartWebView from './ChartWebView';
import CustomWebView from './CustomWebView';
import TradingDetailsScreen from './src/screen/TradingDetails';

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      {/* <ChartWebView /> */}
      {/* <CustomWebView/> */}
      <TradingDetailsScreen />
    </View>
  );
}
