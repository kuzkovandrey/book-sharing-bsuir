import { LoadingService } from '@core/services';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'book-sharing-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  readonly isLoading$: Observable<boolean>;

  constructor(loadingService: LoadingService) {
    this.isLoading$ = loadingService.loading$;
  }
}
