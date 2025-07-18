import { StyleSheet, View } from 'react-native';
import CryptoText from '../../../components/CryptoText';
import { Colors } from '../../../constants/colors';

type Props = {
  title: string;
  name: string;
  amount: number;
  currency: string;
  highlight?: boolean;
};

const FooterSelectedItem: React.FC<Props> = ({
  title,
  name,
  amount,
  currency,
  highlight,
}) => {
  return (
    <View style={styles.container}>
      <CryptoText style={[styles.title, highlight && styles.highlight]}>
        {title}
      </CryptoText>
      <CryptoText style={styles.name}>{name}</CryptoText>
      <View style={styles.amountAndCurrency}>
        <CryptoText style={styles.amount}>{amount}</CryptoText>
        <CryptoText style={styles.amount}>{currency}</CryptoText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: '400',
    fontSize: 10,
  },
  highlight: {
    color: Colors.green,
  },
  name: {
    fontWeight: '400',
    fontSize: 8,
    opacity: 0.5,
    marginTop: 2,
    marginBottom: 4,
  },
  amountAndCurrency: {
    display: 'flex',
    flexDirection: 'row',
  },
  amount: {
    fontWeight: '400',
    fontSize: 8,
  },
});

export default FooterSelectedItem;
