import { useSwitchValue } from '@appello/common/lib/hooks';
import React from 'react';
import { Control, FieldPath, FieldValues, useController } from 'react-hook-form';
import { StyleProp, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';

import { TextInput } from '~/components/common/TextInput';
import { Field } from '../Field';
import { TextFieldProps as TextFieldProps } from '../TextField';
import { getFieldError } from '../utils';

export interface PasswordFieldProps<TFormValues extends FieldValues>
  extends TextFieldProps<TFormValues> {
  name: FieldPath<TFormValues>;
  control: Control<TFormValues>;
  togglePasswordVisibilityIcons?: {
    show: React.ReactNode;
    hide: React.ReactNode;
  };
  style?: StyleProp<ViewStyle>;
}

export const PasswordField = <TFormValues extends FieldValues>({
  name,
  control,
  label,
  style,
  togglePasswordVisibilityIcons,
  ...textInputProps
}: PasswordFieldProps<TFormValues>): React.ReactElement => {
  const controller = useController({ name, control });
  const { value: isPasswordVisible, toggle: togglePasswordVisibility } = useSwitchValue(false);

  const fieldError = getFieldError(controller);

  return (
    <Field style={style} label={label} error={fieldError}>
      <TextInput
        value={controller.field.value}
        onChangeText={controller.field.onChange}
        onBlur={controller.field.onBlur}
        style={styles.input}
        error={!!fieldError}
        secureTextEntry={!isPasswordVisible}
        autoComplete="password"
        autoCapitalize="none"
        {...textInputProps}
      />
      <TouchableOpacity onPress={togglePasswordVisibility} style={styles.toggle}>
        {isPasswordVisible
          ? togglePasswordVisibilityIcons?.hide
          : togglePasswordVisibilityIcons?.show}
      </TouchableOpacity>
    </Field>
  );
};

const styles = StyleSheet.create({
  input: {
    paddingRight: 9 + 24 + 10,
  },
  toggle: {
    position: 'absolute',
    right: 15,
    top: 12,
  },
});
