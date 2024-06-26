import { IS_IOS } from '@appello/mobile/lib/constants/platform';
import React, { useMemo } from 'react';
import { KeyboardAvoidingView, KeyboardAvoidingViewProps, ViewStyle } from 'react-native';
import { Edge, SafeAreaView, SafeAreaViewProps } from 'react-native-safe-area-context';

import { useCombinedPropsWithConfig } from '../../../hooks/useCombinedPropsWithConfig';
import { useCombinedStylesWithConfig } from '../../../hooks/useCombinedStylesWithConfig';
import { layout } from '../../../styles/layout';
import { makeStyles } from '../../../utils';

export interface ScreenContainerProps extends KeyboardAvoidingViewProps {
  /* Header to render on top of the screen */
  header?: React.ReactNode;
  /* Screen content */
  children: React.ReactNode | React.ReactNode[];
  /* Style of the main container */
  containerStyle?: ViewStyle;
  /* Style of the content container */
  contentContainerStyle?: ViewStyle;
  /* Custom edges of included into the component SafeArea */
  safeAreaEdges?: SafeAreaViewProps['edges'];
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
  const { header, children, containerStyle, contentContainerStyle, safeAreaEdges, ...restProps } =
    useCombinedPropsWithConfig('ScreenContainer', props);
  const style = useCombinedStylesWithConfig('ScreenContainer', useScreenContainerStyles);

  return (
    <KeyboardAvoidingView
      behavior={IS_IOS ? 'padding' : undefined}
      contentContainerStyle={[layout.fill]}
      {...restProps}
      style={[style['screen-container'], containerStyle]}
    >
      {header}
      <SafeAreaView
        edges={useMemo(() => {
          if (safeAreaEdges) return safeAreaEdges;

          const edges: Edge[] = ['bottom'];
          if (!header) edges.push('top');

          return edges;
        }, [header, safeAreaEdges])}
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
