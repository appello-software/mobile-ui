import RightArrowIcon from '@appello/mobile-ui/icons/unicons/right-arrow.svg';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import React, { useCallback, useMemo, useRef } from 'react';
import { Animated, Platform, StyleSheet, TextInput as RNTextInput, UIManager } from 'react-native';

import { useUIKitTheme } from '../../../config/utils';
import { useCombinedPropsWithConfig } from '../../../hooks/useCombinedPropsWithConfig';
import { makeStyles } from '../../../utils';
import { RollerPicker, RollerPickerProps } from '../RollerPicker';
import { TextInput, TextInputProps } from '../TextInput';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

export type DropdownProps = RollerPickerProps &
  Pick<
    TextInputProps,
    'error' | 'disabled' | 'Icon' | 'iconSize' | 'placeholder' | 'placeholderTextColor' | 'style'
  > & {
    /**
     * Should arrow look down when the dropdown is open
     *
     * @default true
     * */
    arrowIndicatesOpening?: boolean;
  };

/**
 * A common dropdown component. It combines TextInput and RollerPicker with most of their props.
 */
export const Dropdown: React.FC<DropdownProps> = props => {
  const inputRef = useRef<RNTextInput>(null);
  const pickerRef = useRef<BottomSheetModal>(null);
  const {
    value,
    options,
    onChange,
    onSave,
    saveButtonLabel,
    title,
    arrowIndicatesOpening = true,
    disabled,
    ...textInputProps
  } = useCombinedPropsWithConfig('Dropdown', props);

  const rotation = useRef(new Animated.Value(0)).current;
  const animateArrow = useCallback((isOpen: boolean) => {
    Animated.timing(rotation, {
      toValue: isOpen ? 90 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleOpen = useCallback(() => {
    animateArrow(true);
    pickerRef.current?.present();
    inputRef.current?.focus();
  }, [animateArrow]);

  const handleDismiss = useCallback(() => {
    animateArrow(false);
    inputRef.current?.blur();
  }, [animateArrow]);

  const handleSave = useCallback<RollerPickerProps['onSave']>(
    value => {
      onSave(value);
      pickerRef.current?.dismiss();
    },
    [onSave],
  );

  const labelValue = useMemo(
    () => options.find(option => option.value === value)?.label,
    [options, value],
  );

  const styles = useStyles();
  const { colors } = useUIKitTheme();
  const arrowIndicator = useMemo(() => {
    return (
      <Animated.View
        style={[
          styles.arrow,
          {
            transform: [
              {
                rotate: rotation.interpolate({
                  inputRange: [0, 90],
                  outputRange: ['0deg', '90deg'],
                }),
              },
            ],
          },
        ]}
      >
        <RightArrowIcon
          color={!disabled ? colors.black['1'] : colors.gray['3']}
          height={24}
          width={24}
        />
      </Animated.View>
    );
  }, [arrowIndicatesOpening, disabled, colors, styles]);

  return (
    <>
      <TextInput
        accessoryRight={arrowIndicator}
        disabled={disabled}
        value={labelValue}
        onPress={handleOpen}
        {...textInputProps}
      />
      <RollerPicker
        options={options}
        ref={pickerRef}
        saveButtonLabel={saveButtonLabel}
        title={title}
        value={value}
        onChange={onChange}
        onDismiss={handleDismiss}
        onSave={handleSave}
      />
    </>
  );
};

const useStyles = makeStyles(() =>
  StyleSheet.create({
    arrow: {
      marginRight: 15,
    },
    'arrow--down': {
      transform: [{ rotate: '90deg' }],
    },
  }),
);
