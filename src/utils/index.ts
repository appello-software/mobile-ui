import chromaJs from 'chroma-js';
import React, { ComponentProps } from 'react';
import { StyleSheet } from 'react-native';

import { UIKitTheme } from '~/config/types';
import { useUIKitTheme } from '~/config/utils';
import { DeepPartial } from '~/types';

import NamedStyles = StyleSheet.NamedStyles;
import { deepmerge } from 'deepmerge-ts';

import { defaultTheme } from '~/__defaults__/defaultTheme';

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

export const makeDefaultProps =
  <TProps extends ComponentProps<any>>(makeProps: (theme: UIKitTheme) => TProps): (() => TProps) =>
  () => {
    const theme = useUIKitTheme();
    return React.useMemo(() => makeProps(theme), [theme]);
  };

export const makeTheme = <T extends DeepPartial<UIKitTheme>>(theme: T): UIKitTheme & T =>
  deepmerge(defaultTheme, theme) as UIKitTheme & T;

export const chroma = chromaJs;
