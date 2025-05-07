import { Component, ViewChild } from '@angular/core';
import { MonitorsService } from '../service/monitors.service';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { routes } from 'src/app/shared/routes/routes';
import { ReservationsService } from '../../reservations/service/reservations.service';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { ClubService } from '../../club/service/club.service';
import { DateAdapter } from '@angular/material/core';



interface ScheduleDay {
  day_id: string;
  day_name: string;
  hours: any[];
  date_end_reservation: string;
}


@Component({
  selector: 'app-edit-monitor',
  templateUrl: './edit-monitor.component.html',
  styleUrls: ['./edit-monitor.component.scss']
})
export class EditMonitorComponent {

  @ViewChild('closebuttonAddShedule') closebutton: any;
  public routes = routes;

  public translations:any = [];
  public user: any;
  public can_edit:boolean = false;
  public monitor_id:string = '';
  public rolsAdded: any = [];
  public monitor_selected: any;
  
  public fileAvatar: any;
  public image_preview: any = 'assets/img/user-06.jpg';

  public name: string = '';
  public surname: string = '';
  public mobile: string = '';
  public email: string = '';
  public password: string = '';
  public confirm_password: string = '';
  public address: string = '';
  public rol: any;
  public reservations: any = [];

  public message_errors: any = [];
  public message_errors_monitor:any = [];
  public error_message_monitor: string = '';
  public success_message_monitor : string = '';
  public error_message: string = '';
  public WeekDays:any = [];
  public reservation_selected: any;

  public success_message_2: string = '';
  public error_message_2: string = '';
  public all_courts: any = [];
  public kind_sport: any = [];
  public type_sport: string = '0';
  public hasPadelCourts: boolean = false;
  public hasTennisCourts: boolean = false;
  public hasPickleballCourts: boolean = false;
  public hasSquashCourts: boolean = false;
  public hasBadmintonCourts: boolean = false;

  public tab_selected: number = 1;
  public isLoaded: boolean = false;
  public schedule_hour_days: ScheduleDay[] = [];
  public modifySchedule: boolean = false;
  public court_class_id: string = '';
  public court_class_name: string = '';
  public opening_time: any;
  public closing_time: any;
  public hours:any = [];
  public success_message_lesson:string = ''; 
  public error_message_lesson:string = '';
  public court_day_change: any = [];
  public court_day_no_exist_aviable: any = [];
  public courts_class: any = [];
  public flag: boolean = true; 
  public success_lesson_message: string = '';
  public message_lesson_errors:any = [];
  public date_end_reservation: any = '';
  public date_end_reservation_format: any;
  public lesson_court_selected: any;
  public lessons: any = [];
  public reservation_lesson: any;
  

  constructor( public monitorSrv: MonitorsService, public activateRoute: ActivatedRoute, public clubSrv: ClubService,
      public translate: TranslateService, date: DateAdapter<Date> ){
        if( this.clubSrv.authSrv.language == 'es'){
          date.getFirstDayOfWeek = () => 1;
        }
  }

  ngOnInit(): void {
    this.initializeLanguage();
    this.clubSrv.config().subscribe( (resp:any)=>{
      this.hours = resp.hours_days;
    });
    this.user = this.monitorSrv.authSrv.user;
    this.hasPermission();
    this.activateRoute.params.subscribe( (resp:any) => {
      this.monitor_id = resp.id;
      this.getMonitorSelected();
    });
    this.monitorSrv.config().subscribe( (resp:any)=>{
      this.rolsAdded = resp.roles;
      this.rol = this.rolsAdded[0].id;
      this.all_courts = resp.courts;
      this.typeOfCourtsClub();
    })
  }

  hasPermission( permision: string = ''){
    if(this.user.role.includes('Super-Admin')){
      this.can_edit = true;
      return true;
    }

    if(this.user.permissions.includes(permision) ){
      this.can_edit = true;
      return true;
    }

    return false;
  }

  
  loadFile( $event: any ){
    if( $event.target.files[0].type.indexOf('image') < 0){
      alert(this.translations['commun_translations'].only_type_img);
      this.image_preview = this.image_preview ? this.image_preview : 'assets/img/user-06.jpg';
      return;
    }
    if($event.target.files[0].size > 2000000){
      alert(this.translations['commun_translations'].max_size_img);
      this.fileAvatar = '';
      return;
    }
    this.fileAvatar = $event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(this.fileAvatar);
    reader.onloadend = () => this.image_preview = reader.result;
  }



  getMonitorSelected(){
    this.monitorSrv.getMonitor(this.monitor_id).subscribe( (resp:any) => {
      this.monitor_selected = resp.monitor;
      this.reservations = this.monitor_selected.reservations;
      this.reservation_lesson = this.monitor_selected.reservation_lesson;
      this.name = this.monitor_selected.name;
      this.surname = this.monitor_selected.surname;
      this.mobile = this.monitor_selected.mobile;
      this.email = this.monitor_selected.email;
      this.type_sport = this.monitor_selected.sport_type;
      this.image_preview = this.monitor_selected.avatar;
      this.addDayName();
      this.courts_class = resp.monitor_court;
      this.isLoaded = true;
      if(resp.lessons.length > 0){
        this.schedule_hour_days = resp.lessons;
        this.formatEndReservationsClass(this.reservation_lesson.end_reservation);
        if(this.lessons.hours &&  this.lessons.hours.length > 0 ){
            this.modifySchedule = false;
            this.schedule_hour_days = this.lessons.hours;
            this.schedule_hour_days.forEach(element => {
              let day = element.day_id;
              element.day_name = this.translations['commun_translations'][day];
            });
          }
        }
      });
  }


  formatEndReservationsClass(date:any ){
    let pipe = new DatePipe('en-US');
    this.date_end_reservation = date;
    this.date_end_reservation_format = pipe.transform(date, 'dd/MM/yyyy');
  }

  
  initializeLanguage(){
    this.translate.use(this.monitorSrv.authSrv.language);
    this.translate.setDefaultLang(this.monitorSrv.authSrv.language);

    this.translate.get(['commun_translations', 'monitors.monitors_messages', 'club_translations'])
      .subscribe((resp:any) => {
        this.translations = resp;
        this.schedule_hour_days = [
          {day_id: 'day_1', day_name: this.translations['commun_translations'].day_1, hours: [], date_end_reservation: ''}, 
          {day_id: 'day_2', day_name: this.translations['commun_translations'].day_2, hours: [], date_end_reservation: ''}, 
          {day_id: 'day_3', day_name: this.translations['commun_translations'].day_3, hours: [], date_end_reservation: ''}, 
          {day_id: 'day_4', day_name: this.translations['commun_translations'].day_4, hours: [], date_end_reservation: ''},
          {day_id: 'day_5', day_name: this.translations['commun_translations'].day_5, hours: [], date_end_reservation: ''}, 
          {day_id: 'day_6', day_name: this.translations['commun_translations'].day_6, hours: [], date_end_reservation: ''}, 
          {day_id: 'day_7', day_name: this.translations['commun_translations'].day_7, hours: [], date_end_reservation: ''}
        ];
        this.initializeArrays();
      });   

      
  }

  initializeArrays(){
    this.WeekDays = [
          this.translations['commun_translations'].day_1, 
          this.translations['commun_translations'].day_2,
          this.translations['commun_translations'].day_3,
          this.translations['commun_translations'].day_4,
          this.translations['commun_translations'].day_5,
          this.translations['commun_translations'].day_6,
          this.translations['commun_translations'].day_7
    ];
  }

  addDayName(){
    let id_weeek_number = 0;
    this.reservations.forEach((element:any) => {
      let aux = element.day_week.split("day_").pop();
      id_weeek_number = +aux -1;
      element.day_name = this.WeekDays[id_weeek_number];
    });
  }


  cleanMessage(){
    this.error_message = '';
    this.success_message_monitor = '';
    this.error_message_monitor = '';
    this.message_errors_monitor = [];

    this.success_message_lesson = '';
    this.error_message_lesson = '';
    this.court_day_change = [];
    this.court_day_no_exist_aviable = []; 
    this.message_lesson_errors = [];
  }

  save(){

    this.cleanMessage();

    if( this.name == '' ){
      this.error_message = this.translations["monitors.monitors_messages"].error_name_1;
      return;
    }

    if( this.name && this.name.length > 191){
      this.error_message = this.translations["monitors.monitors_messages"].error_name_1;
      return;
    }

    if( this.surname == '' ){
      this.error_message = this.translations["monitors.monitors_messages"].error_surname_1;
      return;
    }
    
    if( this.surname && this.surname.length > 191){
      this.error_message = this.translations["monitors.monitors_messages"].error_surname_2;
      return;
    }

    if( this.mobile == '' ){
      this.error_message = this.translations["monitors.monitors_messages"].error_mobile_1;
      return;
    }
    
    if( this.mobile && this.mobile.length > 50){
      this.error_message = this.translations["monitors.monitors_messages"].error_mobile_2;
      return;
    }

    if( this.email == '' ){
      this.error_message = this.translations["monitors.monitors_messages"].error_email_1;
      return;
    }
    
    if( this.email && this.email.length > 191){
      this.error_message = this.translations["monitors.monitors_messages"].error_email_2;
      return;
    }

    if( this.type_sport == '0' ){
      this.error_message = this.translations["monitors.monitors_messages"].error_sport_type;
      return;
    }

    /*
    if( this.mobile.length > 0 || this.confirm_password.length > 0 ||  this.password != '' || this.confirm_password != ''){
      if( this.password != this.confirm_password){
        console.log(this.password, this.confirm_password);
        
        this.error_message = this.translations["monitors.monitors_messages"].error_different_password;
        return;
      }
    }
    */

    

    let formData = new FormData();
    formData.append('name', this.name);
    formData.append('surname', this.surname);
    formData.append('mobile', this.mobile);
    formData.append('email', this.email);
    formData.append('rol', this.rol);
    formData.append('imagen', this.fileAvatar);
    formData.append('sport_type', this.type_sport);

    if(this.password != ''){
      formData.append('password', this.password);
    }

    this.monitorSrv.updateMonitor(this.monitor_id, formData).subscribe( (resp: any) => {
      if( resp.message == 200){
        this.success_message_monitor = this.translations['commun_translations'].data_save_correctly;
      }else if(resp.message == 422) {
        this.error_message = this.translations['commun_translations'].data_save_error ;
        this.message_errors = resp.errors_text
      } else {
        this.error_message = this.translations['commun_translations'].data_save_error + ' ' + this.translations['commun_translations'].consult_admin;
      }
    })
    

  }


  
  activateModifySchedule(){
    this.modifySchedule = true;
  }

  addHourSchedule( day:any ){

    if(this.opening_time > this.closing_time){
      Swal.fire({
        title: "Error",
        text: "La hora de cierre es mayor que la de apertura",
        icon: "warning"
      });
      return;
    }

    let element = {
      opening_time_id: this.opening_time,
      closing_time_id: this.closing_time,
      opening_time: this.hours[ this.opening_time - 2].format_hour,
      closing_time: this.hours[ this.closing_time - 2].format_hour,
      court_id: this.lesson_court_selected.id,
      court_name: this.lesson_court_selected.name
    };
    
    let index = this.schedule_hour_days.findIndex((item:any) => item.day_name == day);
    if(index != -1){
      this.schedule_hour_days[index].hours.push(element);
      this.schedule_hour_days[index].hours.sort((a:any, b:any) => a.opening_time_id - b.opening_time_id)
    }
    

    //this.opening_time = '';
    //this.closing_time = '';
    this.schedule_hour_days;
    //this.lesson_court_selected = null;
  }

  saveScheduleHours(){

    this.cleanMessage();

    this.schedule_hour_days.forEach( (element:any) => {
      element.hours.forEach( (hour:any) => {
        if( hour.opening_time_id >= hour.closing_time_id){
          this.error_message = 'Existe alguna hora de entrado mayor que hora de salida.';
          this.flag = false;
          return;
        }
      });
    });

    let formData = new FormData();
    if( this.flag ){
      formData.append('schedule_hour', JSON.stringify(this.schedule_hour_days));
      formData.append('monitor_id', this.monitor_id);
      formData.append('sport_type', this.type_sport);
      formData.append('date_end_reservation', this.date_end_reservation);//this.date_end_reservation);
      
      this.monitorSrv.storeWeeklyLessons(formData).subscribe( (resp:any) =>{
        if( resp.message == 200){
          this.success_message_lesson = this.translations['commun_translations'].save_lesson_correctly;
          this.court_day_change = resp.days_court_changed;
          this.court_day_no_exist_aviable = resp.days_court_occupied;
        }else if(resp.message == 422) {
          this.error_message_lesson = this.translations['commun_translations'].save_lesson_error ;
          this.message_lesson_errors = resp.errors_text
        } else {
          this.error_message_lesson = this.translations['commun_translations'].save_lesson_error + ' ' + this.translations['commun_translations'].consult_admin;
        }
       
      });
    }

  }

  deleteHourSchedule(element: any, day: any){

    //this.medical.splice(i, 1);
    let index = this.schedule_hour_days.findIndex((item:any) => item.day_id == day);
    if(index != -1){
        this.schedule_hour_days[index].hours.splice(element, 1);
    }
    
  }

  


 
  typeOfCourtsClub(){
    this.kind_sport.push( { id: 0, name: '...'});
    
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

    if(this.hasPadelCourts){
      this.kind_sport.push({ id: 1, name: this.translations["club_translations"].sport_1});
    }

    if(this.hasTennisCourts){
      this.kind_sport.push({ id: 2, name: this.translations["club_translations"].sport_2});
    }

    if(this.hasPickleballCourts){
      this.kind_sport.push({ id: 3, name: this.translations["club_translations"].sport_3});
    }

    if(this.hasSquashCourts){
      this.kind_sport.push({ id: 4, name: this.translations["club_translations"].sport_4});
    }

    if(this.hasBadmintonCourts){
      this.kind_sport.push({ id: 5, name: this.translations["club_translations"].sport_5});
    }
    
  }

  tabSeleted(value: number){
    this.tab_selected = value;
  }
}
