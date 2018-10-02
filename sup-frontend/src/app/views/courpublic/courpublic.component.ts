import { Component, OnInit } from '@angular/core';
import { SessionproviderService } from '../../providers/sessionprovider.service';
import { Router } from '@angular/router';
import { Cour } from '../../models/cour.model';
import { CourproviderService } from '../../providers/courprovider.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-courpublic',
  templateUrl: './courpublic.component.html',
  styleUrls: ['./courpublic.component.scss']
})
export class CourpublicComponent implements OnInit {

  cours: Cour[] = [];
  coursbase: Cour[] = [];
  constructor(private courprovider: CourproviderService, private router: Router,
    private sessionprovider: SessionproviderService) { }

  ngOnInit() {
    this.sessionprovider.auth();

    this.getAllCoursPublic();
  }
  async getAllCoursPublic() {
    await this.courprovider.getPublicCours().then((cours) => {
      if (cours != null)
        this.cours = cours;
    });
    console.log(this.cours);
    this.converter(this.cours);
    this.coursbase = this.cours;
  }

  onKey(event: any) { // without type info
    let value = event.target.value.toLocaleLowerCase();
    if (value != "")
      this.cours = this.coursbase.filter
        (cour => cour.titre.toLocaleLowerCase().includes(value) || cour.classes.find((classe) => classe.nom.toLocaleLowerCase().includes(value)));
    else this.cours = this.coursbase;
  }

  converter(cours: Cour[]) {
    for (let cour of cours) {
      while (cour.contenu != cour.contenu.replace('\n', '<br>')) {
        cour.contenu = cour.contenu.replace('\n', '<br>');
      }
      while (cour.contenu != cour.contenu.replace('    ', '&nbsp;&nbsp;&nbsp;&nbsp;')) {
        cour.contenu = cour.contenu.replace('    ', '&nbsp;&nbsp;&nbsp;&nbsp;');
      }
    }
  }
  async suivre(cour: Cour) {
    console.log(cour);
    if(cour.usersSuivi==null){
      cour.usersSuivi=[];
    }
    if(cour.usersSuivi.find((us)=>us.id==this.sessionprovider.user.id)){
      cour.usersSuivi.splice(cour.usersSuivi.findIndex((user)=>user.id==this.sessionprovider.user.id),1);
    }
    else
      cour.usersSuivi.push(this.sessionprovider.user);
    await this.courprovider.updateCour(cour);
  }
  verificateur(cour:Cour):Boolean{
    if(cour.usersSuivi.find((user)=>user.id==this.sessionprovider.user.id))return true;
    return false;
  }
}
