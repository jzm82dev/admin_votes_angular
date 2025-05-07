import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from 'src/app/config/config';
import { AuthService } from 'src/app/shared/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class JourneyService {

  constructor(public http: HttpClient, public authSrv: AuthService) { }


  listJourneys( page:number = 1, category_id:string, search:string = ''){
    let headers = new HttpHeaders( {'Authorization' : 'Bearer ' + this.authSrv.token });
    let url = URL_SERVICIOS + '/journeys?page=' + page + '&category_id=' + category_id + '&search=' + search;
    return this.http.get(url, { headers: headers }); 
  }

  createCalendar( category_id:string ){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token });
    let url = URL_SERVICIOS + "/journeys/create-calendar/" + category_id;
    return this.http.get( url, {headers: headers});
  }

  getJourney( journey_id:any ){
    let headers = new HttpHeaders( {'Authorization' : 'Bearer ' + this.authSrv.token });
    let url = URL_SERVICIOS + '/journeys/' + journey_id;
    return this.http.get(url, { headers: headers }); 
  }

  getMatchsJourney( journey_id:string){
    let headers = new HttpHeaders( {'Authorization' : 'Bearer ' + this.authSrv.token });
    let url = URL_SERVICIOS + '/journeys/get-matchs/' + journey_id;
    return this.http.get(url, { headers: headers }); 
  }

  saveResult( category_id:any, data: any){
    let headers = new HttpHeaders( {'Authorization' : 'Bearer ' + this.authSrv.token });
    let url = URL_SERVICIOS + '/journeys/save-result/' + category_id;
    return this.http.post(url, data, { headers: headers });  
  }

  editJourney( journey_id:any, data: any){
    let headers = new HttpHeaders( {'Authorization' : 'Bearer ' + this.authSrv.token });
    let url = URL_SERVICIOS + '/journeys/edit-data/' + journey_id;
    return this.http.post(url, data, { headers: headers });  
  }
  

  getRanking( category_id:any ){
    let headers = new HttpHeaders( {'Authorization' : 'Bearer ' + this.authSrv.token });
    let url = URL_SERVICIOS + '/journeys/ranking/' + category_id;
    return this.http.get(url, { headers: headers }); 
  }
  
}
