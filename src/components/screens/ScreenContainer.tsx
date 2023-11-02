import { IS_IOS } from '@appello/mobile/lib/constants/platform';
import React from 'react';
import { KeyboardAvoidingView, ViewStyle } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { useCombinedPropsWithConfig } from '~/hooks/useCombinedPropsWithConfig';
import { useCombinedStylesWithConfig } from '~/hooks/useCombinedStylesWithConfig';
import { makeStyles } from '~/utils';

export interface ScreenContainerProps {
  /* Header to render on top of the screen */
  header?: React.ReactElement | null;
  /* Screen content */
  children: React.ReactElement | React.ReactElement[];
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
 *   'content-container'?: ViewStyle;
 * }```
 */
export const ScreenContainer: React.FC<ScreenContainerProps> = props => {
  const { top = 0, bottom = 0 } = useSafeAreaInsets();
  const { header, children, contentContainerStyle } = useCombinedPropsWithConfig(
    'ScreenContainer',
    props,
  );
  const style = useCombinedStylesWithConfig('ScreenContainer', useScreenContainerStyles);

  return (
    <KeyboardAvoidingView
      behavior={IS_IOS ? 'padding' : undefined}
      style={style['screen-container']}
      keyboardVerticalOffset={top + bottom}
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
