# @appello/mobile-ui
Appello Mobile UIKit.

# List of components
[You can find a list of components here](docs/README.md)

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
You can (and probably will have to) also configure basic UIKit components using the Provider.

TBD
