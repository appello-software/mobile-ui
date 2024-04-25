import CheckboxIcon from '@appello/mobile-ui/icons/unicons/approve-tick-checkmark.svg';
import React from 'react';
import { TouchableOpacity, View, ViewStyle } from 'react-native';
import { SvgProps } from 'react-native-svg';

import { useUIKitTheme } from '../../../config/utils';
import { useCombinedPropsWithConfig } from '../../../hooks/useCombinedPropsWithConfig';
import { makeStyles } from '../../../utils';

export interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  /**
   * Icon to display when the checkbox is checked
   *
   * @default @appello/mobile-ui/icons/unicons/approve-tick-checkmark.svg
   * */
  checkIcon?: React.FC<SvgProps>;
  /**
   * Should checkbox be round instead rectangular
   * */
  rounded?: boolean;
  disabled?: boolean;
  /**
   * Background color when the checkbox is checked
   *
   * @default theme.colors.success
   * */
  activeColor?: string;
  /**
   * Size of the checkbox
   *
   * @default 24
   * */
  size?: number;
  /**
   * Style of checkbox container
   * */
  style?: ViewStyle;
}

/**
 * Simple checkbox.<br>
 * The style isn't configurable except for a container style prop
 */
export const Checkbox: React.FC<CheckboxProps> = props => {
  const { colors } = useUIKitTheme();
  const {
    checkIcon: CheckIcon = CheckboxIcon,
    checked,
    onChange,
    rounded,
    disabled,
    style,
    activeColor = colors.success,
    size = 24,
  } = useCombinedPropsWithConfig('Checkbox', props);
  const styles = useStyles({ size, activeColor });

  return (
    <TouchableOpacity disabled={disabled} style={style} onPress={() => onChange(!checked)}>
      <View
        style={[
          styles.box,
          checked && styles['box--active'],
          rounded && styles['box--rounded'],
          disabled && checked && styles['box--disabled'],
        ]}
      >
        <View>
          {checked && CheckIcon && <CheckIcon color={colors.white} height={size} width={size} />}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const useStyles = makeStyles(
  (theme, { size, activeColor }: { size: number; activeColor: string }) => ({
    box: {
      width: size,
      height: size,
      borderWidth: 1,
      borderColor: theme.colors.gray['4'],
      borderRadius: 3,
      backgroundColor: theme.colors.white,
    },
    'box--active': {
      borderWidth: 0,
      backgroundColor: activeColor,
    },
    'box--rounded': {
      borderRadius: size / 2,
    },
    'box--disabled': {
      borderWidth: 0,
      backgroundColor: theme.colors.gray['3'],
    },
  }),
);
