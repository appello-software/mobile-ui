import { UIComponents } from '~/config';
import { useComponentsConfig } from '~/config/utils';

export function useCombinedPropsWithConfig<
  T extends keyof UIComponents,
  TConfig = UIComponents[T]['defaultProps'],
>(componentName: T, props: TConfig): TConfig {
  const componentConfig = useComponentsConfig()[componentName];

  let componentProps = {};
  if (componentConfig?.defaultProps) {
    componentProps =
      typeof componentConfig.defaultProps === 'function'
        ? componentConfig.defaultProps()
        : componentConfig.defaultProps;
  }

  return {
    ...componentProps,
    ...props,
  };
}
