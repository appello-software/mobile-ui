import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

import { Checkbox, CheckboxProps } from '@appello/mobile-ui';
import { CONFIG_CATEGORY, CONFIG_DETAIL } from '../../constants';

import Svg, { SvgProps, Path } from 'react-native-svg';
const CheckmarkIcon = (props: SvgProps) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      fill="currentColor"
      d="M18.7104 7.20998C18.6175 7.11625 18.5069 7.04186 18.385 6.99109C18.2632 6.94032 18.1324 6.91418 18.0004 6.91418C17.8684 6.91418 17.7377 6.94032 17.6159 6.99109C17.494 7.04186 17.3834 7.11625 17.2904 7.20998L9.84044 14.67L6.71044 11.53C6.61392 11.4367 6.49998 11.3634 6.37512 11.3142C6.25026 11.265 6.11694 11.2409 5.98276 11.2432C5.84858 11.2455 5.71617 11.2743 5.59309 11.3278C5.47001 11.3812 5.35868 11.4585 5.26544 11.555C5.1722 11.6515 5.09889 11.7654 5.04968 11.8903C5.00048 12.0152 4.97635 12.1485 4.97867 12.2827C4.98099 12.4168 5.00972 12.5493 5.06321 12.6723C5.1167 12.7954 5.19392 12.9067 5.29044 13L9.13044 16.84C9.2234 16.9337 9.334 17.0081 9.45586 17.0589C9.57772 17.1096 9.70843 17.1358 9.84044 17.1358C9.97245 17.1358 10.1032 17.1096 10.225 17.0589C10.3469 17.0081 10.4575 16.9337 10.5504 16.84L18.7104 8.67998C18.8119 8.58634 18.893 8.47269 18.9484 8.34619C19.0038 8.21969 19.0324 8.08308 19.0324 7.94498C19.0324 7.80688 19.0038 7.67028 18.9484 7.54378C18.893 7.41728 18.8119 7.30363 18.7104 7.20998Z"
    />
  </Svg>
);

const meta = {
  title: 'Basic/Checkbox',
  component: Checkbox,
  render: args => {
    const [value, setValue] = useState(args.checked ?? false);

    return <Checkbox {...args} checked={value} onChange={setValue} />;
  },
  args: {
    checkIcon: CheckmarkIcon,
    checked: false,
    disabled: false,
    rounded: false,
  },
  argTypes: {
    checkIcon: {
      control: false,
      table: {
        category: CONFIG_CATEGORY,
      },
    },
    activeColor: {
      table: {
        category: CONFIG_CATEGORY,
        defaultValue: {
          summary: 'theme.colors.success',
          detail: CONFIG_DETAIL,
        },
      },
    },
    size: {
      table: {
        category: CONFIG_CATEGORY,
        defaultValue: {
          summary: 24,
          detail: CONFIG_DETAIL,
        },
      },
    },
  },
} satisfies Meta<CheckboxProps>;

type Story = StoryObj<CheckboxProps>;

export const DefaultStory: Story = {};

export default meta;
