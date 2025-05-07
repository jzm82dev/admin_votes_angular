import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { URL_SERVICIOS } from 'src/app/config/config';
import { AuthService } from 'src/app/shared/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {


  constructor( private router: Router, private http: HttpClient, public authSrv: AuthService ) { }


  getClubPayments( page:number = 1, search:string = ''){
    let headers = new HttpHeaders( {'Authorization' : 'Bearer ' + this.authSrv.token });
    let url = URL_SERVICIOS + '/payments?page=' + page + '&search=' + search;
    return this.http.get(url, { headers: headers }); 
  }


  getPaymentData( payment_id: string){
    let headers = new HttpHeaders( {'Authorization' : 'Bearer ' + this.authSrv.token });
    let url = URL_SERVICIOS + '/payments/get-payment/' + payment_id;
    return this.http.get(url, { headers: headers }); 
  }


}
