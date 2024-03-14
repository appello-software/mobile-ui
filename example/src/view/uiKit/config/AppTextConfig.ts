import { ComponentsConfig } from '@appello/mobile-ui';
import { StyleSheet } from 'react-native';

import { makeDefaultProps, makeStyles } from '../index';

export const AppTextConfig: ComponentsConfig['AppText'] = {
  styles: makeStyles(() =>
    StyleSheet.create({
      'app-text': {},
      // Put font-sizes, line-height and font-families if needed here
      'app-text--h1': {},
      'app-text--h2': {},
      'app-text--h3': {},
      'app-text--h4': {},
      'app-text--h5': {},
      'app-text--h6': {},
      'app-text--p1': {},
      'app-text--p2': {},
      'app-text--p3': {},
      'app-text--p4': {},
      'app-text--p5': {},
      'app-text--p6': {},

      // Put font-families here
      'app-text--light': {},
      'app-text--regular': {},
      'app-text--medium': {},
      'app-text--bold': {},
    }),
  ),
  // Set up default props here
  defaultProps: makeDefaultProps(theme => ({
    color: theme.colors.black[1],
  })),
};
