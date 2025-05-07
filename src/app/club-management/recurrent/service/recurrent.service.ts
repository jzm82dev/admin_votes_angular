import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from 'src/app/config/config';
import { AuthService } from 'src/app/shared/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RecurrentService {

  constructor(public http: HttpClient, public authSrv: AuthService) { }

  listReservationsRecurrent(page:number = 1, search:string = '', specialitie_id: string = '', date: any=null){
    let headers = new HttpHeaders( {'Authorization' : 'Bearer ' + this.authSrv.token });
    let url = URL_SERVICIOS + '/reservations/list-recurrents?page=' + page + '&search=' + search ;
    let filter_link = '';
    if(search != ''){
      filter_link += '&search=' + search ;
    }
    return this.http.get(url + filter_link, { headers: headers }); 
  }

  config(){
    let headers = new HttpHeaders( {'Authorization' : 'Bearer ' + this.authSrv.token });
    let url = URL_SERVICIOS + '/reservations/config-reurrents';
    return this.http.get(url, { headers: headers }); 
  }

  registerRecurrentReservation( data:any){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
    let url = URL_SERVICIOS + "/reservations/save-reccurrent";
    return this.http.post(url, data, { headers: headers });  
  }

  deleteRecurrentReservation( reservation_id: any){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
    let url = URL_SERVICIOS + "/reservations/delete-recurrent/" + reservation_id ;
    return this.http.delete(url, { headers: headers });  
  }

  getRecurrentReservation( recurrent_id:any ){
    let headers = new HttpHeaders( {'Authorization' : 'Bearer ' + this.authSrv.token });
    let url = URL_SERVICIOS + '/reservations/get-recurrent-reservation?recurrent_id=' + recurrent_id;
    return this.http.get(url, { headers: headers }); 
  }

  updateReservation( reservation_recurrent_id:any, data: any){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
    let url = URL_SERVICIOS + "/reservations/update-recurrent-reservation/" + reservation_recurrent_id;
    return this.http.post(url, data, { headers: headers }); 
  }

}
