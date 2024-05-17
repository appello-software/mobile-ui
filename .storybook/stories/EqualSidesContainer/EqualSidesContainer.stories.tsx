import { Label, LabelProps } from '@appello/mobile-ui';
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { CONFIG_CATEGORY } from '../../constants';

const meta = {
  title: 'Basic/Label',
  component: Label,
  render: ({ ...restProps }) => {
    return <Label {...restProps} />;
  },
  args: {
    children: 'Label',
    bgColor: '#1C88EC',
    textColor: '#fff',
  },
  argTypes: {
    textProps: {
      table: {
        category: CONFIG_CATEGORY,
      },
    },
  },
} satisfies Meta<LabelProps>;

type Story = StoryObj<LabelProps>;

export const DefaultStory: Story = {};

export default meta;
