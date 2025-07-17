import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../../constants/colors';
import CryptoText from '../../../components/CryptoText';
import { Icons } from '../../../assets';

const secondaryButtons = [
  { id: 1, icon: Icons.h1 },
  { id: 2, icon: Icons.forward },
  { id: 3, icon: Icons.bolt },
];

type Props = {};
const SecondaryButtonList: React.FC<Props> = ({}) => {
  return (
    <View style={styles.container}>
      {secondaryButtons.map(button => (
        <TouchableOpacity key={button.id} style={styles.button}>
          <Image style={styles.icon} source={button.icon} />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    // justifyContsent: 'space-between',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop:27
  },
  button: {
    backgroundColor: Colors.secondaryButton,
    padding: 6,
    borderRadius: 4,
  },
  icon: {
    resizeMode: 'contain',
    width: 10,
    height: 10,
  },
});

export default SecondaryButtonList;
