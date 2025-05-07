import { Injectable } from '@angular/core';
import {
  
  CanActivate,
  Router,
  
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { routes } from '../routes/routes';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  user: any;
  token: any;

  constructor(private router: Router, private autSrv: AuthService) {}
  canActivate(
    
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
      /*if (localStorage.getItem('authenticated')) {
        return true;
      } else {
        this.router.navigate([routes.login]);
        return false;
      }*/
      let USER = localStorage.getItem('user');
      this.user = JSON.parse(USER ? USER : '');
      this.token = localStorage.getItem('token');



      if( this.user != null && this.token != null){
        let token = this.token;
        let expiration = (JSON.parse(atob(token.split('.')[1]))).exp;
        if(Math.floor((new Date().getTime())/1000) >= expiration){
          this.autSrv.logout();
          return false;
        }
        return true;
      }else{
        this.router.navigate([routes.login]);
        return false;
      }
      
  }
}
