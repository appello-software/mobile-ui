import CalendarIcon from '@appello/mobile-ui/icons/unicons/calendar.svg';
import {
  eachDayOfInterval,
  eachMonthOfInterval,
  eachYearOfInterval,
  endOfMonth,
  endOfYear,
  format,
  isAfter,
  isBefore,
  startOfMonth,
} from 'date-fns';
import React, { useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react';

import { useCombinedPropsWithConfig } from '../../../hooks/useCombinedPropsWithConfig';
import { getDateValue } from '../../../utils/dateTime';
import { Dropdown, DropdownInputProps, DropdownOwnProps, DropdownProps } from '../Dropdown';
import { MultiRollerPicker, MultiRollerPickerProps, Option } from '../MultiRollerPicker';

type InputDatePickerValues =
  | undefined
  | [Nullable<number>]
  | [Nullable<number>, Nullable<number>]
  | [Nullable<number>, Nullable<number>, Nullable<number>];

type OutputDatePickerValues = [number] | [number, number] | [number, number, number];

export type DatePickerProps = Pick<MultiRollerPickerProps, 'title' | 'saveButtonLabel'> &
  DropdownInputProps &
  Omit<DropdownOwnProps, 'renderPicker' | 'inputValue'> & {
    /**
     * @default CalendarIcon
     * */
    Icon: DropdownInputProps['Icon'];
    /**
     * Minimum date for the picker.
     *
     * @default Date.now()
     * */
    minDate?: Date | number;
    /**
     * Maximum date for the picker.
     */
    maxDate: Date | number;
    /**
     * Callback called on the save button press
     * */
    onChange: (values: OutputDatePickerValues) => void;
    /**
     * Function to get text value from picker values
     *
     * @default Function that formats in:
     * "d LLLL y"
     * */
    getInputValue?: (values?: InputDatePickerValues) => string;
  } & (
    | {
        /**
         * List of values in format of [day, month, year], where each item is Timestamp
         * */
        values?: [Nullable<number>, Nullable<number>, Nullable<number>];
        /**
         * Minimal unit to display (day, month or year).
         *
         * @default day
         * */
        minUnit?: 'day' | undefined;
      }
    | {
        values?: [Nullable<number>, Nullable<number>];
        minUnit: 'month';
      }
    | {
        values?: [Nullable<number>];
        minUnit: 'year';
      }
  );

const getOptionByValue = (value: Nullable<number> | undefined, options: Option<number>[]) => {
  return options.find(option => option.value === value) || options[0];
};
const getOptionByLabel = (label: string, options: Option<number>[]) => {
  return options.find(option => option.label === label) || options[0];
};

const defaultGetInputValue: DatePickerProps['getInputValue'] = values => {
  if (!values || !values.at(-1)) return '';

  let value = format(values.at(-1) as number, 'y');
  if (values.length > 1 && values.at(-2)) {
    value = `${format(values.at(-2) as number, 'LLLL')} ${value}`;
  }
  if (values.length > 2 && values.at(-3)) {
    value = `${format(values.at(-3) as number, 'd')} ${value}`;
  }

  return value;
};

/* TODO: maybe should re-write state management to useReducer */
export const DatePicker: React.FC<DatePickerProps> = props => {
  const now = useRef(Date.now());
  const {
    minDate = now.current,
    maxDate,
    minUnit = 'day',
    values,
    onChange,
    title,
    saveButtonLabel,
    Icon = CalendarIcon,
    getInputValue = defaultGetInputValue,
    ...textInputProps
  } = useCombinedPropsWithConfig('DatePicker', props);

  const yearOptions: Option<number>[] = useMemo(() => {
    return eachYearOfInterval({
      start: minDate,
      end: maxDate,
    }).map(year => ({
      value: getDateValue(year),
      label: format(year, 'y'),
    }));
  }, [minDate, maxDate]);
  const [chosenYearOption, setChosenYearOption] = useState(() =>
    getOptionByValue(values?.at(-1), yearOptions),
  );
  const yearValue = chosenYearOption.value;

  const monthOptions: Option<number>[] = useMemo(() => {
    if (minUnit === 'year') return [];

    const yearEnd = endOfYear(yearValue);

    return eachMonthOfInterval({
      start: isAfter(minDate, yearValue) ? minDate : yearValue,
      end: isBefore(maxDate, yearEnd) ? maxDate : yearEnd,
    }).map(month => ({
      value: getDateValue(month),
      label: format(month, 'LLLL'),
    }));
  }, [minDate, maxDate, minUnit, yearValue]);
  const [chosenMonthOption, setChosenMonthOption] = useState(() =>
    getOptionByValue(values?.at(-2), monthOptions),
  );
  const actualChosenMonthOption = useMemo(() => {
    return getOptionByLabel(chosenMonthOption.label, monthOptions);
  }, [monthOptions, chosenMonthOption]);
  useLayoutEffect(() => {
    setChosenMonthOption(actualChosenMonthOption);
  }, [actualChosenMonthOption]);
  const monthValue = actualChosenMonthOption.value;

  const daysOptions: Option<number>[] = useMemo(() => {
    if (minUnit !== 'day') return [];

    const monthStart = startOfMonth(monthValue);
    const monthEnd = endOfMonth(monthStart);

    return eachDayOfInterval({
      start: isAfter(minDate, monthStart) ? minDate : monthStart,
      end: isBefore(maxDate, monthEnd) ? maxDate : monthEnd,
    }).map(day => ({
      value: getDateValue(day),
      label: format(day, 'd'),
    }));
  }, [minDate, maxDate, minUnit, monthValue]);
  const [chosenDayOption, setChosenDayOption] = useState(() =>
    getOptionByValue(values?.at(-3), daysOptions),
  );
  const actualChosenDayOption = useMemo(() => {
    return getOptionByLabel(chosenDayOption.label, daysOptions);
  }, [daysOptions, chosenDayOption]);
  useLayoutEffect(() => {
    setChosenDayOption(actualChosenDayOption);
  }, [actualChosenDayOption]);
  const dayValue = actualChosenDayOption.value;

  const allOptions: Option[][] = useMemo(() => {
    const options = [];
    if (daysOptions.length > 0) {
      options.push(daysOptions);
    }
    if (monthOptions.length > 0) {
      options.push(monthOptions);
    }
    if (yearOptions.length > 0) {
      options.push(yearOptions);
    }

    return options;
  }, [yearOptions, monthOptions, daysOptions]);

  const allValues: OutputDatePickerValues = useMemo(() => {
    if (minUnit === 'month') {
      return [monthValue, yearValue];
    }
    if (minUnit === 'year') {
      return [yearValue];
    }
    return [dayValue, monthValue, yearValue];
  }, [dayValue, monthValue, yearValue, minUnit]);

  const handleSave = useCallback(
    (values: (string | number)[]) => {
      onChange(values as [number]);
    },
    [onChange],
  );

  const handlePickerChange = useCallback(
    (values: (string | number)[]) => {
      setChosenDayOption(getOptionByValue(values.at(-3) as number, daysOptions));
      setChosenMonthOption(getOptionByValue(values.at(-2) as number, monthOptions));
      setChosenYearOption(getOptionByValue(values.at(-1) as number, yearOptions));
    },
    [yearOptions, monthOptions, daysOptions],
  );

  const renderPicker: NonNullable<DropdownProps['renderPicker']> = ({ ref, onDismiss }) => {
    return (
      <MultiRollerPicker
        options={allOptions}
        ref={ref}
        saveButtonLabel={saveButtonLabel}
        title={title}
        values={allValues}
        onChange={handlePickerChange}
        onDismiss={onDismiss}
        onSave={values => {
          handleSave(values);
          ref.current?.dismiss();
        }}
      />
    );
  };

  return (
    <Dropdown
      Icon={Icon}
      inputValue={getInputValue(values)}
      renderPicker={renderPicker}
      {...textInputProps}
    />
  );
};
