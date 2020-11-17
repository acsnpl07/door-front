import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { LoginService } from "../services/login.service";

@Component({
  selector: "app-tabs",
  templateUrl: "tabs.page.html",
  styleUrls: ["tabs.page.scss"],
})
export class TabsPage {
  user: any = "";
  constructor(private router: Router, private _LoginService: LoginService) {
    this._LoginService.getUser().subscribe((user) => {
      this._LoginService.changeUser(user);
      this.user = user;
    });
  }
  logout() {
    this._LoginService.logout();
  }
}
