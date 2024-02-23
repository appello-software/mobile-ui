import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import type { Meta, StoryObj } from '@storybook/react-native';
import React, { useMemo, useRef, useState } from 'react';

import { Button } from '~/components/common/Button';
import {
  MultiRollerPicker,
  MultiRollerPickerProps,
  Option,
  Value,
} from '~/components/common/MultiRollerPicker';

const dateOptions: Option[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'].map(value => ({
  value,
  title: value,
}));
const monthOptions: Option[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
].map(value => ({ value, title: value }));
const yearOptions: Option[] = ['2024', '2025', '2026', '2027', '2028', '2029', '2030'].map(
  value => ({
    value,
    title: value,
  }),
);

type OptionsVariants =
  | '[Options[]]'
  | '[Options[], Options[]]'
  | '[Options[], Options[], Options[]]';

/* eslint-disable react-hooks/rules-of-hooks */
const meta = {
  title: 'Basic/MultiRollerPicker',
  component: MultiRollerPicker,
  render: ({ options, ...restProps }) => {
    const ref = useRef<BottomSheetModal>(null);
    const [values, setValues] = useState<Value[]>([null, null, null]);

    const columns = options as unknown as OptionsVariants;
    options = useMemo(() => {
      if (columns === '[Options[]]') {
        return [dateOptions];
      }
      if (columns === '[Options[], Options[]]') {
        return [dateOptions, monthOptions];
      }
      return [dateOptions, monthOptions, yearOptions];
    }, [columns]);

    return (
      <BottomSheetModalProvider>
        <Button variant="primary" onPress={() => ref?.current?.present()}>
          Open roller picker
        </Button>
        <MultiRollerPicker
          {...restProps}
          options={options}
          ref={ref}
          values={values}
          onChange={setValues}
          onSave={values => {
            setValues(values);
            ref?.current?.dismiss();
          }}
        />
      </BottomSheetModalProvider>
    );
  },
  args: {
    title: 'Options',
    buttonTitle: 'Done',
  },
  argTypes: {
    options: {
      options: ['[Options[]]', '[Options[], Options[]]', '[Options[], Options[], Options[]]'],
      control: 'select',
    },
    values: {
      control: false,
    },
    onChange: {
      control: false,
    },
    onSave: {
      control: false,
    },
  },
} satisfies Meta<MultiRollerPickerProps>;

type Story = StoryObj<MultiRollerPickerProps>;

export const DefaultStory: Story = {};

export default meta;
