import React from 'react';
import { View, ViewStyle } from 'react-native';

import { useCombinedPropsWithConfig } from '../../../hooks/useCombinedPropsWithConfig';
import { useCombinedStylesWithConfig } from '../../../hooks/useCombinedStylesWithConfig';
import { makeStyles } from '../../../utils';
import { AppText, AppTextProps } from '../AppText';

export interface LabelStyle {
  label?: ViewStyle;
}

export interface LabelProps {
  /**
   * Text to display on the label
   * */
  children: string;
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

export const Label: React.FC<LabelProps> = props => {
  const styles = useCombinedStylesWithConfig('Label', useLabelStyle);
  const {
    children,
    textProps = { variant: 'p3', weight: 'medium' },
    textColor,
    bgColor,
    style,
  } = useCombinedPropsWithConfig('Label', props);
  const internalStyles = useInternalStyles({ bgColor });

  return (
    <View style={[internalStyles.container, styles.label, style]}>
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
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 100,
  },
}));
