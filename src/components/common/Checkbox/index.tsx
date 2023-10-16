import React from 'react';
import { Pressable, View } from 'react-native';
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
    <Pressable onPress={() => onChange(!checked)} disabled={disabled}>
      <View
        style={[
          styles.box,
          checked && styles['box--active'],
          rounded && styles['box--rounded'],
          disabled && checked && styles['box--disabled'],
        ]}
      >
        <View>
          {checked && CheckIcon && <CheckIcon color={colors.white} width={size} height={size} />}
        </View>
      </View>
    </Pressable>
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
