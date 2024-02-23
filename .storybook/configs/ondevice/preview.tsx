import type { Preview } from '@storybook/react';
import React from 'react';

import { CenterView } from '../../components/CenterView';

const parameters: Preview['parameters'] = {
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

const decorators: Preview['decorators'] = [
  (Story: React.FC) => {
    return (
      <CenterView>
        <Story />
      </CenterView>
    );
  },
];

const preview: Preview = {
  decorators,
  parameters,
};

export default preview;
