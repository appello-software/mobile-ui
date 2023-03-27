import React from 'react';
import { Control, FieldPath, FieldValues, useController } from 'react-hook-form';
import { StyleProp, TextInputProps, ViewStyle } from 'react-native';

import { TextInput } from '~/components/common/TextInput';
import { Field } from '~/components/form/Field';
import { getFieldError } from '~/components/form/utils';

export interface TextFieldProps<TFormValues extends FieldValues> extends Omit<TextInputProps, 'style'> {
  name: FieldPath<TFormValues>;
  control: Control<TFormValues>;
  label?: string;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

export const TextField = <TFormValues extends FieldValues>({
  name,
  control,
  label,
  disabled,
  style,
  ...textInputProps
}: TextFieldProps<TFormValues>): React.ReactElement => {
  const controller = useController({ name, control });
  const fieldError = getFieldError(controller);

  return (
    <Field style={style} label={label} error={fieldError}>
      <TextInput
        value={controller.field.value}
        onChangeText={controller.field.onChange}
        onBlur={controller.field.onBlur}
        error={!!fieldError}
        disabled={disabled}
        {...textInputProps}
      />
    </Field>
  );
};
