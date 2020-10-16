import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class DoorService {
  constructor(private _HttpClient: HttpClient) {}
  public getLog(): Observable<any> {
    return this._HttpClient.get(
      `https://www.clax-egyp.me/api/admin/drivers/names`
    );
  }
}
