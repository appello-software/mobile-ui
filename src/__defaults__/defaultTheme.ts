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
      shadowColor: 'rgba(200, 200, 200, 0.1)',
      shadowOffset: { width: 0, height: 8 },
      shadowRadius: 20,
      shadowOpacity: 1,
      elevation: 20,
    },
    2: {
      shadowColor: 'rgba(176, 176, 176, 0.1)',
      shadowOffset: { width: 0, height: 4 },
      shadowRadius: 4,
      shadowOpacity: 1,
      elevation: 4,
    },
    3: {
      shadowColor: 'rgba(199, 199, 199, 0.1)',
      shadowOffset: { width: 0, height: -4 },
      shadowRadius: 20,
      shadowOpacity: 1,
      elevation: 20,
    },
    4: {
      shadowColor: 'rgba(186, 186, 186, 0.1)',
      shadowOffset: { width: 0, height: 20 },
      shadowRadius: 40,
      shadowOpacity: 1,
      elevation: 40,
    },
    5: {
      shadowColor: 'rgba(186, 186, 186, 0.1)',
      shadowOffset: { width: -2, height: 8 },
      shadowRadius: 16,
      shadowOpacity: 1,
      elevation: 16,
    },
  },
};
