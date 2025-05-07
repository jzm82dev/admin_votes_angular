import { Component, ViewChild } from '@angular/core';
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
import { Sort } from '@angular/material/sort';
import { DataService } from 'src/app/shared/data/data.service';
import { recentPatients, upcomingAppointments } from 'src/app/shared/models/models';
import { DashboardService } from '../service/dashboard.service';
import { AuthService } from 'src/app/shared/auth/auth.service';
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
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
})
export class AdminDashboardComponent {
  public routes = routes;
  public selectedValue ! : string  ;
  @ViewChild('chart') chart!: ChartComponent;
  public chartOptionsOne: Partial<ChartOptions> = [];
  public chartOptionsTwo: Partial<ChartOptions>;
  public chartOptionsThree: Partial<ChartOptions>;

  public recentPatients: Array<recentPatients> = [];
  //public upcomingAppointments: Array<upcomingAppointments> = [];



  // New
  public user_name: string = '';
  public user_surname: string = '';
  public total_appoinment_month: number = 0;
  public percent_appointment: number = 0;
  public total_patients: number = 0;
  public percent_patients: number = 0;
  public total_attentions: number = 0;
  public percent_attention: number = 0;
  public total_earning: number = 0;
  public percent_earning: number = 0;
  public upcomingAppointments: any = [];
  public current_year: number = new Date().getFullYear();
  public years: number[] = [];
  public men_number: number[] = [];
  public women_number: number[] = [];
  public top_specialities: any = [];
  public user: any;
  public translations:any = [];
  

  ngOnInit(): void {
    
    this.initializeLanguage();
    this.user = this.dashboardSrv.authSrv.user;
    if(this.user.role.includes('Super-Admin') || this.user.permissions.includes('admin_dashboard')){
       
      let data = {
        'year' : this.current_year
      }; 
  
      this.user_name = this.authSrv.user.name;
      this.user_surname = this.authSrv.user.surname;
  
      this.dashboardSrv.getDataAdmin().subscribe( (resp:any) => {
        this.total_appoinment_month = resp.total_appopientments_current_month;
        this.percent_appointment = resp.percent_appointments;
        this.total_patients = resp.total_patients_current_month;
        this.percent_patients = resp.percent_patients;
        this.total_attentions = resp.total_attentions_current_month;
        this.percent_attention = resp.percent_attentions;
        this.total_earning = resp.total_earning_current_month;
        this.percent_earning = resp.percent_earning;
        this.upcomingAppointments = resp.upcoming_appointments;
      });
      for (let index = 0; index <5; index++) {
        this.years.push(this.current_year - index)
      }
      
      
      this.dashboardSrv.getDataAdminYear(data).subscribe( (resp:any) => {
        console.log(resp);
        this.fillGenderGraphic(resp.patient_by_gender);
        this.fillSpecialitiesGraphic(resp.patient_by_speciality);
        this.fillEarningGraphic(resp.total_earnng_by_mont);
        this.top_specialities = resp.patient_percent_by_speciality;
      });
    }

  }


  initializeLanguage(){
    
    this.translate.use(this.dashboardSrv.authSrv.language);
    this.translate.setDefaultLang(this.dashboardSrv.authSrv.language);

    this.translate.get(['commun_translations'])
      .subscribe((resp:any) => {
        this.translations = resp;
      }); 
  }



  changeYear( year:any){
    let data = {
      'year' : year
    };

    this.dashboardSrv.getDataAdminYear(data).subscribe( (resp:any) => {
      this.fillGenderGraphic(resp.patient_by_gender);
      this.fillSpecialitiesGraphic(resp.patient_by_speciality);
      this.fillEarningGraphic(resp.total_earnng_by_mont);
    });
  } 


  fillGenderGraphic(gender: any){
    this.men_number = [];
    this.women_number = [];
    gender.forEach( (element:any) => {
      this.men_number.push(element.man);
      this.women_number.push(element.woman);     
    });
    let series = [
      {
        name: 'Male',
        color: '#2E37A4',
        data: this.men_number,
      },
      {
      name: 'Female',
      color: '#00D3C7',
      data: this.women_number,
      }
    ];
    this.chartOptionsOne.series = series;
  }

  fillSpecialitiesGraphic(patientSpecialitie: any){
    let totalPatient: number[] = [];
    let specialities: string[] = [];
    patientSpecialitie.forEach( (element:any) => {
      totalPatient.push(element.count);
      specialities.push(element.name);
    });
    this.chartOptionsTwo.series = totalPatient;
    this.chartOptionsTwo.labels = specialities;
  }

  fillEarningGraphic( earningByMonth: any){
    let earning: number[] = [];
    earningByMonth.forEach((element:any) => {
      earning.push( element.total)
    });
    let serie = [{
      name: 'Income',
      color: '#2E37A4',
      data: earning, //[45, 60, 75, 51, 42, 42, 30],
    }];
    this.chartOptionsThree.series = serie;
  }


  constructor(public data : DataService, public dashboardSrv: DashboardService, public authSrv: AuthService,
              public translate: TranslateService) {

    this.chartOptionsOne = {
      chart: {
        height: 230,
        type: 'bar',
        stacked: true,
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
      responsive: [
        {
          breakpoint: 480,
          options: {
            legend: {
              position: 'bottom',
              offsetX: -10,
              offsetY: 0,
            },
          },
        },
      ],
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '15%',
        },
      },
      dataLabels: {
        enabled: false,
      },
      series: [
        {
          name: 'Male',
          color: '#2E37A4',
          data: [],
        },
        {
          name: 'Female',
          color: '#00D3C7',
          data: [],
        },
      ],
      xaxis: {
        categories: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ],
          axisBorder: {
            show: false, // set to false to hide the vertical gridlines
          },
        },
    };
    this.chartOptionsTwo = {
      series: [],
      labels: [],
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
    this.chartOptionsThree = {
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
          data: [], //[45, 60, 75, 51, 42, 42, 30],
        },
      ],
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Agu', 'Oct', 'Nov', 'Dec'],
      },
    };
    this.recentPatients = this.data.recentPatients;
    this.upcomingAppointments = this.data.upcomingAppointments;
  }



  
  public sortData(sort: Sort) {
    const data = this.recentPatients.slice();
    const datas = this.upcomingAppointments.slice();

    if (!sort.active || sort.direction === '') {
      this.recentPatients = data;
      this.upcomingAppointments = datas;

    } else {
      this.recentPatients = data.sort((a, b) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const aValue = (a as any)[sort.active];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const bValue = (b as any)[sort.active];
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
      this.upcomingAppointments = datas.sort((a:any, b:any) => {
         // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const aValue = (a as any)[sort.active];
         // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const bValue = (b as any)[sort.active];
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
    }
  }
  
}
