import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from "@angular/router";
import { Observable } from "rxjs";
import { LoginService } from "../services/login.service";
import { NativeStorage } from "@ionic-native/native-storage/ngx";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    protected router: Router,
    protected _LoginService: LoginService,
    protected nativeStorage: NativeStorage
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> {
    let url: string = state.url;
    const currentUser = this._LoginService.currentUserObject;
    return this.checkLogin(currentUser, url, route);
  }
  checkLogin(
    currentUser: any,
    url: string = "/",
    route: ActivatedRouteSnapshot
  ): Promise<boolean> {
    return this.nativeStorage.getItem("Token").then(
      (data) => {
        if (currentUser?.is_admin !== 1 && route.data.roles === "admin") {
          this.router.navigate(["/"]);
          return false;
        }
        this._LoginService.redirectUrl = url;
        // authorised so return true
        return true;
      },
      (err) => {
        // Navigate to the login page with extras
        this.router.navigate(["/login"]);
        return false;
      }
    );
  }
}
