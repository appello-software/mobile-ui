import { Falsy, ImageStyle, StyleProp, TextStyle, ViewStyle } from 'react-native';

export type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

type GetStyleByState<T extends WithStyleProps, TStates extends string[]> = (
  states: Record<TStates[number], Falsy | true>,
  style: T['style'],
) => NonNullable<T['style']>;

export interface WithStyleProps {
  style?: StyleProp<ViewStyle | TextStyle | ImageStyle>;
}

export type WithGetStyleByState<T extends WithStyleProps, TStates extends string[]> = T & {
  /** A function to change the default style depending on current state */
  getStyleByState?: GetStyleByState<T, TStates>;
};
