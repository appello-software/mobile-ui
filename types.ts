import { LinearGradientProps } from 'expo-linear-gradient';
import { ReactNode } from 'react';
import { ShadowStyleIOS } from 'react-native';

export interface UIKitTheme {
  colors: {
    primary: string;
    secondary?: string;
    additional?: string;
    common: {
      error: string;
      success: string;
      [key: string]: string;
    };
    gradients?: {
      primary: LinearGradientProps;
      [key: string]: LinearGradientProps;
    };
    white: string;
    black: Record<1 | 2 | 3, string>;
    gray: Record<1 | 2 | 3 | 4 | 5 | 6 | 7, string>;
  };
  shadow: Record<1 | 2 | 3 | 4, ShadowStyleIOS & { elevation?: number }>;
  backgroundColor: string;
  fontFamily: FontFamily;
  text: Record<TextVariant, TextThemeProps>;
  input: {
    textVariant: TextVariant;
    borderRadius: number;
    colors: {
      default: InputColors;
      focused: Pick<InputColors, 'border'>;
      disabled: InputColors;
    };
    layout: {
      base: {
        height: number;
        paddingHorizontal: number;
      };
      multiline: {
        height: number;
        paddingHorizontal: number;
      };
    };
  };
  field: {
    layout: {
      labelBottomInset: number;
      errorTopInset: number;
    };
    fonts: {
      label: TextVariant;
      error: TextVariant;
    };
    colors: {
      default: {
        label: string;
      };
      disabled: {
        label: string;
      };
    };
  };
  button: {
    textVariant: TextVariant;
    colors: {
      primary: ButtonColors;
      primaryDisabled: Partial<Omit<ButtonColors, 'loader'>>;
      secondary: ButtonColors;
      secondaryDisabled: Partial<Omit<ButtonColors, 'loader'>>;
    };
    layout: {
      medium: {
        height: number;
        paddingHorizontal: number;
        borderRadius: number;
      };
    };
  };
}

export type TextVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'p1'
  | 'p2'
  | 'p3'
  | 'p4'
  | 'c1'
  | 'c2';

export type FontWeight = 'regular' | 'medium' | 'semiBold' | 'bold';

export type FontFamily = Record<FontWeight, string>;

export interface TextThemeProps {
  fontFamily: string;
  fontSize: number;
  lineHeight?: number;
}

export interface InputColors {
  background: string;
  text: string;
  placeholder: string;
  border: string;

  icon: string;
}

export type ButtonVariant = 'primary' | 'secondary';

export interface ButtonColors {
  background: string | LinearGradientProps;
  label: string;
  border: Nullable<string>;

  loader: string;
}

export interface UIKitProviderProps {
  theme?: DeepPartial<UIKitTheme>;
  children: ReactNode;
}

export type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;
