import { CenterView } from '../../components/CenterView';
import { JSX } from 'react';

export const parameters = {
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  (Story: JSX.ElementType) => {
    console.log(Story);
    return (
      <CenterView>
        <Story />
      </CenterView>
    );
  },
];
