import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { URL_SERVICIOS } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

 constructor(public http: HttpClient, public authSrv: AuthService) { }
   

    getQuestion(question_id: string){
       let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token });
       let url = URL_SERVICIOS + "/questions/" + question_id;
       return this.http.get( url, {headers: headers});
    }

    addAnswer(data: any){
      let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
      let url = URL_SERVICIOS + "/questions/add-answer";
      return this.http.post(url, data, { headers: headers });  
    }

    

  

    removeAnswer(answer_id:any){
      let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
      let url = URL_SERVICIOS + "/questions/remove-answer/" + answer_id;
      return this.http.get( url, {headers: headers});
    }

     saveQuestion( data: any){
       let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
       let url = URL_SERVICIOS + "/questions";
       return this.http.post(url, data, { headers: headers });  
     }
 
     
   
}
