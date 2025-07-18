import { StyleSheet, View } from 'react-native';
import FooterSelectedItem from './FooterSelectedItem';

const FooterSelectedDetail = () => {
  return (
    <View style={styles.container}>
      <FooterSelectedItem
        title={'Buy'}
        name={'price'}
        amount={0.0000123}
        currency={'BTC'}
        highlight={true}
      />
      <FooterSelectedItem
        title={'BTC/ETH'}
        name={'Amount'}
        amount={0.0000123}
        currency={'ETH'}
      />
      <FooterSelectedItem
        title={'Buy'}
        name={'Executed'}
        amount={0.0000123}
        currency={'ETH'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',

    flex: 1,
  },
  detailContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'white',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FooterSelectedDetail;
