import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { TuiDialogContext } from '@taiga-ui/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { BookOfferModel } from '@book-sharing/api-interfaces';
import { TuiStringHandler } from '@taiga-ui/cdk';
import { tuiItemsHandlersProvider } from '@taiga-ui/kit';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AppRoutes } from '@core/values';

export interface CreateExchangeInput {
  id: number;
  userOffers: BookOfferModel[];
}

export interface CreateExchangeOutput {
  fromOfferId: number;
  toOfferId: number;
}

const STRINGIFY_BOOK_OFFER: TuiStringHandler<BookOfferModel> = (
  offer: BookOfferModel
) => `${offer.book.title} (# ${offer.id})`;

@Component({
  standalone: true,
  imports: [CommonModule, SharedModule],
  selector: 'app-create-exchange-modal',
  templateUrl: './create-exchange-modal.component.html',
  styleUrls: ['./create-exchange-modal.component.scss'],
  providers: [tuiItemsHandlersProvider({ stringify: STRINGIFY_BOOK_OFFER })],
})
export class CreateExchangeModalComponent {
  private readonly offerId: number;

  readonly userOfferList: BookOfferModel[];

  readonly offerController = new FormControl<BookOfferModel>(null);

  constructor(
    @Inject(POLYMORPHEUS_CONTEXT)
    private readonly context: TuiDialogContext<
      CreateExchangeOutput,
      CreateExchangeInput
    >,
    private router: Router
  ) {
    this.userOfferList = context.data?.userOffers ?? [];
    this.offerId = context.data.id;
  }

  navigateToProfile() {
    this.context.completeWith(null);
    this.router.navigate([AppRoutes.PROFILE]);
  }

  onClickExchangeButton() {
    this.context.completeWith({
      toOfferId: this.offerId,
      fromOfferId: this.offerController.value.id,
    });
  }
}
