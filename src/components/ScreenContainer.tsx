import { SafeAreaView, StyleSheet, View } from 'react-native';
import { ReactNode } from 'react';
import { Colors } from '../constants/colors';
import Header from './Header';

type ScreenContainerProps = {
  children: ReactNode;
  title?: string;
};

const ScreenContainer: React.FC<ScreenContainerProps> = ({
  children,
  title,
}) => {
  return (
    <SafeAreaView style={styles.container}>
      <Header title={title} />
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});

export default ScreenContainer;
