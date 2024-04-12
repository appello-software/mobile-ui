import { IS_IOS } from '@appello/mobile/lib/constants/platform';
import React, { useMemo } from 'react';
import { ViewStyle } from 'react-native';
import { KeyboardAvoidingView, KeyboardControllerProps } from 'react-native-keyboard-controller';
import { Edge, SafeAreaView } from 'react-native-safe-area-context';

import { useCombinedPropsWithConfig } from '../../../hooks/useCombinedPropsWithConfig';
import { useCombinedStylesWithConfig } from '../../../hooks/useCombinedStylesWithConfig';
import { layout } from '../../../styles/layout';
import { makeStyles } from '../../../utils';

export interface ScreenContainerProps extends KeyboardControllerProps {
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
  const { header, children, containerStyle, contentContainerStyle, ...restProps } =
    useCombinedPropsWithConfig('ScreenContainer', props);
  const style = useCombinedStylesWithConfig('ScreenContainer', useScreenContainerStyles);

  return (
    <KeyboardAvoidingView
      behavior={IS_IOS ? 'padding' : undefined}
      contentContainerStyle={layout.fill}
      {...restProps}
      style={[style['screen-container'], containerStyle]}
    >
      {header}
      <SafeAreaView
        edges={useMemo(() => {
          const edges: Edge[] = ['bottom'];
          if (!header) edges.push('top');

          return edges;
        }, [header])}
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
