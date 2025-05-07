import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ClubDataService } from 'src/app/public/club-data/services/club-data.service';
import { routes } from 'src/app/shared/routes/routes';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexResponsive,
  ApexXAxis,
  ApexLegend,
  ApexFill,
  ApexGrid,
  ApexStroke,
  ApexMarkers,
  ApexTitleSubtitle,
  ApexYAxis,
  
} from 'ng-apexcharts';


export type ChartOptions = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  yaxis: ApexYAxis | any;
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   markers: ApexMarkers | any;
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
  title: ApexTitleSubtitle | any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  series: ApexAxisChartSeries | any;
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
  chart: ApexChart | any;
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dataLabels: ApexDataLabels | any;
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
  plotOptions: ApexPlotOptions | any;
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
  responsive: ApexResponsive[] | any;
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
  xaxis: ApexXAxis | any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  legend: ApexLegend | any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fill: ApexFill | any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  colors: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  grid: ApexGrid | any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  stroke: ApexStroke | any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  labels: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  
};


@Component({
  selector: 'app-view-league',
  templateUrl: './view-league.component.html',
  styleUrls: ['./view-league.component.scss']
})
export class ViewLeagueComponent {

  public routes = routes;
  public league_id: string = '';
  public name: string = '';
  public date_start: string = '';
  public fileAvatar: any;
  public image_preview: any = 'assets/img/img-06.jpg';
  public id_league: number = 0;
  public league_selected: any;
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

  public points_per_win_2_0: number = 0;
  public points_per_win_2_1: number = 0;
  public points_per_lost_0_2: number = 0;
  public points_per_lost_1_2: number = 0;
  public translations:any = [];

  public courts: any = [];
  public hasPadelCourts: boolean = false;
  public hasTennisCourts: boolean = false;
  public hasPickleballCourts: boolean = false;
  public hasSquashCourts: boolean = false;
  public hasBadmintonCourts: boolean = false;
  public kind_sport: any = [];
  public type_sport: number = 0;
  public name_sport: string = '';
  public price: number = 0;
  public match_types: any = [];
  public type_matchs = 'double';
  public matchs_finished: number = 0;
  public club_name: string = '';
  public club_hash: string = '';
  public email: string = '';
  public show_data: boolean = false;
  public show_couples: boolean = false;
  public show_journey: boolean = false;
  public show_ranking: boolean = false;
  public show_details: boolean = false;
  public show_matchs_journey: boolean = false;
  public couple_list: any = [];
  public journeysList: any = [];
  public ranking_couples: any = [];
  public category_id: string = '';
  public pending_text:string = '';
  public finished_text:string = '';
  public couple_details_id: string = '';

  // Details
  public matches_result: any = [];
  public results: any;
  public type_league: string = 'double';
  public match_tab_player: string = 'Players';
  public total_points: number = 0;
  public matches_played: number = 0;
  public matches_won: number = 0;
  public matches_lost: number = 0;
  public sets_played: number = 0;
  public sets_won: number = 0;
  public sets_lost: number = 0;
  public games_played: number = 0;
  public games_won: number = 0;
  public games_lost: number = 0;
  public matches: any = [];
  public sets: any = [];
  public games: any = [];
  public couple: any;
  public couple_name: string = '';
  public players: any = [];
  public substitute_players: any = [];
  public isLoadedDetails: boolean = false;
  public chartOptionsMatch: Partial<ChartOptions>;
  public chartOptionsSet: Partial<ChartOptions>;
  public chartOptionsGame: Partial<ChartOptions>;
  // Matchs
  public match_list:any = [];


  constructor(public clubDataSrv: ClubDataService,  public translate: TranslateService,
    public activateRoute: ActivatedRoute){ 

      this.chartOptionsMatch = {
        series: [],
        labels: [],
        colors:[],
        chart: {
          type: 'donut',
          height: 200,
          width: 200,
          toolbar: {
            show: false,
          },
        },
        legend: {
          show: false
        },
        plotOptions: {
          bar: {
              horizontal: false,
              columnWidth: '50%'
          },
      },
        dataLabels: {
          enabled: false,
        },
        responsive: [{
          breakpoint: 480,
          options: {
              chart: {
                  width: 200
              },
              legend: {
                show: false
              }
          }
      }],
      };
  
      this.chartOptionsSet = {
        series: [],
        labels: [],
        colors:[],
        chart: {
          type: 'donut',
          height: 200,
          width: 200,
          toolbar: {
            show: false,
          },
        },
        legend: {
          show: false
        },
        plotOptions: {
          bar: {
              horizontal: false,
              columnWidth: '50%'
          },
      },
        dataLabels: {
          enabled: false,
        },
        responsive: [{
          breakpoint: 480,
          options: {
              chart: {
                  width: 200
              },
              legend: {
                show: false
              }
          }
      }],
      };
  
      this.chartOptionsGame = {
        series: [],
        labels: [],
        colors:[],
        chart: {
          type: 'donut',
          height: 200,
          width: 200,
          toolbar: {
            show: false,
          },
        },
        legend: {
          show: false
        },
        plotOptions: {
          bar: {
              horizontal: false,
              columnWidth: '50%'
          },
      },
        dataLabels: {
          enabled: false,
        },
        responsive: [{
          breakpoint: 480,
          options: {
              chart: {
                  width: 200
              },
              legend: {
                show: false
              }
          }
      }],
      };

    }
  
  ngOnInit(): void {
    this.activateRoute.params.subscribe( (resp: any) => {
      this.league_id = resp.id;
      this.getLeagueSelected();
    });
    this.initializeLanguage();
  }


  
  initializeLanguage(){
    this.translate.use(this.clubDataSrv.authSrv.language);
    this.translate.setDefaultLang(this.clubDataSrv.authSrv.language);

    this.translate.get(['commun_translations', 'leagues', 'leagues.leagues_messages', 'club_translations'])
      .subscribe((resp:any) => {
        this.translations = resp;
        this.pending_text = this.translations['leagues'].journeys.pending;
        this.finished_text = this.translations['leagues'].journeys.finished;
      });   
  }

  getLeagueSelected(){
    this.clubDataSrv.getLeague(this.league_id).subscribe( (resp:any) => {
      this.league_selected = resp.league;
      this.matchs_finished = resp.match_finiched;
      this.name = this.league_selected.name;
      this.type_sport = this.league_selected.sport_type;
      this.date_start = this.league_selected.start_date;
      this.image_preview = this.league_selected.avatar;
      this.categories_list = this.league_selected.categories;
      this.points_per_win_2_0 = this.league_selected.points_per_win_2_0;
      this.points_per_win_2_1 = this.league_selected.points_per_win_2_1;
      this.points_per_lost_0_2 = this.league_selected.points_per_lost_0_2;
      this.points_per_lost_1_2 = this.league_selected.points_per_lost_1_2;
      this.price = this.league_selected.price;
      this.type_matchs = this.league_selected.match_type;
      this.club_name = resp.club_name;
      this.club_hash = resp.club_hash;
      this.email = resp.club_email;
      this.leageSport();
      if( this.categories_list.length > 0){
        this.getCategoryData(this.categories_list[0].id);
      }
    });
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

  showCouples(){
    this.show_couples = true;
    this.show_journey = false;
    this.show_ranking = false;
    this.show_details = false;
    this.show_matchs_journey = false;
  }

  showJourneys(){
    this.show_couples = false;
    this.show_journey = true;
    this.show_ranking = false;
    this.show_details = false;
    this.show_matchs_journey = false;
  }
  
  showRanking(){
    this.show_couples = false;
    this.show_journey = false;
    this.show_ranking = true;
    this.show_details = false;
    this.show_matchs_journey = false;
  }

  getCategoryData(category_id: string){
    this.category_id = category_id;
    this.show_data = true;
    this.show_couples = true;
    this.show_journey = false;
    this.show_ranking = false;
    this.show_matchs_journey = false;
    this.clubDataSrv.getDataCategoryLeague( category_id).subscribe((resp: any) =>{
      if(resp.message == 200){
        this.couple_list = resp.couples.data;
        this.journeysList = resp.journeys;
        this.ranking_couples = resp.ranking;
        this.changeCategory();
      }
    })
  }

  changeCategory(){
    this.show_couples = true;
    this.show_journey = false;
    this.show_ranking = false;
    this.show_details = false;
    this.show_matchs_journey = false;
    var link_couples = document.getElementById('link_couples');
    var link_jorney = document.getElementById('link_journeys');
    var link_ranking = document.getElementById('link_ranking');
    if(link_couples != null){
      link_couples.classList.add('active');
    }
    if(link_jorney != null){
      link_jorney.classList.remove('active');
    }
    if(link_ranking != null){
      link_ranking.classList.remove('active');
    }
  }

  showJorneyResults(journey_id: string){
    this.show_data = true;
    this.show_couples = false;
    this.show_journey = false;
    this.show_ranking = false;
    this.show_matchs_journey = true;
    this.clubDataSrv.getMatchsJourney( journey_id).subscribe((resp:any) => {
      if(resp.message == 200){
        this.match_list = resp.matchs;
        this.type_matchs = resp.type_matchs;
        if( this.type_matchs == 'singles'){
          this.match_tab_player = this.translations['leagues'].tabs.players;
        }else{
          this.match_tab_player = this.translations['leagues'].tabs.couples;
        }
        this.formatResults();
      }
    })
    var link = document.getElementById('link_journeys');
    if(link != null){
      link.classList.remove('active');
    }
  }

  formatResults(){
    let arrayRestul;

    this.match_list.forEach((match:any) => {
      if( match.result_set_1 != null && match.result_set_1.length == 3){
        arrayRestul = match.result_set_1.split('-');
        match.result_set_1_local = arrayRestul[0];
        match.result_set_1_visiting = arrayRestul[1];
        match.result_set_1 = null;
      }
      if( match.result_set_2 != null && match.result_set_2.length == 3){
        arrayRestul = match.result_set_2.split('-');
        match.result_set_2_local = arrayRestul[0];
        match.result_set_2_visiting = arrayRestul[1];
        match.result_set_2 = null;
      }
      if( match.result_set_3 != null && match.result_set_3.length == 3){
        arrayRestul = match.result_set_3.split('-');
        match.result_set_3_local = arrayRestul[0];
        match.result_set_3_visiting = arrayRestul[1];
        match.result_set_3 = null;
      }
    });
    
  }


  showDetails( couple_id:string ){
    var link = document.getElementById('link_ranking');
    if(link != null){
      link.classList.remove('active');
    }
    this.show_couples = false;
    this.show_journey = false;
    this.show_ranking = false;
    this.show_details = true;
    this.couple_details_id = couple_id;
    this.getCoupleData();
    this.getCoupleDetail();
    setTimeout(() => {
      this.fillGraphics();
    }, 1000);
  }


  getCoupleData(){


    this.clubDataSrv.getCoupleResults(this.couple_details_id).subscribe((resp:any) => {

     this.matches = [];
     this.sets = [];
     this.games = [];

     if(resp.message == 200){
      
      if(resp.matches){
        this.matches_result = resp.matches;
      }
      
      if( resp.results){
        this.results = resp.results;
        this.type_league = resp.type_league;
        if( this.type_league == 'singles'){
          this.match_tab_player = this.translations['leagues'].tabs.players;
        }else{
          this.match_tab_player = this.translations['leagues'].tabs.couples;
        }
        
        this.total_points = this.results.total_points;

        this.matches_played = this.results.matches_played;
        this.matches_lost = this.results.matchs_lost;
        this.matches_won = this.results.matchs_won;
        this.matches.push(this.matches_won);
        this.matches.push(this.matches_lost);

        this.sets_lost = this.results.sets_lost;
        this.sets_won = this.results.sets_won;
        this.sets_played = this.sets_lost + this.sets_won;
        this.sets.push(this.sets_won);
        this.sets.push(this.sets_lost);

        this.games_lost = this.results.games_lost;
        this.games_won = this.results.games_won;
        this.games_played = this.games_lost + this.games_won;
        this.games.push(this.games_won);
        this.games.push(this.games_lost);
      }
      
     }

    });
  }
    

  getCoupleDetail(){
    this.clubDataSrv.getCouple(this.couple_details_id).subscribe((resp:any) => {
      this.couple = resp.couple.data[0];
      this.couple_name = this.couple.name;
      this.players = this.couple.players;
      this.substitute_players = this.couple.substitute_player;
      this.isLoadedDetails = true;
    })
  }

  fillGraphics(){
    this.chartOptionsMatch.series = this.matches;
    this.chartOptionsMatch.labels = [this.translations['leagues'].details.won, this.translations['leagues'].details.lost];
    this.chartOptionsMatch.colors = ['#2a935a', '#ef1602'];

    this.chartOptionsSet.series = this.sets;
    this.chartOptionsSet.labels = [this.translations['leagues'].details.won, this.translations['leagues'].details.lost];
    this.chartOptionsSet.colors = ['#2a935a', '#ef1602'];

    this.chartOptionsGame.series = this.games;
    this.chartOptionsGame.labels = [this.translations['leagues'].details.won, this.translations['leagues'].details.lost];
    this.chartOptionsGame.colors = ['#2a935a', '#ef1602'];
    
  }

}
