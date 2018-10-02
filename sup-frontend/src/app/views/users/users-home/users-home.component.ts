import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { UserproviderService } from '../../../providers/userprovider.service';
import { SessionproviderService } from '../../../providers/sessionprovider.service';
import { User } from '../../../models/user.model';
@Component({
  selector: 'app-users-home',
  templateUrl: './users-home.component.html',
  styleUrls: ['./users-home.component.scss']
})
export class UsersHomeComponent implements OnInit {

  users:User[];
  order=false;
  message="";
  column:string;
  usersbase:User[];
  title="Users List";
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
      this.users=users;
    });
    this.usersbase = this.users;
    console.log("Les utilisateurs de la plateforme",this.users);
  }

  async delete(user:User){
    await this.userprovider.deleteUser(user.id).then(()=>{
      this.getAllUsers();
    })
    .catch((err)=>{
      this.message=err;
    });
  }

}
