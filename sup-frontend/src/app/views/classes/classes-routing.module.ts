import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClassesAddComponent } from './classes-add/classes-add.component';
import { ClassesHomeComponent } from './classes-home/classes-home.component';


const routes: Routes = [
  {
    path: '',
    component:ClassesHomeComponent,
    data: {
        title: 'Classe List'
        }
    },
{
    path: 'add',
    component:ClassesAddComponent,
    data: {
    title: 'Add Classe'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClassesRoutingModule {}
