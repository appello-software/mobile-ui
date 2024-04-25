import { AppText, HorizontalTabs, HorizontalTabsProps } from '@appello/mobile-ui';
import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { CONFIG_CATEGORY } from '../../constants';

const TabContent = ({ tabKey, reverse }: { tabKey: string; reverse?: boolean }) => (
  <View style={[styles.content, reverse && styles.contentReverse]}>
    <AppText color="#fff" variant="p5" weight="medium">
      {tabKey}
    </AppText>
  </View>
);

const styles = StyleSheet.create({
  content: {
    width: 15,
    height: 15,
    marginLeft: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    backgroundColor: 'blue',
  },
  contentReverse: {
    marginLeft: 0,
    marginRight: 5,
  },
});

const meta: Meta<HorizontalTabsProps> = {
  title: 'Basic/HorizontalTabs',
  component: HorizontalTabs,
  render: ({ tabContent, tabContentReverse, ...args }) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = useState<string>(args.currentTab || args.list[0].key);

    return (
      <HorizontalTabs
        {...args}
        currentTab={value}
        tabContent={
          tabContent ? key => <TabContent reverse={tabContentReverse} tabKey={key} /> : undefined
        }
        tabContentReverse={tabContentReverse}
        onTabChange={key => setValue(key)}
      />
    );
  },
  argTypes: {
    tabTextVariant: {
      control: 'text',
      table: {
        category: CONFIG_CATEGORY,
      },
    },
    tabHeight: {
      control: 'number',
      table: {
        category: CONFIG_CATEGORY,
      },
    },
    tabContent: {
      control: 'boolean',
    },
  },
  args: {
    list: [
      {
        key: '1',
        title: 'Tab 1',
      },
      {
        key: '2',
        title: 'Tab 2',
      },
      {
        key: '3',
        title: 'Tab 3',
      },
    ],
    scrollable: false,
    tabContentReverse: false,
  },
} satisfies Meta<HorizontalTabsProps>;

type Story = StoryObj<typeof HorizontalTabs>;

export const DefaultStory: Story = {};

export default meta;
