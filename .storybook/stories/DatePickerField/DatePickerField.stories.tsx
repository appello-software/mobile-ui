import { DatePickerField, DatePickerFieldProps } from '@appello/mobile-ui';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { useForm } from 'react-hook-form';

import { EXTENDED_CATEGORY } from '../../constants';

const meta: Meta<DatePickerFieldProps<any>> = {
  title: 'Forms/DatePickerField',
  component: DatePickerField,
  render: props => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const form = useForm<{ datePickerField: number }>();

    return (
      <BottomSheetModalProvider>
        <DatePickerField {...props} control={form.control} name="datePickerField" />
      </BottomSheetModalProvider>
    );
  },
  args: {
    label: 'DatePicker Field',
    maxDate: new Date(2030, 11, 31),
  },
  argTypes: {
    control: {
      control: false,
    },
    name: {
      control: false,
    },
    minUnit: { control: false, table: { category: EXTENDED_CATEGORY } },
    minDate: { control: false, table: { category: EXTENDED_CATEGORY } },
    maxDate: { control: false, table: { category: EXTENDED_CATEGORY } },
    error: { control: false, table: { category: EXTENDED_CATEGORY } },
    disabled: { control: false, table: { category: EXTENDED_CATEGORY } },
    Icon: { control: false, table: { category: EXTENDED_CATEGORY } },
    iconSize: { control: false, table: { category: EXTENDED_CATEGORY } },
    getInputValue: { control: false, table: { category: EXTENDED_CATEGORY } },
    inputStyle: { control: false, table: { category: EXTENDED_CATEGORY } },
    style: { control: false, table: { category: EXTENDED_CATEGORY } },
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
  },
};

type Story = StoryObj<DatePickerFieldProps<any>>;

export const DefaultStory: Story = {};

export default meta;
