import { useEffect, useRef } from 'react';
import { generateMockData1 } from '../../../utils/generateData';
import { View } from 'react-native';
import WebView from 'react-native-webview';
import { Colors } from '../../../constants/colors';

const ChartWebView = () => {
  const webViewRef = useRef(null);

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
        
    
            // const data = generateMockCandlestickData(24,1);
             const data = ${JSON.stringify(generateMockData1(24, 1))};
    
            function formatForHistogramData(data) {
            console.log('Formatted Histogram Data:', data);
                return data.map(item => ({
                    ...item,
                    value: Math.abs(item.close - item.open),
                    color: item.close > item.open ? ${JSON.stringify(
                      Colors.green,
                    )}:${JSON.stringify(Colors.red)},
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

  return (
    <View style={{ flex: 1 }}>
      <WebView
        ref={webViewRef}
        originWhitelist={['*']}
        source={{ html: htmlContent }}
        javaScriptEnabled
        domStorageEnabled
        style={{ height:400 }}
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
};

export default ChartWebView;
