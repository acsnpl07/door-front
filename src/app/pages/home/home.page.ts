import { Component } from "@angular/core";
import { LogService } from "src/app/services/log.service";
import { LoadingController, AlertController } from "@ionic/angular";
import { DoorService } from "src/app/services/door.service";
import { LoginService } from "src/app/services/login.service";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage {
  logs: any = null;
  constructor(
    private _LogService: LogService,
    private _DoorService: DoorService,
    private _LoginService: LoginService,
    public loadingController: LoadingController,
    public alertController: AlertController
  ) {
    this.getLogs();
  }
  handlePageChange(p) {
    this.getLogs(p);
  }
  doRefresh(event) {
    this._LoginService.changeUser(this._LoginService.currentUserObject);
    this._LogService.getLog().subscribe((logs) => {
      this.logs = logs;
      event.target.complete();
    });
  }
  getLogs(page: number = null) {
    this._LogService.getLog(page).subscribe((logs) => {
      this.logs = logs;
    });
  }
  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: "my-custom-class",
      message: "Please wait...",
    });
    await loading.present();
    this._DoorService.openDoor().subscribe(
      (res) => {
        this.presentAlert(res.message, "Door");
        this.loadingController.dismiss();
      },
      (err) => {
        this.presentAlert("Couldn't open door", "Door");
        this.loadingController.dismiss();
      }
    );
  }
  async presentAlert(msg, title) {
    const alert = await this.alertController.create({
      header: title,
      message: msg,
      buttons: ["OK"],
    });

    await alert.present();
  }

  ngOnInit() {}
}
