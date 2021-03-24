import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { Socket, SocketIoConfig } from "ngx-socket-io";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class VideoService {
  config: SocketIoConfig = {
    url: "http://192.168.43.142:9780",
    options: { transports: ["websocket", "polling"] },
  };
  constructor(private socket: Socket, private _HttpClient: HttpClient) {
    //this.socket.disconnect();
    this.socket.on("connection", () => {
      console.log("connected");
    });
  }
  changeSocket(url: string) {
    // this.socket.disconnect();
    // this.config.url = url;
    // this.socket = new Socket(this.config);
  }
  getMessage(url: string) {
    this.changeSocket(url);
    console.log("getting messages");
    return this.socket.fromEvent("ServerPhoto").pipe(
      map((data: any) => {
        console.log(data);
        return data;
      })
    );
  }
  getUrl() {
    return this._HttpClient.get(
      `${environment.api}/api/video/socket-connection`
    );
  }
  disconnect() {
    this.socket.disconnect();
  }
}
