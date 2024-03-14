import { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

import { Button, ButtonProps } from '@appello/mobile-ui';
import { CONFIG_CATEGORY, CONFIG_DETAIL } from '../../constants';

const ChatIcon: React.FC<SvgProps> = props => (
  <Svg fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      fill="currentColor"
      d="M12 2A10 10 0 0 0 2 12a9.89 9.89 0 0 0 2.26 6.33l-2 2a1 1 0 0 0-.21 1.09A1 1 0 0 0 3 22h9a10 10 0 0 0 0-20Zm0 18H5.41l.93-.93a1 1 0 0 0 0-1.41A8 8 0 1 1 12 20Z"
    />
  </Svg>
);

const meta: Meta<ButtonProps> = {
  title: 'Basic/Button',
  component: Button,
  render: ({ Icon, children, ...args }) => {
    return (
      <Button Icon={Icon ? ChatIcon : undefined} {...(args as ButtonProps)}>
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
    disabled: false,
  },
};

type Story = StoryObj<typeof Button>;

export const DefaultStory: Story = {};

export default meta;
