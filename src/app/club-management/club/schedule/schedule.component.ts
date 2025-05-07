import { Component, ViewChild } from '@angular/core';
import { routes } from 'src/app/shared/routes/routes';
import { ClubService } from '../service/club.service';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';
import { DateAdapter } from '@angular/material/core';

interface ScheduleDay {
  day_id: string;
  day_name: string;
  closed: boolean;
  hours: any[]
}

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent {
  public routes = routes;
  @ViewChild('closebutton') closebutton: any;

  public modifySchedule: boolean = true;

  public club: any;
  public opening_time: any;
  public closing_time: any;
  public hours:any = [];
  public schedule_hour_days: ScheduleDay[] = [];
  public schedule_hour_special_day: any[] = [];


  public error_message: string = '';
  public success_message:string = ''; 
  public message_errors: any = [];   
  public flag: boolean = true;             
  public isLoaded: boolean = false;
  public user: any;  
  public can_edit:boolean = false; 
  public translations:any = [];
  public special_day_schedule_form: boolean = false;
  public special_day: any = '';
  public info: string = '';
  public special_day_closed: any;
  public special_days: any = [];
  public special_day_selected: any;
  public error_special_day_message: string = '';
  public message_special_day_errors: any = [];
  public success_special_day_message: string = '';


  constructor( public clubSrv: ClubService, public translate: TranslateService,date: DateAdapter<Date> ){
    if( this.clubSrv.authSrv.language == 'es'){
      date.getFirstDayOfWeek = () => 1;
    }
  }

  ngOnInit(): void {

    this.initializeLanguage();

    this.user = this.clubSrv.authSrv.user;
    this.hasPermission();

    this.clubSrv.config().subscribe( (resp:any)=>{
      this.hours = resp.hours_days;
    });

    this.clubSrv.getClubSchedule().subscribe((resp:any) => {
      this.isLoaded=true;
      if( resp.club_data ){
        this.club = resp.club_data;
        if( this.club.schedule_week_hours.length > 0 ){
          this.modifySchedule = false;
          this.schedule_hour_days = this.club.schedule_week_hours;
          this.special_days = this.club.special_days_schedule;
          this.schedule_hour_days.forEach(element => {
            let day = element.day_id;
            element.day_name = this.translations['commun_translations'][day];
          });
          
        }
      }
    })
  }


  initializeLanguage(){
   
    this.translate.use(this.clubSrv.authSrv.language);
    this.translate.setDefaultLang(this.clubSrv.authSrv.language);

    this.translate.get(['commun_translations', 'club_translations.schedule', 'club_translations.club_information_messages'])
      .subscribe((resp:any) => {
        this.translations = resp;
        this.schedule_hour_days = [
          {day_id: 'day_1', day_name: this.translations['commun_translations'].day_1, closed: false, hours: []}, 
          {day_id: 'day_2', day_name: this.translations['commun_translations'].day_2, closed: false, hours: []}, 
          {day_id: 'day_3', day_name: this.translations['commun_translations'].day_3, closed: false, hours: []}, 
          {day_id: 'day_4', day_name: this.translations['commun_translations'].day_4, closed: false, hours: []},
          {day_id: 'day_5', day_name: this.translations['commun_translations'].day_5, closed: false, hours: []}, 
          {day_id: 'day_6', day_name: this.translations['commun_translations'].day_6, closed: false, hours: []}, 
          {day_id: 'day_7', day_name: this.translations['commun_translations'].day_7, closed: false, hours: []}
        ];
      }); 

 /*  this.translate.get(['commun_translations', 'club_translations.club_information_messages'])
      .subscribe((resp:any) => {
        this.translations = resp;
      }); 
   */ 
  }


  hasPermission( permision: string = ''){
    if(this.user.role.includes('Super-Admin')){
      this.can_edit = true;
      return true;
    }

    if(this.user.permissions.includes('edit_club') ){
      this.can_edit = true;
      return true;
    }

    return false;
  }

  activateModifySchedule(){
    this.modifySchedule = true;
  }

  deleteHourSchedule(element: any, day: any){

    //this.medical.splice(i, 1);
    let index = this.schedule_hour_days.findIndex((item:any) => item.day_id == day);
    if(index != -1){
        this.schedule_hour_days[index].hours.splice(element, 1);
    }
  }

  cleanMessage(){
    this.error_message = '';
    this.success_message = '';
    this.message_errors = [];
    this.error_special_day_message = '';
    this.message_special_day_errors = [];
    this.success_special_day_message = '';
  }

  addHourSchedule( day:any ){

    if(this.opening_time > this.closing_time){
      Swal.fire({
        title: "Error",
        text: this.error_message = this.translations["club_translations.schedule"].error_1,
        icon: "warning"
      });
      return;
    }

    let element = {
      opening_time_id: this.opening_time,
      closing_time_id: this.closing_time,
      opening_time: this.hours[ this.opening_time - 2].format_hour,
      closing_time: this.hours[ this.closing_time - 2].format_hour
    };
    
    let index = this.schedule_hour_days.findIndex((item:any) => item.day_name == day);
    if(index != -1){
      this.schedule_hour_days[index].hours.push(element);
      this.schedule_hour_days[index].hours.sort((a:any, b:any) => a.opening_time_id - b.opening_time_id)
    }

    //this.opening_time = '';
    //this.closing_time = '';
    //this.schedule_hour_days
  }

  addHourSpecialDay(){


   
    if(this.opening_time > this.closing_time){
      Swal.fire({
        title: "Error",
        text: this.error_message = this.translations["club_translations.schedule"].error_1,
        icon: "warning"
      });
      return;
    }



    let element = {
      opening_time_id: this.opening_time,
      closing_time_id: this.closing_time,
      opening_time: this.hours[ this.opening_time - 2].format_hour,
      closing_time: this.hours[ this.closing_time - 2].format_hour
    };
    

    this.schedule_hour_special_day.push(element);
    this.schedule_hour_special_day.sort((a:any, b:any) => a.opening_time_id - b.opening_time_id)
   

    console.log(this.schedule_hour_special_day);
    
    this.opening_time = '';
    this.closing_time = '';
   
  }

  deleteSpecialHourSchedule(index: number ){

    this.schedule_hour_special_day.splice(index, 1);
    
  }


  saveSpecialDay(){

    this.cleanMessage();
    if( this.special_day == '' ){
      this.error_special_day_message = this.translations["club_translations.schedule"].error_2;
      return;
    }

    if( !this.info ){
      this.error_special_day_message = this.translations["club_translations.schedule"].error_3;
      return;
    }

    if( this.info && this.info.length > 191){
      this.error_special_day_message = this.translations["club_translations.schedule"].error_4;
      return;
    }
    
    this.schedule_hour_special_day.forEach( (element:any) => {
        if( element.opening_time_id >= element.closing_time_id){
          this.error_message = this.translations["club_translations.schedule"].error_1;
          this.flag = false;
          return;
        }
    }); 

    let formData = new FormData();
    formData.append('date', this.special_day);
    formData.append('information', this.info);
    formData.append('schedule_hour', JSON.stringify(this.schedule_hour_special_day));

    if(this.special_day_closed ){
      formData.append('closed', '1');
    }else{
      formData.append('closed', '0');
    }


    this.clubSrv.storeSpecialDaySechedule(formData).subscribe( (resp:any) =>{
      if( resp.message == 200){
        this.success_special_day_message = this.translations['commun_translations'].data_save_correctly;
        this.special_days.push(resp.special_day);
      }else if(resp.message == 420) {
        this.error_special_day_message = this.translations["club_translations.schedule"].error_5;
      }else if(resp.message == 422) {
        this.error_special_day_message = this.translations['commun_translations'].data_save_error ;
        this.message_special_day_errors = resp.errors_text
      } else {
        this.error_special_day_message = this.translations['commun_translations'].data_save_error + ' ' + this.translations['commun_translations'].consult_admin;
      }
     
    });
  }

  selectSpecialDay(item:any, open_form: boolean){
    this.special_day_selected = item;
    this.special_day = item.date;
    this.info = item.information;
    this.schedule_hour_special_day = item.hours;
    this.special_day_closed = item.closed;

    this.special_day_schedule_form = open_form;
  }


  removeSpecialDay(){
    this.clubSrv.deleteSpecialDaySechedule(this.special_day_selected.id).subscribe( (resp:any) =>{
      if( resp.message == 200){
        let index = this.special_days.findIndex((item:any) => item.id == this.special_day_selected.id);
        if(index != -1){
          this.special_days.splice(index, 1);
          this.closebutton.nativeElement.click();
          this.special_day_selected = null;
        }
      }else{
        console.log(resp)
      }
    });
    
  }

  saveScheduleHours(){

    this.cleanMessage();
    
    this.schedule_hour_days.forEach( (element:any) => {
      element.hours.forEach( (hour:any) => {
        if( hour.opening_time_id >= hour.closing_time_id){
          this.error_message = this.translations["club_translations.schedule"].error_1;
          this.flag = false;
          return;
        }
      });
    });

    let formData = new FormData();
    if( this.flag ){
      formData.append('schedule_hour', JSON.stringify(this.schedule_hour_days));
      
      this.clubSrv.storeWeeklyScheduleClub(formData).subscribe( (resp:any) =>{
        if( resp.message == 200){
          this.success_message = this.translations['commun_translations'].data_save_correctly;
        }else if(resp.message == 422) {
          this.error_message = this.translations['commun_translations'].reservation_at_old_hours ;
          this.message_errors = resp.errors_text
        } else {
          this.error_message = this.translations['commun_translations'].data_save_error + ' ' + this.translations['commun_translations'].consult_admin;
        }
       
      });
    }


  }

  openSpecialDayScheduleForm(){
    this.cleanMessage();
    this.special_day_selected = null
    this.special_day = '';
    this.info = '';
    this.schedule_hour_special_day = [];
    this.special_day_closed = null;
    this.special_day_schedule_form = true;
  }

  closeSpecialDayScheduleForm(){
    this.cleanMessage();
    this.special_day = '';
    this.info = '';
    this.schedule_hour_special_day = [];
    this.special_day_closed = 0;
    this.special_day_schedule_form = false;
  }


}
