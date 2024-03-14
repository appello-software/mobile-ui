import React, { FC } from 'react';
import {
  ColorValue,
  StyleSheet,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {
  createNumberMask,
  MaskInputProps,
  Masks,
  useMaskedInputProps,
} from 'react-native-mask-input';
import { SvgProps } from 'react-native-svg';

import { AppText } from '~/components';
import { useUIKitTheme } from '~/config/utils';
import { useCombinedPropsWithConfig } from '~/hooks/useCombinedPropsWithConfig';
import { useCombinedStylesWithConfig } from '~/hooks/useCombinedStylesWithConfig';
import { makeStyles } from '~/utils';

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

interface TextInputStyle {
  'text-input'?: TextStyle;
  'text-input--with-icon'?: TextStyle;
  'text-input--disabled'?: TextStyle;
  'text-input--focused'?: TextStyle;
  'text-input--error'?: TextStyle;
  'text-input--multiline'?: TextStyle;
  'text-input__counter'?: TextStyle;
  'text-input__accessory-right-container'?: ViewStyle;
  'text-input__icon-container'?: ViewStyle;
}

/**
 * Primary UI component for inputting text into the app via a keyboard.<br>
 * It extends default [RN TextInput](https://reactnative.dev/docs/textinput) component and its props.<br>
 * It has additional built-in functionality such as icon on the left, any right accessory and mask.
 *
 * Style configuration interface:
 * ```interface TextInputStyle {
 *   'text-input'?: TextStyle;
 *   'text-input--with-icon'?: TextStyle;
 *   'text-input--disabled'?: TextStyle;
 *   'text-input--focused'?: TextStyle;
 *   'text-input--error'?: TextStyle;
 *   'text-input--multiline'?: TextStyle;
 *   'text-input__counter'?: TextStyle;
 *   'text-input__accessory-right-container'?: ViewStyle;
 *   'text-input__icon-container'?: ViewStyle;
 * }```
 */
export const TextInput: FC<TextInputProps> = props => {
  const { colors } = useUIKitTheme();

  const styles = useCombinedStylesWithConfig('TextInput', useTextInputStyles);
  const {
    error,
    disabled,
    editable,
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
    placeholderTextColor = colors.gray['3'],
    maxLength,
    ...textInputProps
  } = useCombinedPropsWithConfig('TextInput', props);

  const [isFocused, setIsFocused] = React.useState<boolean>(false);

  const fullStyle = StyleSheet.flatten([
    styles['text-input'],
    multiline && styles['text-input--multiline'],
    !multiline && !!Icon && styles['text-input--with-icon'],
    style,
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
    value: maskValue,
    onChangeText: onMaskChangeText,
    placeholder: maskPlaceholder,
  } = useMaskedInputProps({
    mask,
    value,
    onChangeText: (_, unmasked) => onChangeText?.(unmasked),
    placeholderFillCharacter,
  });

  return (
    <TouchableOpacity disabled={disabled || !onPress} onPress={onPress}>
      <View pointerEvents={onPress ? 'none' : 'auto'}>
        <RNTextInput
          {...textInputProps}
          cursorColor={colors.primary}
          editable={editable || (!disabled && !onPress)}
          maxLength={maxLength}
          multiline={multiline}
          placeholder={placeholder ?? maskPlaceholder}
          placeholderTextColor={placeholderTextColor}
          selectionColor={colors.primary}
          style={fullStyle}
          value={maskValue}
          onBlur={handleBlur}
          onChangeText={onMaskChangeText}
          onFocus={handleFocus}
        />
        {!multiline && Icon ? (
          <View style={styles['text-input__icon-container']}>
            <Icon
              color={'color' in fullStyle ? (fullStyle?.color as ColorValue) : undefined}
              height={iconSize?.height}
              width={iconSize?.width}
            />
          </View>
        ) : null}
        {!multiline && accessoryRight ? (
          <View style={styles['text-input__accessory-right-container']}>{accessoryRight}</View>
        ) : null}
        {multiline && !!maxLength && (
          <AppText color={colors.gray['3']} style={styles['text-input__counter']} variant="p5">
            {value?.length || 0}/{maxLength}
          </AppText>
        )}
      </View>
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
      paddingHorizontal: 18,
      paddingTop: 16,
      paddingBottom: 23,
      textAlignVertical: 'top',
    },
    'text-input__counter': {
      position: 'absolute',
      bottom: 9,
      right: 9,
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
  } as TextInputStyle);
});

export { createNumberMask, Masks };
