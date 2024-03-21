import { createUIKitConfigProvider } from '@appello/mobile-ui';

import { componentsConfig } from './config';
import { theme, ThemeType } from './theme';

const { useUIKitTheme, UIKitConfigProvider, makeStyles, makeDefaultProps } =
  createUIKitConfigProvider<ThemeType>();

export {
  componentsConfig,
  makeDefaultProps,
  makeStyles,
  theme,
  UIKitConfigProvider,
  useUIKitTheme,
};
