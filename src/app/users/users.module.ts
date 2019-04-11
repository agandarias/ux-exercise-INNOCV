import { NgModule } from '@angular/core';
import { CommonModule, DatePipe, formatDate } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserAddComponent } from './user-add/user-add.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [UserListComponent, UserDetailComponent, UserEditComponent, UserAddComponent],
  imports: [HttpClientModule, CommonModule, UsersRoutingModule, FormsModule, ReactiveFormsModule, SharedModule],
  providers: [DatePipe]
})
export class UsersModule {}
