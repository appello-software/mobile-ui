import { BottomSheetModal } from '@gorhom/bottom-sheet';
import React, { forwardRef, useCallback, useMemo } from 'react';
import { View } from 'react-native';
import WheelPicker from 'react-native-wheely';

import { AppText } from '~/components/common/AppText';
import { BottomSheet } from '~/components/common/BottomSheet';
import { Button } from '~/components/common/Button';
import { useCombinedPropsWithConfig } from '~/hooks/useCombinedPropsWithConfig';
import { makeStyles } from '~/utils';

export type Value = string | number | null;

export interface Option<TValue extends NonNullable<Value> = NonNullable<Value>> {
  value: TValue;
  title: string;
}

export interface MultiRollerPickerProps {
  /**
   *  The title to display on the left side of the header
   *  @default Options
   *  */
  title?: string;
  /**
   *  The title of the button to save the value
   *  @default Done
   *  */
  buttonTitle?: string;
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
  onChange: (value: NonNullable<Value>[]) => void;
  /**
   *  Callback called on the button press
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
      buttonTitle = 'Done',
      options,
      values,
      onChange,
      onSave,
    } = useCombinedPropsWithConfig('MultiRollerPicker', props);

    const selectedIndexes = useMemo(
      () =>
        values.map((value, index) =>
          value ? options[index].findIndex(option => option.value === value) : 0,
        ),
      [options, values],
    );

    const handlePickerChange = useCallback(
      (pickerIndex: number, selectedIndex: number) => {
        const newValues = [...values] as NonNullable<Value>[];
        newValues[pickerIndex] = options[pickerIndex][selectedIndex].value;

        onChange(newValues);
      },
      [values, options, onChange],
    );

    const handleSave = useCallback(() => {
      onSave(values as NonNullable<Value>[]);
    }, [values, onSave]);

    const styles = useStyles();
    return (
      <BottomSheet enableContentPanningGesture={false} height={250} ref={ref}>
        <View style={styles.header}>
          <AppText>{title}</AppText>
          <Button variant="plain" onPress={handleSave}>
            {buttonTitle}
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
              options={options.map(option => option.title)}
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