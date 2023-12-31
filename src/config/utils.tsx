import { useContext } from 'react';

import { ComponentsConfig, UIKitTheme } from './types';
import { UIKitConfigContext } from './UIKitConfigProvider';

export function useUIKitTheme(): UIKitTheme {
  return useContext(UIKitConfigContext).theme as UIKitTheme;
}

export function useComponentsConfig(): ComponentsConfig {
  return useContext(UIKitConfigContext).componentsConfig;
}

interface WithThemeProps {
  theme: UIKitTheme;
}

export function withUIKitTheme<T extends Record<string, any>>(
  wrappedFunction: (props: T) => any,
): (props: T & WithThemeProps) => any {
  const functionWithTheme: (props: T & WithThemeProps) => any = (props: T) => {
    const theme = useUIKitTheme();
    return wrappedFunction({ theme, ...(props as T) });
  };
  return functionWithTheme;
}
