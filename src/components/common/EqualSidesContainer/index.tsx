import React from 'react';
import { ColorValue, TouchableOpacity, TouchableOpacityProps } from 'react-native';

import { makeStyles } from '../../../utils';

export interface EqualSidesContainerProps extends TouchableOpacityProps {
  /**
   *  Width and height of the container
   *  */
  size: number;
  /**
   *  Color of the container background
   *  */
  bgColor?: ColorValue;
  /**
   *  Border radius of the container.<br>
   *  Could have a specific value if passed as a number or just be round.
   *  */
  borderRadius?: 'rounded' | number;
}

/**
 * Simple helper component mostly used as a background for icons
 * */
export const EqualSidesContainer: React.FC<EqualSidesContainerProps> = ({
  style,
  borderRadius,
  onPress,
  bgColor,
  size,
  ...touchableProps
}) => {
  const styles = useStyles({ borderRadius, bgColor, size });

  return (
    <TouchableOpacity
      {...touchableProps}
      disabled={!onPress}
      style={[styles.container, style]}
      onPress={onPress}
    />
  );
};

const useStyles = makeStyles(
  (theme, { size, bgColor, borderRadius }: EqualSidesContainerProps) => ({
    container: {
      width: size,
      height: size,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: borderRadius === 'rounded' ? size / 2 : borderRadius,
      backgroundColor: bgColor,
    },
  }),
);
