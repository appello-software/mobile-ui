import { AppText, BottomSheet, BottomSheetProps, Button } from '@appello/mobile-ui';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import type { Meta, StoryObj } from '@storybook/react';
import React, { useRef } from 'react';
import { View } from 'react-native';

/* eslint-disable react-hooks/rules-of-hooks */
const meta = {
  title: 'Basic/BottomSheet',
  component: BottomSheet,
  render: props => {
    const ref = useRef<BottomSheetModal>(null);

    return (
      <BottomSheetModalProvider>
        <Button variant="primary" onPress={() => ref?.current?.present()}>
          Open bottom sheet
        </Button>
        <BottomSheet {...props} ref={ref}>
          <View>
            <AppText align="center" variant="h2">
              BottomSheet content
            </AppText>
          </View>
        </BottomSheet>
      </BottomSheetModalProvider>
    );
  },
  args: {
    height: 250,
  },
  argTypes: {
    backdropPressBehavior: {
      options: ['none', 'close', 'collapse'],
    },
    waitFor: {
      table: {
        disable: true,
      },
    },
    simultaneousHandlers: {
      table: {
        disable: true,
      },
    },
  },
} satisfies Meta<BottomSheetProps>;

type Story = StoryObj<BottomSheetProps>;

export const DefaultStory: Story = {};

export default meta;
