import React from 'react';
import { View, ViewStyle } from 'react-native';
import { SvgProps } from 'react-native-svg';

import { useCombinedPropsWithConfig } from '../../../hooks/useCombinedPropsWithConfig';
import { useCombinedStylesWithConfig } from '../../../hooks/useCombinedStylesWithConfig';
import { makeStyles } from '../../../utils';
import { AppText, AppTextProps } from '../AppText';

export interface LabelStyle {
  label?: ViewStyle;
  label__icon?: ViewStyle;
}

export interface LabelProps {
  /**
   * Text to display on the label
   * */
  children: string;
  /**
   * Icon to display to the left of the text
   * */
  icon?: React.FC<SvgProps>;
  /** Size of the Icon component
   *
   * @default { width: 16, height: 16 }
   * */
  iconSize?: {
    width: number;
    height: number;
  };
  /**
   * Additional style of the label container. You should use mostly for layout props
   * */
  style?: ViewStyle;
  /**
   * Props of the label text
   *
   * @default { variant: 'p3', weight: 'medium' }
   * */
  textProps?: AppTextProps;
  /**
   * Color of the text and icon
   * */
  textColor: string;
  /**
   * Color of the label container
   * */
  bgColor: string;
}

/**
 * A component to display a text with background and icon if needed
 *
 * Style configuration interface:
 * ```interface LabelStyle {
 *   label?: ViewStyle;
 *   label__icon?: ViewStyle;
 * }```
 * */
export const Label: React.FC<LabelProps> = props => {
  const styles = useCombinedStylesWithConfig('Label', useLabelStyle);
  const {
    children,
    textProps = { variant: 'p3', weight: 'medium' },
    textColor,
    bgColor,
    style,
    icon,
    iconSize = { width: 16, height: 16 },
  } = useCombinedPropsWithConfig('Label', props);
  const internalStyles = useInternalStyles({ bgColor });

  const Icon = icon;
  return (
    <View style={[internalStyles.container, styles.label, style]}>
      {Icon ? <Icon color={textColor} style={styles.label__icon} {...iconSize} /> : null}
      <AppText {...textProps} color={textColor}>
        {children}
      </AppText>
    </View>
  );
};

const useInternalStyles = makeStyles((theme, { bgColor }: { bgColor: string }) => ({
  container: {
    backgroundColor: bgColor,
  },
}));

export const useLabelStyle = makeStyles<void, LabelStyle>(() => ({
  label: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 100,
  },
  label__icon: {
    marginRight: 4,
  },
}));
