import { AuthDto } from '@book-sharing/api-interfaces';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TuiInputModule } from '@taiga-ui/kit';
import { TuiInputPasswordModule } from '@taiga-ui/kit';
import { TuiTextfieldControllerModule } from '@taiga-ui/core';
import { TuiButtonModule } from '@taiga-ui/core';

@Component({
  selector: 'auth-form, [authForm]',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TuiInputModule,
    TuiInputPasswordModule,
    TuiTextfieldControllerModule,
    TuiButtonModule,
  ],
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthFormComponent {
  @Input() type: 'signin' | 'signup' = 'signin';

  @Output() onSubmit = new EventEmitter<AuthDto>();

  form: FormGroup;

  constructor() {
    this.initForm();
  }

  get isShowEmailField(): boolean {
    return this.type === 'signup';
  }

  get buttonText(): string {
    return this.type === 'signup' ? 'Зарегистрировааться' : 'Войти';
  }

  get isValidForm(): boolean {
    return this.type && this.type === 'signin'
      ? this.isValidSignin
      : this.isValidSignup;
  }

  private get isValidSignin(): boolean {
    return (
      this.form.controls['username'].valid &&
      this.form.controls['password'].valid
    );
  }

  private get isValidSignup(): boolean {
    return (
      this.form.controls['username'].valid &&
      this.form.controls['password'].valid &&
      this.form.controls['email'].valid
    );
  }

  private initForm() {
    this.form = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  submitForm() {
    this.onSubmit.emit(this.form.value);
  }
}
