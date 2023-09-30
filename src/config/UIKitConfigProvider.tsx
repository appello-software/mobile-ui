import React from 'react';

import { defaultTheme } from '~/__defaults__/defaultTheme';
import { DeepPartial } from '~/types';
import { ComponentsConfig, UIKitTheme } from './types';

export type ThemeProviderProps<T extends DeepPartial<UIKitTheme>> = {
  theme?: T;
  componentsConfig?: ComponentsConfig;
};

const defaultContextValue: Required<ThemeProviderProps<UIKitTheme>> = {
  theme: defaultTheme,
  componentsConfig: {},
};

export const UIKitConfigContext =
  React.createContext<Required<ThemeProviderProps<DeepPartial<UIKitTheme>>>>(defaultContextValue);
