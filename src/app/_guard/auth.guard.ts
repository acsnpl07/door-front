import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from "@angular/router";
import { Observable } from "rxjs";
import { LoginService } from "../services/login.service";
import { CookieService } from "ngx-cookie-service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    protected router: Router,
    protected _LoginService: LoginService,
    private _CookieService: CookieService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    let url: string = state.url;
    const currentUser = this._LoginService.currentUserObject;
    return this.checkLogin(currentUser, url, route);
  }
  checkLogin(
    currentUser: any,
    url: string = "/",
    route: ActivatedRouteSnapshot
  ): boolean {
    if (this._CookieService.check("Token")) {
      if (currentUser?.is_admin !== 1 && route.data.roles === "admin") {
        this.router.navigate(["/"]);
        return false;
      }

      // Store the attempted URL for redirecting
      this._LoginService.redirectUrl = url;

      // authorised so return true
      return true;
    }

    // Navigate to the login page with extras
    this.router.navigate(["/login"]);
    return false;
  }
}
