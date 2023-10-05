import React from 'react';
import { StyleSheet, View } from 'react-native';

export const CenterView: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <View style={styles.main}>{children}</View>;
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding: 40,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
});
