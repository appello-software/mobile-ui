import { Checkbox, CheckboxProps } from '@appello/mobile-ui';
import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

import { CONFIG_CATEGORY } from '../../constants';

const meta = {
  title: 'Basic/Checkbox',
  component: Checkbox,
  render: args => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = useState(args.checked ?? false);

    return <Checkbox {...args} checked={value} onChange={setValue} />;
  },
  args: {
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
      },
    },
    size: {
      table: {
        category: CONFIG_CATEGORY,
      },
    },
  },
} satisfies Meta<CheckboxProps>;

type Story = StoryObj<CheckboxProps>;

export const DefaultStory: Story = {};

export default meta;
