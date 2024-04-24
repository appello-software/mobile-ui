import { BottomSheetModal } from '@gorhom/bottom-sheet';
import React, { forwardRef, useCallback, useMemo } from 'react';

import { MultiRollerPicker, MultiRollerPickerProps, Option, Value } from '../MultiRollerPicker';

export type CommonPickerProps = Omit<
  MultiRollerPickerProps,
  'values' | 'options' | 'onChange' | 'onSave'
>;

export interface RollerPickerProps extends CommonPickerProps {
  /* Value of the picker */
  value: Value;
  /* List of options for the picker */
  options: Option[];
  /**
   *  Callback called on the value change
   *  */
  onChange?: (value: Value) => void;
  /**
   *  Callback called on the save button press
   *  */
  onSave: (value: Value) => void;
}

/**
 * Wrapper around the MultiRollerPicker component for a single value.
 * */
export const RollerPicker = forwardRef<BottomSheetModal, RollerPickerProps>(
  ({ value, options, onChange, onSave, ...restProps }, ref) => {
    const handleChange = useMemo<MultiRollerPickerProps['onChange']>(
      () =>
        onChange
          ? values => {
              onChange(values[0]);
            }
          : undefined,
      [onChange],
    );

    const handleSave = useCallback<MultiRollerPickerProps['onSave']>(
      values => {
        onSave(values[0]);
      },
      [onSave],
    );

    return (
      <MultiRollerPicker
        options={useMemo(() => [options], [options])}
        ref={ref}
        values={useMemo(() => [value], [value])}
        onChange={handleChange}
        onSave={handleSave}
        {...restProps}
      />
    );
  },
);
