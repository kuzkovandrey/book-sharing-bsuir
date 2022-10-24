import { AuthDto } from '@book-sharing/api-interfaces';
import { Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppRoutes } from '@core/values';
import { AlertService, LoadingService } from '@core/services';
import { AuthService } from '@features/auth';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnDestroy {
  private readonly subscriptions = new Subscription();

  constructor(
    private router: Router,
    private loadingService: LoadingService,
    private authService: AuthService,
    private alertService: AlertService
  ) {}

  navigateToSignIn() {
    this.router.navigate([AppRoutes.AUTH, AppRoutes.SIGN_IN]);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  signup(authDto: AuthDto) {
    this.loadingService.setLoading(true);

    this.subscriptions.add(
      this.authService.signup(authDto).subscribe({
        next: () => {
          this.router.navigate([AppRoutes.PROFILE]);
          this.loadingService.setLoading(false);
        },
        error: (e: HttpErrorResponse) => {
          this.loadingService.setLoading(false);
          this.alertService.showError(`Произошла ошибка ${e.status}`);
        },
      })
    );
  }
}
