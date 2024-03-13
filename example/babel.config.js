const path = require('path');
const pak = require('../package.json');

module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          // For development, we want to alias the library to the source
          [`${pak.name}/.storybook`]: path.join(__dirname, '..', '.storybook'),
          [`${pak.name}/icons`]: path.join(__dirname, '..', 'icons'),
          [pak.name]: path.join(__dirname, '..', pak.source),
          "~": path.join(__dirname, '..', pak.source),
        },
      },
    ],
    // this plugin should be last
    'react-native-reanimated/plugin',
  ],
  env: {
    production: {
      plugins: ['transform-remove-console'],
    },
  },
};
