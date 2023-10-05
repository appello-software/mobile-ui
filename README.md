# @appello/mobile-ui
Appello Mobile UIKit.

# List of components
[You can find a list of components and theirs props here](https://main--651eac83bd7f617778b019a6.chromatic.com)

# Usage
## Provider
Add `UIKitProdiver` to the `RootApp` component

```tsx
// src/index.tsx
import { UIKitConfigProvider } from '@appello/mobile-ui';

export const RootApp: FC = () => (
  <UIKitConfigProvider>
    <App/>
  </UIKitConfigProvider>
);
```

## Theme
Define your project's theme using `makeTheme` function and provide it to the Provider. You should take those values from the UI section of the design.

```tsx
// view/theme.ts
import { makeTheme } from '@appello/mobile-ui';

const theme = makeTheme({
  colors: {
    primary: '#008080',
    secondary: '#063D86',
  },
});

export { theme };

// src/index.tsx
import { theme } from '~/view/theme';

export const RootApp: FC = () => (
  <UIKitProvider theme={theme}>
    <App />
  </UIKitProvider>
);
```
Now, UIKit will start using your values instead of default ones. For example, `Button` with primary variant will now be colored in your `colors.primary` color.

## Config
`UIKitProvider` also has `componentsConfig` prop which takes the components config with this interface:

```typescript
interface UIComponents {
  AppText: {
    defaultProps: DefaultPropsConfig<typeof AppText>;
    styles: typeof useAppTextStyles;
  };
  TextInput: {
    defaultProps: DefaultPropsConfig<typeof TextInput>;
    styles: typeof useTextInputStyles;
  };
  'Button.Primary': {
    defaultProps: DefaultPropsConfig<typeof Button>;
    styles: typeof usePrimaryButtonStyles;
  };
  'Button.Secondary': {
    defaultProps: DefaultPropsConfig<typeof Button>;
    styles: typeof useSecondaryButtonStyles;
  };
  Field: {
    defaultProps: DefaultPropsConfig<typeof Field>;
    styles: typeof useFieldStyle;
  };
  PasswordField: {
    defaultProps: DefaultPropsConfig<typeof PasswordField>;
    styles: never;
  };
}

export type ComponentsConfig = { [P in keyof UIComponents]?: Partial<UIComponents[P]> };
```

As you can see, you can set up each component's additional styles, as well as its default properties.  
Config of every component is optional, but in most cases you will have to config at least some of the components for them to match your project design.
