import { Component, OnDestroy, OnInit } from "@angular/core";
import { AlertController, LoadingController } from "@ionic/angular";
import { DoorService } from "src/app/services/door.service";
import { VideoService } from "src/app/services/video.service";

@Component({
  selector: "app-live-view",
  templateUrl: "./live-view.page.html",
  styleUrls: ["./live-view.page.scss"],
})
export class LiveViewPage implements OnInit, OnDestroy {
  livePhoto = null;
  constructor(
    private _DoorService: DoorService,
    public alertController: AlertController,
    public loadingController: LoadingController,
    private videoService: VideoService
  ) {
    this.presentLoading();
  }

  ngOnInit() {
    this.videoService.getUrl().subscribe((res: any) => {
      this.videoService
        .getMessage(`https://${"24.162.48.7"}:${"22000"}/`)
        .subscribe((res) => {
          console.log(res);
        });
    });
  }
  getLivePhoto() {
    this._DoorService.getLiveView().subscribe((res) => {
      this.livePhoto = res.image_url;
    });
  }
  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: "my-custom-class",
      message: "Please wait...",
    });
    await loading.present();
    this._DoorService.getLiveView().subscribe(
      (res) => {
        this.livePhoto = res.image_url;
        this.loadingController.dismiss();
      },
      (err) => {
        this.presentAlert("Couldn't get live view", "Door");
        this.loadingController.dismiss();
      }
    );
  }
  async presentAlert(msg, title) {
    const alert = await this.alertController.create({
      header: title,
      message: msg,
      buttons: ["OK"],
    });

    await alert.present();
  }
  doRefresh(event) {
    this.presentLoading();
    event.target.complete();
  }
  ngOnDestroy() {
    this.videoService.disconnect();
  }
  ionViewWillLeave() {
    this.videoService.disconnect();
  }
}
