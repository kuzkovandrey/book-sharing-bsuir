import { Provider } from '@angular/core';

import { AlertService } from './alert.service';
import { LoadingService } from './loading.service';
import { ModalDialogService } from './modal-dialog.service';
import { AppStorage, AppStorageService } from './storage';

export const ServiceProviders: Provider[] = [
  AlertService,
  LoadingService,
  ModalDialogService,
  {
    provide: AppStorageService,
    useFactory: () => new AppStorage(localStorage),
  },
];
