import { generateChartData } from '../../../utils/generateData';
import { StyleSheet, View } from 'react-native';
import WebView from 'react-native-webview';
import { Colors } from '../../../constants/colors';
import React from 'react';

type Props = {
  updateChart: boolean;
};

const ChartWebView = React.forwardRef<WebView, Props>(({}, webViewRef) => {
  const htmlContent = `
        <html>
          <head>
            <meta charset="utf-8" />
            <script type="text/javascript" src="https://unpkg.com/lightweight-charts/dist/lightweight-charts.standalone.production.js"></script>
            <style>
              html, body, #container {
                margin: 0;
                padding: 0;
                // height: 100%;
                // width: 100%;
                background-color: ${JSON.stringify(Colors.container)};
              }
            </style>
          </head>
          <body>
            <div id="container"></div>
            <script>
              const originalLog = console.log;
              console.log = function(...args) {
                window.ReactNativeWebView?.postMessage(JSON.stringify({ type: 'log', message: args }));
                originalLog.apply(console, args);
              };
    
    
            // Create the Lightweight Chart within the container element
            const chart = LightweightCharts.createChart(
                document.getElementById('container'),{
                    width: window.innerWidth ,
                    height: window.innerHeight,
                    layout: { 
                        background: { color: ${JSON.stringify(
                          Colors.container,
                        )} },
                        textColor: ${JSON.stringify(Colors.white)}
                    },
                    timeScale: {
                        timeVisible: true,
                        secondsVisible: true,
                    },
                    grid: {
                      vertLines: { color: ${JSON.stringify(Colors.chartLine)} },
                      horzLines: { color: ${JSON.stringify(Colors.chartLine)} },
                    },
                }
            );
        
            const data = ${JSON.stringify(generateChartData(24, 1))};
            const lineSeriesOneData =  ${JSON.stringify(
              generateChartData(24, 1),
            )};
             const lineSeriesTwoData =  ${JSON.stringify(
               generateChartData(24, 1),
             )};
              function formatForMinMaxLineData(data) {
                const values = data.map(item => item.value);
                const minValueObject = data.reduce((minObj, item) => 
                  item.value < minObj.value ? item : minObj
                );
                const maxValueObject = data.reduce((maxObj, item) => 
                  item.value > maxObj.value ? item : maxObj
                );
                const newData =  [{
                  ...minValueObject,
                  time:data[0].time
                }, {...maxValueObject,
                  time:data[data.length-1].time
                }]
                  return newData;
              }
              function formatForHistogramData(data) {
                  return data.map(item => ({
                      ...item,
                      value: Math.abs(item.close - item.open),
                      color: item.close > item.open ? ${JSON.stringify(
                        Colors.green_blur,
                      )}:${JSON.stringify(Colors.red_blur)},
                      
                  }));
              }
    
              const candleStickSeries = chart.addSeries(LightweightCharts.CandlestickSeries);
              candleStickSeries.applyOptions({
                  wickUpColor: ${JSON.stringify(Colors.green)},
                  upColor: ${JSON.stringify(Colors.green)},
                  wickDownColor:  ${JSON.stringify(Colors.red)},
                  downColor:  ${JSON.stringify(Colors.red)},
              });
              candleStickSeries.priceScale().applyOptions({
                  scaleMargins: {
                    top: 0.5,
                    bottom: 0,
                  },
                });
              candleStickSeries.setData(data);
          
              const lineSeriesOne= chart.addSeries(LightweightCharts.LineSeries);
              lineSeriesOne.setData(lineSeriesOneData);

              const lineSeriesTwo= chart.addSeries(LightweightCharts.LineSeries);
              lineSeriesTwo.applyOptions({
                 lineStyle: 1,
              });
              lineSeriesTwo.setData(lineSeriesTwoData);
    
              const minMaxLineSeries = chart.addSeries(LightweightCharts.LineSeries);
              minMaxLineSeries.setData(formatForMinMaxLineData(data));
        
              const histogramSeries = chart.addSeries(LightweightCharts.HistogramSeries);
              histogramSeries.setData(formatForHistogramData(data));
        
              /** style Chart */
              const currentLocale = window.navigator.languages[0];
              const myPriceFormatter = Intl.NumberFormat(currentLocale, {
                  style: 'currency',
                  currency: 'USD', 
              }).format;
              chart.applyOptions({
                  localization: {
                      priceFormatter: myPriceFormatter,
                  },
              });
              chart.timeScale().fitContent();
               /** style Chart */
        
              function updateCandleStick(newData) {  
                candleStickSeries.setData(newData);
              }
        
              function updateLineSeriesOne(newData) {  
                lineSeriesOne.setData(newData);
              }
              function updateLineSeriesTwo(newData) {  
                lineSeriesTwo.setData(newData);
              }
              function updateHistogram(newData) {
                histogramSeries.setData(newData);
              }
              function updateMinMaxLineSeries(newData){
                minMaxLineSeries.setData(newData);
              }
    
    
              document.addEventListener('message', (event) => {
                    const msg = JSON.parse(event.data);
                    if(msg.type === 'stick') {
                      data.push(msg.data[0]);
                      lineSeriesOneData.push(msg.data[0]);
                      lineSeriesTwoData.push(msg.data[0]);
                      updateCandleStick(data);
                      updateLineSeriesOne(lineSeriesOneData);
                      updateLineSeriesTwo(lineSeriesTwoData);
                      updateHistogram(formatForHistogramData(data));
                      updateMinMaxLineSeries(formatForMinMaxLineData(data))
                    }else {
                      updateCandleStick(msg.data);
                      updateLineSeriesOne(msg.data);
                      updateLineSeriesTwo(msg.data);
                      updateHistogram(formatForHistogramData(msg.data));
                      updateMinMaxLineSeries(formatForMinMaxLineData(msg.data))
                      chart.timeScale().fitContent();
                    }
              });
    
            </script>
          </body>
        </html>
        `;

  return (
    <View style={styles.container}>
      <WebView
        ref={webViewRef}
        originWhitelist={['*']}
        source={{ html: htmlContent }}
        javaScriptEnabled
        domStorageEnabled
        style={styles.webViewHeight}
        scalesPageToFit
        onMessage={event => {
          try {
            const data = JSON.parse(event.nativeEvent.data);
            if (data.type === 'log') {
              console.log('[WebView]', ...data.message);
            }
          } catch (e) {
            console.log('[WebView] raw:', event.nativeEvent.data);
          }
        }}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webViewHeight: {
    height: 300,
  },
});

export default React.memo(ChartWebView);
