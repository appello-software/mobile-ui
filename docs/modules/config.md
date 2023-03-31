[@appello/mobile-ui](../README.md) / config

# Module: config

## Table of contents

### Interfaces

- [BaseComponentsConfig](../interfaces/config.BaseComponentsConfig.md)
- [UIKitTheme](../interfaces/config.UIKitTheme.md)

### Type Aliases

- [FontFamily](config.md#fontfamily)
- [FontWeight](config.md#fontweight)

### Functions

- [createUIKitConfigProvider](config.md#createuikitconfigprovider)

## Type Aliases

### FontFamily

Ƭ **FontFamily**: `Partial`<`Record`<[`FontWeight`](config.md#fontweight), `string`\>\>

#### Defined in

[src/config/types.ts:9](https://bitbucket.org/appello/mobile-ui-kit/src/469127c/src/config/types.ts#lines-9)

___

### FontWeight

Ƭ **FontWeight**: ``"regular"`` \| ``"medium"`` \| ``"semiBold"`` \| ``"bold"``

#### Defined in

[src/config/types.ts:8](https://bitbucket.org/appello/mobile-ui-kit/src/469127c/src/config/types.ts#lines-8)

## Functions

### createUIKitConfigProvider

▸ **createUIKitConfigProvider**<`T`\>(): `Object`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Object` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `UIKitConfigProvider` | `FC`<`PropsWithChildren`<`ThemeProviderProps`<`T`\>\>\> |
| `makeStyles` | <TProps\>(`styles`: `NamedStyles`<`any`\> \| `NamedStyles`<`NamedStyles`<`any`\>\> \| (`props`: `TProps`, `theme`: `T`) => `NamedStyles`<`any`\> \| `NamedStyles`<`NamedStyles`<`any`\>\>) => (`props`: `TProps`) => `NamedStyles`<`any`\> \| `NamedStyles`<`NamedStyles`<`any`\>\> |
| `useBaseComponentsConfig` | () => `FullContext`[``"baseComponentsConfig"``] |
| `useUIKitTheme` | () => `FullContext`[``"theme"``] |

#### Defined in

[src/config/createUIKitConfigProvider.tsx:13](https://bitbucket.org/appello/mobile-ui-kit/src/469127c/src/config/createUIKitConfigProvider.tsx#lines-13)
