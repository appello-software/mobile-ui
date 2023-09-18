import { AppText, AppTextProps, Button } from '../../../src';
import { Meta, StoryObj } from '@storybook/react-native';
import React from 'react';

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
  component: AppText,
  argTypes: {
    variant: {
      options: Object.values(AppTextVariant),
      control: { type: 'select' },
      table: {
        defaultValue: {
          summary: 'p3',
          detail: 'Set it up in the component config'
        }
      }
    },
    color: {
      table: {
        defaultValue: {
          summary: 'none',
          detail: 'Set it up in the component config'
        }
      }
    },
    uppercase: {
      table: {
        defaultValue: {
          summary: false,
        }
      }
    },
    underline: {
      table: {
        defaultValue: {
          summary: false,
        }
      }
    },
    weight: {
      table: {
        defaultValue: {
          summary: 'none',
          detail: 'Set it up in the component config'
        }
      }
    },
  },
  args: {
    children: 'AppText',
  },
};

type Story = StoryObj<AppTextProps>;

export const DefaultStory: Story = {};

export default meta;
