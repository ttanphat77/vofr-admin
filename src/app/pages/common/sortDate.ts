import { DatePipe } from '@angular/common';

export const sortDate = (direction: any, a: string, b: string): number => {
    const aDate = new Date(a);
    const bDate = new Date(b);
    let first = Number(new DatePipe('en-US').transform(aDate, 'yyyyMMdd'));
    let second = Number(new DatePipe('en-US').transform(bDate, 'yyyyMMdd'));
    if (first < second) {
        return -1 * direction;
    }
    if (first > second) {
        return direction;
    }
    return 0;
}