import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CoursAddComponent } from './cours-add/cours-add.component';
import { CoursHomeComponent } from './cours-home/cours-home.component';
import { CoursRoutingModule } from './cours-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { CourproviderService } from '../../providers/courprovider.service';
import { ClasseproviderService } from '../../providers/classeprovider.service';

@NgModule({
  imports: [
    CommonModule,
    CoursRoutingModule,
    FormsModule,
    HttpModule,
  ],
  providers: [CourproviderService,ClasseproviderService],
  declarations: [CoursAddComponent, CoursHomeComponent]
})
export class CoursModule { }
