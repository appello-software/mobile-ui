# UI Kit

Add `UIKitProdiver` to the `RootApp` component
```tsx
export const RootApp: FC = () => (
  <UIKitProvider>
    <App />
  </UIKitProvider>
);
```

You can also specify your own theme
```tsx
const theme = {
  colors: {
    primary: 'brown'
  },
};

export const RootApp: FC = () => (
  <UIKitProvider theme={theme}>
    <App />
  </UIKitProvider>
);
```
