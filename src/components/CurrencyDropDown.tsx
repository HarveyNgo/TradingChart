import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import { Icons } from '../assets';
import { Colors } from '../constants/colors';
import CryptoText from './CryptoText';
import { CurrencyPair } from '../types/currency';
import { currencyPairs } from '../data/currencyPair';

interface Props {
  onSelectCurrencyPair: (currencyPair: CurrencyPair) => void;
  selectedCurrencyPair: CurrencyPair;
}
const CurrencyDropDown: React.FC<Props> = ({
  onSelectCurrencyPair,
  selectedCurrencyPair,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentCurrencyPair, setCurrentCurrencyPair] = useState<CurrencyPair>(
    selectedCurrencyPair || currencyPairs[0],
  );

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const selectCurrencyPairHandler = (selected: CurrencyPair) => {
    setCurrentCurrencyPair(selected);
    onSelectCurrencyPair(selected);
    setIsDropdownOpen(false);
  };

  return (
    <TouchableWithoutFeedback onPress={() => setIsDropdownOpen(false)}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.dropdown} onPress={toggleDropdown}>
          <CryptoText style={styles.dropdownText}>
            {currentCurrencyPair.name}
          </CryptoText>
          <Image source={Icons.down} style={styles.arrow} />
        </TouchableOpacity>

        {isDropdownOpen && (
          <View style={[styles.dropdownMenu, styles.dropdownShow]}>
            {currencyPairs.map(item => {
              return (
                <TouchableOpacity
                  key={item.id}
                  style={styles.item}
                  onPress={() => selectCurrencyPairHandler(item)}
                >
                  <Text style={styles.itemText}>{item.name}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {},
  dropdown: {
    paddingVertical: 8.5,
    paddingHorizontal: 8,
    borderRadius: 4,
    backgroundColor: Colors.container,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dropdownText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '400',
  },
  arrow: {
    resizeMode: 'contain',
  },
  dropdownMenu: {
    backgroundColor: Colors.container,
    borderRadius: 4,
    overflow: 'hidden',
  },
  dropdownShow: {
    position: 'absolute',
    top: 35,
    zIndex: 100,
  },
  item: {
    paddingVertical: 8,
    paddingLeft: 8,
    paddingRight: 24,
  },
  itemText: {
    color: Colors.white,
    fontSize: 14,
  },
});

export default CurrencyDropDown;
