import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class NotificationService {
  constructor(private _HttpClient: HttpClient) {}

  public getNotificationsCount(): Observable<any> {
    return this._HttpClient.get(`${environment.api}/api/notification/count`);
  }
  public getNotifications(page = null): Observable<any> {
    let pageParameter: string = "";
    if (page) {
      pageParameter += "?page=" + page;
    }
    return this._HttpClient.get(
      `${environment.api}/api/notification${pageParameter}`
    );
  }
  public deleteNotifications(id): Observable<any> {
    return this._HttpClient.delete(`${environment.api}/api/notification/${id}`);
  }
}
