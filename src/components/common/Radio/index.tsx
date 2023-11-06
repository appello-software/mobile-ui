import React from 'react';
import { ColorValue, Pressable, View, ViewStyle } from 'react-native';

import { useUIKitTheme } from '~/config/utils';
import { useCombinedPropsWithConfig } from '~/hooks/useCombinedPropsWithConfig';
import { makeStyles } from '~/utils';

type Id = number | string;
export interface RadioProps {
  /** Id of an option */
  id: Id;
  /** Id of currently chosen option */
  activeId?: Nullable<Id>;
  /** Callback called on press of the radio */
  onChange: (id: Id) => void;
  /** Is radio disabled */
  disabled?: boolean;
  /** Color of border when the radio is active */
  activeColor?: ColorValue;
  /** Size of the radio */
  size?: number;
  /** Style of the radio container */
  style?: ViewStyle;
}

/**
 * Simple radio component.<br>
 * The style isn't configurable
 */
export const Radio: React.FC<RadioProps> = props => {
  const { colors } = useUIKitTheme();
  const {
    id,
    activeId,
    onChange,
    disabled,
    activeColor = colors.primary,
    size = 24,
    style,
  } = useCombinedPropsWithConfig('Checkbox', props);
  const active = id === activeId;
  const styles = useStyles({ size, activeColor, active });

  return (
    <Pressable onPress={() => onChange(id)} disabled={disabled} style={style}>
      <View
        style={[
          styles.radio,
          active && styles['radio--active'],
          disabled && active && styles['radio--disabled'],
        ]}
      />
    </Pressable>
  );
};

const useStyles = makeStyles(
  (
    theme,
    { size, activeColor }: Required<Pick<RadioProps, 'size' | 'activeColor'> & { active: boolean }>,
  ) => ({
    radio: {
      width: size,
      height: size,
      borderWidth: 1,
      borderColor: theme.colors.gray['4'],
      borderRadius: size / 2,
      backgroundColor: theme.colors.white,
    },
    'radio--active': {
      borderWidth: size * 0.3,
      borderColor: activeColor,
    },
    'radio--disabled': {
      borderColor: theme.colors.gray['3'],
    },
  }),
);
