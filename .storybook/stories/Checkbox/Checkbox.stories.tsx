import type { Meta, StoryObj } from '@storybook/react-native';
import React, { useState } from 'react';

import { CheckmarkIcon } from '../../../icons';
import { Checkbox, CheckboxProps } from '../../../src';
import { CONFIG_CATEGORY, CONFIG_DETAIL } from '../../constants';

const meta = {
  title: 'Basic/Checkbox',
  component: Checkbox,
  render: args => {
    const [value, setValue] = useState(args.checked ?? false);

    return <Checkbox {...args} checked={value} onChange={setValue} />;
  },
  args: {
    checkIcon: CheckmarkIcon,
    checked: false,
    disabled: false,
    rounded: false,
  },
  argTypes: {
    checkIcon: {
      control: false,
      table: {
        category: CONFIG_CATEGORY,
      },
    },
    activeColor: {
      table: {
        category: CONFIG_CATEGORY,
        defaultValue: {
          summary: 'theme.colors.success',
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
} satisfies Meta<CheckboxProps>;

type Story = StoryObj<CheckboxProps>;

export const DefaultStory: Story = {};

export default meta;
