import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { LoginService } from "src/app/services/login.service";
import { AlertController } from "@ionic/angular";

@Component({
  selector: "app-admin-dashboard",
  templateUrl: "./admin-dashboard.page.html",
  styleUrls: ["./admin-dashboard.page.scss"],
})
export class AdminDashboardPage implements OnInit {
  user = {
    name: "",
    password: "",
    email: "",
    password_confirm: "",
  };
  constructor(
    private _LoginService: LoginService,
    public alertController: AlertController
  ) {}
  async presentAlert(msg, title) {
    const alert = await this.alertController.create({
      header: title,
      message: msg,
      buttons: ["OK"],
    });

    await alert.present();
  }
  ngOnInit() {}
  save(form: NgForm) {
    this._LoginService.addUser(this.user).subscribe(
      (res) => {
        this.presentAlert(res.message, "Added");
      },
      (err) => {
        this.presentAlert("Couldn't add user.", "Failed");
      }
    );
  }
}
