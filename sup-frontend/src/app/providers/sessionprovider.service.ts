import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { DataU } from '../models/datau.model';
import { navItems } from '../_nav';

@Injectable({
  providedIn: 'root'
})
export class SessionproviderService {
  user: User;
  datau: DataU;
  public navI = navItems;
  v = false;
  constructor(private router: Router) {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.verifyMenuShow();
  }

  async auth() {
    if (this.user == null)
      this.router.navigate(['login']);
    await this.verifyMenuShow();
  }

  redirectIfLogin() {
    if (this.getdroit('admin'))
      this.router.navigate(['/users'])
    else if (this.getdroit('teacher'))
      this.router.navigate(['/cours'])
    else this.router.navigate(['/courspublic/mycour']);
  }
  redirectIfNotAdmin(): Boolean {
    if (this.getdroit('admin') || this.getDroitTemporaire('admin'))
      return true;
    this.router.navigate(['/']);
    return false;
  }
  redirectIfNotTeacher(): Boolean {
    if (this.getdroit('teacher') || this.getDroitTemporaire('teacher'))
      return true;
    this.router.navigate(['/']);
    return false;
  }
  redirectIfNotStudent(): Boolean {
    if (this.getdroit('student') || this.getDroitTemporaire('student'))
      return true;
    this.router.navigate(['/']);
    return false;
  }
  ifNotStudent(): boolean {
    if (this.getdroit('student') || this.getDroitTemporaire('student'))
      return true;
    else return false;
  }

  redirectAfterLogin() {
    this.auth().then(() => {
      if (this.getdroit('admin'))
        this.router.navigate(['/users']);
      else if (this.getdroit('teacher'))
        this.router.navigate(['/cours']);
      else this.router.navigate(['/courspublic/mycour']);
    });
  }

  private getDroitTemporaire(nom: string): Boolean {
    let today: Date = new Date();

    if (this.user == null || this.user.rolesTemp == null) return false;
    if (this.user.rolesTemp.find((rt) =>
      rt.nom.toLocaleLowerCase().includes(nom.toLowerCase()) && new Date(rt.debut) <= today && today <= new Date(rt.fin))) {
      console.log("Droit temporaire accorder pour ", nom);
      return true;
    }
    console.log("Droit temporaire indisponible pour ", nom)
    return false;
  }
  private getdroit(nom: string): Boolean {
    if (this.user == null) return false;
    if (this.user.role == null) return false;
    if (this.user.role.nom.toLocaleLowerCase().includes(nom.toLocaleLowerCase())) return true;
    return false;
  }

  deconnexion() {
    this.user = null;
    localStorage.removeItem('user');
    this.v = false;
    this.navI = Object.assign(navItems);
    this.auth();
  }

  save(user: User) {
    if (!user) return;
    localStorage.setItem('user', JSON.stringify(user));
    this.user = JSON.parse(localStorage.getItem('user'));
  }
  update() {
    this.user = JSON.parse(localStorage.getItem('user'));
    return this.user;
  }
  async verifyMenuShow() {
    if (this.v) return;
    this.navI = [];
    if (this.getdroit('admin') || this.getDroitTemporaire('admin')) {
      this.navI.push(navItems.find((n) => n.name.toLocaleLowerCase().includes("admin")));
      this.navI.push(navItems.find((n) => n.name.toLocaleLowerCase().includes("users")));
      this.navI.push(navItems.find((n) => n.name.toLocaleLowerCase().includes("classe")));
      this.navI.push(navItems.find((n) => n.name.toLocaleLowerCase().includes("profil")));
      this.navI.push(navItems.find((n) => n.name.toLocaleLowerCase().includes("modify profil")));
    }
    if (this.getdroit('teacher') || this.getDroitTemporaire('teacher')) {
      this.navI.push(navItems.find((n) => n.name.toLocaleLowerCase().includes("teacher")));
      this.navI.push(navItems.find((n) => n.name.toLocaleLowerCase().includes("cours professeur")));
      this.navI.push(navItems.find((n) => n.name.toLocaleLowerCase().includes("cours public")));
    }
    if (this.getdroit('student') || this.getDroitTemporaire('student')) {
      this.navI.push(navItems.find((n) => n.name.toLocaleLowerCase().includes("student")));
      this.navI.push(navItems.find((n) => n.name.toLocaleLowerCase().includes("cours etudiant")));
    }
    this.v = true;
  }

}
