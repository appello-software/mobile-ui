import { useSwitchValue } from '@appello/common/lib/hooks';
import React from 'react';
import { FieldValues } from 'react-hook-form';
import { TouchableOpacity } from 'react-native';
import { SvgProps } from 'react-native-svg';

import { TextField, TextFieldProps } from '../TextField';

export interface PasswordFieldProps<TFormValues extends FieldValues>
  extends TextFieldProps<TFormValues> {
  togglePasswordVisibilityIcons?: {
    show: React.FC<SvgProps>;
    hide: React.FC<SvgProps>;
  };
}

/**
 * Password field with functionality to show and hide the password value.<br>
 * Extends the UIKit TextField and all of its props.<br>
 * */
export const PasswordField = <TFormValues extends FieldValues>(
  props: PasswordFieldProps<TFormValues>,
): React.ReactElement => {
  const { value: isPasswordVisible, toggle: togglePasswordVisibility } = useSwitchValue(false);

  const { togglePasswordVisibilityIcons, ...textFieldProps } = props;

  const renderAccessoryRight = React.useMemo(() => {
    const Icon = isPasswordVisible
      ? togglePasswordVisibilityIcons?.hide
      : togglePasswordVisibilityIcons?.show;

    if (!Icon) return null;

    return (
      <TouchableOpacity style={{ marginRight: 18 }} onPress={togglePasswordVisibility}>
        <Icon />
      </TouchableOpacity>
    );
  }, [togglePasswordVisibilityIcons, togglePasswordVisibility, isPasswordVisible]);

  return (
    <TextField
      {...textFieldProps}
      accessoryRight={renderAccessoryRight}
      autoCapitalize="none"
      autoComplete="password"
      secureTextEntry={!isPasswordVisible}
    />
  );
};
