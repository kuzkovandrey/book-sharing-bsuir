import { AlertService } from '@core/services/alert.service';
import { AuthDto } from '@book-sharing/api-interfaces';
import { AuthService } from '@features/auth';
import { LoadingService } from '@core/services';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppRoutes } from '@core/values';
import { Subscription, switchMap } from 'rxjs';
import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';

@Component({
  selector: 'signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit, OnDestroy {
  private readonly subscriptions = new Subscription();

  constructor(
    private router: Router,
    private loadingService: LoadingService,
    private authService: AuthService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.loadingService.setLoading(false);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  navigateToSignUp() {
    this.router.navigate([AppRoutes.AUTH, AppRoutes.SIGN_UP]);
  }

  signin(authDto: AuthDto) {
    this.loadingService.setLoading(true);

    this.subscriptions.add(
      this.authService.signin(authDto).subscribe({
        next: () => {
          this.router.navigate([AppRoutes.PROFILE]);
          this.loadingService.setLoading(false);
        },
        error: ({ status }: HttpErrorResponse) => {
          this.loadingService.setLoading(false);

          if (status === HttpStatusCode.BadRequest) {
            this.alertService.showError(`Неправльный логин или пароль`);
          } else {
            this.alertService.showError(`Произошла ошибка ${status}`);
          }
        },
      })
    );
  }
}
