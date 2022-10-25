import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { MainComponent } from './main.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { BookOfferCardComponent } from '@features/book-offers/components/book-offer-card/book-offer-card.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule,
    BookOfferCardComponent,
  ],
  exports: [RouterModule],
  declarations: [MainComponent],
  providers: [],
})
export class MainModule {}
