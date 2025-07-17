import { Text, View } from 'react-native';
import { StyleSheet } from 'react-native';
import CryptoText from '../../../components/CryptoText';
import { Colors } from '../../../constants/colors';
import HighLow from './HighLow';
import Volume from './Volume';

const HighLowVolume = () => {
  return (
    <View style={styles.container}>
      <HighLow />
      <View style={styles.horizontalLine} />
      <Volume />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    backgroundColor: Colors.container,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  volumeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  horizontalLine: {
    height: 1,
    backgroundColor: Colors.white,
    marginVertical: 8,
    width: '100%',
  },
});
export default HighLowVolume;
