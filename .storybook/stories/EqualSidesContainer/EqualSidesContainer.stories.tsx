import { AppText, EqualSidesContainer, EqualSidesContainerProps } from '@appello/mobile-ui';
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

const meta = {
  title: 'Basic/EqualSidesContainer',
  component: EqualSidesContainer,
  args: {
    children: <AppText variant="h3">DD</AppText>,
    bgColor: '#FDD835',
    size: 100,
  },
  argTypes: {
    bgColor: {
      control: 'color',
    },
    children: {
      control: false,
    },
    borderRadius: {
      control: 'number',
    },
  },
} satisfies Meta<EqualSidesContainerProps>;

type Story = StoryObj<EqualSidesContainerProps>;

export const DefaultStory: Story = {};

export default meta;
