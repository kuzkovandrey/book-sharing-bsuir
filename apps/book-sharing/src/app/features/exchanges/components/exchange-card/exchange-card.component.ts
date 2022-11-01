import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import {
  ExchangeModel,
  exchangeStatusToText,
} from '@book-sharing/api-interfaces';

@Component({
  selector: 'app-exchange-card, [appExchangeCard]',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './exchange-card.component.html',
  styleUrls: ['./exchange-card.component.scss'],
})
export class ExchangeCardComponent {
  @Input() exchange: ExchangeModel;

  @Input() isShowExchangeButtons = true;

  @Output() clickExchangeButton = new EventEmitter<boolean>();

  get from() {
    return this.exchange.from;
  }

  get to() {
    return this.exchange.to;
  }

  get status(): string {
    return `Статус: ${exchangeStatusToText(this.exchange.status)}`;
  }

  onClickButton(isAgree: boolean) {
    this.clickExchangeButton.emit(isAgree);
  }
}
