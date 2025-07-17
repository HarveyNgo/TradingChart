export interface OrderItem {
  id: string|number;
  side: 'bid' | 'ask';
  price: number;
  amount: number;
}
