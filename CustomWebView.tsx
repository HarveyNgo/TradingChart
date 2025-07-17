// CustomWebView.tsx
import React, { useEffect, useRef } from 'react';
import { WebView } from 'react-native-webview';
import { Platform, Text, TouchableOpacity, View } from 'react-native';
import { generateMockData, generateMockData1 } from './src/utils/generateData';

const CustomWebView = () => {
  const webViewRef = useRef(null);
  // const [data, setData] = React.useState(generateMockData1(24, 60 * 60)); // 24 hours of data with 1 hour intervals

  const getSource = () => {
    if (Platform.OS === 'android') {
      return { uri: 'file:///android_asset/chart.html' };
    } else {
      return require('./assets/chart.html'); // relative path for iOS
    }
  };

  const htmlContent = `
    <html>
      <head>
        <meta charset="utf-8" />
        <script type="text/javascript" src="https://unpkg.com/lightweight-charts/dist/lightweight-charts.standalone.production.js"></script>
        <style>
          html, body, #container {
            margin: 0;
            padding: 0;
            height: 100%;
            width: 100%;
            background-color: 'red';
          }
        </style>
      </head>
      <body>
        <div id="container"></div>
        <script>

        // Create the Lightweight Chart within the container element
        const chart = LightweightCharts.createChart(
            document.getElementById('container'),{
                width: window.innerWidth,
                height: window.innerHeight * 0.4,
                layout: { 
                    background: { color: "#fff" },
                    textColor: "#000"
                },
                timeScale: {
                    timeVisible: true,
                    secondsVisible: true,
                },
                grid: {
                  vertLines: { color: '#eee' },
                  horzLines: { color: '#eee' },
                },
            }
        );
      
   
        function generateMockCandlestickData(count, intervalSeconds) {
          const result = [];
          let currentTime = Math.floor(Date.now() / 1000); // current time in seconds
          let lastClose = 100; // starting price

          for (let i = 0; i < count; i++) {
            const open = lastClose;
            const high = open + Math.random() * 5;
            const low = open - Math.random() * 5;
            const close = low + Math.random() * (high - low);
            const value = (high+low)/2

            result.push({
              time: currentTime,
              open: parseFloat(open.toFixed(2)),
              high: parseFloat(high.toFixed(2)),
              low: parseFloat(low.toFixed(2)),
              close: parseFloat(close.toFixed(2)),
              value: parseFloat(value.toFixed(2)),
              date: new Date(currentTime * 1000).toISOString().slice(0, 10), // yyyy-mm-dd
            });

            currentTime -= intervalSeconds; // go back in time
            lastClose = close;
          }
          console.log('hung generateMockCandlestickData:', result);
          return result.reverse(); // oldest first
        }


        const data = generateMockCandlestickData(24,5);

        function formatForHistogramData(data) {
            return data.map(item => ({
                ...item,
                value: Math.abs(item.close - item.open),
                color: item.close > item.open ? 'green':'red',
            }));
        }

      

          const candleStickSeries = chart.addSeries(LightweightCharts.CandlestickSeries);
          candleStickSeries.applyOptions({
              wickUpColor: 'green',
              upColor: 'green',
              wickDownColor: 'red',
              downColor: 'red',
              // borderVisible: false,
          });
          candleStickSeries.priceScale().applyOptions({
           
              scaleMargins: {
                top: 0.1,
                bottom: 0,
              },
            });
          candleStickSeries.setData(data);
      
      //   const lineSeries = chart.addSeries(LightweightCharts.LineSeries);
      //   lineSeries.setData(data);

      //   const minMaxLineSeries = chart.addSeries(LightweightCharts.LineSeries);
      //   minMaxLineSeries.setData(formatForMinMaxLineData(data));

      // const histogramSeries = chart.addSeries(LightweightCharts.HistogramSeries);

      // histogramSeries.setData(formatForHistogramData(data));

      // chart.timeScale().scrollToPosition(0, true);
      chart.timeScale().fitContent();

      function updateCandleStick(newData) {  
        data.push(newData[0]);
        // document.getElementById('container').textContent = 'Message received: ' + JSON.stringify(data);
        candleStickSeries.setData(data);
      }


      document.addEventListener('message', (event) => {
            const msg = JSON.parse(event.data);
            // document.getElementById('container').textContent = 'Message received: ' + JSON.stringify(msg.data);
            // data.push(msg.data);
           
            updateCandleStick(msg.data);
            
          });

        </script>
      </body>
    </html>
    `;

  // useEffect(() => {
  //   const message = {
  //     type: 'init',
  //     data: data,
  //   };
  //   webViewRef.current?.postMessage(JSON.stringify(message));
  // }, [data]);

  const onPress = () => {
    const message = {
      type: 'stick',
      data: generateMockData1(1, 5),
    };

    webViewRef.current?.postMessage(JSON.stringify(message));
  };

  return (
    <View style={{ flex: 1 }}>
      {/* <WebView
        originWhitelist={['*']}
        source={getSource()}
        allowFileAccess={true}
        allowUniversalAccessFromFileURLs={true}
      /> */}
      <WebView
        ref={webViewRef}
        originWhitelist={['*']}
        source={{ html: htmlContent }}
        javaScriptEnabled
        domStorageEnabled
        style={{ flex: 1 }}
        scalesPageToFit
      />
      <TouchableOpacity
        onPress={onPress}
        style={{ padding: 20, backgroundColor: 'blue', alignItems: 'center' }}
      >
        <Text style={{ color: 'white' }}>Send Message</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomWebView;
