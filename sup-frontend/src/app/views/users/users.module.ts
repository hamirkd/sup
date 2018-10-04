import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { UsersAddComponent } from './users-add/users-add.component';
import { UsersHomeComponent } from './users-home/users-home.component';
import { UsersRoutingModule } from './users-routing.module';
import { UserproviderService } from '../../providers/userprovider.service';
import { UsersUpdateComponent } from './users-update/users-update.component';

@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule,
    FormsModule,
    HttpModule,
  ],
  providers: [UserproviderService],
  declarations: [UsersAddComponent, UsersHomeComponent, UsersUpdateComponent]
})
export class UsersModule { }
