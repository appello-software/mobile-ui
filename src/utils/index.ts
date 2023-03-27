import { ElementType } from 'react';
import { PartialProps } from 'react-configured';
import { StyleSheet } from 'react-native';

import { UIKitTheme } from '~/config/types';
import { DeepPartial } from '~/types';

type Styles = Parameters<typeof StyleSheet.create>[0];

export const makeStyles = <TProps extends Record<string, unknown> | void>(
  styles: ((props: TProps) => Styles) | Styles,
): ((props: TProps) => Styles) => {
  return styles instanceof Function ? styles : () => styles;
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
