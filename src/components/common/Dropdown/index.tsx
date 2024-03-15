import RightArrowIcon from '@appello/mobile-ui/icons/unicons/right-arrow.svg';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { LayoutAnimation, Platform, StyleSheet, UIManager } from 'react-native';

import { RollerPicker, RollerPickerProps, TextInput, TextInputProps } from '~/components';
import { useUIKitTheme } from '~/config/utils';
import { useCombinedPropsWithConfig } from '~/hooks/useCombinedPropsWithConfig';
import { makeStyles } from '~/utils';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

type Props = RollerPickerProps &
  Pick<
    TextInputProps,
    'error' | 'disabled' | 'Icon' | 'iconSize' | 'placeholder' | 'placeholderTextColor' | 'style'
  > & {
    arrowIndicatesOpening?: boolean;
  };

export const Dropdown: React.FC<Props> = props => {
  const pickerRef = useRef<BottomSheetModal>(null);
  const {
    value,
    options,
    onChange,
    onSave,
    buttonTitle,
    title,
    arrowIndicatesOpening,
    ...textInputProps
  } = useCombinedPropsWithConfig('Dropdown', props);

  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = useCallback(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
    setIsOpen(true);
    pickerRef.current?.present();
  }, []);

  const handleDismiss = useCallback(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
    setIsOpen(false);
  }, []);

  const styles = useStyles();
  const { colors } = useUIKitTheme();
  const arrowIndicator = useMemo(() => {
    return (
      <RightArrowIcon
        color={colors.black['1']}
        height={24}
        style={arrowIndicatesOpening && isOpen && styles['arrow--down']}
        width={24}
      />
    );
  }, [arrowIndicatesOpening, isOpen, colors, styles]);

  return (
    <>
      <TextInput
        accessoryRight={arrowIndicator}
        editable={false}
        value={value?.toString()}
        onPress={handleOpen}
        {...textInputProps}
      />
      <RollerPicker
        buttonTitle={buttonTitle}
        options={options}
        ref={pickerRef}
        title={title}
        value={value}
        onChange={onChange}
        onDismiss={handleDismiss}
        onSave={onSave}
      />
    </>
  );
};

const useStyles = makeStyles(() =>
  StyleSheet.create({
    'arrow--down': {
      transform: [{ rotateX: '45deg' }],
    },
  }),
);
