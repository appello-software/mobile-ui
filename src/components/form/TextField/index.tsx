import React from 'react';
import { Control, FieldPath, FieldValues, useController } from 'react-hook-form';
import { StyleProp, ViewStyle } from 'react-native';

import { TextInput, TextInputProps } from '~/components/common/TextInput';
import { Field } from '~/components/form/Field';
import { getFieldError } from '~/components/form/utils';

export interface TextFieldProps<TFormValues extends FieldValues>
  extends Omit<TextInputProps, 'style'> {
  name: FieldPath<TFormValues>;
  control: Control<TFormValues>;
  label?: string;
  style?: StyleProp<ViewStyle>;
  inputStyle?: TextInputProps['style'];
}

/**
 * Basic text field controlled by `react-hook-form` controller.<br>
 * Extends the UIKit TextInput and all of its props.<br>
 * Example of usage:
 *
 * ```ts
 * const Form = (props) => {
 *    const form = useForm<{ textField: string }>();
 *
 *    return <TextField control={form.control} name="textField" />;
 * }```
 * */
export const TextField = <TFormValues extends FieldValues>({
  name,
  control,
  label,
  style,
  inputStyle,
  ...textInputProps
}: TextFieldProps<TFormValues>): React.ReactElement => {
  const controller = useController({ name, control });
  const fieldError = getFieldError(controller);

  return (
    <Field error={fieldError} label={label} style={style}>
      <TextInput
        error={!!fieldError}
        style={inputStyle}
        value={controller.field.value}
        onBlur={controller.field.onBlur}
        onChangeText={controller.field.onChange}
        {...textInputProps}
      />
    </Field>
  );
};
