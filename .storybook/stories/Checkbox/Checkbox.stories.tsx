import { Checkbox, CheckboxProps } from '../../../src';
import type { Meta, StoryObj } from '@storybook/react-native';
import React, { useState } from 'react';
import CheckIcon from '../../assets/icons/unicons/approve-tick-checkmark.svg';

const meta = {
  title: 'Basic/Checkbox',
  component: Checkbox,
  render: (args) => {
    const [value, setValue] = useState(args.checked ?? false);

    return (
      <Checkbox {...args} checked={value} onChange={setValue} />
    );
  },
  args: {
    checkIconEl: <CheckIcon color="#fff" />,
  },
} satisfies Meta<CheckboxProps>;

type Story = StoryObj<CheckboxProps>;

export const DefaultStory: Story = {};

export const Rounded: Story = {
  args: {
    rounded: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    checked: true,
  },
};

export const WithLabel: Story = {
  args: {
    label: 'I agree with the terms and conditions',
  },
};

export default meta;
