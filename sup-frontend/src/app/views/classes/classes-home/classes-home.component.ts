import { Component, OnInit } from '@angular/core';
import { Classe } from '../../../models/classe.model';
import { ClasseproviderService } from '../../../providers/classeprovider.service';
import { Router } from '@angular/router';
import { SessionproviderService } from '../../../providers/sessionprovider.service';

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
    private sessionprovider:SessionproviderService) {}

  ngOnInit() {
    this.sessionprovider.auth();
    if(this.sessionprovider.user.role.nom!='admin')
    this.router.navigate(['/dashboard']);
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
    })
    .catch((err)=>{
      this.message=err;
    });
  }
  async update(classe:Classe){
    await this.classeprovider.updateClasse(classe).then(()=>{
      this.getAllClasses();
      this.choixclasse=new Classe();
    })
    .catch((err)=>{
      this.message=err;
    });
  }
  
  edit(classe:Classe){
    this.choixclasse=classe;
  }
  reset(){
    this.choixclasse=new Classe();
  }
}
