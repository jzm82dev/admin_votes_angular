import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from 'src/app/config/config';
import { AuthService } from 'src/app/shared/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(public http: HttpClient, public authSrv: AuthService) { }

  listCategories( page:number = 1, search:string = ''){
    let headers = new HttpHeaders( {'Authorization' : 'Bearer ' + this.authSrv.token });
    let url = URL_SERVICIOS + '/categories?page=' + page + '&search=' + search;
    return this.http.get(url, { headers: headers }); 
  }

  getCategory( category_id:any){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token });
    let url = URL_SERVICIOS + "/categories/" + category_id;
    return this.http.get( url, {headers: headers});
  }
  
  storeCategory( data: any){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
    let url = URL_SERVICIOS + "/categories";
    return this.http.post(url, data, { headers: headers });  
  }

  editCategory( category_id: any,data: any){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
    let url = URL_SERVICIOS + "/categories/update/" + category_id;
    return this.http.post(url, data, { headers: headers });  
  }

  deleteCategory( category_id: any){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
    let url = URL_SERVICIOS + "/categories/" + category_id;
    return this.http.delete(url, { headers: headers }); 
  }

  config(){
    let headers = new HttpHeaders( {'Authorization' : 'Bearer ' + this.authSrv.token });
    let url = URL_SERVICIOS + '/categories/config';
    return this.http.get(url, { headers: headers }); 
  }

  addCouple(data: any){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
    let url = URL_SERVICIOS + "/categories/add-couple";
    return this.http.post(url, data, { headers: headers });  
  }

  editCouple(couple_id:string,  data: any){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
    let url = URL_SERVICIOS + "/categories/edit-couple/" + couple_id;
    return this.http.post(url, data, { headers: headers });  
  }

  getCouple(couple_id:any){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
    let url = URL_SERVICIOS + "/categories/get-couple/" + couple_id;
    return this.http.get(url, { headers: headers }); 
  }

  getCoupleResults(couple_id:any){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
    let url = URL_SERVICIOS + "/categories/get-couple-results/" + couple_id;
    return this.http.get(url, { headers: headers }); 
  }

  async getCoupleResults2( couple_id:any ) {
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
    let url = URL_SERVICIOS + "/categories/get-couple-results/" + couple_id;
    let data: any;
    try {
      data = await this.http.get(url, { headers: headers }).toPromise();
    } catch (error) {
      console.error(error);
    }
    return data;
  }

  removeCouple(couple_id:any){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
    let url = URL_SERVICIOS + "/categories/delete-couple/" + couple_id;
    return this.http.delete(url, { headers: headers }); 
  }

  findPlayerByMobile( mobile: string){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
    let url = URL_SERVICIOS + "/categories/get-players-mobile/" + mobile;
    return this.http.get(url, { headers: headers }); 
  }

  findPlayerByData( data: any){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
    let url = URL_SERVICIOS + "/categories/get-players-data";
    return this.http.post(url, data, { headers: headers });  
  }

  findPlayerByName( name: string){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
    let url = URL_SERVICIOS + "/categories/get-players-name/" + name;
    return this.http.get(url, { headers: headers }); 
  }
 
  findPlayerBySurame( surname: string){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
    let url = URL_SERVICIOS + "/categories/get-players-surname/" + surname;
    return this.http.get(url, { headers: headers }); 
  }

  totalCouplesCategory( id_category: any){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token });
    let url = URL_SERVICIOS + "/categories/get-total-couples/" + id_category;
    return this.http.get( url, {headers: headers});
  }

  createDraw( tournament_id: string ){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token });
    let url = URL_SERVICIOS + "/tournaments/configure-tournament/" + tournament_id;
    return this.http.get( url, {headers: headers});
  }

  deleteDraw( tournament_id: string ){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
    let url = URL_SERVICIOS + "/tournaments/delete-draw/" + tournament_id;
    return this.http.delete(url, { headers: headers }); 
  }

 

}
