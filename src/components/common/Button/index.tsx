import { LinearGradient, LinearGradientProps } from 'expo-linear-gradient';
import * as React from 'react';
import {
  ColorValue,
  Pressable,
  PressableProps,
  StyleProp,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import { SvgProps } from 'react-native-svg';

import { Points } from '~/components';
import { AppText, AppTextProps } from '~/components/common/AppText';
import { useUIKitTheme } from '~/config/utils';
import { useCombinedPropsWithConfig } from '~/hooks/useCombinedPropsWithConfig';
import { useCombinedStylesWithConfig } from '~/hooks/useCombinedStylesWithConfig';
import { makeStyles } from '~/utils';

const DEFAULT_LOADER_SIZE = 40;

export interface ButtonProps extends React.PropsWithChildren<PressableProps> {
  /** Properties of the label text */
  labelProps?: AppTextProps & { disabledColor?: ColorValue };
  /** Color of the loader component */
  loaderColor?: string;
  /** Is the Button currently in loading state */
  isLoading?: boolean;
  /** Variant of displaying the button */
  variant?: 'primary' | 'secondary' | 'negative' | 'plain';
  /** Color of the overlay when the Button is pressed */
  pressedOverlayColor?: string;
  /** Use it only if the Button should have gradient background */
  backgroundGradient?: Pick<LinearGradientProps, 'colors' | 'locations' | 'start' | 'end'>;
  /** Icon component to display along with label */
  Icon?: React.FC<SvgProps>;
  /** Icon size */
  iconSize?: {
    width: number;
    height: number;
  };
  /** Icon position */
  iconPosition?: 'left' | 'center-left' | 'right' | 'center-right';
  /** Button style */
  style?: StyleProp<ViewStyle>;
}

interface ButtonStyle {
  button?: ViewStyle;
  'button--disabled'?: ViewStyle;
  button__label?: TextStyle;
}

/**
 * Primary UI component for user interaction.
 * It extends default [RN Pressable](https://reactnative.dev/docs/pressable) component and its props.
 *
 * Style configuration interface:
 * ```interface ButtonStyle {
 *   button?: ViewStyle;
 *   'button--disabled'?: ViewStyle;
 *   button__label?: TextStyle;
 * }```
 */
export const Button: React.FC<ButtonProps> = ({ variant = 'primary', ...props }) => {
  const [pressed, setPressed] = React.useState(false);

  const {
    children,
    style,
    labelProps = { variant: 'p3' },
    disabled,
    isLoading,
    loaderColor,
    pressedOverlayColor,
    backgroundGradient,
    onPressIn,
    onPressOut,
    Icon,
    iconSize = { width: 20, height: 20 },
    iconPosition = 'left',
    ...buttonProps
  } = {
    primary: useCombinedPropsWithConfig('Button.Primary', props),
    secondary: useCombinedPropsWithConfig('Button.Secondary', props),
    negative: useCombinedPropsWithConfig('Button.Negative', props),
    plain: useCombinedPropsWithConfig('Button.Plain', props),
  }[variant];
  const styles = {
    primary: useCombinedStylesWithConfig('Button.Primary', usePrimaryButtonStyles),
    secondary: useCombinedStylesWithConfig('Button.Secondary', useSecondaryButtonStyles),
    negative: useCombinedStylesWithConfig('Button.Negative', useNegativeButtonStyles),
    plain: usePlainButtonStyles(),
  }[variant];
  const innerStyles = useInnerStyles();
  const theme = useUIKitTheme();

  const labelColor = !disabled
    ? labelProps?.color
    : labelProps?.disabledColor || theme.colors.gray['3'];
  const label =
    typeof children === 'string' || !children ? (
      <View
        style={[
          innerStyles.labelContainer,
          Icon &&
            (iconPosition === 'left' || iconPosition === 'right') &&
            innerStyles.labelContainerSides,
          Icon &&
            (iconPosition === 'right' || iconPosition === 'center-right') &&
            innerStyles.labelContainerRight,
        ]}
      >
        {Icon ? <Icon color={labelColor} {...iconSize} /> : null}
        {children ? (
          <AppText
            {...labelProps}
            color={labelColor}
            style={[styles.button__label, labelProps?.style]}
          >
            {children}
          </AppText>
        ) : null}
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
        styles.button,
        style,
        disabled && styles['button--disabled'],
        { position: 'relative', overflow: 'hidden' },
      ]),
    [style, disabled, styles],
  );

  return (
    <Pressable
      {...buttonProps}
      accessibilityRole="button"
      disabled={disabled || isLoading}
      style={buttonContainerStyle}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      {!!pressedOverlayColor && (
        <View style={[innerStyles.overlay, pressed && { backgroundColor: pressedOverlayColor }]} />
      )}
      {!isLoading ? label : <Points color={loaderColor} size={DEFAULT_LOADER_SIZE} />}
      {backgroundGradient ? (
        <LinearGradient
          {...backgroundGradient}
          style={[innerStyles.overlay, innerStyles.gradientBg]}
        />
      ) : null}
    </Pressable>
  );
};

const useInnerStyles = makeStyles(() => ({
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

const commonStyles = StyleSheet.create({
  button: {
    height: 54,
    paddingHorizontal: 16,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderStyle: 'solid',
    borderWidth: 0,
  },
  button__label: {
    marginHorizontal: 7,
  },
});

export const usePrimaryButtonStyles = makeStyles(theme =>
  StyleSheet.create({
    button: {
      ...commonStyles.button,
      backgroundColor: theme.colors.primary,
    },
    'button--disabled': {
      backgroundColor: theme.colors.gray['5'],
    },
    button__label: {
      ...commonStyles.button__label,
    },
  } as ButtonStyle),
);

export const useSecondaryButtonStyles = makeStyles(theme =>
  StyleSheet.create({
    button: {
      ...commonStyles.button,
      backgroundColor: theme.colors.white,
      borderColor: theme.colors.gray['5'],
      borderWidth: 1,
    },
    'button--disabled': {
      backgroundColor: theme.colors.gray['5'],
    },
    button__label: {
      ...commonStyles.button__label,
    },
  } as ButtonStyle),
);

export const useNegativeButtonStyles = makeStyles(theme =>
  StyleSheet.create({
    button: {
      ...commonStyles.button,
      backgroundColor: theme.colors.white,
      borderColor: theme.colors.error,
      borderWidth: 1,
    },
    'button--disabled': {
      borderColor: theme.colors.gray['5'],
      backgroundColor: theme.colors.gray['5'],
    },
    button__label: {
      ...commonStyles.button__label,
    },
  } as ButtonStyle),
);

export const usePlainButtonStyles = makeStyles(() =>
  StyleSheet.create({
    button: {
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
    },
    'button--disabled': {},
    button__label: {
      ...commonStyles.button__label,
    },
  } as ButtonStyle),
);
