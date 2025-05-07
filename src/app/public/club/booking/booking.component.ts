import { DatePipe } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MembersService } from 'src/app/club-management/members/service/members.service';
import { ReservationsService } from 'src/app/club-management/reservations/service/reservations.service';
import { routes } from 'src/app/shared/routes/routes';
import { ClubDataService } from '../../club-data/services/club-data.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss']
})
export class BookingComponent {

  @ViewChild('closebuttonAddShedule') closebutton: any;
  @ViewChild('closebuttonShowhedule') closeShowbutton: any;
  @ViewChild('closebuttonDeleteReservation') closebuttonDeleteReservation: any;
  

  public tab_selected: string = 'booking';
  
  public WeekDays:any = [];

  public routes = routes;
  public date: any;
  public hoursSelected: any = [];
  public email_reservation: string = '';
  public password_reservation: string = '';
  public error_message_popup: string = '';
  public susccess_message_popup: string = '';
  
  public users_can_book: any;
  public club_mobile: string = '';
  public error_message: string = '';
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
  public sport_selected: string = 'padel'; // padel
  public hasPadelCourts: boolean = false;
  public hasTennisCourts: boolean = false;
  public hasPickleballCourts: boolean = false;
  public hasSquashCourts: boolean = false;
  public hasBadmintonCourts: boolean = false;
  public type_reservations: any = [];
  public potential_member_found: any = [];
  public data_search_members: any = {
    'name': '',
    'mobile': ''
  };
  public total_sport_clubs: number = 0;
  public can_edit: boolean = false;
  public user: any;  
  public pipe = new DatePipe('en-US');
  public hash_club: string = '';
  public sport: string = '';
  public password_cancel_reservation: string = '';
  public error_cancel_reservsation_message: string = '';
  public success_cancel_reservsation_message: string = '';
  public major_sport: number = 0;
  public canCancelBooking: boolean = true;

  constructor(public reservationSrv: ReservationsService, public activateRoute: ActivatedRoute, public clubDataSrv: ClubDataService, 
    public router: Router, public translate: TranslateService, public memberSrv: MembersService){ }



  ngOnInit(): void {
      let today = new Date();
      this.date = this.pipe.transform(today, 'yyyy-MM-dd');
      this.reserve_day = new Date();
      this.activateRoute.params.subscribe( (resp: any) => {
        //this.date = resp.date;
        if(resp.date){
          this.date = resp.date;
        }else{
          let pipe = new DatePipe('en-US');
          let today = new Date();
          let date = pipe.transform(today, 'yyyy-MM-dd');
          this.date = date;
        }
        this.hash_club = resp.hash;  
        this.sport = resp.sport;
        this.sport_selected = resp.sport;
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
      this.error_message = this.translations['reservations'].notice_5;
      this.type_reservations['one-time'] = this.translations['reservations'].type_one_time;
      this.type_reservations['recurrent'] = this.translations['reservations'].type_recurrent;
      this.type_reservations['class-lessons'] = this.translations['reservations'].type_lessons;
    });

  }




  getReservationsDay(){
    let sport_selected_id = this.getSportSelectedId();
    this.clubDataSrv.config(this.hash_club,this.day_week_number, this.date, sport_selected_id).subscribe( (resp:any) => {
      if( resp.message == 200){
        this.users_can_book = resp.users_can_book;
        this.club_mobile = resp.club_mobile;
        this.total_sport_clubs = resp.total_types_sport;
        this.loaded = true;
        this.courts = resp.courts;
        this.all_courts = resp.all_courts;
        this.schedule = resp.finalScheduleHours;
        this.reservations = resp.reservations;
        this.major_sport = resp.major_sport;
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
    
    this.date_format = this.pipe.transform(this.date, 'dd-MM-yyyy');
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
    let date_day = new Date(this.date);
    date_day.setDate(date_day.getDate() - 1);
 
    this.date = this.pipe.transform(date_day, 'yyyy-MM-dd');
    this.router.navigate(['/club/booking', this.sport_selected, this.hash_club, this.date]);
    this.reserve_day = new Date(this.date);
  }
  
  moreDay(){
    
    this.hoursSelected = [];
    let date_day = new Date(this.date);
    date_day.setDate(date_day.getDate() + 1);
   
    this.date =  this.pipe.transform(date_day, 'yyyy-MM-dd');
    this.router.navigate(['/club/booking', this.sport_selected, this.hash_club, this.date]);
    this.reserve_day = new Date(this.date);
  }

  

  changeDateReservations( event: any){
    this.hoursSelected = [];
    this.date = this.pipe.transform(this.date_reservation, 'yyyy-MM-dd');
    this.reserve_day = new Date(this.date);
    this.getDayWeek();
    this.getReservationsDay();
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
    this.error_cancel_reservsation_message = '';
  }

  openPopup(){
    this.potential_member_found = [];
    this.susccess_message_popup = '';
    this.email_reservation = '';
    this.password_reservation = '';
    this.password_cancel_reservation = '';
    this.cleanMessage(); 
  }
  

  
  addReservation(){
    
    if( this.email_reservation == '' || this.password_reservation == '' || this.hoursSelected.length == 0){
      this.error_message_popup = this.translations['reservations'].error_5;
      return;
    }


    if( this.email_reservation && this.email_reservation.length > 191){
      this.error_message_popup = this.translations['reservations'].error_2;
      return;
    }

    if( this.password_reservation && this.password_reservation.length > 50){
      this.error_message_popup = this.translations['reservations'].error_2;;
      return;
    }

    if( this.hoursSelected && this.hoursSelected.length < 2){
      this.error_message_popup = this.translations['reservations'].error_4;;
      return;
    }

    let formData = new FormData();
    formData.append('hash_club', this.hash_club);
    formData.append('court_id', this.court_selected);
    formData.append('email', this.email_reservation);
    formData.append('password', this.password_reservation);

    let lenght = this.hoursSelected.length;
    formData.append('day_week_number', this.day_week_number);
    formData.append('start_time', this.hoursSelected[0].hour_start);
    formData.append('end_time', this.hoursSelected[lenght - 1].hour_end);
   

    formData.append('date', this.date);
    formData.append('hours_selected', JSON.stringify(this.hoursSelected));
    
    
    this.clubDataSrv.storeReservation( formData ).subscribe( (resp:any) => {

      if( resp.message == 200){
        this.hoursSelected.forEach( (element:any) => {
          let reservation_axu = {
            'court_id': element.court,
            'reservation_id': resp.reservation_id,
            'reservation_name': this.email_reservation,
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

  showReserve( reservation_id:any){
    this.clubDataSrv.getBooking(reservation_id).subscribe((resp:any) => {
      if(resp.message == 200){
        this.reservation = resp.reservation;
        this.reservation['type_name'] = this.type_reservations[resp.reservation.type];
        this.canCancelBooking = this.reservation.can_cancel;
      }
    })
    
  }


  closPopupCreateRervation(){
    console.log('pasamos');
    //this.router.navigate(['club/courts/edit/' + resp.court_id]);
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

    if( this.hoursSelected.length > 2 && this.hoursSelected.length < 5){
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
      this.error_message = this.translations['reservations'].notice_5;
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
    
    if( this.password_cancel_reservation == '' ){
      this.error_cancel_reservsation_message = this.translations['reservations'].error_6;
      return;
    }

    if( this.password_cancel_reservation && this.password_cancel_reservation.length > 50){
      this.error_cancel_reservsation_message = this.translations['reservations'].error_2;
      return;
    }
    
    let formData = new FormData();
    formData.append('reservation_id', this.reservation.id);
    formData.append('password', this.password_cancel_reservation);
    

    this.clubDataSrv.cancelBooking( formData ).subscribe( (resp:any) =>{
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

  getSportSelectedId(){
    let sport_id: number = this.major_sport;
    switch (this.sport_selected) {
      case 'padel':
        sport_id = 1;
        break;
      case 'tennis':
        sport_id = 2;
        break;
      case 'pickleball':
        sport_id = 3;
        break;
      case 'squash':
        sport_id = 4;
        break;
      case 'badminton':
        sport_id = 5;
        break;
    
      default:
        sport_id = 1;
        break;
    }
    return sport_id;
    
  }





}
