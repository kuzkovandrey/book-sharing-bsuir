import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BookOfferModel } from '@book-sharing/api-interfaces';

@Component({
  selector: 'app-offer-details',
  templateUrl: './offer-details.component.html',
  styleUrls: ['./offer-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OfferDetailsComponent {
  @Input() bookOffer: BookOfferModel;
}
