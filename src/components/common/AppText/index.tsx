import React from 'react';
import { StyleSheet, Text as RNText, TextProps as RNTextProps, TextStyle } from 'react-native';

import { useCombinedPropsWithConfig } from '~/hooks/useCombinedPropsWithConfig';
import { useCombinedStylesWithConfig } from '~/hooks/useCombinedStylesWithConfig';
import { makeStyles } from '~/utils';

type TextVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'p1'
  | 'p2'
  | 'p3'
  | 'p4'
  | 'p5'
  | 'p6';

export interface AppTextProps extends RNTextProps {
  /** Variant of displaying text */
  variant?: TextVariant;
  /** Text color */
  color?: string;
  /** Should text be in uppercase */
  uppercase?: boolean;
  /** Should text be underlined */
  underline?: boolean;
  /** Text weight */
  weight?: 'light' | 'regular' | 'medium' | 'bold';
  /** Text align */
  align?: TextStyle['textAlign'];
}

/**
 * Primary UI component for text displaying.
 * It extends default [RN Text](https://reactnative.dev/docs/text) component and its props.
 */
export const AppText: React.FC<AppTextProps> = props => {
  const styles = useCombinedStylesWithConfig('AppText', useAppTextStyles);
  const {
    variant = 'p3',
    weight = 'regular',
    color,
    uppercase,
    underline,
    style,
    align,
    ...textProps
  } = useCombinedPropsWithConfig('AppText', props);

  return (
    <RNText
      {...textProps}
      style={StyleSheet.flatten([
        styles['app-text'],
        styles[`app-text--${variant}`],
        styles[`app-text--${weight}`],
        !!color && { color },
        !!align && { textAlign: align },
        uppercase && { textTransform: 'uppercase' },
        underline && { textDecorationLine: 'underline' },
        style,
      ] as TextStyle[])}
    />
  );
};

interface AppTextStyle {
  'app-text'?: TextStyle;
  'app-text--h1'?: TextStyle;
  'app-text--h2'?: TextStyle;
  'app-text--h3'?: TextStyle;
  'app-text--h4'?: TextStyle;
  'app-text--h5'?: TextStyle;
  'app-text--h6'?: TextStyle;
  'app-text--p1'?: TextStyle;
  'app-text--p2'?: TextStyle;
  'app-text--p3'?: TextStyle;
  'app-text--p4'?: TextStyle;
  'app-text--p5'?: TextStyle;
  'app-text--p6'?: TextStyle;
  'app-text--light'?: TextStyle;
  'app-text--regular'?: TextStyle;
  'app-text--medium'?: TextStyle;
  'app-text--bold'?: TextStyle;
}

export const useAppTextStyles = makeStyles<void, AppTextStyle>(() => {
  return {
    'app-text--h1': {
      fontSize: 34,
      lineHeight: 48,
    },
    'app-text--h2': {
      fontSize: 29,
      lineHeight: 42,
    },
    'app-text--h3': {
      fontSize: 26,
      lineHeight: 36,
    },
    'app-text--h4': {
      fontSize: 21,
      lineHeight: 32,
    },
    'app-text--h5': {
      fontSize: 19,
      lineHeight: 30,
    },
    'app-text--h6': {
      fontSize: 17,
      lineHeight: 25,
    },

    'app-text--p1': {
      fontSize: 15,
      lineHeight: 24,
    },
    'app-text--p2': {
      fontSize: 14,
      lineHeight: 21,
    },
    'app-text--p3': {
      fontSize: 13,
      lineHeight: 23,
    },
    'app-text--p4': {
      fontSize: 12,
      lineHeight: 21,
    },
    'app-text--p5': {
      fontSize: 11,
      lineHeight: 16,
    },
    'app-text--p6': {
      fontSize: 10,
      lineHeight: 16,
    },

    'app-text--light': {},
    'app-text--regular': {},
    'app-text--medium': {},
    'app-text--bold': {},
  };
});
