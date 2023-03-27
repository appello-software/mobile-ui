import React, { ComponentProps, PropsWithChildren } from 'react';
import { ComponentConfig, configured, FuncComponentConfig } from 'react-configured';
import { FieldError } from 'react-hook-form';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { AppText } from '~/components/common/AppText';

import { mergePropsWithStyle, useBaseComponentsConfig, useUIKitTheme } from '../../..';

export interface FieldProps {
  label?: string;
  error?: FieldError;
  style?: StyleProp<ViewStyle>;
  labelProps: ComponentProps<typeof AppText>;
  renderError: (props: React.PropsWithChildren) => React.ReactNode;
}

const BaseField: React.FC<PropsWithChildren<FieldProps>> = ({
  label,
  error,
  children,
  labelProps,
  renderError,
  style,
}) => {
  return (
    <View style={style}>
      {!!label && <AppText {...labelProps}>{label}</AppText>}
      <View>{children}</View>
      {!!error && renderError({ children: error.message })}
    </View>
  );
};

export type FieldConfig = ComponentConfig<typeof BaseField>;

export type FuncFieldConfig = FuncComponentConfig<typeof BaseField, FieldConfig>;

export const Field = configured(
  BaseField,
  (props): FieldConfig => {
    const theme = useUIKitTheme();
    const { field } = useBaseComponentsConfig();

    const projectFieldConfig = field && typeof field === 'function' ? field(props) : field;

    if (projectFieldConfig) return projectFieldConfig;

    const styles = StyleSheet.create({
      label: {
        color: theme.colors.gray['2'],
        marginBottom: 3,
      },
      error: {
        color: theme.colors.error,
        marginTop: 3,
      },
    });

    return {
      labelProps: {
        style: styles.label,
        variant: 'p3',
      },
      renderError: () => <AppText style={styles.error} variant="p3" />,
    };
  },
  { mergeProps: mergePropsWithStyle },
);
