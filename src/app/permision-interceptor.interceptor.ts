import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import { AuthService } from './shared/auth/auth.service';
import { ClubDataService } from './public/club-data/services/club-data.service';

@Injectable()
export class PermisionInterceptorInterceptor implements HttpInterceptor {

  constructor( private authSrv: AuthService, public clubDataSrv: ClubDataService ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError( (response: HttpErrorResponse) => {
        if(response.status == 403){
          //alert(response.error.message);
          Swal.fire({
            title: "Error",
            text: response.error.message,
            icon: "warning"
          });
        }
        if(response.status == 401){
          //alert(response.error.message);
          Swal.fire({
            title: "Error",
            text: 'Unauthorized',
            icon: "warning"
          });
          this.authSrv.logout();
        }
        if(response.status == 402){
          /*Swal.fire({
            title: "Error",
            text: 'Usuario o contraseña incorrecta',
            icon: "warning"
          });*/
        }
        if(response.status == 403){
          Swal.fire({
            title: "Tu email aún no ha sido validado. ¿Te enviamos email para verificar tu cuenta?",
            showDenyButton: false,
            showCancelButton: true,
            confirmButtonText: "Enviar"
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              this.clubDataSrv.sendEmailVerify(response.error.email).subscribe( (resp:any) => {
                if( resp.message == 200){
                  Swal.fire("Email enviado!" , "", "success");
                }else{
                  Swal.fire("Ha habido un fallo al enviar el email", "", "info");
                }
              })
            } else if (result.isDenied) {
              Swal.fire("Changes are not saved", "", "info");
            }
          });
        }
        if(response.status == 500){
          //alert(response.error.message);
          Swal.fire({
            title: "Error",
            text: response.error.message,
            icon: "warning"
          });
        }
        return throwError(response);
      })
    );
  }
}
