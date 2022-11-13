import {Injectable} from '@angular/core'
import {HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest} from '@angular/common/http'
import {Observable} from 'rxjs'
import {environment} from 'src/environments/environment'

@Injectable()
export class CredentialsInterceptor implements HttpInterceptor {
  constructor() {
  }

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    req = req.clone({
      headers: new HttpHeaders().append('api-key', environment['api-key']),
      withCredentials: true,
    })
    return next.handle(req)
  }
}
