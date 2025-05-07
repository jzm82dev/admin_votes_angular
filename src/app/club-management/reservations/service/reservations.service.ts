import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, interval, lastValueFrom, take } from 'rxjs';
import { URL_SERVICIOS } from 'src/app/config/config';
import { AuthService } from 'src/app/shared/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ReservationsService {

  public message: string = '';
  public response: string = '';
  
  constructor(public http: HttpClient, public authSrv: AuthService) { }
  
  
  config( day_week_number: string, date: string, sport_selected: number ){
    let headers = new HttpHeaders( {'Authorization' : 'Bearer ' + this.authSrv.token });
    let url = URL_SERVICIOS + '/reservations/config?day_week_number=' + day_week_number + '&date=' + date + '&sport_selected=' + sport_selected;
    return this.http.get(url, { headers: headers }); 
  }

  storeReservation( data: any){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
    let url = URL_SERVICIOS + "/reservations";
    return this.http.post(url, data, { headers: headers });  
  }

  getReservation( reservation_id: any){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token });
    let url = URL_SERVICIOS + "/reservations/" + reservation_id;
    return this.http.get( url, {headers: headers});
  }


  deleteReservation( reservation_id: any){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
    let url = URL_SERVICIOS + "/reservations/" + reservation_id;
    return this.http.delete(url, { headers: headers }); 
  }

  getReservationPerMonth( data: any){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
    let url = URL_SERVICIOS + "/reservations/get-reservations-month";
    return this.http.post(url, data, { headers: headers }); 
  }

   getReservationPerRange( data: any){
    
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
    let url = URL_SERVICIOS + "/reservations/get-reservations-range";
    return this.http.post(url, data, { headers: headers }); 
  }

  /*
  async fetchData() {
    let url = URL_SERVICIOS + "/reservations/get-reservations-range";
    this.message = "Fetching..";
    this.response = "";
    this.response = await this.http
      .get<any>(url)
      .pipe(delay(1000))
      .toPromise();
    this.message = "Fetched";
  }

  async  execute() {
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
    let url = URL_SERVICIOS + "/reservations/get-reservations-range";

    const source$ = this.http
      .get<any>(url).pipe(take(10));
    const finalNumber = await lastValueFrom(source$);
    console.log(`The final number is ${finalNumber}`);
  }
  
  */
}
