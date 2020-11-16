import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { LoginService } from "../../services/login.service";
import { CookieService } from "ngx-cookie-service";
import { Router } from "@angular/router";
import { AlertController } from "@ionic/angular";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  constructor(
    private router: Router,
    private _LoginService: LoginService,
    private _CookieService: CookieService,
    private alertController: AlertController
  ) {}

  ngOnInit() {}
  async presentAlert(msg, title) {
    const alert = await this.alertController.create({
      header: title,
      message: msg,
      buttons: ["OK"],
    });

    await alert.present();
  }
  login(form: NgForm) {
    this._LoginService
      .loginUser(form.value.email, form.value.password)
      .subscribe(
        (response: any) => {},
        (error: any) => {
          this.presentAlert(
            "Login Failed",
            "Couldn't login, check your email and password."
          );
        }
      );
  }
}
