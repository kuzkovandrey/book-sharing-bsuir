import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TuiAlertModule, TuiDialogModule, TuiRootModule } from '@taiga-ui/core';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent, NxWelcomeComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    TuiRootModule,
    TuiAlertModule,
    TuiDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
