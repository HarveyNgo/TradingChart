import { OrderItem } from '../types/order';
import { TradeItem } from '../types/trade';

export const generateChartData = (count: number, intervalSeconds: number) => {
  const result = [];
  let currentTime = Math.floor(Date.now() / 1000); // current time in seconds
  let lastClose = 20; // starting price

  for (let i = 0; i < count; i++) {
    const open = lastClose;
    const high = open + Math.random() * 5;
    const low = open - Math.random() * 5;
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

    currentTime -= intervalSeconds; // go back in time
    lastClose = close;
  }

  return result.reverse(); // oldest first
};

export function generateOrderBook(basePrice = 253.11, count = 6) {
  const orderBook = [];

  // Generate Bids (green) – price decreasing
  for (let i = 0; i < count; i++) {
    const price = parseFloat((basePrice - Math.random() * 0.5).toFixed(2));
    const amount = parseFloat((Math.random() * 0.01 + 0.001).toFixed(4)); // between 0.001 and 0.011
    orderBook.push({
      id: Math.random(),
      side: 'bid',
      price,
      amount,
    } as OrderItem);
  }

  // Generate Asks (red) – price increasing
  for (let i = 0; i < count; i++) {
    const price = parseFloat((basePrice + Math.random() * 0.5).toFixed(2));
    const amount = parseFloat((Math.random() * 0.01 + 0.001).toFixed(4)); // between 0.001 and 0.011
    orderBook.push({
      id: Math.random(),
      side: 'ask',
      price,
      amount,
    } as OrderItem);
  }

  return orderBook;
}

export function generateTradeData(basePrice = 253.11, count = 6) {
  const tradeData = [];

  // Generate Bids (green) – price decreasing
  for (let i = 0; i < count; i++) {
    const price = parseFloat((basePrice - Math.random() * 0.5).toFixed(2));
    const amount = parseFloat((Math.random() * 0.01 + 0.001).toFixed(4)); // between 0.001 and 0.011
    tradeData.push({
      id: Math.random(),
      side: 'buy',
      price,
      amount,
    } as TradeItem);
  }

  // Generate Asks (red) – price increasing
  for (let i = 0; i < count; i++) {
    const price = parseFloat((basePrice + Math.random() * 0.5).toFixed(2));
    const amount = parseFloat((Math.random() * 0.01 + 0.001).toFixed(4)); // between 0.001 and 0.011
    tradeData.push({
      id: Math.random(),
      side: 'sell',
      price,
      amount,
    } as TradeItem);
  }

  return tradeData;
}
