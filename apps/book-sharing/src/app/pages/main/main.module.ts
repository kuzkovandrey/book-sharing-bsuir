import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { MainComponent } from './main.component';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), CommonModule],
  exports: [RouterModule],
  declarations: [MainComponent],
  providers: [],
})
export class MainModule {}
