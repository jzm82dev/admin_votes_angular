import { Component, ViewChild } from '@angular/core';
import { routes } from 'src/app/shared/routes/routes';
import { ClubService } from '../club/service/club.service';
import { TournamentService } from './services/tournament.service';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from 'src/app/league-clubs/category/service/category.service';
import { TranslateService } from '@ngx-translate/core';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { DateAdapter } from '@angular/material/core';


@Component({
  selector: 'app-tournament',
  templateUrl: './tournament.component.html',
  styleUrls: ['./tournament.component.scss']
})
export class TournamentComponent {


  public routes = routes;
  @ViewChild('closebutton') closebutton: any;
  @ViewChild('closebutton_delete_draws') closebutton_delete_draw: any;

  public name: string = '';
  public date_start: string = '';
  public date_end: string = '';
  public date_starts_registration: string = '';
  public hour_starts_registration: string = '';
  public date_ends_registration: string = '';
  public hour_ends_registration : string = '';
  public price: number = 0;
  public price_member: number = 0;
  public time_per_match: number = 0;
  public draw_generated: number = 0;
  public fileAvatar: any;
  public image_preview: any = 'assets/img/img-06.jpg';
  public id_tournament: string = '';
  public tournament_selected: any;
  public success_message: string = '';
  public error_message: string = '';
  public message_errors: any = [];
  public message_errors_category:any = [];

  public name_category: string = '';
  public description_category: string = '';
  public categories_list: any = [];
  public error_message_category: string = '';
  public success_message_category: string = '';
  
  public can_edit:boolean = false; 
  public user: any;

  public translations:any = [];
  public error_message_schedule: string = '';
  public success_message_schedule: string = '';
  public message_errors_schedule: any =[];

  public date_schedule: string = '';
  public opening_time: string = '';
  public closing_time: string = '';
  public hours:any = [];
  public schedule_list:any = [];

  public schedule_selected: any;
  public category_selected: any;
  public index_selected:any;
  public total_couples: number = 1;
  public category_no_couple: boolean = false;
  public exist_category_not_configured: boolean = false;
  public enough_courts: boolean = false;
  public category_id: string = '';
  public loaded:boolean = false;
  public timeLeft: number = 60;
  public interval: any;
  public messages: any = [];
  public creating_draw:number = 0;
  public tab_selected: number = 1;
  public kind_sport: any = [];
  public type_sport: string = '0';
  public courts: any = [];
  public hasPadelCourts: boolean = false;
  public hasTennisCourts: boolean = false;
  public hasPickleballCourts: boolean = false;
  public hasSquashCourts: boolean = false;
  public hasBadmintonCourts: boolean = false;
  public is_draft: string = '';
  public match_types: any = [];
  public match_type_id: string = '0';

  public points_per_win_2_0: number = 0;
  public points_per_win_2_1: number = 0;
  public points_per_lost_0_2: number = 0;
  public points_per_lost_1_2: number = 0;


  constructor( public clubSrv: ClubService,public tournamentSrv: TournamentService, public activateRoute: ActivatedRoute, 
               public categorySrv: CategoryService, public translate: TranslateService, date: DateAdapter<Date>){
        if( this.tournamentSrv.authSrv.language == 'es'){
          date.getFirstDayOfWeek = () => 1;
        }
  }

  ngOnInit(): void {
    
    this.initializeLanguage();
    this.user = this.tournamentSrv.authSrv.user;
    this.hasPermission();
    this.clubSrv.config().subscribe( (resp:any)=>{
      this.hours = resp.hours_days;
      this.courts = resp.courts;
      this.typeOfCourtsClub();
      this.loaded = true;
      this.typeMatch();
    });
    this.activateRoute.params.subscribe( (resp:any) => {
      if(resp.id){
        this.id_tournament = resp.id;
        this.getTournamentSelected();
      }else{
        this.loaded = true;
      }
      if(resp.tab){
        this.tab_selected = resp.tab;
      }
    })
  }


  startTimer() {
    let cont: number = 0;
    this.messages.push(this.translations["tournaments"].start_setting_up);
    this.interval = setInterval(() => {
      if(this.timeLeft >= 0) {
        if(cont < this.categories_list.length){
          this.messages.push(this.translations["tournaments"].setting_up + this.categories_list[cont].name);
        }else{
          this.messages.push(this.translations["tournaments"].success_draw_created);
        }
        this.timeLeft--;
        cont ++;
      } else {
       this.messages = [];
       this.creating_draw = 0;
      }
    },2500)
    
  }




  initializeLanguage(){
    this.translate.use(this.tournamentSrv.authSrv.language);
    this.translate.setDefaultLang(this.tournamentSrv.authSrv.language);

    this.translate.get(['commun_translations', 'tournaments', 'club_translations', 'tournaments.tournaments_messages', 'tournaments.type_category'])
      .subscribe((resp:any) => {
        this.translations = resp;
      });   
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

  getTournamentSelected(){
    this.tournamentSrv.getTournament(this.id_tournament).subscribe( (resp:any) => {
      this.tournament_selected = resp.league;
      this.type_sport = this.tournament_selected.sport_type;
      this.name = this.tournament_selected.name;
      this.date_start = this.tournament_selected.start_date;
      this.date_end = this.tournament_selected.end_date;
      this.date_starts_registration = this.tournament_selected.date_starts_registration;
      this.date_ends_registration = this.tournament_selected.date_ends_registration;
      this.hour_starts_registration = this.tournament_selected.hour_starts_registration;
      this.hour_ends_registration = this.tournament_selected.hour_ends_registration;
      this.image_preview = this.tournament_selected.avatar;
      this.categories_list = this.tournament_selected.category;
      this.timeLeft = this.categories_list.length;
      this.schedule_list = this.tournament_selected.schedule;
      this.price = this.tournament_selected.price;
      this.price_member = this.tournament_selected.price_member;
      this.time_per_match = this.tournament_selected.time_per_match;
      this.draw_generated = this.tournament_selected.draw_generated;
      this.is_draft = this.tournament_selected.is_draft;
      
      this.existsNoCoupleCategory();
      this.addTypeNameCategories();
      this.loaded = true;
    });
  }


  loadFile( event: any ){
     
    if( event.target.files[0].type.indexOf('image') < 0){
      alert(this.translations['commun_translations'].only_type_img);
      this.image_preview = this.image_preview ? this.image_preview : 'assets/img/img-06.jpg';
      return;
    }
    if(event.target.files[0].size > 2000000){
      alert(this.translations['commun_translations'].max_size_img);
      this.fileAvatar = '';
      return;
    }
    if(event.target.files[0].size > 2000000){
      alert(this.translations['commun_translations'].max_size_img);
      this.fileAvatar = '';
      return;
    }
    
    this.fileAvatar = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(this.fileAvatar);
    reader.onloadend = () => this.image_preview = reader.result;
  }

  cleanMessage(){
    this.error_message = '';
    this.success_message = '';
    this.message_errors = [];
    this.error_message_category = '';
    this.success_message_category = '';
    this.error_message_schedule= '';
    this.success_message_schedule = '';
    this.message_errors_schedule = [];
    this.message_errors_category = [];
  }
  
  allowOperation(){
    if(this.draw_generated == 1){
      Swal.fire({
        title: this.translations["tournaments.tournaments_messages"].operation_not_permitted,
        text: this.translations["tournaments.tournaments_messages"].cannot_save_changes,
        icon: "question"
      });
      return false;
    }
    return true;
  }

  save( isDraft:string = '1'){
    
    this.is_draft = isDraft;
    
    if(this.allowOperation() == false){
      return;
    }

    this.cleanMessage();

    if( this.name == '' ){
      this.error_message = this.translations["tournaments.tournaments_messages"].error_1;
      return;
    }

    if( this.name && this.name.length > 191){
      this.error_message = this.translations["tournaments.tournaments_messages"].error_2;
      return;
    }

    
    if( this.type_sport == '0' ){
      this.error_message = this.translations["tournaments.tournaments_messages"].error_13;
      return;
    }

    

    if( this.date_start == '' ){
      this.error_message = this.translations["tournaments.tournaments_messages"].error_3;
      return;
    }

    if( this.date_end == '' ){
      this.error_message = this.translations["tournaments.tournaments_messages"].error_4;
      return;
    }

    if( this.date_starts_registration == '' ){
      this.error_message = this.translations["tournaments.tournaments_messages"].error_9;
      return;
    }

    if( this.hour_starts_registration == '' ){
      this.error_message = this.translations["tournaments.tournaments_messages"].error_10;
      return;
    }
      
    if( this.date_ends_registration == '' ){
      this.error_message = this.translations["tournaments.tournaments_messages"].error_11;
      return;
    }

    if( this.hour_ends_registration == '' ){
      this.error_message = this.translations["tournaments.tournaments_messages"].error_12;
      return;
    }
      
    if (typeof + this.price != "number"){
      this.error_message = this.translations["tournaments.tournaments_messages"].error_5;
      return;
    }

    if (typeof + this.price_member != "number"){
      this.error_message = this.translations["tournaments.tournaments_messages"].error_6;
      return;
    }

    if (typeof + this.time_per_match != "number"){
      this.error_message = this.translations["tournaments.tournaments_messages"].error_8;
      return;
    }

    let formData = new FormData();
    formData.append('name', this.name);
    formData.append('sport_type', this.type_sport);
    formData.append('start_date', this.date_start);
    formData.append('end_date', this.date_end);
    formData.append('price', this.price.toString());
    formData.append('price_member', this.price_member.toString());
    formData.append('time_per_match', this.time_per_match.toString());
    if( this.fileAvatar != null){
      formData.append('imagen', this.fileAvatar);
    }
    formData.append('date_starts_registration', this.date_starts_registration);
    formData.append('hour_starts_registration', this.hour_starts_registration);
    formData.append('date_ends_registration', this.date_ends_registration);
    formData.append('hour_ends_registration', this.hour_ends_registration);
    formData.append('is_draft', isDraft);

   

    this.tournamentSrv.saveTournament(this.id_tournament, formData).subscribe( (resp: any) => {
      if( resp.message == 200){
        this.success_message = this.translations['commun_translations'].data_save_correctly;
        if(this.id_tournament == ''){
          this.id_tournament = resp.id_tournament;
        }
      }else if(resp.message == 422) {
        this.error_message = this.translations['commun_translations'].data_save_error ;
        this.message_errors = resp.errors_text
      } else {
        this.error_message = this.translations['commun_translations'].data_save_error + ' ' + this.translations['commun_translations'].consult_admin;
      }
    })
  }


  addSchedule(){

    if(this.allowOperation() == false){
      return;
    }

    this.cleanMessage();
    if(this.date_schedule > this.date_end || this.date_schedule < this.date_start){
      this.error_message_schedule = 'La fecha tiene que estar comprendida entre la Fecha de inicio y Fecha de fin.';
      return;
    }

    const openTimeArray = this.opening_time.split(':');
    const closingTimeArray = this.closing_time.split(':');
    if( Number(openTimeArray[0]) > Number(closingTimeArray[0]) || (Number(openTimeArray[0]) == Number(closingTimeArray[0]) && Number(openTimeArray[1]) > Number(closingTimeArray[1]))){
      this.error_message_schedule = 'La hora de inicio no puede ser mayor que la hora de fin.';
      return;
    }
    let pipe = new DatePipe('en-US');
    let item = {
      id: null,
      tournament_id: this.id_tournament,
      date: pipe.transform(this.date_schedule, 'yyyy-MM-dd'),
      opening_time: this.opening_time,
      closing_time: this.closing_time
    };

    if( this.schedule_selected != null){  // Edit schedule
      item.id = this.schedule_selected;
      this.tournamentSrv.editSchedule(item, this.schedule_selected).subscribe( (resp:any) => {
        if( resp.message == 200){
          item.id = resp.schedule_id;
          this.schedule_list[this.index_selected] = item;
          this.date_schedule = '';
          this.opening_time = '';
          this.closing_time = '';
          this.schedule_selected = null;
          this.success_message_schedule = this.translations['commun_translations'].data_save_correctly;
        }else if(resp.message == 422) {
          this.error_message_schedule = this.translations['commun_translations'].data_save_error ;
          this.message_errors_schedule = resp.errors_text
        } else {
          this.error_message_schedule = this.translations['commun_translations'].data_save_error + ' ' + this.translations['commun_translations'].consult_admin;
        }
      })
    }else{  // New Schedule
      this.tournamentSrv.saveSchedule(item).subscribe( (resp:any) => {
        if( resp.message == 200){
          item.id = resp.schedule_id;
          this.schedule_list.push(item);
          this.date_schedule = '';
          this.opening_time = '';
          this.closing_time = '';
          this.success_message_schedule = this.translations['commun_translations'].data_save_correctly;
        }else if(resp.message == 422) {
          this.error_message_schedule = this.translations['commun_translations'].data_save_error ;
          this.message_errors_schedule = resp.errors_text
        } else {
          this.error_message_schedule = this.translations['commun_translations'].data_save_error + ' ' + this.translations['commun_translations'].consult_admin;
        }
      })
    }
   
   

  }

  selectItem( item:any, index:any, element: number ){
    this.cleanMessage();
    if(element == 1){
      this.category_selected = null;
      this.schedule_selected = item;
    }else{
      this.schedule_selected = null;
      this.category_selected = item;
    }
    this.index_selected = index;
  }

  existsNoCoupleCategory(){
      for (let i=0; i < this.categories_list.length; i++) {
          if (this.categories_list[i].total_couple == 0 && this.category_no_couple == false) {
              this.category_no_couple = true;
              return;
          }
      }
  }

  addTypeNameCategories(){
    let type_category:any = [];
    type_category[1] = this.translations["tournaments.type_category"].normal_league;
    type_category[2] = this.translations["tournaments.type_category"].two_small_league;
    type_category[3] = this.translations["tournaments.type_category"].draw_and_losser_draw;
    type_category[4] = this.translations["tournaments.type_category"].normal_draw;
    type_category[5] = this.translations["tournaments.type_category"].american;
    type_category[6] = this.translations["tournaments.type_category"].round_robin_two_legs;
    
    for (let i=0; i < this.categories_list.length; i++) {
      let type = this.categories_list[i].type;
      if (type ) {
          this.categories_list[i].type_name = type_category[type];
      }else{
        this.categories_list[i].type_name = '. . .';
      }
    }
  }


  existsCategoryNotDonfigure(){
    for (let i=0; i < this.categories_list.length; i++) {
        if (this.categories_list[i].type == 0 && this.exist_category_not_configured == false) {
            this.exist_category_not_configured = true;
            return;
        }
    }
}


  deleteSchedule(){
    
    if(this.allowOperation() == false){
      this.closebutton.nativeElement.click();
      return;
    }

    this.cleanMessage();
    this.tournamentSrv.deleteSchedule(this.schedule_selected.id).subscribe( (resp: any) => {
      if(resp.message == 200){
        this.schedule_selected = null;
        this.schedule_list.splice(this.index_selected, 1);
        this.name_category = '';
        this.description_category = '';
        this.success_message_category = this.translations['tournaments.tournaments_messages'].success_delete_schedule;
        this.closebutton.nativeElement.click();
      }else{
        this.success_message_category = this.translations['commun_translations'].data_delete_error;
      }
    })
  }


  addCategory(){

    if(this.allowOperation() == false){
      return;
    }

    this.cleanMessage();

    if( !this.name_category ){
      this.error_message_category = this.translations["tournaments.tournaments_messages"].error_7;
      return;
    }

    if( this.type_sport == '2' ||  this.type_sport == '3'){
      if( this.match_type_id == '0' ){
        this.error_message_category = this.translations["leagues.leagues_messages"].error_14;
        return;
      }
    }

   
    let item = {
      id: null,
      name: this.name_category,
      description: this.description_category,
      tournament_id: this.id_tournament,
      total_couple: 0,
      match_type: 'double'
    };


    if(this.match_type_id == 'singles'){
      item.match_type = 'singles';
    }
    


    this.categorySrv.storeCategory(item).subscribe( (resp:any) => {  
      if( resp.message == 200){
        item.id = resp.category_id;
        this.categories_list.push(item);
        this.name_category = '';
        this.description_category = '';
        this.category_no_couple = true;
        this.success_message_category = this.translations['commun_translations'].data_save_correctly;
      }else if(resp.message == 422) {
        this.error_message_category = this.translations['commun_translations'].data_save_error ;
        this.message_errors_category = resp.errors_text
      } else {
        this.error_message_category = this.translations['commun_translations'].data_save_error + ' ' + this.translations['commun_translations'].consult_admin;
      }
    })

  }
  
  deleteCategory(){

    if(this.allowOperation() == false){
      this.closebutton.nativeElement.click();
      return;
    }

    this.cleanMessage();
    this.categorySrv.deleteCategory(this.category_selected.id).subscribe( (resp: any) => {
      if(resp.message == 200){
        this.categories_list.splice(this.index_selected, 1);
        this.category_selected = null;
        this.name_category = '';
        this.description_category = '';
        this.closebutton.nativeElement.click();
        this.success_message_category = this.translations['tournaments.tournaments_messages'].success_delete_category;
        this.category_no_couple = false;
        this.existsNoCoupleCategory();
      }else{
        this.success_message_category = this.translations['commun_translations'].data_delete_error;
      }
    })
  }

  cancelCategory(){
    this.name_category = '';
    this.description_category = '';
  }

  configureDraw(){

    this.existsCategoryNotDonfigure();
    this.existsNoCoupleCategory();
    //this.checkEnoughCourtsAllMatches();
    if(this.category_no_couple == true || this.exist_category_not_configured == true){
      Swal.fire({
        title: this.translations["tournaments.tournaments_messages"].operation_not_permitted,
        text: this.translations["tournaments.tournaments_messages"].cannot_configure_tournament,
        icon: "warning"
      });
      return;
    }


    if( this.category_no_couple == false && this.exist_category_not_configured == false){
      this.draw_generated = 1;
      this.creating_draw = 1;
      
      this.tournamentSrv.configureTournament( this.id_tournament ).subscribe( (resp: any)=> {
        if(resp.message == 200){
          this.startTimer()
          this.draw_generated = 1;
        }else{
          Swal.fire({
            title: this.translations["tournaments.tournaments_messages"].operation_not_permitted,
            text: this.translations["tournaments.tournaments_messages"].not_enough_courts,
            icon: "warning"
          });
          this.draw_generated = 0;
          this.creating_draw = 0;
        }
      });
    }
  }


  deleteDraw(){
    this.categorySrv.deleteDraw( this.id_tournament ).subscribe( (resp: any)=> {
      if(resp.message == 200){
        this.draw_generated = 0;
        this.closebutton_delete_draw.nativeElement.click();
      }else{
        this.draw_generated = 1;
      }
    });
  }

  tabSeleted(value: number){
    this.tab_selected = value;
  }

  selectSchedule(item:any, index: any){
    
    this.date_schedule = item.date;
    this.opening_time = item.opening_time;
    this.closing_time = item.closing_time;
    this.schedule_selected = item.id;
    this.index_selected = index;
  }


  typeOfCourtsClub(){
    this.kind_sport.push( { id: 0, name: '...'});
    
    this.courts.some((court: any) => {
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

  typeMatch(){
    this.match_types.push( 
      {
        id: 0,
        name: '...'
      },
      {
        id: 'double',
        name: this.translations["club_translations"].match_type_double
      },
      {
        id: 'singles',
        name: this.translations["club_translations"].match_type_single
      }
    )
  }


}

