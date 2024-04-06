import { DatePicker, DatePickerProps } from '@appello/mobile-ui';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

import { CONFIG_CATEGORY, EXTENDED_CATEGORY } from '../../constants';

const meta: Meta<DatePickerProps> = {
  title: 'Basic/DatePicker',
  component: DatePicker,

  render: props => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = useState<DatePickerProps['value']>();

    return (
      <BottomSheetModalProvider>
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/* @ts-ignore */}
        <DatePicker {...props} value={value} onChange={setValue} />
      </BottomSheetModalProvider>
    );
  },
  args: {
    arrowIndicatesOpening: true,
    disabled: false,
    error: false,
    iconSize: { width: 20, height: 20 },
    saveButtonLabel: 'Done',
    title: 'Options',
    maxDate: new Date(2030, 11, 31),
    minUnit: 'day',
  },
  argTypes: {
    minUnit: {
      control: 'select',
      options: ['day', 'month', 'year'],
    },
    onChange: {
      control: false,
    },
    value: {
      control: false,
    },
    Icon: {
      control: false,
      table: {
        category: EXTENDED_CATEGORY,
      },
    },
    iconSize: {
      table: {
        category: CONFIG_CATEGORY,
      },
    },
    error: {
      table: {
        category: EXTENDED_CATEGORY,
      },
    },
    disabled: {
      table: {
        category: EXTENDED_CATEGORY,
      },
    },
    title: {
      table: {
        category: EXTENDED_CATEGORY,
      },
    },
    saveButtonLabel: {
      table: {
        category: EXTENDED_CATEGORY,
      },
    },
    arrowIndicatesOpening: {
      table: {
        category: EXTENDED_CATEGORY,
      },
    },
  },
};

type Story = StoryObj<DatePickerProps>;

export const DatePickerStory: Story = {};

export default meta;
