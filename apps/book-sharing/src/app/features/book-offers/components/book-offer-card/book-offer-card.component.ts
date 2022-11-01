import {
  deliveryTypeToText,
  offerTypeToText,
} from '@book-sharing/api-interfaces';
import { SharedModule } from '@shared/shared.module';
import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { BookOfferModel } from '@book-sharing/api-interfaces';

@Component({
  standalone: true,
  imports: [CommonModule, SharedModule],
  selector: 'app-book-offer-card, [appBookOfferCard]',
  templateUrl: './book-offer-card.component.html',
  styleUrls: ['./book-offer-card.component.scss'],
})
export class BookOfferCardComponent {
  @Input() bookOffer: BookOfferModel;

  @Input() hasCollectionButton = false;

  @Input() hasChangeButton = false;

  @Input() inCollection = false;

  @Input() isShowUserInfo = true;

  @Input() hasExchangeButton = true;

  @Output() changeButtonClick = new EventEmitter<BookOfferModel>();

  @Output() collectionButtonClick = new EventEmitter<number>();

  @Output() detailsClick = new EventEmitter<number>();

  @Output() exchangeClick = new EventEmitter<number>();

  get deliveryType(): string {
    return deliveryTypeToText(this.bookOffer.deliveryType);
  }

  get offerType(): string {
    return offerTypeToText(this.bookOffer.offerType);
  }

  get pictureStyles() {
    return {
      background: `url(${this.bookOffer.book.pictures[0].url})`,
      backgroundColor: '#ccc',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
    };
  }

  onClickChangeButton() {
    this.changeButtonClick.emit(this.bookOffer);
  }

  onClickDetails() {
    this.detailsClick.emit(this.bookOffer.id);
  }

  onClickCollectionButton() {
    this.collectionButtonClick.emit(this.bookOffer.id);
  }

  onClickExchangeButton() {
    this.exchangeClick.emit(this.bookOffer.id);
  }
}
