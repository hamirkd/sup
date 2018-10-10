import { Component, OnInit } from '@angular/core';
import { Classe } from '../../../models/classe.model';
import { ClasseproviderService } from '../../../providers/classeprovider.service';
import { MessageproviderService } from '../../../providers/messageprovider.service';
import { SessionproviderService } from '../../../providers/sessionprovider.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-classes-home',
  templateUrl: './classes-home.component.html',
  styleUrls: ['./classes-home.component.scss']
})
export class ClassesHomeComponent implements OnInit {

  title="La liste des classes";
  classes:Classe[];
  classesbase:Classe[];
  message="";
  choixclasse:Classe=new Classe();
  constructor(private classeprovider:ClasseproviderService, private router: Router,
    private sessionprovider:SessionproviderService,private messageprovider:MessageproviderService) {}

  ngOnInit() {
    this.sessionprovider.auth();
    if(this.sessionprovider.redirectIfNotAdmin())
    this.getAllClasses();
  }
  async getAllClasses(){
    this.classes = new Array<Classe>();
    await this.classeprovider.getAllClasses().then((classes)=>{
      if(classes!=null)
      this.classes=classes;
    });
    this.classesbase = this.classes;
    console.log("Les classes de la plateforme",this.classes);
  }
  async delete(classe:Classe){
    await this.classeprovider.deleteClasse(classe.id).then(()=>{
      this.getAllClasses();
      this.messageprovider.showSuccess("La classe a été supprimée avec succès","Suppression de classe");
    })
    .catch((err)=>{
      this.messageprovider.showError("Erreur intervenu pendant la suppression","Suppression de classe");
    });
  }
  async update(classe:Classe){
    await this.classeprovider.updateClasse(classe).then(()=>{
      this.getAllClasses();
      this.messageprovider.showSuccess("La classe a été modifiée avec succès","Modification de classe");
      this.choixclasse=new Classe();
    })
    .catch((err)=>{   
      this.messageprovider.showError("Erreur intervenu pendant la modification","Modiication de classe");
    });
  }
  
  edit(classe:Classe){
    this.choixclasse=classe;
  }
  reset(){
    this.choixclasse=new Classe();
  }
}
