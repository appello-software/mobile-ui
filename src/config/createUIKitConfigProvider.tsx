import { deepmerge } from 'deepmerge-ts';
import React, { useContext, useMemo } from 'react';

import { defaultTheme } from '~/__defaults__/defaultTheme';
import { DeepPartial } from '~/types';
import { UIKitTheme } from './types';

import { UIKitConfigContext, ThemeProviderProps } from './UIKitConfigProvider';

export function createUIKitConfigProvider<T extends DeepPartial<UIKitTheme>>() {
  type FullContext = Required<ThemeProviderProps<T>>;

  const UIKitConfigProvider: React.FC<React.PropsWithChildren<ThemeProviderProps<T>>> = ({
    children,
    theme,
    baseComponentsConfig = {},
  }) => {
    const mergedTheme = useMemo<FullContext['theme']>(() => {
      return (theme ? deepmerge(defaultTheme, theme) : defaultTheme) as FullContext['theme'];
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

  function useUIKitTheme(): FullContext['theme'] {
    return useContext(UIKitConfigContext).theme as FullContext['theme'];
  }

  function useBaseComponentsConfig(): FullContext['baseComponentsConfig'] {
    return useContext(UIKitConfigContext).baseComponentsConfig;
  }

  return {
    UIKitConfigProvider,
    useUIKitTheme,
    useBaseComponentsConfig,
  };
}
