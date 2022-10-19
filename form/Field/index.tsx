import { useUIKitTheme } from '@ui';
import { makeStyles } from '@ui/utils';
import deepMerge from 'deepmerge';
import React, { ReactNode } from 'react';
import { FieldError } from 'react-hook-form';
import { StyleProp, Text, View, ViewStyle } from 'react-native';

interface Props {
  label?: string;
  error?: FieldError;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
}

export const Field: React.FC<Props> = ({ label, error, disabled, style, children }) => {
  const styles = useStyles({ disabled });

  return (
    <View style={style}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View>{children}</View>
      {error && <Text style={styles.error}>{error.message}</Text>}
    </View>
  );
};

const useStyles = makeStyles(({ disabled }: Pick<Props, 'disabled'>) => {
  const { text, colors, field } = useUIKitTheme();

  const fieldColors = deepMerge(field.colors.default, disabled ? field.colors.disabled : {});

  return {
    label: {
      marginBottom: field.layout.labelBottomInset,
      color: fieldColors.label,
      ...text[field.fonts.label],
    },
    error: {
      marginTop: field.layout.errorTopInset,
      color: colors.common.error,
      ...text[field.fonts.error],
    },
  };
});
