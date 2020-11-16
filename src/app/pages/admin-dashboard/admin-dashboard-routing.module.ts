import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AdminDashboardPage } from "./admin-dashboard.page";

const routes: Routes = [
  {
    path: "",
    component: AdminDashboardPage,
    data: { roles: "admin" },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminDashboardPageRoutingModule {}
