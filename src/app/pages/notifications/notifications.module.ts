import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { IonicModule } from "@ionic/angular";
import { NotificationsPageRoutingModule } from "./notifications-routing.module";
import { NotificationsPage } from "./notifications.page";
import { RouterModule } from "@angular/router";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([{ path: "", component: NotificationsPage }]),
    NotificationsPageRoutingModule,
  ],
  declarations: [NotificationsPage],
})
export class NotificationsPageModule {}
