import { toDate } from 'date-fns';

export const getDateValue = (date: Date | number) => toDate(date).valueOf();
