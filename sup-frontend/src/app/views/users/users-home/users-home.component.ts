import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { UserproviderService } from '../../../providers/userprovider.service';
import { SessionproviderService } from '../../../providers/sessionprovider.service';
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
  message="";
  column:string;
  usersbase:User[];
  title="Users List";
  usersinpage:Page<User>;
  constructor(private userprovider:UserproviderService,
    private router: Router,private sessionprovider:SessionproviderService) { }

  ngOnInit() {
    this.sessionprovider.auth();
    this.sessionprovider.redirectIfNotAdmin();
    this.getAllUsers();
  }
  async getAllUsers() {
    this.users = new Array<User>();
    await this.userprovider.getAllUsers().then((users)=>{
      if(users!=null)
      this.usersinpage=users;
      console.log(users);
    });
    this.users=this.usersinpage.content;
    this.usersbase = this.users;
    console.log("Les utilisateurs de la plateforme",this.users);
  }

  async delete(user:User){
    if(this.u.id!=user.id){
      this.reset();
    this.u=user;return;}
    await this.userprovider.deleteUser(user.id).then(()=>{
      this.getAllUsers();
    })
    .catch((err)=>{
      this.message=err;
    });
    this.reset();
  }
  
   edit(user:User){
    this.reset();
    this.choixuser=user;
  }
  async update(user:User){
    await this.userprovider.updateUser(user).then(()=>{
      this.getAllUsers();
    })
    .catch((err)=>{
      this.message=err;
    });
    this.reset();
    
  }
  reset(){
    this.choixuser=new User();
    this.u=new User();
  }

}
