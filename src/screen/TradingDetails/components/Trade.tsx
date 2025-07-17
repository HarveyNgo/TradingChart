import {  StyleSheet, View } from 'react-native';
import CryptoText from '../../../components/CryptoText';
import { Colors } from '../../../constants/colors';
import { TradeItem } from '../../../types/trade';

type Props = {
  title: string;
  listData: TradeItem[];
};

const ListItem: React.FC<{ item: TradeItem }> = ({ item }) => {
  return (
    <View style={styles.listItem}>
      <CryptoText
        style={
          (styles.price,
          item.side === 'buy' ? { color: Colors.green } : { color: Colors.red })
        }
      >
        {item.price}
      </CryptoText>
      <CryptoText style={styles.amount}>{item.amount}</CryptoText>
    </View>
  );
};

const Trade: React.FC<Props> = ({ title, listData }) => {
  return (
    <View style={styles.container}>
      <CryptoText style={styles.title}>{title}</CryptoText>
      {listData.map(item => (
        <ListItem key={item.id} item={item} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop:27
  },
  title: {
    color: Colors.white,
    fontWeight: '500',
    fontSize: 14,
    marginBottom: 16,
    textAlign: 'center',
  },
  listItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  price: {
    fontWeight: '400',
    fontSize: 12,
  },
  amount: {
    fontWeight: '400',
    fontSize: 12,
  },
});

export default Trade;
