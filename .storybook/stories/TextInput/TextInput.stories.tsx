import { Button, TextInput, TextInputProps } from '@appello/mobile-ui';
import { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

import { AccountIcon, PaperPlaneIcon } from '../../components/icons';
import { CONFIG_CATEGORY } from '../../constants';

const accessoryRightRender = (
  <Button style={{ width: 36, height: 36, marginRight: 7, borderRadius: 6 }} variant="primary">
    <PaperPlaneIcon color="white" height={20} width={20} />
  </Button>
);
const dollarMask = ['$', /\d/, /\d/, '.', /\d/, /\d/];
const meta: Meta<TextInputProps> = {
  title: 'Basic/TextInput',
  component: TextInput,

  render: ({ accessoryRight, Icon, mask, onPress, ...args }) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = useState('');

    return (
      <TextInput
        Icon={Icon ? AccountIcon : undefined}
        accessoryRight={accessoryRight ? accessoryRightRender : null}
        mask={mask ? dollarMask : undefined}
        value={value}
        onChangeText={setValue}
        {...args}
      />
    );
  },
  args: {
    disabled: false,
    accessoryRight: false,
    error: false,
    mask: false as any,
    Icon: false as any,
    onPress: false as any,
    iconSize: { width: 20, height: 20 },
    multiline: false,
    // maxLength: undefined,
  },
  argTypes: {
    accessoryRight: {
      control: 'boolean',
    },
    mask: {
      control: 'boolean',
    },
    Icon: {
      control: 'boolean',
    },
    onPress: {
      control: 'boolean',
    },
    iconSize: {
      table: {
        defaultValue: {
          summary: JSON.stringify({ width: 20, height: 20 }),
        },
        category: CONFIG_CATEGORY,
      },
    },
    maxLength: {
      control: 'number',
    },
  },
};

type Story = StoryObj<TextInputProps>;

export const TextInputStory: Story = {};

export default meta;
