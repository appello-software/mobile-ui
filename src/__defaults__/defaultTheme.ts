import { UIKitTheme } from '../config/types';

export const colors: UIKitTheme['colors'] = {
  primary: '#1C88EC',
  white: '#FFFFFF',
  error: '#EF4646',
  success: '#219653',
  black: {
    1: '#0F1010',
    2: '#27292E',
    3: '#404548',
  },
  gray: {
    1: '#6F6F75',
    2: '#91919E',
    3: '#B8B8C6',
    4: '#D4D4E3',
    5: '#E8E8F4',
    6: '#F0F0F6',
    7: '#F9F9FB',
  },
};

export const defaultTheme: UIKitTheme = {
  colors,
  shadow: {
    1: {
      shadowColor: '#a8a8a8',
      shadowOffset: { width: 0, height: 5 },
      shadowRadius: 3,
      shadowOpacity: 1,
      elevation: 4,
    },
    2: {
      shadowColor: '#a8a8a8',
      shadowOffset: { width: 0, height: 5 },
      shadowRadius: 3,
      shadowOpacity: 1,
      elevation: 4,
    },
    3: {
      shadowColor: '#a8a8a8',
      shadowOffset: { width: 0, height: 5 },
      shadowRadius: 3,
      shadowOpacity: 1,
      elevation: 4,
    },
    4: {
      shadowColor: '#a8a8a8',
      shadowOffset: { width: 0, height: 5 },
      shadowRadius: 3,
      shadowOpacity: 1,
      elevation: 4,
    },
  },
};
