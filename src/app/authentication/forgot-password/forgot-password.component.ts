import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ClubDataService } from 'src/app/public/club-data/services/club-data.service';
import { routes } from 'src/app/shared/routes/routes';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  public routes = routes;
  
  public disabledSent: boolean = false;
  public email: string = '';
  public show_error_fields: boolean = false;
  public sent_ok:boolean = false;
  public sent_error: boolean = false;
  public no_email_registed: boolean = false;

  constructor(public router : Router, public clubDataSrv: ClubDataService){

  }
  sendForgotPasswordEmail(){
    
    this.disabledSent = true;
    
    if( this.email == '' ){
      this.show_error_fields = true;
    }

    let formData = new FormData();
    formData.append('email', this.email);
    

    
    this.clubDataSrv.sendEmailForgotPassword(formData).subscribe( (resp:any) => {
      this.show_error_fields = false;
      this.no_email_registed = false;
      switch (resp.message) {
        case 200:
          this.email = '';
          this.sent_ok = true;
          break;
        
        case 420:
          this.no_email_registed = true;
          break;

        default:
          this.sent_error = true;
          break;
      }

    })
    //this.router.navigate([routes.login]);
  }
}
