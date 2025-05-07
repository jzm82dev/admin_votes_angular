import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { URL_SERVICIOS } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class ResultService {

  constructor( private router: Router, private http: HttpClient ) { }

  public getCategories( data: any){
    let url = URL_SERVICIOS + '/data/results/categories';
    return this.http.post(url, data);
  }

  public getCategoryDetails( category_id: string){
    let url = URL_SERVICIOS + '/data/results/category/' + category_id;
    return this.http.post(url, null);
  }

  public getMoreDetails( category_id: string){
    let url = URL_SERVICIOS + '/data/results/more-details-category/' + category_id;
    return this.http.post(url, null);
  }

  
}
