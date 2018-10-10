import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SessionproviderService } from '../../../providers/sessionprovider.service';
import { UserproviderService } from '../../../providers/userprovider.service';
import { MessageproviderService } from '../../../providers/messageprovider.service';
import { Router } from '@angular/router';
import { DataU } from '../../../models/datau.model';
import { User } from '../../../models/user.model';


@Component({
  selector: 'app-users-update',
  templateUrl: './users-update.component.html',
  styleUrls: ['./users-update.component.scss']
})
export class UsersUpdateComponent implements OnInit {
  title = "Modifier son profil";
  newUser: User = new User();
  message = "";
  updatemotdepasse = false;

  constructor(private userprovider: UserproviderService, private router: Router,
    private sessionprovider: SessionproviderService,private messageprovider:MessageproviderService) {
  }

  ngOnInit() {
    this.sessionprovider.auth();
    this.reset();
  }

  async update(userForm: NgForm) {

    if (this.updatemotdepasse && userForm.value['password1'] != userForm.value['password2']) {
      this.message = "mot de passe non identique";
      console.log("mot de passe 1 ", userForm.value['password1']);
      console.log("mot de passe 2 ", userForm.value['password2']);
      this.messageprovider.
      showWarning("Les deux mots de passe ne sont pas identique","Modification de profi");

      return;
    }
    if (userForm.value['password'] == "" || userForm.value['password'] == null) {
      this.messageprovider.
      showWarning("Veuillez confirmer votre mot de passe","Modification de profi"); return;
    }
    let userdata: DataU = new DataU();
    userdata.email = this.sessionprovider.user.email;
    userdata.password = userForm.value['password'];
    await this.userprovider.loginUser(userdata).then((user) => {
      console.log(user);
      if (user != null) {
        if (this.updatemotdepasse) {
          user.password = userForm.value['password1'];
        }
        user.username = userForm.value['username'];
        user.email = userForm.value['email'];
        this.userprovider.updateUser(user).then((user) => {
          if (user != null) {
            this.messageprovider.
            showSuccess("Votre compte a été mis à jour avec succès","Modification de profi");
            this.reset();
          }
          else{
            this.message = "Erreur innatendu";
            this.messageprovider.
            showError("Erreur inattendu","Modification de profi");}
        }).catch((err) => {
          this.message = err;
        });

      }
      else 
      this.messageprovider.
      showError("Votre mot de passe est incorrect","Modification de profi");
    }).catch((err) => {
      this.messageprovider.
      showError("Votre mot de passe est incorrect","Modification de profi");
    });
  }
  async reset() {
  await  this.userprovider.updateUserInfo(this.sessionprovider.user);
    await this.sessionprovider.update();
    this.newUser=new User();
    this.newUser.email = this.sessionprovider.user.email;
    this.newUser.username = this.sessionprovider.user.username;
    this.newUser.role = this.sessionprovider.user.role;
  }

}
