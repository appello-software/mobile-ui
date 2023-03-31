import React from 'react';

import { defaultTheme } from '~/__defaults__/defaultTheme';
import { DeepPartial } from '~/types';
import { BaseComponentsConfig, UIKitTheme } from './types';

export type ThemeProviderProps<T extends DeepPartial<UIKitTheme>> = {
  theme?: T;
  baseComponentsConfig?: BaseComponentsConfig;
};

const defaultContextValue: Required<ThemeProviderProps<UIKitTheme>> = {
  theme: defaultTheme,
  baseComponentsConfig: {},
};

export const UIKitConfigContext =
  React.createContext<Required<ThemeProviderProps<DeepPartial<UIKitTheme>>>>(defaultContextValue);
