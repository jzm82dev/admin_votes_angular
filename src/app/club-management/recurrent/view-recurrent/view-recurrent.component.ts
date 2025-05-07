import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecurrentService } from '../service/recurrent.service';
import { routes } from 'src/app/shared/routes/routes';
import { ReservationsService } from '../../reservations/service/reservations.service';
import { DatePipe } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-view-recurrent',
  templateUrl: './view-recurrent.component.html',
  styleUrls: ['./view-recurrent.component.scss']
})
export class ViewRecurrentComponent {
  @ViewChild('closebutton') closebutton: any;

  public routes = routes;

  public recurrent_id: string = '';
  public mobile: string = '';
  public day_number:string = '';
  public start_hour: string = '';

  public reservation_name: string = '';
  public reservation_mobile: string = '';
  public end_date: any ;
  public reservation_days: any = [];

  public reservation_selected: any;
  public success_message: string = '';
  public error_message: string = '';
  public success_message_2: string = '';
  public error_message_2: string = '';
  public message_errors: any = [];
  public translations:any = [];

  constructor( public recurrentReservationSrv: RecurrentService, public activateRoute: ActivatedRoute, 
               public reservationSrv: ReservationsService, public translate: TranslateService){}

  ngOnInit(): void {

    this.initializeLanguage();

    this.activateRoute.params.subscribe((resp:any) => {
      this.recurrent_id = resp.id;
      
      console.log(this.recurrent_id);
      //this.courtId = resp.id;
      this.getReservationSelected();
    })
  }


  initializeLanguage(){
    this.translate.use(this.reservationSrv.authSrv.language);
    this.translate.setDefaultLang(this.reservationSrv.authSrv.language);

    this.translate.get(['commun_translations', 'reservations.recurrent'])
    .subscribe((resp:any) => {
      this.translations = resp;
    }); 
    
  }

  getReservationSelected(){

    this.recurrentReservationSrv.getRecurrentReservation( this.recurrent_id ).subscribe( (resp:any) => {
      if(resp.message == 200){
        this.reservation_name = resp.name_reservation;
        this.reservation_mobile = resp.mobile_reservation;
        this.reservation_days = resp.reservations; 
        let pipe = new DatePipe('en-US');
        this.end_date = pipe.transform(resp.date_end, 'dd/MM/yyyy');
      }
    });


  }

}
