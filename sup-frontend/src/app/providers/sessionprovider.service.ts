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
    if (this.user != null && this.user.role != null)
      if (this.user.role.nom == 'admin')
        this.router.navigate(['/users'])
      else if (this.user.role.nom == 'teacher')
        this.router.navigate(['/cours'])
      else this.router.navigate(['/courspublic/mycour']);
  }
  redirectIfNotAdmin(): void {
    if (this.user.role.nom.includes('admin'))
      return;
    else if (this.user.role.nom.includes('teacher'))
      this.router.navigate(['/'])
    else this.router.navigate(['/']);
  }
  redirectIfNotTeacher(): void {
    if (this.user.role.nom.includes('teacher'))
      return;
    else this.router.navigate(['/']);
  }
  redirectIfNotStudent(): void {
    if (this.user.role.nom.includes('student'))
      return;
    else this.router.navigate(['/']);
  }
  ifNotStudent(): boolean {
    if (this.user != null && this.user.role != null)
      if (this.user.role.nom.includes('student'))
        return true;
      else return false;
  }

  redirectAfterLogin() {
    this.auth().then(()=>{
      if (this.user.role.nom.includes('admin'))
      this.router.navigate(['/users']);
    else if (this.user.role.nom.includes('teacher'))
      this.router.navigate(['/cours']);
    else this.router.navigate(['/courspublic/mycour']);
    });
    
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
    this.navI=[];
    if (this.user == null) return;
    if (this.user.role.nom.includes("admin")) {
      this.navI.push(navItems.find((n)=>n.name.toLocaleLowerCase().includes("admin")));
      this.navI.push(navItems.find((n)=>n.name.toLocaleLowerCase().includes("users")));
      this.navI.push(navItems.find((n)=>n.name.toLocaleLowerCase().includes("classe")));
      this.navI.push(navItems.find((n)=>n.name.toLocaleLowerCase().includes("profil")));
      this.navI.push(navItems.find((n)=>n.name.toLocaleLowerCase().includes("modify profil")));
    }
    if (this.user.role.nom.includes("teacher")) {
      this.navI.push(navItems.find((n)=>n.name.toLocaleLowerCase().includes("teacher")));
      this.navI.push(navItems.find((n)=>n.name.toLocaleLowerCase().includes("cours professeur")));
      this.navI.push(navItems.find((n)=>n.name.toLocaleLowerCase().includes("cours public")));
    }
    if (this.user.role.nom.includes("student")) {
      this.navI.push(navItems.find((n)=>n.name.toLocaleLowerCase().includes("student")));
      this.navI.push(navItems.find((n)=>n.name.toLocaleLowerCase().includes("cours etudiant")));
  }
  this.v = true;
}

}
