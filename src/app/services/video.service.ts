import { Injectable } from "@angular/core";
import { delay, map } from "rxjs/operators";
import { Socket, SocketIoConfig } from "ngx-socket-io";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class VideoService {
  config: SocketIoConfig = {
    url: "",
    options: {},
  };
  constructor(private socket: Socket, private _HttpClient: HttpClient) {
    //this.socket.disconnect();
    this.socket.on("connect", () => {
      this.socket.emit("ClientRequest", { request: "request from client" });
    });
  }
  changeSocket(url: string) {
    this.socket.disconnect();
    this.config.url = url;
    this.socket = new Socket(this.config);
  }
  getMessage(url: string) {
    this.changeSocket(url);
    return this.socket.fromEvent("ServerMsg").pipe(
      delay(1000),
      map((data: any) => {
        this.socket.emit("ClientRequest", { request: "request from client" });
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
