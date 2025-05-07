import { Component } from '@angular/core';
import { RecurrentService } from '../service/recurrent.service';
import { routes } from 'src/app/shared/routes/routes';
import { TranslateService } from '@ngx-translate/core';
import { MembersService } from '../../members/service/members.service';
import { DateAdapter } from '@angular/material/core';

interface ScheduleDay {
  day_id: string;
  day_name: string;
  closed: boolean;
  hours: any[]
}


@Component({
  selector: 'app-add-recurrent',
  templateUrl: './add-recurrent.component.html',
  styleUrls: ['./add-recurrent.component.scss']
})
export class AddRecurrentComponent {

  public routes = routes;

  public schedule_hour_days: ScheduleDay[] = [];
  public club_schedule: any = [];
  public courts: any = [];
  public all_courts: any = [];
  public loaded: boolean = false;
  public error_message: string = '';
  public success_message : string = '';

  public name: string = '';
  public surname: string = '';
  public mobile: string = '';
  public court_selected: string = '';
  public day_number: string = '';
  public date_end_reservation: string = '';
  public hour_start:string = '';
  public hour_end:string = '';
  public hours: any = [];
  public day_schedule:any = [];
  public selectable_hours:any = [];
  public schedule:any = [];
  public hoursSelected: any = [];
  public court_day_occupied: any = [];
  public message_errors: any = [];
  public translations:any = [];
  public kind_sport: any = [];
  public type_sport: string = '0';
  public hasPadelCourts: boolean = false;
  public hasTennisCourts: boolean = false;
  public hasPickleballCourts: boolean = false;
  public hasSquashCourts: boolean = false;
  public hasBadmintonCourts: boolean = false;
  public potential_member_by_name_found: any = [];
  public potential_member_by_surname_found: any = [];
  public potential_member_by_mobile_found: any = [];
  public data_search_members: any = {
    'name': '',
    'surname': '',
    'mobile': ''
  };
  public member_id_reservation: string = '';
  public booking_saved:boolean = false;

  constructor(public reservationSrv: RecurrentService, public translate: TranslateService, public memberSrv: MembersService, 
              date: DateAdapter<Date> ){ 
        if( this.reservationSrv.authSrv.language == 'es'){
          date.getFirstDayOfWeek = () => 1;
        }
  }

  ngOnInit(): void {
    
    this.initializeLanguage();

    this.reservationSrv.config().subscribe( (resp:any) => {
      if( resp.message == 200){
        this.loaded = true;
        this.all_courts = resp.club_data.courts;
        this.club_schedule = resp.club_data.schedule_week_hours;
        this.schedule = resp.schedule;
        this.fillSchedule();
        this.typeOfCourtsClub();
      }
    })
  }

  initializeLanguage(){
    this.translate.use(this.reservationSrv.authSrv.language);
    this.translate.setDefaultLang(this.reservationSrv.authSrv.language);

    this.translate.get(['commun_translations', 'reservations.recurrent', 'club_translations'])
    .subscribe((resp:any) => {
      this.translations = resp;
      this.getDays();
    }); 
    
  }

  fillSchedule(){
    this.club_schedule.forEach( (schedule_day:any) => {
      let index = this.schedule_hour_days.findIndex((element:any) => element.day_id == schedule_day.day_id  );
      if(index != -1){
        this.schedule_hour_days[index].hours = schedule_day.hours;
        this.schedule_hour_days[index].closed = schedule_day.closed;
      }
    });
  }

  getDays(){
    this.schedule_hour_days = [
      {day_id: 'day_1', day_name: this.translations['commun_translations'].day_1, closed: false, hours: []}, 
      {day_id: 'day_2', day_name: this.translations['commun_translations'].day_2, closed: false, hours: []}, 
      {day_id: 'day_3', day_name: this.translations['commun_translations'].day_3, closed: false, hours: []}, 
      {day_id: 'day_4', day_name: this.translations['commun_translations'].day_4, closed: false, hours: []},
      {day_id: 'day_5', day_name: this.translations['commun_translations'].day_5, closed: false, hours: []}, 
      {day_id: 'day_6', day_name: this.translations['commun_translations'].day_6, closed: false, hours: []}, 
      {day_id: 'day_7', day_name: this.translations['commun_translations'].day_7, closed: false, hours: []}
    ];
  }

  daySelected(event:any){
    this.selectable_hours = [];
    let index = this.schedule_hour_days.findIndex((element:any) => element.day_id == event  );
    if(index != -1){
      this.day_schedule = this.schedule_hour_days[index].hours;
      this.schedule_hour_days[index].hours.forEach((element:any) => {
        let start = element.opening_time_id -1;
        let end = element.closing_time_id -1;
        for (let i = start; i < end; i++) {
          this.selectable_hours.push(this.schedule[i]); 
        }
       
      });
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

  sportSelected(event:any){
    this.courts =  this.all_courts.filter((item:any) => item.sport_type == event);
  }

  cleanMessage(){
    this.error_message = '';
    this.success_message = '';
    this.message_errors = [];
  }


  filter(){}

  
  save(){

    this.cleanMessage();
    this.hoursSelected = [];
    
    if( !this.name || !this.mobile ||!this.court_selected || !this.date_end_reservation || !this.day_number || !this.hour_start || !this.hour_end){
      this.error_message = this.translations['reservations.recurrent'].error_1;
      return;
    }

    if( this.name.length > 191){
      this.error_message = this.translations['reservations.recurrent'].error_2;
      return;
    }

    if( this.surname.length > 191){
      this.error_message = this.translations['reservations.recurrent'].error_7;
      return;
    }


    if( this.hour_start >= this.hour_end){
      this.error_message = this.translations['reservations.recurrent'].error_3;
      return;
    }

    // Create hour selected
    let start = parseInt(this.hour_start) -2;
    let end = parseInt(this.hour_end) -2;
    for(let i = start; i<= end; i++){
      this.hoursSelected.push(
        {
          'court': this.court_selected,
          'schedule_id': this.schedule[i].id,
          'hour_start': this.schedule[i].format_hour_start,
          'hour_end': this.schedule[i].format_hour_end
        }
      );
    }


    let formData = new FormData();
    formData.append('court_id', this.court_selected);
    formData.append('name', this.name);
    formData.append('surname', this.surname);
    formData.append('mobile', this.mobile);
    formData.append('member_id_reservation', this.member_id_reservation);

    let lenght = this.hoursSelected.length;
    formData.append('day_week_number', this.day_number);
    formData.append('start_time', this.hoursSelected[0].hour_start);
    formData.append('end_time', this.hoursSelected[lenght - 1].hour_end);
   

   
    formData.append('date_end_reservation', this.date_end_reservation);
    formData.append('hours_selected', JSON.stringify(this.hoursSelected));

    
    this.reservationSrv.registerRecurrentReservation(formData).subscribe((resp:any) => {
      if(resp.message == 200){
        this.booking_saved = true;
        this.court_day_occupied =resp.days_court_occupied;
        if( this.court_day_occupied.length > 0){
          this.success_message = this.translations['reservations.recurrent'].data_save_1;
        }else{
          this.success_message = this.translations['reservations.recurrent'].data_save_2;
        }
      }else if(resp.message == 422) {
        this.error_message = this.translations['commun_translations'].data_save_error;
        this.message_errors = resp.errors_text
      } else {
        this.error_message = this.translations['commun_translations'].data_save_error + ' ' + this.translations['commun_translations'].consult_admin;
      }
     
    })

  }

  findMembersByName( data_search: string, field: string){
    
    if( field == 'name' ){
      this.data_search_members['name'] = data_search;
    }
    if( field == 'surname'){
      this.data_search_members['surname'] = data_search;
    }
    if(field == 'mobile'){
      this.data_search_members['mobile'] = data_search;
    }
    
    if( data_search.length > 3 ){
      this.memberSrv.findPotentialMember(this.data_search_members).subscribe( (resp:any) => {
        if(resp.message == 200){

          switch (field) {
            case 'name':
                this.potential_member_by_name_found = resp.members;
                this.fillFakeData(field);
              break;
            case 'surname':
                this.potential_member_by_surname_found = resp.members;
                this.fillFakeData(field);
              break;
            case 'mobile':
                this.potential_member_by_mobile_found = resp.members;
                this.fillFakeData(field);
              break;
            default:
              break;
          }

               
        }
      });
    }else{
      this.potential_member_by_name_found = [];
      this.potential_member_by_surname_found = [];
      this.potential_member_by_mobile_found = [];
    }
  }



  fillFakeData( field: string ){
    let fake_data = {
      'name': '',
      'mobile': ''
    };

    switch (field) {
      case 'name':
          for (let index = 0; index < this.potential_member_by_name_found.length; index++) {
            this.potential_member_by_surname_found.push(fake_data);
            this.potential_member_by_mobile_found.push(fake_data);
          }
        break;
      
      case 'surname':
          for (let index = 0; index < this.potential_member_by_surname_found.length; index++) {
            this.potential_member_by_name_found.push(fake_data);
            this.potential_member_by_mobile_found.push(fake_data);
          }
        break;
      
      case 'mobile':
          for (let index = 0; index < this.potential_member_by_mobile_found.length; index++) {
            this.potential_member_by_name_found.push(fake_data);
            this.potential_member_by_surname_found.push(fake_data);
          }
        break;
    
      default:
        break;
    }
  }


  selectMemberReservation(member:any){
    this.potential_member_by_name_found = [];
    this.potential_member_by_surname_found = [];
    this.potential_member_by_mobile_found = [];
    this.name = member.name;
    this.surname = member.surname;
    this.mobile = member.mobile;
    this.member_id_reservation =  member.user_id;
  }

  }


