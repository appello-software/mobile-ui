import { UIKitTheme } from './types';

const colors: UIKitTheme['colors'] = {
  primary: '#1C88EC',
  white: '#FFFFFF',
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
  common: {
    error: '#EF4646',
    success: '#219653',
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
  fontFamily: {
    regular: 'Mulish-Regular',
    medium: 'Mulish-Medium',
    semiBold: 'Mulish-SemiBold',
    bold: 'Mulish-Bold',
  },
  text: {
    h1: {
      fontFamily: 'Mulish-Bold',
      fontSize: 34,
      lineHeight: 48,
    },
    h2: {
      fontFamily: 'Mulish-Bold',
      fontSize: 29,
      lineHeight: 42,
    },
    h3: {
      fontFamily: 'Mulish-Bold',
      fontSize: 26,
      lineHeight: 36,
    },
    h4: {
      fontFamily: 'Mulish-Bold',
      fontSize: 21,
      lineHeight: 32,
    },
    h5: {
      fontFamily: 'Mulish-Bold',
      fontSize: 19,
      lineHeight: 30,
    },
    h6: {
      fontFamily: 'Mulish-Bold',
      fontSize: 17,
      lineHeight: 25,
    },
    p1: {
      fontFamily: 'Mulish-Regular',
      fontSize: 15,
      lineHeight: 24,
    },

    p2: {
      fontFamily: 'Mulish-Regular',
      fontSize: 14,
      lineHeight: 21,
    },

    p3: {
      fontFamily: 'Mulish-Regular',
      fontSize: 13,
      lineHeight: 23,
    },

    p4: {
      fontFamily: 'Mulish-Regular',
      fontSize: 12,
      lineHeight: 21,
    },

    c1: {
      fontFamily: 'Mulish-Regular',
      fontSize: 11,
      lineHeight: 16,
    },
    c2: {
      fontFamily: 'Mulish-Regular',
      fontSize: 10,
      lineHeight: 16,
    },
  },
  backgroundColor: colors.white,
  input: {
    borderRadius: 6,
    textVariant: 'p3',
    layout: {
      base: {
        height: 54,
        paddingHorizontal: 19,
      },
      multiline: {
        height: 104,
        paddingHorizontal: 19,
      },
    },
    colors: {
      default: {
        text: colors.black['1'],
        placeholder: colors.gray['3'],
        background: colors.white,
        border: colors.gray['5'],

        icon: colors.gray['3'],
      },
      disabled: {
        text: colors.gray['3'],
        placeholder: colors.gray['3'],
        background: colors.gray['7'],
        border: colors.gray['7'],

        icon: colors.gray['3'],
      },
      focused: {
        border: colors.primary,
      },
    },
  },
  field: {
    layout: {
      labelBottomInset: 1,
      errorTopInset: 3,
    },
    colors: {
      default: {
        label: colors.gray['2'],
      },
      disabled: {
        label: colors.gray['3'],
      },
    },
    fonts: {
      label: 'p3',
      error: 'p4',
    },
  },
  button: {
    textVariant: 'p2',
    colors: {
      primary: {
        background: colors.primary,
        label: colors.white,
        border: null,
        loader: colors.white,
      },
      primaryDisabled: {
        background: colors.gray['5'],
        label: colors.gray['3'],
        border: null,
      },
      secondary: {
        background: colors.white,
        label: colors.black['2'],
        border: colors.gray['5'],
        loader: colors.primary,
      },
      secondaryDisabled: {
        background: colors.gray['5'],
        label: colors.gray['3'],
        border: null,
      },
    },
    layout: {
      medium: {
        height: 54,
        paddingHorizontal: 16,
        borderRadius: 12,
      },
    },
  },
};
