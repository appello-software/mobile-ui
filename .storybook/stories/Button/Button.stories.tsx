import { Button, ButtonProps } from '../../../src';
import { Meta, StoryObj } from '@storybook/react-native';
import React from 'react';

import ChatIcon from '../../assets/icons/unicons/chat.svg';
import { CONFIG_CATEGORY } from '../../constants';

const meta: Meta<ButtonProps & { Icon: boolean }> = {
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
          summary: JSON.stringify({
            variant: 'p3',
            color: 'depending on variant',
          }),
          detail: 'Set it up in the component config',
        },
      },
    },
    loaderColor: {
      table: {
        category: CONFIG_CATEGORY,
        defaultValue: {
          summary: 'depending on variant',
          detail: 'Set it up in the component config',
        },
      },
    },
    isLoading: {
      table: {
        defaultValue: {
          summary: false,
        },
      },
    },
    variant: {
      table: {
        defaultValue: {
          summary: 'primary',
          detail: 'Set it up in the component config',
        },
      },
    },
    pressedOverlayColor: {
      table: {
        category: CONFIG_CATEGORY,
        defaultValue: {
          summary: 'depending on variant',
          detail: 'Set it up in the component config',
        },
      },
    },
    backgroundGradient: {
      table: {
        category: CONFIG_CATEGORY,
        defaultValue: {
          summary: 'depending on variant',
          detail: 'Set it up in the component config',
        },
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
          detail: 'Set it up in the component config',
        },
      },
    },
    iconPosition: {
      table: {
        defaultValue: {
          summary: 'left',
          detail: 'Set it up in the component config',
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
