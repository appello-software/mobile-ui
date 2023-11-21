import { Meta, StoryObj } from '@storybook/react-native';
import React from 'react';

import { Points, PointsProps } from '../../../src';
import { CONFIG_CATEGORY } from '../../constants';

const meta: Meta<PointsProps> = {
  title: 'Basic/Points',
  component: Points,
  render: ({ ...args }) => {
    return <Points {...args} />;
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
    color: {
      table: {
        category: CONFIG_CATEGORY,
      },
    },
  },
  args: {
    size: 20,
    color: '#000',
  },
};

type Story = StoryObj<typeof Points>;

export const DefaultStory: Story = {};

export default meta;
