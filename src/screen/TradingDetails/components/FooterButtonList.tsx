import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../../constants/colors';
import CryptoText from '../../../components/CryptoText';
import { Icons } from '../../../assets';

const footerButtons = [
  { id: 1, label: 'Open' },
  { id: 2, label: 'Filled' },
  { id: 3, label: 'Cancelled' },
];

type Props = {};
const FooterButtonList: React.FC<Props> = ({}) => {
  return (
    <View style={styles.container}>
      {footerButtons.map(button => (
        <TouchableOpacity key={button.id} style={styles.button}>
          <CryptoText style={styles.text}>{button.label}</CryptoText>
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
  button: {},
  text: {
    opacity: 0.3,
  },
});

export default FooterButtonList;
