import { Meta, StoryObj } from '@storybook/react-native';

import { colors } from '~/__defaults__/defaultTheme';
import { ANIMATION_DURATION, DEFAULT_SIZE } from '~/components/common/Loaders/Points';

import { Points, PointsProps } from '../../../src';
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
    color: colors.primary,
  },
};

type Story = StoryObj<typeof Points>;

export const DefaultStory: Story = {};

export default meta;
