import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'tsToDate'
})
export class TimestampToDatePipe implements PipeTransform {
    transform(timestamp: { seconds: number, nanoseconds: number }): string {
        const milliseconds = timestamp?.seconds * 1000 + Math.floor(timestamp?.nanoseconds / 1e6);
        const date = new Date(milliseconds);
        return date.toDateString();
    }
}