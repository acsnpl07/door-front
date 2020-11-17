import { IonicModule } from "@ionic/angular";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { HomePage } from "./home.page";
import { NgxPaginationModule } from "ngx-pagination";
import { HomePageRoutingModule } from "./home-routing.module";

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    HomePageRoutingModule,
    NgxPaginationModule,
  ],
  declarations: [HomePage],
})
export class HomePageModule {}
