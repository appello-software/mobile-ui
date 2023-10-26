import React, { ComponentProps, PropsWithChildren, ReactNode } from 'react';
import { FieldError } from 'react-hook-form';
import { StyleProp, StyleSheet, TextStyle, View, ViewStyle } from 'react-native';

import { AppText } from '~/components/common/AppText';
import { useCombinedPropsWithConfig } from '~/hooks/useCombinedPropsWithConfig';
import { useCombinedStylesWithConfig } from '~/hooks/useCombinedStylesWithConfig';
import { makeStyles } from '~/utils';

export interface FieldProps extends PropsWithChildren {
  /** A form component that is being wrapped */
  children: ReactNode;
  /** Field label */
  label?: string;
  /** [`react-hook-form` Field error](https://react-hook-form.com/ts#FieldError) */
  error?: FieldError;
  /** Additional style of field wrapper */
  style?: StyleProp<ViewStyle>;
  /** Properties of the label text */
  labelProps?: ComponentProps<typeof AppText>;
  /** Properties of the error text */
  errorProps?: ComponentProps<typeof AppText>;
  /** Function for error displaying in case of more custom errors than just text */
  renderError?: (props: React.PropsWithChildren) => React.ReactNode;
}

/**
 * A common wrapper for form fields, mostly for displaying label and errors
 */
export const Field: React.FC<FieldProps> = props => {
  const styles = useCombinedStylesWithConfig('Field', useFieldStyle);
  const {
    label,
    error,
    children,
    labelProps = {
      variant: 'p3',
    },
    errorProps = {
      variant: 'p3',
    },
    renderError,
    style,
  } = useCombinedPropsWithConfig('Field', props);

  const errorNode = React.useMemo(() => {
    if (!error) return null;
    if (!renderError)
      return (
        <AppText {...errorProps} style={[styles.field__error, errorProps?.style]}>
          {error.message}
        </AppText>
      );

    return renderError({ children: error.message });
  }, [error, renderError, errorProps, styles.field__error]);

  return (
    <View style={[styles.field, style]}>
      {label ? (
        <AppText {...labelProps} style={[styles.field__label, labelProps?.style]}>
          {label}
        </AppText>
      ) : null}
      <View>{children}</View>
      {errorNode}
    </View>
  );
};

interface FieldStyle {
  field?: ViewStyle;
  field__label?: TextStyle;
  field__error?: TextStyle;
}

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
    field_foo: {},
  } as FieldStyle),
);
