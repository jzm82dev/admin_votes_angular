import { Component, ElementRef, inject, NgZone, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { event } from 'jquery';
import { MonitorsService } from '../monitors/service/monitors.service';
import { STRIPE_KEY } from 'src/app/config/config';
import Swal from 'sweetalert2';
import { SubscriptionService } from './service/subscription.service';


declare var paypal:any;


@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.scss']
})
export class SubscriptionsComponent {

    public url:any;
  
    paymentHandler: any = null;
    stripeAPIKey: any = STRIPE_KEY;//'pk_test_51O2st5FDKkCSgyXtv3RLWol4oSYj0l8TiMXtLBD1y1RYxETy2Ch6UsgvGrE90FDKTjBxUI89XnOpLh5tLkN0Pc2i00gk1TjUdL';
   
  
  
    @ViewChild('paypal',{static: true}) paypalElement?: ElementRef;
    @ViewChild('cardInfo',{static: true}) cardInfo?: ElementRef;
    @ViewChild('form_payment') formPayment: any;
    @ViewChild('basic_plan') basic_plan: any;
    @ViewChild('premium_plan') premium_plan: any;
    @ViewChild('row_plans') row_plans: any;
  
    public cardError: any;
    public card:any;
    public success_message: string = '';
    public error_message: string = '';
    public basic_plan_selected: any;
    public premium_plan_selected: any;
    public plan_selected: any;
    public plans:any = [];
    public loaded:boolean = false;
  
    public current_subscription:any = null;
    public has_active_subscription: boolean = false;
  
    constructor(private ngZone: NgZone, private subscriptionService: SubscriptionService ){
    }
  
    ngOnInit(): void {
      
      this.basic_plan_selected = document.getElementById('basic_plan');
      this.premium_plan_selected = document.getElementById('premium_plan');
      this.hideLoading();
  
      this.subscriptionService.getActivePlans().subscribe( (resp:any ) => {
        if(resp.message == 200){
          this.loaded = true;
          this.plans = resp.plans;
          this.plan_selected = this.plans[1];
          
        }
      })
      
      this.subscriptionService.getCurrentSubscription().subscribe((resp:any) => {
        if(resp.message == 200 ){
          this.loaded = true;
          this.current_subscription = resp.current_subscription;
          this.has_active_subscription = resp.has_active_subscription;
           if( this.has_active_subscription == false ){
            this.row_plans.nativeElement.classList.remove('hide-payment-form');
            this.formPayment.nativeElement.classList.remove('hide-payment-form');
            this.paypalInitialise(this.plan_selected.paypal_id);
            this.stripelInitialise();
          }else{
            this.row_plans.nativeElement.classList.remove('hide-payment-form');
            if(this.current_subscription.slug == 'premium'){
              this.basic_plan.nativeElement.classList.add('hide-payment-form');
            }else{
              this.premium_plan.nativeElement.classList.add('hide-payment-form');
            }
          }
          
        }
      })
  
      
  
     
  }
  
  stripelInitialise(): void {
      if( this.current_subscription == null ){
        
          const cardStyle = {
            base: {
              color: '#32325d',
              fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
              fontSmoothing: 'antialiased',
              fontSize: '16px',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#fa755a',
              iconColor: '#fa755a',
            },
          };
  
          const options = {
            business: "RocketRides"
          };
          
          //this.card = elements.create('card', {cardStyle});
          this.card = elements.create('card', { hidePostalCode: true, style: cardStyle });
          //this.card = elements.create('card');
          if(this.cardInfo){
            this.card.mount(this.cardInfo.nativeElement);
            this.card.addEventListener('change', this.onChange.bind(this))
          }
        }
  
     
    }
  
    onChange(event: any){
      if(event.error != undefined){
        this.ngZone.run(() => this.cardError = event.error.message);
      }else{
        this.ngZone.run(() => this.cardError = null);
      }
    }
  
    async paymentIntent(){
  
      const {token, error} = await stripe.createToken(this.card);
  
      if(token){
        this.subscriptionService.chargePaymentIntent(100, token.id).subscribe( ((resp:any) => {
          stripe.confirmCardPayment( resp.client_secret ).
          then(function(result:any){
              if(result.error){
                  alert('error')
              }else{
                alert('bieeen')
              }
          })
        }));
      }else{
        this.ngZone.run(() => this.cardError = error.message);
      }
  
    }
  
    async createSubscription(){
      
      const {token, error} = await stripe.createToken(this.card);
  
      
  
      if(token){
        this.showLoading();
        this.subscriptionService.createSubscription(this.plan_selected.slug, token.id).subscribe( ((resp:any) => {
          this.hideLoading();
          let clientSecret = resp.subscription.latest_invoice.payment_intent.client_secret;
          stripe.confirmCardPayment( clientSecret ).
          then(function(result:any){
              if(result.error){
                   Swal.fire({
                          title: 'Oppss... ',
                          text: 'Something went wrong!',
                          icon: "error"
                    });
              }else{
               /* Swal.fire({
                  title: 'Goood',
                  text: 'Subscription Activa',
                  icon: "success",
                });
                */
                
                Swal.fire({
                  title: "Goood",
                  text: "Se ha activado tu suscripción",
                  icon: "success",
                  confirmButtonColor: "#3085d6",
                  confirmButtonText: "Cerrar!"
                }).then((result) => {
                  if (result.isConfirmed) {
                    document.location.reload();
                  }
                });
                
              }
          })
        }));
      }else{
        this.ngZone.run(() => this.cardError = error.message);
      }
    }
  
   
  
  
    hideLoading(){
      var loading = document.getElementById('loading');
      if( loading ){
        loading.classList.remove('show-spinner');
        loading.classList.add('hide-spinner');
      }
    }
  
    ngOnDestroy(): void {
      if(this.card){
       this.card.destroy();
      }
    }
  
  
    showLoading(){
      var loading = document.getElementById('loading');
      if( loading ){
        loading.classList.remove('hide-spinner');
        loading.classList.add('show-spinner');
      }
    }
  
    paypalInitialise(product_id: string){
      //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
      //Add 'implements OnInit' to the class.
      paypal.Buttons({
        // optional styling for buttons
        // https://developer.paypal.com/docs/checkout/standard/customize/buttons-style-guide/
        style: {
          color: "gold",
          shape: "rect",
          layout: "vertical"
        },
  
        // set up the transaction
        createSubscription(data:any, actions:any) {
         return actions.subscription.create({
              "plan_id": product_id //"P-4FV30455EL654794YM6DLLVA"
          });
      },
  
        // finalize the transaction
        onApprove: async (data:any, actions:any) => {
          this.subscriptionService.saveSubscription(data.subscriptionID, product_id).subscribe( (resp:any) => {
            Swal.fire({
              title: "Goood",
              text: "Se ha activado tu suscripción",
              icon: "success",
              confirmButtonColor: "#3085d6",
              confirmButtonText: "Cerrar!"
            }).then((result) => {
              if (result.isConfirmed) {
                document.location.reload();
              }
            });
          })
          
        },
  
        // handle unrecoverable errors
        onError: (err:any) => {
          Swal.fire({
            title: 'Oppss... ',
            text: 'Something went wrong!',
            icon: "error"
        });
            console.error('An error prevented the buyer from checking out with PayPal');
        }
    }).render(this.paypalElement?.nativeElement);
  
    
  
    }
  
  
    selectPlan(plan_selected: string){
  
      const payplaButton = document.getElementById("paypal-button");
      if(payplaButton){
        payplaButton.innerHTML = '';
      }
      const searchIndex = this.plans.findIndex((plan:any) => plan.slug==plan_selected);
      this.plan_selected = this.plans[searchIndex];
      this.paypalInitialise(this.plan_selected.paypal_id);
      if( plan_selected == 'basic'){
        this.basic_plan_selected.classList.add('plan-selected');
        this.premium_plan_selected.classList.remove('plan-selected');
      }else{
        this.basic_plan_selected.classList.remove('plan-selected');
        this.premium_plan_selected.classList.add('plan-selected');
      }
      
    }
  
  
    
        
      cancelSubscription(){
        this.showLoadingCancel();
        var paymentPlatform;
    
        if( this.current_subscription.subscription_id.startsWith('I-')){  //is Paypal
          paymentPlatform = '1';
        }else{ // is Stripe
          paymentPlatform = '2';
        }
    
        this.subscriptionService.cancelSubscription(this.current_subscription.subscription_id, paymentPlatform).subscribe( (resp:any) => {
          this.hideLoadingCancel();
          Swal.fire({
              title: "Goood",
              text: "Subscription cancelada.",
              icon: "success",
              confirmButtonColor: "#3085d6",
              confirmButtonText: "Cerrar!"
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.href = '/subscriptions/get-subscription';
              }
            });    
          })
    
      }
    
      hideLoadingCancel(){
       
        var loading = document.getElementById('loading-cancel');
        if( loading ){
          loading.classList.remove('show-spinner');
          loading.classList.add('hide-spinner');
        }
      }
    
    
    
      showLoadingCancel(){
        var loading = document.getElementById('loading-cancel');
        if( loading ){
          loading.classList.remove('hide-spinner');
          loading.classList.add('show-spinner');
        }
      }
    
  
  
}
