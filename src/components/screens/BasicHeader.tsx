import { HeaderBackContext } from '@react-navigation/elements';
import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
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

  const { BackButtonIcon, hideBackButton, accessoryRight, title } = useCombinedPropsWithConfig(
    'BasicHeader',
    props,
  );
  const styles = useCombinedStylesWithConfig('BasicHeader', useBasicHeaderStyles);

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
              onPress={onBackPress}
              style={innerStyles['basic-button__left-accessory']}
            >
              <BackButtonIcon color={colors.black[1]} width={24} height={24} />
            </TouchableOpacity>
          );
        }

        return <View style={innerStyles['basic-button__left-accessory']} />;
      }}
    </HeaderBackContext.Consumer>
  );

  return (
    <SafeAreaView edges={['top']}>
      <View style={styles['basic-header']}>
        {backButton}
        <AppText variant="p3" color={colors.black['1']}>
          {title || route.name}
        </AppText>
        <View style={innerStyles['basic-header__right-accessory']}>{accessoryRight}</View>
      </View>
    </SafeAreaView>
  );
};

export const useBasicHeaderStyles = makeStyles<void, BasicHeaderStyles>(({ shadow }) => ({
  'basic-header': {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 15,
    ...shadow[1],
  },
}));

const innerStyles = StyleSheet.create({
  'basic-button__left-accessory': {
    alignSelf: 'stretch',
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: '20%',
  },
  'basic-header__right-accessory': {
    alignSelf: 'stretch',
    alignItems: 'flex-end',
    justifyContent: 'center',
    width: '20%',
  },
});
