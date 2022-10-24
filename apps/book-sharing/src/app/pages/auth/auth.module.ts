import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { AppRoutes } from '@core/values';
import { AuthFormComponent } from '@features/auth';
import { SharedModule } from '@shared/shared.module';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: AppRoutes.SIGN_IN,
  },
  {
    path: AppRoutes.SIGN_IN,
    component: SigninComponent,
  },
  {
    path: AppRoutes.SIGN_UP,
    component: SignupComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), AuthFormComponent, SharedModule],
  exports: [RouterModule],
  declarations: [SigninComponent, SignupComponent],
})
export class AuthModule {}
