import { Meta, StoryObj } from '@storybook/react-native';
import React from 'react';
import { useForm } from 'react-hook-form';

import { CONFIG_CATEGORY, EXTENDED_CATEGORY } from '../../constants';
import { PasswordField, PasswordFieldProps } from '../../../src';
import Svg, { SvgProps, Path } from 'react-native-svg';
const EyeIcon = (props: SvgProps) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      d="M21.9196 11.6C19.8996 6.91 16.0996 4 11.9996 4C7.89958 4 4.09958 6.91 2.07958 11.6C2.02452 11.7262 1.99609 11.8623 1.99609 12C1.99609 12.1377 2.02452 12.2738 2.07958 12.4C4.09958 17.09 7.89958 20 11.9996 20C16.0996 20 19.8996 17.09 21.9196 12.4C21.9746 12.2738 22.0031 12.1377 22.0031 12C22.0031 11.8623 21.9746 11.7262 21.9196 11.6ZM11.9996 18C8.82958 18 5.82958 15.71 4.09958 12C5.82958 8.29 8.82958 6 11.9996 6C15.1696 6 18.1696 8.29 19.8996 12C18.1696 15.71 15.1696 18 11.9996 18ZM11.9996 8C11.2085 8 10.4351 8.2346 9.7773 8.67412C9.1195 9.11365 8.60681 9.73836 8.30406 10.4693C8.00131 11.2002 7.9221 12.0044 8.07644 12.7804C8.23078 13.5563 8.61174 14.269 9.17115 14.8284C9.73056 15.3878 10.4433 15.7688 11.2192 15.9231C11.9951 16.0775 12.7994 15.9983 13.5303 15.6955C14.2612 15.3928 14.8859 14.8801 15.3255 14.2223C15.765 13.5645 15.9996 12.7911 15.9996 12C15.9996 10.9391 15.5782 9.92172 14.828 9.17157C14.0779 8.42143 13.0604 8 11.9996 8ZM11.9996 14C11.604 14 11.2173 13.8827 10.8884 13.6629C10.5595 13.4432 10.3032 13.1308 10.1518 12.7654C10.0004 12.3999 9.96084 11.9978 10.038 11.6098C10.1152 11.2219 10.3057 10.8655 10.5854 10.5858C10.8651 10.3061 11.2214 10.1156 11.6094 10.0384C11.9974 9.96126 12.3995 10.0009 12.7649 10.1522C13.1304 10.3036 13.4428 10.56 13.6625 10.8889C13.8823 11.2178 13.9996 11.6044 13.9996 12C13.9996 12.5304 13.7889 13.0391 13.4138 13.4142C13.0387 13.7893 12.53 14 11.9996 14Z"
      fill="currentColor"
    />
  </Svg>
);

const CloseIcon = (props: SvgProps) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      d="M13.4099 12L19.7099 5.71C19.8982 5.5217 20.004 5.2663 20.004 5C20.004 4.7337 19.8982 4.47831 19.7099 4.29C19.5216 4.1017 19.2662 3.99591 18.9999 3.99591C18.7336 3.99591 18.4782 4.1017 18.2899 4.29L11.9999 10.59L5.70994 4.29C5.52164 4.1017 5.26624 3.99591 4.99994 3.99591C4.73364 3.99591 4.47824 4.1017 4.28994 4.29C4.10164 4.47831 3.99585 4.7337 3.99585 5C3.99585 5.2663 4.10164 5.5217 4.28994 5.71L10.5899 12L4.28994 18.29C4.19621 18.383 4.12182 18.4936 4.07105 18.6154C4.02028 18.7373 3.99414 18.868 3.99414 19C3.99414 19.132 4.02028 19.2627 4.07105 19.3846C4.12182 19.5064 4.19621 19.617 4.28994 19.71C4.3829 19.8037 4.4935 19.8781 4.61536 19.9289C4.73722 19.9797 4.86793 20.0058 4.99994 20.0058C5.13195 20.0058 5.26266 19.9797 5.38452 19.9289C5.50638 19.8781 5.61698 19.8037 5.70994 19.71L11.9999 13.41L18.2899 19.71C18.3829 19.8037 18.4935 19.8781 18.6154 19.9289C18.7372 19.9797 18.8679 20.0058 18.9999 20.0058C19.132 20.0058 19.2627 19.9797 19.3845 19.9289C19.5064 19.8781 19.617 19.8037 19.7099 19.71C19.8037 19.617 19.8781 19.5064 19.9288 19.3846C19.9796 19.2627 20.0057 19.132 20.0057 19C20.0057 18.868 19.9796 18.7373 19.9288 18.6154C19.8781 18.4936 19.8037 18.383 19.7099 18.29L13.4099 12Z"
      fill="currentColor"
    />
  </Svg>
);

const meta: Meta<PasswordFieldProps<any>> = {
  title: 'Forms/PasswordField',
  component: PasswordField,
  render: props => {
    const form = useForm<{ password: string }>();

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
    control: {
      control: false,
    },
    name: {
      control: false,
    },
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
