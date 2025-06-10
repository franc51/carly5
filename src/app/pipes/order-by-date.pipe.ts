import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'orderByDate' })
export class OrderByDatePipe implements PipeTransform {
  transform(items: any[]): any[] {
    if (!items) return [];
    return items.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }
}
