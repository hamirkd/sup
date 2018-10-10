import { Component, OnInit } from '@angular/core';
import { Cour } from '../../../models/cour.model';
import { CourproviderService } from '../../../providers/courprovider.service';
import { Router } from '@angular/router';
import { SessionproviderService } from '../../../providers/sessionprovider.service';
import { MessageproviderService } from '../../../providers/messageprovider.service';
import { NgForm } from '@angular/forms';
import { Classe } from '../../../models/classe.model';
import { ClasseproviderService } from '../../../providers/classeprovider.service';

@Component({
  selector: 'app-cours-add',
  templateUrl: './cours-add.component.html',
  styleUrls: ['./cours-add.component.scss']
})
export class CoursAddComponent implements OnInit {

  title="Ajouter un cour";
  newCour:Cour=new Cour();
  classes:Classe[]=[];
  classesSave:Classe[]=[];
  constructor(private courprovider:CourproviderService, private router: Router,
    private sessionprovider:SessionproviderService,private classeprovider:ClasseproviderService,
    private messageprovider:MessageproviderService) {}

  ngOnInit() {
    this.sessionprovider.auth();
    if(this.sessionprovider.redirectIfNotTeacher()){
    this.getClasse();
    this.reset();}
  }
 async getClasse(){
    await this.classeprovider.getAllClasses().then((classes)=>{
      this.classes=classes;
    }).catch(()=>{
      this.classes=[];
    });
  }

  async createCour(addForm: NgForm) {
    this.newCour = addForm.form.value;
    this.newCour.user=this.sessionprovider.user;
    this.newCour.classes=this.classesSave;
    console.log(this.newCour);
    await  this.courprovider.createCour(this.newCour).then((cour)=>{
      if(cour!=null)
      this.messageprovider.showSuccess("Le cour a été ajouté avec succès","Création de cour");
      else 
      this.messageprovider.showError("Erreur intervenu","Création de cour");

    }).catch(()=>{
      this.messageprovider.showError("Erreur intervenu","Création de cour");})
    ;
    console.log(this.router.navigate(['cours']));
  }

  reset(){
    this.newCour=new Cour();
    this.newCour.classes=[];
    this.classesSave=[];
  }

  addClasse(data:string){
    let classe:Classe=this.classes.find((cl)=>cl.id==data);
    if(classe&&!this.classesSave.includes(classe))
    this.classesSave.push(classe);
    this.newCour.classes=[];
    console.log(data);
  }

  removeClasse(classe:Classe){
   this.classesSave.splice(this.classesSave.findIndex((cl)=>cl.id==classe.id),1);
  }

}
