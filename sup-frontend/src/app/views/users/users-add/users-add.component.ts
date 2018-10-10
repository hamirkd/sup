import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../../models/user.model';
import { UserproviderService } from '../../../providers/userprovider.service';
import { SessionproviderService } from '../../../providers/sessionprovider.service';
import { MessageproviderService } from '../../../providers/messageprovider.service';
import { Role } from '../../../models/role.model';
import { DataU } from '../../../models/datau.model';

@Component({
  selector: 'app-users-add',
  templateUrl: './users-add.component.html',
})
export class UsersAddComponent implements OnInit {

  title="Add User";
  newUser:DataU=new DataU();

  constructor(private userprovider:UserproviderService, private router: Router,
    private sessionprovider:SessionproviderService,private messageprovider:MessageproviderService) {
     }

  ngOnInit() {
    this.sessionprovider.auth();
    this.sessionprovider.redirectIfNotAdmin();
  }

  createUser(userForm: NgForm) {
    console.log(this.newUser);
    
    this.userprovider.createUser(this.newUser).then((user)=>{
      if(user!=null){
        this.messageprovider.showSuccess("L'utilisateur a été ajouté avec succès","Création de compte");
        this.newUser=new DataU();
      }else
      this.messageprovider.showError("Vérifier les informations","Création de compte");
    }).catch((err)=>{
      this.messageprovider.showError(err,"Création de compte");
    });
  }

}
