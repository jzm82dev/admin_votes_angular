import { Component } from '@angular/core';
import { routes } from 'src/app/shared/routes/routes';
import { EmailService } from '../service/email.service';

@Component({
  selector: 'app-new-email',
  templateUrl: './new-email.component.html',
  styleUrls: ['./new-email.component.scss']
})
export class NewEmailComponent {

  public routes = routes;
  public email: string = '';
  public type_email: string = '0';

  public message_errors_member: any = [];
  public error_send_email: string = '';
  public success_send_email: string = '';


  constructor( public emailSrv: EmailService ){}


  cleanMessage(){
    this.error_send_email = '';
    this.success_send_email = '';
    this.message_errors_member = [];
  }


  sendEmail(){
    
    this.cleanMessage();

    if( this.email == '' ){
      this.error_send_email = 'Introduzca una cuenta de correo válida';
      return;
    }

    if( this.type_email == '0' ){
      this.error_send_email = 'Seleccione el email a enviar';
      return;
    }

    
    let formData = new FormData();
    formData.append('email', this.email);
    formData.append('email_type', this.type_email);

    this.emailSrv.sendEmail(formData).subscribe( (resp:any) => {
      if( resp.message == 200){
        this.success_send_email  = 'Email enviado correctamente';
      }else if(resp.message == 422) {
          this.error_send_email = 'Ha pasado algo en el envio del email'
          this.message_errors_member = resp.errors_text;
      }else if(resp.message == 403) {    
        this.error_send_email = 'Ha pasado algo en el envio del email 2'
        this.message_errors_member = resp.errors_text;
      }
    })

  }

}
