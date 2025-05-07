import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from 'src/app/config/config';
import { AuthService } from 'src/app/shared/auth/auth.service';


@Injectable({
  providedIn: 'root'
})
export class VirtualWalletService {

 constructor(public http: HttpClient, public authSrv: AuthService) { }
 
  listVirtualWallets(){
     let headers = new HttpHeaders( {'Authorization' : 'Bearer ' + this.authSrv.token });
     let url = URL_SERVICIOS + '/virtual-wallets';
     return this.http.get(url, { headers: headers }); 
  }

  
  storeWallet( data: any){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
    let url = URL_SERVICIOS + "/virtual-wallets";
    return this.http.post(url, data, { headers: headers });  
  }

  updateWallet( id_wallet: any,data: any){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
    let url = URL_SERVICIOS + "/virtual-wallets/update/" + id_wallet;
    return this.http.post(url, data, { headers: headers }); 
  }

  getWallet( id_wallet:any){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token });
    let url = URL_SERVICIOS + "/virtual-wallets/" + id_wallet;
    return this.http.get( url, {headers: headers});
  }

  addSpent(data: any){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
    let url = URL_SERVICIOS + "/virtual-wallets/add-spent";
    return this.http.post(url, data, { headers: headers });  
  }

  addRecharge(data: any){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
    let url = URL_SERVICIOS + "/virtual-wallets/add-recharge";
    return this.http.post(url, data, { headers: headers });  
  }

  removeSpent(spent_id:any){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
    let url = URL_SERVICIOS + "/virtual-wallets/remove-spent/" + spent_id;
    return this.http.get( url, {headers: headers});
  }

  deleteVirtualWallet( wallet_id: any){
    let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
    let url = URL_SERVICIOS + "/virtual-wallets/" + wallet_id;
    return this.http.delete(url, { headers: headers }); 
  }
 
   
}
