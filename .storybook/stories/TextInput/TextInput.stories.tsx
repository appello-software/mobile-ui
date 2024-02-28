import { action } from '@storybook/addon-actions';
import { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

import { Button, TextInput, TextInputProps } from '@appello/mobile-ui';
import { CONFIG_CATEGORY } from '../../constants';
import { AccountIcon, PaperPlaneIcon } from './icons';

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
  // eslint-disable-next-line @typescript-eslint/naming-convention
  render: ({ accessoryRight, Icon, mask, onPress, ...args }) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
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
