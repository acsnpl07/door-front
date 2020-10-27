import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { LoginService } from "src/app/services/login.service";
import { ImagePicker } from "@ionic-native/image-picker/ngx";

@Component({
  selector: "app-profile",
  templateUrl: "profile.page.html",
  styleUrls: ["profile.page.scss"],
})
export class ProfilePage {
  user: any = "";
  userForm = {
    name: "",
    password: "",
    email: "",
    profile_photo_url: "",
  };
  imageResponse: any;
  options: any;
  constructor(
    private _LoginService: LoginService,
    private imagePicker: ImagePicker
  ) {
    if (this._LoginService.currentUser) {
      this._LoginService.currentUser.subscribe((user) => {
        this.user = user;
        this.userForm.name = this.user.name;
        this.userForm.password = this.user.password;
        this.userForm.email = this.user.email;
        this.userForm.profile_photo_url = this.user.profile_photo_url;
      });
    } else {
      this._LoginService.getUser().subscribe((user) => {
        this._LoginService.changeUser(user);
        this.user = user;
        this.userForm.name = this.user.name;
        this.userForm.password = this.user.password;
        this.userForm.email = this.user.email;
        this.userForm.profile_photo_url = this.user.profile_photo_url;
      });
    }
  }
  getImages() {
    this.options = {
      maximumImagesCount: 1,
      width: 50,
      quality: 90,
      outputType: 1,
    };
    this.imageResponse = [];
    this.imagePicker.getPictures(this.options).then(
      (results) => {
        for (var i = 0; i < results.length; i++) {
          this.imageResponse.push(results[i]);
        }
        this._LoginService
          .upload(this.imageResponse[0], this.user)
          .then((res) => {
            this.userForm.profile_photo_url = res;
          });

        console.log(this.userForm.profile_photo_url);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  save(form: NgForm) {
    //update user todo1
  }
  changePhoto() {}
}
