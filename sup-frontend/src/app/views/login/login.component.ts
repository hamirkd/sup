import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserproviderService } from '../../providers/userprovider.service';
import { SessionproviderService } from '../../providers/sessionprovider.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { DataU } from '../../models/datau.model';
import { MessageproviderService } from '../../providers/messageprovider.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent  implements OnInit {

  nouveau_compte: boolean = false;
  newUser: User = new User();
  message: string = "";
  constructor(private userprovider: UserproviderService, private router: Router,
     private sessionprovider: SessionproviderService,private messageprovider:MessageproviderService) {
      this.newUser.email='daohamadou@gmail.y';
      this.newUser.password='dao';
     }

  ngOnInit() {
   // this.sessionprovider.redirectAfterLogin();
  }

  async loginUser(userForm: NgForm) {
    this.newUser = userForm.form.value;
    let datau:DataU=new DataU();
    datau.email=this.newUser.email;
    datau.password=this.newUser.password;
    await this.userprovider.loginUser(datau).catch((err) => {
      this.message = "Incorrect email or password";
      this.newUser = new User();
      this.message = err;
    }).then((user: User) => {
      if (user != null) {
        this.newUser = user; // verification si le premier object n'est pas vide
        console.log(user.id + " Les informations de l'utilisateur");
        this.message = "";
        this.sessionprovider.save(user);
        this.messageprovider.showSuccess("Bienvenu parmis nous!","Message de Bienvenu");
        this.sessionprovider.redirectAfterLogin();
        console.log("users", this.sessionprovider.user);        
      }
      else {
        console.log("pas d'info");
        this.messageprovider.showError("Incorrect email or password","Erreur");
      }
    }).catch((err)=>{
      this.messageprovider.showWarning("Erreur inattendu","Problème de connexion");
    });
  }

}
