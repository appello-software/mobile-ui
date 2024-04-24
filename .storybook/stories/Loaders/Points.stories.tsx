import {
  ANIMATION_DURATION,
  DEFAULT_SIZE,
  Points,
  PointsProps,
} from '@appello/mobile-ui/components/common/Loaders/Points';
import { Meta, StoryObj } from '@storybook/react';

import { CONFIG_CATEGORY, CONFIG_DETAIL } from '../../constants';

const meta: Meta<PointsProps> = {
  title: 'Basic/Loaders/Points',
  component: Points,
  argTypes: {
    size: {
      table: {
        category: CONFIG_CATEGORY,
        defaultValue: {
          summary: DEFAULT_SIZE,
        },
      },
    },
    duration: {
      table: {
        category: CONFIG_CATEGORY,
        defaultValue: {
          summary: ANIMATION_DURATION,
        },
      },
    },
    color: {
      table: {
        category: CONFIG_CATEGORY,
        defaultValue: {
          summary: 'theme.colors.primary',
          detail: CONFIG_DETAIL,
        },
      },
    },
  },
  args: {
    size: DEFAULT_SIZE,
    duration: ANIMATION_DURATION,
  },
};

type Story = StoryObj<typeof Points>;

export const DefaultStory: Story = {};

export default meta;
