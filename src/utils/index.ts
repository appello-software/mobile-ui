import React, { ElementType } from 'react';
import { PartialProps } from 'react-configured';
import { StyleSheet } from 'react-native';

import { UIKitTheme } from '~/config/types';
import { DeepPartial } from '~/types';
import { useUIKitTheme } from '~/config/utils';

import NamedStyles = StyleSheet.NamedStyles;

export const makeStyles =
  <
    TProps extends Record<string, unknown> | void,
    TStyles extends NamedStyles<TStyles> | NamedStyles<any>,
  >(
    styles: ((theme: UIKitTheme, props: TProps) => TStyles) | TStyles,
  ): ((props: TProps) => TStyles) =>
  props => {
    const theme = useUIKitTheme();
    return React.useMemo(
      () => (styles instanceof Function ? styles(theme, props) : styles),
      [theme, props],
    );
  };

export const makeTheme = <T extends DeepPartial<UIKitTheme>>(theme: T): T => theme;

export const mergePropsWithStyle = <
  T extends ElementType,
  TProps extends PartialProps<T>,
  TSecondProps extends PartialProps<T>,
>(
  baseProps: TProps,
  variantProps: TSecondProps,
): TProps | TSecondProps => ({
  ...baseProps,
  ...variantProps,
  ...('style' in baseProps && 'style' in variantProps
    ? {
        style: StyleSheet.compose(baseProps.style, variantProps.style),
      }
    : {}),
});
