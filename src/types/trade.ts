export interface TradeItem {
  id: string | number;
  side: 'buy' | 'sell';
  price: number;
  amount: number;
}

export interface ChartItem {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  value: number;
  date: string;
}
