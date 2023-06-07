import * as React from 'react';
import { ComponentProps } from 'react';
import { ComponentConfig, configured, FuncComponentConfig } from 'react-configured';
import { StyleSheet, Pressable, PressableProps, View } from 'react-native';
import { Flow } from 'react-native-animated-spinkit';
import chroma from 'chroma-js';
import { LinearGradient, LinearGradientProps } from 'expo-linear-gradient';

import { AppText } from '~/components/common/AppText';
import { makeStyles, mergePropsWithStyle } from '~/utils';
import { useBaseComponentsConfig, useUIKitTheme } from '~/config/utils';
import { StyleProp } from 'react-native/Libraries/StyleSheet/StyleSheet';
import { ViewStyle } from 'react-native/Libraries/StyleSheet/StyleSheetTypes';

export interface ButtonProps extends PressableProps {
  labelProps?: ComponentProps<typeof AppText>;
  loaderColor?: string;
  isLoading?: boolean;
  variant?: 'primary' | 'secondary';
  size?: 'medium' | 'big';
  pressedOverlayColor?: string;
  backgroundGradient?: Pick<LinearGradientProps, 'colors' | 'locations' | 'start' | 'end'>;
  // icon?: IconName;
  style?: StyleProp<ViewStyle>;
}

const BaseButton: React.FC<React.PropsWithChildren<ButtonProps>> = ({
  labelProps,
  disabled,
  isLoading,
  children,
  loaderColor,
  pressedOverlayColor,
  backgroundGradient,
  style,
  onPressIn,
  onPressOut,
  // icon,
  ...buttonProps
}) => {
  const [pressed, setPressed] = React.useState(false);
  const styles = useStyles();
  const theme = useUIKitTheme();

  const label =
    typeof children === 'string' ? (
      <AppText
        {...labelProps}
        color={!disabled ? labelProps?.color : theme.colors.gray['3']}
        style={labelProps?.style}
      >
        {children}
      </AppText>
    ) : (
      children
    );

  const handlePressIn = React.useCallback<NonNullable<PressableProps['onPressIn']>>(
    event => {
      setPressed(true);
      onPressIn?.(event);
    },
    [onPressIn],
  );

  const handlePressOut = React.useCallback<NonNullable<PressableProps['onPressOut']>>(
    event => {
      setPressed(true);
      onPressOut?.(event);
    },
    [onPressOut],
  );

  const buttonContainerStyle = React.useMemo<StyleProp<ViewStyle>>(
    () =>
      StyleSheet.flatten([
        style,
        disabled && styles.disabled,
        { position: 'relative', overflow: 'hidden' },
      ]),
    [style],
  );

  const buttonContent = (
    <>
      {!!pressedOverlayColor && (
        <View style={[styles.overlay, pressed && { backgroundColor: pressedOverlayColor }]} />
      )}
      {label}
      {isLoading && <Flow color={loaderColor} size={40} />}
    </>
  );

  return (
    <Pressable
      {...buttonProps}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      accessibilityRole="button"
      disabled={disabled || isLoading}
      style={buttonContainerStyle}
    >
      {backgroundGradient ? (
        <LinearGradient {...backgroundGradient} style={styles.buttonContentContainer}>
          {buttonContent}
        </LinearGradient>
      ) : (
        <View style={styles.buttonContentContainer}>{buttonContent}</View>
      )}
    </Pressable>
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

    const { variant } = props;

    const styles = useStyles();

    return {
      style: StyleSheet.flatten([
        styles.baseStyle,
        variant === 'primary' ? styles['variant:primary'] : styles['variant:secondary'],
      ]),
      loaderColor: theme.colors.white,
      labelProps: {
        variant: 'p3',
        style: styles['variant:primary__text'],
      },
      pressedOverlayColor: (variant === 'primary'
        ? chroma(theme.colors.black[1]).alpha(0.1)
        : chroma(theme.colors.gray[2]).alpha(0.5)
      ).hex(),
    };
  },
  { mergeProps: mergePropsWithStyle },
);

const useStyles = makeStyles(theme => ({
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
  buttonContentContainer: {
    width: '100%',
    height: '100%',
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

  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
}));
