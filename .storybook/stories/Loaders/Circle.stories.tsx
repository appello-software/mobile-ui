import { Circle, CircleProps } from '@appello/mobile-ui';
import { Meta, StoryObj } from '@storybook/react';

import { CONFIG_CATEGORY } from '../../constants';

const meta: Meta<CircleProps> = {
  title: 'Basic/Loaders/Circle',
  component: Circle,
  argTypes: {
    size: {
      table: {
        category: CONFIG_CATEGORY,
      },
    },
    duration: {
      table: {
        category: CONFIG_CATEGORY,
      },
    },
    color: {
      control: 'color',
      table: {
        category: CONFIG_CATEGORY,
      },
    },
    colorBack: {
      control: 'color',
      table: {
        category: CONFIG_CATEGORY,
      },
    },
  },
};

type Story = StoryObj<typeof Circle>;

export const DefaultStory: Story = {};

export default meta;
