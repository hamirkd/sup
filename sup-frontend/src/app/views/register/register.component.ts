import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SessionproviderService } from '../../providers/sessionprovider.service';
import { UserproviderService } from '../../providers/userprovider.service';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { Role } from '../../models/role.model';
import { DataU } from '../../models/datau.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'register.component.html'
})
export class RegisterComponent  implements OnInit {
  
  newUser: DataU = new DataU();
  
  message: string = "";
  constructor(private userproviderService: UserproviderService, private router: Router,
     private sessionprovider: SessionproviderService) {
      this.newUser.email='daohamadou@gmail.y';
      this.newUser.password='dao';
     }

  ngOnInit() {
    this.sessionprovider.redirectIfLogin();
  }


  createUser(userForm: NgForm) {
    this.newUser = userForm.form.value;
    this.newUser.role='admin';
    console.log('Les roles de l\'utilisateur a créer',this.newUser);
    if(this.newUser['password1']==this.newUser['password'])
    this.userproviderService.createUser(this.newUser).then((user) => {
      if (user != null) {
        this.sessionprovider.save(user);
        this.sessionprovider.redirectAfterLogin();
        this.message = "Création avec succès"
      } else
        this.message = "Ce compte existe déjà";
    });
  }
}
