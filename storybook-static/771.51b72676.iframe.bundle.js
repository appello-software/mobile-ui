(self.webpackChunk_appello_mobile_ui=self.webpackChunk_appello_mobile_ui||[]).push([[771],{"./node_modules/@appello/common/lib/hooks/index.js":(__unused_webpack_module,exports,__webpack_require__)=>{"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.useUpdateEffect=exports.useSwitchValue=exports.useMountEffect=exports.useInterval=exports.useFirstMountState=void 0;var useFirstMountState_1=__webpack_require__("./node_modules/@appello/common/lib/hooks/useFirstMountState.js");Object.defineProperty(exports,"useFirstMountState",{enumerable:!0,get:function(){return useFirstMountState_1.useFirstMountState}});var useInterval_1=__webpack_require__("./node_modules/@appello/common/lib/hooks/useInterval.js");Object.defineProperty(exports,"useInterval",{enumerable:!0,get:function(){return useInterval_1.useInterval}});var useMountEffect_1=__webpack_require__("./node_modules/@appello/common/lib/hooks/useMountEffect.js");Object.defineProperty(exports,"useMountEffect",{enumerable:!0,get:function(){return useMountEffect_1.useMountEffect}});var useSwitchValue_1=__webpack_require__("./node_modules/@appello/common/lib/hooks/useSwitchValue.js");Object.defineProperty(exports,"useSwitchValue",{enumerable:!0,get:function(){return useSwitchValue_1.useSwitchValue}});var useUpdateEffect_1=__webpack_require__("./node_modules/@appello/common/lib/hooks/useUpdateEffect.js");Object.defineProperty(exports,"useUpdateEffect",{enumerable:!0,get:function(){return useUpdateEffect_1.useUpdateEffect}})},"./node_modules/@appello/common/lib/hooks/useFirstMountState.js":(__unused_webpack_module,exports,__webpack_require__)=>{"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.useFirstMountState=void 0;const react_1=__webpack_require__("./node_modules/react/index.js");exports.useFirstMountState=function useFirstMountState(){const isFirst=(0,react_1.useRef)(!0);return isFirst.current?(isFirst.current=!1,!0):isFirst.current}},"./node_modules/@appello/common/lib/hooks/useInterval.js":(__unused_webpack_module,exports,__webpack_require__)=>{"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.useInterval=void 0;const react_1=__webpack_require__("./node_modules/react/index.js");exports.useInterval=function useInterval(callback,delay){const savedCallback=(0,react_1.useRef)((()=>{}));(0,react_1.useEffect)((()=>{savedCallback.current=callback})),(0,react_1.useEffect)((()=>{if(null!==delay){const interval=setInterval((()=>savedCallback.current()),delay||0);return()=>clearInterval(interval)}}),[delay])}},"./node_modules/@appello/common/lib/hooks/useMountEffect.js":(__unused_webpack_module,exports,__webpack_require__)=>{"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.useMountEffect=void 0;const react_1=__webpack_require__("./node_modules/react/index.js");exports.useMountEffect=function useMountEffect(effect){(0,react_1.useEffect)(effect,[])}},"./node_modules/@appello/common/lib/hooks/useSwitchValue.js":(__unused_webpack_module,exports,__webpack_require__)=>{"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.useSwitchValue=void 0;const react_1=__webpack_require__("./node_modules/react/index.js");exports.useSwitchValue=function useSwitchValue(initial){const[value,setValue]=(0,react_1.useState)(initial),on=(0,react_1.useCallback)((()=>{setValue(!0)}),[]),off=(0,react_1.useCallback)((()=>{setValue(!1)}),[]),toggle=(0,react_1.useCallback)((()=>{setValue((prevValue=>!prevValue))}),[]);return(0,react_1.useMemo)((()=>({value,on,off,toggle,set:setValue})),[off,on,toggle,value])}},"./node_modules/@appello/common/lib/hooks/useUpdateEffect.js":(__unused_webpack_module,exports,__webpack_require__)=>{"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.useUpdateEffect=void 0;const react_1=__webpack_require__("./node_modules/react/index.js"),useFirstMountState_1=__webpack_require__("./node_modules/@appello/common/lib/hooks/useFirstMountState.js");exports.useUpdateEffect=function useUpdateEffect(effect,deps){const isFirstMount=(0,useFirstMountState_1.useFirstMountState)();(0,react_1.useEffect)((()=>{if(!isFirstMount)return effect()}),deps)}},"./.storybook/assets/icons/unicons/close.svg":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{default:()=>__WEBPACK_DEFAULT_EXPORT__});var _path,react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");function _extends(){return _extends=Object.assign?Object.assign.bind():function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source)Object.prototype.hasOwnProperty.call(source,key)&&(target[key]=source[key])}return target},_extends.apply(this,arguments)}const __WEBPACK_DEFAULT_EXPORT__=function SvgClose(props){return react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg",_extends({width:24,height:24,viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg"},props),_path||(_path=react__WEBPACK_IMPORTED_MODULE_0__.createElement("path",{d:"M13.4099 12L19.7099 5.71C19.8982 5.5217 20.004 5.2663 20.004 5C20.004 4.7337 19.8982 4.47831 19.7099 4.29C19.5216 4.1017 19.2662 3.99591 18.9999 3.99591C18.7336 3.99591 18.4782 4.1017 18.2899 4.29L11.9999 10.59L5.70994 4.29C5.52164 4.1017 5.26624 3.99591 4.99994 3.99591C4.73364 3.99591 4.47824 4.1017 4.28994 4.29C4.10164 4.47831 3.99585 4.7337 3.99585 5C3.99585 5.2663 4.10164 5.5217 4.28994 5.71L10.5899 12L4.28994 18.29C4.19621 18.383 4.12182 18.4936 4.07105 18.6154C4.02028 18.7373 3.99414 18.868 3.99414 19C3.99414 19.132 4.02028 19.2627 4.07105 19.3846C4.12182 19.5064 4.19621 19.617 4.28994 19.71C4.3829 19.8037 4.4935 19.8781 4.61536 19.9289C4.73722 19.9797 4.86793 20.0058 4.99994 20.0058C5.13195 20.0058 5.26266 19.9797 5.38452 19.9289C5.50638 19.8781 5.61698 19.8037 5.70994 19.71L11.9999 13.41L18.2899 19.71C18.3829 19.8037 18.4935 19.8781 18.6154 19.9289C18.7372 19.9797 18.8679 20.0058 18.9999 20.0058C19.132 20.0058 19.2627 19.9797 19.3845 19.9289C19.5064 19.8781 19.617 19.8037 19.7099 19.71C19.8037 19.617 19.8781 19.5064 19.9288 19.3846C19.9796 19.2627 20.0057 19.132 20.0057 19C20.0057 18.868 19.9796 18.7373 19.9288 18.6154C19.8781 18.4936 19.8037 18.383 19.7099 18.29L13.4099 12Z",fill:"currentColor"})))}},"./.storybook/assets/icons/unicons/eye.svg":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{default:()=>__WEBPACK_DEFAULT_EXPORT__});var _path,react__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("./node_modules/react/index.js");function _extends(){return _extends=Object.assign?Object.assign.bind():function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source)Object.prototype.hasOwnProperty.call(source,key)&&(target[key]=source[key])}return target},_extends.apply(this,arguments)}const __WEBPACK_DEFAULT_EXPORT__=function SvgEye(props){return react__WEBPACK_IMPORTED_MODULE_0__.createElement("svg",_extends({width:24,height:24,viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg"},props),_path||(_path=react__WEBPACK_IMPORTED_MODULE_0__.createElement("path",{d:"M21.9196 11.6C19.8996 6.91 16.0996 4 11.9996 4C7.89958 4 4.09958 6.91 2.07958 11.6C2.02452 11.7262 1.99609 11.8623 1.99609 12C1.99609 12.1377 2.02452 12.2738 2.07958 12.4C4.09958 17.09 7.89958 20 11.9996 20C16.0996 20 19.8996 17.09 21.9196 12.4C21.9746 12.2738 22.0031 12.1377 22.0031 12C22.0031 11.8623 21.9746 11.7262 21.9196 11.6ZM11.9996 18C8.82958 18 5.82958 15.71 4.09958 12C5.82958 8.29 8.82958 6 11.9996 6C15.1696 6 18.1696 8.29 19.8996 12C18.1696 15.71 15.1696 18 11.9996 18ZM11.9996 8C11.2085 8 10.4351 8.2346 9.7773 8.67412C9.1195 9.11365 8.60681 9.73836 8.30406 10.4693C8.00131 11.2002 7.9221 12.0044 8.07644 12.7804C8.23078 13.5563 8.61174 14.269 9.17115 14.8284C9.73056 15.3878 10.4433 15.7688 11.2192 15.9231C11.9951 16.0775 12.7994 15.9983 13.5303 15.6955C14.2612 15.3928 14.8859 14.8801 15.3255 14.2223C15.765 13.5645 15.9996 12.7911 15.9996 12C15.9996 10.9391 15.5782 9.92172 14.828 9.17157C14.0779 8.42143 13.0604 8 11.9996 8ZM11.9996 14C11.604 14 11.2173 13.8827 10.8884 13.6629C10.5595 13.4432 10.3032 13.1308 10.1518 12.7654C10.0004 12.3999 9.96084 11.9978 10.038 11.6098C10.1152 11.2219 10.3057 10.8655 10.5854 10.5858C10.8651 10.3061 11.2214 10.1156 11.6094 10.0384C11.9974 9.96126 12.3995 10.0009 12.7649 10.1522C13.1304 10.3036 13.4428 10.56 13.6625 10.8889C13.8823 11.2178 13.9996 11.6044 13.9996 12C13.9996 12.5304 13.7889 13.0391 13.4138 13.4142C13.0387 13.7893 12.53 14 11.9996 14Z",fill:"currentColor"})))}},"./.storybook/stories/PasswordField/PasswordField.stories.tsx":(__unused_webpack_module,exports,__webpack_require__)=>{var _interopRequireDefault=__webpack_require__("./node_modules/@babel/runtime/helpers/interopRequireDefault.js");Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=exports.DefaultStory=void 0;var _DefaultStory$paramet,_DefaultStory$paramet2,_DefaultStory$paramet3,_react=_interopRequireDefault(__webpack_require__("./node_modules/react/index.js")),_constants=__webpack_require__("./.storybook/constants.ts"),_eye=_interopRequireDefault(__webpack_require__("./.storybook/assets/icons/unicons/eye.svg")),_close=_interopRequireDefault(__webpack_require__("./.storybook/assets/icons/unicons/close.svg")),_reactHookForm=__webpack_require__("./node_modules/react-hook-form/dist/index.cjs.js"),_PasswordField=__webpack_require__("./src/components/form/PasswordField/index.tsx"),_jsxRuntime=__webpack_require__("./node_modules/react/jsx-runtime.js"),meta={title:"Forms/PasswordField",component:_PasswordField.PasswordField,render:function render(props){var form=(0,_reactHookForm.useForm)();(0,_jsxRuntime.jsx)(_eye.default,{width:20,height:20});return(0,_jsxRuntime.jsx)(_PasswordField.PasswordField,Object.assign({},props,{control:form.control,name:"password",togglePasswordVisibilityIcons:_react.default.useMemo((function(){return{show:_eye.default,hide:_close.default}}),[])}))},argTypes:{togglePasswordVisibilityIcons:{control:!1,table:{category:_constants.CONFIG_CATEGORY}},error:{control:!1,table:{category:_constants.EXTENDED_CATEGORY}},disabled:{control:!1,table:{category:_constants.EXTENDED_CATEGORY}},onPress:{control:!1,table:{category:_constants.EXTENDED_CATEGORY}},accessoryRight:{control:!1,table:{category:_constants.EXTENDED_CATEGORY}},Icon:{control:!1,table:{category:_constants.EXTENDED_CATEGORY}},iconSize:{control:!1,table:{category:_constants.EXTENDED_CATEGORY}},mask:{control:!1,table:{category:_constants.EXTENDED_CATEGORY}},placeholderFillCharacter:{control:!1,table:{category:_constants.EXTENDED_CATEGORY}}},args:{label:"Password Field"}},DefaultStory={};exports.DefaultStory=DefaultStory;var _default=meta;exports.default=_default,DefaultStory.parameters=Object.assign({},DefaultStory.parameters,{docs:Object.assign({},null==(_DefaultStory$paramet=DefaultStory.parameters)?void 0:_DefaultStory$paramet.docs,{source:Object.assign({originalSource:"{}"},null==(_DefaultStory$paramet2=DefaultStory.parameters)||null==(_DefaultStory$paramet3=_DefaultStory$paramet2.docs)?void 0:_DefaultStory$paramet3.source)})});try{Meta.displayName="Meta",Meta.__docgenInfo={description:"Metadata to configure the stories for a component.",displayName:"Meta",props:{}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES[".storybook/stories/PasswordField/PasswordField.stories.tsx#Meta"]={docgenInfo:Meta.__docgenInfo,name:"Meta",path:".storybook/stories/PasswordField/PasswordField.stories.tsx#Meta"})}catch(__react_docgen_typescript_loader_error){}},"./src/components/form/PasswordField/index.tsx":(__unused_webpack_module,exports,__webpack_require__)=>{var _interopRequireDefault=__webpack_require__("./node_modules/@babel/runtime/helpers/interopRequireDefault.js");Object.defineProperty(exports,"__esModule",{value:!0}),exports.PasswordField=void 0;var _objectWithoutProperties2=_interopRequireDefault(__webpack_require__("./node_modules/@babel/runtime/helpers/objectWithoutProperties.js")),_hooks=__webpack_require__("./node_modules/@appello/common/lib/hooks/index.js"),_react=_interopRequireDefault(__webpack_require__("./node_modules/react/index.js")),_TouchableOpacity=_interopRequireDefault(__webpack_require__("./node_modules/react-native-web/dist/exports/TouchableOpacity/index.js")),_TextField=__webpack_require__("./src/components/form/TextField/index.tsx"),_jsxRuntime=__webpack_require__("./node_modules/react/jsx-runtime.js"),_excluded=["togglePasswordVisibilityIcons"],PasswordField=function PasswordField(props){var _useSwitchValue=(0,_hooks.useSwitchValue)(!1),isPasswordVisible=_useSwitchValue.value,togglePasswordVisibility=_useSwitchValue.toggle,togglePasswordVisibilityIcons=props.togglePasswordVisibilityIcons,textFieldProps=(0,_objectWithoutProperties2.default)(props,_excluded),renderAccessoryRight=_react.default.useMemo((function(){var Icon=isPasswordVisible?null==togglePasswordVisibilityIcons?void 0:togglePasswordVisibilityIcons.hide:null==togglePasswordVisibilityIcons?void 0:togglePasswordVisibilityIcons.show;return Icon?(0,_jsxRuntime.jsx)(_TouchableOpacity.default,{onPress:togglePasswordVisibility,style:{marginRight:18},children:(0,_jsxRuntime.jsx)(Icon,{})}):null}),[togglePasswordVisibilityIcons,togglePasswordVisibility,isPasswordVisible]);return(0,_jsxRuntime.jsx)(_TextField.TextField,Object.assign({},textFieldProps,{autoComplete:"password",autoCapitalize:"none",secureTextEntry:!isPasswordVisible,accessoryRight:renderAccessoryRight}))};exports.PasswordField=PasswordField;try{PasswordField.displayName="PasswordField",PasswordField.__docgenInfo={description:"Password field with functionality to show and hide the password value.<br>\nExtends the UIKit TextField and all of its props.<br>",displayName:"PasswordField",props:{togglePasswordVisibilityIcons:{defaultValue:null,description:"",name:"togglePasswordVisibilityIcons",required:!1,type:{name:"{ show: FC<SvgProps>; hide: FC<SvgProps>; }"}},name:{defaultValue:null,description:"",name:"name",required:!0,type:{name:"string"}},control:{defaultValue:null,description:"",name:"control",required:!0,type:{name:"Control<TFormValues, any>"}},label:{defaultValue:null,description:"",name:"label",required:!1,type:{name:"string"}},style:{defaultValue:null,description:"",name:"style",required:!1,type:{name:"StyleProp<ViewStyle>"}},mask:{defaultValue:null,description:"Mask to display text in specific format ([check the documentation here](https://github.com/CaioQuirinoMedeiros/react-native-mask-input#mask))",name:"mask",required:!1,type:{name:"Mask"}},error:{defaultValue:null,description:"Should TextInput have an error state",name:"error",required:!1,type:{name:"boolean"}},disabled:{defaultValue:null,description:"Should TextInput be disabled",name:"disabled",required:!1,type:{name:"boolean"}},onPress:{defaultValue:null,description:"Callback that is called after a touch. If set, TextInput is not editable",name:"onPress",required:!1,type:{name:"(() => void)"}},accessoryRight:{defaultValue:null,description:"ReactNode to display on the right of the TextInput",name:"accessoryRight",required:!1,type:{name:"ReactNode"}},Icon:{defaultValue:null,description:"Icon component to display on the left of the TextInput",name:"Icon",required:!1,type:{name:"FC<SvgProps>"}},iconSize:{defaultValue:null,description:"Size of the Icon component",name:"iconSize",required:!1,type:{name:"{ width: number; height: number; }"}},placeholderFillCharacter:{defaultValue:null,description:'Character to be used as the "fill character" on the default placeholder value when using mask.',name:"placeholderFillCharacter",required:!1,type:{name:"string"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/form/PasswordField/index.tsx#PasswordField"]={docgenInfo:PasswordField.__docgenInfo,name:"PasswordField",path:"src/components/form/PasswordField/index.tsx#PasswordField"})}catch(__react_docgen_typescript_loader_error){}}}]);