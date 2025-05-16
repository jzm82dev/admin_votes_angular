import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { URL_SERVICIOS } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class MeetingService {

  constructor(public http: HttpClient, public authSrv: AuthService) { }
  
    listMeetings( page:number = 1, search:string = '', urbanisation_id: string, building: string ){
      let headers = new HttpHeaders( {'Authorization' : 'Bearer ' + this.authSrv.token });
      let url = URL_SERVICIOS + '/meetings?page=' + page + '&search=' + search + '&urbanisation_id=' + urbanisation_id + '&building=' + building;
      return this.http.get(url, { headers: headers }); 
    }
  
    storeMeeting( data: any){
      let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
      let url = URL_SERVICIOS + "/meetings";
      return this.http.post(url, data, { headers: headers });  
    }

    getMeeting(meeting_id: string){
      let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token });
      let url = URL_SERVICIOS + "/meetings/" + meeting_id;
      return this.http.get( url, {headers: headers});
    }
  
  
    getFinalReport(meeting_id: string){
      let headers = new HttpHeaders( {'Authorization' : 'Bearer ' + this.authSrv.token });
    let url = URL_SERVICIOS + '/meetings/final-report?meeting_id=' + meeting_id ;
    return this.http.get(url, { headers: headers }); 
    }

    config(){
      let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
      let url = URL_SERVICIOS + "/meetings/config";
      return this.http.get(url, { headers: headers }); 
    }
  
    addQuestion(data: any){
      let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
      let url = URL_SERVICIOS + "/meetings/add-question";
      return this.http.post(url, data, { headers: headers });  
    }
  
    removeQuestion(question_id:any){
      let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
      let url = URL_SERVICIOS + "/meetings/remove-question/" + question_id;
      return this.http.get( url, {headers: headers});
    }

    assistOwner(data: any){
      let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
      let url = URL_SERVICIOS + "/meetings/add-ssistant-meeting";
      return this.http.post(url, data, { headers: headers });
    }

    cancelAssistOwner(owner_id:string, meeting_id:string){
      let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
      let url = URL_SERVICIOS + "/meetings/cancel-ssistant-meeting/" + meeting_id + "/" + owner_id;
      return this.http.post(url, null, { headers: headers });
    }
  
}
