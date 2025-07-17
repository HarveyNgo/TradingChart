import { StyleSheet, View } from 'react-native';
import TotalAmount from './TotalAmount';
import CurrencyDropDown from '../../../components/CurrencyDropDown';
import { CurrencyPair } from '../../../types/currency';
import { currencyPairs } from '../../../data/currencyPair';

type Props = {
  onSelectCurrencyPair: (currencyPair: CurrencyPair) => void;
};
const TotalAndDropdown : React.FC<Props>= ({onSelectCurrencyPair}) => {
  return (
    <View style={styles.totalAndDropdown}>
      <TotalAmount amount={66350.55} currency="$" />
      <View style={styles.space} />
      <CurrencyDropDown
        onSelectCurrencyPair={onSelectCurrencyPair}
        selectedCurrencyPair={currencyPairs[0]}
      />
    </View>
  );
};

export const styles = StyleSheet.create({
  totalAndDropdown: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  space: {
    flex: 1,
  },
});

export default TotalAndDropdown;
