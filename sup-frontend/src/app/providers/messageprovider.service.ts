import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class MessageproviderService {

  constructor(private toastr: ToastrService) {
 }
   
showSuccess(message:string,titre:string) {
  this.toastr.success(message, titre,{
    tapToDismiss:true,
    closeButton:true
   });
}

 showError(message:string,titre:string) {
   console.log(this.toastr);
   this.toastr.error(message, titre,{
    tapToDismiss:false,
    closeButton:true
   });

 }

 showWarning(message:string,titre:string) {
   this.toastr.warning(message, titre,{
    tapToDismiss:false,
    closeButton:true
   });
 }

 showInfo(message:string) {
   this.toastr.info(message,'',{
    tapToDismiss:true,
    closeButton:true
   });
 }
 
 showCustom(message:string,titre:string) {
 }
}