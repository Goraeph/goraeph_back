import * as moment from 'moment';

export enum DateFormatEnum {
  Datetime = `LLL`,
}

export function format(formatedValue: string) {
  return moment().format(formatedValue);
}
