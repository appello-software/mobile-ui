import { Meta, StoryObj } from '@storybook/react-native';
import React, { useState } from 'react';

import { HorizontalTabs, HorizontalTabsProps } from '../../../src';
import { CONFIG_CATEGORY } from '../../constants';

const meta: Meta<HorizontalTabsProps> = {
  title: 'Basic/HorizontalTabs',
  component: HorizontalTabs,
  render: ({ ...args }) => {
    const [value, setValue] = useState<string>(args.tab || args.list[0].key);

    return <HorizontalTabs {...args} setTab={vl => setValue(vl)} tab={value} />;
  },
  argTypes: {
    tabTextVariant: {
      table: {
        category: CONFIG_CATEGORY,
      },
    },
  },
  args: {
    list: [
      {
        key: 'Key1',
        title: 'Tab 1',
      },
      {
        key: 'Key2',
        title: 'Tab 2',
      },
      {
        key: 'Key3',
        title: 'Tab 3',
      },
    ],
  },
};

type Story = StoryObj<typeof HorizontalTabs>;

export const DefaultStory: Story = {};

export default meta;
