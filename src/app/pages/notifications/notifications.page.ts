import { Component, OnInit, ViewChild } from "@angular/core";
import { NotificationService } from "src/app/services/notification.service";
import { AlertController } from "@ionic/angular";
import { IonInfiniteScroll } from "@ionic/angular";
import { LoginService } from "src/app/services/login.service";

@Component({
  selector: "app-notifications",
  templateUrl: "./notifications.page.html",
  styleUrls: ["./notifications.page.scss"],
})
export class NotificationsPage implements OnInit {
  notifications = null;
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  constructor(
    private _NotificationService: NotificationService,
    public alertController: AlertController,
    private _LoginService: LoginService
  ) {
    this.getNotifications();
  }

  ngOnInit() {}

  getNotifications(event = null, page = null, clearOld = true) {
    this._NotificationService.getNotifications(page).subscribe((res) => {
      if (clearOld) {
        this.notifications = res.data;
      } else {
        this.notifications.data.push(...res.data.data);
      }
      if (event) {
        event.target.complete();
      }
    });
  }
  doRefresh(event) {
    this.infiniteScroll.disabled = false;
    this.getNotifications(event);
  }
  deleteNotification(notification) {
    this._NotificationService.deleteNotifications(notification.id).subscribe(
      (res) => {
        this.presentAlert(res.message, "Success");
        this.getNotifications();
      },
      (err) => {
        this.presentAlert(`Couldn't delete notification`, "Failed");
      }
    );
  }
  async presentAlert(msg, title: string) {
    const alert = await this.alertController.create({
      header: title,
      message: msg,
      buttons: ["OK"],
    });

    await alert.present();
  }
  loadData(event) {
    if (this.notifications.current_page == this.notifications.last_page) {
      event.target.disabled = true;
    } else {
      this._NotificationService
        .getNotifications(this.notifications.current_page + 1)
        .subscribe((res) => {
          this._LoginService.changeUser(this._LoginService.currentUserObject);
          this.notifications = Object.assign({}, res.data, {
            data: [...this.notifications.data, ...res.data.data],
          });
          event.target.complete();
        });
    }
  }
}
