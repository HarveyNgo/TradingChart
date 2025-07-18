import { StyleSheet, View } from 'react-native';
import CryptoText from '../../../components/CryptoText';
import { Colors } from '../../../constants/colors';

const HighLow = () => {
  return (
    <View style={styles.container}>
      <View style={styles.highColumn}>
        <CryptoText style={styles.highText}>High</CryptoText>
        <CryptoText style={styles.number}>53,223.01</CryptoText>
      </View>
      <View style={styles.highColumn}>
        <CryptoText style={styles.lowText}>Low</CryptoText>
        <CryptoText style={styles.number}>53,223.01</CryptoText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  highColumn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginHorizontal: 14,
  },
  highText: {
    color: Colors.green,
    fontSize: 12,
    fontWeight: '500',
  },
  lowText: {
    color: Colors.red,
  },
  number: {
    fontWeight: '500',
    fontSize: 14,
    marginTop: 8,
  },
});
export default HighLow;
