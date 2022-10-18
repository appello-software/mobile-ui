import React from 'react';
import { Control, FieldPath, FieldValues, useController } from 'react-hook-form';
import { StyleProp, TextInputProps, ViewStyle } from 'react-native';

import { Field } from '~/ui/form/Field';
import { TextInput } from '~/ui/form/TextInput';

interface Props<FormValues extends FieldValues> extends Omit<TextInputProps, 'style'> {
  name: FieldPath<FormValues>;
  control: Control<FormValues>;
  label?: string;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

export const TextField = <FormValues extends FieldValues>({
  name,
  control,
  label,
  disabled,
  style,
  ...textInputProps
}: Props<FormValues>): React.ReactElement => {
  const controller = useController({ name, control });

  return (
    <Field style={style} label={label} disabled={disabled} error={controller.fieldState.error}>
      <TextInput
        value={controller.field.value}
        onChangeText={controller.field.onChange}
        onBlur={controller.field.onBlur}
        error={!!controller.fieldState.error}
        disabled={disabled}
        {...textInputProps}
      />
    </Field>
  );
};
