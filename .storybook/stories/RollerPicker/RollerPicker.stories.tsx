import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import type { Meta, StoryObj } from '@storybook/react';
import React, { useRef, useState } from 'react';

import { Button, RollerPicker, RollerPickerProps } from '@appello/mobile-ui';
import { Option, Value } from '@appello/mobile-ui/components/common/MultiRollerPicker';

import { EXTENDED_CATEGORY } from '../../constants';

const options: Option[] = ['0.5L', '1L', '2L', '5L', '10L', '50L', '100L'].map(value => ({
  value,
  label: value,
}));

/* eslint-disable react-hooks/rules-of-hooks */
const meta = {
  title: 'Basic/RollerPicker',
  component: RollerPicker,
  render: props => {
    const ref = useRef<BottomSheetModal>(null);
    const [value, setValue] = useState<Value>(null);

    return (
      <BottomSheetModalProvider>
        <Button variant="primary" onPress={() => ref?.current?.present()}>
          Open roller picker
        </Button>
        <RollerPicker
          {...props}
          ref={ref}
          value={value}
          onChange={setValue}
          onSave={value => {
            setValue(value);
            ref?.current?.dismiss();
          }}
        />
      </BottomSheetModalProvider>
    );
  },
  args: {
    title: 'Options',
    buttonTitle: 'Done',
    options,
  },
  argTypes: {
    title: {
      table: {
        category: EXTENDED_CATEGORY,
      },
    },
    buttonTitle: {
      table: {
        category: EXTENDED_CATEGORY,
      },
    },
    onChange: {
      control: false,
    },
    onSave: {
      control: false,
    },
  },
} satisfies Meta<RollerPickerProps>;

type Story = StoryObj<RollerPickerProps>;

export const DefaultStory: Story = {};

export default meta;
