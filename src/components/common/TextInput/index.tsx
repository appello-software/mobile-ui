import React, { FC } from 'react';
import {
  ColorValue,
  StyleSheet,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  useMaskedInputProps,
  MaskInputProps,
  createNumberMask,
  Masks,
} from 'react-native-mask-input';

import { makeStyles } from '~/utils';
import { useUIKitTheme } from '~/config/utils';
import { SvgProps } from 'react-native-svg';
import { useCombinedStylesWithConfig } from '~/hooks/useCombinedStylesWithConfig';
import { useCombinedPropsWithConfig } from '~/hooks/useCombinedPropsWithConfig';

export interface TextInputProps extends RNTextInputProps {
  /** Should TextInput have an error state */
  error?: boolean;
  /** Should TextInput be disabled */
  disabled?: boolean;
  /** Callback that is called after a touch. If set, TextInput is not editable */
  onPress?: () => void;
  /** ReactNode to display on the right of the TextInput */
  accessoryRight?: React.ReactNode;
  /** Icon component to display on the left of the TextInput */
  Icon?: React.FC<SvgProps>;
  /** Size of the Icon component */
  iconSize?: {
    width: number;
    height: number;
  };
  /** Mask to display text in specific format ([check the documentation here](https://github.com/CaioQuirinoMedeiros/react-native-mask-input#mask)) */
  mask?: MaskInputProps['mask'];
  /** Character to be used as the "fill character" on the default placeholder value when using mask. */
  placeholderFillCharacter?: MaskInputProps['placeholderFillCharacter'];
}

/**
 * Primary UI component for inputting text into the app via a keyboard.
 * It extends default [RN TextInput](https://reactnative.dev/docs/textinput) component and its props.
 * It has additional built-in functionality such as icon on the left, any right accessory and mask.
 */
export const TextInput: FC<TextInputProps> = props => {
  const theme = useUIKitTheme();

  const styles = useCombinedStylesWithConfig('TextInput', useTextInputStyles);
  const {
    error,
    disabled,
    onPress,
    multiline,
    style,
    value,
    onChangeText,
    placeholder,
    Icon,
    accessoryRight,
    mask,
    placeholderFillCharacter,
    iconSize = { width: 20, height: 20 },
    placeholderTextColor = theme.colors.gray['3'],
    ...textInputProps
  } = useCombinedPropsWithConfig('TextInput', props);

  const [isFocused, setIsFocused] = React.useState<boolean>(false);

  const fullStyle = StyleSheet.flatten([
    styles['text-input'],
    style,
    multiline && styles['text-input--multiline'],
    !multiline && !!Icon && styles['text-input--with-icon'],
    disabled && styles['text-input--disabled'],
    !disabled && error && styles['text-input--error'],
    !disabled && !error && isFocused && styles['text-input--focused'],
  ]);

  const handleFocus: TextInputProps['onFocus'] = e => {
    textInputProps.onFocus?.(e);
    setIsFocused(true);
  };

  const handleBlur: TextInputProps['onBlur'] = e => {
    textInputProps.onBlur?.(e);
    setIsFocused(false);
  };

  const {
    onChangeText: onMaskChangeText,
    value: maskValue,
    placeholder: maskPlaceholder,
  } = useMaskedInputProps({
    value,
    onChangeText,
    mask,
    placeholderFillCharacter,
  });

  return (
    <TouchableOpacity disabled={disabled || !onPress} onPress={onPress}>
      <RNTextInput
        {...textInputProps}
        style={fullStyle}
        placeholderTextColor={placeholderTextColor}
        placeholder={placeholder ?? maskPlaceholder}
        value={maskValue}
        onChangeText={onMaskChangeText}
        onFocus={handleFocus}
        onBlur={handleBlur}
        editable={!disabled && !onPress}
        multiline={multiline}
      />
      {!multiline && Icon ? (
        <View style={styles['text-input__icon-container']}>
          <Icon
            color={'color' in fullStyle ? (fullStyle?.color as ColorValue) : undefined}
            width={iconSize?.width}
            height={iconSize?.height}
          />
        </View>
      ) : null}
      {!multiline && accessoryRight ? (
        <View style={styles['text-input__accessory-right-container']}>{accessoryRight}</View>
      ) : null}
    </TouchableOpacity>
  );
};

export const useTextInputStyles = makeStyles(theme => {
  return StyleSheet.create({
    'text-input': {
      height: 54,
      paddingHorizontal: 18,

      borderRadius: 6,
      borderWidth: 1,
      borderStyle: 'solid',

      fontSize: 13,
      textAlignVertical: 'center',
      includeFontPadding: false,

      color: theme.colors.black['1'],
      backgroundColor: theme.colors.white,
      borderColor: theme.colors.gray['5'],
    },
    'text-input--with-icon': {
      paddingLeft: 47,
    },
    'text-input--disabled': {
      color: theme.colors.gray['3'],
      backgroundColor: theme.colors.gray['7'],
      borderColor: theme.colors.gray['7'],
    },
    'text-input--focused': {
      borderColor: theme.colors.primary,
    },
    'text-input--error': {
      borderColor: theme.colors.error,
    },
    'text-input--multiline': {
      height: 104,
      paddingHorizontal: 19,
    },
    'text-input__accessory-right-container': {
      height: '100%',
      position: 'absolute',
      top: 0,
      right: 0,
      alignItems: 'center',
      justifyContent: 'center',
    },
    'text-input__icon-container': {
      height: '100%',
      position: 'absolute',
      top: 0,
      left: 18,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
});

export { createNumberMask, Masks };
