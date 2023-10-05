import { deepmerge } from 'deepmerge-ts';
import React, { ComponentProps, useContext } from 'react';
import { StyleSheet } from 'react-native';

import { defaultTheme } from '~/__defaults__/defaultTheme';
import { DeepPartial } from '~/types';

import { UIKitTheme } from './types';
import { ThemeProviderProps, UIKitConfigContext } from './UIKitConfigProvider';

import NamedStyles = StyleSheet.NamedStyles;

export function createUIKitConfigProvider<T extends DeepPartial<UIKitTheme> = UIKitTheme>() {
  type FullContext = Required<ThemeProviderProps<T>>;

  const UIKitConfigProvider: React.FC<React.PropsWithChildren<ThemeProviderProps<T>>> = ({
    children,
    theme,
    componentsConfig = {},
  }) => {
    const mergedTheme = React.useMemo<FullContext['theme']>(() => {
      return (theme ? deepmerge(defaultTheme, theme) : defaultTheme) as FullContext['theme'];
    }, [theme]);

    return (
      <UIKitConfigContext.Provider value={{ theme: mergedTheme, componentsConfig }}>
        {children}
      </UIKitConfigContext.Provider>
    );
  };

  function useUIKitTheme(): FullContext['theme'] {
    return useContext(UIKitConfigContext).theme as FullContext['theme'];
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

  const makeDefaultProps =
    <TProps extends ComponentProps<any>>(
      makeProps: (theme: FullContext['theme']) => TProps,
    ): (() => TProps) =>
    () => {
      const theme = useUIKitTheme();
      return React.useMemo(() => makeProps(theme), [theme]);
    };

  return {
    UIKitConfigProvider,
    useUIKitTheme,
    makeStyles,
  };
}
