import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecurrentService } from '../service/recurrent.service';
import { routes } from 'src/app/shared/routes/routes';
import { ReservationsService } from '../../reservations/service/reservations.service';
import { DatePipe } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-edit-recurrent',
  templateUrl: './edit-recurrent.component.html',
  styleUrls: ['./edit-recurrent.component.scss']
})
export class EditRecurrentComponent {
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

  cleanMessage(){
    this.error_message = '';
    this.success_message = '';
    this.error_message_2 = '';
    this.success_message_2 = '';
    this.message_errors = [];
  }

  selectReservation(id_reservation: any){
    let index = this.reservation_days.findIndex((item:any) => item.id == id_reservation);
    if(index != -1){
     this.reservation_selected = this.reservation_days[index];
    }
  }

  removeReservation(){
    
    this.cleanMessage();

    this.reservationSrv.deleteReservation(this.reservation_selected.id).subscribe( (resp:any) => {
      if( resp.message == 200){
        let index = this.reservation_days.findIndex((item:any) => item.id == this.reservation_selected.id);
        if(index != -1){
          this.reservation_days.splice(index, 1);
          this.closebutton.nativeElement.click();
          let pipe = new DatePipe('en-US');
          let date = pipe.transform(this.reservation_selected.date, 'dd/MM/yyyy');
          this.success_message_2 = this.translations['reservations.recurrent'].success_1_a + date + this.translations['reservations.recurrent'].success_1_b;
          this.reservation_selected = null;
        }
      }else{
        this.error_message_2 = this.translations['reservations.recurrent'].error_4;
      }
    })

  }

  save(){

    this.cleanMessage();

    if( this.reservation_name == '' ){
      this.error_message = this.translations['reservations.recurrent'].error_5;
      return;
    }

    if( this.reservation_mobile == '' ){
      this.error_message = this.translations['reservations.recurrent'].error_6;
      return;
    }

    let formData = new FormData();
    formData.append('name', this.reservation_name);
    formData.append('mobile', this.reservation_mobile);
    formData.append('reservations', JSON.stringify(this.reservation_days));

    this.recurrentReservationSrv.updateReservation(this.recurrent_id ,formData).subscribe( (resp:any) => {
      if(resp.message == 200){
        this.success_message = this.translations['commun_translations'].data_save_correctly;
      }else if(resp.message == 422) {
        this.error_message = this.translations['commun_translations'].data_save_error ;
        this.message_errors = resp.errors_text
      }else{
        this.error_message = this.translations['commun_translations'].data_save_error + ' ' + this.translations['commun_translations'].consult_admin;
      }
    });

  }

}
