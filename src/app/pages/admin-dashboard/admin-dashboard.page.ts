import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { LoginService } from "src/app/services/login.service";
import { AlertController } from "@ionic/angular";
import { TableData } from "../../interfaces/table-data";

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
  data: TableData;
  searchResult: TableData;
  constructor(
    private _LoginService: LoginService,
    public alertController: AlertController
  ) {
    this.getUsers();
  }
  async presentAlert(msg, title) {
    const alert = await this.alertController.create({
      header: title,
      message: msg,
      buttons: ["OK"],
    });

    await alert.present();
  }
  getUsers(page: number = null) {
    this._LoginService.getUsers(page).subscribe((res) => {
      this.data = {
        headerRow: ["Name", "Email", "Role"],
        keys: ["name", "email", "is_admin"],
        dataRows: res,
        title: "Users",
        buttonName: ["Delete"],
        searchField: "email",
      };
      this.searchResult = Object.assign({}, this.data);
      this.searchResult.dataRows = this.data.dataRows.data;
    });
  }
  onSearchChange(text) {
    if (text != "") {
      this.searchResult.dataRows = this.data.dataRows.data.filter((data) =>
        data[this.data.searchField].toString().includes(text.toString())
      );
    } else {
      this.searchResult.dataRows = this.data.dataRows.data;
    }
  }
  removeItem(i) {
    this._LoginService
      .deleteUser(this.data.dataRows.data[i].id)
      .subscribe((res) => {
        this.getUsers();
        this.presentAlert(res.message, "Success");
      });
  }
  pageChanged(p) {
    this.getUsers(p);
  }
  ngOnInit() {}
  save(form: NgForm) {
    this._LoginService.addUser(this.user).subscribe(
      (res) => {
        this.presentAlert(res.message, "Added");
        this.getUsers();
      },
      (err) => {
        this.presentAlert("Couldn't add user.", "Failed");
      }
    );
  }
}
