import { ScrollView, StyleSheet, Text, View } from 'react-native';
import ScreenContainer from '../../components/ScreenContainer';
import HighLowVolume from './components/HighLowVolume';

import React from 'react';
import TotalAndDropdown from './components/TotalAndDrowDown';
import CryptoText from '../../components/CryptoText';
import OrderBook from './components/OrderBook';
import { generateOrderBook, generateTradeData } from '../../utils/generateData';
import { CurrencyPair } from '../../types/currency';
import Trade from './components/Trade';
import { Colors } from '../../constants/colors';

const TradingDetailsScreen = () => {
  return (
    <ScreenContainer title="Trading Details">
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.summary}>
          <HighLowVolume />
          <TotalAndDropdown
            onSelectCurrencyPair={function (currencyPair: CurrencyPair): void {
              throw new Error('Function not implemented.');
            }}
          />
        </View>

        <View style={styles.chartAndOrderAndTrade}>
          <View style={styles.chartContainer}>
            <CryptoText>aa</CryptoText>
          </View>
          <View style={styles.orderTradeContainer}>
            <OrderBook title={'Order Book'} listData={generateOrderBook()} />
            <Trade title={'Trade'} listData={generateTradeData()} />
          </View>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
};

export const styles = StyleSheet.create({
  scroll:{flex:1},
  scrollContent:{flexGrow:1},
  summary: {
    marginHorizontal: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 38,
  },
  chartAndOrderAndTrade: {
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    marginTop: 24,
    marginRight: 20,
  },
  chartContainer: {
    flex: 0.7,
    backgroundColor: Colors.container,
    borderRadius: 12,
    marginRight: 12,
  },
  orderTradeContainer: {
    flex: 0.3,
  },
});

export default TradingDetailsScreen;
