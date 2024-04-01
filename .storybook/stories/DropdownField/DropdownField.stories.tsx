import { DropdownField, DropdownFieldProps, Option } from '@appello/mobile-ui';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { useForm } from 'react-hook-form';

import { EXTENDED_CATEGORY } from '../../constants';

const options: Option[] = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
  { value: '3', label: 'Option 3' },
];

const meta: Meta<DropdownFieldProps<any>> = {
  title: 'Forms/DropdownField',
  component: DropdownField,
  render: props => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const form = useForm<{ dropdownField: string }>();

    return (
      <BottomSheetModalProvider>
        <DropdownField {...props} control={form.control} name="dropdownField" />
      </BottomSheetModalProvider>
    );
  },
  args: {
    options,
    label: 'Dropdown Field',
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
    Icon: { control: false, table: { category: EXTENDED_CATEGORY } },
    iconSize: { control: false, table: { category: EXTENDED_CATEGORY } },
    options: {
      control: false,
      table: {
        category: EXTENDED_CATEGORY,
      },
    },
    arrowIndicatesOpening: {
      control: false,
      table: {
        category: EXTENDED_CATEGORY,
      },
    },
    title: {
      control: false,
      table: {
        category: EXTENDED_CATEGORY,
      },
    },
    saveButtonLabel: {
      control: false,
      table: {
        category: EXTENDED_CATEGORY,
      },
    },
    onChange: {
      control: false,
      table: {
        category: EXTENDED_CATEGORY,
      },
    },
  },
};

type Story = StoryObj<DropdownFieldProps<any>>;

export const DefaultStory: Story = {};

export default meta;
