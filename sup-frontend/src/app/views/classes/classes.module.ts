import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassesAddComponent } from './classes-add/classes-add.component';
import { ClassesHomeComponent } from './classes-home/classes-home.component';
import { ClassesRoutingModule } from './classes-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ClasseproviderService } from '../../providers/classeprovider.service';

@NgModule({
  imports: [
    CommonModule,
    ClassesRoutingModule,
    FormsModule,
    HttpModule,
  ],
  providers: [ClasseproviderService],
  declarations: [ClassesAddComponent, ClassesHomeComponent]
})
export class ClassesModule { }
