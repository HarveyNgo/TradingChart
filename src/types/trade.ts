export interface TradeItem {
  id: string|number;
  side: 'buy' | 'sell';
  price: number;
  amount: number;
}
