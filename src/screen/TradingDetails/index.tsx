import { ScrollView, StyleSheet, View } from 'react-native';
import ScreenContainer from '../../components/ScreenContainer';
import HighLowVolume from './components/HighLowVolume';
import React, { useEffect, useRef, useState } from 'react';
import TotalAndDropdown from './components/TotalAndDrowDown';
import OrderBook from './components/OrderBook';
import {
  generateChartData,
  generateOrderBook,
  generateTradeData,
} from '../../utils/generateData';
import Trade from './components/Trade';
import { Colors } from '../../constants/colors';
import ChartWebView from './components/ChartWebView';
import TimeButtonList, { TimeButtonEnum } from './components/TimeButtonList';
import SecondaryButtonList from './components/SecondaryButtonList';
import FooterButtonList from './components/FooterButtonList';
import { OrderItem } from '../../types/order';
import { TradeItem } from '../../types/trade';

const TradingDetailsScreen = () => {
  const [orderData, setOrderData] = useState<OrderItem[]>(generateOrderBook());
  const [tradeData, setTradeData] = useState<TradeItem[]>(generateTradeData());
  const webViewRef = useRef<
    { postMessage: (message: string) => void } | null | any
  >(null);
  const [updateChart, setupdateChart] = useState<boolean>(false);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      setOrderData(generateOrderBook());
      setTradeData(generateTradeData());

      const message = {
        type: 'stick',
        data: generateChartData(1, 1),
      };
      webViewRef.current?.postMessage(JSON.stringify(message));
    }, 5000);
  };

  useEffect(() => {
    startInterval();
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const handleTimeSelection = (timeId: string) => {
    switch (timeId) {
      case TimeButtonEnum.SevenDays:
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
        webViewRef.current?.postMessage(
          JSON.stringify({
            type: TimeButtonEnum.SevenDays,
            data: generateChartData(7, 60 * 60 * 24),
          }),
        );
        break;
      case TimeButtonEnum.OneMonth:
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
        webViewRef.current?.postMessage(
          JSON.stringify({
            type: TimeButtonEnum.OneMonth,
            data: generateChartData(30, 60 * 60 * 24),
          }),
        );
        break;
      case TimeButtonEnum.ThreeMonths:
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
        webViewRef.current?.postMessage(
          JSON.stringify({
            type: TimeButtonEnum.ThreeMonths,
            data: generateChartData(90, 60 * 60 * 24),
          }),
        );
        break;
      case TimeButtonEnum.OneYear:
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
        webViewRef.current?.postMessage(
          JSON.stringify({
            type: TimeButtonEnum.OneYear,
            data: generateChartData(12, 60 * 60 * 24 * 30),
          }),
        );
        break;
      case TimeButtonEnum.FiveYears:
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
        webViewRef.current?.postMessage(
          JSON.stringify({
            type: TimeButtonEnum.FiveYears,
            data: generateChartData(12 * 5, 60 * 60 * 24 * 30),
          }),
        );
        break;
      default:
        setupdateChart(!updateChart);
        webViewRef.current?.postMessage(
          JSON.stringify({
            type: TimeButtonEnum.Max,
            data: generateChartData(24, 1),
          }),
        );
        startInterval();
        break;
    }
  };

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
            onSelectCurrencyPair={() => {
              setupdateChart(!updateChart);
              startInterval();
            }}
          />
        </View>

        <View style={styles.chartAndOrderAndTrade}>
          <View style={styles.leftContainer}>
            <View style={styles.chartContainer}>
              <ChartWebView ref={webViewRef} updateChart={updateChart} />

              <View style={styles.chartFooter}>
                <TimeButtonList onTimeButtonPress={handleTimeSelection} />
                <SecondaryButtonList />
              </View>
            </View>
            <View style={styles.footer}>
              <FooterButtonList />
            </View>
          </View>
          <View style={styles.orderTradeContainer}>
            <OrderBook title={'Order Book'} listData={orderData} />
            <Trade title={'Trade'} listData={tradeData} />
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
