import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HTTP_INTERCEPTORS} from '@angular/common/http'
import {CredentialsInterceptor} from 'src/app/core/interceptors/credential.interceptor'


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: CredentialsInterceptor, multi: true}]
})
export class CoreModule {
}
