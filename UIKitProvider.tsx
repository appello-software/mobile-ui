import deepMerge from 'deepmerge';
import React, { createContext, FC, useContext, useMemo } from 'react';

import { defaultTheme } from '~/ui/defaultTheme';

import { UIKitProviderProps, UIKitTheme } from './types';

export const UIKitContext = createContext<UIKitTheme>(defaultTheme);

export const UIKitProvider: FC<UIKitProviderProps> = ({ children, theme }) => {
  const mergedTheme = useMemo(() => {
    return theme ? (deepMerge(defaultTheme, theme) as UIKitTheme) : defaultTheme;
  }, [theme]);

  return <UIKitContext.Provider value={mergedTheme}>{children}</UIKitContext.Provider>;
};

export function useUIKitTheme(): UIKitTheme {
  return useContext(UIKitContext);
}
