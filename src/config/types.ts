import { ShadowStyleIOS } from 'react-native';

import { AppTextConfig, FuncAppTextConfig } from '~/components/common/AppText';
import { ButtonConfig, FuncButtonConfig } from '~/components/common/Button';
import { FuncTextInputConfig, TextInputConfig } from '~/components/common/TextInput';
import { FieldConfig, FuncFieldConfig } from '~/components/form/Field';

export type FontWeight = 'regular' | 'medium' | 'semiBold' | 'bold';
export type FontFamily = Partial<Record<FontWeight, string>>;

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
  shadow: Record<1 | 2 | 3 | 4, ShadowStyleIOS & { elevation?: number }>;
}

export interface BaseComponentsConfig {
  appText?: AppTextConfig | FuncAppTextConfig;
  button?: ButtonConfig | FuncButtonConfig;
  field?: FieldConfig | FuncFieldConfig;
  textInput?: TextInputConfig | FuncTextInputConfig;
}
