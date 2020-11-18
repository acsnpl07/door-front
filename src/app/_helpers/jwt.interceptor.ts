import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from "@angular/common/http";
import { from, Observable } from "rxjs";
import { catchError, switchMap } from "rxjs/operators";
import { NativeStorage } from "@ionic-native/native-storage/ngx";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private nativeStorage: NativeStorage) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available

    return from(this.nativeStorage.getItem("Token")).pipe(
      switchMap((data) => {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${data}`,
          },
        });
        return next.handle(request);
      }),
      catchError((err) => next.handle(request))
    );
  }
}
