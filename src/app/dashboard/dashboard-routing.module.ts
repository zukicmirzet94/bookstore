import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard.component";
import { NgModule } from "@angular/core";
import { Role } from "../utils/enums";
import { RoleGuard } from "../services/auth/guards/roleGuard";
import { AdminPanelComponent } from "./admin-panel/admin-panel.component";
import { UserPanelComponent } from "./user-panel/user-panel.component";

const routes: Routes = [
  { 
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'admin',
        component: AdminPanelComponent,
        canActivate: [RoleGuard],
        data: {
          accessRole: Role.ADMIN
        }
      },
      {
        path: 'user',
        component: UserPanelComponent,
        canActivate: [RoleGuard],
        data: {
          accessRole: Role.USER
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class DashboardRoutingModule { }
