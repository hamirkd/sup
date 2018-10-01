import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoursAddComponent } from './cours-add/cours-add.component';
import { CoursHomeComponent } from './cours-home/cours-home.component';


const routes: Routes = [
  {
    path: '',
    component:CoursHomeComponent,
    data: {
        title: 'Cour List'
        }
    },
{
    path: 'add',
    component:CoursAddComponent,
    data: {
    title: 'Add Cour'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoursRoutingModule {}
