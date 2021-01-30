import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TabsPage } from "./tabs.page";
import { AuthGuard } from "../_guard/index";

const routes: Routes = [
  {
    path: "",
    component: TabsPage,
    children: [
      {
        path: "home",
        canActivate: [AuthGuard],
        loadChildren: () =>
          import("../pages/home/home.module").then((m) => m.HomePageModule),
      },
      {
        path: "dashboard",
        data: { roles: "admin" },
        canActivate: [AuthGuard],
        loadChildren: () =>
          import("../pages/admin-dashboard/admin-dashboard.module").then(
            (m) => m.AdminDashboardPageModule
          ),
      },
      {
        path: "profile",
        canActivate: [AuthGuard],
        loadChildren: () =>
          import("../pages/profile/profile.module").then(
            (m) => m.ProfilePageModule
          ),
      },
      {
        path: "notifications",
        data: { roles: "admin" },
        canActivate: [AuthGuard],
        loadChildren: () =>
          import("../pages/notifications/notifications.module").then(
            (m) => m.NotificationsPageModule
          ),
      },
      {
        path: "log/:id",
        canActivate: [AuthGuard],
        data: { roles: "admin" },
        loadChildren: () =>
          import("../pages/log/log.module").then((m) => m.LogPageModule),
      },
      {
        path: "",
        canActivate: [AuthGuard],
        redirectTo: "/home",
        pathMatch: "full",
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
