const path = require('path');
const escape = require('escape-string-regexp');
const exclusionList = require('metro-config/src/defaults/exclusionList');
const pak = require('../package.json');

const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const { resolver: defaultResolver } = getDefaultConfig(__dirname);

const root = path.resolve(__dirname, '..');
const modules = Object.keys({ ...pak.peerDependencies });
/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
module.exports = function (baseConfig) {
  const defaultConfig = mergeConfig(baseConfig, getDefaultConfig(__dirname));
  const {
    resolver: { assetExts, sourceExts },
  } = defaultConfig;

  return mergeConfig(defaultConfig, {
    watchFolders: [root],

    transformer: {
      babelTransformerPath: require.resolve('react-native-svg-transformer'),
      unstable_allowRequireContext: true,
    },

    resolver: {
      assetExts: assetExts.filter(ext => ext !== 'svg'),
      sourceExts: [...sourceExts, 'cjs', 'svg'],
      resolverMainFields: ['sbmodern', 'react-native', 'browser', 'main'],

      // We need to make sure that only one version is loaded for peerDependencies
      // So we block them at the root, and alias them to the versions in example's node_modules
      blacklistRE: exclusionList(
        modules.map(
          (m) =>
            new RegExp(`^${escape(path.join(root, 'node_modules', m))}\\/.*$`)
        )
      ),

      extraNodeModules: modules.reduce((acc, name) => {
        acc[name] = path.join(__dirname, 'node_modules', name);
        return acc;
      }, {}),

      unstable_enableSymlinks: true,
    },
  });
};
