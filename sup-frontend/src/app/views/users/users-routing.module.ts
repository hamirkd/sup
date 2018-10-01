import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersAddComponent } from './users-add/users-add.component';
import { UsersHomeComponent } from './users-home/users-home.component';
import { UserproviderService } from '../../providers/userprovider.service';


const routes: Routes = [
  {
    path: '',
    component:UsersHomeComponent,
    data: {
        title: 'Users List'
        }
    },
{
    path: 'add',
    component:UsersAddComponent,
    data: {
    title: 'Add User'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
