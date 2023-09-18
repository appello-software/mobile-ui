import { getStorybookUI } from '@storybook/react-native';

import './storybook.requires';
import './doctools';

export const StorybookUIRoot = getStorybookUI({
  shouldDisableKeyboardAvoidingView: true,
});
