import { Component, OnInit } from '@angular/core';
import { Classe } from '../../../models/classe.model';
import { NgForm } from '@angular/forms';
import { ClasseproviderService } from '../../../providers/classeprovider.service';
import { MessageproviderService } from '../../../providers/messageprovider.service';
import { SessionproviderService } from '../../../providers/sessionprovider.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-classes-add',
  templateUrl: './classes-add.component.html',
  styleUrls: ['./classes-add.component.scss']
})
export class ClassesAddComponent implements OnInit {

  newClasse:Classe=new Classe();
  message="";
  constructor(private classeprovider:ClasseproviderService, private router: Router,
    private sessionprovider:SessionproviderService,private messageprovider:MessageproviderService) { }

  ngOnInit() {
    this.sessionprovider.auth();
    this.sessionprovider.redirectIfNotAdmin();
  }
  createClasse(classeForm: NgForm) {
    this.classeprovider.createClasse(this.newClasse).then((classe)=>{
      if(classe!=null){
      this.message="Successful creation";
      this.messageprovider.showSuccess("La classe a été ajouté avec succès","Création de classe");
    }else
    this.messageprovider.showError("Erreur intervenu pendant la création","Création de classe");
    }).catch((err)=>{
    this.messageprovider.showError("Erreur intervenu pendant la création","Création de classe");
    });
  }

}
