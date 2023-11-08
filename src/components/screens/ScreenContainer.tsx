import { IS_IOS } from '@appello/mobile/lib/constants/platform';
import React from 'react';
import { KeyboardAvoidingView, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useCombinedPropsWithConfig } from '~/hooks/useCombinedPropsWithConfig';
import { useCombinedStylesWithConfig } from '~/hooks/useCombinedStylesWithConfig';
import { layout } from '~/styles/layout';
import { makeStyles } from '~/utils';

export interface ScreenContainerProps {
  /* Header to render on top of the screen */
  header?: React.ReactNode;
  /* Screen content */
  children: React.ReactNode | React.ReactNode[];
  /* Style of the main container */
  containerStyle?: ViewStyle;
  /* Style of the content container */
  contentContainerStyle?: ViewStyle;
}

interface ScreenContainerStyles {
  'screen-container'?: ViewStyle;
  'screen-container__content'?: ViewStyle;
}

/**
 * Basic screen container with KeyboardAvoidingView, header and SafeAreaView included.
 *
 * Style configuration interface:
 * ```
 * interface ScreenContainerStyles {
 *   'screen-container'?: ViewStyle;
 *   'screen-container__content'?: ViewStyle;
 * }```
 */
export const ScreenContainer: React.FC<ScreenContainerProps> = props => {
  const { header, children, containerStyle, contentContainerStyle } = useCombinedPropsWithConfig(
    'ScreenContainer',
    props,
  );
  const style = useCombinedStylesWithConfig('ScreenContainer', useScreenContainerStyles);

  return (
    <KeyboardAvoidingView
      behavior={IS_IOS ? 'padding' : undefined}
      style={[style['screen-container'], containerStyle]}
      contentContainerStyle={[layout.fill]}
    >
      {header}
      <SafeAreaView
        edges={header ? ['bottom'] : ['top', 'bottom']}
        style={[style['screen-container__content'], contentContainerStyle]}
      >
        {children}
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export const useScreenContainerStyles = makeStyles<void, ScreenContainerStyles>(() => ({
  'screen-container': {
    flex: 1,
  },
  'screen-container__content': {
    flex: 1,
  },
}));
