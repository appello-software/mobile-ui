import { CenterView } from '../../components/CenterView';
import React from 'react';

export const parameters = {
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  (Story: React.FC) => {
    return (
      <CenterView>
        <Story />
      </CenterView>
    );
  },
];
