import { Component, OnInit } from '@angular/core';
import { Cour } from '../../../models/cour.model';

@Component({
  selector: 'app-cours-add',
  templateUrl: './cours-add.component.html',
  styleUrls: ['./cours-add.component.scss']
})
export class CoursAddComponent implements OnInit {

  title="Ajouter un cour";
  cour:Cour=new Cour();
  constructor() { }

  ngOnInit() {
  }

}
