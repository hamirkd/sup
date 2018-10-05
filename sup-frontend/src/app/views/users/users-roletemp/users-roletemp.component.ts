import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { UserproviderService } from '../../../providers/userprovider.service';
import { SessionproviderService } from '../../../providers/sessionprovider.service';
import { User } from '../../../models/user.model';
import { Page } from '../../../models/page.model';
import { Role } from '../../../models/role.model';
import { NgForm } from '@angular/forms';
import { RoleTemp } from '../../../models/roletemp.model';
import { RoleproviderService } from '../../../providers/roleprovider.service';
@Component({
  selector: 'app-users-roletemp',
  templateUrl: './users-roletemp.component.html',
  styleUrls: ['./users-roletemp.component.scss']
})
export class UsersRoletempComponent implements OnInit {

  choixuser:User=new User();
  message="";
  roles:Role[];
  users:User[];
  title="Ajouter d'autre role";
  saveRoleTemp:RoleTemp[];
  constructor(private userprovider:UserproviderService,private roleprovider:RoleproviderService,
    private router: Router,private sessionprovider:SessionproviderService) { }

  ngOnInit() {
    this.sessionprovider.auth();
    this.sessionprovider.redirectIfNotAdmin();
    this.getAllUsers();
    this.getAllRoles();
    this.reset();
  }

  async getAllUsers() {
    this.users = new Array<User>();
    await this.userprovider.getAllUsers().then((users)=>{
      if(users!=null)
      this.users=users;
    });
    
    console.log(this.users);
  }
  async getAllRoles() {
    this.roles = new Array<Role>();
    await this.roleprovider.getAllRoles().then((roles)=>{
      if(roles!=null)
      this.roles=roles;
    });
  }

  reset(){
    this.choixuser=new User();
    this.choixuser.role=new Role();
    this.saveRoleTemp=[];
    this.getAllRoles();
    this.getAllUsers();
  }
  faitchoix(userForm:NgForm){
    console.log(userForm.form.value.index);
    if(userForm.form.value.index){
      let user=this.users.find((user)=>user.id==userForm.form.value.index);
      this.choixuser.id=user.id;
      this.choixuser.username=user.username;
      this.choixuser.email=user.email;
      this.choixuser.role=user.role;
      this.choixuser.rolesTemp=user.rolesTemp;
    }
    if(this.choixuser.rolesTemp==null){
      this.choixuser.rolesTemp=[];
    }
    this.saveRoleTemp=this.choixuser.rolesTemp;
  }
  addRole(nom:string,debut:Date,fin:Date){
    this.message="";
    let role=this.roles.find((role)=>role.nom.toLocaleLowerCase().includes(nom.toLowerCase()));
    if(role==null)return;
    if(fin.toString()==""){this.message="La date de fin est invalide";return;}
    if(debut.toString()==""){this.message="La date de debut est invalide";return;}
    if(debut>fin){this.message="La date de debut doit etre supérieure à la date de fin ";return;}
    if(debut<new Date()||fin<new Date()){this.message="Ces dates sont dépassés, veuillez les vérifier";return;}
    let roleTemp=new RoleTemp();
    roleTemp.nom=nom;
    roleTemp.debut=debut;
    roleTemp.fin=fin;
    roleTemp.id=role.id;
    console.log(debut,fin,nom);
    if(!this.saveRoleTemp.find((ro)=>ro.nom==nom))
    this.saveRoleTemp.push(roleTemp);
    this.choixuser.rolesTemp=[];
  }
  removeRole(role:RoleTemp){
    this.saveRoleTemp.splice(this.saveRoleTemp.findIndex((ro)=>ro.id==role.id),1);
  }
  async update(userForm: NgForm) {
    if(this.choixuser.id=="")return;
    await this.userprovider.getUserById(this.choixuser).then((user)=>{
      console.log(user);
      if(user!=null){
        this.choixuser=user;
        this.choixuser.rolesTemp=this.saveRoleTemp;
        this.userprovider.updateUser(user).then((user)=>{
          if(user!=null){
            this.message="La mise à jour a reussi";
            this.reset();
          }
          else
          this.message="Erreur innatendu";
        }).catch((err)=>{this.message=err;});
      }
      else this.message="Cet utilisateur n'existe pas";
    }).catch((err)=>{this.message=err;});
  }

}
