import React from 'react';
import { Pressable, TouchableOpacity, View } from 'react-native';
import { SvgProps } from 'react-native-svg';

import { useUIKitTheme } from '~/config/utils';
import { useCombinedPropsWithConfig } from '~/hooks/useCombinedPropsWithConfig';
import { makeStyles } from '~/utils';

export interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  checkIcon?: React.FC<SvgProps>;
  rounded?: boolean;
  disabled?: boolean;
  activeColor?: string;
  size?: number;
}

/**
 * Simple checkbox.<br>
 * The style isn't configurable
 */
export const Checkbox: React.FC<CheckboxProps> = props => {
  const { colors } = useUIKitTheme();
  const {
    checkIcon: CheckIcon,
    checked,
    onChange,
    rounded,
    disabled,
    activeColor = colors.success,
    size = 24,
  } = useCombinedPropsWithConfig('Checkbox', props);
  const styles = useStyles({ size, activeColor });

  return (
    <TouchableOpacity disabled={disabled} onPress={() => onChange(!checked)}>
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
