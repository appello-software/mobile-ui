import { Meta, StoryObj } from '@storybook/react-native';
import React, { useState } from 'react';

import { DEFAULT_TAB_HEIGHT } from '~/components/common/HorizontalTabs';

import { HorizontalTabs, HorizontalTabsProps } from '../../../src';
import { CONFIG_CATEGORY, CONFIG_DETAIL } from '../../constants';

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
        defaultValue: {
          summary: 'p1',
        },
      },
    },
    scrollable: {
      table: {
        category: CONFIG_CATEGORY,
        defaultValue: {
          summary: false,
        },
      },
    },
    tabContent: {
      table: {
        defaultValue: {
          summary: 'undefined',
          detail: CONFIG_DETAIL,
        },
      },
    },
    tabHeight: {
      table: {
        defaultValue: {
          summary: DEFAULT_TAB_HEIGHT,
          detail: CONFIG_DETAIL,
        },
      },
    },
    tabContentReverse: {
      table: {
        defaultValue: {
          summary: false,
          detail: CONFIG_DETAIL,
        },
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
