import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ServiceProviders } from './services';
import { InterceptorProviders } from './interceptors';

@NgModule({
  imports: [HttpClientModule],
  providers: [...ServiceProviders, ...InterceptorProviders],
})
export class CoreModule {}
