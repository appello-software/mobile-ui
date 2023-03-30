import * as React from 'react';
import { ComponentProps } from 'react';
import { ComponentConfig, configured, FuncComponentConfig } from 'react-configured';
import { StyleSheet, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { Flow } from 'react-native-animated-spinkit';

import { AppText } from '~/components/common/AppText';
import { mergePropsWithStyle } from '~/utils';
import { useBaseComponentsConfig, useUIKitTheme } from '~/config';

export interface ButtonProps extends TouchableOpacityProps {
  labelProps: ComponentProps<typeof AppText>;
  loaderColor?: string;
  isLoading?: boolean;
  variant?: 'primary' | 'secondary';
  size?: 'medium' | 'big';
  // icon?: IconName;
}

const BaseButton: React.FC<React.PropsWithChildren<ButtonProps>> = ({
  labelProps,
  disabled,
  isLoading,
  children,
  loaderColor,
  // icon,
  ...buttonProps
}) => {
  const label =
    typeof children === 'string' ? <AppText {...labelProps}>{children}</AppText> : children;

  // TODO: use TouchableHighlight after designers fix the design
  return (
    <TouchableOpacity {...buttonProps} accessibilityRole="button" disabled={disabled || isLoading}>
      <>
        {label}
        {isLoading && <Flow color={loaderColor} size={40} />}
      </>
    </TouchableOpacity>
  );
};

export type ButtonConfig = ComponentConfig<typeof BaseButton>;

export type FuncButtonConfig = FuncComponentConfig<typeof BaseButton, ButtonConfig>;

export const Button = configured(
  BaseButton,
  (props): ButtonConfig => {
    const theme = useUIKitTheme();
    const { button } = useBaseComponentsConfig();

    const projectButtonConfig = button && typeof button === 'function' ? button(props) : button;

    if (projectButtonConfig) return projectButtonConfig;

    const { disabled, variant } = props;

    const styles = StyleSheet.create({
      baseStyle: {
        height: 54,
        paddingHorizontal: 16,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        borderStyle: 'solid',
        borderWidth: 0,
      },
      disabled: {
        backgroundColor: theme.colors.gray['5'],
      },
      disabled__text: {
        color: theme.colors.gray['3'],
      },
      'variant:primary': {
        backgroundColor: theme.colors.primary,
      },
      'variant:primary__text': {
        color: theme.colors.white,
      },
      'variant:secondary': {
        backgroundColor: theme.colors.white,
        borderWidth: 1,
        borderColor: theme.colors.gray['5'],
      },
      'variant:secondary__text': {
        color: theme.colors.black['2'],
      },
    });

    return {
      style: StyleSheet.flatten([
        styles.baseStyle,
        variant === 'primary' ? styles['variant:primary'] : styles['variant:secondary'],
        disabled && styles.disabled,
      ]),
      loaderColor: theme.colors.white,
      activeOpacity: 0.85,
      labelProps: {
        variant: 'p3',
        style: [styles['variant:primary__text'], disabled && styles.disabled__text],
      },
    };
  },
  { mergeProps: mergePropsWithStyle },
);
