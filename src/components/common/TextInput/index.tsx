import React, { FC, useState } from 'react';
import { ComponentConfig, configured, FuncComponentConfig } from 'react-configured';
import { StyleSheet, TextInput as RNTextInput, TextInputProps } from 'react-native';

import { mergePropsWithStyle } from '~/utils';
import { useBaseComponentsConfig, useUIKitTheme } from '~/config/utils';
import { WithGetStyleByState } from '~/types';

interface Props extends TextInputProps {
  error?: boolean;
  disabled?: boolean;
}

const BaseTextInput: FC<
  WithGetStyleByState<Props, ['error', 'focused', 'disabled', 'multiline']>
> = ({
  error,
  disabled,
  multiline,
  getStyleByState = (states, style) => style,
  style,
  ...textInputProps
}) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const fullStyle = getStyleByState?.(
    {
      focused: !error && isFocused,
      error: !!error,
      disabled,
      multiline,
    },
    style,
  );

  const handleFocus: TextInputProps['onFocus'] = e => {
    textInputProps.onFocus?.(e);
    setIsFocused(true);
  };

  const handleBlur: TextInputProps['onBlur'] = e => {
    textInputProps.onBlur?.(e);
    setIsFocused(false);
  };

  return (
    <RNTextInput
      {...textInputProps}
      style={fullStyle}
      autoCapitalize="none"
      onFocus={handleFocus}
      onBlur={handleBlur}
      editable={!disabled}
      multiline={multiline}
    />
  );
};
export type TextInputConfig = ComponentConfig<typeof BaseTextInput>;

export type FuncTextInputConfig = FuncComponentConfig<typeof BaseTextInput, TextInputConfig>;

export const TextInput = configured(
  BaseTextInput,
  (props): TextInputConfig => {
    const theme = useUIKitTheme();
    const { textInput } = useBaseComponentsConfig();

    const projectTextInputConfig =
      textInput && typeof textInput === 'function' ? textInput(props) : textInput;

    if (projectTextInputConfig) return projectTextInputConfig;

    const { getStyleByState } = props;

    const styles = StyleSheet.create({
      baseStyle: {
        height: 54,
        paddingHorizontal: 19,

        borderRadius: 6,
        borderWidth: 1,
        borderStyle: 'solid',

        fontSize: 13,
        lineHeight: 23,
        textAlignVertical: 'center',
        includeFontPadding: false,

        color: theme.colors.black['1'],
        backgroundColor: theme.colors.white,
        borderColor: theme.colors.gray['5'],
      },
      'state:disabled': {
        color: theme.colors.gray['3'],
        backgroundColor: theme.colors.gray['7'],
        borderColor: theme.colors.gray['7'],
      },
      'state:focused': {
        borderColor: theme.colors.primary,
      },
      'state:error': {
        borderColor: theme.colors.error,
      },
      'state:multiline': {
        height: 104,
        paddingHorizontal: 19,
      },
    });

    const getStyle: typeof getStyleByState = (states, style) => {
      let partStyle = style;
      if (states.multiline) {
        partStyle = StyleSheet.compose(partStyle, styles['state:multiline']);
      }
      if (states.disabled) {
        partStyle = StyleSheet.compose(partStyle, styles['state:disabled']);
      } else if (states.error) {
        partStyle = StyleSheet.compose(partStyle, styles['state:error']);
      } else if (states.focused) {
        partStyle = StyleSheet.compose(partStyle, styles['state:focused']);
      }

      return getStyleByState?.(states, partStyle) || partStyle || {};
    };

    return {
      style: styles.baseStyle,
      placeholderTextColor: theme.colors.gray['3'],
      getStyleByState: getStyle,
    };
  },
  { mergeProps: mergePropsWithStyle },
);
