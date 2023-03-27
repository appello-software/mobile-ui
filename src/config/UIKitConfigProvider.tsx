import { deepmerge } from 'deepmerge-ts';
import React, { createContext, FC, useMemo } from 'react';

import { defaultTheme } from '~/__defaults__/defaultTheme';
import { DeepPartial } from '~/types';
import { BaseComponentsConfig, UIKitTheme } from './types';

export type ThemeProviderProps = {
  theme?: DeepPartial<UIKitTheme>;
  baseComponentsConfig?: BaseComponentsConfig;
};

export const UIKitConfigContext = createContext<Required<ThemeProviderProps>>({
  theme: defaultTheme,
  baseComponentsConfig: {},
});

export const UIKitConfigProvider: FC<React.PropsWithChildren<ThemeProviderProps>> = ({
  children,
  theme,
  baseComponentsConfig = {},
}) => {
  const mergedTheme = useMemo(() => {
    return theme ? (deepmerge(defaultTheme, theme) as UIKitTheme) : defaultTheme;
  }, [theme]);

  return (
    <UIKitConfigContext.Provider
      value={React.useMemo(
        () => ({ theme: mergedTheme, baseComponentsConfig }),
        [mergedTheme, baseComponentsConfig],
      )}
    >
      {children}
    </UIKitConfigContext.Provider>
  );
};
