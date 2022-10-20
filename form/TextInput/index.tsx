import { useUIKitTheme } from '@appello/mobile-ui/UIKitProvider';
import { makeStyles } from '@appello/mobile-ui/utils';
import React, { FC, useMemo, useState } from 'react';
import { TextInput as BaseTextInput, TextInputProps } from 'react-native';

interface Props extends TextInputProps {
  error?: boolean;
  disabled?: boolean;
}

export const TextInput: FC<Props> = ({ style, error, disabled, ...textInputProps }) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const styles = useStyles({ disabled });
  const theme = useUIKitTheme();

  const textInputStyle = useMemo(() => {
    return [
      styles.textInputLayout,
      style,
      styles.textInput,
      isFocused && styles.focusedTextInput,
      error && styles.errorTextInput,
    ];
  }, [styles, style, isFocused, error]);

  const handleFocus: TextInputProps['onFocus'] = e => {
    textInputProps.onFocus?.(e);
    setIsFocused(true);
  };

  const handleBlur: TextInputProps['onBlur'] = e => {
    textInputProps.onBlur?.(e);
    setIsFocused(false);
  };

  return (
    <BaseTextInput
      {...textInputProps}
      autoCapitalize="none"
      style={textInputStyle}
      placeholderTextColor={theme.input.colors.default.placeholder}
      onFocus={handleFocus}
      onBlur={handleBlur}
      editable={!disabled}
    />
  );
};

const useStyles = makeStyles((props: { disabled?: boolean }) => {
  const theme = useUIKitTheme();

  const {
    default: defaultColors,
    focused: focusedColors,
    disabled: disabledColors,
  } = theme.input.colors;

  const colors = props.disabled
    ? {
        ...defaultColors,
        ...disabledColors,
      }
    : defaultColors;

  return {
    // we can change this through the style
    textInputLayout: {
      ...theme.input.layout.base,
    },
    // and this we can not
    textInput: {
      ...theme.text[theme.input.textVariant],

      color: colors.text,
      backgroundColor: colors.background,
      borderColor: colors.border,

      borderRadius: theme.input.borderRadius,
      borderWidth: 1,
      borderStyle: 'solid',
    },
    errorTextInput: {
      borderColor: theme.colors.common.error,
    },
    focusedTextInput: {
      borderColor: focusedColors.border,
    },
  };
});
