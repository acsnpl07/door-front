import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { CookieService } from "ngx-cookie-service";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";
import { environment } from "../../environments/environment";
@Injectable({
  providedIn: "root",
})
export class LoginService {
  redirectUrl = "/";
  constructor(
    private _HttpClient: HttpClient,
    private _CookieService: CookieService,
    private router: Router
  ) {}
  public loginUser(email: string, password: string): Observable<any> {
    return this._HttpClient
      .post(
        `${environment.api}/api/login`,
        {
          email: email,
          password: password,
        },
        { responseType: "json" }
      )
      .pipe(
        map((response) => {
          console.log(response);
          if (response) {
            this._CookieService.set("Token", response["token"]);
            this.router.navigate([this.redirectUrl]);
          }
        })
      );
  }
  public logout() {
    this._CookieService.delete("Token");
  }
}
