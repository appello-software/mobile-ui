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
import { Flow } from 'react-native-animated-spinkit';
import { SvgProps } from 'react-native-svg';

import { AppText, AppTextProps } from '~/components/common/AppText';
import { useUIKitTheme } from '~/config/utils';
import { useCombinedPropsWithConfig } from '~/hooks/useCombinedPropsWithConfig';
import { useCombinedStylesWithConfig } from '~/hooks/useCombinedStylesWithConfig';
import { makeStyles } from '~/utils';

export interface ButtonProps extends PressableProps {
  /** Properties of the label text */
  labelProps?: AppTextProps & { disabledColor?: ColorValue };
  /** Color of the loader component */
  loaderColor?: string;
  /** Is the Button currently in loading state */
  isLoading?: boolean;
  /** Variant of displaying the button */
  variant?: 'primary' | 'secondary';
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
export const Button: React.FC<React.PropsWithChildren<ButtonProps>> = ({
  variant = 'primary',
  ...props
}) => {
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
  }[variant];
  const styles = {
    primary: useCombinedStylesWithConfig('Button.Primary', usePrimaryButtonStyles),
    secondary: useCombinedStylesWithConfig('Button.Secondary', useSecondaryButtonStyles),
  }[variant];
  const layoutStyles = useLayoutStyles();
  const theme = useUIKitTheme();

  const labelColor = !disabled
    ? labelProps?.color
    : labelProps?.disabledColor || theme.colors.gray['3'];
  const label =
    typeof children === 'string' ? (
      <View
        style={[
          layoutStyles.labelContainer,
          Icon &&
            (iconPosition === 'left' || iconPosition === 'right') &&
            layoutStyles.labelContainerSides,
          Icon &&
            (iconPosition === 'right' || iconPosition === 'center-right') &&
            layoutStyles.labelContainerRight,
        ]}
      >
        {Icon ? <Icon color={labelColor} {...iconSize} /> : null}
        <AppText
          {...labelProps}
          color={labelColor}
          style={[styles.button__label, labelProps?.style]}
        >
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
        <View style={[layoutStyles.overlay, pressed && { backgroundColor: pressedOverlayColor }]} />
      )}
      {!isLoading ? label : <Flow color={loaderColor} size={40} />}
      {backgroundGradient ? (
        <LinearGradient
          {...backgroundGradient}
          style={[layoutStyles.overlay, layoutStyles.gradientBg]}
        />
      ) : null}
    </Pressable>
  );
};

const useLayoutStyles = makeStyles(() => ({
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
