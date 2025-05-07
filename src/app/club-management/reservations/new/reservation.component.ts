import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { routes } from 'src/app/shared/routes/routes';
import { ReservationsService } from '../service/reservations.service';
import { DatePipe } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { MembersService } from '../../members/service/members.service';
import { DateAdapter } from '@angular/material/core';


@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent {

  @ViewChild('closebuttonAddShedule') closebutton: any;
  @ViewChild('closebuttonShowhedule') closeShowbutton: any;
  @ViewChild('closebuttonDeleteReservation') closebuttonDeleteReservation: any;
  
  
  
  public WeekDays:any = [];// = [ 'Lunes', 'Martes', 'Miércoles',  'Jueves', 'Viernes', 'Sábado', 'Domingo'];

  public routes = routes;
  public date: any;
  public scheduleHours = ['9:00', '9:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30'];
  public hoursSelected: any = [];
  public name_reservation: string = '';
  public surname_reservation: string = '';
  public telephone_reservation: string = '';
  public error_message_popup: string = '';
  public susccess_message_popup: string = '';
  
  public error_message: string = 'Para poder reservar tienes que seleccionar la menos 1.5h';
  public reserve_day: any;
  public day_name: string = '';
  public date_format: any;
  public courts: any = [];
  public all_courts: any = [];
  public court_selected: any;
  public min_hour_open: any;
  public max_hour_open: any;
  //public open_hours: any = [];
  public schedule_club: any = [];
  public schedule: any = [];
  public day_week_number: string = ''; // day_1, day_2, day_3...
  public loaded: boolean = false;
  public correctSchedule: boolean = true;
  public disableButtonReserve: boolean = true;
  public reservations: any = [];
  public reservation_hours: any = [];
  public club_reservations: any = [];
  public reservation: any = [];
  public date_reservation: any ;
  public message_errors: any = [];
  public translations:any = [];
  public sport_selected: number = 1; // padel
  public hasPadelCourts: boolean = false;
  public hasTennisCourts: boolean = false;
  public hasPickleballCourts: boolean = false;
  public hasSquashCourts: boolean = false;
  public hasBadmintonCourts: boolean = false;
  public type_reservations: any = [];
  public potential_member_found: any = [];
  public member_id_reservation: string = '';
  public data_search_members: any = {
    'name': '',
    'mobile': ''
  };
  public total_sport_clubs: number = 0;
  public can_edit: boolean = false;
  public user: any;  


  constructor(public reservationSrv: ReservationsService, public activateRoute: ActivatedRoute, 
              public router: Router, public translate: TranslateService, public memberSrv: MembersService, date: DateAdapter<Date>){ 

      if( this.reservationSrv.authSrv.language == 'es'){
        date.getFirstDayOfWeek = () => 1;
      }
  }

  ngOnInit(): void {
    this.user = this.reservationSrv.authSrv.user;
    this.hasPermission();
    this.activateRoute.params.subscribe( (resp: any) => {
      if(resp.date){
        this.date = resp.date;
      }else{
        let pipe = new DatePipe('en-US');
        let today = new Date();
        let date = pipe.transform(today, 'yyyy-MM-dd');
        this.date = date;
      }
      if(resp.sport_id){
        this.sport_selected = resp.sport_id;
      }
      this.reserve_day = new Date(this.date);
      this.initializeLanguage();
    });
    
    this.loaded = false;
    
  }

  loadFalse(){
    this.loaded = false;
  }

  initializeLanguage(){
   
    this.translate.use(this.reservationSrv.authSrv.language);
    this.translate.setDefaultLang(this.reservationSrv.authSrv.language);
    this.translate.get(['commun_translations', 'club_translations.schedule', 'reservations'])
    .subscribe((resp:any) => {
      this.translations = resp;
      this.WeekDays = [this.translations['commun_translations'].day_1, 
                       this.translations['commun_translations'].day_2,
                       this.translations['commun_translations'].day_3,
                       this.translations['commun_translations'].day_4,
                       this.translations['commun_translations'].day_5,
                       this.translations['commun_translations'].day_6,
                       this.translations['commun_translations'].day_7]
      this.getDayWeek();
      this.getReservationsDay();
      this.error_message = this.translations['reservations'].notice_3;
      this.type_reservations['one-time'] = this.translations['reservations'].type_one_time;
      this.type_reservations['recurrent'] = this.translations['reservations'].type_recurrent;
      this.type_reservations['class-lessons'] = this.translations['reservations'].type_lessons;
    });

  }


  hasPermission( permision: string = ''){
    if(this.user.role.includes('Super-Admin')){
      this.can_edit = true;
      return true;
    }

    if(this.user.permissions.includes('register_reservation') ){
      this.can_edit = true;
      return true;
    }

    return false;
  }

  getReservationsDay(){
    
    this.reservationSrv.config(this.day_week_number, this.date, this.sport_selected).subscribe( (resp:any) => {
      if( resp.message == 200){
        this.total_sport_clubs = resp.total_types_sport;
        this.loaded = true;
        this.courts = resp.courts;
        this.all_courts = resp.all_courts;
        this.schedule = resp.finalScheduleHours;
        this.reservations = resp.reservations;
        this.configureHoursReserve();
        this.typeOfCourtsClub();
      }
    })
  }

  scrollToBottom() {
    window.scrollTo(0, (window.document.body.scrollHeight - window.innerHeight));
  }


  configureHoursReserve(){
  
    this.reservations.forEach( (reservation:any) => {
      this.schedule.forEach((schedule:any) => {
        if(reservation.schedule_id == schedule.id ){
          schedule.courts.forEach((court:any) => {
            if(reservation.court_id == court.id ){
              court.reservation_id =  reservation.reservation_id;
              court.reservation_name = reservation.reservation_name;
              court.reservation_schedule = reservation.start_time + '-' + reservation.end_time;
              court.is_recurrent = reservation.recurrent;
              court.type = reservation.type, 
              court.is_online = reservation.is_online
            }
          });
        }     
      });
    });

  
    // Clean repeat names
   
    for( let index = 1; index < this.schedule.length; index++){
      for( let index2 = 0; index2 < this.schedule[index].courts.length; index2++){
        if(this.schedule[index -1].courts[index2].reservation_id && this.schedule[index].courts[index2].reservation_id == this.schedule[index -1].courts[index2].reservation_id){
          this.schedule[index].courts[index2].reservation_name = '';
          this.schedule[index].courts[index2].reservation_schedule = '';
        }
      }
    }

  }


  getDayWeek(){
    let pipe = new DatePipe('en-US');
    this.date_format = pipe.transform(this.date, 'dd-MM-yyyy');
    this.date_reservation = new Date(this.date).toISOString();
    this.reserve_day = new Date(this.date);
      let day_number = this.reserve_day.getDay();
      if( day_number == 0){
        day_number = 7;
      }
      this.day_week_number = 'day_' + day_number;
      this.day_name = this.WeekDays[day_number - 1];
      
  }


  lessDay(){
    this.hoursSelected = [];
    let pipe = new DatePipe('en-US');
    let date_day = new Date(this.date);
    date_day.setDate(date_day.getDate() - 1);
 
    this.date = pipe.transform(date_day, 'yyyy-MM-dd');
    this.router.navigate([routes.courtReservation, this.date, this.sport_selected]);
    this.reserve_day = new Date(this.date);
    //this.getDayWeek();
    //this.getReservationsDay();

  }
  
  moreDay(){
    
    this.hoursSelected = [];
    let pipe = new DatePipe('en-US');
    let date_day = new Date(this.date);
    date_day.setDate(date_day.getDate() + 1);
   
    this.date =  pipe.transform(date_day, 'yyyy-MM-dd');
    this.router.navigate([routes.courtReservation, this.date, this.sport_selected]);
    this.reserve_day = new Date(this.date);
   // this.getDayWeek();
  //  this.getReservationsDay();
    
  }

  

  changeDateReservations( event: any){
    this.hoursSelected = [];
    let pipe = new DatePipe('en-US');
    this.date = pipe.transform(this.date_reservation, 'yyyy-MM-dd');
    this.reserve_day = new Date(this.date);
    this.router.navigate([routes.courtReservation, this.date, this.sport_selected]);
    this.reserve_day = new Date(this.date);
  }


  selectHour( hourSelected:any, court:any){
    
    var hour_selected = document.getElementById(hourSelected.id + '_' + court);

    let index = this.hoursSelected.findIndex((element:any) => /*element.hour == hour &&*/ element.court == court && element.schedule_id == hourSelected.id );
    if(index != -1){
      this.hoursSelected.splice(index, 1);
      if(hour_selected ){
        hour_selected.classList.remove('color-red-first');
      }
    }else{
      this.hoursSelected.push(
        {
          'court': court,
          'schedule_id': hourSelected.id,
          'hour_start': hourSelected.format_hour_start,
          'hour_end': hourSelected.format_hour_end
        }
      );
      if(hour_selected ){
        hour_selected.classList.add('color-red-first');
      }
    }

    this.checkCorrectHours();

  }

  cleanMessage(){
    this.error_message_popup = '';
    this.message_errors = [];
  }

  openPopup(){
    this.potential_member_found = [];
    this.susccess_message_popup = '';
    this.name_reservation = '';
    this.surname_reservation = '';
    this.telephone_reservation = '';
    this.cleanMessage(); 
  }
  




  showReserve( reservation_id:any){
    this.reservationSrv.getReservation(reservation_id).subscribe((resp:any) => {
      if(resp.message == 200){
        this.reservation = resp.reservation;
        this.reservation['type_name'] = this.type_reservations[resp.reservation.type];
        if(resp.reservation.info.online == 1){
          this.reservation['type_name'] = this.reservation['type_name'] + ' ' + '(online)';
        }
      }
    })
    
  }

  
  addReservation(){
    
    if( this.name_reservation == '' || this.telephone_reservation == '' || this.hoursSelected.length == 0){
      this.error_message_popup = this.translations['reservations'].error_1;
      return;
    }


    if( this.name_reservation && this.name_reservation.length > 191){
      this.error_message_popup = this.translations['reservations'].error_2;
      return;
    }

    if( this.telephone_reservation && this.telephone_reservation.length > 50){
      this.error_message_popup = this.translations['reservations'].error_2;;
      return;
    }

    if( this.hoursSelected && this.hoursSelected.length < 2){
      this.error_message_popup = this.translations['reservations'].error_4;;
      return;
    }

    let formData = new FormData();
    formData.append('court_id', this.court_selected);
    formData.append('name', this.name_reservation);
    formData.append('surname', this.surname_reservation);
    formData.append('mobile', this.telephone_reservation);
    formData.append('member_id_reservation', this.member_id_reservation);

    let lenght = this.hoursSelected.length;
    formData.append('day_week_number', this.day_week_number);
    formData.append('start_time', this.hoursSelected[0].hour_start);
    formData.append('end_time', this.hoursSelected[lenght - 1].hour_end);
   

    formData.append('date', this.date);
    formData.append('hours_selected', JSON.stringify(this.hoursSelected));
    
    
    this.reservationSrv.storeReservation( formData ).subscribe( (resp:any) => {

      if( resp.message == 200){
        this.hoursSelected.forEach( (element:any) => {
          let reservation_axu = {
            'court_id': element.court,
            'reservation_id': resp.reservation_id,
            'reservation_name': this.name_reservation,
            'schedule_id': element.schedule_id
          }
          this.reservations.push(reservation_axu);
        });

        this.hoursSelected = [];
        this.disableButtonReserve = true;
        this.susccess_message_popup = this.translations['commun_translations'].data_save_correctly;
        this.error_message = this.translations['reservations'].error_4;
      }else if(resp.message == 422) {
        this.error_message = this.translations['commun_translations'].data_save_error;
        this.message_errors = resp.errors_text
      } else {
        this.error_message = this.translations['commun_translations'].data_save_error + ' ' + this.translations['commun_translations'].consult_admin;
      }
    })

  }

  closPopupCreateRervation(){
    document.location.reload();
  }


  checkCorrectHours(){

    // the hours selected belong to the same court
    for (let i = 0; i < this.hoursSelected.length - 1; i++) {
      this.court_selected = this.hoursSelected[i].court;
      if( this.hoursSelected[i + 1].court != this.hoursSelected[i].court){
        this.error_message = this.translations['reservations'].notice_1;
        this.court_selected = null;
        this.disableButtonReserve = true;
        return;
      }
    }

    if( this.hoursSelected.length > 1 && this.hoursSelected.length < 5){
      this.hoursSelected = this.hoursSelected.sort((a:any, b:any) => (a.schedule_id < b.schedule_id ? -1 : 1));
      this.error_message = '';
      this.disableButtonReserve = false;
    }
    if( this.hoursSelected.length > 4 ){
      this.error_message = this.translations['reservations'].notice_2;
      this.disableButtonReserve = true;
      return;
    }
    if( this.hoursSelected.length < 2 ){
      this.error_message = this.translations['reservations'].notice_3;
      this.disableButtonReserve = true;
      return;
    }

    // check if the hour selected are consecutive
    this.hoursSelected = this.hoursSelected.sort((a:any, b:any) => (a.schedule_id < b.schedule_id ? -1 : 1));
    for (let i = 0; i < this.hoursSelected.length - 1; i++) {
      let diff = this.hoursSelected[i + 1].schedule_id - this.hoursSelected[i].schedule_id;
      if( diff != 1){
        this.error_message = this.translations['reservations'].notice_4;
        this.disableButtonReserve = true;
        return;
      }
    }
  }

  closePopupShowReservation(){
    this.closeShowbutton.nativeElement.click();
  }

  removeReservation(){
    this.reservationSrv.deleteReservation(this.reservation.id).subscribe( (resp:any) =>{
      if( resp.message == 200){
        let reservations_removed: any = [];
        for (let i = 0; i < this.reservations.length; i++) {
          if (this.reservations[i].reservation_id === this.reservation.id) {
            reservations_removed.push(this.reservations[i]);
            this.reservations.splice(i--, 1);
          }
        }
        reservations_removed.forEach( (reservation:any) => {
          this.schedule.forEach((schedule:any) => {
            if(reservation.schedule_id == schedule.id ){
              schedule.courts.forEach((court:any) => {
                if(reservation.court_id == court.id ){
                  court.reservation_id =  null
                  court.reservation_name = null
                }
              });
            }  
          });
        });
        this.closebuttonDeleteReservation.nativeElement.click();
       // this.reservation = null;
      }else{
        console.log(resp)
      }
    });
  }


  typeOfCourtsClub(){
    this.all_courts.some((court: any) => {
      if (court.sport_type == 1) {
        this.hasPadelCourts = true;
      }
      if (court.sport_type == 2) {
        this.hasTennisCourts = true;
      }
      if (court.sport_type == 3) {
        this.hasPickleballCourts = true;
      }
      if (court.sport_type == 4) {
        this.hasSquashCourts = true;
      }
      if (court.sport_type == 5) {
        this.hasBadmintonCourts = true;
      }
     
    });
  }


  findMembersByName( data_search_name: string){
    
    this.data_search_members['name'] = data_search_name;
    
    if( data_search_name.length > 3 ){
      this.memberSrv.findPotentialMember(this.data_search_members).subscribe( (resp:any) => {
        if(resp.message == 200){
          this.potential_member_found = resp.members;     
        }
      });
    }
  }

  findMembersByMobile( data_search_mobile: string){
    
    this.data_search_members['mobile'] = data_search_mobile;
    
    if( data_search_mobile.length > 3 ){
      this.memberSrv.findPotentialMember(this.data_search_members).subscribe( (resp:any) => {
        if(resp.message == 200){
          this.potential_member_found = resp.members;     
        }
      });
    }
  }

  selectMemberReservation(member:any){
      this.name_reservation = member.name;
      this.surname_reservation = member.surname;
      this.telephone_reservation = member.mobile;
      this.member_id_reservation = member.user_id;
  }

}
