import { TextInput, TextInputProps, Button } from '../../../src';
import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/react-native';
import React, { useState } from 'react';

import PaperPlaneIcon from '../../assets/icons/unicons/paper-plane.svg';
import AccountIcon from '../../assets/icons/unicons/account.svg';
import { CONFIG_CATEGORY } from '../../constants';

const accessoryRightRender = (
  <Button
    variant="primary"
    style={{ width: 36, height: 36, marginRight: 7, borderRadius: 6 }}
    onPress={action('pressed-accessory')}
  >
    <PaperPlaneIcon color="white" width={20} height={20} />
  </Button>
);
const dollarMask = ['$', /\d/, /\d/, '.', /\d/, /\d/];
const meta: Meta<TextInputProps> = {
  title: 'Basic/TextInput',
  component: TextInput,
  render: ({ accessoryRight, Icon, mask, onPress, ...args }) => {
    const [value, setValue] = useState('');

    return (
      <TextInput
        value={value}
        onChangeText={setValue}
        accessoryRight={accessoryRight ? accessoryRightRender : null}
        onPress={onPress ? action('text-input-press') : undefined}
        Icon={Icon ? AccountIcon : undefined}
        mask={mask ? dollarMask : undefined}
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
    placeholderFillCharacter: {
      table: {
        category: CONFIG_CATEGORY,
      },
    },
  },
};

type Story = StoryObj<TextInputProps>;

export const TextInputStory: Story = {};

export default meta;
