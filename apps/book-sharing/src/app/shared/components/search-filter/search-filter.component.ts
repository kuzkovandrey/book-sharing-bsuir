import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  DeliveryTypes,
  stringifyDeliveryTypes,
  OfferType,
  stringifyOfferType,
  BookOfferSearchParams,
} from '@book-sharing/api-interfaces';
import {
  Component,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter,
} from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search-filter, [appSearchFilter]',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.scss'],
})
export class SearchFilterComponent implements OnInit, OnDestroy {
  private readonly subscriptions = new Subscription();

  readonly fieldSize = 'm';

  filterForm: FormGroup;

  readonly stringifyDeliveryTypes = stringifyDeliveryTypes;

  readonly stringifyOfferType = stringifyOfferType;

  readonly deliveryTypeTexts = Object.values(DeliveryTypes);

  readonly offerTypeTexts = Object.values(OfferType);

  private readonly defaultSearchParams: Omit<BookOfferSearchParams, 'text'> = {
    isActive: true,
    deliveryType: DeliveryTypes.MAILING,
    offerType: OfferType.FREE,
  };

  @Output() filterChanges = new EventEmitter<
    Omit<BookOfferSearchParams, 'text'>
  >();

  constructor() {
    this.deliveryTypeTexts.push('' as DeliveryTypes);
    this.offerTypeTexts.push('' as OfferType);
  }

  ngOnInit(): void {
    this.initFilterForm();

    this.subscriptions.add(
      this.filterForm.valueChanges.subscribe((values) => {
        this.filterChanges.emit(values);
      })
    );

    this.filterChanges.emit(this.defaultSearchParams);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private initFilterForm() {
    this.filterForm = new FormGroup({
      deliveryType: new FormControl(DeliveryTypes.MAILING),
      offerType: new FormControl(OfferType.FREE),
      isActive: new FormControl(true),
    });
  }
}
