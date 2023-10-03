import { TextInput } from '../../../src';
import { Meta, StoryObj } from '@storybook/react-native';
import React from 'react';
import { CONFIG_CATEGORY } from '../../constants';
import { Field, FieldProps } from '~/components/form/Field';
import { TextField, TextFieldProps } from '~/components/form/TextField';
import { useForm } from 'react-hook-form';

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
    }
  },
  args: {
    label: 'Text Field',
  },
};

type Story = StoryObj<TextFieldProps<any>>;

export const DefaultStory: Story = {};

export default meta;
