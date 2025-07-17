// CustomWebView.tsx
import React, { useEffect, useRef } from 'react';
import { WebView } from 'react-native-webview';
import { Platform, Text, TouchableOpacity, View } from 'react-native';
import { generateMockData, generateMockData1 } from './src/utils/generateData';
import { Colors } from './src/constants/Colors';
import { formatForHistogramData } from './src/utils/utils';

const CustomWebView = () => {
  const webViewRef = useRef(null);
  // const [data, setData] = React.useState(generateMockData1(24, 60 * 60)); // 24 hours of data with 1 hour intervals


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

         const originalLog = console.log;
    console.log = function(...args) {
      window.ReactNativeWebView?.postMessage(JSON.stringify({ type: 'log', message: args }));
      originalLog.apply(console, args);
    };


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
    

        // const data = generateMockCandlestickData(24,1);
         const data = ${JSON.stringify(generateMockData1(24, 1))};

        function formatForHistogramData(data) {
        console.log('Formatted Histogram Data:', data);
            return data.map(item => ({
                ...item,
                value: Math.abs(item.close - item.open),
                color: item.close > item.open ? 'green':'red',
            }));
        }

      

          const candleStickSeries = chart.addSeries(LightweightCharts.CandlestickSeries);
          candleStickSeries.applyOptions({
              wickUpColor: ${JSON.stringify(Colors.blue)},
              upColor: ${JSON.stringify(Colors.blue)},
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
      
        const lineSeries = chart.addSeries(LightweightCharts.LineSeries);
        lineSeries.setData(data);

      //   const minMaxLineSeries = chart.addSeries(LightweightCharts.LineSeries);
      //   minMaxLineSeries.setData(formatForMinMaxLineData(data));

      const histogramSeries = chart.addSeries(LightweightCharts.HistogramSeries);
      histogramSeries.setData(formatForHistogramData(data));

      // chart.timeScale().scrollToPosition(0, true);
      chart.timeScale().fitContent();

      function updateCandleStick(newData) {  
        candleStickSeries.setData(newData);
      }

       function updateLineSeries(newData) {  
        lineSeries.setData(newData);
      }
      function updateHistogram(newData) {
        histogramSeries.setData(newData);
      }


      document.addEventListener('message', (event) => {
            const msg = JSON.parse(event.data);
            // document.getElementById('container').textContent = 'Message received: ' + JSON.stringify(msg.data);

            if(msg.type === 'stick') {
              data.push(msg.data[0]);
              console.log('Received new datasss:', data);
              updateCandleStick(data);
              updateLineSeries(data);
              updateHistogram(formatForHistogramData(data));
            }
          });

        </script>
      </body>
    </html>
    `;

  // Send updated data every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const message = {
        type: 'stick',
        data: generateMockData1(1, 1),
      };

      webViewRef.current?.postMessage(JSON.stringify(message));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

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
