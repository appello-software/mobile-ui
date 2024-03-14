import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

import { DEFAULT_TAB_HEIGHT } from '@appello/mobile-ui/components/common/HorizontalTabs';

import { HorizontalTabs, HorizontalTabsProps } from '@appello/mobile-ui';
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
    scrollable: {
      table: {
        category: CONFIG_CATEGORY,
      },
    },
    tabHeight: {
      table: {
        category: CONFIG_CATEGORY,
      },
    },
  },
  args: {
    tabHeight: DEFAULT_TAB_HEIGHT,
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
    scrollable: false,
  },
} satisfies Meta<HorizontalTabsProps>;

type Story = StoryObj<typeof HorizontalTabs>;

export const DefaultStory: Story = {};

export default meta;
