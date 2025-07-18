import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../../constants/colors';
import CryptoText from '../../../components/CryptoText';

export enum TimeButtonEnum {
  SevenDays = 'SevenDays',
  OneMonth = 'OneMonth',
  ThreeMonths = 'ThreeMonths',
  OneYear = 'OneYear',
  FiveYears = 'FiveYears',
  Max = 'Max',
}
const timeButtons = [
  { id: TimeButtonEnum.SevenDays, label: '7D' },
  { id: TimeButtonEnum.OneMonth, label: '1M' },
  { id: TimeButtonEnum.ThreeMonths, label: '3M' },
  { id: TimeButtonEnum.OneYear, label: '1Y' },
  { id: TimeButtonEnum.FiveYears, label: '5Y' },
  { id: TimeButtonEnum.Max, label: 'MAX' },
];

type Props = {
  onTimeButtonPress: (id: string) => void;
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
