import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../../models/user.model';
import { UserproviderService } from '../../../providers/userprovider.service';
import { SessionproviderService } from '../../../providers/sessionprovider.service';
import { Role } from '../../../models/role.model';
import { DataU } from '../../../models/datau.model';

@Component({
  selector: 'app-users-add',
  templateUrl: './users-add.component.html',
})
export class UsersAddComponent implements OnInit {

  title="Add User";
  newUser:DataU=new DataU();
  message="";

  constructor(private userprovider:UserproviderService, private router: Router,
    private sessionprovider:SessionproviderService) {
     }

  ngOnInit() {
    this.sessionprovider.auth();
    this.sessionprovider.redirectIfNotAdmin();
  }

  createUser(userForm: NgForm) {
    console.log(this.newUser);
    
    this.userprovider.createUser(this.newUser).then((user)=>{
      if(user!=null){
      this.message="Successful creation";
    }else
      this.message="Error occurred during creation";
    });
  }

}
