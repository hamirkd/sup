import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { UserproviderService } from '../../../providers/userprovider.service';
import { SessionproviderService } from '../../../providers/sessionprovider.service';
import { MessageproviderService } from '../../../providers/messageprovider.service';
import { User } from '../../../models/user.model';
import { Page } from '../../../models/page.model';
@Component({
  selector: 'app-users-home',
  templateUrl: './users-home.component.html',
  styleUrls: ['./users-home.component.scss']
})
export class UsersHomeComponent implements OnInit {

  users:User[];
  u:User=new User();
  confirm=false;
  choixuser:User=new User();
  order=false;
  column:string;
  usersbase:User[];
  title="Users List";
  usersinpage:Page<User>=new Page<User>();
  pages=[];
  constructor(private userprovider:UserproviderService,
    private router: Router,private sessionprovider:SessionproviderService,
    private messageprovider:MessageproviderService) { }

  ngOnInit() {
    this.sessionprovider.auth();
    if(this.sessionprovider.redirectIfNotAdmin())
    this.getAllUsersPages(this.usersinpage.number);
  }
  
  async getAllUsersPages(pagenumber:number) {
    this.users = new Array<User>();
    await this.userprovider.getAllUsersPages(pagenumber).then((users)=>{
      if(users!=null)
      this.usersinpage=users;
      console.log(this.usersinpage);
    });
    this.users=this.usersinpage.content;
    this.usersbase = this.users;
    console.log("Les utilisateurs de la plateforme",this.users);this.pagesf();
  }

  async delete(user:User){
    if(this.u.id!=user.id){
      this.reset();
    this.u=user;return;}
    await this.userprovider.deleteUser(user.id).then(()=>{
      this.messageprovider.showSuccess("L'utilisateur a été supprimé","Suppression de compte");
      this.getAllUsersPages(this.usersinpage.number);
    })
    .catch((err)=>{
      this.messageprovider.showError("Impossible de faire la suppression","Suppression de compte");
    });
    this.reset();
  }
  
   edit(user:User){
    this.reset();
    this.choixuser=user;
  }
  async update(user:User){
    await this.userprovider.updateUser(user).then((user)=>{
      if(user!=null){
     this.messageprovider.showSuccess("Les informations ont été modifié avec succès","Mise à jour du compte");
    }
      else{
        this.messageprovider.showError("Erreur intervenu pendant la modification","Mise à jour du compte");
        this.getAllUsersPages(this.usersinpage.number);
      }
    })
    .catch((err)=>{
      this.messageprovider.showError(err,"Mise à jour du compte");
      this.getAllUsersPages(this.usersinpage.number);
    });
    this.reset();
    
  }
  reset(){
    this.choixuser=new User();
    this.u=new User();
  }
  pagesf(){
    let n=[];
    console.log("La page actuelle est = ",this.usersinpage.totalPages);
    let number=this.usersinpage.number;
    if(this.usersinpage.totalPages<6)
    for(let i=0;i<this.usersinpage.totalPages;i++){
      n.push(i);
    }
    else if(number>3&&this.usersinpage.totalPages>6)
    for(let i=this.usersinpage.totalPages-6;i<this.usersinpage.totalPages;i++){
      n.push(i);
    }
    else if(number<3&&this.usersinpage.totalPages>6){
    for(let i=0;i<6;i++)
    n.push(i);}
    else if(number>=3&&number-3<=this.usersinpage.totalPages){
      console.log("nous sommes ici number>3&&number<=this.usersinpage.totalPages");
      for(let i=number-2;i<=number+3;i++){
        n.push(i);
      }
    }
    else {
      console.log("nous sommes ici else");
    for(let i=number-3;i<=this.usersinpage.totalPages;i++)
    n.push(i);}
    this.pages=n;
  }


}
