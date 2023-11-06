import type { Meta, StoryObj } from '@storybook/react-native';
import React from 'react';

import { Radio, RadioProps } from '../../../src';
import { CONFIG_CATEGORY, CONFIG_DETAIL } from '../../constants';

const meta = {
  title: 'Basic/Radio',
  component: Radio,
  render: ({ active, ...restProps }) => {
    return <Radio {...restProps} activeId={active ? restProps.id : null} />;
  },
  args: {
    id: 1,
    disabled: false,
    active: false,
  },
  argTypes: {
    activeId: {
      control: false,
    },
    activeColor: {
      table: {
        category: CONFIG_CATEGORY,
        defaultValue: {
          summary: 'theme.colors.primary',
          detail: CONFIG_DETAIL,
        },
      },
    },
    size: {
      table: {
        category: CONFIG_CATEGORY,
        defaultValue: {
          summary: 24,
          detail: CONFIG_DETAIL,
        },
      },
    },
  },
} satisfies Meta<RadioProps & { active: boolean }>;

type Story = StoryObj<RadioProps>;

export const DefaultStory: Story = {};

export default meta;
