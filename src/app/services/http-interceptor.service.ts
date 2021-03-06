import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

  constructor(private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    if (token) {
      request = request.clone({
        headers: request.headers.set('Authorization', token)
      });
    }
    return next.handle(request).pipe(tap(
      event => {
        // manipulate successful responses
      },
      error => {
        if (error instanceof HttpErrorResponse) {
          if (error.status == 401) {
            console.error(error.message);
            this.router.navigate(['/login']);
          }
        }
      }
    ));
  }

}
