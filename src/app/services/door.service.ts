import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class DoorService {
  constructor(private _HttpClient: HttpClient) {}

  public openDoor(): Observable<any> {
    return this._HttpClient.get(`${environment.api}/api/door/open`);
  }
  public getLiveView(): Observable<any> {
    return this._HttpClient.get(`${environment.api}/api/video/image`);
  }
}
