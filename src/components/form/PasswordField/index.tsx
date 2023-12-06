import { useSwitchValue } from '@appello/common';
import React from 'react';
import { FieldValues } from 'react-hook-form';
import { TouchableOpacity } from 'react-native';
import { SvgProps } from 'react-native-svg';

import { makeStyles } from '~/utils';

import { TextField, TextFieldProps } from '../TextField';

export interface PasswordFieldProps<TFormValues extends FieldValues>
  extends TextFieldProps<TFormValues> {
  togglePasswordVisibilityIcons?: {
    show: React.FC<SvgProps>;
    hide: React.FC<SvgProps>;
  };
}

const ICON_SIZE = 20;

/**
 * Password field with functionality to show and hide the password value.<br>
 * Extends the UIKit TextField and all of its props.<br>
 * */
export const PasswordField = <TFormValues extends FieldValues>(
  props: PasswordFieldProps<TFormValues>,
): React.ReactElement => {
  const { value: isPasswordVisible, toggle: togglePasswordVisibility } = useSwitchValue(false);

  const { togglePasswordVisibilityIcons, inputStyle, ...textFieldProps } = props;

  const styles = useStyles();
  const renderAccessoryRight = React.useMemo(() => {
    const Icon = isPasswordVisible
      ? togglePasswordVisibilityIcons?.hide
      : togglePasswordVisibilityIcons?.show;

    if (!Icon) return null;

    return (
      <TouchableOpacity style={styles.iconContainer} onPress={togglePasswordVisibility}>
        <Icon height={ICON_SIZE} width={ICON_SIZE} />
      </TouchableOpacity>
    );
  }, [togglePasswordVisibilityIcons, togglePasswordVisibility, isPasswordVisible]);

  return (
    <TextField
      {...textFieldProps}
      accessoryRight={renderAccessoryRight}
      autoCapitalize="none"
      autoComplete="password"
      inputStyle={[styles.input, inputStyle]}
      secureTextEntry={!isPasswordVisible}
    />
  );
};

const useStyles = makeStyles(() => ({
  iconContainer: {
    marginRight: 18,
  },
  input: {
    paddingRight: ICON_SIZE + 18 + 10,
  },
}));
