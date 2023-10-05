import { Meta, StoryObj } from '@storybook/react-native';
import React from 'react';
import { TextField, TextFieldProps } from '~/components/form/TextField';
import { useForm } from 'react-hook-form';
import { EXTENDED_CATEGORY } from '../../constants';

const meta: Meta<TextFieldProps<any>> = {
  title: 'Forms/TextField',
  component: TextField,
  render: props => {
    const form = useForm<{ textField: string }>();

    return <TextField {...props} control={form.control} name="textField" />;
  },
  argTypes: {
    control: {
      control: false,
    },
    name: {
      control: false,
    },
    error: { control: false, table: { category: EXTENDED_CATEGORY } },
    disabled: { control: false, table: { category: EXTENDED_CATEGORY } },
    onPress: { control: false, table: { category: EXTENDED_CATEGORY } },
    accessoryRight: { control: false, table: { category: EXTENDED_CATEGORY } },
    Icon: { control: false, table: { category: EXTENDED_CATEGORY } },
    iconSize: { control: false, table: { category: EXTENDED_CATEGORY } },
    mask: { control: false, table: { category: EXTENDED_CATEGORY } },
    placeholderFillCharacter: { control: false, table: { category: EXTENDED_CATEGORY } },
  },
  args: {
    label: 'Text Field',
  },
};

type Story = StoryObj<TextFieldProps<any>>;

export const DefaultStory: Story = {};

export default meta;
