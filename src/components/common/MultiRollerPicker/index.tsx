import { BottomSheetModal, BottomSheetModalProps } from '@gorhom/bottom-sheet';
import React, { forwardRef, useCallback, useMemo } from 'react';
import { View } from 'react-native';
import WheelPicker from 'react-native-wheely';

import { AppText } from '~/components/common/AppText';
import { BottomSheet } from '~/components/common/BottomSheet';
import { Button } from '~/components/common/Button';
import { useCombinedPropsWithConfig } from '~/hooks/useCombinedPropsWithConfig';
import { useInternalState } from '~/hooks/useInternalState';
import { makeStyles } from '~/utils';

export type Value = string | number | null;

export interface Option<TValue extends NonNullable<Value> = NonNullable<Value>> {
  value: TValue;
  label: string;
}

export interface MultiRollerPickerProps extends Pick<BottomSheetModalProps, 'onDismiss'> {
  /**
   *  The title to display on the left side of the header
   *  @default Options
   *  */
  title?: string;
  /**
   *  The title of the button to save the value
   *  @default Done
   *  */
  saveButtonLabel?: string;
  /**
   *  The array of option lists to display on the picker.
   *  */
  options: Option[][];
  /**
   *  The array of values. It should be the same length as options
   *  */
  values: Value[];
  /**
   *  Callback called on any of the values change
   *  */
  onChange?: (value: NonNullable<Value>[]) => void;
  /**
   *  Callback called on the save button press
   *  */
  onSave: (value: NonNullable<Value>[]) => void;
}

/**
 * A wheel picker component for selecting multiple values from multiple lists.
 * */
export const MultiRollerPicker = forwardRef<BottomSheetModal, MultiRollerPickerProps>(
  (props, ref) => {
    const {
      title = 'Options',
      saveButtonLabel = 'Done',
      options,
      values,
      onChange,
      onSave,
      ...modalProps
    } = useCombinedPropsWithConfig('MultiRollerPicker', props);
    const [internalValues, setInternalValues] = useInternalState(values);

    const selectedIndexes = useMemo(
      () =>
        internalValues.map((value, index) =>
          value ? options[index].findIndex(option => option.value === value) : 0,
        ),
      [options, internalValues],
    );

    const handlePickerChange = useCallback(
      (pickerIndex: number, selectedIndex: number) => {
        const newValues = internalValues.map((value, index) => value ?? options[index][0].value);
        newValues[pickerIndex] = options[pickerIndex][selectedIndex].value;

        if (onChange) {
          onChange(newValues);
        } else {
          setInternalValues(newValues);
        }
      },
      [internalValues, options, onChange, setInternalValues],
    );

    const handleSave = useCallback(() => {
      const filledValues = internalValues.map((value, index) => value ?? options[index][0].value);

      onSave(filledValues);
    }, [internalValues, options, onSave]);

    const styles = useStyles();
    return (
      <BottomSheet enableContentPanningGesture={false} height={250} ref={ref} {...modalProps}>
        <View style={styles.header}>
          <AppText>{title}</AppText>
          <Button style={styles.saveButton} variant="plain" onPress={handleSave}>
            {saveButtonLabel}
          </Button>
        </View>
        <View style={styles.pickerContainer}>
          {options.map((options, index) => (
            <WheelPicker
              containerStyle={styles.picker}
              decelerationRate="normal"
              itemHeight={40}
              itemTextStyle={styles.pickerItemText}
              key={index}
              options={options.map(option => option.label)}
              selectedIndex={selectedIndexes[index]}
              selectedIndicatorStyle={styles.selectedIndicator}
              visibleRest={2}
              onChange={selected => handlePickerChange(index, selected)}
            />
          ))}
        </View>
      </BottomSheet>
    );
  },
);

const useStyles = makeStyles(({ colors }) => ({
  header: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,

    borderBottomWidth: 1,
    borderBottomColor: colors.gray['5'],
  },
  saveButton: {
    flexDirection: 'column',
  },
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  picker: {
    flex: 1,
    minWidth: '33%',
  },
  pickerItemText: {
    fontSize: 15,
    lineHeight: 27,
    color: colors.black['1'],
  },
  selectedIndicator: {
    borderRadius: 0,
    borderColor: colors.gray['5'],
    borderBottomWidth: 1,
    borderTopWidth: 1,
    backgroundColor: 'transparent',
  },
}));
