import { PhoneNumberUtil } from 'google-libphonenumber';
import React, { useMemo, useRef } from 'react';
import { Control, FieldPath, FieldValues, useController } from 'react-hook-form';
import { FieldPathValue } from 'react-hook-form/dist/types';
import { StyleProp, TextInputProps, ViewStyle } from 'react-native';
import PhoneInput, { PhoneInputProps } from 'react-native-phone-number-input';

import { useUIKitTheme } from '~/ui';
import { Field } from '~/ui/form/Field';
import { makeStyles } from '~/ui/utils';

import { DEFAULT_COUNTRY_CODE } from './consts';

const phoneNumberUtil = PhoneNumberUtil.getInstance();

const DropdownIcon: React.FC<Record<string, any>> = () => null; // todo: should be icon component

type InputValue = string;

interface Props<FormValues, TName extends FieldPath<FormValues>>
  extends Omit<TextInputProps, 'style'> {
  name: FieldPathValue<FormValues, TName> extends InputValue ? TName : never;
  control: Control<FormValues>;
  label?: string;
  style?: StyleProp<ViewStyle>;
}

export const PhoneNumberField = <
  FormValues extends FieldValues,
  TName extends FieldPath<FormValues>,
>({
  name,
  control,
  label,
  style,
}: Props<FormValues, TName>): React.ReactElement => {
  const inputRef = useRef<PhoneInput>(null);
  const controller = useController({
    name,
    control,
  });
  const styles = useStyles();
  const value = controller.field.value as InputValue;
  const theme = useUIKitTheme();

  const parsedPhoneNumber = useMemo(() => {
    if (!value?.startsWith('+')) {
      return { value, code: DEFAULT_COUNTRY_CODE as PhoneInputProps['defaultCode'] };
    }
    try {
      const phone = phoneNumberUtil.parse(value);
      return {
        value: phone.getNationalNumber()?.toString(),
        code: phoneNumberUtil.getRegionCodeForNumber(phone) as PhoneInputProps['defaultCode'],
      };
      // eslint-disable-next-line no-empty
    } catch (e) {}

    return { value, code: DEFAULT_COUNTRY_CODE as PhoneInputProps['defaultCode'] };
  }, [value]);

  return (
    <Field style={style} label={label} error={controller.fieldState.error}>
      <PhoneInput
        ref={inputRef}
        defaultCode={parsedPhoneNumber.code}
        layout="first"
        containerStyle={styles.container}
        textInputStyle={styles.input}
        textContainerStyle={styles.inputContainer}
        countryPickerButtonStyle={styles.country}
        value={parsedPhoneNumber.value}
        textInputProps={{
          placeholderTextColor: theme.colors.gray['1'],
          placeholder: 'Phone number',
          onBlur: controller.field.onBlur,
        }}
        renderDropdownImage={<DropdownIcon width={15} height={15} color={theme.colors.black[1]} />}
        codeTextStyle={styles.code}
        countryPickerProps={{
          preferredCountries: [DEFAULT_COUNTRY_CODE],
        }}
        onChangeFormattedText={controller.field.onChange}
      />
    </Field>
  );
};

const useStyles = makeStyles(() => {
  const theme = useUIKitTheme();

  return {
    container: {
      borderRadius: 6,
      width: '100%',
      borderWidth: 0.5,
      borderStyle: 'solid',
      borderColor: theme.colors.black[1],
      height: 40,
    },
    input: {
      backgroundColor: '#fff',
      padding: 0,
      flex: 1,
      fontSize: theme.text.p1.fontSize,
    },
    inputContainer: {
      flex: 1,
      marginRight: 15,
      alignSelf: 'center',
      backgroundColor: theme.colors.white,
      paddingHorizontal: 0,
      paddingVertical: 0,
    },
    code: {
      color: theme.colors.gray[1],
      paddingHorizontal: 10,
      marginRight: 0,
      fontSize: theme.text.p1.fontSize,
    },
    country: {
      borderRightWidth: 0.5,
      borderStyle: 'solid',
      borderColor: theme.colors.black[1],
      width: 'auto',
      paddingHorizontal: 10,
      alignSelf: 'center',
      height: 38,
    },
  };
});
