import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class LogService {
  constructor(private _HttpClient: HttpClient) {}

  public getLog(page: number = null): Observable<any> {
    let pageParameter: string = "";
    if (page) {
      pageParameter += "?page=" + page;
    }
    return this._HttpClient.get(`${environment.api}/api/log${pageParameter}`);
  }
  public getOneLog(id): Observable<any> {
    return this._HttpClient.get(`${environment.api}/api/log/${id}`);
  }
}
