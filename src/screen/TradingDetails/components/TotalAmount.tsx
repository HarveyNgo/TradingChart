import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Colors } from '../../../constants/colors';
import CryptoText from '../../../components/CryptoText';

interface TotalAmountProps {
  amount: number;
  currency?: string;
}

const TotalAmount: React.FC<TotalAmountProps> = ({
  amount,
  currency = 'USD',
}) => {
  return (
    <View style={styles.container}>
      <CryptoText style={styles.amount}>
        {currency}
        {amount.toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </CryptoText>
      <CryptoText style={styles.percent}>(+1.24%)</CryptoText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  amount: {
    fontSize: 24,
    fontWeight: '600',
  },
  percent: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.percent,
    alignSelf: 'flex-end',
  },
});

export default TotalAmount;
