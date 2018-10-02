import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { DataU } from '../models/datau.model';

@Injectable({
  providedIn: 'root'
})
export class SessionproviderService {
  user: User;
  datau: DataU;
  constructor(private router: Router) {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  auth() {
    if (this.user == null)
      this.router.navigate(['login']);
  }

  redirectIfLogin(){
    if(this.user!=null&&this.user.role!=null)
    if (this.user.role.nom == 'admin')
      this.router.navigate(['/dashboard'])
    else if (this.user.role.nom == 'teacher')
      this.router.navigate(['/cours'])
    else this.router.navigate(['/cours/public']);
  }
  redirectIfNotAdmin():void{
    console.log("verification des droits "+this.user);
    if (this.user.role.nom.includes('admin'))
      return;
    else if (this.user.role.nom.includes('teacher'))
      this.router.navigate(['/'])
    else this.router.navigate(['/']);
  }
  redirectIfNotTeacher():void{
    if (this.user.role.nom.includes('teacher'))
      return;
    else this.router.navigate(['/']);
  }
  redirectIfNotStudent():void{
    if (this.user.role.nom.includes('student'))
      return;
    else this.router.navigate(['/']);
  }
  ifNotStudent():boolean{
    if(this.user!=null&&this.user.role!=null)
    if (this.user.role.nom.includes('student'))
      return true;
    else return false;
  }

  redirectAfterLogin() {
    this.auth();
    console.log(this.user);
    if (this.user.role.nom.includes('admin'))
      this.router.navigate(['/dashboard']);
   else if (this.user.role.nom.includes('teacher'))
      this.router.navigate(['/cours']);
    else this.router.navigate(['/cours/public']);
  }

  deconnexion() {
    this.user = null;
    localStorage.removeItem('user');
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

}
