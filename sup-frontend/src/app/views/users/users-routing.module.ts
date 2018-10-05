import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersAddComponent } from './users-add/users-add.component';
import { UsersHomeComponent } from './users-home/users-home.component';
import { UserproviderService } from '../../providers/userprovider.service';
import { UsersUpdateComponent } from './users-update/users-update.component';
import { UsersRoletempComponent } from './users-roletemp/users-roletemp.component';


const routes: Routes = [
  {
    path: '',
    component: UsersHomeComponent,
    data: {
      title: 'Users List'
    }
  },
  {
    path: 'add',
    component: UsersAddComponent,
    data: {
      title: 'Add User'
    }
  },
  {
    path: 'modify',
    component: UsersUpdateComponent,
    data: {
      title: 'Modify User'
    }
  },
  {
    path: 'roletemp',
    component: UsersRoletempComponent,
    data: {
      title: 'Ajouter un role temporaire'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule { }
