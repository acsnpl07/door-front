import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { LoginService } from "../services/login.service";

@Component({
  selector: "app-tabs",
  templateUrl: "tabs.page.html",
  styleUrls: ["tabs.page.scss"],
})
export class TabsPage {
  user: any = null;
  constructor(private router: Router, private _LoginService: LoginService) {
    this._LoginService.currentUser.subscribe((user) => {
      this.user = user;
    });
  }
  logout() {
    this._LoginService.logout();
  }
}
