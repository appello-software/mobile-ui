import { Label, LabelProps } from '@appello/mobile-ui';
import ChatIcon from '@appello/mobile-ui/icons/unicons/chat.svg';
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { CONFIG_CATEGORY } from '../../constants';

const meta = {
  title: 'Basic/Label',
  component: Label,
  render: ({ icon, ...restProps }) => {
    return <Label icon={icon ? ChatIcon : undefined} {...restProps} />;
  },
  args: {
    children: 'Label',
    bgColor: '#1C88EC',
    textColor: '#fff',
    iconSize: {
      width: 16,
      height: 16,
    },
  },
  argTypes: {
    textProps: {
      table: {
        category: CONFIG_CATEGORY,
      },
    },
    iconSize: {
      table: {
        category: CONFIG_CATEGORY,
      },
    },
    icon: {
      control: 'boolean',
    },
  },
} satisfies Meta<LabelProps>;

type Story = StoryObj<LabelProps>;

export const DefaultStory: Story = {};

export default meta;
