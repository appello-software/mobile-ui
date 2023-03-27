@appello/mobile-ui

# @appello/mobile-ui

## Table of contents

### Variables

- [Form](README.md#form)

### Functions

- [AppText](README.md#apptext)
- [Button](README.md#button)
- [TextInput](README.md#textinput)

## Variables

### Form

• `Const` **Form**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `Field` | `FC`<`ConfiguredProps`<`FC`<`PropsWithChildren`<`FieldProps`\>\>, `Partial`<`FieldProps` & { `children?`: `ReactNode`  }\>\>\> |
| `PasswordField` | <TFormValues\>(`__namedParameters`: `PasswordFieldProps`<`TFormValues`\>) => `ReactElement`<`any`, `string` \| `JSXElementConstructor`<`any`\>\> |
| `TextField` | <TFormValues\>(`__namedParameters`: `TextFieldProps`<`TFormValues`\>) => `ReactElement`<`any`, `string` \| `JSXElementConstructor`<`any`\>\> |

#### Defined in

[src/components/index.ts:10](https://bitbucket.org/appello/mobile-ui-kit/src/47fcedc/src/components/index.ts#lines-10)

## Functions

### AppText

▸ **AppText**(`props`, `context?`): ``null`` \| `ReactElement`<`any`, `any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `ConfiguredProps`<`FC`<`AppTextProps`\>, `Partial`<`AppTextProps`\>\> |
| `context?` | `any` |

#### Returns

``null`` \| `ReactElement`<`any`, `any`\>

#### Defined in

node_modules/@types/react/index.d.ts:521

___

### Button

▸ **Button**(`props`, `context?`): ``null`` \| `ReactElement`<`any`, `any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `ConfiguredProps`<`FC`<`PropsWithChildren`<`ButtonProps`\>\>, `Partial`<`ButtonProps` & { `children?`: `ReactNode`  }\>\> |
| `context?` | `any` |

#### Returns

``null`` \| `ReactElement`<`any`, `any`\>

#### Defined in

node_modules/@types/react/index.d.ts:521

___

### TextInput

▸ **TextInput**(`props`, `context?`): ``null`` \| `ReactElement`<`any`, `any`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | `ConfiguredProps`<`FC`<`WithGetStyleByState`<`Props`, [``"error"``, ``"focused"``, ``"disabled"``, ``"multiline"``]\>\>, `Partial`<`Props` & { `getStyleByState?`: `GetStyleByState`<`Props`, [``"error"``, ``"focused"``, ``"disabled"``, ``"multiline"``]\>  }\>\> |
| `context?` | `any` |

#### Returns

``null`` \| `ReactElement`<`any`, `any`\>

#### Defined in

node_modules/@types/react/index.d.ts:521
