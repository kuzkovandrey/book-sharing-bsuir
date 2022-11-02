import { Pipe, PipeTransform } from '@angular/core';
import {
  ExchangeStatus,
  exchangeStatusToText,
} from '@book-sharing/api-interfaces';

@Pipe({
  standalone: true,
  name: 'exchangeStatusToText',
})
export class ExchangeStatusToTextPipe implements PipeTransform {
  transform(status: ExchangeStatus): string {
    return exchangeStatusToText(status);
  }
}
