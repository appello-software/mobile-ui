import { HeaderBackContext } from '@react-navigation/elements';
import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { ColorValue, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import { SafeAreaView, SafeAreaViewProps } from 'react-native-safe-area-context';
import { SvgProps } from 'react-native-svg';

import { AppText } from '~/components/common/AppText';
import { useUIKitTheme } from '~/config/utils';
import { useCombinedPropsWithConfig } from '~/hooks/useCombinedPropsWithConfig';
import { useCombinedStylesWithConfig } from '~/hooks/useCombinedStylesWithConfig';
import { makeStyles } from '~/utils';

export interface BasicHeaderProps {
  /* Icon of back button */
  BackButtonIcon?: React.FC<SvgProps>;
  /* Should hide back button even if it's possible to go back */
  hideBackButton?: boolean;
  /* Title to display in the middle of header */
  title?: string;
  /* Any element to display in the right part of header */
  accessoryRight?: Nullable<React.ReactNode>;
  /* Container style */
  containerStyle?: SafeAreaViewProps['style'];
  /* Container style */
  textColor?: ColorValue;
}

interface BasicHeaderStyles {
  'basic-header'?: ViewStyle;
}

/**
 * Basic header with back button, title and optional right accessory.
 *
 * Style configuration interface:
 * ```
 * interface BasicHeaderStyles {
 *   'basic-header'?: ViewStyle;
 * }```
 */
export const BasicHeader: React.FC<BasicHeaderProps> = props => {
  const { colors } = useUIKitTheme();
  const navigation = useNavigation();
  const route = useRoute();

  const {
    BackButtonIcon,
    hideBackButton,
    accessoryRight,
    title,
    containerStyle,
    textColor = colors.black['1'],
  } = useCombinedPropsWithConfig('BasicHeader', props);
  const styles = useCombinedStylesWithConfig('BasicHeader', useBasicHeaderStyles);
  const innerStyles = useInnerStyles();

  const onBackPress = (): void => {
    navigation.goBack();
  };

  const backButton = (
    <HeaderBackContext.Consumer>
      {headerBack => {
        if (headerBack && BackButtonIcon && !hideBackButton) {
          return (
            <TouchableOpacity
              activeOpacity={0.75}
              style={innerStyles['basic-button__left-accessory']}
              onPress={onBackPress}
            >
              <BackButtonIcon color={textColor} height={24} width={24} />
            </TouchableOpacity>
          );
        }

        return <View style={innerStyles['basic-button__left-accessory']} />;
      }}
    </HeaderBackContext.Consumer>
  );

  return (
    <SafeAreaView edges={['top']} style={[innerStyles['basic-header__container'], containerStyle]}>
      <View style={styles['basic-header']}>
        {backButton}
        <AppText color={textColor} numberOfLines={2} variant="p3">
          {title || route.name}
        </AppText>
        <View style={innerStyles['basic-header__right-accessory']}>{accessoryRight}</View>
      </View>
    </SafeAreaView>
  );
};

export const useBasicHeaderStyles = makeStyles<void, BasicHeaderStyles>(() => ({
  'basic-header': {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 15,
  },
}));

const useInnerStyles = makeStyles(({ shadow, colors }) =>
  StyleSheet.create({
    'basic-header__container': {
      backgroundColor: colors.white,
      zIndex: 1,
      ...shadow[1],
    },
    'basic-button__left-accessory': {
      alignSelf: 'stretch',
      alignItems: 'flex-start',
      justifyContent: 'center',
      width: '25%',
    },
    'basic-header__right-accessory': {
      alignSelf: 'stretch',
      alignItems: 'flex-end',
      justifyContent: 'center',
      width: '25%',
    },
  }),
);
