import React, { FC } from 'react';
import { ComponentConfig, configured, FuncComponentConfig } from 'react-configured';
import {
  Pressable,
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

import { mergePropsWithStyle } from '~/utils';
import { useBaseComponentsConfig, useUIKitTheme } from '~/config/utils';
import { WithGetStyleByState } from '~/types';
import { SvgProps } from 'react-native-svg';

interface Props extends RNTextInputProps {
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

export type TextInputProps = WithGetStyleByState<
  Props,
  ['error', 'focused', 'disabled', 'multiline']
>;

const BaseTextInput: FC<TextInputProps> = ({
  error,
  disabled,
  onPress,
  editable,
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
    <TouchableOpacity disabled={!onPress} onPress={onPress}>
      <RNTextInput
        {...textInputProps}
        style={fullStyle}
        placeholder={placeholder ?? maskPlaceholder}
        value={maskValue}
        onChangeText={onMaskChangeText}
        onFocus={handleFocus}
        onBlur={handleBlur}
        editable={disabled || onPress ? false : editable}
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
    </TouchableOpacity>
  );
};
export type TextInputConfig = ComponentConfig<typeof BaseTextInput>;

export type FuncTextInputConfig = FuncComponentConfig<typeof BaseTextInput, TextInputConfig>;

/**
 * Primary UI component for inputting text into the app via a keyboard.
 * It extends default [RN TextInput](https://reactnative.dev/docs/textinput) component and its props.
 * It has additional built-in functionality such as icon on the left, any right accessory and mask.
 */
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

export { createNumberMask, Masks };

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
