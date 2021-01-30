import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { LoginService } from "../services/login.service";
import { NotificationService } from "../services/notification.service";

@Component({
  selector: "app-tabs",
  templateUrl: "tabs.page.html",
  styleUrls: ["tabs.page.scss"],
})
export class TabsPage {
  user: any = null;
  notificationsNumber: any = null;
  constructor(
    public router: Router,
    private _LoginService: LoginService,
    private _NotificationService: NotificationService
  ) {
    this.getUser();
    this.getNotificationsNumber();
  }
  getUser() {
    this._LoginService.currentUser?.subscribe((user) => {
      this.user = user;
    });
  }
  getNotificationsNumber() {
    this._NotificationService.getNotificationsCount().subscribe((res) => {
      this.notificationsNumber = res.notification_count;
    });
  }
  logout() {
    this._LoginService.logout();
  }
}
