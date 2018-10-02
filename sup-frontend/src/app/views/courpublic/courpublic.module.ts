import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourpublicComponent } from './courpublic.component';
import { MescoursComponent } from './mescours/mescours.component';
import { CourPublicRoutingModule } from './courpublic-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

@NgModule({
  imports: [
    CommonModule,
    CourPublicRoutingModule,
    FormsModule,
    HttpModule,
  ],
  providers: [CourpublicComponent],
  declarations: [CourpublicComponent, MescoursComponent]
})
export class CourpublicModule { }
