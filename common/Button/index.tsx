import { useSwitchValue } from '@appello/common/lib/hooks';
import {
  ButtonColors,
  ButtonVariant,
  TextThemeProps,
  UIKitTheme,
  useUIKitTheme,
} from '@appello/mobile-ui';
import { AppText } from '@appello/mobile-ui/common/AppText';
import { layout } from '@appello/mobile-ui/styles';
import { makeStyles } from '@appello/mobile-ui/utils';
import * as React from 'react';
import { useMemo } from 'react';
import { Pressable, PressableProps, StyleProp, TextStyle, ViewStyle } from 'react-native';
import { Flow } from 'react-native-animated-spinkit';
import { LinearGradient } from 'react-native-linear-gradient';

export interface ButtonProps extends Omit<PressableProps, 'title' | 'style'> {
  variant: ButtonVariant;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  label?: string;
  isLoading?: boolean;
  fullWidth?: boolean;
  // icon?: IconName;
}

export const Button: React.FC<ButtonProps> = ({
  containerStyle,
  label,
  variant = 'primary',
  disabled,
  isLoading,
  fullWidth,
  children,
  textStyle,
  // icon,
  ...buttonProps
}) => {
  const { value: isPressed, off, on } = useSwitchValue(false);

  const styles = useStyles({ variant, disabled });
  const buttonTheme = useButtonTheme({ variant, disabled });

  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled || isLoading}
      onPressIn={on}
      onPressOut={off}
      {...buttonProps}
    >
      <LinearGradient
        {...(typeof buttonTheme.colors.background !== 'string'
          ? buttonTheme.colors.background
          : { colors: [buttonTheme.colors.background, buttonTheme.colors.background] })}
        style={[
          styles.button,
          containerStyle,
          fullWidth && layout.fullWidth,
          isPressed && { opacity: 0.8 },
        ]}
      >
        <>
          {/* {icon && <SvgIcon name={icon} size={25} style={styles.icon} />} */}
          {label && (
            <AppText style={[styles.buttonText, textStyle, isLoading && styles.buttonTextLoading]}>
              {label}
            </AppText>
          )}
          {isLoading && <Flow color={buttonTheme.colors.loader} size={40} style={styles.loader} />}
          {children}
        </>
      </LinearGradient>
    </Pressable>
  );
};

type ButtonThemeProps = Pick<ButtonProps, 'variant' | 'disabled'>;

const useButtonTheme = ({
  variant,
  disabled,
}: ButtonThemeProps): Omit<UIKitTheme['button'], 'colors'> & {
  colors: ButtonColors;
  text: TextThemeProps;
} => {
  const theme = useUIKitTheme();

  return useMemo(() => {
    const defaultColors = theme.button.colors[variant];
    const colors = disabled
      ? {
          ...defaultColors,
          ...theme.button.colors[`${variant}Disabled`],
        }
      : { ...defaultColors };

    const text = {
      ...theme.text[theme.button.textVariant],
      color: colors.label,
    };

    return {
      ...theme.button,
      colors,
      text,
    };
  }, [theme, variant, disabled]);
};

const useStyles = makeStyles((props: ButtonThemeProps) => {
  const theme = useButtonTheme(props);

  return {
    icon: {
      marginRight: 5,
    },
    button: {
      ...theme.layout.medium,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      backgroundColor:
        typeof theme.colors.background === 'string' ? theme.colors.background : undefined,
      borderColor: theme.colors.border ?? undefined,
      borderWidth: theme.colors.border ? 1 : 0,
      borderStyle: 'solid',
    },
    buttonText: {
      ...theme.text,
    },
    buttonTextLoading: {
      opacity: 0,
    },
    loader: {
      position: 'absolute',
    },
  };
});
