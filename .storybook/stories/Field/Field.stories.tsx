import { Meta, StoryObj } from '@storybook/react-native';
import React from 'react';

import { TextInput, Field, FieldProps } from '../../../src';
import { CONFIG_CATEGORY } from '../../constants';

const meta: Meta<FieldProps> = {
  title: 'Forms/Field',
  component: Field,
  render: ({ error, ...restProps }) => (
    <Field
      error={error ? { type: 'SomeType', message: 'Error message' } : undefined}
      {...restProps}
    >
      <TextInput error={!!error} />
    </Field>
  ),
  argTypes: {
    children: {
      control: false,
    },
    error: {
      control: 'boolean',
    },
    labelProps: {
      table: {
        category: CONFIG_CATEGORY,
        defaultValue: {
          summary: JSON.stringify({ variant: 'p3' }),
        },
      },
    },
    errorProps: {
      table: {
        category: CONFIG_CATEGORY,
        defaultValue: {
          summary: JSON.stringify({ variant: 'p3' }),
        },
      },
    },
    renderError: {
      table: {
        category: CONFIG_CATEGORY,
      },
    },
  },
  args: {
    children: <TextInput />,
    label: 'Form Field',
    error: false as any,
  },
};

type Story = StoryObj<FieldProps>;

export const DefaultStory: Story = {};

export default meta;
