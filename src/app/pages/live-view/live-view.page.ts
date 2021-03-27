import { Component, OnDestroy, OnInit } from "@angular/core";
import { AlertController, LoadingController } from "@ionic/angular";
import { VideoService } from "src/app/services/video.service";

@Component({
  selector: "app-live-view",
  templateUrl: "./live-view.page.html",
  styleUrls: ["./live-view.page.scss"],
})
export class LiveViewPage implements OnInit, OnDestroy {
  livePhoto = null;
  constructor(private videoService: VideoService) {}

  ngOnInit() {}
  ionViewWillEnter() {
    this.videoService.getUrl().subscribe((res: any) => {
      this.videoService.getMessage(`${res.ip}:${res.port}`).subscribe((res) => {
        this.livePhoto = "data:image/png;base64," + res.ServerMsg;
      });
    });
  }
  ngOnDestroy() {
    this.videoService.disconnect();
  }
  ionViewWillLeave() {
    this.videoService.disconnect();
  }
}
