import { Meta, StoryObj } from '@storybook/react';

import { colors } from '~/__defaults__/defaultTheme';
import { ANIMATION_DURATION, DEFAULT_SIZE, Circle, CircleProps } from '@appello/mobile-ui/components/common/Loaders/Circle';

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
    color: colors.primary,
    colorBack: colors.gray['4'],
  },
};

type Story = StoryObj<typeof Circle>;

export const DefaultStory: Story = {};

export default meta;
