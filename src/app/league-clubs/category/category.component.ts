import { Component, ViewChild } from '@angular/core';
import { routes } from 'src/app/shared/routes/routes';
import { CategoryService } from './service/category.service';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { TournamentService } from 'src/app/tournament-clubs/tournament/service/tournament.service';
import { ClubService } from '../club/service/club.service';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { DateAdapter } from '@angular/material/core';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent {
  @ViewChild('closebutton') closebutton: any;
  @ViewChild('closebutton_schedule') closebutton_schedule: any;
  public routes = routes;

  public name: string = '';
  public description: string = '';
  public type_category_tournament: any = [];
  public type_category_league: any = [];
  public type: string = '';
  public type_category_id: string = '';
  public league_id:string = '';
  public tournament_id: string = '';
  
  public success_message_general_data: string = '';
  public error_message_general_data: string = '';
  public message_errors: any = [];

  public error_message_couple: string = '';
  public success_message_couple: string = '';
  public message_errors_couple: string = '';


  public leagues_list: any = [];    
  public category_id: string = '';
  public category_selected: any;
  public text_modal_invalid: string = '';
  public text_modal_success: string = '';
  public couples: any = [];
  public substitutes_player: any = [];
  public open_form_couple: boolean = false;
  public open_form_player: boolean = false;
  
  public player_selected: any;

  public couples_total: number = 1;
  public couple_name: string = '';
  public player_1_id_new: string = '';
  public player_1_id: string = '';
  public player_1_mobile: string = '';
  public player_1_name: string = '';
  public player_1_surname: string = '';
  public player_2_id_new: string = '';
  public player_2_id: string = '';
  public player_2_mobile: string = '';
  public player_2_name: string = '';
  public player_2_surname: string = '';
  public substitute_id_new: string = '';
  public substitute_id: string = '';
  public substitute_mobile: string = '';
  public substitute_name: string = '';
  public substitute_surname: string = '';
  public substitute_2_mobile: string = '';
  public substitute_2_name: string = '';
  public substitute_2_surname: string = '';

  public couple_selected_id: string = '';
  public couple_selected: any;

  public players_found_substitute: any = [];
  public found_player_1_by_mobile: any = [];
  public found_player_1_by_name: any = [];
  public found_player_1_by_surname: any = [];
  public found_player_2_by_mobile: any = [];
  public found_player_2_by_name: any = [];
  public found_player_2_by_surname: any = [];

  public tab_selected: number = 1;
  public isLoaded: boolean = false;
  public journey_created: boolean = false;
  public draw_created: boolean = false;

  public first_choice_players: any = [];
  public translations:any = [];
  public user: any;
  public can_edit:boolean = false; 

  public date_start_tournament: string = '';
  public date_end_tournament: string = '';
  public date_schedule: string = '';
  public opening_time: string = '';
  public closing_time: string = '';
  public hours:any = [];
  public schedule_list:any = [];
  public error_message_schedule: string = '';
  public success_message_schedule: string = '';
  public message_errors_schedule: any =[];
  public tournament_data: any;
  public schedule_selected: any;
  public index_selected:any;

  public mobile_search: string = '';
  public name_search: string = '';
  public surname_search: string = '';
  public type_matchs = 'double';
  public match_tab_player: string = '';
  public categories: any = [];
  public couple_category: string = '';
  public total_jorneys_created: number = 0;

  public mobile_player_selected: string = '';
  public match_types: any = [];
  public match_type_id: string = '0';
  public type_sport: string = '0';

  public points_per_win_2_0: number = 3;
  public points_per_win_2_1: number = 2;
  public points_per_lost_0_2: number = 0;
  public points_per_lost_1_2: number = 1;

  public data_search = {
    'name': '',
    'surname': '',
    'mobile': ''
  };


  constructor(public categorySrv: CategoryService, public activateRoute: ActivatedRoute, date: DateAdapter<Date>,
        public translate: TranslateService, public tournamentSrv: TournamentService, public clubSrv: ClubService){
          if( this.categorySrv.authSrv.language == 'es'){
            date.getFirstDayOfWeek = () => 1;
          }
        }
  
  ngOnInit(): void {
    this.user = this.categorySrv.authSrv.user;
    this.initializeLanguage();
    
    this.activateRoute.params.subscribe( (resp:any) => {
      this.category_id = resp.id;
      this.tab_selected = resp.tab;
      this.getCategorySelected();
    })
    this.categorySrv.config().subscribe( (resp:any) => {
      this.leagues_list = resp.leagues;
    });
    this.clubSrv.config().subscribe( (resp:any)=>{
      this.hours = resp.hours_days;
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


  initializeLanguage(){
    this.translate.use(this.categorySrv.authSrv.language);
    this.translate.setDefaultLang(this.categorySrv.authSrv.language);
    this.translate.get(['commun_translations', 'leagues', 'tournaments', 'tournaments.type_category', 'club_translations', 'tournaments.tournaments_messages'])
      .subscribe((resp:any) => {
        this.translations = resp;
        this.type_category_tournament.push(
          { id: 1, name: this.translations["tournaments.type_category"].normal_league },
          { id: 2, name: this.translations["tournaments.type_category"].two_small_league },
          { id: 6, name: this.translations["tournaments.type_category"].round_robin_two_legs },
          { id: 3, name: this.translations["tournaments.type_category"].draw_and_losser_draw },
          { id: 4, name: this.translations["tournaments.type_category"].normal_draw },
          //{ id: 5, name: this.translations["tournaments.type_category"].american },
        );
        this.type_category_league.push(
          { id: 1, name: this.translations["tournaments.type_category"].only_one_leg },
          { id: 6, name: this.translations["tournaments.type_category"].two_leg },
        );
        this.typeMatch();
      }); 
      
  }

  getCategorySelected(){
    this.categorySrv.getCategory(this.category_id).subscribe( (resp:any) => {
      this.category_selected = resp.category;
      this.name = this.category_selected.name;
      this.description = this.category_selected.description;
      this.type = this.category_selected.type;
      this.type_category_id = this.category_selected.type;
      this.league_id = this.category_selected.league_id;
      this.tournament_id = this.category_selected.tournament_id;
      this.match_type_id = this.category_selected.match_type;
      this.couples = resp.couples.data;
      this.couples_total = this.couples.length + 1;
      this.journey_created = resp.journeys_created;
      this.points_per_win_2_0 = this.category_selected.points_per_win_2_0;
      this.points_per_win_2_1 = this.category_selected.points_per_win_2_1;
      this.points_per_lost_0_2 = this.category_selected.points_per_lost_0_2;
      this.points_per_lost_1_2 = this.category_selected.points_per_lost_1_2;
      this.draw_created = resp.draw_created;
      this.tournament_data = resp.tournament;
      this.type_sport = this.tournament_data.sport_type;
      this.type_matchs = this.category_selected.match_type;
      this.total_jorneys_created = resp.total_journeys_created;
      
      if( this.type_matchs == 'singles'){
        this.match_tab_player = this.translations['leagues'].tabs.players;
      }else{
        this.match_tab_player = this.translations['leagues'].tabs.couples;
      }
      
      
      if(this.tournament_data){
        this.date_start_tournament = this.tournament_data.start_date;
        this.date_end_tournament = this.tournament_data.end_date;
      }
      this.isLoaded=true;
    });
  }

  addSchedule(){
    this.cleanMessage();
    if(this.date_schedule > this.date_end_tournament || this.date_schedule < this.date_start_tournament){
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
      tournament_id: this.tournament_id,
      couple_id: this.couple_selected_id,
      date: pipe.transform(this.date_schedule, 'yyyy-MM-dd'),
      start_time: this.opening_time,
      end_time: this.closing_time
    };

    this.tournamentSrv.saveScheduleCouple(item).subscribe( (resp:any) => {
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

  selectItem( item:any, index:any ){
    this.cleanMessage();
    this.schedule_selected = item;
    this.index_selected = index;
  }

  deleteSchedule(){
    this.cleanMessage();
    this.tournamentSrv.deleteScheduleCouple(this.schedule_selected.id).subscribe( (resp: any) => {
      if(resp.message == 200){
        this.schedule_selected = null;
        this.schedule_list.splice(this.index_selected, 1);
        this.success_message_schedule = this.translations['tournaments.tournaments_messages'].success_delete_schedule;
        this.closebutton_schedule.nativeElement.click();
      }else{
        this.success_message_schedule = this.translations['commun_translations'].data_delete_error;
      }
    })
  }


  cleanMessage(){
    this.error_message_couple = '';
    this.success_message_general_data = '';
    this.success_message_couple = '';
    this.error_message_couple = '';
    this.error_message_general_data = '';
    this.message_errors = [];
  }

  selectCouple(couple: any){
    if(this.tournament_data.draw_generated == 1){
      
      Swal.fire({
        title: this.translations["tournaments.tournaments_messages"].operation_not_permitted,
        text: this.translations["tournaments.tournaments_messages"].cannot_save_changes,
        icon: "question"
      });
      this.closebutton.nativeElement.click();
    }else{
      this.couple_selected = couple;
    }
  }

  removeCouple(){

    this.cleanMessage();

    if(this.tournament_data.draw_generated == 1){
      return;
    }
    this.categorySrv.removeCouple(this.couple_selected.id).subscribe((resp:any) => {
      if( resp.message == 200){
        let index = this.couples.findIndex((item:any) => item.id == this.couple_selected.id);
        if(index != -1){
          this.couples.splice(index, 1);
          this.closebutton.nativeElement.click();
          this.couple_selected = null;
          this.couples_total = this.couples_total - 1 ;
        }
      }else{
        console.log(resp)
      }
    })
  }

  openFormCouple(){
    this.cleanMessage();
    this.open_form_couple = true;
  }

  openFormPlayer(){
    this.cleanMessage();
    this.open_form_player = true;
  }

  closeFormCouple(){
    this.emptyArraysFoundPlayers()
    this.open_form_couple = false;
    this.open_form_player = false;
    this.couple_selected_id = '';
    this.player_1_mobile = '';
    this.player_1_name = '';
    this.player_1_surname = '';
    this.player_2_mobile = '';
    this.player_2_name = '';
    this.player_2_surname = '';
    this.substitute_mobile = '';
    this.substitute_name = '';
    this.substitute_surname = '';
    this.couple_name = '';
  }

  editCouple( couple_id: any, type: string){
    this.cleanMessage();
    this.couple_selected_id = couple_id;
    this.categorySrv.getCouple( couple_id ).subscribe( (resp:any) => {
      let couple = resp.couple.data[0];
      this.couple_name = couple.name;
      this.schedule_list = couple.schedule_not_play;
      this.categories = resp.categories;
      this.couple_category =  couple.category.id;
      if( couple.players.length >= 1 ){
        this.player_1_id = couple.players[0].id;
        //this.player_1_id_new = couple.players[0].id;
        this.player_1_mobile = couple.players[0].mobile;
        this.player_1_name = couple.players[0].name;
        this.player_1_surname = couple.players[0].surname;
        if( type == 'couple' && couple.players.length > 1){
          this.player_2_id = couple.players[1].id;
          //this.player_2_id_new = couple.players[1].id;
          this.player_2_mobile = couple.players[1].mobile;
          this.player_2_name = couple.players[1].name;
          this.player_2_surname = couple.players[1].surname;
        }
      }
      if( couple.substitute_player.length > 0 ){ // Exists substitute
        this.substitute_id = couple.substitute_player[0].id;
        //this.substitute_id_new = couple.substitute_player[0].id;
        this.substitute_mobile = couple.substitute_player[0].mobile;
        this.substitute_name = couple.substitute_player[0].name;
        this.substitute_surname = couple.substitute_player[0].surname;
      }
      if( type == 'couple'){
        this.open_form_couple = true;
      }else{
        this.open_form_player = true;
      }
    })

  }



  saveGeneralData(){
    
    this.cleanMessage();

    if(this.tournament_data.draw_generated == 1){  
      Swal.fire({
        title: this.translations["tournaments.tournaments_messages"].operation_not_permitted,
        text: this.translations["tournaments.tournaments_messages"].cannot_save_changes,
        icon: "question"
      });
      return;
    }

    if( this.name == '' ){
      this.error_message_general_data = 'El campo nombre es obligatorio';
      return;
    }

    if( this.type_sport == '2' ||  this.type_sport == '3'){
      if( this.match_type_id == '0' ){
        this.error_message_general_data = this.translations['tournaments.tournaments_messages'].error_14;
        return;
      }
    }

    if( this.couples.length > 0 && (this.match_type_id != this.category_selected.match_type) ){
        this.error_message_general_data = this.translations['tournaments.tournaments_messages'].error_15;
        return;
    }

    let chnage_type_player = false;
    if( this.type_sport == '2' ||  this.type_sport == '3' && (this.match_type_id != this.category_selected.match_type)){
      chnage_type_player = true;
    }
    
    if( !this.league_id && ( this.type == '1' || this.type == '2' || this.type == '6')){
      if( this.points_per_win_2_0 == 0 || !this.points_per_win_2_0 || this.points_per_win_2_1 == 0 || !this.points_per_win_2_1
          || !this.points_per_lost_0_2 || !this.points_per_lost_1_2)
        {
          this.error_message_general_data = this.translations['tournaments.tournaments_messages'].error_16;
          return;
        }
    }

    if( this.league_id && !this.type_category_id ){
        this.error_message_general_data = this.translations['tournaments.tournaments_messages'].error_17;
          return;
    }

    let formData = new FormData();
    formData.append('name', this.name);
    formData.append('description', this.description);
    formData.append('type', this.type);
    formData.append('match_type', this.match_type_id);
    if( this.league_id ){
      formData.append('league_id', this.league_id);
      formData.append('type', this.type_category_id);
    }

    if(!this.league_id && ( this.type == '1' || this.type == '2' || this.type == '6' )){
      formData.append('points_per_win_2_0', this.points_per_win_2_0.toString());
      formData.append('points_per_win_2_1', this.points_per_win_2_1.toString());
      formData.append('points_per_lost_0_2', this.points_per_lost_0_2.toString());
      formData.append('points_per_lost_1_2', this.points_per_lost_1_2.toString());
    }

    this.categorySrv.editCategory(this.category_id, formData).subscribe( (resp: any) => {
      if( resp.message == 200){
        this.success_message_general_data = this.translations['commun_translations'].data_save_correctly;
        if(chnage_type_player == true ){
          setTimeout(() => {
            document.location.reload();
          }, 1500);
        }
        
      }else if(resp.message == 422) {
        this.error_message_general_data = this.translations['commun_translations'].data_save_error ;
        this.message_errors = resp.errors_text
      } else {
        this.error_message_general_data = this.translations['commun_translations'].data_save_error + ' ' + this.translations['commun_translations'].consult_admin;
      }
    })
  }

  saveCouple(type: string){
    
    this.cleanMessage();

    if( type == 'player'){
       
        if( !this.player_1_mobile || !this.player_1_name || !this.player_1_surname ){
          this.error_message_couple = "El teléfono, nombre y apellido del jugador son obligatorios";
          return;
        }

        if (this.player_1_mobile && this.player_1_mobile.length > 50) {
              this.error_message_couple = "La longitud máxima teléfono no puede ser mayor a 50 caracteres";
              return;
        }

        if (this.player_1_name && this.player_1_name.length > 191) {
              this.error_message_couple = "La longitud máxima del nombre del jugador no puede ser mayor a 191 caracteres";
              return;
        }

        if (this.player_1_surname && this.player_1_surname.length > 191)  {
              this.error_message_couple = "La longitud máxima del apellido del jugador 1 no puede ser mayor a 191 caracteres";
              return;
        }
    } 

    if( type == 'couple'){
        if(this.couple_name && this.couple_name.length > 191){
          this.error_message_couple = "El nombre de la pareja no puede tener una longitud mayor a 191 caraceteres.";
          return;
        }
        

        if( !this.player_1_mobile || !this.player_1_name || !this.player_1_surname ){
          this.error_message_couple = "El teléfono, nombre y apellido del jugador 1 son obligatorios";
          return;
        }

       /* if( !this.player_2_mobile || !this.player_2_name || !this.player_2_surname ){
          this.error_message_couple = "El teléfono, nombre y apellido del jugador 2 son obligatorios";
          return;
        }
        */

        if( this.player_2_mobile != '' && (!this.player_2_name || !this.player_2_surname) || 
            this.player_2_name != '' && (!this.player_2_mobile || !this.player_2_surname) || 
            this.player_2_surname != '' && (!this.player_2_name || !this.player_2_mobile) ){
              this.error_message_couple = "El teléfono, nombre y apellido del jugador 2 son obligatorios";
              return;
        }

        if( (this.player_1_mobile && this.player_1_mobile.length > 50) || 
            (this.player_2_mobile && this.player_2_mobile.length > 50) || 
            (this.substitute_mobile && this.substitute_mobile.length > 50)) {
              this.error_message_couple = "La longitud máxima teléfono no puede ser mayor a 50 caracteres";
              return;
        }

        if( (this.player_1_name && this.player_1_name.length > 191) || 
            (this.player_2_name && this.player_2_name.length > 191) || 
            (this.substitute_name && this.substitute_name.length > 191) ) {
              this.error_message_couple = "La longitud máxima del nombre del jugador 1 no puede ser mayor a 191 caracteres";
              return;
        }

        if( (this.player_1_surname && this.player_1_surname.length > 191) || 
            (this.player_2_surname && this.player_2_surname.length > 191) || 
            (this.substitute_surname && this.substitute_surname.length > 191) ) {
              this.error_message_couple = "La longitud máxima del apellido del jugador 1 no puede ser mayor a 191 caracteres";
              return;
        }
    }



    let formData = new FormData();

    formData.append('type_save', type);

    if(this.player_1_id_new ){//&& this.mobile_player_selected == this.player_1_mobile ){
      formData.append('player_1_id', this.player_1_id_new);
    }

    if(this.player_2_id_new ){//&& this.mobile_player_selected == this.player_2_mobile){
      formData.append('player_2_id', this.player_2_id_new);
    }

    if(this.substitute_id_new ){//&& this.mobile_player_selected == this.player_1_mobile){
      formData.append('substitute_id', this.substitute_id_new);
    }

    formData.append('category_id', this.category_id);
    formData.append('player_1_mobile', this.player_1_mobile);
    formData.append('player_1_name', this.player_1_name);
    formData.append('player_1_surname', this.player_1_surname);

    if( type == 'couple'){
      if( this.player_2_mobile){
        formData.append('player_2_mobile', this.player_2_mobile);
      }
      if( this.player_2_name){
        formData.append('player_2_name', this.player_2_name);
      }
      if( this.player_2_surname){
        formData.append('player_2_surname', this.player_2_surname);
      }
    }


    if(this.substitute_mobile){
      formData.append('substitute_mobile', this.substitute_mobile);
    }
    if(this.substitute_name){
      formData.append('substitute_name', this.substitute_name);
    }
    if(this.substitute_surname){
      formData.append('substitute_surname', this.substitute_surname);
    }

    if(this.couple_name){
      formData.append('couple_name', this.couple_name);
    }

    this.data_search.mobile = '';
    this.data_search.name = '';
    this.data_search.surname = '';

    if( this.couple_selected_id == ''){
        this.categorySrv.addCouple(formData).subscribe( (resp: any) => {
          if( resp.message == 200){
            this.success_message_couple = this.translations['commun_translations'].data_save_correctly;
            this.couples = resp.couples.data;
            this.couples_total = this.couples.length + 1;
            this.closeFormCouple();
          }else if(resp.message == 422) {
            this.error_message_couple = this.translations['commun_translations'].data_save_error ;
            this.message_errors_couple = resp.errors_text;
          } else {
            this.error_message_couple = this.translations['commun_translations'].data_save_error + ' ' + this.translations['commun_translations'].consult_admin;
          }
        })
    }else{
      formData.append('player_1_id', this.player_1_id);
      formData.append('player_2_id', this.player_2_id);
      formData.append('player_1_id_new', this.player_1_id_new);
      formData.append('player_2_id_new', this.player_2_id_new);
      formData.append('couple_category_id', this.couple_category);
      if( this.substitute_id){
        formData.append('substitute_id', this.substitute_id);
        formData.append('substitute_id_new', this.substitute_id_new);
      }

      this.categorySrv.editCouple(this.couple_selected_id, formData).subscribe( (resp: any) => {
        if( resp.message == 200){
          this.success_message_couple = this.translations['commun_translations'].data_save_correctly;
          this.couples = resp.couples.data;
          this.closeFormCouple();
        }else if(resp.message == 422) {
          this.error_message_couple = this.translations['commun_translations'].data_save_error ;
          this.message_errors_couple = resp.errors_text;
        } else {
          this.error_message_couple = this.translations['commun_translations'].data_save_error + ' ' + this.translations['commun_translations'].consult_admin;
        }
      })
    }
    
  }

  tabSeleted(value: number){
    this.tab_selected = value;
  }


  findPlayerByMobile(mobile: string, position: string){
    this.data_search.mobile = mobile;
    switch (position) {
      case 'player_1':
          this.data_search.name = this.player_1_name;
          this.data_search.surname = this.player_1_surname;
          this.data_search.mobile = this.player_1_mobile;
        break;
        case 'player_2':
          this.data_search.name = this.player_2_name;
          this.data_search.surname = this.player_2_surname;
          this.data_search.mobile = this.player_2_mobile;
        break;
      case 'substitute':
          this.data_search.name = this.substitute_name;
          this.data_search.surname = this.substitute_surname;
          this.data_search.mobile = this.substitute_mobile;
      break;
      default:
        this.data_search.mobile = '';
        this.data_search.name = '';
        this.data_search.surname = '';
        break;
    }


    if( this.data_search.surname.length > 3 || this.data_search.name.length > 3 || this.data_search.mobile.length > 3){
      this.categorySrv.findPlayerByData(this.data_search).subscribe( (resp:any) => {
        switch (position) {
          case 'substitute':
              this.players_found_substitute = resp.players
            break;
          case 'player_1':
            this.found_player_1_by_mobile = resp.players
          break;
          case 'player_2':
            this.found_player_2_by_mobile = resp.players
          break;
        
          default:
            break;
        }
        
      })
    }
  }

  findPlayerByName(name: string, position: string){
    this.data_search.name = name;
    if( this.data_search.name.length > 3){
      this.categorySrv.findPlayerByData(this.data_search).subscribe( (resp:any) => {
        switch (position) {
          case 'substitute':
              this.players_found_substitute = resp.players
            break;
          case 'player_1':
            this.found_player_1_by_mobile = resp.players
          break;
          case 'player_2':
            this.found_player_2_by_mobile = resp.players
          break;
        
          default:
            break;
        }
        
      })
    }
  }

  findPlayerBySurname(surname: string, position: string){
    this.data_search.surname = surname;
    if( this.data_search.surname.length > 3 ){
      this.categorySrv.findPlayerByData(this.data_search).subscribe( (resp:any) => {
        switch (position) {
          case 'substitute':
              this.players_found_substitute = resp.players
            break;
          case 'player_1':
            this.found_player_1_by_mobile = resp.players
          break;
          case 'player_2':
            this.found_player_2_by_mobile = resp.players
          break;
        
          default:
            break;
        }
        
      })
    }
  }


  selectPlayer(player: any, player_position: any){
    this.data_search.name = '';
    this.data_search.surname = '';
    this.data_search.mobile = '';

    this.players_found_substitute = [];
    this.found_player_1_by_mobile = [];
    this.found_player_2_by_mobile = [];

    switch (player_position) {
      case 'substitute':
          this.mobile_player_selected = player.mobile;
          this.substitute_id_new = player.id;
          //this.substitute_id = player.id;
          this.substitute_mobile = player.mobile;
          this.substitute_name = player.name;
          this.substitute_surname = player.surname;
      break;
      case 'player_1':
        //this.player_1_id = player.id;
        this.mobile_player_selected = player.mobile;
        this.player_1_id_new = player.id;
        this.player_1_mobile = player.mobile;
        this.player_1_name = player.name;
        this.player_1_surname = player.surname;
    break;
    case 'player_2':
        this.mobile_player_selected = player.mobile;
        this.player_2_id_new = player.id;
        //this.player_2_id = player.id;
        this.player_2_mobile = player.mobile;
        this.player_2_name = player.name;
        this.player_2_surname = player.surname;
        
    break;
    
    
      default:
        break;
    }
  }

  
  emptyArraysFoundPlayers(){
    this.players_found_substitute = [];
    this.found_player_1_by_mobile = [];
    this.found_player_1_by_name = [];
    this.found_player_1_by_surname = [];
    this.found_player_2_by_mobile = [];
    this.found_player_2_by_name = [];
    this.found_player_2_by_surname = [];
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
