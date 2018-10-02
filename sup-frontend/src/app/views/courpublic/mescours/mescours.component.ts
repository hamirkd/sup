import { Component, OnInit } from '@angular/core';
import { Cour } from '../../../models/cour.model';
import { CourproviderService } from '../../../providers/courprovider.service';
import { Router } from '@angular/router';
import { SessionproviderService } from '../../../providers/sessionprovider.service';

@Component({
  selector: 'app-mescours',
  templateUrl: './mescours.component.html',
  styleUrls: ['./mescours.component.scss']
})
export class MescoursComponent implements OnInit {

  cours: Cour[] = [];
  coursbase: Cour[] = [];
  constructor(private courprovider: CourproviderService, private router: Router,
    private sessionprovider: SessionproviderService) { }

  ngOnInit() {
    this.sessionprovider.auth();
    this.sessionprovider.redirectIfNotStudent();
    this.getAllCoursSuivi();
  }
  async getAllCoursSuivi() {
    await this.courprovider.getMyCoursSuivi(this.sessionprovider.user).then((cours) => {
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
    await this.courprovider.updateCour(cour).then(()=>{
      this.getAllCoursSuivi();
    });
  }
}
