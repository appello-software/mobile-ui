import { Button, ButtonProps } from '../../../src';
import { Meta, StoryObj } from '@storybook/react-native';
import React from 'react';

import ChatIcon from '../../assets/icons/unicons/chat.svg';
import { CONFIG_CATEGORY, CONFIG_DETAIL } from '../../constants';

const meta: Meta<ButtonProps & { Icon: boolean }> = {
  title: 'Basic/Button',
  component: Button,
  render: ({ Icon, children, ...args }) => {
    return (
      <Button Icon={(Icon as boolean) ? ChatIcon : undefined} {...(args as ButtonProps)}>
        {children as any}
      </Button>
    );
  },
  argTypes: {
    labelProps: {
      table: {
        category: CONFIG_CATEGORY,
        defaultValue: {
          summary: JSON.stringify({ variant: 'p3' }),
        },
      },
    },
    loaderColor: {
      table: {
        category: CONFIG_CATEGORY,
      },
    },
    variant: {
      table: {
        defaultValue: {
          summary: 'primary',
        },
      },
    },
    pressedOverlayColor: {
      table: {
        category: CONFIG_CATEGORY,
      },
    },
    backgroundGradient: {
      table: {
        category: CONFIG_CATEGORY,
      },
    },
    Icon: {
      control: {
        type: 'boolean',
      },
    },
    iconSize: {
      table: {
        category: CONFIG_CATEGORY,
        defaultValue: {
          summary: JSON.stringify({ width: 20, height: 20 }),
        },
      },
    },
    iconPosition: {
      table: {
        defaultValue: {
          summary: 'left',
          detail: CONFIG_DETAIL,
        },
      },
    },
  },
  args: {
    children: 'Hello, I am Button!',
  },
};

type Story = StoryObj<typeof Button>;

export const DefaultStory: Story = {};

export default meta;
