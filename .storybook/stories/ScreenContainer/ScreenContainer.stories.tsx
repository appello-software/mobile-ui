import { AppText, BasicHeader, ScreenContainer, ScreenContainerProps } from '@appello/mobile-ui';
import { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { Screen } from '../../components/Screen';

const meta: Meta<ScreenContainerProps> = {
  title: 'Screens/ScreenContainer',
  component: ScreenContainer,
  render: ({ header, ...restProps }) => (
    <Screen>
      <ScreenContainer header={header ? <BasicHeader title="Screen Title" /> : null} {...restProps}>
        <AppText align="center" variant="h1">
          Screen Content
        </AppText>
      </ScreenContainer>
    </Screen>
  ),
  argTypes: {
    children: {
      control: false,
    },
    header: {
      control: 'boolean',
    },
  },
};

type Story = StoryObj<ScreenContainerProps>;

export const DefaultStory: Story = {};

export default meta;
