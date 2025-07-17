// export const generateMockData = days => {
//   const result = [];
//   let currentTime = Math.floor(Date.now() / 1000); // current time in seconds
//   let lastClose = 100; // starting price

//   for (let i = 0; i < days; i++) {
//     const open = lastClose;
//     const high = open + Math.random() * 5;
//     const low = open - Math.random() * 5;
//     const close = low + Math.random() * (high - low);
//     const value = (high + low) / 2;

//     result.push({
//       time: currentTime,
//       open: parseFloat(open.toFixed(2)),
//       high: parseFloat(high.toFixed(2)),
//       low: parseFloat(low.toFixed(2)),
//       close: parseFloat(close.toFixed(2)),
//       value: parseFloat(value.toFixed(2)),
//       date: new Date(currentTime * 1000).toISOString().slice(0, 10), // yyyy-mm-dd
//     });

//     currentTime -= 60 * 60 * 24; // go back in time 1 day
//     lastClose = close;
//   }
//   //   console.log('hung generateMockCandlestickData:', result);
//   return result.reverse(); // oldest first
// };

export const generateMockData1 = (count: number, intervalSeconds: number) => {
  const result = [];
  let currentTime = Math.floor(Date.now() / 1000); // current time in seconds
  let lastClose = 100; // starting price

  for (let i = 0; i < count; i++) {
    const open = lastClose;
    const high = open + Math.random() * 10;
    const low = open - Math.random() * 10;
    const close = low + Math.random() * (high - low);
    const value = (high + low) / 2;

    result.push({
      time: currentTime,
      open: parseFloat(open.toFixed(2)),
      high: parseFloat(high.toFixed(2)),
      low: parseFloat(low.toFixed(2)),
      close: parseFloat(close.toFixed(2)),
      value: parseFloat(value.toFixed(2)),
      date: new Date(currentTime * 1000).toISOString().slice(0, 10), // yyyy-mm-dd
    });

    currentTime -= intervalSeconds; // go back in time 1 day
    lastClose = close;
  }

  return result.reverse(); // oldest first
};
