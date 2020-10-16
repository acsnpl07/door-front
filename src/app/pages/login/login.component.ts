import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { LoginService } from "../../services/login.service";
import { CookieService } from "ngx-cookie-service";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  constructor(
    private router: Router,
    private _LoginService: LoginService,
    private _CookieService: CookieService
  ) {}

  ngOnInit() {}
  login(form: NgForm) {
    this._LoginService
      .loginUser(form.value.email, form.value.password)
      .subscribe(
        (response: any) => {},
        (error: any) => {}
      );
  }
}