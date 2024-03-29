import { AppRoutes } from '@core/values';
import { Router } from '@angular/router';
import { LoadingService, AlertService } from '@core/services';
import { UserModel, BookOfferModel, User } from '@book-sharing/api-interfaces';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { UserInfoFacade } from '../services/user-info.facade';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent implements OnInit, OnDestroy {
  private readonly subscriptions = new Subscription();

  user: UserModel;

  bookOffers: BookOfferModel[];

  constructor(
    private readonly loadingService: LoadingService,
    private readonly alertService: AlertService,
    private readonly userInfoFacade: UserInfoFacade,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.fetchUserInfo();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  private fetchUserInfo() {
    this.loadingService.setLoading(true);

    this.subscriptions.add(
      this.userInfoFacade.getUserInfoWithOffers().subscribe({
        next: ({ user, bookOffers }) => {
          this.user = user;
          this.bookOffers = bookOffers;
          this.loadingService.setLoading(false);
        },
        error: ({ status }: HttpErrorResponse) => {
          this.alertService.showError(`Произошла ошибка ${status}`);
          this.loadingService.setLoading(false);
        },
      })
    );
  }

  navigateToCreateBookOffer() {
    this.router.navigate([AppRoutes.PROFILE, AppRoutes.CREATE], {
      state: { type: 'create' },
    });
  }

  navigateToChangeBookOffer(bookOffer: BookOfferModel) {
    this.router.navigate([AppRoutes.PROFILE, AppRoutes.CREATE], {
      state: { type: 'edit', bookOffer },
    });
  }

  navigateToChangeUserInfo(user: User) {
    this.router.navigate([AppRoutes.PROFILE, AppRoutes.CHANGE_INFO], {
      state: { user },
    });
  }

  navigateToOfferDetails(id: number) {
    this.router.navigate([AppRoutes.BOOK_OFFER, id]);
  }

  logout() {
    this.loadingService.setLoading(true);

    this.subscriptions.add(
      this.userInfoFacade.logout().subscribe({
        next: () => {
          this.router.navigate([AppRoutes.MAIN]);
          this.loadingService.setLoading(false);
        },
        error: ({ status }: HttpErrorResponse) => {
          this.alertService.showError(
            `Произошла ошибка при выходе из аккаунта ${status}`
          );
          this.loadingService.setLoading(false);
        },
      })
    );
  }
}
