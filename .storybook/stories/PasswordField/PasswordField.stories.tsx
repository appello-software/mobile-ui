import { Meta, StoryObj } from '@storybook/react-native';
import React from 'react';
import { CONFIG_CATEGORY, EXTENDED_CATEGORY } from '../../constants';
import EyeIcon from '../../assets/icons/unicons/eye.svg';
import CloseIcon from '../../assets/icons/unicons/close.svg';
import { useForm } from 'react-hook-form';
import { PasswordField, PasswordFieldProps } from '~/components/form/PasswordField';

const meta: Meta<PasswordFieldProps<any>> = {
  title: 'Forms/PasswordField',
  component: PasswordField,
  render: props => {
    const form = useForm<{ password: string }>();

    const foo = <EyeIcon width={20} height={20} />;

    return (
      <PasswordField
        {...props}
        control={form.control}
        name="password"
        togglePasswordVisibilityIcons={React.useMemo(
          () => ({
            show: EyeIcon,
            hide: CloseIcon,
          }),
          [],
        )}
      />
    );
  },
  argTypes: {
    togglePasswordVisibilityIcons: {
      control: false,
      table: {
        category: CONFIG_CATEGORY,
      },
    },
    error: { control: false, table: { category: EXTENDED_CATEGORY } },
    disabled: { control: false, table: { category: EXTENDED_CATEGORY } },
    onPress: { control: false, table: { category: EXTENDED_CATEGORY } },
    accessoryRight: { control: false, table: { category: EXTENDED_CATEGORY } },
    Icon: { control: false, table: { category: EXTENDED_CATEGORY } },
    iconSize: { control: false, table: { category: EXTENDED_CATEGORY } },
    mask: { control: false, table: { category: EXTENDED_CATEGORY } },
    placeholderFillCharacter: { control: false, table: { category: EXTENDED_CATEGORY } },
  },
  args: {
    label: 'Password Field',
  },
};

type Story = StoryObj<PasswordFieldProps<any>>;

export const DefaultStory: Story = {};

export default meta;
