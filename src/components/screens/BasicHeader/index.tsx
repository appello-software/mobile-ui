import BackIcon from '@appello/mobile-ui/icons/unicons/left-arrow-3.svg';
import { HeaderBackContext } from '@react-navigation/elements';
import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { ColorValue, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import { SafeAreaView, SafeAreaViewProps } from 'react-native-safe-area-context';
import { SvgProps } from 'react-native-svg';

import { useUIKitTheme } from '../../../config/utils';
import { useCombinedPropsWithConfig } from '../../../hooks/useCombinedPropsWithConfig';
import { useCombinedStylesWithConfig } from '../../../hooks/useCombinedStylesWithConfig';
import { layout } from '../../../styles/layout';
import { makeStyles } from '../../../utils';
import { AppText } from '../../common/AppText';

export interface BasicHeaderProps extends React.PropsWithChildren {
  /**
   *  Icon of back button
   *
   *  @default @appello/mobile-ui/icons/unicons/left-arrow-3.svg
   *  */
  BackButtonIcon?: React.FC<SvgProps>;
  /* Should hide back button even if it's possible to go back */
  hideBackButton?: boolean;
  /* Title to display in the middle of header */
  title?: string;
  /* Subtitle to display under the title */
  subTitle?: string;
  /* Any element to display in the right part of header */
  accessoryRight?: Nullable<React.ReactNode>;
  /* Container style */
  containerStyle?: SafeAreaViewProps['style'];
  /** Title and BackButton color
   *
   * @default theme.colors.black['1']
   * */
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
    BackButtonIcon = BackIcon,
    hideBackButton,
    accessoryRight,
    title,
    subTitle,
    containerStyle,
    textColor = colors.black['1'],
    children,
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
        <View style={[layout.row, layout.justifyContentBetween, layout.alignItemsCenter]}>
          {backButton}
          <View style={innerStyles['basic-header__titles']}>
            <AppText color={textColor} numberOfLines={1} variant="p3">
              {title || route.name}
            </AppText>
            {!!subTitle && (
              <AppText
                color={colors.gray['1']}
                numberOfLines={1}
                style={innerStyles['basic-header__subtitle']}
                variant="p4"
              >
                {subTitle}
              </AppText>
            )}
          </View>
          <View style={innerStyles['basic-header__right-accessory']}>{accessoryRight}</View>
        </View>
        {children}
      </View>
    </SafeAreaView>
  );
};

export const useBasicHeaderStyles = makeStyles<void, BasicHeaderStyles>(() => ({
  'basic-header': {
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
    'basic-header__titles': {
      flex: 1,
      marginHorizontal: 15,
      alignItems: 'center',
    },
    'basic-header__subtitle': {
      marginTop: -5,
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
