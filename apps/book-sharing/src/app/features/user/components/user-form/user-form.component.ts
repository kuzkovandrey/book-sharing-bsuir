import { CreateUserDto, UserModel } from '@book-sharing/api-interfaces';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

@Component({
  standalone: true,
  imports: [CommonModule, SharedModule],
  selector: 'app-user-form, [appUserForm]',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent implements OnInit {
  readonly fieldSize = 's';

  @Input() initialData: UserModel;

  @Output() onClickChangeButton = new EventEmitter<
    Partial<Omit<CreateUserDto, 'refreshToken'>>
  >();

  form: FormGroup;

  telephoneControl = new FormControl('', [Validators.required]);

  telephones: string[] = [];

  constructor() {}

  ngOnInit() {
    this.initForm();

    if (this.initialData) {
      const { username, email, telephones } = this.initialData;

      this.form.get('username').setValue(username);
      this.form.get('email').setValue(email);
      this.telephones = telephones.map(
        ({ telephoneNumber }) => telephoneNumber
      );
    }
  }

  private initForm() {
    this.form = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl(''),
    });
  }

  removeTel(index: number) {
    this.telephones.splice(index, 1);
  }

  addTel() {
    this.telephones.push(this.telephoneControl.value);
    this.telephoneControl.reset();
  }

  onCLickChanges() {
    this.onClickChangeButton.emit({
      ...this.form.value,
      telephones: this.telephones,
    });
  }
}
