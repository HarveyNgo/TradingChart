import { StyleSheet, View } from 'react-native';
import { Colors } from '../../../constants/colors';
import FooterSelectedDetail from './FooterSelectedDetail';

const FooterSelectedView = () => {
  return (
    <View style={styles.container}>
      <View style={styles.circle} />
      <FooterSelectedDetail />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.container,
    borderRadius: 5.68,
    borderWidth: 0.71,
    display: 'flex',
    flexDirection: 'row',
    marginTop: 10,
    padding: 6,
    paddingRight: 14,
  },
  circle: {
    width: 14,
    height: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.white,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 7,
  },
});

export default FooterSelectedView;
