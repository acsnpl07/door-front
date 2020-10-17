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
      // Android only. Max images to be selected, defaults to 15. If this is set to 1, upon
      // selection of a single image, the plugin will return it.
      maximumImagesCount: 1,

      // max width and height to allow the images to be.  Will keep aspect
      // ratio no matter what.  So if both are 800, the returned image
      // will be at most 800 pixels wide and 800 pixels tall.  If the width is
      // 800 and height 0 the image will be 800 pixels wide if the source
      // is at least that wide.
      width: 50,
      //height: 200,

      // quality of resized image, defaults to 100
      quality: 90,

      // output type, defaults to FILE_URIs.
      // available options are
      // window.imagePicker.OutputType.FILE_URI (0) or
      // window.imagePicker.OutputType.BASE64_STRING (1)
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
