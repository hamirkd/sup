import { Component, OnInit } from '@angular/core';
import { Classe } from '../../../models/classe.model';
import { NgForm } from '@angular/forms';
import { ClasseproviderService } from '../../../providers/classeprovider.service';
import { Router } from '@angular/router';
import { SessionproviderService } from '../../../providers/sessionprovider.service';

@Component({
  selector: 'app-classes-add',
  templateUrl: './classes-add.component.html',
  styleUrls: ['./classes-add.component.scss']
})
export class ClassesAddComponent implements OnInit {

  newClasse:Classe=new Classe();
  message="";
  constructor(private classeprovider:ClasseproviderService, private router: Router,
    private sessionprovider:SessionproviderService) { }

  ngOnInit() {
    this.sessionprovider.auth();
    this.sessionprovider.redirectIfNotAdmin();
  }
  createClasse(classeForm: NgForm) {
    
    this.classeprovider.createClasse(this.newClasse).then((classe)=>{
      if(classe!=null){
      this.message="Successful creation";
    }else
      this.message="Error occurred during creation";
    });
  }

}
