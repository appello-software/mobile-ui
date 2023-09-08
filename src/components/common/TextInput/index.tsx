import React, { FC } from 'react';
import { ComponentConfig, configured, FuncComponentConfig } from 'react-configured';
import {
  StyleSheet,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  View,
} from 'react-native';
import { useMaskedInputProps, MaskInputProps } from 'react-native-mask-input';

import { mergePropsWithStyle } from '~/utils';
import { useBaseComponentsConfig, useUIKitTheme } from '~/config/utils';
import { WithGetStyleByState } from '~/types';
import { SvgProps } from 'react-native-svg';

interface Props extends RNTextInputProps {
  error?: boolean;
  disabled?: boolean;
  accessoryRight?: React.ReactNode;
  Icon?: React.FC<SvgProps>;
  iconSize?: {
    width: number;
    height: number;
  };
  mask?: MaskInputProps['mask'];
  placeholderFillCharacter?: MaskInputProps['placeholderFillCharacter'];
}

export type TextInputProps = WithGetStyleByState<
  Props,
  ['error', 'focused', 'disabled', 'multiline']
>;

const BaseTextInput: FC<TextInputProps> = ({
  error,
  disabled,
  multiline,
  getStyleByState = (states, style) => style,
  style,
  accessoryRight,
  Icon,
  iconSize,
  value,
  onChangeText,
  mask,
  placeholderFillCharacter,
  placeholder,
  ...textInputProps
}) => {
  const [isFocused, setIsFocused] = React.useState<boolean>(false);

  const fullStyle = getStyleByState(
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
    <View>
      <RNTextInput
        {...textInputProps}
        style={fullStyle}
        autoCapitalize="none"
        placeholder={placeholder ?? maskPlaceholder}
        value={maskValue}
        onChangeText={onMaskChangeText}
        onFocus={handleFocus}
        onBlur={handleBlur}
        editable={!disabled}
        multiline={multiline}
      />
      {Icon ? (
        <View style={styles.iconContainer}>
          <Icon
            color={fullStyle && 'color' in fullStyle ? fullStyle.color : undefined}
            width={iconSize?.width}
            height={iconSize?.height}
          />
        </View>
      ) : null}
      {accessoryRight ? <View style={styles.accessoryRightContainer}>{accessoryRight}</View> : null}
    </View>
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
      withIcon: {
        paddingLeft: 47,
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

      return StyleSheet.flatten(getStyleByState?.(states, partStyle) || partStyle || {});
    };

    return {
      style: StyleSheet.compose(styles.baseStyle, props.Icon && styles.withIcon),
      placeholderTextColor: theme.colors.gray['3'],
      getStyleByState: getStyle,
      iconSize: {
        width: 20,
        height: 20,
      },
    };
  },
  { mergeProps: mergePropsWithStyle },
);

const styles = StyleSheet.create({
  accessoryRightContainer: {
    height: '100%',
    position: 'absolute',
    top: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
