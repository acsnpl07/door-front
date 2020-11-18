import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

import { LoginService } from "../services/login.service";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private _LoginService: LoginService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 403) {
          // auto logout if 403 response returned from api
          this._LoginService.logout();
        }

        return throwError(err);
      })
    );
  }
}
