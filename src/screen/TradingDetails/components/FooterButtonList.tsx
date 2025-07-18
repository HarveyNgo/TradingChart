import { StyleSheet, TouchableOpacity, View } from 'react-native';
import CryptoText from '../../../components/CryptoText';
import React from 'react';
import { Colors } from '../../../constants/colors';
import FooterSelectedView from './FooterSelectedView';

const footerButtons = [
  { id: 1, label: 'Open' },
  { id: 2, label: 'Filled' },
  { id: 3, label: 'Cancelled' },
];

type Props = {};
const FooterButtonList: React.FC<Props> = ({}) => {
  const [selectedId, setSelectedId] = React.useState<number>(
    footerButtons[0].id,
  );
  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        {footerButtons.map(button => (
          <TouchableOpacity
            key={button.id}
            style={[styles.button]}
            onPress={() => setSelectedId(button.id)}
          >
            <CryptoText
              style={[
                styles.text,
                button.id === selectedId
                  ? styles.selectedText
                  : styles.normalText,
              ]}
            >
              {button.label}
            </CryptoText>
            {button.id === selectedId ? (
              <View style={styles.dot} />
            ) : (
              <View style={styles.invisibleDot} />
            )}
          </TouchableOpacity>
        ))}
      </View>

      <FooterSelectedView />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  text: {
    opacity: 0.3,
  },
  selectedText: {
    color: Colors.secondaryButton,
    fontWeight: '600',
    fontSize: 12,
    opacity: 1,
  },
  normalText: {
    color: Colors.white,
    fontWeight: '500',
    fontSize: 12,
    opacity: 0.3,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.secondaryButton,
    alignSelf: 'center',
    marginTop: 4,
  },
  invisibleDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'transparent',
    alignSelf: 'center',
    marginTop: 4,
    opacity: 0,
  },
});

export default FooterButtonList;
