const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const path = require('path');

module.exports = {
  framework: '@storybook/react-webpack5',
  stories: [
    '../../stories/**/*.stories.mdx',
    '../../stories/**/*.stories.@(js|jsx|ts|tsx)',
    '../../docs/**/*.mdx',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    {
      name: '@storybook/addon-react-native-web',
      options: {
        modulesToTranspile: [
          'react-native-reanimated',
          '@gorhom/bottom-sheet',
          'react-native-wheely',
        ],
        babelPlugins: [
          '@babel/plugin-proposal-export-namespace-from',
          'react-native-reanimated/plugin',
        ],
      },
    },
  ],
  docs: {
    autodocs: true,
  },
  webpackFinal: config => {
    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve?.alias,
        '@appello/mobile-ui': path.resolve(__dirname, '../../../src'),
      },
    };

    const fileLoaderRule = config.module.rules.find(rule => rule.test.test('.svg'));
    fileLoaderRule.exclude = /\.svg$/;
    config.module.rules.push({
      test: /\.svg$/,
      exclude: /node_modules/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            svgoConfig: {
              plugins: [
                {
                  name: 'convertColors',
                  params: {
                    currentColor: true,
                  },
                },
              ],
            },
          },
        },
      ],
    });
    config.plugins.push(new NodePolyfillPlugin());
    return config;
  },
};
