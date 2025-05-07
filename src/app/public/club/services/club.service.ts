import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { URL_SERVICIOS } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class ClubService {

  
  constructor( private router: Router, private http: HttpClient ) { }

  getClub( club_hash:any){
    let url = URL_SERVICIOS + '/public/club-data/get-info/' + club_hash;
    return this.http.post( url, null );
  }
}
