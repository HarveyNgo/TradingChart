// ChartWebView.tsx
import React, { useEffect, useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
// import data from './data.json'; // Assuming data.json is in the same directory

const ChartWebView = () => {
  const webViewRef = useRef(null);

  const htmlContent = `
    <!DOCTYPE html>
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
                height: window.innerHeight ,
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
                }
            }
        );
        function generateSampleData() {
            const date = new Date(Date.UTC(2025, 0, 1, 0, 0, 0, 0));
            const res = [];
            const samplePoint = i =>
				i *
				(0.5 +
					Math.sin(i / 10) * 0.2 +
					Math.sin(i / 20) * 0.4 +
					Math.sin(i / randomFactor) * 0.8 +
					Math.sin(i / 500) * 0.5) +
				200;

            for (let i = 0; i < 500; ++i) {
				const time = date.getTime() / 1000;
				const value = samplePoint(i);

				res.push({
					time,
					value,
				});

				date.setUTCDate(date.getUTCDate() + 1);
			}
            return res;
        }

      const candleStickData = [
        { time: '2025-01-01', open: 100, high: 105, low: 95, close: 102 },
        { time: '2025-01-02', open: 102, high: 108, low: 101, close: 107 },
        { time: '2025-01-03', open: 107, high: 110, low: 104, close: 109 },
        { time: '2025-01-04', open: 109, high: 112, low: 106, close: 111 },
        { time: '2025-01-05', open: 111, high: 115, low: 110, close:    114 },
         { time: '2025-01-06', open: 114, high: 118, low: 113, close: 117 },
        { time: '2025-01-07', open: 117, high: 120, low: 116, close: 119 },
        { time: '2025-01-08', open: 119, high: 123, low: 118, close: 122 },
        { time: '2025-01-09', open:         122, high: 126, low: 121, close: 125 }, 
         { time: '2025-01-10', open: 125, high: 128, low: 124, close: 127 },
        { time: '2025-01-11', open: 127, high: 130, low: 126, close: 129 },
        { time: '2025-01-12', open: 129, high: 133, low: 128, close: 132 },
        { time: '2025-01-13', open: 132, high: 135, low: 131, close: 134 },
        { time: '2025-01-14', open: 134, high: 138, low: 133, close: 137 },
        { time: '2025-01-15', open: 137, high: 140, low: 136, close: 139 },
        { time: '2025-01-16', open: 139, high: 142, low: 138, close: 141 },
        { time: '2025-01-17', open: 141, high: 145, low: 140, close: 144 },
        { time: '2025-01-18', open: 144, high: 148, low: 143, close: 147 }, 
    ]
    //    // Create the Main Series (Candlesticks)
    //   const mainSeries = chart.addSeries(LightweightCharts.CandlestickSeries);
    //   // Set the data for the Main Series
    //   mainSeries.setData(candleStickData);

    //   const barSeries = chart.addSeries(LightweightCharts.BarSeries);
    //   barSeries.setData(candleStickData);

        const lineSeries = chart.addSeries(LightweightCharts.LineSeries);
        lineSeries.setData(generateSampleData());

    //   const histogramData = [{ value: 1, time: '2025-01-14' }, { value: 8, time: '2025-01-14' }, ];
    //   const histogramSeries = chart.addSeries(LightweightCharts.HistogramSeries);
    //   histogramSeries.setData(histogramData);


      // Add series
        // const candleSeries = chart.addCandlestickSeries();
    //     const barSeries = chart.addBarSeries({ color: '#2962FF' });
    //     const lineSeries = chart.addLineSeries({ color: '#FF5722' });

    //     // Sample data point
    //     const data = [
    //         { time: "2025-01-01", open: 100, high: 105, low: 95, close: 102 },
    //         { time: "2025-01-02", open: 102, high: 108, low: 101, close: 107 },
    //         { time: "2025-01-03", open: 107, high: 110, low: 104, close: 109 },
    //     ];

        // candleSeries.setData(candleStickData);
        // barSeries.setData(data);   // using same OHLC for bar chart
        // lineSeries.setData(data.map(item => ({ time: item.time, value: item.close }))); 

        </script>
      </body>
    </html>
  `;

  const aaa = `
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
                height: window.innerHeight ,
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
                }
            }
        );
        function generateSampleData() {
            const date = new Date(Date.UTC(2025, 0, 1, 0, 0, 0, 0));
            const res = [];
            const randomFactor = 25 + Math.random() * 25;
            const samplePoint = i =>
				i *
				(0.5 +
					Math.sin(i / 10) * 0.2 +
					Math.sin(i / 20) * 0.4 +
					Math.sin(i / randomFactor) * 0.8 +
					Math.sin(i / 500) * 0.5) +
				200;

            for (let i = 0; i < 23; ++i) {
				const time = date.getTime() / 1000;
				const value = samplePoint(i);

				res.push({
					time,
					value,
				});

				date.setUTCDate(date.getUTCDate() + 1);
			}
            console.log('hung res:',res);
            return res;
        }


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
              value:parseFloat(value.toFixed(2)),
            });

            currentTime -= intervalSeconds; // go back in time
            lastClose = close;
          }
          console.log('hung generateMockCandlestickData:', result);
          return result.reverse(); // oldest first
        }


        //   const candleStickSeries = chart.addSeries(LightweightCharts.CandlestickSeries);
        //   candleStickSeries.setData(generateMockCandlestickData(10,60));
      
        const lineSeries = chart.addSeries(LightweightCharts.LineSeries);
        lineSeries.setData(generateMockCandlestickData(10,60));

    //   const histogramSeries = chart.addSeries(LightweightCharts.HistogramSeries);
    //   histogramSeries.setData(generateMockCandlestickData(10,60));

      chart.timeScale().scrollToPosition(0, true);

        </script>
      </body>
    </html>
  `;

  useEffect(() => {
    let baseDate = new Date('2025-07-17');
    const interval = setInterval(() => {
      const newPrice = 70 + Math.random() * 10;
      const now = new Date();
      console.log('Current time:', new Date().getTime());
      const pad = (n: number) => n.toString().padStart(2, '0');
      // Generate a date string in YYYY-MM-DD format, starting from 2025-07-17 and incrementing by interval count

      const time = `${baseDate.getFullYear()}-${pad(
        baseDate.getMonth() + 1,
      )}-${pad(baseDate.getDate())}`;
      baseDate.setDate(baseDate.getDate() + 1);

      const newCandle = {
        time: baseDate.getTime(),
        open: parseFloat(newPrice.toFixed(2)),
        hight: parseFloat((newPrice + Math.random()).toFixed(2)),
        low: parseFloat((newPrice - Math.random()).toFixed(2)),
        close: parseFloat(newPrice.toFixed(2)),
      };

      const trades = [
        { price: newPrice.toFixed(2), volume: (Math.random() * 10).toFixed(2) },
        {
          price: (newPrice + 0.1).toFixed(2),
          volume: (Math.random() * 5).toFixed(2),
        },
      ];

      const orderBook = {
        bids: [
          {
            price: (newPrice - 0.3).toFixed(2),
            size: (Math.random() * 15).toFixed(2),
          },
        ],
        asks: [
          {
            price: (newPrice + 0.3).toFixed(2),
            size: (Math.random() * 15).toFixed(2),
          },
        ],
      };

      const message = {
        candle: newCandle,
        trades,
        orderBook,
      };

      //   console.log('Sending message to WebView:', message);

      //   webViewRef.current?.postMessage(JSON.stringify(message));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <WebView
        ref={webViewRef}
        originWhitelist={['*']}
        source={{ html: aaa }}
        javaScriptEnabled
        domStorageEnabled
        style={styles.webview}
        scalesPageToFit
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});

export default ChartWebView;
