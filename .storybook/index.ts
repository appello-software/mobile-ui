import { getStorybookUI } from '@storybook/react-native';

import './configs/ondevice/storybook.requires';

export const StorybookUIRoot = getStorybookUI({
  shouldDisableKeyboardAvoidingView: true,
});
