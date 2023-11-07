import { SafeAreaProviderCompat } from '@react-navigation/elements';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Meta, StoryObj } from '@storybook/react-native';
import React from 'react';

import { AppText, BasicHeader, ScreenContainer, ScreenContainerProps } from '../../../src';

const StoryStack = createNativeStackNavigator();

const screenOptions = {
  gestureEnabled: false,
  headerShown: false,
};

const meta: Meta<ScreenContainerProps> = {
  title: 'Screens/ScreenContainer',
  component: ScreenContainer,
  render: ({ header, ...restProps }) => (
    <NavigationContainer>
      <SafeAreaProviderCompat>
        <StoryStack.Navigator screenOptions={screenOptions}>
          <StoryStack.Screen name="ScreenContainerScreen">
            {() => (
              <ScreenContainer
                header={header ? <BasicHeader title="Screen Title" /> : null}
                {...restProps}
              >
                <AppText variant="h1" align="center">
                  Screen Content
                </AppText>
              </ScreenContainer>
            )}
          </StoryStack.Screen>
        </StoryStack.Navigator>
      </SafeAreaProviderCompat>
    </NavigationContainer>
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
