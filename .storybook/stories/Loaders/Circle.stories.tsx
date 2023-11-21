import { Meta, StoryObj } from '@storybook/react-native';
import React from 'react';

import { Circle, CircleProps } from '../../../src';
import { CONFIG_CATEGORY } from '../../constants';

const meta: Meta<CircleProps> = {
  title: 'Basic/Circle',
  component: Circle,
  render: ({ ...args }) => {
    return <Circle {...args} />;
  },
  argTypes: {
    duration: {
      table: {
        category: CONFIG_CATEGORY,
      },
    },
    size: {
      table: {
        category: CONFIG_CATEGORY,
      },
    },
  },
  args: {
    size: 40,
  },
};

type Story = StoryObj<typeof Circle>;

export const DefaultStory: Story = {};

export default meta;
