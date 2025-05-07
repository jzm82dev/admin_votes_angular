import { Component, ViewChild } from '@angular/core';
import { routes } from 'src/app/shared/routes/routes';
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
import { DashboardService } from '../service/dashboard.service';
interface data {
  value: string ;
}
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
  selector: 'app-doctor-dashboard',
  templateUrl: './doctor-dashboard.component.html',
  styleUrls: ['./doctor-dashboard.component.scss'],
})
export class DoctorDashboardComponent {
  public routes = routes;
  @ViewChild('chart') chart!: ChartComponent;
  public chartOptionsOne: Partial<ChartOptions>;
  public chartOptionsTwo: Partial<ChartOptions>;
  public chartOptionsThree: Partial<ChartOptions>;
  public selectedDoctor ! : string  ;
 
  

  //
  public doctor_id: number = 0;
  public doctor_name: string = '';
  public doctor_specialitie: string = '';
  public doctors: any = [];
  public current_year: number = new Date().getFullYear();
  public years: number[] = [];
  public selected_year: number = this.current_year;

  public month_appointemnt: number = 0;
  public month_before_appointemnt: number = 0;
  public percent_appointemnt: number = 0;

  public month_attention: number = 0;
  public month_before_attention: number = 0;
  public percent_attention: number = 0;

  public month_earning_paid: number = 0;
  public month_before_earning_paid: number = 0;
  public percent_earning_paid: number = 0;

  public month_earning_pending: number = 0;
  public month_before_earning_pending: number = 0;
  public percent_earning_pending: number = 0;

  public total_men: number = 0;
  public total_woman: number = 0;
  public currentYearAppointment: number[] = [];
  public beforeYearAppointment: number[] = [];
  public earningByMonth: number[] = [];
  public upcomingAppointments: any = [];

  ngOnInit(): void {

    for (let index = 0; index <5; index++) {
      this.years.push(this.current_year - index)
    }

    this.dashboardSrv.getConfigDashboard().subscribe( (resp:any) => {
      this.doctors = resp.doctors;
      
      
    });
  }


  selectDoctor(){
    let data = {
      'doctor_id': this.doctor_id
    }
    this.dashboardSrv.getDashboardDoctor(data).subscribe( (resp:any) => {
      this.doctor_name = resp.doctor_selected.fullname;
      this.doctor_specialitie = resp.doctor_selected.speciality;

      this.month_appointemnt = resp.total_appopientments_doctor_current_month;
      this.month_before_appointemnt = resp.total_appopientments_doctor_month_before;
      this.percent_appointemnt = resp.total_appoient_doctor_percent;
      this.month_attention = resp.total_attendend_appopientments_doctor_current_month;
      this.month_before_attention = resp.total_attendend_appopientments_doctor_month_before;
      this.percent_attention = resp.total_appoient_atended_doctor_percent;
      this.month_earning_paid = resp.total_earning_paid_appointments_doctor_current_month;
      this.month_before_earning_paid = resp.total_earning_paid_appointments_doctor_month_before;
      this.percent_earning_paid = resp.total_earning_paid_percent;
      this.month_earning_pending = resp.total_earning_pending_appointments_doctor_current_month;
      this.month_before_earning_pending = resp.total_earning_pending_appointments_doctor_month_before;
      this.percent_earning_pending = resp.total_earning_pending_percent;
      this.upcomingAppointments = resp.upcoming_appointment.data;
      console.log(this.upcomingAppointments);
      
    })

    this.dashboardYear();
  }


  dashboardYear(){
    let data = {
      'doctor_id': this.doctor_id,
      'year': this.selected_year
    }
    this.dashboardSrv.getDashboardYearDoctor(data).subscribe( (resp:any) => {
      this.fillAppointmentsGraphic(resp.vs_months_appointmnets_year_year_before);
      this.fillEarningGraphic(resp.total_earning_doctor_by_month);
      this.fillGenderGraphic(resp.total_by_gender);
    })
    
  }

  fillAppointmentsGraphic(appointments: any){
    this.currentYearAppointment = [];
    this.beforeYearAppointment = [];

    appointments.forEach((element:any) => {
      this.currentYearAppointment.push(element.total_month_current_year)
      this.beforeYearAppointment.push(element.total_month_before_year) 
    });

    let series = [
      {
        name: this.selected_year,
        color: '#D5D7ED',
        data: this.currentYearAppointment,
      },
      {
        name: this.selected_year - 1,
        color: '#2E37A4',
        data: this.beforeYearAppointment,
      },
    ];
    this.chartOptionsThree.series = series;
  
  }

  fillEarningGraphic( earning: any){

    earning.forEach((element: any) => {
      this.earningByMonth.push(element.total);
    });

    let serie = [
      {
        name: 'Income',
        color: '#2E37A4',
        data: this.earningByMonth,
      },
    ];

    this.chartOptionsOne.series = serie;
  }

  fillGenderGraphic(gender: any){
    console.log(gender[0])
    let total_gender: number[] = [];
    this.total_men = parseInt(gender[0].men);
    this.total_woman = parseInt(gender[0].women);
    total_gender.push(this.total_men);
    total_gender.push(this.total_woman);
    
    this.chartOptionsTwo.series = total_gender;
    
  }

  constructor( public dashboardSrv: DashboardService) {
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
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Agu', 'Sep', 'Oct', 'Nov', 'Dec'],
      },
    };
    this.chartOptionsTwo = {
      chart: {
        height: 250,
        width: 330,
        type: 'donut',
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '50%',
        },
      },
      dataLabels: {
        enabled: false,
      },

      series: [],
      labels: ['Male', 'Female'],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: 'bottom',
            },
          },
        },
      ],
      legend: {
        position: 'bottom',
      },
    };
    this.chartOptionsThree = {
      chart: {
        height: 230,
        type: 'bar',
        stacked: false,
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
          columnWidth: '55%',
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 6,
        colors: ['transparent'],
      },
      series: [
        {
          name: 'Low',
          color: '#D5D7ED',
          data: [],
        },
        {
          name: 'High',
          color: '#2E37A4',
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
      },
    };
  }
  selecedList: data[] = [
    {value: '2022'},
    {value: '2021'},
    {value: '2020'},
    {value: '2019'},
  ];
  selecedLists: data[] = [
    {value: 'This Week'},
    {value: 'Last Week'},
    {value: 'This Month'},
    {value: 'Last Month'},
  ];
}
