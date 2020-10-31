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
  private userSource = new BehaviorSubject("");
  currentUser = this.userSource.asObservable();

  constructor(
    private _HttpClient: HttpClient,
    private _CookieService: CookieService,
    private router: Router
  ) {}
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
            this.changeUser(response["user"]);
            this._CookieService.set("Token", response["token"]);
            this.router.navigate([this.redirectUrl]);
          }
        })
      );
  }
  public getUser(): Observable<any> {
    return this._HttpClient.get(`${environment.api}/api/user/me`);
  }
  public logout() {
    this._CookieService.delete("Token");
    this.router.navigate(["/login"]);
  }
  public upload(file, user): Promise<any> {
    return new Promise((resolve, reject) => {
      const bucket = new S3({
        accessKeyId: "AKIAJNNIIRTJ7CBDYKVA",
        secretAccessKey: "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",
        region: "eu-west-2",
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
