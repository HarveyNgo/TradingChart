import React from 'react';
import { SafeAreaView } from 'react-native';
import ChartWebView from './ChartWebView';
import CustomWebView from './CustomWebView';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* <ChartWebView /> */}
      <CustomWebView/>
    </SafeAreaView>
  );
}
