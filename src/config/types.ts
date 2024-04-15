import { ElementType } from 'react';
import { ShadowStyleIOS } from 'react-native';

import {
  Checkbox,
  DatePicker,
  Dropdown,
  MultiRollerPicker,
  PasswordField,
  Radio,
} from '../components';
import { ActionSheet, useActionSheetStyles } from '../components/common/ActionSheet';
import { AppText, useAppTextStyles } from '../components/common/AppText';
import { BottomSheet, useBottomSheetStyles } from '../components/common/BottomSheet';
import {
  Button,
  useNegativeButtonStyles,
  usePrimaryButtonStyles,
  useSecondaryButtonStyles,
} from '../components/common/Button';
import { Label, useLabelStyle } from '../components/common/Label';
import { TextInput, useTextInputStyles } from '../components/common/TextInput';
import { Field, useFieldStyle } from '../components/form/Field';
import { BasicHeader, useBasicHeaderStyles } from '../components/screens/BasicHeader';
import { ScreenContainer, useScreenContainerStyles } from '../components/screens/ScreenContainer';
import { PartialProps } from '../types';
import { makeDefaultProps, makeStyles } from '../utils';

export interface UIKitTheme {
  colors: {
    primary: string;
    secondary?: string;
    additional?: string;
    error: string;
    success: string;
    white: string;
    black: Record<1 | 2 | 3, string>;
    gray: Record<1 | 2 | 3 | 4 | 5 | 6 | 7, string>;

    [key: string]: any;
  };
  shadow: Record<1 | 2 | 3 | 4 | 5, ShadowStyleIOS & { elevation?: number }>;
}

type DefaultPropsConfig<T extends ElementType, TPartialProps = PartialProps<T>> =
  | TPartialProps
  | ReturnType<typeof makeDefaultProps<TPartialProps>>;

export interface BasicConfig {
  defaultProps: DefaultPropsConfig<ElementType>;
  styles: ReturnType<typeof makeStyles>;
}

export interface UIComponents {
  AppText: {
    defaultProps: DefaultPropsConfig<typeof AppText>;
    styles: typeof useAppTextStyles;
  };
  TextInput: {
    defaultProps: DefaultPropsConfig<typeof TextInput>;
    styles: typeof useTextInputStyles;
  };
  'Button.Primary': {
    defaultProps: DefaultPropsConfig<typeof Button>;
    styles: typeof usePrimaryButtonStyles;
  };
  'Button.Secondary': {
    defaultProps: DefaultPropsConfig<typeof Button>;
    styles: typeof useSecondaryButtonStyles;
  };
  'Button.Negative': {
    defaultProps: DefaultPropsConfig<typeof Button>;
    styles: typeof useNegativeButtonStyles;
  };
  'Button.Plain': {
    defaultProps: DefaultPropsConfig<typeof Button>;
    styles: never;
  };
  Checkbox: {
    defaultProps: DefaultPropsConfig<typeof Checkbox>;
    styles: never;
  };
  Radio: {
    defaultProps: DefaultPropsConfig<typeof Radio>;
    styles: never;
  };
  Field: {
    defaultProps: DefaultPropsConfig<typeof Field>;
    styles: typeof useFieldStyle;
  };
  PasswordField: {
    defaultProps: DefaultPropsConfig<typeof PasswordField>;
    styles: never;
  };
  ScreenContainer: {
    defaultProps: DefaultPropsConfig<typeof ScreenContainer>;
    styles: typeof useScreenContainerStyles;
  };
  BasicHeader: {
    defaultProps: DefaultPropsConfig<typeof BasicHeader>;
    styles: typeof useBasicHeaderStyles;
  };
  BottomSheet: {
    defaultProps: DefaultPropsConfig<typeof BottomSheet>;
    styles: typeof useBottomSheetStyles;
  };
  MultiRollerPicker: {
    defaultProps: DefaultPropsConfig<typeof MultiRollerPicker>;
    styles: never;
  };
  ActionSheet: {
    defaultProps: DefaultPropsConfig<typeof ActionSheet>;
    styles: typeof useActionSheetStyles;
  };
  Dropdown: {
    defaultProps: DefaultPropsConfig<typeof Dropdown>;
    styles: never;
  };
  DatePicker: {
    defaultProps: DefaultPropsConfig<typeof DatePicker>;
    styles: never;
  };
  Label: {
    defaultProps: DefaultPropsConfig<typeof Label>;
    styles: typeof useLabelStyle;
  };
}

export type ComponentsConfig = { [P in keyof UIComponents]?: Partial<UIComponents[P]> };
