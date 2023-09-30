import React, { ComponentProps, PropsWithChildren } from 'react';
import { FieldError } from 'react-hook-form';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { AppText } from '~/components/common/AppText';
import { makeStyles } from '~/utils';
import { useCombinedStylesWithConfig } from '~/hooks/useCombinedStylesWithConfig';
import { useCombinedPropsWithConfig } from '~/hooks/useCombinedPropsWithConfig';

export interface FieldProps {
  label?: string;
  error?: FieldError;
  style?: StyleProp<ViewStyle>;
  labelProps?: ComponentProps<typeof AppText>;
  errorProps?: ComponentProps<typeof AppText>;
  renderError?: (props: React.PropsWithChildren) => React.ReactNode;
}

export const Field: React.FC<PropsWithChildren<FieldProps>> = props => {
  const styles = useCombinedStylesWithConfig('Field', useFieldStyle);
  const {
    label,
    error,
    children,
    labelProps = {
      style: styles.field__label,
      variant: 'p3',
    },
    errorProps = {
      style: styles.field__error,
      variant: 'p3',
    },
    renderError,
    style,
  } = useCombinedPropsWithConfig('Field', props);

  const errorNode = React.useMemo(() => {
    if (!error) return null;
    if (!renderError) return <AppText {...errorProps}>{error.message}</AppText>;

    return renderError({ children: error.message });
  }, [error, renderError, errorProps]);

  return (
    <View style={[styles.field, style]}>
      {label ? <AppText {...labelProps}>{label}</AppText> : null}
      <View>{children}</View>
      {errorNode}
    </View>
  );
};

export const useFieldStyle = makeStyles(theme =>
  StyleSheet.create({
    field: {},
    field__label: {
      color: theme.colors.gray['2'],
      marginBottom: 3,
    },
    field__error: {
      color: theme.colors.error,
      marginTop: 3,
    },
  }),
);
