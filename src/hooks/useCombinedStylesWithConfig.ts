import { UIComponents } from '~/config';
import { useComponentsConfig } from '~/config/utils';
import { keys } from '@appello/common/lib/utils/object';

export function useCombinedStylesWithConfig<T extends keyof UIComponents>(
  componentName: T,
  useDefaultStyles: UIComponents[T]['styles'],
): ReturnType<UIComponents[T]['styles']> {
  const componentConfig = useComponentsConfig()[componentName];
  const defaultStyles = useDefaultStyles() as ReturnType<UIComponents[T]['styles']>;

  const combinedStyles = defaultStyles;
  if (!componentConfig?.styles) {
    return combinedStyles;
  }

  const configStyles = componentConfig.styles() as ReturnType<UIComponents[T]['styles']>;
  keys(combinedStyles).forEach(key => {
    combinedStyles[key] = {
      ...defaultStyles[key],
      ...configStyles[key],
    };
  });

  return combinedStyles;
}
