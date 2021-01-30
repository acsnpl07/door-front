import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { LogService } from "src/app/services/log.service";

@Component({
  selector: "app-log",
  templateUrl: "./log.page.html",
  styleUrls: ["./log.page.scss"],
})
export class LogPage implements OnInit {
  log = null;
  constructor(
    private activatedRoute: ActivatedRoute,
    private _LogService: LogService
  ) {}

  ngOnInit() {
    let id = this.activatedRoute.snapshot.paramMap.get("id");
    this._LogService.getOneLog(id).subscribe((res) => {
      this.log = res;
    });
  }
}
