import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  DeliveryTypes,
  stringifyDeliveryTypes,
  OfferType,
  stringifyOfferType,
  BookOfferSearchParams,
  LocationRegion,
  stringifyLocationRegion,
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

  readonly stringifyLocationRegion = stringifyLocationRegion;

  readonly deliveryTypeTexts = Object.values(DeliveryTypes);

  readonly offerTypeTexts = Object.values(OfferType);

  readonly locationRegionTexts = Object.values(LocationRegion);

  private readonly defaultSearchParams: Omit<BookOfferSearchParams, 'text'> = {
    isActive: true,
    deliveryType: null,
    offerType: null,
    region: null,
  };

  @Output() filterChanges = new EventEmitter<
    Omit<BookOfferSearchParams, 'text'>
  >();

  constructor() {
    this.deliveryTypeTexts.push('' as DeliveryTypes);
    this.offerTypeTexts.push('' as OfferType);
    this.locationRegionTexts.push('' as LocationRegion);
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
      deliveryType: new FormControl(this.defaultSearchParams.deliveryType),
      offerType: new FormControl(this.defaultSearchParams.offerType),
      isActive: new FormControl(this.defaultSearchParams.isActive),
      region: new FormControl(this.defaultSearchParams.region),
    });
  }
}
