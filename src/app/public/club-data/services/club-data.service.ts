import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { URL_SERVICIOS } from 'src/app/config/config';
import { AuthService } from 'src/app/shared/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ClubDataService {

  constructor( private router: Router, private http: HttpClient, public authSrv: AuthService ) { }

  findClubs(data: any){
    let headers = new HttpHeaders( {'Access-Control-Allow-Origin':'*'});
    let url = URL_SERVICIOS + "/public/find-clubs";
    return this.http.post( url, data, { headers: headers });
  }

  getClub( club_hash:any){
    let url = URL_SERVICIOS + '/public/club-data/get-info/' + club_hash;
    return this.http.post( url, null );
  }

  config( hash_club: string, day_week_number: string, date: string, sport_selected: number ){
    let url = URL_SERVICIOS + '/public/config?hash=' + hash_club + '&day_week_number=' + day_week_number + '&date=' + date + '&sport_selected=' + sport_selected;
    return this.http.post(url, null); 
  }

  storeReservation( data: any){
    let url = URL_SERVICIOS + "/public/create-booking";
    return this.http.post(url, data );  
  }

  getBooking( reservation_id: any){
    let url = URL_SERVICIOS + "/public/get-booking/" + reservation_id;
    return this.http.post( url, null);
  }

  cancelBooking( data: any){
    let url = URL_SERVICIOS + "/public/cancel-booking";
    return this.http.post(url, data); 
  }

  getLeagues( page:number = 1, hash_club: string, search:string = '' ){
    let url = URL_SERVICIOS + '/public/get-leagues?hash_club=' + hash_club + '&page=' + page + '&search=' + search;
    return this.http.post(url, null); 
  }

  getLeague(league_id:string){
    let url = URL_SERVICIOS + "/public/get-league/" + league_id;
    return this.http.post( url, null);
  }

  getDataCategoryLeague(category_id:string){
    let url = URL_SERVICIOS + "/public/get-category-league/" + category_id;
    return this.http.post( url, null);
  }

  getDataCategoryTournament(category_id:string){
    let url = URL_SERVICIOS + "/public/get-category-tournament/" + category_id;
    return this.http.post( url, null);
  }

  getCouple(couple_id:any){
    let url = URL_SERVICIOS + "/public/get-couple/" + couple_id;
    return this.http.post(url, null); 
  }

  getCoupleResults(couple_id:any){
    let url = URL_SERVICIOS + "/public/get-couple-results/" + couple_id;
    return this.http.post(url, null); 
  }

  getMatchsJourney(journey_id:any){
    let url = URL_SERVICIOS + "/public/get-matchs-journey/" + journey_id;
    return this.http.post(url, null); 
  }

  
  getTournaments( page:number = 1, hash_club: string, search:string = '' ){
    let url = URL_SERVICIOS + '/public/get-tournaments?hash_club=' + hash_club + '&page=' + page + '&search=' + search;
    return this.http.post(url, null); 
  }

  getTournament(tournament_hash:string){
    let url = URL_SERVICIOS + "/public/get-tournament/" + tournament_hash;
    return this.http.post( url, null);
  }

  getDraw(  data: any ){
    let url = URL_SERVICIOS + "/public/get-draw";
    return this.http.post(url, data); 
  }

  registerPlayerTournament( data: any){
    let url = URL_SERVICIOS + "/public/register-user-tournament";
    return this.http.post(url, data );  
  }

  sendEmail( data:any ){
    let url = URL_SERVICIOS + "/public/send-question-email";
    return this.http.post(url, data );  
  }

  sendEmailForgotPassword( data:any ){
    let url = URL_SERVICIOS + "/public/send-forgot-password-email";
    return this.http.post(url, data );  
  }

  
  public getUserByToken( token: string){
    let url = URL_SERVICIOS + "/public/user-by-token/" + token;
    return this.http.post( url, null);
  }

  public verifyUser( token: string){
    let url = URL_SERVICIOS + "/public/verify-user/" + token;
    return this.http.post( url, null);
  }

  public sendEmailVerify( email: string){
    let url = URL_SERVICIOS + "/public/send-email-verify-club/" + email;
    return this.http.post( url, null);
  }

  updatePasswordUser( data:any ){
    let url = URL_SERVICIOS + "/public/update-password-user";
    return this.http.post(url, data );  
  }

}
