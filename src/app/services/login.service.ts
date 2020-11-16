import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { CookieService } from "ngx-cookie-service";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";
import { environment } from "../../environments/environment";
import * as AWS from "aws-sdk/global";
import * as S3 from "aws-sdk/clients/s3";

@Injectable({
  providedIn: "root",
})
export class LoginService {
  redirectUrl = "/";
  private userSource: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  public get currentUserObject(): any {
    if (this.userSource) return this.userSource.value;
    else return null;
  }

  constructor(
    private _HttpClient: HttpClient,
    private _CookieService: CookieService,
    private router: Router
  ) {
    if (localStorage.getItem("currentUser") != "undefined") {
      this.userSource = new BehaviorSubject<any>(
        JSON.parse(localStorage.getItem("currentUser"))
      );
      this.currentUser = this.userSource.asObservable();
    }

    if (!this._CookieService.check("Token")) {
      localStorage.removeItem("currentUser");
      this.userSource.next(null);
    }
  }
  changeUser(user: any) {
    this.userSource.next(user);
  }
  public loginUser(email: string, password: string): Observable<any> {
    return this._HttpClient
      .post(
        `${environment.api}/api/login`,
        {
          email: email,
          password: password,
        },
        { responseType: "json" }
      )
      .pipe(
        map((response) => {
          if (response) {
            this._CookieService.set("Token", response["token"]);
            localStorage.setItem(
              "currentUser",
              JSON.stringify(response["user"])
            );

            this.userSource.next(response["user"]);
            this.router.navigate([this.redirectUrl]);
          }
        })
      );
  }
  public updateUser(user: any): Observable<any> {
    if (!user.image_url) {
      delete user.image_url;
    }
    return this._HttpClient.put(
      `${environment.api}/api/user/me`,
      {
        ...user,
      },
      { responseType: "json" }
    );
  }
  public addUser(user: any): Observable<any> {
    return this._HttpClient.post(
      `${environment.api}/api/user/store`,
      {
        ...user,
        is_admin: 0,
      },
      { responseType: "json" }
    );
  }
  public getUser(): Observable<any> {
    return this._HttpClient.get(`${environment.api}/api/user/me`);
  }
  public logout() {
    localStorage.removeItem("currentUser");
    if (this.userSource) this.userSource.next(null);
    this._CookieService.delete("Token");
    this.router.navigate(["/login"]);
  }
  public upload(file): Promise<any> {
    return new Promise((resolve, reject) => {
      const bucket = new S3({
        accessKeyId: environment.accessKeyId,
        secretAccessKey: environment.secretAccessKey,
        region: environment.region,
      });

      let buf = Buffer.from(file, "base64");

      const params = {
        Bucket: "zeal-io",
        Key: Date.now() + "",
        Body: buf,
        ContentEncoding: "base64",
        ContentType: "image/jpeg",
        ACL: "public-read",
      };
      bucket.upload(params, function (err, data) {
        if (err) {
          alert(err);
          console.log("There was an error uploading your file: ", err);
          reject(err);
        } else resolve(data.Location);
      });
    });

    //for upload progress
    /*bucket.upload(params).on('httpUploadProgress', function (evt) {
            console.log(evt.loaded + ' of ' + evt.total + ' Bytes');
        }).send(function (err, data) {
            if (err) {
                console.log('There was an error uploading your file: ', err);
                return false;
            }
            console.log('Successfully uploaded file.', data);
            return true;
        });*/
  }
}
