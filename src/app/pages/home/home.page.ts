import { Component } from "@angular/core";
import { LogService } from "src/app/services/log.service";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage {
  logs: any[];
  constructor(private _LogService: LogService) {
    this._LogService.getLog().subscribe((logs) => {
      this.logs = logs;
    });
  }
  ngOnInit() {}
}
