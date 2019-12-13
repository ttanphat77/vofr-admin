import {DatePipe} from '@angular/common';

export const sortDate = (direction: any, a: string, b: string): number => {
  const aDate = new Date(a);
  const bDate = new Date(b);
  const first = Number(new DatePipe('en-US').transform(aDate, 'yyyyMMddHHmmss'));
  const second = Number(new DatePipe('en-US').transform(bDate, 'yyyyMMddHHmmss'));
  if (first < second) {
    return -1 * direction;
  }
  if (first > second) {
    return direction;
  }
  return 0;
};

export const sortName = (direction: any, a: string, b: string): number => {
  if (a < b) {
    return -1 * direction;
  }
  if (a > b) {
    return direction;
  }
  return 0;
};
