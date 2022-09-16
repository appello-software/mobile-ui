import React from 'react';
import { Text as DefaultText, TextProps } from 'react-native';

import { FontWeight, TextVariant, useUIKitTheme } from '~/ui';
import { makeStyles } from '~/ui/utils';

type InnerAppTextProps = {
  variant?: TextVariant;
  color?: string;
  fontWeight?: FontWeight;
};

export type AppTextProps = InnerAppTextProps & TextProps;

export const AppText: React.FC<AppTextProps> = ({ style, ...otherProps }) => {
  const themeStyle = useStyles(otherProps);

  return <DefaultText style={[themeStyle.text, style]} {...otherProps} />;
};

const useStyles = makeStyles((props: InnerAppTextProps) => {
  const theme = useUIKitTheme();

  const defaultStyle = theme.text[props.variant ?? 'p1'];
  return {
    text: {
      ...defaultStyle,
      fontFamily: props.fontWeight ? theme.fontFamily[props.fontWeight] : defaultStyle.fontFamily,
      color: props.color ?? theme.colors.black['1'],
    },
  };
});
