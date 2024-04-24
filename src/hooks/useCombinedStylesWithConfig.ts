import { keys } from '@appello/common';
import { StyleSheet } from 'react-native';
import NamedStyles = StyleSheet.NamedStyles;

import { UIComponents } from '../config';
import { useComponentsConfig } from '../config/utils';

export function useCombinedStylesWithConfig<T extends keyof UIComponents>(
  componentName: T,
  useDefaultStyles: UIComponents[T]['styles'],
): NamedStyles<ReturnType<UIComponents[T]['styles']>> {
  const componentConfig = useComponentsConfig()[componentName];
  const defaultStyles = useDefaultStyles() as ReturnType<UIComponents[T]['styles']>;

  const combinedStyles = defaultStyles;
  if (componentConfig?.styles) {
    const configStyles = componentConfig.styles() as ReturnType<UIComponents[T]['styles']>;
    keys(combinedStyles).forEach(key => {
      combinedStyles[key] = {
        ...defaultStyles[key],
        ...configStyles[key],
      };
    });
  }

  return StyleSheet.create(combinedStyles as NamedStyles<ReturnType<UIComponents[T]['styles']>>);
}
