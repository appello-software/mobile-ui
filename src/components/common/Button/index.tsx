import * as React from 'react';
import { ComponentProps } from 'react';
import { ComponentConfig, configured, FuncComponentConfig } from 'react-configured';
import { StyleSheet, Pressable, PressableProps, View, StyleProp, ViewStyle } from 'react-native';
import { Flow } from 'react-native-animated-spinkit';
import { LinearGradient, LinearGradientProps } from 'expo-linear-gradient';

import { AppText } from '~/components/common/AppText';
import { chroma, makeStyles, mergePropsWithStyle } from '~/utils';
import { useBaseComponentsConfig, useUIKitTheme } from '~/config/utils';
import { SvgProps } from 'react-native-svg';

export interface ButtonProps extends PressableProps {
  labelProps?: ComponentProps<typeof AppText>;
  loaderColor?: string;
  isLoading?: boolean;
  variant?: 'primary' | 'secondary';
  pressedOverlayColor?: string;
  backgroundGradient?: Pick<LinearGradientProps, 'colors' | 'locations' | 'start' | 'end'>;
  Icon?: React.FC<SvgProps>;
  iconSize?: {
    width: number;
    height: number;
  };
  iconPosition?: 'left' | 'center-left' | 'right' | 'center-right';
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
  Icon,
  iconSize,
  iconPosition,
  ...buttonProps
}) => {
  const [pressed, setPressed] = React.useState(false);
  const styles = useStyles();
  const theme = useUIKitTheme();

  const labelColor = !disabled ? labelProps?.color : theme.colors.gray['3'];
  const label =
    typeof children === 'string' ? (
      <View
        style={[
          styles.labelContainer,
          Icon &&
            (iconPosition === 'left' || iconPosition === 'right') &&
            styles.labelContainerSides,
          Icon &&
            (iconPosition === 'right' || iconPosition === 'center-right') &&
            styles.labelContainerRight,
        ]}
      >
        {Icon ? <Icon color={labelColor} {...iconSize} /> : null}
        <AppText {...labelProps} color={labelColor} style={[labelProps?.style, styles.label]}>
          {children}
        </AppText>
        {Icon && (iconPosition === 'right' || iconPosition === 'left') ? (
          <View style={iconSize} />
        ) : null}
      </View>
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
      setPressed(false);
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

  return (
    <Pressable
      {...buttonProps}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      accessibilityRole="button"
      disabled={disabled || isLoading}
      style={buttonContainerStyle}
    >
      {!!pressedOverlayColor && (
        <View style={[styles.overlay, pressed && { backgroundColor: pressedOverlayColor }]} />
      )}
      {label}
      {isLoading && <Flow color={loaderColor} size={40} />}
      {backgroundGradient ? (
        <LinearGradient {...backgroundGradient} style={[styles.overlay, styles.gradientBg]} />
      ) : null}
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
        color: variant === 'primary' ? theme.colors.white : theme.colors.black['2'],
      },
      pressedOverlayColor: (variant === 'primary'
        ? chroma(theme.colors.black[1]).alpha(0.1)
        : chroma(theme.colors.gray[2]).alpha(0.5)
      ).hex(),
      iconSize: {
        width: 20,
        height: 20,
      },
      iconPosition: 'left',
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
  disabled: {
    backgroundColor: theme.colors.gray['5'],
  },
  label: {
    marginHorizontal: 7,
  },
  disabled__label: {
    color: theme.colors.gray['3'],
  },
  'variant:primary': {
    backgroundColor: theme.colors.primary,
  },
  'variant:secondary': {
    backgroundColor: theme.colors.white,
    borderWidth: 1,
    borderColor: theme.colors.gray['5'],
  },

  labelContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelContainerSides: {
    justifyContent: 'space-between',
  },
  labelContainerRight: {
    flexDirection: 'row-reverse',
  },

  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '100%',
  },
  gradientBg: {
    zIndex: -1,
  },
}));
