import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
// import { BehaviorSubject } from 'rxjs';
import { routes } from '../routes/routes';
import { URL_SERVICIOS } from 'src/app/config/config';
import { HttpClient } from '@angular/common/http';
import { catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  user: any;
  token: any;
  language: any;

  constructor(private router: Router, private http: HttpClient) {
    this.getLocalStorage();
  }

  public login( email: string, password: string) {
    //localStorage.setItem('authenticated', 'true');
    //this.router.navigate([routes.adminDashboard]);
    let URL = URL_SERVICIOS + '/auth/login';
    return this.http.post( URL, {email: email, password :password}).pipe(
      map((auth: any) => {
        const result = this.saveLocalStorage(auth);
        return result;
      }),
      catchError((error: any) => {
        console.log(error);
        return of(undefined);
      })
    );
  }

  public saveLocalStorage( auth: any){
    if( auth && auth.access_token){
      localStorage.setItem('token', auth.access_token);
      localStorage.setItem('user', JSON.stringify(auth.user));
      localStorage.setItem('authenticated', 'true');
      //localStorage.setItem('language', 'en');
      return true;
    }
    return false;
  }

  public logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('authenticated');
    this.router.navigate([routes.login]);
  }

  public getLocalStorage(){
    if(localStorage.getItem('token') && localStorage.getItem('user')   ){
      let USER = localStorage.getItem('user');
      this.user = JSON.parse(USER ? USER : '');
      this.token = localStorage.getItem('token');
      this.language = localStorage.getItem('language');
    }else{
      this.user = null;
      this.token = null;
      this.language = localStorage.getItem('language') ? localStorage.getItem('language') : 'es';
    }
  }
}


