import { Action, ActionSheet, ActionSheetProps, ActionWithIcon, Button } from '@appello/mobile-ui';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import type { Meta, StoryObj } from '@storybook/react';
import React, { useMemo, useRef } from 'react';
import { Alert } from 'react-native';

import { AccountIcon, PaperPlaneIcon } from '../../components/icons';
import { CONFIG_CATEGORY } from '../../constants';

/* eslint-disable react-hooks/rules-of-hooks */
const meta = {
  title: 'Basic/ActionSheet',
  component: ActionSheet,
  render: ({ actions, ...props }) => {
    const ref = useRef<BottomSheetModal>(null);

    const actionList: Action[] | ActionWithIcon[] = useMemo(() => {
      const withIcons = (actions as unknown as string) === 'With icons';

      return [
        {
          label: 'Edit',
          onPress: () => Alert.alert('Edit'),
          icon: withIcons ? PaperPlaneIcon : undefined,
        },
        {
          label: 'Delete',
          onPress: () => Alert.alert('Delete'),
          icon: withIcons ? AccountIcon : undefined,
        },
      ];
    }, [actions]);

    return (
      <BottomSheetModalProvider>
        <Button variant="primary" onPress={() => ref?.current?.present()}>
          Open action sheet
        </Button>
        <ActionSheet {...props} actions={actionList} ref={ref} />
      </BottomSheetModalProvider>
    );
  },
  args: {
    title: 'Header',
    iconSize: 18,
    actions: 'Without icons' as any,
    closeOnAction: true,
  },
  argTypes: {
    actions: {
      options: ['With icons', 'Without icons'],
      control: { type: 'select' },
    },
    iconSize: {
      table: {
        category: CONFIG_CATEGORY,
      },
    },
    iconColor: {
      table: {
        category: CONFIG_CATEGORY,
      },
    },
    labelProps: {
      table: {
        category: CONFIG_CATEGORY,
      },
    },
  },
} satisfies Meta<ActionSheetProps>;

type Story = StoryObj<ActionSheetProps>;

export const DefaultStory: Story = {};

export default meta;
