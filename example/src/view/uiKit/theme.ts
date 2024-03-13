import { makeTheme } from '@appello/mobile-ui';

/* Set up theme from the project design here */
const theme = makeTheme({
  colors: {},
});

export type ThemeType = typeof theme;

export { theme };
