import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../../constants/colors';
import CryptoText from '../../../components/CryptoText';

const timeButtons = [
  { id: 1, label: '7D' },
  { id: 2, label: '1M' },
  { id: 3, label: '3M' },
  { id: 4, label: '1Y' },
  { id: 5, label: '5Y' },
  { id: 6, label: 'MAX' },
];

type Props = {
  onTimeButtonPress: (id: number) => void;
};
const TimeButtonList: React.FC<Props> = ({ onTimeButtonPress }) => {
  return (
    <View style={styles.container}>
      {timeButtons.map(button => (
        <TouchableOpacity
          key={button.id}
          onPress={() => onTimeButtonPress(button.id)}
          style={styles.button}
        >
          <CryptoText style={styles.buttonText}>{button.label}</CryptoText>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    
  },
  button: {
    backgroundColor: Colors.button,
    padding: 6,
    borderRadius: 4,
  },
  buttonText: {
    fontWeight: '400',
    fontSize: 8,
  },
});

export default TimeButtonList;
