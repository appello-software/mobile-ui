import StorybookUI from '@appello/mobile-ui/.storybook';
import React from 'react';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { initialWindowMetrics, SafeAreaProvider } from 'react-native-safe-area-context';

import { componentsConfig, theme, UIKitConfigProvider } from './view/uiKit';

const RootApp: React.FC = () => {
  return (
    <GestureHandlerRootView style={styles.container}>
      <KeyboardProvider>
        <SafeAreaProvider initialMetrics={initialWindowMetrics}>
          <UIKitConfigProvider componentsConfig={componentsConfig} theme={theme}>
            <StorybookUI />
          </UIKitConfigProvider>
        </SafeAreaProvider>
      </KeyboardProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  storybookCloseButtonContainer: {
    position: 'absolute',
    left: '60%',
    right: 15,
  },
  storybookCloseButton: {
    height: 35,
  },
});

export default RootApp;
