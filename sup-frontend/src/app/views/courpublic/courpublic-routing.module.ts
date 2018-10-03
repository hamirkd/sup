import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CourpublicComponent } from './courpublic.component';
import { MescoursComponent } from './mescours/mescours.component';

const routes: Routes = [
  {
    path: '',
    component:CourpublicComponent,
    data: {
        title: 'Les cours publiés'
        }
    },
    {
        path: 'mycour',
        component:MescoursComponent,
        data: {
        title: 'Mes cours'
        }
      },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CourPublicRoutingModule {}
