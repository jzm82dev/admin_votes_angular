import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { routes } from 'src/app/shared/routes/routes';
import { ResultService } from '../service/result.service';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid,
  ApexFill,
  ApexMarkers,
  ApexYAxis,
  ApexResponsive,
  ApexPlotOptions,
  ApexLegend,
  ApexTooltip,
} from 'ng-apexcharts';

export type ChartOptions = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  series: ApexAxisChartSeries | any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  chart: ApexChart | any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  xaxis: ApexXAxis | any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dataLabels: ApexDataLabels | any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  grid: ApexGrid | any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fill: ApexFill | any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  markers: ApexMarkers | any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  yaxis: ApexYAxis | any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  stroke: ApexStroke | any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  title: ApexTitleSubtitle | any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  labels: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  responsive: ApexResponsive[] | any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  plotOptions: ApexPlotOptions | any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tooltip: ApexTooltip | any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  legend: ApexLegend | any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
};

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent {
  
  @ViewChild('chart') chart!: ChartComponent;

  public routes = routes;
  public category_id: string = '';
  public category_selected: any;
  public ranking_teams: any = [];
  public ranking_players: any = [];
  public graphic_teams: any = [];
  public journeys: any = [];
  public teams: any = [];
  public journey_points: any = [];
  public colors = ['#2E37A4', '#ff4d4d', '#d5ffff', '#ffff00'];
  public last_updated: string = '';
  public visualisations: string = '';

  public chartOptionsOne: Partial<ChartOptions>;

  public color_table = ['table-primary', 'table-secondary', 'table-info'];


  constructor( public activateRoute: ActivatedRoute, public resultSrv: ResultService){
    this.chartOptionsOne = {
      chart: {
        height: 200,
        type: 'line',
        toolbar: {
          show: false,
        },
      },
      grid: {
        show: true, 
        xaxis: {
          lines: {
            show: false
           }
         },  
        yaxis: {
          lines: { 
            show: true 
           }
         },   
        },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
      },
      series: [
        {
          name: 'Income',
          color: '#2E37A4',
          data: [],
        },
      ],
      xaxis: {
        categories: ['', 'Jornada 1', 'Jornada 2', 'Jornada 3', 'Jornada 4', 'Jornada 5', 'Jornada 6', 'Jornada 7', 'Jornada 8', 'Jornada 9', 'Jornada 10', 'Jornada 11', 'Jornada 12'],
      },
    };
  }

  ngOnInit(): void {
    this.activateRoute.params.subscribe((resp:any) => {
      this.category_id = resp.id;
      this.getDetailsCategorySelected();
      this.getMoreDetailsCategorySelected();
    } );

    
  }

  getDetailsCategorySelected(){
    this.resultSrv.getCategoryDetails(this.category_id).subscribe((resp:any) => {
      this.teams = resp.teams;
      this.category_selected = resp.result;
      this.ranking_teams = resp.ranking_teams.sort((a:any,b:any) => b.total_points - a.total_points );
      this.ranking_teams.forEach((element:any) => {
        element.total_matchs = parseInt(element.match_won) + parseInt(element.match_lost);
      });
      this.journeys = resp.journeys;
      this.ranking_players = resp.ranking_players;
      this.graphic_teams = resp.graphic_teams;
      this.fillEarningGraphic();
      console.log(this.graphic_teams);
    })
  }


  getMoreDetailsCategorySelected(){
    this.resultSrv.getMoreDetails(this.category_id).subscribe( (resp: any) =>{
      this.last_updated = resp.last_update;
      this.visualisations = resp.visualisations;
    })
  }


  fillEarningGraphic(){

    this.teams.forEach( (team: any) => {
      let points = this.graphic_teams.filter((element:any) => element.team_id == team.id);
      let points_array: any = [];
      let previus_value:number = 0;
      points_array.push(0);
      points.forEach( (point:any) => {
        previus_value += parseInt(point.points);
        points_array.push(previus_value)
      });
      let element = {
        points: points_array,
        team_id: team.id,
        team_name: team.name
      }
      this.journey_points.push(element);
    });
    
    let series: any = [];
    let cont = 0;
    this.journey_points.forEach( (team: any) => {
      let serie = {
        name: team.team_name,
        color: this.colors[cont],
        data: team.points
      }
      series.push(serie);
      cont ++;
    });

    
    let default_serie = [{
      name: 'Income',
      color: '#2E37A4',
      data: [45, 60, 75, 51, 42, 42, 30],
    }];

    this.chartOptionsOne.series = series;
  }

}
