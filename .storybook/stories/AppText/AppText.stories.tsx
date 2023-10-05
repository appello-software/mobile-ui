import { AppText, AppTextProps, Button } from '../../../src';
import { Meta, StoryObj } from '@storybook/react-native';
import { CONFIG_DETAIL } from '../../constants';

enum AppTextVariant {
  H1 = 'h1',
  H2 = 'h2',
  H3 = 'h3',
  H4 = 'h4',
  H5 = 'h5',
  H6 = 'h6',
  P1 = 'p1',
  P2 = 'p2',
  P3 = 'p3',
  P4 = 'p4',
  P5 = 'p5',
  P6 = 'p6',
}

const meta: Meta<AppTextProps> = {
  title: 'Basic/AppText',
  component: AppText,
  argTypes: {
    variant: {
      options: Object.values(AppTextVariant),
      control: { type: 'select' },
      table: {
        defaultValue: {
          summary: 'p3',
          detail: CONFIG_DETAIL,
        },
      },
    },
    color: {
      table: {
        defaultValue: {
          summary: '-',
          detail: CONFIG_DETAIL,
        },
      },
    },
    weight: {
      table: {
        defaultValue: {
          summary: '-',
          detail: CONFIG_DETAIL,
        },
      },
    },
  },
  args: {
    children: 'AppText',
  },
};

type Story = StoryObj<AppTextProps>;

export const DefaultStory: Story = {};

export default meta;
