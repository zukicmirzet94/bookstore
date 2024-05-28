import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { BookListComponent } from '../book-list/book-list.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { ButtonModule } from 'primeng/button';
import { BookActionsComponent } from '../book-actions/book-actions.component';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { UserPanelComponent } from './user-panel/user-panel.component';



@NgModule({
  declarations: [
    DashboardComponent,
    AdminPanelComponent,
    UserPanelComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    DashboardRoutingModule,
    BookListComponent,
    BookActionsComponent,
    ButtonModule,
    DialogModule,
    ConfirmDialogModule,
    MenuModule
  ],
  providers: [ConfirmationService]
})
export class DashboardModule { }
