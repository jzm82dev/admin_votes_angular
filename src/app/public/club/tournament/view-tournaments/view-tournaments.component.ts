import { Component } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ClubDataService } from 'src/app/public/club-data/services/club-data.service';
import { routes } from 'src/app/shared/routes/routes';
import { createBracket } from 'bracketry';



let data = {
  rounds: [],
  matches: [],
  contestants: {}
};

const options = {
  matchMaxWidth: 300,
  roundTitleColor: "#2e37a4",
  rootBorderColor: "#cdcbcb",
  connectionLinesWidth: 2,
  connectionLinesColor: "#dcdcdc",
  matchTextColor: "#2e37a4",
  matchStatusBgColor: "#2e37a4",
  matchFontSize: 14,
  scrollButtonSvgColor: "#2e37a4",
  navButtonSvgColor: "#2e37a4",
  highlightedConnectionLinesColor: "#7698ff",
  highlightedPlayerTitleColor: "#0066ff",
//  verticalScrollMode: "buttons" as const,
//  scrollButtonsPosition: "overMatches" as const,
 // height: "700px",

  //rootBgColor: "#316581",
  getMatchTopHTML: (dataMatch:any) => {
    return `<div style="color: #424040; font-size: 13px; --rootFontFamily: Open Sans, Roboto, sans-serif;">
              <p style="margin: 0px 0 -10px;"><span >${dataMatch.time}</span> 
              <span >${dataMatch.court_name}<span></p>
            <div>`
  }

}


@Component({
  selector: 'app-view-tournaments',
  templateUrl: './view-tournaments.component.html',
  styleUrls: ['./view-tournaments.component.scss']
})
export class ViewTournamentsComponent {

  public routes = routes;
  public data_loaded : boolean = false;
  public name: string = '';
  public date_start: string = '';
  public date_end: string = '';
  public date_end_inscription: string = '';
  public price: number = 0;
  public price_member: number = 0;
  public fileAvatar: any;
  public image_preview: any = 'assets/img/img-06.jpg';
  public id_tournament: string = '';
  public tournament_selected: any;

  public name_category: string = '';
  public description_category: string = '';
  public categories_list: any = [];
  
  
  public translations:any = [];
  
  public tournament_hash: string = '';
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
  public type_sport: number = 0;
  public courts: any = [];
  public hasPadelCourts: boolean = false;
  public hasTennisCourts: boolean = false;
  public hasPickleballCourts: boolean = false;
  public hasSquashCourts: boolean = false;
  public hasBadmintonCourts: boolean = false;

  public club_name: string = '';
  public club_hash: string = '';
  public type_matchs = 'double';
  public pending_text:string = '';
  public finished_text: string = '';
  public matchs_finished: string = '0';
  public name_sport: string = '';

  public show_data: boolean = false;
  public show_couples: boolean = false;
  public show_draw: boolean = false;
  public show_ranking: boolean = false;
  public show_details: boolean = false;
  public show_matchs_journey: boolean = false;
  public show_matchday: boolean = false;

  public couple_list: any = [];
  public data: Data = {};
  public rounds:any = [];
  public isLoaded: boolean = false;
  public draw_generated: string = '0';
  public ranking_couples: any = [];
  public matches_league: any = [];
  public couple_selected_id: string = '';

  public category_clasification_a: any = [];
  public category_clasification_b: any = [];
  public total_journeys: number = 0;
  public open_registration: boolean = false;

  public user_email: string = '';
  public user_password: string = '';
  public error_message_popup: string = '';
  public susccess_message_popup: string = '';
  public message_errors: any = [];
  public error_cancel_reservsation_message: string = '';
  public error_message: string = '';
  public email: string = '';


  constructor(public clubDataSrv: ClubDataService,  public translate: TranslateService, public activateRoute: ActivatedRoute, public router : Router){}

  ngOnInit(): void {
    this.activateRoute.params.subscribe( (resp: any) => {
      this.tournament_hash = resp.hash;
      this.getTournamentSelected();
    });
    this.initializeLanguage();
  }


  initializeLanguage(){
    this.translate.use(this.clubDataSrv.authSrv.language);
    this.translate.setDefaultLang(this.clubDataSrv.authSrv.language);

    this.translate.get(['commun_translations', 'leagues', 'leagues.leagues_messages', 'club_translations', 'tournaments'])
      .subscribe((resp:any) => {
        this.translations = resp;
        this.pending_text = this.translations['leagues'].journeys.pending;
        this.finished_text = this.translations['leagues'].journeys.finished;
      });   
  }

  getTournamentSelected(){
    this.clubDataSrv.getTournament(this.tournament_hash).subscribe( (resp:any) => {
      this.tournament_selected = resp.tournament;
      this.matchs_finished = resp.match_finiched;
      this.name = this.tournament_selected.name;
      this.type_sport = this.tournament_selected.sport_type;
      this.date_start = this.tournament_selected.start_date;
      this.date_end = this.tournament_selected.end_date;
      this.date_end_inscription = this.tournament_selected.date_ends_registration;
      this.image_preview = this.tournament_selected.avatar;
      this.categories_list = this.tournament_selected.categories;
      this.price = this.tournament_selected.price;
      this.price_member = this.tournament_selected.price_member;
      this.type_matchs = this.tournament_selected.match_type;
      this.club_name = resp.club_name;
      this.club_hash = resp.club_hash;
      this.email = resp.club_email;
      this.draw_generated = resp.tournament.draw_generated;
      this.leageSport();
      this.open_registration = resp.tournament_open_registration;
      if( this.categories_list.length > 0){
        this.getCategoryData(this.categories_list[0].id);
      }
    });
  }

  cleanMessage(){
    this.error_message_popup = '';
    this.message_errors = [];
    this.error_cancel_reservsation_message = '';
  }

  closePopupRegister(){
    document.location.reload();
  }


  leageSport(){
    switch (this.type_sport) {
      case 1:
        this.name_sport = this.translations["club_translations"].sport_1
        break;
      case 2:
        this.name_sport = this.translations["club_translations"].sport_2
        break;
      case 3:
        this.name_sport = this.translations["club_translations"].sport_3
        break;
      case 4:
        this.name_sport = this.translations["club_translations"].sport_4
        break;
      case 5:
        this.name_sport = this.translations["club_translations"].sport_5
        break;
      default:
        this.name_sport = this.translations["club_translations"].sport_5
        break;
    }

  }
 


  getCategoryData(category_id: string){
    this.removeActiveClassLinks()
    this.show_data = true;
    this.show_couples = true;
    this.show_draw = false;
    this.show_ranking = false;
    this.show_matchs_journey = false;
    this.category_id = category_id;
    this.clubDataSrv.getDataCategoryTournament( category_id).subscribe((resp: any) =>{
      if(resp.message == 200){
        this.couple_list = resp.couples.data;
        this.category_selected = resp.category;
        this.data_loaded = true;
        if(this.category_selected.type == 1 || this.category_selected.type == 2 || this.category_selected.type == 6){
          this.ranking_couples = resp.ranking;
          this.total_journeys = resp.total_journeys;
          this.matches_league = [];
          
          this.separateByGroups();
          
          for (let index = 0; index <= this.total_journeys; index++) {
            this.matches_league[index] =  resp.matches.filter((item:any) => item.journey == index);
          }
          this.firstOrSecondLeg();
          this.getWeekDay2();
        }
        
        this.showCouples();
        //this.journeysList = resp.journeys;
        //this.ranking_couples = resp.ranking;
        //this.changeCategory();
      }
    })
      
  }

  registerUserTournament(){

    if( this.user_email == '' || this.user_password == '' ){
      this.error_message_popup = this.translations['reservations'].error_5;
      return;
    }


    if( this.user_email && this.user_email.length > 191){
      this.error_message_popup = this.translations['reservations'].error_2;
      return;
    }

    if( this.user_password && this.user_password.length > 50){
      this.error_message_popup = this.translations['reservations'].error_2;;
      return;
    }


    let formData = new FormData();
    formData.append('hash_tournament', this.tournament_hash);
    formData.append('category_selected_id', this.category_selected.id);
    formData.append('email', this.user_email);
    formData.append('password', this.user_password);
    if( this.couple_selected_id != ''){
      formData.append('couple_selected_id', this.couple_selected_id);
    }
    
    this.clubDataSrv.registerPlayerTournament( formData ).subscribe( (resp:any) => {

      if( resp.message == 200){
        this.user_email = '';
        this.user_password = '';
        this.couple_selected_id = '';
        this.susccess_message_popup = this.translations['commun_translations'].data_save_correctly;
        this.error_message = this.translations['reservations'].error_4;
      }else if(resp.message == 422) {
        this.error_message_popup = this.translations['commun_translations'].data_save_error;
        this.message_errors = resp.errors_text
      } else {
        this.error_message = this.translations['commun_translations'].data_save_error + ' ' + this.translations['commun_translations'].consult_admin;
      }
    }) 
  }

  separateByGroups(){
    if(this.category_selected.type == '2'){
      this.category_clasification_a =  this.ranking_couples.filter((item:any) => item.league_number == 1);
      this.category_clasification_b =  this.ranking_couples.filter((item:any) => item.league_number == 2);
    }
  }

  firstOrSecondLeg(){
    if(this.matches_league.length > 0 && this.category_selected.type == '6'){
      let second_leg_matchday = Math.floor(this.matches_league.length / 2);
      this.matches_league[second_leg_matchday].show_second_leg = true;
      this.matches_league[0].show_first_leg = true;
    }
  }

  showCouples(){
    this.showLinkDraws('');
    this.show_ranking = false;
    this.show_matchday = false;
    var link_couples = document.getElementById('link_couples');
    if(link_couples != null){
      link_couples.classList.add('active');
    }
    this.show_couples = true;
  }

  showJourneys(){
    this.show_couples = false;
    this.show_ranking = false;
    this.showLinkDraws('');
    this.show_matchday = true;
  }


  removeActiveClassLinks(){

    console.log('eliminamos activas');
    
    var link_main_draw = document.getElementById('link_main_draw');
    var link_back_draw = document.getElementById('link_back_draw');
    var link_couples = document.getElementById('link_couples');
    var draw_category = document.getElementById('draw_category');
    var link_ranking = document.getElementById('link_ranking');
    var link_journeys = document.getElementById('link_journeys');
    var link_playoffs = document.getElementById('link_playoffs');

    if(link_main_draw != null){
      link_main_draw.classList.remove('active');
    }

    if(link_back_draw != null){
      link_back_draw.classList.remove('active');
    }

    if(link_couples != null){
      link_couples.classList.remove('active');
    }

    if(draw_category != null){
      draw_category.classList.remove('active');
    }

    if(link_ranking != null){
      link_ranking.classList.remove('active');
    }

    if(link_journeys != null){
      link_journeys.classList.remove('active');
    }

    if(link_playoffs != null){
      link_playoffs.classList.remove('active');
    }

   
  }

  showLinkDraws(  type: string ){

    var link_main_draw = document.getElementById('link_main_draw');
    var link_back_draw = document.getElementById('link_back_draw');
    var link_couples = document.getElementById('link_couples');
    var draw_category = document.getElementById('draw_category');

    if(link_couples != null){
      link_couples.classList.remove('active');
    }
    if(type == 'main'){
      if(link_main_draw != null){
        link_main_draw.classList.add('active');
      }
      if(link_back_draw != null){
        link_back_draw.classList.remove('active');
      }
      if(draw_category != null){
        draw_category.classList.add('display-inline');
      }
    }else if(type == 'back_draw'){
      if(link_main_draw != null){
        link_main_draw.classList.remove('active');
      }
      if(link_back_draw != null){
        link_back_draw.classList.add('active');
      }
      if(draw_category != null){
        draw_category.classList.add('display-inline');
      }
    }else{
      if(link_main_draw != null){
        link_main_draw.classList.remove('active');
      }
      if(link_back_draw != null){
        link_back_draw.classList.remove('active');
      }
      if(draw_category != null){
        draw_category.classList.remove('display-inline');
      }
      if(draw_category != null){
        draw_category.classList.add('display-none');
      }
    }
  }


  showDraw( type: string = 'main'){
  
    
    this.showLinkDraws(type);

    let formData = new FormData();
    formData.append('id', this.category_id);
    formData.append('type', type);
    
      this.rounds = [];
      this.clubDataSrv.getDraw(formData).subscribe((resp:any) => {
        this.data = resp;
        for(let i = resp.max_round; i>= 0; i--){
          this.rounds.push({
            'name': this.translations['tournaments'].rounds[i]
          });
        }
        data.rounds = this.rounds;
        data.contestants = resp.contestants;
        data.matches = resp.matches;
        this.getWeekDay();
        
        /*if(data.matches.length > 0){
          this.draw_generated = true;
        }*/
        this.isLoaded = true;
        const portalDiv = document.querySelector('#torneo')
        if (!portalDiv) {
            throw new Error("The element #portal wasn't found");
        }

       
        if( this.draw_generated == '1'){
          createBracket(data,  portalDiv, options);
        }
      })
      this.show_draw = true;
      this.show_couples = false;
  }

  showRanking(){
    this.show_ranking = true;
    this.show_couples = false;
    this.show_draw = false;
    this.show_matchday = false;
  }

  getWeekDay(){
    let week_days:any = [];
    week_days.push(this.translations['commun_translations'].day_1);
    week_days.push(this.translations['commun_translations'].day_2); 
    week_days.push(this.translations['commun_translations'].day_3);
    week_days.push(this.translations['commun_translations'].day_4);
    week_days.push(this.translations['commun_translations'].day_5);
    week_days.push(this.translations['commun_translations'].day_6);
    week_days.push(this.translations['commun_translations'].day_7);
    
    data.matches.forEach( (match: any) => {
      const splitVal = match.time.split(' ');
      let day_hour = '';
      if( match.time.length > 0 ){
        day_hour = `${week_days[splitVal[0] - 1]} ${splitVal[1]} `
      }
      match.time = day_hour;
      match.court_name = match.court != null ? this.translations['tournaments'].court + ' ' + match.court : ''; 
    });
  }

  getWeekDay2(){
    let week_days:any = [];
    week_days.push(this.translations['commun_translations'].day_1);
    week_days.push(this.translations['commun_translations'].day_2); 
    week_days.push(this.translations['commun_translations'].day_3);
    week_days.push(this.translations['commun_translations'].day_4);
    week_days.push(this.translations['commun_translations'].day_5);
    week_days.push(this.translations['commun_translations'].day_6);
    week_days.push(this.translations['commun_translations'].day_7);

    for (let index = 0; index < this.matches_league.length; index++) {
      this.matches_league[index].forEach( (match: any) => {
        if(match.time.length > 0 ){
          const splitVal = match.time.split(' ');
          let day_hour = `${week_days[splitVal[0] - 1]} ${splitVal[1]} `
          match.time = day_hour;
        }else{
          match.time = '--- -- - ';
        }
      });
    }

  
  }

  openFormCouple( couple_id: string = ''){
    this.couple_selected_id = couple_id;
  }

  goSignUp(){
    
    localStorage.setItem("reloadPage", "yes");
    this.router.navigate([routes.registerPlayer])

  }
    
    
}
