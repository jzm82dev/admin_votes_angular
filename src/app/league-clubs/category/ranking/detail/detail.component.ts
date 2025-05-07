import { Component } from '@angular/core';
import { routes } from 'src/app/shared/routes/routes';
import { JourneyService } from '../../journey/service/journey.service';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../../service/category.service';
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
import { TranslateService } from '@ngx-translate/core';

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
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent {

  public routes = routes;
  public category_id: string = '';
  public couple_id: string = '';
  public couple: any;
  public couple_name: string = '';
  public players: any = [];
  public substitute_players: any = [];
  public isLoaded: boolean = false;
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

  public matches_result: any = [];

  public results: any;
  public translations:any = [];
  public type_league: string = 'double';
  public match_tab_player: string = 'Players';

  public chartOptionsMatch: Partial<ChartOptions>;
  public chartOptionsSet: Partial<ChartOptions>;
  public chartOptionsGame: Partial<ChartOptions>;

  constructor(public journeySrv: JourneyService, public activateRoute: ActivatedRoute, public categorySrv: CategoryService, public translate: TranslateService){
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
    
    this.initializeLanguage();
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.activateRoute.params.subscribe( (resp:any) => {
      this.category_id = resp.id;
      this.couple_id = resp.couple_id;
      this.getData();
      this.getCoupleDetail();
      setTimeout(() => {
        this.fillGraphics();
      }, 1000);
      
    });

  }

  initializeLanguage(){
    this.translate.use(this.journeySrv.authSrv.language);
    this.translate.setDefaultLang(this.journeySrv.authSrv.language);

    this.translate.get(['commun_translations', 'leagues'])
      .subscribe((resp:any) => {
        this.translations = resp;
      }); 

  }

  getCoupleDetail(){
    this.categorySrv.getCouple(this.couple_id).subscribe((resp:any) => {
      this.couple = resp.couple.data[0];
      this.couple_name = this.couple.name;
      this.players = this.couple.players;
      this.substitute_players = this.couple.substitute_player;
      this.isLoaded = true;
      //this. player_1 = this.couple.players[0].name + ' ' + this.couple.players[0].surname;
    })
  }

  getData(){

    //let test = this.categorySrv.getCoupleResults2(this.category_id);
    //console.log('test',test.get('match'));


    this.categorySrv.getCoupleResults(this.couple_id).subscribe((resp:any) => {
     
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
