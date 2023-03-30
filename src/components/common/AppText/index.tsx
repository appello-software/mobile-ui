import React from 'react';
import { ComponentConfig, configured, FuncComponentConfig } from 'react-configured';
import { StyleSheet, Text as RNText, TextProps as RNTextProps } from 'react-native';

import { mergePropsWithStyle } from '~/utils';
import { useBaseComponentsConfig } from '~/config';

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

interface AppTextProps extends RNTextProps {
  variant: TextVariant;
}

const BaseAppText: React.FC<AppTextProps> = ({ variant, ...textProps }) => {
  return <RNText {...textProps} />;
};

export type AppTextConfig = ComponentConfig<React.FC<AppTextProps>>;

export type FuncAppTextConfig = FuncComponentConfig<React.FC<AppTextProps>, AppTextConfig>;

export const AppText = configured(
  BaseAppText,
  (props): AppTextConfig => {
    const { appText } = useBaseComponentsConfig();

    const projectAppTextConfig =
      appText && typeof appText === 'function' ? appText(props) : appText;

    if (projectAppTextConfig) return projectAppTextConfig;

    const { variant } = props;

    const variantStyles = StyleSheet.create({
      h1: {
        fontSize: 34,
        lineHeight: 48,
      },
      h2: {
        fontSize: 29,
        lineHeight: 42,
      },
      h3: {
        fontSize: 26,
        lineHeight: 36,
      },
      h4: {
        fontSize: 21,
        lineHeight: 32,
      },
      h5: {
        fontSize: 19,
        lineHeight: 30,
      },
      h6: {
        fontSize: 17,
        lineHeight: 25,
      },
      p1: {
        fontSize: 15,
        lineHeight: 24,
      },

      p2: {
        fontSize: 14,
        lineHeight: 21,
      },

      p3: {
        fontSize: 13,
        lineHeight: 23,
      },

      p4: {
        fontSize: 12,
        lineHeight: 21,
      },

      p5: {
        fontSize: 11,
        lineHeight: 16,
      },
      p6: {
        fontSize: 10,
        lineHeight: 16,
      },
    });

    return {
      style: variantStyles[variant],
    };
  },
  { mergeProps: mergePropsWithStyle },
);
