import { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

import { Dropdown, DropdownProps } from '@appello/mobile-ui';
import { Option, Value } from '@appello/mobile-ui/components/common/MultiRollerPicker';
import { CONFIG_CATEGORY } from '../../constants';
import { AccountIcon } from '../../components/icons';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

const options: Option[] = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
  { value: '3', label: 'Option 3' },
];

const meta: Meta<DropdownProps> = {
  title: 'Basic/Dropdown',
  component: Dropdown,
  // eslint-disable-next-line @typescript-eslint/naming-convention
  render: ({ Icon, ...args }) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = useState<Value>(null);

    return (
      <BottomSheetModalProvider>
        <Dropdown
          {...args}
          value={value}
          onSave={setValue}
          Icon={Icon ? AccountIcon : undefined}
        />
      </BottomSheetModalProvider>
    );
  },
  args: {
    arrowIndicatesOpening: true,
    disabled: false,
    error: false,
    Icon: false as any,
    iconSize: { width: 20, height: 20 },
    options,
  },
  argTypes: {
    Icon: {
      control: 'boolean',
    },
    iconSize: {
      table: {
        category: CONFIG_CATEGORY,
      },
    },
  },
};

type Story = StoryObj<DropdownProps>;

export const DropdownStory: Story = {};

export default meta;
