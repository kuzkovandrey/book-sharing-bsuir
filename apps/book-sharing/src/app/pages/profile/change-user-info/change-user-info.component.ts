import { HttpErrorResponse } from '@angular/common/http';
import { AppRoutes } from '@core/values';
import { AlertService } from '@core/services/alert.service';
import { LoadingService } from '@core/services/loading.service';
import { Router } from '@angular/router';
import { Component, OnDestroy } from '@angular/core';
import { CreateUserDto, UserModel } from '@book-sharing/api-interfaces';
import { UserInfoFacade } from '../services/user-info.facade';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-change-user-info',
  templateUrl: './change-user-info.component.html',
  styleUrls: ['./change-user-info.component.scss'],
  providers: [UserInfoFacade],
})
export class ChangeUserInfoComponent implements OnDestroy {
  private readonly subscriptions = new Subscription();

  readonly user: UserModel;

  constructor(
    private router: Router,
    private userInfoFacade: UserInfoFacade,
    private loadingService: LoadingService,
    private alertService: AlertService
  ) {
    const { user } = this.router.getCurrentNavigation().extras.state as {
      user: UserModel;
    };
    if (user) this.user = user;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  changeInfo(changes: Partial<Omit<CreateUserDto, 'refreshToken'>>) {
    this.loadingService.setLoading(true);

    this.subscriptions.add(
      this.userInfoFacade.changeUserInfo(changes).subscribe({
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
}
