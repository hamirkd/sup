import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';
import { UsersAddComponent } from './users-add/users-add.component';
import { UsersHomeComponent } from './users-home/users-home.component';
import { UsersRoutingModule } from './users-routing.module';
import { UserproviderService } from '../../providers/userprovider.service';
import { UsersUpdateComponent } from './users-update/users-update.component';
import { UsersRoletempComponent } from './users-roletemp/users-roletemp.component';
import { RoleproviderService } from '../../providers/roleprovider.service';

@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule,
    FormsModule,
    HttpModule,
  ],
  providers: [UserproviderService,RoleproviderService],
  declarations: [UsersAddComponent, UsersHomeComponent, UsersUpdateComponent, UsersRoletempComponent]
})
export class UsersModule { }
