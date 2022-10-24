import { HttpErrorResponse } from '@angular/common/http';
import { AppRoutes } from '@core/values';
import { BookOffersService } from '@features/book-offers/services/book-offers.services';
import { AlertService } from '@core/services/alert.service';
import { LoadingService } from '@core/services/loading.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  CreateBookOfferDto,
  Author,
  DeliveryTypes,
  OfferType,
  offerTypeToText,
  deliveryTypeToText,
  BookOfferModel,
} from '@book-sharing/api-interfaces';
import { Router } from '@angular/router';

import { Subscription } from 'rxjs';

export type CreateBookOfferModalType = 'create' | 'edit';

export interface CreateBookOfferModalInputContext {
  type: CreateBookOfferModalType;
}

export interface CreateBookOfferModalOutputContext {
  bookOffer: CreateBookOfferDto;
}

@Component({
  selector: 'app-create-book-offer',
  templateUrl: './create-book-offer.component.html',
  styleUrls: ['./create-book-offer.component.scss'],
})
export class CreateBookOfferComponent implements OnDestroy {
  private readonly subscription = new Subscription();

  readonly stringifyDeliveryTypes = (type: DeliveryTypes) =>
    deliveryTypeToText(type);

  readonly stringifyOfferType = (type: OfferType) => offerTypeToText(type);

  readonly fieldSize = 's';

  readonly deliveryTypeTexts = Object.values(DeliveryTypes);

  readonly offerTypeTexts = Object.values(OfferType);

  authors: Array<Author> = [];

  pictures: Array<string> = [];

  type: CreateBookOfferModalType;

  offerForm: FormGroup;

  pictureForm: FormGroup;

  authorForm: FormGroup;

  get isValidForm(): boolean {
    return (
      !!this.authors.length && !!this.pictures.length && this.offerForm.valid
    );
  }

  get isValidEditForm(): boolean {
    return (
      this.offerForm.get('info').valid &&
      this.offerForm.get('isActive').valid &&
      this.offerForm.get('deliveryType').valid &&
      this.offerForm.get('offerType').valid
    );
  }

  get formButtonText(): string {
    return this.type && this.type === 'edit' ? 'Изменить' : 'Создать';
  }

  get isShowBookForm(): boolean {
    return this.type !== 'edit';
  }

  private readonly bookOffer: BookOfferModel;

  constructor(
    private router: Router,
    private loadingService: LoadingService,
    private alertService: AlertService,
    private bookOffersService: BookOffersService
  ) {
    this.initForms();

    const state = router.getCurrentNavigation().extras?.state as {
      type: CreateBookOfferModalType;
      bookOffer: BookOfferModel;
    };

    this.type = state?.type ?? 'create';

    if (this.type === 'edit') {
      this.bookOffer = state.bookOffer;
      const { info, isActive, deliveryType, offerType } = this.bookOffer;

      this.offerForm.get('info').setValue(info);
      this.offerForm.get('isActive').setValue(isActive);
      this.offerForm.get('deliveryType').setValue(deliveryType);
      this.offerForm.get('offerType').setValue(offerType);
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private resetAuthorForm() {
    this.authorForm.reset();
    this.authorForm.markAsUntouched();
  }

  private resetPictureForm() {
    this.pictureForm.reset();
    this.pictureForm.markAsUntouched();
  }

  addAuthor() {
    this.authors.push(
      new Author(
        this.authorForm.value.firstName,
        this.authorForm.value.lastName
      )
    );

    this.resetAuthorForm();
  }

  addPicture() {
    this.pictures.push(this.pictureForm.value.url);

    this.resetPictureForm();
  }

  removeAuthor(id: number) {
    this.authors.splice(id, 1);
  }

  removePicture(id: number) {
    this.pictures.splice(id, 1);
  }

  private initForms() {
    this.authorForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
    });

    this.pictureForm = new FormGroup({
      url: new FormControl('', [Validators.required]),
    });

    this.offerForm = new FormGroup({
      book: new FormGroup({
        title: new FormControl('', [
          Validators.required,
          Validators.minLength(4),
        ]),
        description: new FormControl('', [
          Validators.required,
          Validators.minLength(10),
        ]),
        pageCount: new FormControl(null, [
          Validators.required,
          Validators.min(1),
          Validators.max(3000),
        ]),
        publicationYear: new FormControl(null, [
          Validators.required,
          Validators.min(1800),
          Validators.max(new Date().getFullYear()),
        ]),
        language: new FormControl('', [
          Validators.required,
          Validators.minLength(4),
        ]),
        genre: new FormControl('', [
          Validators.required,
          Validators.minLength(3),
        ]),
        publisher: new FormControl('', [
          Validators.required,
          Validators.minLength(4),
        ]),
      }),
      info: new FormControl('', [Validators.required, Validators.minLength(4)]),
      isActive: new FormControl(true),
      deliveryType: new FormControl<DeliveryTypes>(
        DeliveryTypes.COME_YOURSELF,
        [Validators.required]
      ),
      offerType: new FormControl<OfferType>(OfferType.FREE, [
        Validators.required,
      ]),
    });
  }

  private getBookOfferForm(): CreateBookOfferDto {
    const offer: CreateBookOfferDto = this.offerForm.value;
    offer.book.authors = this.authors;
    offer.book.pictures = this.pictures;

    return {
      ...offer,
    };
  }

  private createBookOffer() {
    this.loadingService.setLoading(true);

    this.subscription.add(
      this.bookOffersService.create(this.getBookOfferForm()).subscribe({
        next: () => {
          this.router.navigate([AppRoutes.PROFILE]);
          this.loadingService.setLoading(false);
        },
        error: ({ status }: HttpErrorResponse) => {
          this.alertService.showError(`Ошибка сохранения ${status}`);
          this.loadingService.setLoading(false);
        },
      })
    );
  }

  private editBookOffer() {
    this.loadingService.setLoading(true);

    this.subscription.add(
      this.bookOffersService
        .changeValues(this.bookOffer.id, { ...this.offerForm.value })
        .subscribe({
          next: () => {
            this.router.navigate([AppRoutes.PROFILE]);
            this.loadingService.setLoading(false);
          },
          error: ({ status }: HttpErrorResponse) => {
            this.alertService.showError(`Ошибка изменения данных ${status}`);
            this.loadingService.setLoading(false);
          },
        })
    );
  }

  onSubmitForm() {
    if (this.type === 'edit') {
      this.editBookOffer();
    } else {
      this.createBookOffer();
    }
  }
}
