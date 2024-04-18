import { Button, ScreenHeader, ScreenHeaderProps } from '@appello/mobile-ui';
import { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { Screen } from '../../components/Screen';
import { CONFIG_CATEGORY } from '../../constants';

const meta: Meta<ScreenHeaderProps> = {
  title: 'Screens/ScreenHeader',
  component: ScreenHeader,
  render: ({ accessoryRight, ...restProps }) => {
    const renderAccessoryRight = accessoryRight ? (
      <Button variant="plain">Select all</Button>
    ) : undefined;

    return (
      <Screen>
        <ScreenHeader {...restProps} accessoryRight={renderAccessoryRight} />
      </Screen>
    );
  },
  argTypes: {
    children: {
      control: false,
    },
    accessoryRight: {
      control: 'boolean',
    },
    onSearchChange: {
      control: 'boolean',
    },
    BackButtonIcon: {
      control: false,
      table: {
        category: CONFIG_CATEGORY,
      },
    },
    textColor: {
      table: {
        category: CONFIG_CATEGORY,
      },
    },
  },
  args: {
    hideBackButton: false,
    title: 'Header',
    subTitle: '',
  },
};

type Story = StoryObj<ScreenHeaderProps>;

export const DefaultStory: Story = {};

export default meta;
