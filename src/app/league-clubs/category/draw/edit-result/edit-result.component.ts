import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ClubService } from 'src/app/league-clubs/club/service/club.service';
import { routes } from 'src/app/shared/routes/routes';
import { TournamentService } from 'src/app/tournament-clubs/tournament/service/tournament.service';

@Component({
  selector: 'app-edit-result',
  templateUrl: './edit-result.component.html',
  styleUrls: ['./edit-result.component.scss']
})
export class EditResultComponent {

  public routes = routes;
  public category_id: string = '';
  public type_category: string = '';
  public match_id: string = '';
  public user: any; 
  public tournament_id: string = ''; 
  public name: string = '';
  public date: string = '';
  public hours:any = [];
  public time: string = '';
  public courts: any = [];
  public court: string = '';
  public match_list: any = [];
  public date_start_tournament: string = '';
  public date_end_tournament: string = '';
  public recommended_timetables: any = [];
  public new_timetable: string = '';
  public draw_type: string = 'main-draw';

  public success_message: string = '';
  public error_message: string = '';
  public message_errors: any = [];
  public succes_message_schedule: string = '';
  public error_message_schedule: string = '';
  public message_errors_schedule: any = [];

  public result_set_1: string = '';
  public result_set_2: string = '';
  public result_set_3: string = '';

  public result_set_1_local: string = '';
  public result_set_2_local: string = '';
  public result_set_3_local: string = '';

  public result_set_1_visiting: string = '';
  public result_set_2_visiting: string = '';
  public result_set_3_visiting: string = '';


  public can_edit:boolean = false;
  public local_player_1: string = '-';
  public local_player_2: string = '-';

  public visiting_player_1: string = '-';
  public visiting_player_2: string = '-';
  public round: string = '';
  public match_finished: string = '0';

  public translations:any = [];
  public isLoaded: boolean = false;
  public sport_id: string = '';
  public match_type: string = 'double';


  constructor(public activateRoute: ActivatedRoute, public tournamentSrv: TournamentService, public translate: TranslateService, public clubSrv: ClubService){}

  ngOnInit(): void {

    this.can_edit = false;
    this.user = this.tournamentSrv.authSrv.user;
    this.initializeLanguage();
    this.clubSrv.config().subscribe( (resp:any)=>{
      this.hours = resp.hours_days;
      this.courts = resp.courts;
    });
    this.activateRoute.params.subscribe( (resp:any) => {
      this.match_id = resp.match_id;
    });

    this.tournamentSrv.getMatch(this.match_id).subscribe((resp:any) => {
      this.category_id = resp.category_id;
      this.type_category = resp.category_type;
      this.court = resp.court;
      this.date_start_tournament = resp.start_tournament;
      this.draw_type = resp.draw_type;
      this.date_end_tournament = resp.end_tournament;
      this.recommended_timetables = resp.recommended_timetables;
      this.sport_id = resp.sport_id;
      this.match_type = resp.match_type;
      this.addDayNameRecommendedTimetables(resp.recommended_timetables);
      this.getDateAndHour(resp.date);
      /*if( resp.local_players.length > 1 ){
        this.local_player_1 = resp.local_players[0].name;
        this.local_player_2 = resp.local_players[1].name;
      }
      if( resp.visiting_players.length > 1 ){
        this.visiting_player_1 = resp.visiting_players[0].name;
        this.visiting_player_2 = resp.visiting_players[1].name;
      }*/
      this.readPlayers(resp.local_players, resp.visiting_players);
      this.result_set_1 = resp.result_set_1;
      this.result_set_2 = resp.result_set_2;
      this.result_set_3 = resp.result_set_3;
      let round_id = resp.max_round - resp.round;
      this.match_finished = resp.match_finished;
      this.round = this.translations['tournaments'].rounds[round_id];
      this.getResults();
      this.isLoaded = true;
    }) 
  }

  readPlayers(local_players:any, visiting_players:any ){
    if( this.match_type == 'double'){
      if( local_players.length > 1){
        this.local_player_1 = local_players[0].name;
        this.local_player_2 = local_players[1].name;
      }
      if( visiting_players.length > 1 ){
        this.visiting_player_1 = visiting_players[0].name;
        this.visiting_player_2 = visiting_players[1].name;
      }
    }else{
      if( local_players.length == 1){
        this.local_player_1 = local_players[0].name;
        this.local_player_2 = '';
      }
      if( visiting_players.length == 1){
        this.visiting_player_1 = visiting_players[0].name;
        this.visiting_player_2 = '';
      }
    }
  }


  addDayNameRecommendedTimetables(timetable: any){
    let week_days:any = [];
    week_days.push(this.translations['commun_translations'].day_1);
    week_days.push(this.translations['commun_translations'].day_2); 
    week_days.push(this.translations['commun_translations'].day_3);
    week_days.push(this.translations['commun_translations'].day_4);
    week_days.push(this.translations['commun_translations'].day_5);
    week_days.push(this.translations['commun_translations'].day_6);
    week_days.push(this.translations['commun_translations'].day_7);
    
    this.recommended_timetables.forEach((element:any) => {
        element.day = week_days[element.day - 1];
    });
  }

  getDateAndHour( date:string){
    
    
    if(date != ''){
      let array_date = date.split(' ');
      let array_hour = array_date[1].split(':');
      this.date = array_date[0];
      this.time = parseInt(array_hour[0]) + ':' + array_hour[1];
    }
  }
  


  initializeLanguage(){
    this.translate.use(this.tournamentSrv.authSrv.language);
    this.translate.setDefaultLang(this.tournamentSrv.authSrv.language);

    this.translate.get(['commun_translations', 'leagues', 'tournaments'])
      .subscribe((resp:any) => {
        this.translations = resp;
      }); 

  }

  cleanMessage(){
    this.error_message = '';
    this.success_message = '';
    this.message_errors = [];
    this.error_message_schedule = '';
    this.succes_message_schedule = '';
    this.message_errors_schedule = [];
  }

  checkSetResult(event: KeyboardEvent) {
    const pattern = /[0-7]$/;
    const inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
        event.preventDefault();
    }
  }

  checkSetResultPickleball(event: KeyboardEvent) {
    const pattern = /[0-9]$/;
    const inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
        event.preventDefault();
    }
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

  saveResult(){

    this.cleanMessage();

    if(this.result_set_1_local && this.result_set_1_visiting){
      this.result_set_1 = this.result_set_1_local + '-' + this.result_set_1_visiting;
    }

    if(this.result_set_2_local && this.result_set_2_visiting){
      this.result_set_2 = this.result_set_2_local + '-' + this.result_set_2_visiting;
    }

    if(this.result_set_3_local && this.result_set_3_visiting){
      this.result_set_3 = this.result_set_3_local + '-' + this.result_set_3_visiting;
    }

    if(this.correctResult() == true ){

      let formData = new FormData();

      let data = {
        'match_id': this.match_id,
        'result_set_1' : this.result_set_1,
        'result_set_2' : this.result_set_2,
        'result_set_3' :this.result_set_3,
      }

      formData.append('results', JSON.stringify(data));

      this.tournamentSrv.saveResult(this.match_id, formData).subscribe((resp:any) => {
        if( resp.message == 200){
          this.success_message = this.translations['commun_translations'].data_save_correctly;
        }else if(resp.message == 422) {
          this.error_message = this.translations['commun_translations'].data_save_error ;
          this.message_errors = resp.errors_text
        } else {
          this.error_message = this.translations['commun_translations'].data_save_error + ' ' + this.translations['commun_translations'].consult_admin;
        }
        
      })
    }
  }


  saveResultPickleball(){
    this.cleanMessage();

    if(this.result_set_1_local && this.result_set_1_visiting){
      this.result_set_1 = this.result_set_1_local + '-' + this.result_set_1_visiting;
    }

    if(this.result_set_2_local && this.result_set_2_visiting){
      this.result_set_2 = this.result_set_2_local + '-' + this.result_set_2_visiting;
    }

    if(this.result_set_3_local && this.result_set_3_visiting){
      this.result_set_3 = this.result_set_3_local + '-' + this.result_set_3_visiting;
    }

    if(this.correctResultPickleball() == true ){
      let formData = new FormData();

      let data = {
        'match_id': this.match_id,
        'result_set_1' : this.result_set_1,
        'result_set_2' : this.result_set_2,
        'result_set_3' :this.result_set_3,
      }

      formData.append('results', JSON.stringify(data));

      this.tournamentSrv.saveResultPickleball(this.match_id, formData).subscribe((resp:any) => {
        if( resp.message == 200){
          this.success_message = this.translations['commun_translations'].data_save_correctly;
        }else if(resp.message == 422) {
          this.error_message = this.translations['commun_translations'].data_save_error ;
          this.message_errors = resp.errors_text
        } else {
          this.error_message = this.translations['commun_translations'].data_save_error + ' ' + this.translations['commun_translations'].consult_admin;
        }
        
      })
    }
  }

  updateSchedule(){
    this.cleanMessage();

    if( this.new_timetable == '' ){
      this.error_message_schedule = 'Heuston, tenemos un problema';//this.translations["tournaments.tournaments_messages"].error_3;
      return;
    }

   

    let data = {
      'match_id': this.match_id,
      'new_timetable_id': this.new_timetable
    }

    
    
    this.tournamentSrv.updateScheduleMatch(this.match_id, data).subscribe((resp:any) => {
      if( resp.message == 200){
        this.succes_message_schedule = this.translations['commun_translations'].data_save_correctly;
        this.date = resp.date;
        this.time = resp.time;
        this.court = resp.court;
      }else if(resp.message == 422) {
        this.error_message_schedule = this.translations['commun_translations'].data_save_error ;
        this.message_errors_schedule = resp.errors_text
      } else {
        this.error_message_schedule = this.translations['commun_translations'].data_save_error + ' ' + this.translations['commun_translations'].consult_admin;
      }
      
    })

  }

  correctResult(){
    
    let pattern = /^(6|7)-[0-7]$|^[0-7]-(6|7)$/;

    if( (this.result_set_1 == '' || this.result_set_1 == null) && 
        ((this.result_set_2 != '' && this.result_set_2 != null) || (this.result_set_3 != '' && this.result_set_3 != null)) ){
          this.error_message = 'Falta el resultado del Set 1 '
          return false;
    }

    if( (this.result_set_2 == '' || this.result_set_2 == null) && 
        (this.result_set_3 != '' &&  this.result_set_3 != null) ){
          this.error_message = 'Falta el resultado del Set 2 '
          return false;
    }

    if( (this.result_set_3 != '' && this.result_set_3 != null) && 
        ( this.result_set_1 == '' || this.result_set_1 == null || this.result_set_2 == '' || this.result_set_2 == null ) ){
          this.error_message = 'Falta el resultado del Set 1 o 2 del partido ' 
    }


    if (this.result_set_1 != '' && this.result_set_1 != null && !pattern.test(this.result_set_1)) {
      this.error_message = 'El resultado del Set 1 es incorrecto'
      return false;
    }
    if (this.result_set_2 != '' && this.result_set_2 != null && !pattern.test(this.result_set_2)) {
      this.error_message = 'El resultado sel Set 2 es incorrecto'
      return false;
    }
    if (this.result_set_3 != '' && this.result_set_3 != null && !pattern.test(this.result_set_3)) {
      this.error_message = 'El resultado sel Set 3 entre es incorrecto'
      return false;
    }
      

    return true;
  }

  correctResultPickleball(){
    
    let pattern = /\b(1[1-5]|2[0-1])-(\d{1,2})\b/;
    

    if( (this.result_set_1 == '' || this.result_set_1 == null) && 
        ((this.result_set_2 != '' && this.result_set_2 != null) || (this.result_set_3 != '' && this.result_set_3 != null)) ){
          this.error_message = 'Falta el resultado del Set 1 '
          return false;
    }

    if( (this.result_set_2 == '' || this.result_set_2 == null) && 
        (this.result_set_3 != '' &&  this.result_set_3 != null) ){
          this.error_message = 'Falta el resultado del Set 2 '
          return false;
    }

    if( (this.result_set_3 != '' && this.result_set_3 != null) && 
        ( this.result_set_1 == '' || this.result_set_1 == null || this.result_set_2 == '' || this.result_set_2 == null ) ){
          this.error_message = 'Falta el resultado del Set 1 o 2 del partido ' 
    }


    /*if (this.result_set_1 != '' && this.result_set_1 != null && !pattern.test(this.result_set_1)) {
      this.error_message = 'El resultado del Set 1 es incorrectoooo'
      return false;
    }

    if( this.result_set_1 != '' && this.result_set_1 != null &&  Math.abs( Number(this.result_set_1_local) -  Number(this.result_set_1_visiting)) < 2){
      console.log(Math.abs( Number(this.result_set_1_local) -  Number(this.result_set_1_visiting)));
      
      this.error_message = 'El resultado del Set 1 es incorrecto!'
      return false;
    }*/
    if( this.result_set_1 != '' && this.result_set_1 != null && this.isValidSetPickleball(this.result_set_1) == false ){
      this.error_message = 'El resultado del Set 1 es incorrecto!!!'
      return false;
    }


   /* if (this.result_set_2 != '' && this.result_set_2 != null && !pattern.test(this.result_set_2)) {
      this.error_message = 'El resultado sel Set 2 es incorrecto'
      return false;
    }

    if( this.result_set_2 != '' && this.result_set_2 != null &&  Math.abs( Number(this.result_set_2_local) -  Number(this.result_set_2_visiting)) < 2){
      this.error_message = 'El resultado del Set 2 es incorrecto!'
      return false;
    }
      */

    if( this.result_set_2 != '' && this.result_set_2 != null && this.isValidSetPickleball(this.result_set_2) == false ){
      this.error_message = 'El resultado del Set 2 es incorrecto!!!'
      return false;
    }


    /*
    if (this.result_set_3 != '' && this.result_set_3 != null && !pattern.test(this.result_set_3)) {
      this.error_message = 'El resultado sel Set 3 entre es incorrecto'
      return false;
    }

    if( this.result_set_3 != '' && this.result_set_3 != null &&  Math.abs( Number(this.result_set_3_local) -  Number(this.result_set_3_visiting)) < 2){
      this.error_message = 'El resultado del Set 3 es incorrecto!'
      return false;
    }
    */

    if( this.result_set_3 != '' && this.result_set_3 != null && this.isValidSetPickleball(this.result_set_3) == false ){
      this.error_message = 'El resultado del Set 3 es incorrecto!!!'
      return false;
    }
      

    return true;
  }


  isValidSetPickleball(resultado: string) {
    
    const regex = /^(\d+)-(\d+)$/;
    const match = resultado.match(regex);
    
    if (!match) return false;

    let [_, p1, p2] = match.map(Number);

    // El ganador debe tener 11-15 o 20-21 puntos
    if (!([11, 12, 13, 14, 15, 20, 21].includes(p1) || [11, 12, 13, 14, 15, 20, 21].includes(p2))) {
        return false;
    }

    // Diferencia mínima de 2 puntos
    return Math.abs(p1 - p2) >= 2; 
}


  getResults(){
    let arrayRestul;
    if( this.result_set_1 != null && 
        ((   this.result_set_1.length == 3 && (this.sport_id == '1' || this.sport_id == '2')) 
            || (this.result_set_1.length >= 4 && this.sport_id == '3'))){
      arrayRestul = this.result_set_1.split('-');
      this.result_set_1_local = arrayRestul[0];
      this.result_set_1_visiting = arrayRestul[1];
    }

    if( this.result_set_2 != null && 
      ((   this.result_set_2.length == 3 && (this.sport_id == '1' || this.sport_id == '2')) 
          || (this.result_set_2.length >= 4 && this.sport_id == '3'))){
      arrayRestul = this.result_set_2.split('-');
      this.result_set_2_local = arrayRestul[0];
      this.result_set_2_visiting = arrayRestul[1];
    }

    if( this.result_set_3 != null && 
      ((   this.result_set_3.length == 3 && (this.sport_id == '1' || this.sport_id == '2')) 
          || (this.result_set_3.length >= 4 && this.sport_id == '3'))){
      arrayRestul = this.result_set_3.split('-');
      this.result_set_3_local = arrayRestul[0];
      this.result_set_3_visiting = arrayRestul[1];
    }
    
  }
  
}
