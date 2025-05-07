import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from 'src/app/config/config';
import { AuthService } from 'src/app/shared/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  
    constructor(public http: HttpClient, public authSrv: AuthService) { }
  
    getActivePlans(){
      let headers = new HttpHeaders( {'Authorization' : 'Bearer ' + this.authSrv.token });
      let url = URL_SERVICIOS + '/payments/get-plans';
      return this.http.get(url, { headers: headers }); 
    }
  
  
    getCurrentSubscription(){
      let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token });
      let url = URL_SERVICIOS + "/subscription/current-subscription";
      return this.http.get( url, {headers: headers});
    }
  
    /*
      Pay on time payment of amount in eur
    */
    chargePaymentIntent(amount: number, tokenId:string){
      let data = {
        'value': amount,
        'currency': 'eur',
        'payment_method': tokenId,
        'payment_platform': 2 // stripe
      };
      
      let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
      let url = URL_SERVICIOS + "/payments/pay";
      return this.http.post(url, data, { headers: headers });  
  
    }
  
  
    /*
      Create a subscription of the planId
    */
    createSubscription(plan: string, tokenId:string){
      let data = {
        'plan': plan,
        'payment_method': tokenId,
        'payment_platform': 2 // stripe
      };
      
      let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
      let url = URL_SERVICIOS + "/subscription/store";
      return this.http.post(url, data, { headers: headers });  
  
    }
  
    saveSubscription(subscription_id:string, product_id: string){
      let data = {
        'subscription_id': subscription_id,
        'product_id': product_id
      };
      
      let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
      let url = URL_SERVICIOS + "/subscription/save-club-subscription";
      return this.http.post(url, data, { headers: headers });  
  
    }
  
  
    cancelSubscription( subscription_id: string, platfomr_id: string){
      let data = {
        'subscription_id': subscription_id,
        'payment_platform': platfomr_id // stripe
      };
      
      let headers = new HttpHeaders({ 'Authorization': 'Bearer '+ this.authSrv.token});
      let url = URL_SERVICIOS + "/payments/cancel-subscription";
      return this.http.post(url, data, { headers: headers });  
    }
  
}
