import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { routes } from 'src/app/shared/routes/routes';
import { PaymentService } from '../service/payment.service';
import { URL_SERVICIOS } from 'src/app/config/config';

@Component({
  selector: 'app-invoice-view',
  templateUrl: './invoice-view.component.html',
  styleUrls: ['./invoice-view.component.scss']
})
export class InvoiceViewComponent {
  public routes = routes;

  public payment_id: string = '';
  public payment_selected: any;
  public club: any;
  public loaded: boolean = false;

  public URL_SERVICES: string = URL_SERVICIOS;

  constructor(public activateRoute: ActivatedRoute, public paymentSrv: PaymentService){}
  

  ngOnInit(): void {
   
    this.activateRoute.params.subscribe( (resp:any) => {
      this.payment_id = resp.id;
      this.paymentSrv.getPaymentData(this.payment_id).subscribe( (resp:any) => {
        this.payment_selected = resp.payment;
        this.club = resp.club;
        this.loaded = true;
       
      })
    })
  }

  getPaymentSelected(){

  }

}
