import React from 'react';
import { Pressable, View } from 'react-native';

import { AppText } from '~/components';
import { useCombinedPropsWithConfig } from '~/hooks/useCombinedPropsWithConfig';
import { makeStyles } from '~/utils';

export interface CheckboxProps {
  label?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  checkIconEl?: React.ReactNode;
  rounded?: boolean;
  disabled?: boolean;
  activeColor?: string;
}

export const Checkbox: React.FC<CheckboxProps> = props => {
  const styles = useStyles();
  const {
    checkIconEl,
    checked,
    onChange,
    rounded,
    disabled,
    label,
    activeColor = '#27AE60',
  } = useCombinedPropsWithConfig('Checkbox', props);

  return (
    <Pressable style={styles.container} onPress={() => onChange(!checked)} disabled={disabled}>
      <View
        style={[
          styles.box,
          checked && [styles.activeBox, { backgroundColor: activeColor }],
          rounded && styles.roundedBox,
          disabled && checked && styles.disabledActiveBox,
        ]}
      >
        <View>{checked && checkIconEl}</View>
      </View>
      {label && <AppText style={styles.label}>{label}</AppText>}
    </Pressable>
  );
};

const useStyles = makeStyles(theme => ({
  container: {
    flexDirection: 'row',
  },
  box: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: theme.colors.gray['4'],
    borderRadius: 3,
    backgroundColor: theme.colors.white,
  },
  activeBox: {
    borderWidth: 0,
  },
  roundedBox: {
    borderRadius: 24 / 2,
  },
  disabledActiveBox: {
    borderWidth: 0,
    backgroundColor: theme.colors.gray['3'],
  },
  label: {
    marginLeft: 10,
  },
}));
