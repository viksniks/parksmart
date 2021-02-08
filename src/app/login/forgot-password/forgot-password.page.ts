import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';
import {ToastController} from "@ionic/angular";


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  resetPasswordForm: FormGroup;
  forbiddenEmails: any;
  errorMessage: string;
  successMessage: string;
  IsvalidForm = true;
  submitted = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toast:ToastController
  ) { }

  ngOnInit() {
    this.resetPasswordForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails),
    });
  }

  get f() {
    return this.resetPasswordForm.controls;
  }


  resetPassword(form) {
    
   if(form.email == "" || form.email == null)
   {
     return
   }
   else{
     this.toast.create({
       message:"Reset password link send to email sucessfully.",
       duration:3000
      
     }).then((ele)=>{
       ele.present().then(()=>{
        this.router.navigate(['/login']);
       })
     })
    
   }
      // this.IsvalidForm = true;
      // this.authService.requestReset(this.f.email.value).subscribe(
      //   data => {
      //     this.resetPasswordForm.reset();
      //     this.successMessage = "Reset password link send to email sucessfully.";
      //     setTimeout(() => {
      //       this.successMessage = null;
      //       this.router.navigate(['/login']);
      //     }, 3000);
      //   },
      //   err => {
      //     alert(JSON.stringify(err));
      //     if (err.error.message) {
      //       this.errorMessage = err.error.message;
      //     }
      //   }
      // );
  
  }


}
