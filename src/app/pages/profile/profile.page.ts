import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { LoginService } from "src/app/services/login.service";
import { ImagePicker } from "@ionic-native/image-picker/ngx";
import { AlertController } from "@ionic/angular";

declare var $: any;

@Component({
  selector: "app-profile",
  templateUrl: "profile.page.html",
  styleUrls: ["profile.page.scss"],
})
export class ProfilePage {
  userForm = {
    name: "",
    email: "",
    image_url: "",
    new_password: "",
  };
  imageResponse: any;
  options: any;
  constructor(
    private _LoginService: LoginService,
    public alertController: AlertController,
    private imagePicker: ImagePicker
  ) {
    this.getUser();
  }
  getUser() {
    this._LoginService.getUser().subscribe((user) => {
      this._LoginService.changeUser(user);
      this.userForm.name = user.name;
      this.userForm.email = user.email;
      this.userForm.image_url = user.image_url;
    });
  }
  logout() {
    this._LoginService.logout();
  }
  getImages() {
    this.options = {
      maximumImagesCount: 1,
      width: 35,
      quality: 100,
      outputType: 1,
    };
    this.imageResponse = [];
    this.imagePicker.getPictures(this.options).then(
      (results) => {
        for (var i = 0; i < results.length; i++) {
          this.imageResponse.push(results[i]);
        }
        this._LoginService.upload(this.imageResponse[0]).then((res) => {
          this.userForm.image_url = res;
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }
  doRefresh(event) {
    this._LoginService.getUser().subscribe((user) => {
      this._LoginService.changeUser(user);
      this.userForm.name = user.name;
      this.userForm.email = user.email;
      this.userForm.image_url = user.image_url;
      event.target.complete();
    });
  }
  async presentAlert(msg, title: string) {
    const alert = await this.alertController.create({
      header: title,
      message: msg,
      buttons: ["OK"],
    });

    await alert.present();
  }

  save(form: NgForm) {
    this._LoginService.updateUser(this.userForm).subscribe(
      (res) => {
        this.presentAlert(res.message, "Success");
        this.getUser();
      },
      (err) => {
        console.log(err);
        this.presentAlert(
          `${err.error.message} Please fill out [Name,Email,Password]`,
          "Failed"
        );
      }
    );
  }
  changePhoto() {}
}
