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
import ChartWebView from './components/ChartWebView';
import TimeButtonList from './components/TimeButtonList';
import SecondaryButtonList from './components/SecondaryButtonList';
import FooterButtonList from './components/FooterButtonList';

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
          <View style={styles.leftContainer}>
            <View style={styles.chartContainer}>
              <ChartWebView />

              <View style={styles.chartFooter}>
                <TimeButtonList
                  onTimeButtonPress={function (id: number): void {
                    throw new Error('Function not implemented.');
                  }}
                />
                <SecondaryButtonList />
              </View>
            </View>
            <View style={styles.footer}>
              <FooterButtonList />
            </View>
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
  scroll: { flex: 1 },
  scrollContent: { flexGrow: 1 },
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
  leftContainer: {
    flex: 0.7,
    marginRight: 12,
  },
  chartContainer: {
    // flex: 0.7,
    backgroundColor: Colors.container,
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    paddingVertical: 17,
    paddingRight: 17,
    // height: 400,
  },
  orderTradeContainer: {
    flex: 0.3,
  },
  chartFooter: {
    marginTop: 7,
  },
  footer: {
    marginTop: 17,
    marginLeft: 16,
  },
});

export default TradingDetailsScreen;
