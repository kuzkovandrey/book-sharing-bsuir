import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TuiAlertModule, TuiDialogModule, TuiRootModule } from '@taiga-ui/core';
import { AppRoutingModule } from './app-routing.module';
import { TuiLoaderModule } from '@taiga-ui/core';
import { AppComponent } from './app.component';
import { SharedModule } from './shared';
import { CoreModule } from './core';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    TuiRootModule,
    TuiAlertModule,
    TuiDialogModule,
    AppRoutingModule,
    SharedModule,
    TuiLoaderModule,
    CoreModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
