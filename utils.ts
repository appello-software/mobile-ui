import { StyleSheet } from 'react-native';

type Styles = Parameters<typeof StyleSheet.create>[0];

export const makeStyles = <P extends Record<string, unknown> | void>(
  styles: ((props: P) => Styles) | Styles,
): ((props: P) => Styles) => {
  return styles instanceof Function ? styles : () => styles;
};
