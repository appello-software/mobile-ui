const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

module.exports = {
  framework: '@storybook/react-webpack5',
  stories: ['../../stories/**/*.stories.mdx', '../../stories/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-react-native-web',
  ],
  docs: {
    autodocs: true,
  },
  webpackFinal: config => {
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
          }

        },
      ],
    });
    config.plugins.push(
      new NodePolyfillPlugin()
    )
    return config;
  },
};
