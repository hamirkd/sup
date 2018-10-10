import { Component, OnInit } from '@angular/core';
import { CourproviderService } from '../../../providers/courprovider.service';
import { Router } from '@angular/router';
import { SessionproviderService } from '../../../providers/sessionprovider.service';
import { Cour } from '../../../models/cour.model';
import { Classe } from '../../../models/classe.model';
import { ClasseproviderService } from '../../../providers/classeprovider.service';
import { MessageproviderService } from '../../../providers/messageprovider.service';

@Component({
  selector: 'app-cours-home',
  templateUrl: './cours-home.component.html',
  styleUrls: ['./cours-home.component.scss']
})
export class CoursHomeComponent implements OnInit {

  cours:Cour[];
  coursbase:Cour[];
  choixcour:Cour=new Cour();
  classes:Classe[]=[];
  classesSave:Classe[]=[];
  constructor(private courprovider:CourproviderService,private classeprovider:ClasseproviderService,
    private router: Router,private sessionprovider:SessionproviderService,
    private messageprovider:MessageproviderService) { }

  ngOnInit() {
    this.sessionprovider.auth();
    this.sessionprovider.redirectIfNotTeacher();
    console.log(this.sessionprovider.user);
    this.getAllCours();
  }
  async getAllCours() {
    this.cours = new Array<Cour>();
    await this.courprovider.getMyCours(this.sessionprovider.user).then((cours)=>{
      if(cours!=null)
      this.cours=cours;
    });
    this.converter(this.cours);
    this.coursbase = this.cours;
    console.log("Les utilisateurs de la plateforme",this.cours);
  }
  
 async getClasses(){
  await this.classeprovider.getAllClasses().then((classes)=>{
    this.classes=classes;
    console.log(this.classes);
  }).catch(()=>{
    this.classes=[];
    console.log("erreur");
  });
}
  
  async publier(cour: Cour) {
    if (cour.visibilite == true)
      cour.visibilite = false;
    else cour.visibilite = true;
    await this.courprovider.updateCour(cour).then((cour) => {
      console.log(cour);
    }).catch(()=>{
      this.getAllCours();
    });
  }
  async update(cour:Cour){
    cour.classes=this.classesSave;
    await this.courprovider.updateCour(cour).then((cour) => {
      if(cour!=null){
        this.messageprovider.showSuccess("Le cour a été mis à jour avec succès","Modification du cour");
      }
      else 
      this.messageprovider.showError("Erreur inatendu","Modification du cour");
    }).catch(()=>{
      this.getAllCours();
      this.messageprovider.showError("Erreur inatendu","Modification du cour");
    });
    this.choixcour=new Cour();
  }
  edit(cour:Cour){
    this.getClasses();
    this.choixcour=cour;
    this.classesSave=cour.classes;
  }
  
  async delete(cour:Cour){
    await this.courprovider.deleteCour(cour.id).then(()=>{
      this.cours.splice(this.cours.findIndex((co)=>co.id==cour.id),1);
      this.messageprovider.showSuccess("Le cour a été supprimé avec succès","Suppression du cour");
    }).catch(()=>{
      this.messageprovider.showError("Erreur inatendu","Suppression du cour");
    });
  }

  reset(){
    this.choixcour=new Cour();
  }
  
  onKey(event: any) { // without type info
    let value=event.target.value.toLocaleLowerCase();
    if(value!="")
    this.cours=this.coursbase.filter
    (cour=>cour.titre.toLocaleLowerCase().includes(value)||cour.classes.find((classe)=>classe.nom.toLocaleLowerCase().includes(value)));
    else this.cours=this.coursbase;
  }
  addClasse(data:string){
    let classe:Classe=this.classes.find((cl)=>cl.id==data);
    if(classe&&!this.classesSave.includes(classe))
    this.classesSave.push(classe);
    this.choixcour.classes=[];
    console.log(data);
  }

  removeClasse(classe:Classe){
   this.classesSave.splice(this.classesSave.findIndex((cl)=>cl.id==classe.id),1);
  }

  converter(cours:Cour[]){
    for(let cour of cours){
      while(cour.contenu!=cour.contenu.replace('\n','<br>')){
        cour.contenu=cour.contenu.replace('\n','<br>');
      }
      while(cour.contenu!=cour.contenu.replace('    ','&nbsp;&nbsp;&nbsp;&nbsp;')){
        cour.contenu=cour.contenu.replace('    ','&nbsp;&nbsp;&nbsp;&nbsp;');
      }
  }
}

}
