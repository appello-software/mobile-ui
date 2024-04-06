import React from 'react';
import { Control, FieldPath, FieldValues, useController } from 'react-hook-form';
import { StyleProp, ViewStyle } from 'react-native';

import { DatePicker, DatePickerProps } from '../../common/DatePicker';
import { Field } from '../Field';
import { getFieldError } from '../utils';

export interface DatePickerFieldProps<TFormValues extends FieldValues>
  extends Omit<DatePickerProps, 'style' | 'value' | 'onChange'> {
  name: FieldPath<TFormValues>;
  control: Control<TFormValues>;
  label?: string;
  style?: StyleProp<ViewStyle>;
  inputStyle?: DatePickerProps['style'];
}

/**
 * DatePicker controlled by `react-hook-form` controller.<br>
 * Extends the UIKit DatePicker and all of its props.<br>
 * Example of usage:
 *
 * ```ts
 * const Form = (props) => {
 *    const form = useForm<{ datePickerField: string }>();
 *
 *    return <DatePickerField control={form.control} name="datePickerField" />;
 * }```
 * */
export const DatePickerField = <TFormValues extends FieldValues>({
  name,
  control,
  label,
  style,
  inputStyle,
  ...datePickerProps
}: DatePickerFieldProps<TFormValues>): React.ReactElement => {
  const controller = useController({ name, control });
  const fieldError = getFieldError(controller);

  return (
    <Field error={fieldError} label={label} style={style}>
      <DatePicker
        error={!!fieldError}
        style={inputStyle}
        value={controller.field.value}
        onChange={controller.field.onChange}
        {...datePickerProps}
      />
    </Field>
  );
};
