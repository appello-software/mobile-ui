import { Points, PointsProps } from '@appello/mobile-ui';
import { Meta, StoryObj } from '@storybook/react';

import { CONFIG_CATEGORY } from '../../constants';

const meta: Meta<PointsProps> = {
  title: 'Basic/Loaders/Points',
  component: Points,
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
      table: {
        category: CONFIG_CATEGORY,
      },
    },
  },
};

type Story = StoryObj<typeof Points>;

export const DefaultStory: Story = {};

export default meta;
