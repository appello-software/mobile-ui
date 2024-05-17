import { Button, ButtonProps, EqualSidesContainer, Popup, PopupProps } from '@appello/mobile-ui';
import CalendarIcon from '@appello/mobile-ui/icons/unicons/calendar.svg';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import type { Meta, StoryObj } from '@storybook/react';
import React, { useEffect, useMemo, useState } from 'react';

const meta = {
  title: 'Basic/Popup',
  component: Popup,
  render: ({ opened: propOpened, onClose, buttons, topAccessory, ...props }) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [opened, setOpened] = useState(false);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      setOpened(!!propOpened);
    }, [propOpened]);

    const closePopup = () => setOpened(false);

    const CloseButton: ButtonProps = {
      children: 'Close',
      variant: 'primary',
      onPress: closePopup,
    };
    const CancelButton: ButtonProps = {
      children: 'Cancel',
      variant: 'secondary',
      onPress: closePopup,
    };
    const OkButton: ButtonProps = {
      children: 'Ok',
      variant: 'secondary',
      onPress: closePopup,
    };

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const buttonProps = useMemo<PopupProps['buttons'] | undefined>(() => {
      const buttonsToShow = buttons as unknown as 'none' | 'one' | 'two' | 'three';
      if (buttonsToShow === 'one') return [CloseButton];
      if (buttonsToShow === 'two') return [CancelButton, CloseButton];
      if (buttonsToShow === 'three') return [CancelButton, OkButton, CloseButton];

      return undefined;
    }, [buttons]);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const renderTopAccessory = useMemo(
      () => (
        <EqualSidesContainer bgColor="#F9F9FB" borderRadius="rounded" size={110}>
          <CalendarIcon height={38} width={38} />
        </EqualSidesContainer>
      ),
      [],
    );

    return (
      <BottomSheetModalProvider>
        <Button variant="primary" onPress={() => setOpened(true)}>
          Open popup
        </Button>
        <Popup
          buttons={buttonProps}
          opened={opened}
          topAccessory={topAccessory ? renderTopAccessory : undefined}
          onClose={onClose ? closePopup : undefined}
          {...props}
        />
      </BottomSheetModalProvider>
    );
  },
  args: {
    opened: false,
    title: 'Title',
    message: 'Lorem ipsum dolor sit amet, consecteturadipiscing elit. Congue velit massa non.',
  },
  argTypes: {
    onClose: { control: 'boolean' },
    topAccessory: { control: 'boolean' },
    buttons: {
      control: 'radio',
      options: ['none', 'one', 'two', 'three'],
    },
  },
} satisfies Meta<PopupProps>;

type Story = StoryObj<PopupProps>;

export const DefaultStory: Story = {};

export default meta;
