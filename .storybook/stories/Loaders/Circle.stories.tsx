import {
  ANIMATION_DURATION,
  Circle,
  CircleProps,
  DEFAULT_SIZE,
} from '@appello/mobile-ui/components/common/Loaders/Circle';
import { Meta, StoryObj } from '@storybook/react';

import { CONFIG_CATEGORY, CONFIG_DETAIL } from '../../constants';

const meta: Meta<CircleProps> = {
  title: 'Basic/Loaders/Circle',
  component: Circle,
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
      control: 'color',
      table: {
        defaultValue: {
          summary: 'theme.colors.primary',
          detail: CONFIG_DETAIL,
        },
      },
    },
    colorBack: {
      control: 'color',
      table: {
        defaultValue: {
          summary: "theme.colors.gray['4']",
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

type Story = StoryObj<typeof Circle>;

export const DefaultStory: Story = {};

export default meta;
