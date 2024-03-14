import AsyncStorage from '@react-native-async-storage/async-storage';

import { view } from './configs/ondevice/storybook.requires';

const StorybookUIRoot = view.getStorybookUI({
  shouldDisableKeyboardAvoidingView: true,
  storage: {
    getItem: AsyncStorage.getItem,
    setItem: AsyncStorage.setItem,
  },
});

export default StorybookUIRoot;
