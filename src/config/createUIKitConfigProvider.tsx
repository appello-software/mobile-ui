import { deepmerge } from 'deepmerge-ts';
import React, { useContext } from 'react';

import { defaultTheme } from '~/__defaults__/defaultTheme';
import { DeepPartial } from '~/types';
import { UIKitTheme } from './types';

import { UIKitConfigContext, ThemeProviderProps } from './UIKitConfigProvider';
import { StyleSheet } from 'react-native';

import NamedStyles = StyleSheet.NamedStyles;

export function createUIKitConfigProvider<T extends DeepPartial<UIKitTheme> = UIKitTheme>() {
  type FullContext = Required<ThemeProviderProps<T>>;

  const UIKitConfigProvider: React.FC<React.PropsWithChildren<ThemeProviderProps<T>>> = ({
    children,
    theme,
    baseComponentsConfig = {},
  }) => {
    const mergedTheme = React.useMemo<FullContext['theme']>(() => {
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

  const makeStyles =
    <
      TProps extends Record<string, unknown> | void,
      TStyles extends NamedStyles<TStyles> | NamedStyles<any>,
    >(
      styles: ((theme: FullContext['theme'], props: TProps) => TStyles) | TStyles,
    ): ((props: TProps) => TStyles) =>
    props => {
      const theme = useUIKitTheme();
      return React.useMemo(
        () => (styles instanceof Function ? styles(theme, props) : styles),
        [theme, props],
      );
    };

  return {
    UIKitConfigProvider,
    useUIKitTheme,
    useBaseComponentsConfig,
    makeStyles,
  };
}
