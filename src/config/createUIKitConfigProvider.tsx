import React, { ComponentProps, useContext } from 'react';
import { StyleSheet } from 'react-native';

import { defaultTheme } from '../__defaults__/defaultTheme';
import { UIKitTheme } from './types';
import { ThemeProviderProps, UIKitConfigContext } from './UIKitConfigProvider';

import NamedStyles = StyleSheet.NamedStyles;

export function createUIKitConfigProvider<T extends UIKitTheme = UIKitTheme>() {
  type FullContext = Required<ThemeProviderProps<T>>;

  const UIKitConfigProvider: React.FC<React.PropsWithChildren<ThemeProviderProps<T>>> = ({
    children,
    theme,
    componentsConfig = {},
  }) => {
    return (
      <UIKitConfigContext.Provider
        value={React.useMemo(
          () => ({ theme: theme ?? defaultTheme, componentsConfig }),
          [theme, componentsConfig],
        )}
      >
        {children}
      </UIKitConfigContext.Provider>
    );
  };

  function useUIKitTheme(): FullContext['theme'] {
    return useContext(UIKitConfigContext).theme as FullContext['theme'];
  }

  const makeStyles =
    <TProps extends object | void, TStyles extends NamedStyles<TStyles> | NamedStyles<any>>(
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
    makeDefaultProps,
  };
}
