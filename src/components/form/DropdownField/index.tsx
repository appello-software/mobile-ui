import React from 'react';
import { Control, FieldPath, FieldValues, useController } from 'react-hook-form';
import { StyleProp, ViewStyle } from 'react-native';

import { Dropdown, DropdownProps } from '~/components/common/Dropdown';
import { Field } from '~/components/form/Field';
import { getFieldError } from '~/components/form/utils';

export interface DropdownFieldProps<TFormValues extends FieldValues>
  extends Omit<DropdownProps, 'style' | 'value' | 'onSave'> {
  name: FieldPath<TFormValues>;
  control: Control<TFormValues>;
  label?: string;
  style?: StyleProp<ViewStyle>;
  inputStyle?: DropdownProps['style'];
}

/**
 * Dropdown controlled by `react-hook-form` controller.<br>
 * Extends the UIKit Dropdown and all of its props.<br>
 * Example of usage:
 *
 * ```ts
 * const Form = (props) => {
 *    const form = useForm<{ dropdownField: string }>();
 *
 *    return <DropdownField control={form.control} name="dropdownField" />;
 * }```
 * */
export const DropdownField = <TFormValues extends FieldValues>({
  name,
  control,
  label,
  style,
  inputStyle,
  ...dropdownProps
}: DropdownFieldProps<TFormValues>): React.ReactElement => {
  const controller = useController({ name, control });
  const fieldError = getFieldError(controller);

  return (
    <Field error={fieldError} label={label} style={style}>
      <Dropdown
        error={!!fieldError}
        style={inputStyle}
        value={controller.field.value}
        onSave={controller.field.onChange}
        {...dropdownProps}
      />
    </Field>
  );
};
